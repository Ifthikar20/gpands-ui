<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import CreatePostModal from '@/components/post/CreatePostModal.vue'
</script>

<template>
  <AppNavbar />
  <div class="layout">
    <main class="main">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  </div>
  <CreatePostModal />
</template>

<style scoped>
.layout {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-5) var(--space-8);
}
.main {
  min-width: 0;
  max-width: var(--content-max);
  margin: 0 auto;
}

@media (max-width: 720px) {
  .layout {
    padding: var(--space-4);
  }
}
</style>
