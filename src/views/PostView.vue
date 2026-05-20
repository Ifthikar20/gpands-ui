<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostDetail from '@/components/post/PostDetail.vue'
import CommentThread from '@/components/comment/CommentThread.vue'
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
    <button class="back" @click="back">&larr; Return</button>

    <template v-if="post">
      <PostDetail :post="post" />
      <CommentThread :comments="post.comments || []" :post-id="post.id" />
    </template>

    <div v-else class="missing paper">
      <h2>This letter wasn't found.</h2>
      <p>It may have been removed, or the link is wrong.</p>
      <router-link to="/" class="back-link">Back to the feed</router-link>
    </div>
  </div>
</template>

<style scoped>
.post-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.back {
  align-self: flex-start;
  padding: 4px 6px 4px 0;
  background: transparent;
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 700;
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out);
}
.back:hover { color: var(--text-primary); }

.missing {
  border-radius: var(--radius-card);
  padding: var(--space-8);
  text-align: center;
}
.missing h2 {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: var(--space-3);
  color: var(--text-primary);
}
.missing p {
  font-family: var(--font-typewriter);
  font-size: 14px;
  color: var(--text-body);
  margin-bottom: var(--space-5);
}
.back-link {
  display: inline-block;
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-orange);
  font-weight: 700;
}
.back-link:hover { text-decoration: underline; }
</style>
