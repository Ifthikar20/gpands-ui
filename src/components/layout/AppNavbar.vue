<script setup>
import { ref } from 'vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { useUiStore } from '@/stores/ui.js'
import { useUserStore } from '@/stores/user.js'
import { useThemeStore } from '@/stores/theme.js'

const ui = useUiStore()
const user = useUserStore()
const theme = useThemeStore()

const mobileOpen = ref(false)
function closeMobile() { mobileOpen.value = false }
</script>

<template>
  <header class="masthead">
    <div class="masthead-inner">
      <router-link to="/" class="brand" aria-label="Home" @click="closeMobile">
        <span class="b-good">Good People</span>
        <span class="b-amp">&amp;</span>
        <span class="b-story">Story</span>
      </router-link>

      <nav class="links" :class="{ open: mobileOpen }">
        <router-link to="/" exact-active-class="active" @click="closeMobile">Home</router-link>
        <router-link to="/popular" active-class="active" @click="closeMobile">Popular</router-link>
        <router-link to="/topics" active-class="active" @click="closeMobile">Topics</router-link>
        <router-link to="/about" active-class="active" @click="closeMobile">About</router-link>
      </nav>

      <div class="actions">
        <button class="icon-btn" aria-label="Toggle theme" @click="theme.toggle()">
          <Transition name="fade" mode="out-in">
            <SvgIcon v-if="theme.isDark" key="sun" name="sun" :size="18" />
            <SvgIcon v-else key="moon" name="moon" :size="18" />
          </Transition>
        </button>
        <button class="send" @click="ui.openCreatePost()">
          <SvgIcon name="quote" :size="14" />
          <span>Post a story</span>
        </button>
        <router-link to="/u/me" class="user" aria-label="My profile" @click="closeMobile">
          <UserAvatar :username="user.currentUser.username" :size="32" online />
          <span class="user-name">{{ user.currentUser.displayName || user.currentUser.username }}</span>
        </router-link>
        <button class="menu-btn" aria-label="Menu" @click="mobileOpen = !mobileOpen">
          <SvgIcon :name="mobileOpen ? 'close' : 'menu'" :size="20" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.masthead {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  height: var(--navbar-height);
  background: var(--paper);
  background-image:
    repeating-linear-gradient(transparent 0, transparent 27px, var(--paper-line) 28px);
  border-bottom: 1px solid var(--border-subtle);
}
.masthead-inner {
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: 0 var(--space-5);
}

/* ── Brand: editorial masthead, not a tech logo ───────────── */
.brand {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  white-space: nowrap;
  letter-spacing: -0.01em;
}
.b-good {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}
.b-amp {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 22px;
  font-weight: 400;
  color: var(--accent-orange);
}
.b-story {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
}

/* ── Horizontal nav: simple text links ────────────────────── */
.links {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  margin-left: var(--space-4);
}
.links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-body);
  letter-spacing: 0.005em;
  padding: 6px 0;
  position: relative;
  transition: color var(--dur-fast) var(--ease-out);
}
.links a:hover { color: var(--text-primary); }
.links a.active { color: var(--text-primary); }
.links a.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  background: var(--accent-orange);
  border-radius: 1px;
}

/* ── Right-side actions ───────────────────────────────────── */
.actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon-btn {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--text-body);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.icon-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.send {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--text-primary);
  color: var(--bg-canvas);
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.005em;
  white-space: nowrap;
  transition: transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out);
}
.send:hover { transform: translateY(-1px); filter: brightness(1.15); }

.user {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 12px 3px 3px;
  border-radius: var(--radius-pill);
  color: var(--text-primary);
  transition: background var(--dur-fast) var(--ease-out);
}
.user:hover { background: var(--bg-hover); }
.user-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-body);
  white-space: nowrap;
}

.menu-btn {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: var(--text-body);
}
.menu-btn:hover { background: var(--bg-hover); }

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 900px) {
  .user-name { display: none; }
  .send span { display: none; }
  .send { padding: 8px 12px; }
  .links { gap: var(--space-4); }
  .b-good, .b-story { font-size: 18px; }
  .b-amp { font-size: 19px; }
}

@media (max-width: 720px) {
  .menu-btn { display: inline-flex; }
  .links {
    position: fixed;
    top: var(--navbar-height);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: var(--paper);
    border-bottom: 1px solid var(--border-subtle);
    padding: var(--space-3) var(--space-5);
    margin: 0;
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
  }
  .links.open {
    transform: none;
    opacity: 1;
    pointer-events: auto;
  }
  .links a {
    padding: 12px 0;
    font-size: 16px;
    font-family: var(--font-serif, Georgia, serif);
    border-bottom: 1px solid var(--paper-line);
  }
  .links a:last-child { border-bottom: none; }
  .links a.active::after { display: none; }
  .links a.active { color: var(--accent-orange); }
}
</style>
