<script setup>
import { ref, computed } from 'vue'
import CommentItem from '@/components/comment/CommentItem.vue'

const props = defineProps({
  comments: { type: Array, required: true },
  postId: { type: String, required: true },
})

const sort = ref('best')
const sorted = computed(() => {
  const list = [...props.comments]
  switch (sort.value) {
    case 'new': return list.sort((a, b) => b.createdAt - a.createdAt)
    case 'top': return list.sort((a, b) => b.score - a.score)
    case 'best':
    default: return list.sort((a, b) => b.score - a.score)
  }
})
</script>

<template>
  <section class="thread">
    <header class="head">
      <span class="label">Replies &middot; {{ comments.length }}</span>
      <select v-model="sort" class="sort" aria-label="Sort replies">
        <option value="best">Best</option>
        <option value="top">Top</option>
        <option value="new">New</option>
      </select>
    </header>

    <p v-if="!comments.length" class="empty">
      No replies yet. Be the first to write back.
    </p>

    <div v-else class="list">
      <CommentItem
        v-for="c in sorted"
        :key="c.id"
        :comment="c"
        :post-id="postId"
        :depth="0"
      />
    </div>
  </section>
</template>

<style scoped>
.thread {
  max-width: 720px;
  margin: var(--space-8) auto 0;
  padding: 0 var(--space-6);
}
.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: var(--space-3);
  border-bottom: 1px dashed var(--paper-line);
  margin-bottom: var(--space-4);
}
.label {
  font-family: var(--font-typewriter);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 700;
}
.sort {
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.06em;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  outline: none;
}
.empty {
  text-align: center;
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  color: var(--text-muted);
  padding: var(--space-6);
}
.list {
  display: flex;
  flex-direction: column;
}

@media (max-width: 640px) {
  .thread { padding: 0 var(--space-4); }
}
</style>
