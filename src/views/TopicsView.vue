<script setup>
import { computed, ref } from 'vue'
import { useCommunitiesStore } from '@/stores/communities.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const communities = useCommunitiesStore()

const filter = ref('')
const list = computed(() => {
  const q = filter.value.trim().toLowerCase()
  const all = communities.communities
  if (!q) return all
  return all.filter(
    (c) => c.name.includes(q) || c.title.toLowerCase().includes(q),
  )
})
</script>

<template>
  <div class="capsules-view">
    <header class="head">
      <h1>Pick a capsule</h1>
      <p class="muted">Every capsule is a place to send a note. Tap one to read what's inside.</p>
      <div class="search">
        <SvgIcon name="search" :size="16" />
        <input v-model="filter" placeholder="Search capsules…" />
      </div>
    </header>

    <nav class="cloud">
      <router-link
        v-for="c in list"
        :key="c.name"
        :to="`/c/${c.name}`"
        class="tag"
        :class="{ joined: communities.isJoined(c.name) }"
      >
        {{ c.title }}
      </router-link>
    </nav>

    <div v-if="!list.length" class="empty">No capsules match “{{ filter }}”.</div>
  </div>
</template>

<style scoped>
.capsules-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding-top: var(--space-4);
}
.head {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.head h1 {
  font-family: var(--font-script);
  font-size: 48px;
  font-weight: 500;
  letter-spacing: -0.005em;
  color: var(--text-primary);
  line-height: 1;
}
.muted {
  color: var(--text-body);
  font-size: 16px;
  line-height: 1.7;
  max-width: 480px;
}

.search {
  margin-top: var(--space-4);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  width: 280px;
  color: var(--text-muted);
}
.search input {
  background: transparent;
  border: none;
  outline: none;
  padding: 10px 0;
  width: 100%;
  color: var(--text-primary);
  font-size: 14px;
}

.cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 28px;
  justify-content: center;
  padding: var(--space-6) var(--space-4) var(--space-8);
  max-width: 980px;
  margin: 0 auto;
  line-height: 1.6;
  text-align: center;
}
.tag {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(18px, 1.6vw, 24px);
  font-weight: 500;
  letter-spacing: -0.005em;
  color: hsla(34 4% 41% / 0.4);
  transition: color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
  cursor: pointer;
  white-space: nowrap;
}
:root[data-theme='dark'] .tag {
  color: hsla(35 8% 70% / 0.35);
}
.tag:hover {
  color: var(--text-primary);
  transform: translateY(-1px);
}
.tag.joined {
  color: var(--accent-orange);
  font-weight: 600;
}

.empty {
  text-align: center;
  padding: var(--space-8);
  color: var(--text-muted);
}
</style>
