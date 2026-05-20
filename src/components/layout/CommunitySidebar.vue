<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCommunitiesStore } from '@/stores/communities.js'
import { useUiStore } from '@/stores/ui.js'
import { formatCount } from '@/composables/useVote.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const route = useRoute()
const communities = useCommunitiesStore()
const ui = useUiStore()
const openCreate = () => ui.openCreatePost()

const community = computed(() => {
  const name = route.params.subreddit
  return name ? communities.getCommunity(name) : null
})

const trending = computed(() => communities.popularCommunities.slice(0, 5))
const rulesOpen = ref(true)
</script>

<template>
  <aside class="aside">
    <section v-if="community" class="card community">
      <div class="banner" :style="{ background: community.color }" />
      <div class="community-head">
        <span class="comm-icon" :style="{ background: community.color }">
          <SvgIcon :name="community.icon" :size="28" />
        </span>
        <div>
          <h3>r/{{ community.name }}</h3>
          <p class="muted">{{ community.title }}</p>
        </div>
      </div>
      <p class="desc">{{ community.description }}</p>
      <div class="stats">
        <div>
          <div class="stat-num">{{ formatCount(community.members) }}</div>
          <div class="stat-label">Members</div>
        </div>
        <div>
          <div class="stat-num"><span class="dot" /> {{ formatCount(community.online) }}</div>
          <div class="stat-label">Online</div>
        </div>
      </div>
      <button
        class="join"
        :class="{ joined: communities.isJoined(community.name) }"
        @click="communities.toggleJoin(community.name)"
      >
        {{ communities.isJoined(community.name) ? 'Following' : 'Follow' }}
      </button>

      <div class="rules">
        <button class="rules-head" @click="rulesOpen = !rulesOpen">
          <span>Posting Guidelines</span>
          <span class="muted" :class="{ rot: !rulesOpen }">▾</span>
        </button>
        <Transition name="slide-up">
          <ol v-if="rulesOpen">
            <li v-for="(r, i) in community.rules" :key="i">
              <span class="rule-num">{{ i + 1 }}</span>
              <span>{{ r }}</span>
            </li>
          </ol>
        </Transition>
      </div>
    </section>

    <section v-else class="card welcome">
      <div class="welcome-banner" />
      <h3>Welcome to <em>Good People &amp; Story</em></h3>
      <p>Everyone has a story worth telling. Pick a topic. Write what happened. Be heard.</p>
      <button class="join" @click="openCreate">Share your story</button>
    </section>

    <section class="card">
      <h4 class="card-title">Trending Topics</h4>
      <ul class="trend-list">
        <li v-for="(c, i) in trending" :key="c.name">
          <router-link :to="`/r/${c.name}`" class="trend-item">
            <span class="rank">{{ i + 1 }}</span>
            <span class="trend-icon" :style="{ background: c.color }">
              <SvgIcon :name="c.icon" :size="14" />
            </span>
            <div>
              <div class="trend-name">r/{{ c.name }}</div>
              <div class="muted small">{{ formatCount(c.members) }} members</div>
            </div>
          </router-link>
        </li>
      </ul>
    </section>

    <footer class="legal">
      <router-link to="/about">About</router-link> ·
      <router-link to="/topics">Topics</router-link> ·
      <a>Guidelines</a> · <a>Help</a><br />
      <span class="muted">Copyright 2026 Good People &amp; Story</span>
    </footer>
  </aside>
</template>

<style scoped>
.aside {
  width: var(--aside-width);
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-4));
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-self: flex-start;
  max-height: calc(100vh - var(--navbar-height) - var(--space-6));
  overflow-y: auto;
  padding-right: 4px;
}
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.community .banner {
  height: 56px;
}
.community-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4) 0;
  margin-top: -22px;
}
.comm-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
  border: 3px solid var(--bg-surface);
  flex-shrink: 0;
}
.community-head h3 {
  font-size: 16px;
  font-weight: 700;
}
.muted { color: var(--text-muted); font-size: 12px; }
.desc {
  padding: var(--space-3) var(--space-4);
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.55;
}
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
  padding: 0 var(--space-4);
}
.stat-num {
  font-size: 16px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.stat-num .dot {
  width: 8px;
  height: 8px;
  background: var(--success);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--success);
}
.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.join {
  margin: var(--space-4);
  padding: 10px 18px;
  background: var(--accent-orange);
  color: white;
  font-weight: 700;
  border-radius: var(--radius-pill);
  transition: filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
  width: calc(100% - var(--space-8));
}
.join:hover { filter: brightness(1.1); transform: translateY(-1px); }
.join.joined {
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
}
.rules {
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-3) var(--space-4) var(--space-4);
}
.rules-head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 13px;
  padding: 4px 0;
}
.rules-head .rot { display: inline-block; transform: rotate(-90deg); }
.rules ol {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: var(--space-2);
}
.rules li {
  display: flex;
  gap: 10px;
  padding: 8px 4px;
  font-size: 13px;
  border-top: 1px solid var(--border-subtle);
}
.rule-num {
  color: var(--text-muted);
  font-weight: 700;
  min-width: 16px;
}
.welcome { padding: 0 0 var(--space-4); }
.welcome-banner {
  height: 56px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-purple));
}
.welcome h3 { padding: var(--space-4) var(--space-4) var(--space-2); font-size: 16px; }
.welcome p { padding: 0 var(--space-4); color: var(--text-secondary); font-size: 13px; }
.welcome .join { margin-top: var(--space-3); }

.card-title {
  padding: var(--space-3) var(--space-4);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
}
.trend-list { padding: var(--space-2); }
.trend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  transition: background var(--dur-fast) var(--ease-out);
}
.trend-item:hover { background: var(--bg-hover); }
.rank { font-weight: 700; color: var(--text-muted); width: 16px; }
.trend-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
}
.trend-name { font-size: 13px; font-weight: 600; }
.small { font-size: 11px; }

.legal {
  font-size: 11px;
  color: var(--text-secondary);
  padding: var(--space-2);
  line-height: 1.7;
}
.legal a { cursor: pointer; }
.legal a:hover { text-decoration: underline; }

@media (max-width: 1180px) {
  .aside { display: none; }
}
</style>
