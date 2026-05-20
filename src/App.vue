<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import CommunitySidebar from '@/components/layout/CommunitySidebar.vue'
import CreatePostModal from '@/components/post/CreatePostModal.vue'
import LiveActivityFeed from '@/components/common/LiveActivityFeed.vue'
import { startAmbient, stopAmbient } from '@/lib/ambient.js'

onMounted(() => startAmbient())
onBeforeUnmount(() => stopAmbient())
</script>

<template>
  <AppNavbar />
  <div class="layout">
    <AppSidebar />
    <main class="main">
      <div class="main-inner">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </main>
    <CommunitySidebar />
  </div>
  <CreatePostModal />
  <LiveActivityFeed />
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr) var(--aside-width);
  gap: var(--space-5);
  padding: var(--space-4) var(--space-5);
  width: 100%;
  align-items: start;
}
.main {
  min-width: 0;
}
.main-inner {
  max-width: var(--content-max);
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 1280px) {
  .layout {
    grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
    padding: var(--space-4);
  }
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    padding: var(--space-3);
    gap: var(--space-4);
  }
}
</style>
