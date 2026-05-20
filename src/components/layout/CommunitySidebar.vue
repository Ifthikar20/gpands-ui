<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommunitiesStore } from '@/stores/communities.js'
import { formatCount } from '@/composables/useVote.js'
import CapsuleChip from '@/components/common/CapsuleChip.vue'

const route = useRoute()
const router = useRouter()
const communities = useCommunitiesStore()

const community = computed(() => {
  const name = route.params.subreddit
  return name ? communities.getCommunity(name) : null
})

const RECENTLY_PUBLISHED = ['funny', 'career', 'travel', 'animals', 'growth', 'love']

const recentlyPublished = computed(() =>
  RECENTLY_PUBLISHED
    .map((name) => communities.getCommunity(name))
    .filter(Boolean),
)

function go(name) {
  router.push(`/c/${name}`)
}
</script>

<template>
  <aside class="aside">
    <section v-if="community" class="card community-card">
      <CapsuleChip :name="community.name" size="lg" :linkable="false" />
      <p class="member-count">{{ formatCount(community.members) }} members</p>
      <button
        class="follow"
        :class="{ joined: communities.isJoined(community.name) }"
        @click="communities.toggleJoin(community.name)"
      >
        {{ communities.isJoined(community.name) ? 'Following' : 'Follow' }}
      </button>
    </section>

    <section class="card">
      <header class="trend-head">Recently published</header>
      <ol class="trend-list">
        <li v-for="(c, i) in recentlyPublished" :key="c.name">
          <button class="trend-row" @click="go(c.name)">
            <span class="rank">{{ i + 1 }}</span>
            <CapsuleChip :name="c.name" size="sm" :linkable="false" />
            <span class="trend-sub">{{ formatCount(c.members) }}</span>
          </button>
        </li>
      </ol>
    </section>
  </aside>
</template>

<style scoped>
.aside {
  position: fixed;
  top: var(--navbar-height);
  right: 0;
  width: var(--aside-width);
  height: calc(100vh - var(--navbar-height));
  background: var(--bg-canvas);
  border-left: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--space-4) var(--space-4) var(--space-6);
  z-index: 10;
}

.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
}

.community-card {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
.member-count { font-size: 12px; color: var(--text-muted); }
.follow {
  margin-top: 4px;
  padding: 7px 18px;
  background: var(--accent-orange);
  color: white;
  font-weight: 700;
  font-size: 12px;
  border-radius: var(--radius-pill);
  transition: filter var(--dur-fast) var(--ease-out);
}
.follow:hover { filter: brightness(1.05); }
.follow.joined {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
}

.trend-head {
  padding: var(--space-3) var(--space-4) var(--space-2);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}
.trend-list { padding: 0 var(--space-2) var(--space-2); }
.trend-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 8px 10px;
  border-radius: var(--radius-md);
  text-align: left;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}
.trend-row:hover { background: var(--bg-hover); }
.rank {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 12px;
  color: var(--text-muted);
  width: 18px;
  flex-shrink: 0;
}
.trend-sub {
  margin-left: auto;
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 1280px) {
  .aside { display: none; }
}
</style>
