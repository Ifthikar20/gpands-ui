<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import VoteWidget from '@/components/common/VoteWidget.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useCommunitiesStore } from '@/stores/communities.js'
import { useRelativeTime } from '@/composables/useRelativeTime.js'
import { formatCount } from '@/composables/useVote.js'

const props = defineProps({ post: { type: Object, required: true } })

const postsStore = usePostsStore()
const communities = useCommunitiesStore()
const router = useRouter()

const community = computed(() => communities.getCommunity(props.post.subreddit))
const time = useRelativeTime(() => props.post.createdAt)

function open() {
  router.push({ name: 'post', params: { id: props.post.id } })
}

function vote(direction) {
  postsStore.votePost(props.post.id, direction)
}

const preview = computed(() => {
  if (!props.post.body) return ''
  return props.post.body.length > 220 ? props.post.body.slice(0, 220) + '…' : props.post.body
})
</script>

<template>
  <article class="post-card" @click="open">
    <div class="vote-col" @click.stop>
      <VoteWidget :score="post.score" :user-vote="post.userVote" orientation="vertical" @vote="vote" />
    </div>
    <div class="content">
      <div class="meta">
        <router-link :to="`/r/${post.subreddit}`" class="sub" @click.stop>
          <span class="sub-icon" :style="{ background: community?.color || 'var(--accent-blue)' }">
            <SvgIcon :name="community?.icon || 'globe'" :size="12" />
          </span>
          <span class="sub-name">r/{{ post.subreddit }}</span>
        </router-link>
        <span class="dot">•</span>
        <span class="muted" v-if="post.author === 'anonymous'">Posted anonymously</span>
        <router-link v-else :to="`/u/${post.author}`" class="author-link" @click.stop>
          u/{{ post.author }}
        </router-link>
        <span class="muted">{{ time }}</span>
      </div>

      <h3 class="title">{{ post.title }}</h3>

      <p v-if="preview" class="body">{{ preview }}</p>

      <div v-if="post.type === 'image' && post.image" class="media">
        <img :src="post.image" :alt="post.title" loading="lazy" />
      </div>

      <div class="actions" @click.stop>
        <button class="action" @click="open">
          <SvgIcon name="comment" :size="18" />
          <span>{{ formatCount(post.commentCount) }} Comments</span>
        </button>
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
    </div>
  </article>
</template>

<style scoped>
.post-card {
  display: flex;
  gap: var(--space-4);
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
.vote-col {
  background: var(--bg-elevated);
  padding: var(--space-2);
  border-radius: var(--radius-md);
  display: flex;
  align-items: flex-start;
}
.content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--text-secondary);
}
.sub {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: var(--text-primary);
  transition: text-decoration var(--dur-fast) var(--ease-out);
}
.sub:hover { text-decoration: underline; }
.sub-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
}
.muted { color: var(--text-muted); }
.dot { color: var(--text-muted); }
.author-link {
  font-weight: 600;
  color: var(--text-secondary);
}
.author-link:hover { text-decoration: underline; color: var(--text-primary); }

.title {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
  margin-top: 2px;
}
.body {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.55;
  max-height: 140px;
  overflow: hidden;
  position: relative;
}
.body::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 32px;
  background: linear-gradient(transparent, var(--bg-surface));
  pointer-events: none;
}
.media {
  margin-top: var(--space-2);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--bg-canvas);
  max-height: 520px;
  display: grid;
  place-items: center;
}
.media img {
  width: 100%;
  height: auto;
  max-height: 520px;
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
.action:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
</style>
