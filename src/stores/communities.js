import { defineStore } from 'pinia'
import { communities as seed } from '@/data/mock-data.js'

const STORAGE_KEY = 'gpands.joined.v1'

function loadJoined() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

export const useCommunitiesStore = defineStore('communities', {
  state: () => ({
    communities: seed.map((c) => ({ ...c })),
    joined: loadJoined(),
  }),
  getters: {
    getCommunity: (state) => (name) => state.communities.find((c) => c.name === name),
    popularCommunities: (state) =>
      [...state.communities].sort((a, b) => b.members - a.members),
    joinedCommunities: (state) =>
      state.communities.filter((c) => state.joined.has(c.name)),
    isJoined: (state) => (name) => state.joined.has(name),
  },
  actions: {
    toggleJoin(name) {
      if (this.joined.has(name)) this.joined.delete(name)
      else this.joined.add(name)
      // Force reactivity for Set.
      this.joined = new Set(this.joined)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.joined]))
      } catch {
        /* ignore */
      }
    },
  },
})
