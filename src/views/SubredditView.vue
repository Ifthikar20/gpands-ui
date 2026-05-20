<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostFeed from '@/components/post/PostFeed.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useCommunitiesStore } from '@/stores/communities.js'
import { useUiStore } from '@/stores/ui.js'
import { formatCount } from '@/composables/useVote.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import CapsuleChip from '@/components/common/CapsuleChip.vue'

const route = useRoute()
const postsStore = usePostsStore()
const communities = useCommunitiesStore()
const ui = useUiStore()

const subreddit = computed(() => route.params.subreddit)
const community = computed(() => communities.getCommunity(subreddit.value))

const posts = computed(() => {
  const all = postsStore.sortedPosts(ui.activeSort)
  return all.filter((p) => p.subreddit === subreddit.value)
})
</script>

<template>
  <div class="sub-view">
    <header v-if="community" class="banner-card">
      <div class="banner" :style="{ background: community.color }" />
      <div class="banner-meta">
        <span class="banner-icon" :style="{ background: community.color }">
          <SvgIcon :name="community.icon" :size="36" />
        </span>
        <div class="banner-info">
          <CapsuleChip :name="community.name" size="lg" :linkable="false" />
          <h1 class="title">{{ community.title }}</h1>
          <p class="muted">{{ formatCount(community.members) }} members · <span class="online"><span class="dot" />{{ formatCount(community.online) }} online</span></p>
        </div>
        <button
          class="join"
          :class="{ joined: communities.isJoined(community.name) }"
          @click="communities.toggleJoin(community.name)"
        >
          {{ communities.isJoined(community.name) ? 'Following' : 'Follow' }}
        </button>
      </div>
    </header>

    <header v-else class="banner-card unknown">
      <div class="banner unknown-banner" />
      <div class="banner-meta">
        <span class="banner-icon unknown-icon">
          <SvgIcon name="globe" :size="36" />
        </span>
        <div class="banner-info">
          <h1 class="title">{{ subreddit }}</h1>
          <p class="muted">This capsule doesn't exist (yet).</p>
        </div>
      </div>
    </header>

    <PostFeed :posts="posts" />
  </div>
</template>

<style scoped>
.sub-view { display: flex; flex-direction: column; gap: var(--space-4); }
.banner-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.banner { height: 96px; }
.banner-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-4) var(--space-4);
  margin-top: -28px;
}
.banner-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
  border: 4px solid var(--bg-surface);
}
.unknown-banner {
  background: linear-gradient(135deg, var(--bg-elevated), var(--bg-hover));
}
.unknown-icon {
  background: var(--bg-elevated);
  color: var(--text-muted);
}
.banner-info {
  flex: 1;
  padding-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}
.banner-info .title {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.muted { font-size: 12px; color: var(--text-muted); margin-top: 4px; }
.online { color: var(--success); display: inline-flex; align-items: center; gap: 4px; }
.online .dot {
  width: 6px;
  height: 6px;
  background: var(--success);
  border-radius: 50%;
}
.join {
  margin-top: 28px;
  padding: 8px 22px;
  background: var(--accent-orange);
  color: white;
  font-weight: 700;
  border-radius: var(--radius-pill);
  transition: filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.join:hover { filter: brightness(1.1); transform: translateY(-1px); }
.join.joined {
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
}
</style>
