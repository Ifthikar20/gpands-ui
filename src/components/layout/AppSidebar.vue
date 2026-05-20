<script setup>
import { computed, ref } from 'vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { useCommunitiesStore } from '@/stores/communities.js'
import { useUiStore } from '@/stores/ui.js'

const communities = useCommunitiesStore()
const ui = useUiStore()

const yourOpen = ref(true)
const popularOpen = ref(true)

const joined = computed(() => communities.joinedCommunities)
const popular = computed(() => communities.popularCommunities.slice(0, 6))
</script>

<template>
  <aside class="sidebar" :class="{ open: ui.sidebarOpen }">
    <nav class="nav">
      <router-link to="/" class="nav-item" exact-active-class="active" @click="ui.closeSidebar()">
        <SvgIcon name="home" :size="20" />
        <span>Home</span>
      </router-link>
      <router-link to="/popular" class="nav-item" active-class="active" @click="ui.closeSidebar()">
        <SvgIcon name="trending" :size="20" />
        <span>Popular</span>
      </router-link>
      <router-link to="/capsules" class="nav-item" active-class="active" @click="ui.closeSidebar()">
        <SvgIcon name="grid" :size="20" />
        <span>All Capsules</span>
      </router-link>
      <router-link to="/about" class="nav-item" active-class="active" @click="ui.closeSidebar()">
        <SvgIcon name="info" :size="20" />
        <span>About</span>
      </router-link>
      <router-link to="/u/me" class="nav-item" active-class="active" @click="ui.closeSidebar()">
        <SvgIcon name="user" :size="20" />
        <span>My Profile</span>
      </router-link>
    </nav>

    <div class="section">
      <button class="section-header" @click="yourOpen = !yourOpen">
        <span>Following</span>
        <SvgIcon name="chevronDown" :size="14" :class="{ rot: !yourOpen }" />
      </button>
      <Transition name="slide-up">
        <ul v-if="yourOpen" class="comm-list">
          <li v-if="joined.length === 0" class="empty">Follow a capsule to see it here.</li>
          <li v-for="c in joined" :key="c.name">
            <router-link
              :to="`/c/${c.name}`"
              class="comm-item"
              active-class="active"
              @click="ui.closeSidebar()"
            >
              <span class="comm-avatar" :style="{ background: c.color }">
                <SvgIcon :name="c.icon" :size="14" />
              </span>
              <span class="comm-name">{{ c.name }}</span>
            </router-link>
          </li>
        </ul>
      </Transition>
    </div>

    <div class="section">
      <button class="section-header" @click="popularOpen = !popularOpen">
        <span>Capsules</span>
        <SvgIcon name="chevronDown" :size="14" :class="{ rot: !popularOpen }" />
      </button>
      <Transition name="slide-up">
        <ul v-if="popularOpen" class="comm-list">
          <li v-for="c in popular" :key="c.name">
            <router-link
              :to="`/c/${c.name}`"
              class="comm-item"
              active-class="active"
              @click="ui.closeSidebar()"
            >
              <span class="comm-avatar" :style="{ background: c.color }">
                <SvgIcon :name="c.icon" :size="14" />
              </span>
              <span class="comm-name">{{ c.name }}</span>
            </router-link>
          </li>
        </ul>
      </Transition>
    </div>

    <footer class="foot">
      <p class="tag"><strong>Good People &amp; Story</strong></p>
      <p class="muted">Real human stories, told by the people who lived them.</p>
    </footer>
  </aside>

  <div v-if="ui.sidebarOpen" class="overlay" @click="ui.closeSidebar()" />
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--navbar-height));
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--space-4) var(--space-3) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  z-index: 20;
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-weight: 600;
  position: relative;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
  cursor: pointer;
}
.nav-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.nav-item.active {
  color: var(--text-primary);
  background: var(--bg-elevated);
}
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: var(--radius-pill);
  background: var(--accent-orange);
}

.section { margin-top: var(--space-3); }
.section-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  font-weight: 700;
}
.section-header svg { transition: transform var(--dur-fast) var(--ease-out); }
.section-header svg.rot { transform: rotate(-90deg); }
.comm-list { display: flex; flex-direction: column; gap: 2px; }
.empty {
  padding: 8px 12px;
  font-size: 12px;
  color: var(--text-muted);
}
.comm-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.comm-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.comm-item.active {
  background: var(--bg-elevated);
  color: var(--text-primary);
}
.comm-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
}
.comm-name {
  font-size: 13px;
  font-weight: 600;
}
.foot {
  margin-top: auto;
  padding: var(--space-4) var(--space-3);
  font-size: 11px;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.foot .muted { color: var(--text-muted); }

.overlay {
  display: none;
}

@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    top: var(--navbar-height);
    left: 0;
    z-index: 25;
    transform: translateX(-100%);
    transition: transform var(--dur-base) var(--ease-out);
    box-shadow: var(--shadow-lg);
  }
  .sidebar.open { transform: translateX(0); }
  .overlay {
    display: block;
    position: fixed;
    inset: var(--navbar-height) 0 0 0;
    background: hsla(220 14% 4% / 0.6);
    z-index: 24;
  }
}
</style>
