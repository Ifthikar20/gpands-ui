import { defineStore } from 'pinia'

const STORAGE_KEY = 'gpas.theme'

function detect() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* ignore */ }
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

function apply(theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export const useThemeStore = defineStore('theme', {
  state: () => {
    const initial = detect()
    apply(initial)
    return { theme: initial }
  },
  getters: {
    isDark: (state) => state.theme === 'dark',
  },
  actions: {
    setTheme(t) {
      this.theme = t
      apply(t)
      try { localStorage.setItem(STORAGE_KEY, t) } catch { /* ignore */ }
    },
    toggle() {
      this.setTheme(this.theme === 'dark' ? 'light' : 'dark')
    },
  },
})
