<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCommunitiesStore } from '@/stores/communities.js'

const communities = useCommunitiesStore()
const route = useRoute()

const list = computed(() => communities.communities)
const activeName = computed(() => route.params.subreddit || null)
</script>

<template>
  <nav class="cloud">
    <router-link
      v-for="c in list"
      :key="c.name"
      :to="`/c/${c.name}`"
      class="topic"
      :class="{ active: c.name === activeName || communities.isJoined(c.name) }"
    >{{ c.title }}</router-link>
  </nav>
</template>

<style scoped>
.cloud {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 6px 28px;
  padding: var(--space-8) var(--space-4);
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
