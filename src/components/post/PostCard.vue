<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useCommunitiesStore } from '@/stores/communities.js'
import { useRelativeTime } from '@/composables/useRelativeTime.js'

const props = defineProps({ post: { type: Object, required: true } })

const postsStore = usePostsStore()
const communities = useCommunitiesStore()
const router = useRouter()

const time = useRelativeTime(() => props.post.createdAt)
const isAnonymous = computed(() => props.post.author === 'anonymous')
const community = computed(() => communities.getCommunity(props.post.subreddit))
const sealed = ref(true)

const formattedAuthor = computed(() => {
  if (isAnonymous.value) return 'Stranger'
  return props.post.author.replace(/_/g, ' ')
})

const paragraphs = computed(() => (props.post.body || '').split('\n\n').filter(Boolean))

const waxStyle = computed(() => ({
  background: community.value?.color || 'var(--accent-orange)',
}))

const paperClass = computed(() => `paper-${props.post.paperStyle || 'cream'}`)

function onCardClick() {
  if (isAnonymous.value && sealed.value) {
    sealed.value = false
    return
  }
  router.push({ name: 'post', params: { id: props.post.id } })
}

function onKey(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onCardClick()
  }
}
</script>

<template>
  <article
    :class="['letter', paperClass, { sealed: isAnonymous && sealed, named: !isAnonymous }]"
    :tabindex="0"
    role="button"
    :aria-expanded="!isAnonymous || !sealed"
    @click="onCardClick"
    @keydown="onKey"
  >
    <!-- Envelope decorations for sealed anonymous letters -->
    <template v-if="isAnonymous">
      <div class="env-flap" aria-hidden="true" />
      <button
        class="wax"
        :style="waxStyle"
        aria-label="Open envelope"
        @click.stop="sealed = false"
      >
        <span class="wax-glow" aria-hidden="true" />
        <span class="monogram">G&amp;S</span>
      </button>
    </template>

    <!-- "Dear ..." addressing line: capsule as recipient -->
    <p class="dear">
      <span class="dear-prefix">Dear&hellip;</span>
      <span class="dear-name">{{ post.subreddit }}</span>
    </p>

    <h2 class="title">{{ post.title }}</h2>

    <!-- Sealed-state hint (only when anonymous and sealed) -->
    <p v-if="isAnonymous && sealed" class="seal-hint">Tap the seal to open</p>

    <!-- Letter body, image, signature — collapses to 0 when sealed -->
    <div class="reveal" :class="{ open: !isAnonymous || !sealed }">
      <div class="reveal-inner">
        <div v-if="post.image && post.type === 'image'" class="postcard">
          <img :src="post.image" :alt="post.title" loading="lazy" />
        </div>

        <div v-if="paragraphs.length" class="body">
          <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
        </div>

        <p class="from">
          <span class="from-prefix">From&hellip;</span>
          <UserAvatar
            v-if="!isAnonymous"
            :username="post.author"
            :size="22"
            class="from-avatar"
          />
          <span class="from-name">{{ formattedAuthor }}</span>
        </p>

        <p class="time">{{ time }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ── Frame ──────────────────────────────────────────────── */
.letter {
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6) var(--space-6);
  background-color: var(--paper-bg, var(--paper));
  background-image:
    repeating-linear-gradient(transparent 0, transparent 27px, var(--paper-line) 28px),
    radial-gradient(ellipse at top right, hsla(0 0% 0% / 0.03), transparent 60%);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  box-shadow: 0 1px 2px var(--paper-shadow), 0 12px 28px hsla(0 0% 0% / 0.05);
  cursor: pointer;
  outline: none;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  perspective: 1500px;
  perspective-origin: 50% 0%;
  transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), padding-top 600ms var(--ease-out);
}
.letter:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--paper-shadow), 0 18px 36px hsla(0 0% 0% / 0.08);
}
.letter:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 3px;
}
.letter.sealed { padding-top: 175px; }

/* ── Dear addressing ────────────────────────────────────── */
.dear {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 16px;
  letter-spacing: 0.01em;
  color: var(--text-body);
  line-height: 1.4;
}
.dear-prefix { color: var(--text-muted); margin-right: 6px; }
.dear-name {
  color: var(--text-primary);
  font-weight: 600;
  text-transform: lowercase;
}

/* ── Title ──────────────────────────────────────────────── */
.title {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 26px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  max-width: 540px;
  margin: 0 auto;
}
.letter.sealed .title { font-style: italic; }

/* ── Seal hint ──────────────────────────────────────────── */
.seal-hint {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  color: var(--text-body);
  font-size: 14px;
  letter-spacing: 0.01em;
  line-height: 1.7;
}

/* ── Reveal (body + postcard + signature) ───────────────── */
.reveal {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 480ms var(--ease-out);
}
.reveal.open { grid-template-rows: 1fr; }
.reveal-inner {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 400ms var(--ease-out) 80ms, transform 400ms var(--ease-out) 80ms;
}
.reveal.open .reveal-inner { opacity: 1; transform: none; }
.letter.named .reveal-inner { transition-delay: 0ms; }
.letter:not(.sealed):not(.named) .reveal-inner { transition-delay: 380ms; }

