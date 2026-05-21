<script setup>
import { computed, ref } from 'vue'
import PostCard from '@/components/post/PostCard.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { useUiStore } from '@/stores/ui.js'

const props = defineProps({
  posts: { type: Array, required: true },
  showCreatePrompt: { type: Boolean, default: true },
})

const ui = useUiStore()
const sort = ref('latest')

const tabs = [
  { id: 'latest', label: 'Latest' },
  { id: 'top', label: 'Top' },
  { id: 'hot', label: 'Hot' },
  { id: 'anonymous', label: 'Anonymous' },
]

const sortedPosts = computed(() => {
  const list = [...props.posts]
  const now = Date.now() / 1000
  switch (sort.value) {
    case 'top':
      return list.sort((a, b) => b.score - a.score)
    case 'hot':
      return list.sort((a, b) => {
        const heat = (p) => p.score / Math.pow((now - p.createdAt) / 3600 + 2, 1.5)
        return heat(b) - heat(a)
      })
    case 'anonymous':
      return list
        .filter((p) => p.author === 'anonymous')
        .sort((a, b) => b.createdAt - a.createdAt)
    case 'latest':
    default:
      return list.sort((a, b) => b.createdAt - a.createdAt)
  }
})
</script>

<template>
  <div class="feed">
    <button
      v-if="showCreatePrompt"
      class="prompt"
      @click="ui.openCreatePost()"
    >
      <SvgIcon name="quote" :size="16" />
      <span>Post a story&hellip;</span>
    </button>

    <nav class="tabs" aria-label="Sort stories">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="['tab', { active: sort === t.id }]"
        :aria-pressed="sort === t.id"
        @click="sort = t.id"
      >{{ t.label }}</button>
    </nav>

    <TransitionGroup name="list" tag="div" class="letters">
      <PostCard v-for="p in sortedPosts" :key="p.id" :post="p" />
    </TransitionGroup>

    <div v-if="!sortedPosts.length" class="empty">
      <p>No stories here yet.</p>
    </div>
  </div>
</template>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  width: 100%;
}

.prompt {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: center;
  padding: 10px 22px;
  background: transparent;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-pill);
  color: var(--text-body);
  font-size: 14px;
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.prompt:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
  border-color: var(--accent-orange);
}

.tabs {
  display: flex;
  justify-content: center;
  gap: var(--space-5);
  padding: var(--space-2) 0 var(--space-3);
  border-bottom: 1px dashed var(--paper-line);
  flex-wrap: wrap;
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

.letters {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  position: relative;
}

.empty {
  padding: var(--space-8);
  text-align: center;
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  color: var(--text-muted);
}
</style>
