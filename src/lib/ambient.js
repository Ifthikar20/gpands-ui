// Ambient activity simulator. On a real backend these events would arrive
// over a WebSocket subscription (Reddit pushes via long-lived sockets from
// the same RabbitMQ stream that powers the listing recalculations). Here
// we generate them client-side so the live feed feels alive in the demo.

import { emit, Events } from './eventBus.js'
import { posts, communities, users } from '@/data/mock-data.js'

let timer = null

const FAKE_NAMES = users.pool.filter((u) => u.username !== 'anonymous').map((u) => u.username)
const RUN_MIN_MS = 6_000
const RUN_MAX_MS = 14_000

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function step() {
  const dice = Math.random()
  if (dice < 0.65) {
    // Most common: a vote on a random post.
    const post = pick(posts)
    emit(Events.VoteCast, {
      target: 'post',
      postId: post.id,
      direction: Math.random() < 0.92 ? 1 : -1, // upvotes dominate
      title: post.title,
      subreddit: post.subreddit,
      simulated: true,
      actor: pick(FAKE_NAMES),
    })
  } else if (dice < 0.85) {
    // Someone reading a story.
    const post = pick(posts)
    emit(Events.StoryRead, {
      postId: post.id,
      title: post.title,
      subreddit: post.subreddit,
      simulated: true,
      actor: pick(FAKE_NAMES),
    })
  } else {
    // Someone following a topic.
    const community = pick(communities)
    emit(Events.UserJoined, {
      subreddit: community.name,
      simulated: true,
      actor: pick(FAKE_NAMES),
    })
  }

  const next = RUN_MIN_MS + Math.random() * (RUN_MAX_MS - RUN_MIN_MS)
  timer = setTimeout(step, next)
}

export function startAmbient() {
  if (timer) return
  timer = setTimeout(step, 3000)
}

export function stopAmbient() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}
