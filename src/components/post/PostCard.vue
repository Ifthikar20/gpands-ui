<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import CapsuleChip from '@/components/common/CapsuleChip.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useCommunitiesStore } from '@/stores/communities.js'
import { useRelativeTime } from '@/composables/useRelativeTime.js'
import { formatCount } from '@/composables/useVote.js'

const props = defineProps({ post: { type: Object, required: true } })

const postsStore = usePostsStore()
const communities = useCommunitiesStore()
const router = useRouter()

const time = useRelativeTime(() => props.post.createdAt)
const isFollowing = computed(() => communities.isJoined(props.post.subreddit))

const upBounce = ref(false)
const downBounce = ref(false)
watch(upBounce, (v) => v && setTimeout(() => (upBounce.value = false), 280))
watch(downBounce, (v) => v && setTimeout(() => (downBounce.value = false), 280))

function open() {
  router.push({ name: 'post', params: { id: props.post.id } })
}

function vote(direction, e) {
  e?.stopPropagation()
  postsStore.votePost(props.post.id, direction)
  if (direction === 1) upBounce.value = true
  else downBounce.value = true
}

function toggleFollow(e) {
  e?.stopPropagation()
  communities.toggleJoin(props.post.subreddit)
}

const preview = computed(() => {
  if (!props.post.body) return ''
  return props.post.body.length > 280 ? props.post.body.slice(0, 280) + '…' : props.post.body
})
</script>

<template>
  <article class="post-card" @click="open">
    <header class="card-head">
      <UserAvatar :username="post.author" :size="36" />
      <div class="byline">
        <div class="row">
          <span v-if="post.author === 'anonymous'" class="author muted">anonymous</span>
          <router-link v-else :to="`/u/${post.author}`" class="author" @click.stop>
            {{ post.author.replace(/_/g, ' ') }}
          </router-link>
          <CapsuleChip :name="post.subreddit" size="sm" />
        </div>
        <div class="meta">
          <span>{{ time }}</span>
        </div>
      </div>
      <button
        class="follow-pill"
        :class="{ following: isFollowing }"
        @click="toggleFollow"
      >{{ isFollowing ? 'Following' : 'Follow' }}</button>
    </header>

    <h3 class="title">{{ post.title }}</h3>

    <p v-if="preview" class="body">{{ preview }}</p>

    <div v-if="post.type === 'image' && post.image" class="media">
      <img :src="post.image" :alt="post.title" loading="lazy" />
    </div>

    <footer class="actions" @click.stop>
      <div class="vote" :class="{ up: post.userVote === 1, down: post.userVote === -1 }">
        <button :class="['vote-btn', { bounce: upBounce }]" aria-label="Upvote" @click="vote(1, $event)">
          <SvgIcon name="arrowUp" :size="18" />
        </button>
        <span class="score">{{ formatCount(post.score) }}</span>
        <button :class="['vote-btn', { bounce: downBounce }]" aria-label="Downvote" @click="vote(-1, $event)">
          <SvgIcon name="arrowDown" :size="18" />
        </button>
      </div>

      <button class="action" @click="open">
        <SvgIcon name="comment" :size="18" />
        <span>{{ formatCount(post.commentCount) }}</span>
      </button>

      <button class="action" aria-label="Share">
        <SvgIcon name="share" :size="18" />
      </button>

      <button class="action save" aria-label="Save">
        <SvgIcon name="save" :size="18" />
      </button>
    </footer>
  </article>
</template>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: var(--space-4) var(--space-5);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.post-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-strong);
}
.post-card:active { transform: translateY(0); }

.card-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.byline { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.byline .row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.author {
  font-weight: 700;
  font-size: 14px;
  color: var(--text-primary);
  letter-spacing: -0.005em;
  text-transform: capitalize;
}
.author:hover { text-decoration: underline; }
.author.muted { color: var(--text-muted); font-weight: 600; text-transform: none; }
.meta {
  font-size: 12px;
  color: var(--text-muted);
}

.follow-pill {
  padding: 5px 14px;
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 12px;
  border-radius: var(--radius-pill);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
  flex-shrink: 0;
}
.follow-pill:hover { background: var(--bg-hover); }
.follow-pill.following {
  color: var(--text-muted);
}

.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--text-primary);
}

.body {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.6;
  max-height: 140px;
  overflow: hidden;
  position: relative;
  white-space: pre-wrap;
}
.body::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 40px;
  background: linear-gradient(transparent, var(--bg-surface));
  pointer-events: none;
}

.media {
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--bg-elevated);
  max-height: 560px;
  display: grid;
  place-items: center;
}
.media img {
  width: 100%;
  height: auto;
  max-height: 560px;
  object-fit: cover;
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: 4px;
}
.vote {
  display: inline-flex;
  align-items: center;
  background: var(--bg-elevated);
  border-radius: var(--radius-pill);
  padding: 2px;
}
.vote-btn {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--text-muted);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.vote-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
.vote-btn.bounce { animation: vote-bounce 280ms var(--ease-spring); }
@keyframes vote-bounce {
  0% { transform: scale(1); }
  40% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
.vote.up .vote-btn:first-child { color: var(--accent-orange); }
.vote.down .vote-btn:last-child { color: var(--downvote-blue); }
.score {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 13px;
  padding: 0 8px;
  min-width: 28px;
  text-align: center;
  color: var(--text-primary);
}
.vote.up .score { color: var(--accent-orange); }
.vote.down .score { color: var(--downvote-blue); }

.action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.action:hover { background: var(--bg-hover); color: var(--text-primary); }
.action.save { margin-left: auto; }

@media (max-width: 640px) {
  .post-card { padding: var(--space-3) var(--space-4); }
  .title { font-size: 18px; }
}
</style>
