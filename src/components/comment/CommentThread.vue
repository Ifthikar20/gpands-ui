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
    case 'new':
      return list.sort((a, b) => b.createdAt - a.createdAt)
    case 'top':
      return list.sort((a, b) => b.score - a.score)
    case 'best':
    default:
      return list.sort((a, b) => b.score - a.score)
  }
})
</script>

<template>
  <section class="thread">
    <div class="thread-head">
      <span class="muted">Sort by</span>
      <div class="sort-select">
        <select v-model="sort">
          <option value="best">Best</option>
          <option value="top">Top</option>
          <option value="new">New</option>
        </select>
      </div>
    </div>

    <div v-if="!comments.length" class="empty">No comments yet — be the first to comment.</div>

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
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: var(--space-5) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  box-shadow: var(--shadow-sm);
}
.thread-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border-subtle);
}
.muted { color: var(--text-muted); font-size: 12px; }
.sort-select select {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.sort-select select option { background: var(--bg-elevated); }
.empty {
  padding: var(--space-6);
  text-align: center;
  color: var(--text-muted);
}
.list {
  display: flex;
  flex-direction: column;
}
.list > :not(:first-child) {
  border-top: 1px solid var(--border-subtle);
}
</style>
