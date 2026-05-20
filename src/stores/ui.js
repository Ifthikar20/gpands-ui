import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    sidebarOpen: false,
    createPostModalOpen: false,
    activeSort: 'hot',
  }),
  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    closeSidebar() {
      this.sidebarOpen = false
    },
    openCreatePost() {
      this.createPostModalOpen = true
    },
    closeCreatePost() {
      this.createPostModalOpen = false
    },
    setSort(sort) {
      this.activeSort = sort
    },
  },
})
