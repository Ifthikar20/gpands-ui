<script setup>
import { computed } from 'vue'
import PostFeed from '@/components/post/PostFeed.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useUiStore } from '@/stores/ui.js'

const postsStore = usePostsStore()
const ui = useUiStore()

const posts = computed(() => postsStore.sortedPosts(ui.activeSort))
</script>

<template>
  <PostFeed :posts="posts" />
</template>
