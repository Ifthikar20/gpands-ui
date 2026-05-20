<script setup>
import { computed, ref } from 'vue'
import { useCommunitiesStore } from '@/stores/communities.js'

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
  <div class="capsules">
    <input
      v-model="filter"
      type="text"
      class="filter"
      placeholder="Find a capsule"
    />

    <ul class="list">
      <li v-for="c in list" :key="c.name">
        <router-link :to="`/c/${c.name}`" class="entry">
          <span class="name">{{ c.name }}</span>
          <span class="title">{{ c.title }}</span>
        </router-link>
      </li>
    </ul>

    <p v-if="!list.length" class="empty">no capsules match.</p>
  </div>
</template>

<style scoped>
.capsules {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-6) 0;
}

.filter {
  align-self: center;
  width: 240px;
  background: transparent;
  border: none;
  border-bottom: 1px dashed var(--border-strong);
  padding: 8px 4px;
  font-family: var(--font-typewriter);
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--text-primary);
  text-align: center;
  outline: none;
  transition: border-color var(--dur-fast) var(--ease-out);
}
.filter::placeholder {
  color: var(--text-muted);
  text-transform: lowercase;
  letter-spacing: 0.04em;
}
.filter:focus { border-color: var(--accent-orange); }

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  align-items: center;
  margin: 0;
  padding: var(--space-4) 0;
}

.entry {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  transition: transform var(--dur-fast) var(--ease-out);
}
.entry:hover { transform: translateY(-1px); }

.name {
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.title {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 22px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.005em;
  line-height: 1.2;
  transition: color var(--dur-fast) var(--ease-out);
}
.entry:hover .title { color: var(--accent-orange); }

.empty {
  text-align: center;
  font-family: var(--font-typewriter);
  font-size: 13px;
  color: var(--text-muted);
  padding: var(--space-6) 0;
}
</style>
