<script setup>
import { computed, ref } from 'vue'
import { useCommunitiesStore } from '@/stores/communities.js'
import { usePostsStore } from '@/stores/posts.js'
import { formatCount } from '@/composables/useVote.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const communities = useCommunitiesStore()
const posts = usePostsStore()

const filter = ref('')
const list = computed(() => {
  const q = filter.value.trim().toLowerCase()
  const all = communities.communities
  if (!q) return all
  return all.filter(
    (c) => c.name.includes(q) || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
  )
})

function postCount(name) {
  return posts.getPostsBySubreddit(name).length
}
</script>

<template>
  <div class="topics">
    <header class="head">
      <div>
        <h1>All Topics</h1>
        <p class="muted">Pick a topic to read the stories — or find your own.</p>
      </div>
      <div class="search">
        <SvgIcon name="search" :size="16" />
        <input v-model="filter" placeholder="Search topics…" />
      </div>
    </header>

    <div class="grid">
      <router-link
        v-for="c in list"
        :key="c.name"
        :to="`/r/${c.name}`"
        class="topic-card"
      >
        <div class="banner" :style="{ background: c.color }">
          <span class="banner-icon">{{ c.icon }}</span>
        </div>
        <div class="meta">
          <div class="title-row">
            <h3>r/{{ c.name }}</h3>
            <button
              class="follow"
              :class="{ following: communities.isJoined(c.name) }"
              @click.prevent="communities.toggleJoin(c.name)"
            >
              {{ communities.isJoined(c.name) ? 'Following' : 'Follow' }}
            </button>
          </div>
          <p class="sub-title">{{ c.title }}</p>
          <p class="desc">{{ c.description }}</p>
          <div class="stats">
            <span><strong>{{ formatCount(c.members) }}</strong> members</span>
            <span class="online"><span class="dot" />{{ formatCount(c.online) }} online</span>
            <span class="muted">{{ postCount(c.name) }} stories</span>
          </div>
        </div>
      </router-link>
    </div>

    <div v-if="!list.length" class="empty">No topics match “{{ filter }}”.</div>
  </div>
</template>

<style scoped>
.topics { display: flex; flex-direction: column; gap: var(--space-5); }
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}
.head h1 { font-size: 26px; font-weight: 800; letter-spacing: -0.01em; }
.muted { color: var(--text-muted); font-size: 13px; margin-top: 2px; }

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  width: 240px;
  color: var(--text-muted);
}
.search input {
  background: transparent;
  border: none;
  outline: none;
  padding: 10px 0;
  width: 100%;
  color: var(--text-primary);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-3);
}
.topic-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
  cursor: pointer;
}
.topic-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-strong);
}
.banner {
  height: 80px;
  display: grid;
  place-items: center;
  position: relative;
}
.banner-icon {
  font-size: 36px;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25));
}
.meta { padding: var(--space-4); display: flex; flex-direction: column; gap: 6px; }
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}
.title-row h3 { font-size: 16px; font-weight: 800; }
.sub-title { color: var(--text-secondary); font-size: 12px; font-weight: 600; }
.desc {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.55;
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-3);
  font-size: 12px;
  color: var(--text-secondary);
}
.stats strong { color: var(--text-primary); font-weight: 700; }
.online { color: var(--success); display: inline-flex; align-items: center; gap: 4px; }
.online .dot {
  width: 6px;
  height: 6px;
  background: var(--success);
  border-radius: 50%;
}

.follow {
  padding: 5px 12px;
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 11px;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.follow:hover { background: var(--bg-hover); }
.follow.following {
  background: var(--accent-orange);
  border-color: var(--accent-orange);
  color: white;
}

.empty {
  text-align: center;
  padding: var(--space-8);
  background: var(--bg-surface);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-muted);
}
</style>
