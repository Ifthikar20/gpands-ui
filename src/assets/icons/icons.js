// Minimal SVG path registry. Each entry is the inner contents of an <svg viewBox="0 0 24 24">.
export const icons = {
  arrowUp: '<path d="M12 4l8 9h-5v7h-6v-7H4z" fill="currentColor"/>',
  arrowDown: '<path d="M12 20l-8-9h5V4h6v7h5z" fill="currentColor"/>',
  comment:
    '<path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H9l-4 4v-4H6a2 2 0 01-2-2V5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  share:
    '<path d="M14 4l6 6-6 6v-3.5c-5 0-7.5 1.5-9 4.5 0-6 3.5-9 9-9V4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  save:
    '<path d="M6 4h12v17l-6-4-6 4V4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  award:
    '<circle cx="12" cy="9" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13l-2 8 6-3 6 3-2-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  search:
    '<circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  plus:
    '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  bell:
    '<path d="M6 16V11a6 6 0 1112 0v5l2 2H4l2-2zM10 20a2 2 0 004 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>',
  chat:
    '<path d="M21 12a8 8 0 11-3.2-6.4L21 4l-1 4.2A8 8 0 0121 12z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  flame:
    '<path d="M12 3s4 4 4 8a4 4 0 11-8 0c0-2 1-3 1-3s-3 2-3 6a6 6 0 0012 0c0-6-6-11-6-11z" fill="currentColor"/>',
  sparkle:
    '<path d="M12 3l1.5 5L19 9.5 13.5 11 12 16 10.5 11 5 9.5 10.5 8z" fill="currentColor"/>',
  chart:
    '<path d="M4 20V10m6 10V4m6 16v-8m6 8V8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  rocket:
    '<path d="M5 19l3-3m6-12c4 0 6 2 6 6l-7 7-5-5 6-8zm0 0H8L5 7v3l3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>',
  home:
    '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  trending:
    '<path d="M3 17l6-6 4 4 8-9M14 6h7v7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>',
  globe:
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  close:
    '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  chevronDown:
    '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  reply:
    '<path d="M10 4L3 11l7 7v-4c5 0 8 1 11 5 0-7-4-11-11-11V4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  image:
    '<rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="8.5" cy="9.5" r="1.5" fill="currentColor"/><path d="M21 16l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  link:
    '<path d="M10 14a4 4 0 015.66 0l3-3a4 4 0 00-5.66-5.66l-1.5 1.5M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1.5-1.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  text:
    '<path d="M5 5h14M9 5v14M15 9h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  menu:
    '<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  reddit:
    '<circle cx="12" cy="12" r="10" fill="currentColor"/><circle cx="9" cy="13" r="1.3" fill="#1a1d22"/><circle cx="15" cy="13" r="1.3" fill="#1a1d22"/><path d="M8.5 15.5c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5" stroke="#1a1d22" stroke-width="1.2" stroke-linecap="round" fill="none"/><circle cx="18" cy="8" r="1.3" fill="#1a1d22"/><path d="M18 8l-4 1" stroke="#1a1d22" stroke-width="1" stroke-linecap="round"/>',
  // Brand mark: open book with heart
  gps:
    '<path d="M3 5.5C3 4.7 3.7 4 4.5 4H10c1.1 0 2 .9 2 2v13c0-1.1-.9-2-2-2H3V5.5z" fill="currentColor" opacity="0.9"/><path d="M21 5.5c0-.8-.7-1.5-1.5-1.5H14c-1.1 0-2 .9-2 2v13c0-1.1.9-2 2-2h7V5.5z" fill="currentColor" opacity="0.65"/><path d="M12 10.2c-1-1.6-3.5-1.1-3.5.7 0 1.5 2 2.6 3.5 3.6 1.5-1 3.5-2.1 3.5-3.6 0-1.8-2.5-2.3-3.5-.7z" fill="#fff"/>',
  sun:
    '<circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  moon:
    '<path d="M21 13.5A9 9 0 1 1 10.5 3a7 7 0 0 0 10.5 10.5z" fill="currentColor"/>',
  user:
    '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 21c1-4.5 4.5-7 8-7s7 2.5 8 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  info:
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  bookmark:
    '<path d="M6 4h12v17l-6-4-6 4V4z" fill="currentColor"/>',
  quote:
    '<path d="M7 7c-2 0-3 1.5-3 3.5S5 14 7 14v3c-3 0-5-2.5-5-6.5S4 4 7 4v3zm10 0c-2 0-3 1.5-3 3.5S15 14 17 14v3c-3 0-5-2.5-5-6.5S14 4 17 4v3z" fill="currentColor"/>',
  grid:
    '<rect x="3" y="3" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/>',

  // ── Topic glyphs (icon-based, never emoji) ────────────────────────
  heart:
    '<path d="M12 20.5s-7.5-4.5-9.5-9.2C1 7.5 3.5 4 7 4c2 0 3.7 1.1 5 2.8C13.3 5.1 15 4 17 4c3.5 0 6 3.5 4.5 7.3C19.5 16 12 20.5 12 20.5z" fill="currentColor"/>',
  candle:
    '<path d="M12 2c1.5 1.5 2 2.5 2 3.5 0 1.1-.9 2-2 2s-2-.9-2-2c0-1 .5-2 2-3.5z" fill="currentColor"/><rect x="10" y="9" width="4" height="11" rx="1" fill="currentColor"/><path d="M7 20h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  briefcase:
    '<rect x="3" y="7" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  star:
    '<path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6L12 16.8l-5.4 2.8 1-6L3.3 9.4l6-.9z" fill="currentColor"/>',
  smile:
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 14c1 1.5 2.4 2.4 4 2.4s3-.9 4-2.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/>',
  mountain:
    '<path d="M3 20l6-11 4 7 2-3 6 7H3z" fill="currentColor"/>',
  sprout:
    '<path d="M12 20v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5zM12 13c3 0 5-2 5-5-3 0-5 2-5 5z" fill="currentColor"/>',
  people:
    '<circle cx="8" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="16" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2 20c.7-3 3-5 6-5s5.3 2 6 5M14 20c.7-3 3-5 6-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  baby:
    '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 8h.01M15 8h.01M10.5 10c.5.5 1 .8 1.5.8s1-.3 1.5-.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><rect x="8" y="13" width="8" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  handshake:
    '<path d="M3 13l4-4 3 3 4-4 4 4-4 4-3-3-4 4-4-4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  map:
    '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="1.8"/>',
  hand:
    '<path d="M7 11V6a1.5 1.5 0 113 0v4M10 10V5a1.5 1.5 0 113 0v5M13 10V6a1.5 1.5 0 113 0v6M16 11v-2a1.5 1.5 0 113 0v6c0 3.5-2.5 6-6 6h-2c-3 0-4.5-1.5-6-4l-2-4c-.5-1 .5-2 1.5-1.5L7 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>',
  cap:
    '<path d="M3 9l9-4 9 4-9 4-9-4z" fill="currentColor"/><path d="M7 11v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M21 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  coin:
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v10M9.5 9.5c0-1 1-1.5 2.5-1.5s2.5.5 2.5 1.5-.7 1.5-2.5 2-2.5 1-2.5 2 1 1.5 2.5 1.5 2.5-.5 2.5-1.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  cross:
    '<path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" fill="currentColor"/>',
  brain:
    '<path d="M9 4a3 3 0 00-3 3 3 3 0 00-3 3c0 1.4.9 2.5 2 3-1.2.5-2 1.6-2 3a3 3 0 003 3 3 3 0 003 3V4zM15 4a3 3 0 013 3 3 3 0 013 3c0 1.4-.9 2.5-2 3 1.2.5 2 1.6 2 3a3 3 0 01-3 3 3 3 0 01-3 3V4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  paw:
    '<circle cx="6" cy="10" r="2" fill="currentColor"/><circle cx="10" cy="6" r="2" fill="currentColor"/><circle cx="14" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="10" r="2" fill="currentColor"/><path d="M12 12c-3 0-6 3-6 6 0 2 1.5 3 3 3 1 0 2-.5 3-.5s2 .5 3 .5c1.5 0 3-1 3-3 0-3-3-6-6-6z" fill="currentColor"/>',
  bowl:
    '<path d="M3 11h18a8 8 0 01-8 8h-2a8 8 0 01-8-8z" fill="currentColor"/><path d="M8 8c0-1.5 1-2 2-2M12 6c0-1.5 1-2 2-2M16 8c0-1.5 1-2 2-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  house:
    '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-4v-7H8v7H4a1 1 0 01-1-1v-9z" fill="currentColor"/>',
  refresh:
    '<path d="M20 11A8 8 0 006 6.5M4 13a8 8 0 0014 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M20 4v6h-6M4 20v-6h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>',
}