/* ── Postcard (image post — PostSecret style) ───────────── */
.postcard {
  align-self: center;
  max-width: 480px;
  width: 100%;
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: 0 6px 18px hsla(0 0% 0% / 0.22), 0 1px 2px hsla(0 0% 0% / 0.15);
  transform: rotate(-1.4deg);
  transition: transform var(--dur-base) var(--ease-out);
  background: white;
  padding: 6px 6px 10px;
}
.postcard:hover { transform: rotate(0deg); }
.postcard img {
  display: block;
  width: 100%;
  height: auto;
}

/* ── Body ───────────────────────────────────────────────── */
.body {
  text-align: left;
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
  color: var(--text-primary);
  font-family: var(--font-typewriter);
  font-size: 15px;
  line-height: 1.85;
  letter-spacing: -0.005em;
}

/* ── Signature line ─────────────────────────────────────── */
.from {
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
  margin-top: var(--space-3);
  color: var(--text-muted);
}
.from-prefix {
  font-family: var(--font-typewriter);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--text-muted);
}
.from-avatar {
  align-self: center;
  box-shadow: 0 1px 3px hsla(0 0% 0% / 0.18);
}
.from-name {
  color: var(--text-primary);
}
.letter.named .from-name {
  /* Handwritten signature for known senders. */
  font-family: var(--font-script);
  font-size: 28px;
  font-weight: 600;
  line-height: 1;
  text-transform: capitalize;
  letter-spacing: 0.005em;
  color: var(--accent-orange);
  transform: rotate(-2deg);
  transform-origin: left center;
}
.letter:not(.named) .from-name {
  font-family: var(--font-typewriter);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
}

.time {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: -10px;
}

/* ── Envelope flap (sealed anonymous only) ──────────────── */
.env-flap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 140px;
  background-color: var(--paper-bg, var(--paper));
  background-image:
    linear-gradient(180deg, hsla(0 0% 0% / 0.06), transparent 50%),
    radial-gradient(ellipse at top, hsla(0 0% 100% / 0.12), transparent 70%),
    repeating-linear-gradient(transparent 0, transparent 27px, var(--paper-line) 28px);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  filter: drop-shadow(0 8px 14px hsla(0 0% 0% / 0.22));
  z-index: 2;
  transform: rotateX(0);
  opacity: 1;
}
.letter:not(.sealed) .env-flap {
  pointer-events: none;
  animation: flap-lift 780ms cubic-bezier(0.4, 0, 0.3, 1) 180ms both;
}
@keyframes flap-lift {
  0%   { transform: rotateX(0); opacity: 1; filter: drop-shadow(0 8px 14px hsla(0 0% 0% / 0.22)); }
  18%  { transform: rotateX(-18deg);          filter: drop-shadow(0 18px 24px hsla(0 0% 0% / 0.32)); }
  100% { transform: rotateX(-172deg); opacity: 0; filter: drop-shadow(0 0 0 transparent); }
}

/* ── Wax seal ───────────────────────────────────────────── */
.wax {
  position: absolute;
  top: 95px;
  left: 50%;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
  font-family: var(--font-serif, Georgia, serif);
  font-weight: 700;
  font-size: 19px;
  letter-spacing: 0.02em;
  z-index: 3;
  cursor: pointer;
  box-shadow:
    0 8px 18px hsla(0 0% 0% / 0.35),
    inset 0 -8px 16px hsla(0 0% 0% / 0.28),
    inset 0 8px 14px hsla(0 0% 100% / 0.22);
  opacity: 1;
  transform: translateX(-50%) scale(1) rotate(0);
  transition: transform 240ms var(--ease-spring), box-shadow var(--dur-base) var(--ease-out);
}
.letter.sealed:hover .wax {
  transform: translateX(-50%) scale(1.05) rotate(-4deg);
}
.letter:not(.sealed) .wax {
  pointer-events: none;
  animation: wax-crack 500ms cubic-bezier(0.4, 0, 0.5, 1.3) both;
}
@keyframes wax-crack {
  0%   { transform: translateX(-50%) scale(1)    rotate(0deg);   opacity: 1; }
  20%  { transform: translateX(-50%) scale(1.18) rotate(-5deg);  opacity: 1; }
  100% { transform: translateX(-50%) scale(1.7)  rotate(32deg) translateY(-38px); opacity: 0; }
}
.wax::before {
  content: '';
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 2px dashed hsla(0 0% 100% / 0.22);
  pointer-events: none;
  animation: seal-spin 28s linear infinite;
}
.wax-glow {
  position: absolute;
  top: 10%;
  left: 18%;
  width: 32%;
  height: 22%;
  background: var(--wax-shine);
  border-radius: 50%;
  filter: blur(2px);
  pointer-events: none;
}
.monogram {
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 1px hsla(0 0% 0% / 0.3);
}
@keyframes seal-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .letter { padding: var(--space-6) var(--space-4) var(--space-5); }
  .letter.sealed { padding-top: 155px; }
  .env-flap { height: 120px; }
  .wax { top: 80px; width: 80px; height: 80px; font-size: 17px; }
  .title { font-size: 21px; }
  .body { font-size: 15px; }
}
</style>
