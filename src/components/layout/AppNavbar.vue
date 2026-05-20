<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { useUiStore } from '@/stores/ui.js'
import { useUserStore } from '@/stores/user.js'
import { useThemeStore } from '@/stores/theme.js'

const ui = useUiStore()
const user = useUserStore()
const theme = useThemeStore()
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
        <span class="brand-mark"><SvgIcon name="gps" :size="28" /></span>
        <span class="brand-text">
          <span class="b-good">Good People</span><span class="b-amp"> & </span><span class="b-story">Story</span>
        </span>
      </router-link>

      <form class="search" :class="{ focused }" @submit="onSearch">
        <SvgIcon name="search" :size="18" />
        <input
          v-model="query"
          type="text"
          placeholder="Search stories, topics, people"
          @focus="focused = true"
          @blur="focused = false"
        />
      </form>

      <div class="nav-actions">
        <button class="share-btn" @click="ui.openCreatePost()">
          <SvgIcon name="quote" :size="16" />
          <span>Share a story</span>
        </button>
        <button class="icon-btn theme-toggle" aria-label="Toggle theme" @click="theme.toggle()">
          <Transition name="fade" mode="out-in">
            <SvgIcon v-if="theme.isDark" key="sun" name="sun" :size="20" />
            <SvgIcon v-else key="moon" name="moon" :size="20" />
          </Transition>
        </button>
        <button class="icon-btn" aria-label="Notifications">
          <SvgIcon name="bell" :size="20" />
          <span class="dot" />
        </button>

        <router-link to="/u/me" class="user-chip">
          <UserAvatar :username="user.currentUser.username" :size="28" online />
          <span class="user-name">{{ user.currentUser.displayName || user.currentUser.username }}</span>
          <SvgIcon name="chevronDown" :size="16" />
        </router-link>
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
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.b-good { color: var(--text-primary); }
.b-amp { color: var(--accent-orange); font-weight: 800; }
.b-story { color: var(--text-primary); font-style: italic; font-family: var(--font-serif, Georgia, serif); }

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
  gap: 6px;
}
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, var(--accent-orange), hsl(16 95% 48%));
  color: white;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 13px;
  box-shadow: var(--shadow-glow-orange);
  transition: transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out);
}
.share-btn:hover { transform: translateY(-1px); filter: brightness(1.05); }
.theme-toggle { color: var(--text-primary); }
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
  .share-btn span { display: none; }
  .share-btn { padding: 8px; }
}
</style>
