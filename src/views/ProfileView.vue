<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts.js'
import { useUserStore } from '@/stores/user.js'
import { users as dataUsers } from '@/data/mock-data.js'
import PostCard from '@/components/post/PostCard.vue'
import { useRelativeTime } from '@/composables/useRelativeTime.js'

const route = useRoute()
const postsStore = usePostsStore()
const userStore = useUserStore()

const username = computed(() => {
  const u = route.params.username
  return !u || u === 'me' ? userStore.currentUser.username : u
})

const user = computed(() => {
  if (username.value === userStore.currentUser.username) {
    return { ...userStore.currentUser }
  }
  const found = dataUsers.pool.find((u) => u.username === username.value)
  return found
    ? {
        username: found.username,
        displayName: found.username.replace(/_/g, ' '),
        bio: '',
        joined: Math.floor(Date.now() / 1000) - 200 * 86400,
      }
    : null
})

const userPosts = computed(() => {
  if (!user.value) return []
  return postsStore.posts
    .filter((p) => p.author === user.value.username)
    .sort((a, b) => b.createdAt - a.createdAt)
})

const joinedTime = useRelativeTime(() => user.value?.joined || 0)
</script>

<template>
  <div v-if="user" class="profile">
    <header class="letterhead">
      <p class="kicker">Letters from</p>
      <h1 class="name">{{ user.displayName || user.username }}</h1>
      <p class="meta">
        <span>{{ userPosts.length }} {{ userPosts.length === 1 ? 'story' : 'stories' }}</span>
        <span class="sep" aria-hidden="true">&middot;</span>
        <span>Joined {{ joinedTime }}</span>
      </p>
      <div class="rule" aria-hidden="true" />
    </header>

    <div v-if="userPosts.length" class="list">
      <PostCard v-for="p in userPosts" :key="p.id" :post="p" />
    </div>

    <p v-else class="empty">
      No stories yet.
      <span v-if="username === userStore.currentUser.username">
        Click <em>Post a story</em> to write one.
      </span>
    </p>
  </div>

  <div v-else class="missing">
    <p class="missing-text">No one called <em>{{ route.params.username }}</em> writes here.</p>
    <router-link to="/" class="back-link">&larr; Return</router-link>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.letterhead {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: var(--space-4) 0 0;
}
.kicker {
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--text-muted);
}
.name {
  font-family: var(--font-script);
  font-size: 48px;
  font-weight: 500;
  color: var(--accent-orange);
  line-height: 1.05;
  text-transform: capitalize;
  letter-spacing: -0.005em;
}
.meta {
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  font-family: var(--font-typewriter);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}
.sep { color: var(--text-muted); }
.rule {
  margin-top: var(--space-4);
  height: 1px;
  width: 80px;
  background: var(--paper-line);
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.empty {
  text-align: center;
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 15px;
  color: var(--text-muted);
  padding: var(--space-8) var(--space-4);
}
.empty em {
  font-family: var(--font-typewriter);
  font-style: normal;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.missing {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}
.missing-text {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 16px;
  color: var(--text-body);
}
.back-link {
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--accent-orange);
}
.back-link:hover { text-decoration: underline; }

@media (max-width: 640px) {
  .name { font-size: 38px; }
}
</style>
