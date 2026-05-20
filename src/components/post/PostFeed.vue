<script setup>
import PostCard from '@/components/post/PostCard.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { useUiStore } from '@/stores/ui.js'

defineProps({
  posts: { type: Array, required: true },
  showCreatePrompt: { type: Boolean, default: true },
})

const ui = useUiStore()
</script>

<template>
  <div class="feed">
    <button
      v-if="showCreatePrompt"
      class="prompt"
      @click="ui.openCreatePost()"
    >
      <SvgIcon name="quote" :size="16" />
      <span>Send a note&hellip;</span>
    </button>

    <TransitionGroup name="list" tag="div" class="letters">
      <PostCard v-for="p in posts" :key="p.id" :post="p" />
    </TransitionGroup>

    <div v-if="!posts.length" class="empty">
      <p>No notes here yet.</p>
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

.letters {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  position: relative;
}

.empty {
  padding: var(--space-8);
  text-align: center;
  color: var(--text-muted);
}
</style>
