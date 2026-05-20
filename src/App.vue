<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
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
  </div>
  <CreatePostModal />
</template>

<style scoped>
.layout {
  /* Only the left sidebar is fixed; the right rail was removed. */
  padding:
    var(--space-5)
    var(--space-5)
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

@media (max-width: 900px) {
  .layout {
    padding: var(--space-4);
  }
}
</style>
