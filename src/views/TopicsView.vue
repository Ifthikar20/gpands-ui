<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCommunitiesStore } from '@/stores/communities.js'
import { usePostsStore } from '@/stores/posts.js'

const communities = useCommunitiesStore()
const posts = usePostsStore()
const route = useRoute()

const filter = ref('popular')
const tabs = [
  { id: 'popular', label: 'Popular' },
  { id: 'latest', label: 'Latest' },
]

function latestPostTime(name) {
  const list = posts.getPostsBySubreddit(name)
  if (!list.length) return 0
  let max = 0
  for (const p of list) if (p.createdAt > max) max = p.createdAt
  return max
}

const list = computed(() => {
  const all = [...communities.communities]
  switch (filter.value) {
    case 'latest':
      return all.sort((a, b) => latestPostTime(b.name) - latestPostTime(a.name))
    case 'popular':
    default:
      return all.sort((a, b) => b.members - a.members)
  }
})

const activeName = computed(() => route.params.subreddit || null)
</script>

<template>
  <div class="topics-page">
    <nav class="filter-tabs" aria-label="Sort topics">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="['tab', { active: filter === t.id }]"
        :aria-pressed="filter === t.id"
        @click="filter = t.id"
      >{{ t.label }}</button>
    </nav>

    <nav class="cloud">
      <router-link
        v-for="c in list"
        :key="c.name"
        :to="`/c/${c.name}`"
        class="topic"
        :class="{ active: c.name === activeName || communities.isJoined(c.name) }"
      >{{ c.title }}</router-link>
    </nav>
  </div>
</template>

<style scoped>
.topics-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-4);
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: var(--space-5);
  padding: var(--space-2) 0 var(--space-3);
  border-bottom: 1px dashed var(--paper-line);
}
.tab {
  background: transparent;
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px 2px 8px;
  position: relative;
  transition: color var(--dur-fast) var(--ease-out);
}
.tab:hover { color: var(--text-primary); }
.tab.active { color: var(--accent-orange); }
.tab.active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -1px;
  transform: translateX(-50%);
  width: 28px;
  height: 2px;
  background: var(--accent-orange);
  border-radius: 1px;
}

.cloud {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 6px 28px;
  padding: var(--space-6) var(--space-4) var(--space-8);
  line-height: 1.9;
  max-width: 1100px;
  margin: 0 auto;
}
.topic {
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 500;
  color: hsla(34 4% 41% / 0.4);
  letter-spacing: -0.005em;
  white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-out), font-weight var(--dur-fast) var(--ease-out);
}
:root[data-theme='dark'] .topic {
  color: hsla(35 8% 70% / 0.32);
}
.topic:hover {
  color: var(--text-primary);
  font-weight: 600;
}
.topic.active {
  color: var(--text-primary);
  font-weight: 700;
}

@media (max-width: 720px) {
  .topic { font-size: 18px; }
  .cloud { gap: 4px 18px; padding: var(--space-6) var(--space-3); }
}
</style>
