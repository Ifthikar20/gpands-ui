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
  /* Both rails are position: fixed against the viewport. We reserve
     their lanes here with padding so the main column never overlaps
     them and never centers between them. */
  padding:
    var(--space-5)
    calc(var(--aside-width) + var(--space-5))
    var(--space-6)
    calc(var(--sidebar-width) + var(--space-5));
  width: 100%;
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
    padding-right: var(--space-5);
  }
}
@media (max-width: 900px) {
  .layout {
    padding: var(--space-4);
  }
}
</style>
