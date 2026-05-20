<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostFeed from '@/components/post/PostFeed.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useCommunitiesStore } from '@/stores/communities.js'
import { formatCount } from '@/composables/useVote.js'

const route = useRoute()
const postsStore = usePostsStore()
const communities = useCommunitiesStore()

const subreddit = computed(() => route.params.subreddit)
const community = computed(() => communities.getCommunity(subreddit.value))

const posts = computed(() => {
  const all = postsStore.sortedPosts('new')
  return all.filter((p) => p.subreddit === subreddit.value)
})

function toggleFollow() {
  if (!community.value) return
  communities.toggleJoin(community.value.name)
}
</script>

<template>
  <div class="sub-view">
    <header class="letterhead">
      <p class="kicker">Letters from</p>
      <h1 class="title">{{ community?.title || subreddit }}</h1>
      <p v-if="community" class="meta">
        <span>{{ formatCount(community.members) }} members</span>
        <span class="sep" aria-hidden="true">&middot;</span>
        <span class="online"><span class="dot" />{{ formatCount(community.online) }} online</span>
        <span class="sep" aria-hidden="true">&middot;</span>
        <button
          class="follow-link"
          :class="{ following: communities.isJoined(community.name) }"
          @click="toggleFollow"
        >{{ communities.isJoined(community.name) ? 'Following' : 'Follow' }}</button>
      </p>
      <p v-else class="meta">This capsule doesn't exist yet.</p>
      <div class="rule" aria-hidden="true" />
    </header>

    <PostFeed :posts="posts" />
  </div>
</template>

<style scoped>
.sub-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.letterhead {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: var(--space-4) 0 0;
}
.kicker {
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 700;
}
.title {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 38px;
  font-weight: 600;
  line-height: 1.1;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  text-transform: lowercase;
}
.meta {
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  font-family: var(--font-typewriter);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}
.sep { color: var(--text-muted); }
.online {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--success);
  font-weight: 700;
}
.online .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--success);
}
.follow-link {
  background: transparent;
  font-family: var(--font-typewriter);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--accent-orange);
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out);
}
.follow-link:hover { text-decoration: underline; }
.follow-link.following { color: var(--text-muted); }

.rule {
  margin-top: var(--space-4);
  height: 1px;
  width: 80px;
  background: var(--paper-line);
}

@media (max-width: 640px) {
  .title { font-size: 30px; }
}
</style>
