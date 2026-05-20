<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import CommunitySidebar from '@/components/layout/CommunitySidebar.vue'
import CreatePostModal from '@/components/post/CreatePostModal.vue'
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
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr) var(--aside-width);
  gap: var(--space-4);
  padding: var(--space-4);
  max-width: 1440px;
  margin: 0 auto;
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

@media (max-width: 1180px) {
  .layout {
    grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  }
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    padding: var(--space-3);
  }
}
</style>
