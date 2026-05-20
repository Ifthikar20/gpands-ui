<script setup>
import { computed } from 'vue'
import PostFeed from '@/components/post/PostFeed.vue'
import { usePostsStore } from '@/stores/posts.js'

const postsStore = usePostsStore()
const posts = computed(() => postsStore.sortedPosts('top'))
</script>

<template>
  <div class="popular">
    <header class="head">
      <h1>Popular this week</h1>
      <p class="muted">The stories the community is reading right now.</p>
    </header>
    <PostFeed :posts="posts" :show-create-prompt="false" />
  </div>
</template>

<style scoped>
.popular { display: flex; flex-direction: column; gap: var(--space-4); }
.head h1 { font-size: 24px; font-weight: 800; letter-spacing: -0.01em; }
.muted { color: var(--text-muted); margin-top: 4px; font-size: 13px; }
</style>
