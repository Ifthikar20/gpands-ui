<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommunitiesStore } from '@/stores/communities.js'
import { useUiStore } from '@/stores/ui.js'
import { usePostsStore } from '@/stores/posts.js'
import { formatCount } from '@/composables/useVote.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const route = useRoute()
const router = useRouter()
const communities = useCommunitiesStore()
const posts = usePostsStore()
const ui = useUiStore()

const community = computed(() => {
  const name = route.params.subreddit
  return name ? communities.getCommunity(name) : null
})

// Ranked "trending" — by online count with a small recency boost from
// the number of stories actually present in seed data.
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
    <!-- Compact community card when viewing a topic feed. -->
    <section v-if="community" class="card community-card">
      <div class="community-head">
        <span class="comm-icon" :style="{ background: community.color }">
          <SvgIcon :name="community.icon" :size="22" />
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
      <p class="desc">{{ community.description }}</p>
    </section>

    <!-- Trending categories — always visible, primary right-rail content. -->
    <section class="card trending-card">
      <header class="trend-head">
        <div>
          <span class="kicker">Trending now</span>
          <h3>Categories worth reading</h3>
        </div>
        <span class="live-dot" aria-hidden="true" />
      </header>
      <ol class="trend-list">
        <li v-for="(c, i) in trending" :key="c.name">
          <button class="trend-row" @click="go(c.name)">
            <span class="rank">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="trend-icon" :style="{ background: c.color }">
              <SvgIcon :name="c.icon" :size="16" />
            </span>
            <span class="trend-text">
              <span class="trend-name">r/{{ c.name }}</span>
              <span class="trend-sub">
                <span class="online"><span class="dot" />{{ formatCount(c.online) }} online</span>
                <span class="muted">{{ formatCount(c.members) }} members</span>
              </span>
            </span>
            <button
              v-if="!communities.isJoined(c.name)"
              class="follow-mini"
              @click.stop="communities.toggleJoin(c.name)"
            >Follow</button>
            <span v-else class="followed-mini">Following</span>
          </button>
        </li>
      </ol>
    </section>

    <!-- Small invitation card -->
    <section class="card prompt-card">
      <h4>Have a story?</h4>
      <p>The version you tell to strangers might be the truest one.</p>
      <button class="share-cta" @click="ui.openCreatePost()">
        <SvgIcon name="quote" :size="14" />
        Share a story
      </button>
    </section>
  </aside>
</template>

<style scoped>
.aside {
  width: var(--aside-width);
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-5));
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-self: flex-start;
  max-height: calc(100vh - var(--navbar-height) - var(--space-6));
  overflow-y: auto;
  padding-right: 4px;
}
.aside::-webkit-scrollbar { width: 6px; }

.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

/* ── Community card (compact) ───────────────────────────────────── */
.community-card { padding: var(--space-4); }
.community-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.comm-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: grid;
  place-items: center;
  color: white;
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}
.community-meta { flex: 1; min-width: 0; }
.community-meta h3 { font-size: 15px; font-weight: 700; letter-spacing: -0.01em; }
.community-meta .sub { font-size: 12px; color: var(--text-muted); }
.follow {
  padding: 6px 14px;
  background: var(--accent-orange);
  color: white;
  font-weight: 700;
  font-size: 12px;
  border-radius: var(--radius-pill);
  transition: filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.follow:hover { filter: brightness(1.05); transform: translateY(-1px); }
.follow.joined {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
}
.desc {
  margin-top: var(--space-3);
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.55;
}

/* ── Trending card ──────────────────────────────────────────────── */
.trend-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-4) var(--space-3);
}
.kicker {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-orange);
  font-weight: 700;
}
.trend-head h3 {
  margin-top: 2px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 0 0 hsla(145 65% 45% / 0.55);
  animation: trend-pulse 1.8s ease-out infinite;
}
@keyframes trend-pulse {
  0% { box-shadow: 0 0 0 0 hsla(145 65% 45% / 0.55); }
  100% { box-shadow: 0 0 0 12px hsla(145 65% 45% / 0); }
}

.trend-list {
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-2) var(--space-2);
}
.trend-list li { padding: 0; }
.trend-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 10px 10px;
  border-radius: var(--radius-md);
  text-align: left;
  transition: background var(--dur-fast) var(--ease-out);
  cursor: pointer;
}
.trend-row:hover {
  background: var(--bg-hover);
}
.rank {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 12px;
  color: var(--text-muted);
  width: 18px;
  flex-shrink: 0;
}
.trend-icon {
  width: 30px;
  height: 30px;
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
  gap: 2px;
}
.trend-name {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.trend-sub {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: var(--text-muted);
}
.online {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--success);
  font-weight: 600;
}
.online .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--success);
}
.muted { color: var(--text-muted); }
.follow-mini {
  padding: 4px 10px;
  background: var(--accent-orange);
  color: white;
  font-weight: 700;
  font-size: 11px;
  border-radius: var(--radius-pill);
  flex-shrink: 0;
  transition: filter var(--dur-fast) var(--ease-out);
}
.follow-mini:hover { filter: brightness(1.05); }
.followed-mini {
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  flex-shrink: 0;
}

/* ── Prompt card ────────────────────────────────────────────────── */
.prompt-card {
  padding: var(--space-4);
  background:
    radial-gradient(ellipse at top right, hsla(265 70% 60% / 0.12), transparent 60%),
    linear-gradient(135deg, hsla(16 95% 55% / 0.1), transparent 70%),
    var(--bg-surface);
}
.prompt-card h4 {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-weight: 600;
  font-size: 17px;
}
.prompt-card p {
  margin-top: 4px;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.55;
}
.share-cta {
  margin-top: var(--space-3);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background: linear-gradient(135deg, var(--accent-orange), hsl(16 95% 48%));
  color: white;
  font-weight: 700;
  font-size: 12px;
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-glow-orange);
  transition: transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out);
}
.share-cta:hover { transform: translateY(-1px); filter: brightness(1.05); }

@media (max-width: 1280px) {
  .aside { display: none; }
}
</style>
