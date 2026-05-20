<script setup>
import { computed, ref } from 'vue'
import { useEventStream } from '@/composables/useEventBus.js'
import { Events } from '@/lib/eventBus.js'
import { formatRelative } from '@/composables/useRelativeTime.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const events = useEventStream(30)
const open = ref(false)
const lastSeenTs = ref(Date.now())

const unseenCount = computed(() => {
  return events.value.filter((e) => e.ts > lastSeenTs.value).length
})

function markSeen() {
  lastSeenTs.value = Date.now()
}

function toggle() {
  open.value = !open.value
  if (open.value) markSeen()
}

function tick(ev) {
  switch (ev.type) {
    case Events.VoteCast:
      return ev.payload.target === 'comment'
        ? { icon: 'arrowUp', text: 'upvoted a comment', detail: ev.payload.snippet }
        : { icon: ev.payload.direction === -1 ? 'arrowDown' : 'arrowUp', text: ev.payload.direction === -1 ? 'downvoted' : 'upvoted', detail: ev.payload.title }
    case Events.PostCreated:
      return { icon: 'quote', text: `posted to r/${ev.payload.subreddit}`, detail: ev.payload.title }
    case Events.CommentAdded:
      return { icon: 'comment', text: 'replied', detail: ev.payload.snippet }
    case Events.CommunityFollowed:
      return { icon: 'plus', text: 'followed', detail: 'r/' + ev.payload.subreddit }
    case Events.CommunityUnfollowed:
      return { icon: 'close', text: 'unfollowed', detail: 'r/' + ev.payload.subreddit }
    case Events.ThemeChanged:
      return { icon: ev.payload.current === 'dark' ? 'moon' : 'sun', text: 'switched theme', detail: ev.payload.current }
    case Events.StoryRead:
      return { icon: 'bookmark', text: 'is reading', detail: ev.payload.title }
    case Events.UserJoined:
      return { icon: 'user', text: 'joined', detail: 'r/' + ev.payload.subreddit }
    default:
      return { icon: 'sparkle', text: ev.type, detail: '' }
  }
}
</script>

<template>
  <div class="live" :class="{ open }">
    <Transition name="slide-up">
      <div v-if="open" class="panel">
        <header>
          <span class="pulse" /> Live activity
          <button class="close" aria-label="Close" @click="open = false">
            <SvgIcon name="close" :size="16" />
          </button>
        </header>
        <ul>
          <li v-for="ev in events" :key="ev.ts + ':' + ev.type">
            <span class="icon"><SvgIcon :name="tick(ev).icon" :size="14" /></span>
            <span class="row">
              <span class="actor">{{ ev.payload.actor || 'you' }}</span>
              <span class="text">{{ tick(ev).text }}</span>
              <span class="detail">{{ tick(ev).detail }}</span>
            </span>
            <span class="time">{{ formatRelative(Math.floor(ev.ts / 1000)) }}</span>
          </li>
          <li v-if="!events.length" class="empty">No activity yet…</li>
        </ul>
        <footer>Events propagate over an in-process bus — same pattern Reddit uses with RabbitMQ + WebSockets.</footer>
      </div>
    </Transition>

    <button class="pill" @click="toggle">
      <span class="dot" :class="{ active: unseenCount > 0 }" />
      <span class="label">Live</span>
      <span v-if="unseenCount > 0 && !open" class="badge">{{ unseenCount > 99 ? '99+' : unseenCount }}</span>
    </button>
  </div>
</template>

<style scoped>
.live {
  position: fixed;
  bottom: var(--space-4);
  right: var(--space-4);
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--glass-strong);
  backdrop-filter: blur(14px) saturate(180%);
  -webkit-backdrop-filter: blur(14px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-md);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
  transition: transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.pill:hover { transform: translateY(-1px); }
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
  box-shadow: 0 0 0 0 var(--success);
}
.dot.active {
  background: var(--success);
  animation: pulse 1.8s ease-out infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 hsla(145 65% 45% / 0.55); }
  100% { box-shadow: 0 0 0 14px hsla(145 65% 45% / 0); }
}
.badge {
  padding: 1px 7px;
  background: var(--accent-orange);
  color: white;
  border-radius: var(--radius-pill);
  font-size: 11px;
}

.panel {
  width: 340px;
  max-width: calc(100vw - 32px);
  max-height: 460px;
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}
.panel header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
}
.panel header .pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse 1.8s ease-out infinite;
}
.panel header .close {
  margin-left: auto;
  color: var(--text-muted);
  display: grid;
  place-items: center;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: background var(--dur-fast) var(--ease-out);
}
.panel header .close:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.panel ul {
  flex: 1;
  overflow-y: auto;
}
.panel li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: 10px var(--space-4);
  font-size: 12px;
  border-bottom: 1px solid var(--border-subtle);
  animation: fadeIn 240ms var(--ease-out);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.panel li:last-child { border-bottom: none; }
.panel li.empty {
  justify-content: center;
  color: var(--text-muted);
  font-style: italic;
}
.icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--bg-elevated);
  display: grid;
  place-items: center;
  color: var(--text-secondary);
  flex-shrink: 0;
}
.row {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  line-height: 1.45;
}
.actor { font-weight: 700; color: var(--text-primary); }
.text { color: var(--text-secondary); }
.detail {
  color: var(--text-muted);
  flex-basis: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: italic;
}
.time {
  flex-shrink: 0;
  color: var(--text-muted);
  font-size: 11px;
}
.panel footer {
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--border-subtle);
  font-size: 11px;
  color: var(--text-muted);
  background: var(--bg-elevated);
  line-height: 1.45;
}

@media (min-width: 1281px) {
  /* The right rail sits flush at right:0 with width var(--aside-width).
     Push the live widget left of it so it stays clickable. */
  .live { right: calc(var(--aside-width) + var(--space-4)); }
}
@media (max-width: 640px) {
  .live { bottom: var(--space-3); right: var(--space-3); }
  .panel { width: calc(100vw - 24px); }
}
</style>
