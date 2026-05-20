import { computed, ref, onMounted, onUnmounted } from 'vue'

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto', style: 'narrow' })

const UNITS = [
  { unit: 'year', sec: 31_536_000 },
  { unit: 'month', sec: 2_592_000 },
  { unit: 'week', sec: 604_800 },
  { unit: 'day', sec: 86_400 },
  { unit: 'hour', sec: 3600 },
  { unit: 'minute', sec: 60 },
  { unit: 'second', sec: 1 },
]

export function formatRelative(unixSeconds) {
  const diff = Math.floor(Date.now() / 1000) - unixSeconds
  const abs = Math.abs(diff)
  for (const { unit, sec } of UNITS) {
    if (abs >= sec || unit === 'second') {
      return rtf.format(-Math.round(diff / sec), unit)
    }
  }
  return 'now'
}

export function useRelativeTime(unixSecondsRef) {
  const tick = ref(0)
  let timer
  onMounted(() => {
    timer = setInterval(() => (tick.value += 1), 60_000)
  })
  onUnmounted(() => clearInterval(timer))
  return computed(() => {
    // touch tick to re-evaluate
    void tick.value
    const ts = typeof unixSecondsRef === 'function' ? unixSecondsRef() : unixSecondsRef.value ?? unixSecondsRef
    return formatRelative(ts)
  })
}
