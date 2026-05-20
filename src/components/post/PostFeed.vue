<script setup>
import { computed } from 'vue'
import SortTabs from '@/components/common/SortTabs.vue'
import PostCard from '@/components/post/PostCard.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { useUiStore } from '@/stores/ui.js'
import { useUserStore } from '@/stores/user.js'

const props = defineProps({
  posts: { type: Array, required: true },
  showCreatePrompt: { type: Boolean, default: true },
})

const ui = useUiStore()
const user = useUserStore()

const sort = computed({
  get: () => ui.activeSort,
  set: (v) => ui.setSort(v),
})
</script>

<template>
  <div class="feed">
    <div v-if="showCreatePrompt" class="create-prompt paper">
      <UserAvatar :username="user.currentUser.username" :size="36" />
      <button class="create-input" @click="ui.openCreatePost()">Share a story…</button>
      <button class="icon-pill" @click="ui.openCreatePost()" aria-label="Image story">
        <SvgIcon name="image" :size="18" />
      </button>
      <button class="icon-pill" @click="ui.openCreatePost()" aria-label="Quote story">
        <SvgIcon name="quote" :size="18" />
      </button>
    </div>

    <SortTabs v-model="sort" />

    <TransitionGroup name="list" tag="div" class="post-list">
      <PostCard v-for="p in posts" :key="p.id" :post="p" />
    </TransitionGroup>

    <div v-if="!posts.length" class="empty">
      <p>Nothing here yet — be the first to post!</p>
    </div>
  </div>
</template>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}
.create-prompt {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  border-radius: var(--radius-card);
  padding: var(--space-3) var(--space-4);
}
.create-input {
  flex: 1;
  text-align: left;
  background: var(--bg-elevated);
  color: var(--text-muted);
  padding: 10px 14px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  transition: border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.create-input:hover {
  border-color: var(--border-strong);
  background: var(--bg-hover);
}
.icon-pill {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
  color: var(--text-secondary);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.icon-pill:hover { background: var(--bg-hover); color: var(--text-primary); }

.post-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  position: relative;
}
.empty {
  padding: var(--space-8);
  background: var(--bg-surface);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
  text-align: center;
  color: var(--text-muted);
}
</style>
