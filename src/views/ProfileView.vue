<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts.js'
import { useUserStore } from '@/stores/user.js'
import { users as dataUsers } from '@/data/mock-data.js'
import PostCard from '@/components/post/PostCard.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { formatCount } from '@/composables/useVote.js'
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
    ? { username: found.username, displayName: '@' + found.username, karma: found.karma, bio: '', joined: Math.floor(Date.now() / 1000) - 200 * 86400 }
    : null
})

const tab = ref('stories')

const userPosts = computed(() => {
  if (!user.value) return []
  return postsStore.posts.filter((p) => p.author === user.value.username)
})

const commentCount = computed(() => {
  if (!user.value) return 0
  let count = 0
  const walk = (arr) => {
    for (const c of arr) {
      if (c.author === user.value.username) count++
      if (c.children?.length) walk(c.children)
    }
  }
  for (const p of postsStore.posts) walk(p.comments || [])
  return count
})

const joinedTime = useRelativeTime(() => user.value?.joined || 0)
</script>

<template>
  <div v-if="user" class="profile">
    <header class="profile-head">
      <div class="banner" />
      <div class="head-content">
        <UserAvatar :username="user.username" :size="96" online />
        <div class="head-meta">
          <h1>{{ user.displayName || user.username }}</h1>
          <p class="handle">u/{{ user.username }}</p>
          <p v-if="user.bio" class="bio">“{{ user.bio }}”</p>
          <p class="joined">Joined {{ joinedTime }}</p>
        </div>
        <button class="follow-btn" v-if="username !== userStore.currentUser.username">Follow</button>
        <button class="follow-btn ghost" v-else>Edit profile</button>
      </div>

      <div class="stats">
        <div>
          <div class="stat-num">{{ formatCount(user.karma) }}</div>
          <div class="stat-label">Karma</div>
        </div>
        <div>
          <div class="stat-num">{{ userPosts.length }}</div>
          <div class="stat-label">Stories</div>
        </div>
        <div>
          <div class="stat-num">{{ commentCount }}</div>
          <div class="stat-label">Comments</div>
        </div>
      </div>
    </header>

    <nav class="tabs">
      <button class="tab" :class="{ active: tab === 'stories' }" @click="tab = 'stories'">Stories</button>
      <button class="tab" :class="{ active: tab === 'comments' }" @click="tab = 'comments'">Comments</button>
      <button class="tab" :class="{ active: tab === 'about' }" @click="tab = 'about'">About</button>
    </nav>

    <div v-if="tab === 'stories'" class="list">
      <PostCard v-for="p in userPosts" :key="p.id" :post="p" />
      <div v-if="!userPosts.length" class="empty">
        No stories yet. <span v-if="username === userStore.currentUser.username">Click <em>Share a story</em> to tell one.</span>
      </div>
    </div>

    <div v-if="tab === 'comments'" class="empty">
      {{ commentCount }} comment{{ commentCount === 1 ? '' : 's' }} across stories. Comment threads coming soon.
    </div>

    <div v-if="tab === 'about'" class="about-card">
      <h3>About {{ user.displayName || 'u/' + user.username }}</h3>
      <p v-if="user.bio">{{ user.bio }}</p>
      <p v-else class="muted">No bio yet.</p>
      <dl>
        <div><dt>Karma</dt><dd>{{ formatCount(user.karma) }}</dd></div>
        <div><dt>Joined</dt><dd>{{ joinedTime }}</dd></div>
      </dl>
    </div>
  </div>

  <div v-else class="missing">
    <h2>User not found</h2>
    <p>u/{{ route.params.username }} doesn't exist.</p>
    <router-link to="/" class="back-link">Back to home</router-link>
  </div>
</template>

<style scoped>
.profile { display: flex; flex-direction: column; gap: var(--space-4); }
.profile-head {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.banner {
  height: 120px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-purple));
}
.head-content {
  display: flex;
  align-items: flex-end;
  gap: var(--space-4);
  padding: 0 var(--space-5) var(--space-4);
  margin-top: -48px;
  position: relative;
  flex-wrap: wrap;
}
.head-content :deep(.avatar) {
  border: 4px solid var(--bg-surface);
  box-shadow: var(--shadow-md);
}
.head-meta { flex: 1; min-width: 200px; padding-top: 50px; }
.head-meta h1 { font-size: 22px; font-weight: 800; }
.handle { color: var(--text-muted); font-size: 13px; }
.bio {
  margin-top: 6px;
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  color: var(--text-secondary);
}
.joined { margin-top: 6px; font-size: 12px; color: var(--text-muted); }

.follow-btn {
  margin-top: 50px;
  padding: 9px 22px;
  background: var(--accent-orange);
  color: white;
  font-weight: 700;
  border-radius: var(--radius-pill);
  transition: filter var(--dur-fast) var(--ease-out);
}
.follow-btn:hover { filter: brightness(1.1); }
.follow-btn.ghost {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
}

.stats {
  display: flex;
  gap: var(--space-6);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
}
.stat-num { font-size: 18px; font-weight: 800; }
.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tabs {
  display: flex;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 4px;
  gap: 4px;
  width: fit-content;
}
.tab {
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 13px;
  color: var(--text-secondary);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.tab:hover { color: var(--text-primary); }
.tab.active {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.list { display: flex; flex-direction: column; gap: var(--space-3); }
.empty {
  text-align: center;
  padding: var(--space-8);
  background: var(--bg-surface);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-muted);
}

.about-card {
  padding: var(--space-5);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}
.about-card h3 { font-size: 16px; font-weight: 700; margin-bottom: var(--space-3); }
.about-card .muted { color: var(--text-muted); }
.about-card dl {
  margin-top: var(--space-4);
  display: grid;
  gap: var(--space-2);
}
.about-card dl > div {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-top: 1px solid var(--border-subtle);
  font-size: 13px;
}
.about-card dt { color: var(--text-muted); }
.about-card dd { font-weight: 600; }

.missing {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-8);
  text-align: center;
}
.missing h2 { font-size: 18px; margin-bottom: 8px; }
.back-link {
  display: inline-block;
  margin-top: var(--space-3);
  padding: 8px 16px;
  background: var(--accent-orange);
  color: white;
  border-radius: var(--radius-pill);
  font-weight: 700;
}
</style>
