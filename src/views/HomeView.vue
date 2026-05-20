<script setup>
import { computed } from 'vue'
import PostFeed from '@/components/post/PostFeed.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useUiStore } from '@/stores/ui.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const postsStore = usePostsStore()
const ui = useUiStore()

const posts = computed(() => postsStore.sortedPosts(ui.activeSort))
</script>

<template>
  <div class="home">
    <section class="hero-strip">
      <SvgIcon name="quote" :size="22" class="q" />
      <div>
        <h2>Tell us what happened.</h2>
        <p>Real stories from real people, organized by the things life is made of.</p>
      </div>
      <button class="cta" @click="ui.openCreatePost()">Share yours</button>
    </section>
    <PostFeed :posts="posts" />
  </div>
</template>

<style scoped>
.home { display: flex; flex-direction: column; gap: var(--space-4); }
.hero-strip {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background:
    radial-gradient(ellipse at top right, hsla(265 70% 60% / 0.18), transparent 60%),
    linear-gradient(135deg, hsla(16 95% 55% / 0.16), transparent 70%),
    var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}
.q {
  color: var(--accent-orange);
  flex-shrink: 0;
}
.hero-strip > div { flex: 1; min-width: 0; }
.hero-strip h2 {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.01em;
}
.hero-strip p {
  color: var(--text-secondary);
  font-size: 13px;
  margin-top: 2px;
}
.cta {
  padding: 9px 18px;
  background: linear-gradient(135deg, var(--accent-orange), hsl(16 95% 48%));
  color: white;
  font-weight: 700;
  font-size: 13px;
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-glow-orange);
  transition: filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
  white-space: nowrap;
  flex-shrink: 0;
}
.cta:hover { filter: brightness(1.06); transform: translateY(-1px); }

@media (max-width: 640px) {
  .hero-strip { flex-wrap: wrap; }
  .hero-strip .cta { width: 100%; }
}
</style>
