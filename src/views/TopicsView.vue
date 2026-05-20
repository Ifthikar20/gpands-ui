<script setup>
import { computed, ref } from 'vue'
import { useCommunitiesStore } from '@/stores/communities.js'
import { usePostsStore } from '@/stores/posts.js'
import { formatCount } from '@/composables/useVote.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import CapsuleChip from '@/components/common/CapsuleChip.vue'

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
  <div class="capsules-view">
    <header class="head">
      <div>
        <h1>All capsules</h1>
        <p class="muted">Pick a capsule to read the notes — or find your own.</p>
      </div>
      <div class="search">
        <SvgIcon name="search" :size="16" />
        <input v-model="filter" placeholder="Search capsules…" />
      </div>
    </header>

    <ol class="capsule-list paper">
      <li v-for="c in list" :key="c.name">
        <router-link :to="`/c/${c.name}`" class="row">
          <CapsuleChip :name="c.name" size="md" :linkable="false" />
          <div class="text">
            <h3 class="row-title">{{ c.title }}</h3>
            <p class="row-desc">{{ c.description }}</p>
          </div>
          <div class="stats">
            <span class="members">{{ formatCount(c.members) }} members</span>
            <span class="notes">{{ postCount(c.name) }} notes</span>
          </div>
          <button
            class="follow"
            :class="{ following: communities.isJoined(c.name) }"
            @click.prevent="communities.toggleJoin(c.name)"
          >
            {{ communities.isJoined(c.name) ? 'Following' : 'Follow' }}
          </button>
        </router-link>
      </li>
    </ol>

    <div v-if="!list.length" class="empty">No capsules match “{{ filter }}”.</div>
  </div>
</template>

<style scoped>
.capsules-view { display: flex; flex-direction: column; gap: var(--space-5); }
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}
.head h1 {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.muted {
  color: var(--text-body);
  font-size: 14px;
  line-height: 1.7;
  margin-top: 4px;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  width: 260px;
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

.capsule-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-card);
}
.capsule-list li + li .row {
  border-top: 1px dashed var(--paper-line);
}
.row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}
.row:hover { background: hsla(0 0% 0% / 0.03); }
:root[data-theme='dark'] .row:hover { background: hsla(0 0% 100% / 0.03); }

.text { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.row-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.005em;
  color: var(--text-primary);
}
.row-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-body);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  font-size: 13px;
  color: var(--text-body);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  line-height: 1.7;
}
.notes { color: var(--text-muted); font-size: 12px; }

.follow {
  padding: 7px 16px;
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 12px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
  white-space: nowrap;
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
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-card);
  color: var(--text-muted);
}

@media (max-width: 720px) {
  .row {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }
  .stats { display: none; }
  .row-desc { -webkit-line-clamp: 2; }
}
</style>
