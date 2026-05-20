<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostDetail from '@/components/post/PostDetail.vue'
import CommentThread from '@/components/comment/CommentThread.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { usePostsStore } from '@/stores/posts.js'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()

const post = computed(() => postsStore.getPostById(route.params.id))

function back() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>

<template>
  <div class="post-view">
    <button class="back" @click="back">
      <SvgIcon name="chevronDown" :size="16" class="back-arrow" />
      <span>Back</span>
    </button>

    <template v-if="post">
      <PostDetail :post="post" />
      <CommentThread :comments="post.comments || []" :post-id="post.id" />
    </template>

    <div v-else class="missing paper">
      <h2>Post not found</h2>
      <p>The post you're looking for doesn't exist or has been removed.</p>
      <router-link to="/" class="back-link">Back to home</router-link>
    </div>
  </div>
</template>

<style scoped>
.post-view { display: flex; flex-direction: column; gap: var(--space-3); }
.back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  width: fit-content;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.back:hover { background: var(--bg-hover); color: var(--text-primary); }
.back-arrow { transform: rotate(90deg); }

.missing {
  border-radius: var(--radius-md);
  padding: var(--space-8);
  text-align: center;
}
.missing h2 { font-size: 18px; margin-bottom: 8px; }
.missing p { color: var(--text-muted); margin-bottom: var(--space-4); }
.back-link {
  display: inline-block;
  padding: 8px 16px;
  background: var(--accent-orange);
  color: white;
  border-radius: var(--radius-pill);
  font-weight: 700;
}
</style>
