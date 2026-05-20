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

    <footer class="footnotes">
      <span class="brand">
        <span>Good People</span>
        <span class="amp">&amp;</span>
        <span class="story">Story</span>
      </span>
      <nav class="links">
        <router-link to="/">Home</router-link>
        <span class="sep" aria-hidden="true">·</span>
        <router-link to="/capsules">Capsules</router-link>
        <span class="sep" aria-hidden="true">·</span>
        <router-link to="/about">About</router-link>
        <span class="sep" aria-hidden="true">·</span>
        <router-link to="/u/me">Profile</router-link>
      </nav>
      <button class="theme" aria-label="Toggle theme" @click="theme.toggle()">
        <SvgIcon :name="theme.isDark ? 'sun' : 'moon'" :size="14" />
      </button>
    </footer>
  </div>
  <CreatePostModal />
</template>

<style scoped>
.layout {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-5) var(--space-6);
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

/* ── Quiet footer ─────────────────────────────────────────── */
.footnotes {
  margin: var(--space-8) auto 0;
  padding: var(--space-5) var(--space-3) var(--space-4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-4);
  color: var(--text-muted);
  border-top: 1px dashed var(--paper-line);
  max-width: 720px;
}
.brand {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 16px;
  color: var(--text-body);
  letter-spacing: -0.005em;
}
.amp {
  color: var(--accent-orange);
  font-family: var(--font-script);
  font-style: normal;
  font-size: 22px;
  line-height: 0.6;
}

.links {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  font-family: var(--font-typewriter);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}
.links a {
  color: var(--text-muted);
  transition: color var(--dur-fast) var(--ease-out);
}
.links a:hover { color: var(--text-primary); }
.sep { color: var(--text-muted); }

.theme {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--text-muted);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.theme:hover { background: var(--bg-hover); color: var(--text-primary); }

@media (max-width: 720px) {
  .layout { padding: var(--space-5) var(--space-4); }
  .footnotes { gap: var(--space-3); font-size: 12px; }
}
</style>
