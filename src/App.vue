<script setup>
import CreatePostModal from '@/components/post/CreatePostModal.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { useThemeStore } from '@/stores/theme.js'

const theme = useThemeStore()
</script>

<template>
  <div class="layout">
    <main class="main">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>

    <footer class="colophon">
      <router-link to="/" class="brand" aria-label="Good People & Story — home">
        <span class="brand-line">Good People</span>
        <span class="brand-amp">&amp;</span>
        <span class="brand-line">Story</span>
      </router-link>

      <nav class="nav">
        <router-link to="/" class="link">Home</router-link>
        <span class="sep" aria-hidden="true">&middot;</span>
        <router-link to="/topics" class="link">Topics</router-link>
        <span class="sep" aria-hidden="true">&middot;</span>
        <router-link to="/about" class="link">About</router-link>
        <span class="sep" aria-hidden="true">&middot;</span>
        <router-link to="/u/me" class="link">Profile</router-link>
        <span class="sep" aria-hidden="true">&middot;</span>
        <button class="theme-btn" aria-label="Toggle theme" @click="theme.toggle()">
          <SvgIcon :name="theme.isDark ? 'sun' : 'moon'" :size="14" />
        </button>
      </nav>
    </footer>
  </div>
  <CreatePostModal />
</template>

<style scoped>
.layout {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-5) 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  min-width: 0;
  max-width: var(--content-max);
  margin: 0 auto;
  width: 100%;
  flex: 1;
}

/* ── Colophon (footer) ────────────────────────────────────── */
.colophon {
  margin-top: var(--space-8);
  padding: var(--space-6) var(--space-4) var(--space-6);
  border-top: 1px dashed var(--paper-line);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
}

.brand {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-family: var(--font-serif, Georgia, serif);
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.brand-line {
  font-size: 28px;
  font-weight: 500;
  font-style: italic;
  line-height: 1.05;
}
.brand-amp {
  font-family: var(--font-script);
  font-style: normal;
  font-size: 46px;
  font-weight: 500;
  color: var(--accent-orange);
  line-height: 0.75;
  margin: 2px 0;
}

.nav {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.link {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-body);
  transition: color var(--dur-fast) var(--ease-out);
}
.link:hover { color: var(--text-primary); }
.link.router-link-exact-active {
  color: var(--accent-orange);
  font-weight: 600;
}
.sep { color: var(--text-muted); }
.theme-btn {
  background: transparent;
  color: var(--text-muted);
  width: 26px;
  height: 26px;
  display: inline-grid;
  place-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.theme-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

@media (max-width: 720px) {
  .layout { padding: var(--space-4) var(--space-4) 0; }
  .brand-line { font-size: 22px; }
  .brand-amp { font-size: 36px; }
  .colophon { padding: var(--space-5) var(--space-3); }
}
</style>
