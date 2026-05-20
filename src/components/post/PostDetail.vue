<script setup>
import { ref, computed } from 'vue'
import VoteWidget from '@/components/common/VoteWidget.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useCommunitiesStore } from '@/stores/communities.js'
import { useRelativeTime } from '@/composables/useRelativeTime.js'
import { formatCount } from '@/composables/useVote.js'

const props = defineProps({ post: { type: Object, required: true } })
const postsStore = usePostsStore()
const communities = useCommunitiesStore()
const time = useRelativeTime(() => props.post.createdAt)
const community = computed(() => communities.getCommunity(props.post.subreddit))

const newComment = ref('')

function vote(direction) {
  postsStore.votePost(props.post.id, direction)
}
function submitComment() {
  const text = newComment.value.trim()
  if (!text) return
  postsStore.addComment(props.post.id, text)
  newComment.value = ''
}
</script>

<template>
  <article class="detail">
    <div class="vote-col">
      <VoteWidget :score="post.score" :user-vote="post.userVote" @vote="vote" />
    </div>
    <div class="content">
      <div class="meta">
        <router-link :to="`/r/${post.subreddit}`" class="sub">
          <span class="sub-icon" :style="{ background: community?.color || 'var(--accent-blue)' }">
            {{ community?.icon || '?' }}
          </span>
          <span class="sub-name">r/{{ post.subreddit }}</span>
        </router-link>
        <span class="dot">•</span>
        <span class="muted">Posted by u/{{ post.author }}</span>
        <span class="muted">{{ time }}</span>
      </div>

      <h1 class="title">{{ post.title }}</h1>

      <p v-if="post.body" class="body">{{ post.body }}</p>

      <div v-if="post.type === 'image' && post.image" class="media">
        <img :src="post.image" :alt="post.title" />
      </div>

      <div class="actions">
        <div class="action">
          <SvgIcon name="comment" :size="18" />
          <span>{{ formatCount(post.commentCount) }} Comments</span>
        </div>
        <button class="action">
          <SvgIcon name="share" :size="18" />
          <span>Share</span>
        </button>
        <button class="action">
          <SvgIcon name="save" :size="18" />
          <span>Save</span>
        </button>
        <button class="action">
          <SvgIcon name="award" :size="18" />
          <span>Award</span>
        </button>
      </div>

      <div class="comment-box">
        <p class="comment-label">
          Comment as <span class="self">u/curious_dev</span>
        </p>
        <textarea v-model="newComment" rows="4" placeholder="What are your thoughts?" />
        <div class="comment-actions">
          <button class="btn primary" :disabled="!newComment.trim()" @click="submitComment">Comment</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.detail {
  display: flex;
  gap: var(--space-3);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}
.vote-col {
  background: hsla(220 14% 8% / 0.4);
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  align-self: flex-start;
}
.content { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
  flex-wrap: wrap;
}
.sub {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: var(--text-primary);
}
.sub:hover { text-decoration: underline; }
.sub-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 11px;
}
.muted { color: var(--text-muted); }
.dot { color: var(--text-muted); }

.title { font-size: 22px; font-weight: 700; line-height: 1.3; }
.body { font-size: 15px; line-height: 1.6; color: var(--text-primary); white-space: pre-wrap; }
.media {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--bg-canvas);
}
.media img {
  width: 100%;
  height: auto;
  max-height: 640px;
  object-fit: contain;
}
.actions {
  display: flex;
  gap: 2px;
  margin-top: 4px;
  flex-wrap: wrap;
}
.action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
button.action { cursor: pointer; }
button.action:hover { background: var(--bg-hover); color: var(--text-primary); }

.comment-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: var(--space-2);
}
.comment-label { font-size: 12px; color: var(--text-muted); }
.self { color: var(--accent-blue); font-weight: 600; }
.comment-box textarea {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 12px;
  font-size: 14px;
  resize: vertical;
  min-height: 96px;
}
.comment-box textarea:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px hsla(220 90% 60% / 0.18);
}
.comment-actions { display: flex; justify-content: flex-end; }
.btn {
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 13px;
  transition: background var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out);
}
.btn.primary { background: var(--accent-orange); color: white; }
.btn.primary:hover:not(:disabled) { filter: brightness(1.1); }
.btn.primary:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
