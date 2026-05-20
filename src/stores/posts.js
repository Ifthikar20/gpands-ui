import { defineStore } from 'pinia'
import { posts as seed } from '@/data/mock-data.js'
import { emit, Events } from '@/lib/eventBus.js'
import {
  sanitizeTitle,
  sanitizeText,
  sanitizeUrl,
  sanitizeSlug,
  sanitizePaperStyle,
  sanitizePaperTexture,
  sanitizeDirection,
} from '@/lib/sanitize.js'

const STORAGE_KEY = 'gpands.votes.v1'

// Validate vote entries from localStorage — reject anything that
// doesn't shape-match { direction: -1|0|1, delta: finite number }.
function loadVotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '{}'
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    const clean = {}
    for (const [key, val] of Object.entries(parsed)) {
      if (typeof key !== 'string' || key.length > 64) continue
      if (!/^[pc]:[\w-]{1,40}$/.test(key)) continue
      if (!val || typeof val !== 'object') continue
      const dir = sanitizeDirection(val.direction)
      const delta = Number(val.delta)
      if (!Number.isFinite(delta) || Math.abs(delta) > 1000) continue
      clean[key] = { direction: dir, delta }
    }
    return clean
  } catch {
    return {}
  }
}

function saveVotes(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore — quota or disabled storage */
  }
}

// Walk a comment tree and apply persisted votes.
function applyVotesToComments(comments, votes) {
  for (const c of comments) {
    const v = votes['c:' + c.id]
    if (v) {
      c.score += v.delta
      c.userVote = v.direction
    }
    if (c.children?.length) applyVotesToComments(c.children, votes)
  }
}

function findComment(comments, id) {
  for (const c of comments) {
    if (c.id === id) return c
    const found = c.children?.length ? findComment(c.children, id) : null
    if (found) return found
  }
  return null
}

export const usePostsStore = defineStore('posts', {
  state: () => {
    const votes = loadVotes()
    // Deep-clone seed so mutations don't leak across HMR reloads.
    const list = JSON.parse(JSON.stringify(seed))
    for (const p of list) {
      const v = votes['p:' + p.id]
      if (v) {
        p.score += v.delta
        p.userVote = v.direction
      }
      if (p.comments?.length) applyVotesToComments(p.comments, votes)
    }
    return {
      posts: list,
      votes,
    }
  },
  getters: {
    getPostById: (state) => (id) => state.posts.find((p) => p.id === id),
    getPostsBySubreddit: (state) => (name) =>
      state.posts.filter((p) => p.subreddit === name),
    sortedPosts: (state) => (sortBy) => {
      const list = [...state.posts]
      switch (sortBy) {
        case 'new':
          return list.sort((a, b) => b.createdAt - a.createdAt)
        case 'top':
          return list.sort((a, b) => b.score - a.score)
        case 'rising':
          return list.sort((a, b) => b.commentCount - a.commentCount)
        case 'hot':
        default:
          return list.sort((a, b) => {
            const score = (p) => p.score / Math.pow((Date.now() / 1000 - p.createdAt) / 3600 + 2, 1.5)
            return score(b) - score(a)
          })
      }
    },
  },
  actions: {
    _applyVote(target, key, direction) {
      const dir = sanitizeDirection(direction)
      const prev = sanitizeDirection(target.userVote || 0)
      const next = prev === dir ? 0 : dir
      const delta = next - prev
      target.score += delta
      target.userVote = next
      const totalDelta = (this.votes[key]?.delta || 0) + delta
      if (next === 0 && totalDelta === 0) {
        delete this.votes[key]
      } else {
        this.votes[key] = { direction: next, delta: totalDelta }
      }
      saveVotes(this.votes)
    },
    votePost(postId, direction) {
      const post = this.getPostById(postId)
      if (!post) return
      this._applyVote(post, 'p:' + postId, direction)
      emit(Events.VoteCast, {
        target: 'post', postId, direction: post.userVote,
        title: post.title, subreddit: post.subreddit,
      })
    },
    voteComment(postId, commentId, direction) {
      const post = this.getPostById(postId)
      if (!post) return
      const comment = findComment(post.comments || [], commentId)
      if (!comment) return
      this._applyVote(comment, 'c:' + commentId, direction)
      emit(Events.VoteCast, {
        target: 'comment', postId, commentId, direction: comment.userVote,
        snippet: comment.body.slice(0, 60),
      })
    },
    addPost(payload) {
      // Defense in depth — every user-supplied field is normalised
      // and clamped before it touches state. Vue templates already
      // HTML-escape via mustaches; this protects against tampered
      // payloads (anything calling addPost from the console, etc.).
      const title = sanitizeTitle(payload?.title)
      if (!title) return null
      const subreddit = sanitizeSlug(payload?.subreddit)
      if (!subreddit) return null
      const body = sanitizeText(payload?.body)
      const image = sanitizeUrl(payload?.image)
      const type = ['text', 'image', 'link'].includes(payload?.type) ? payload.type : 'text'

      const id = 'u' + Date.now()
      const post = {
        id,
        title,
        author: payload?.anonymous ? 'anonymous' : 'maya_w',
        subreddit,
        body,
        score: 1,
        createdAt: Math.floor(Date.now() / 1000),
        commentCount: 0,
        type,
        image: type === 'image' ? image : null,
        userVote: 1,
        anonymous: !!payload?.anonymous,
        paperStyle: sanitizePaperStyle(payload?.paperStyle),
        paperTexture: sanitizePaperTexture(payload?.paperTexture),
        comments: [],
      }
      this.posts.unshift(post)
      this.votes['p:' + id] = { direction: 1, delta: 0 }
      saveVotes(this.votes)
      emit(Events.PostCreated, {
        postId: id, title: post.title, subreddit: post.subreddit,
        author: post.author, anonymous: post.anonymous,
      })
      return id
    },
    addComment(postId, body, parentId = null) {
      const post = this.getPostById(postId)
      if (!post) return
      const cleanBody = sanitizeText(body, 4000).trim()
      if (!cleanBody) return
      const comment = {
        id: 'uc' + Date.now(),
        author: 'maya_w',
        body: cleanBody,
        score: 1,
        createdAt: Math.floor(Date.now() / 1000),
        children: [],
        userVote: 1,
      }
      if (parentId) {
        const parent = findComment(post.comments, parentId)
        if (parent) parent.children.push(comment)
      } else {
        post.comments.unshift(comment)
      }
      post.commentCount += 1
      emit(Events.CommentAdded, {
        postId, commentId: comment.id, parentId,
        snippet: cleanBody.slice(0, 80),
        postTitle: post.title, subreddit: post.subreddit,
      })
    },
  },
})
