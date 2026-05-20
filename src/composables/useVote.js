// Tiny formatting helper for vote/comment counts.
export function formatCount(n) {
  if (n === undefined || n === null) return '0'
  const abs = Math.abs(n)
  if (abs >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm'
  if (abs >= 10_000) return (n / 1000).toFixed(0) + 'k'
  if (abs >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return String(n)
}
