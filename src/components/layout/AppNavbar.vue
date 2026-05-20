<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { useUiStore } from '@/stores/ui.js'
import { useUserStore } from '@/stores/user.js'

const ui = useUiStore()
const user = useUserStore()
const router = useRouter()

const query = ref('')
const focused = ref(false)
const userMenuOpen = ref(false)

function onSearch(e) {
  e.preventDefault()
  // No-op (UI only) — but keep snappy feel.
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <button class="menu-btn" aria-label="Menu" @click="ui.toggleSidebar()">
        <SvgIcon name="menu" :size="20" />
      </button>

      <router-link to="/" class="brand" aria-label="Home">
        <span class="brand-mark"><SvgIcon name="reddit" :size="32" /></span>
        <span class="brand-text">reddit</span>
      </router-link>

      <form class="search" :class="{ focused }" @submit="onSearch">
        <SvgIcon name="search" :size="18" />
        <input
          v-model="query"
          type="text"
          placeholder="Search Reddit"
          @focus="focused = true"
          @blur="focused = false"
        />
      </form>

      <div class="nav-actions">
        <button class="icon-btn" aria-label="Create post" @click="ui.openCreatePost()">
          <SvgIcon name="plus" :size="20" />
        </button>
        <button class="icon-btn" aria-label="Chat">
          <SvgIcon name="chat" :size="20" />
        </button>
        <button class="icon-btn" aria-label="Notifications">
          <SvgIcon name="bell" :size="20" />
          <span class="dot" />
        </button>

        <button class="user-chip" @click="userMenuOpen = !userMenuOpen">
          <UserAvatar :username="user.currentUser.username" :size="28" online />
          <span class="user-name">{{ user.currentUser.username }}</span>
          <SvgIcon name="chevronDown" :size="16" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 30;
  height: var(--navbar-height);
  background: var(--glass-strong);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid var(--glass-border);
}
.navbar-inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-4);
}
.menu-btn {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  align-items: center;
  justify-content: center;
}
.menu-btn:hover {
  background: var(--bg-hover);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: background var(--dur-fast) var(--ease-out);
}
.brand:hover { background: var(--bg-hover); }
.brand-mark { color: var(--accent-orange); display: inline-flex; }
.brand-text {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.search {
  flex: 1;
  max-width: 720px;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-3);
  height: 38px;
  background: var(--bg-elevated);
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  color: var(--text-muted);
  transition: border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.search:hover { background: var(--bg-hover); }
.search.focused {
  background: var(--bg-canvas);
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px hsla(220 90% 60% / 0.18);
}
.search input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: var(--text-primary);
}
.search input::placeholder { color: var(--text-muted); }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
.icon-btn {
  position: relative;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.icon-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.icon-btn .dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-orange);
  box-shadow: 0 0 8px var(--accent-orange);
}

.user-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 4px 10px 4px 4px;
  border-radius: var(--radius-pill);
  color: var(--text-primary);
  transition: background var(--dur-fast) var(--ease-out);
}
.user-chip:hover { background: var(--bg-hover); }
.user-name {
  font-weight: 600;
  font-size: 13px;
}

@media (max-width: 900px) {
  .menu-btn { display: inline-flex; }
  .user-name { display: none; }
}
@media (max-width: 640px) {
  .brand-text { display: none; }
  .nav-actions .icon-btn:nth-child(2),
  .nav-actions .icon-btn:nth-child(3) { display: none; }
}
</style>
