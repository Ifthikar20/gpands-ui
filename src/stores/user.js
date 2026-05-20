import { defineStore } from 'pinia'
import { users } from '@/data/mock-data.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: { ...users.current },
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser?.username,
  },
})
