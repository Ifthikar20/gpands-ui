import { defineStore } from 'pinia'
import { communities as seed } from '@/data/mock-data.js'
import { emit, Events } from '@/lib/eventBus.js'

const STORAGE_KEY = 'gpands.joined.v1'

// Validate the persisted joined-set: must be an array of short ascii
// strings; anything else is dropped.
function loadJoined() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(parsed)) return new Set()
    return new Set(
      parsed.filter((s) => typeof s === 'string' && /^[a-z]{1,32}$/.test(s)),
    )
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
      // Only accept known community names — protects against
      // calling toggleJoin('<script>...') from devtools, etc.
      if (!this.getCommunity(name)) return
      const wasJoined = this.joined.has(name)
      if (wasJoined) this.joined.delete(name)
      else this.joined.add(name)
      // Force reactivity for Set.
      this.joined = new Set(this.joined)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.joined]))
      } catch {
        /* ignore */
      }
      emit(wasJoined ? Events.CommunityUnfollowed : Events.CommunityFollowed, {
        subreddit: name,
      })
    },
  },
})
