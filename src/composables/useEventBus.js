import { onUnmounted, ref } from 'vue'
import { subscribe, getHistory } from '@/lib/eventBus.js'

// Subscribe inside a component; auto-unsubscribes on unmount.
export function useEventBus(type, handler) {
  const off = subscribe(type, handler)
  onUnmounted(off)
  return off
}

// Reactive live tail of recent events for "live activity" widgets.
export function useEventStream(limit = 20) {
  const events = ref(getHistory(limit))
  const off = subscribe('*', (ev) => {
    events.value = [ev, ...events.value].slice(0, limit)
  })
  onUnmounted(off)
  return events
}
