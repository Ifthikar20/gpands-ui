<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommunitiesStore } from '@/stores/communities.js'
import { usePostsStore } from '@/stores/posts.js'
import { formatCount } from '@/composables/useVote.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const route = useRoute()
const router = useRouter()
const communities = useCommunitiesStore()
const posts = usePostsStore()

const community = computed(() => {
  const name = route.params.subreddit
  return name ? communities.getCommunity(name) : null
})

const trending = computed(() => {
  return [...communities.communities]
    .map((c) => ({
      ...c,
      heat: c.online + posts.getPostsBySubreddit(c.name).length * 200,
    }))
    .sort((a, b) => b.heat - a.heat)
    .slice(0, 8)
})

function go(name) {
  router.push(`/r/${name}`)
}
</script>

<template>
  <aside class="aside">
    <section v-if="community" class="card community-card">
      <div class="community-head">
        <span class="comm-icon" :style="{ background: community.color }">
          <SvgIcon :name="community.icon" :size="20" />
        </span>
        <div class="community-meta">
          <h3>r/{{ community.name }}</h3>
          <p class="sub">{{ formatCount(community.members) }} members</p>
        </div>
        <button
          class="follow"
          :class="{ joined: communities.isJoined(community.name) }"
          @click="communities.toggleJoin(community.name)"
        >
          {{ communities.isJoined(community.name) ? 'Following' : 'Follow' }}
        </button>
      </div>
    </section>

    <section class="card">
      <header class="trend-head">Trending now</header>
      <ol class="trend-list">
        <li v-for="(c, i) in trending" :key="c.name">
          <button class="trend-row" @click="go(c.name)">
            <span class="rank">{{ i + 1 }}</span>
            <span class="trend-icon" :style="{ background: c.color }">
              <SvgIcon :name="c.icon" :size="14" />
            </span>
            <span class="trend-text">
              <span class="trend-name">r/{{ c.name }}</span>
              <span class="trend-sub">{{ formatCount(c.members) }} members</span>
            </span>
          </button>
        </li>
      </ol>
    </section>
  </aside>
</template>

<style scoped>
.aside {
  width: var(--aside-width);
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-4));
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-self: flex-start;
  max-height: calc(100vh - var(--navbar-height) - var(--space-6));
  overflow-y: auto;
}

.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
}

.community-card { padding: var(--space-4); }
.community-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.comm-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: grid;
  place-items: center;
  color: white;
  flex-shrink: 0;
}
.community-meta { flex: 1; min-width: 0; }
.community-meta h3 { font-size: 14px; font-weight: 700; }
.community-meta .sub { font-size: 12px; color: var(--text-muted); }
.follow {
  padding: 6px 14px;
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
.trend-icon {
  width: 26px;
  height: 26px;
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
  color: white;
  flex-shrink: 0;
}
.trend-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.trend-name {
  font-size: 13px;
  font-weight: 600;
}
.trend-sub {
  font-size: 11px;
  color: var(--text-muted);
}

@media (max-width: 1280px) {
  .aside { display: none; }
}
</style>
