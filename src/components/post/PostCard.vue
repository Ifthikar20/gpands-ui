<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useRelativeTime } from '@/composables/useRelativeTime.js'

const props = defineProps({ post: { type: Object, required: true } })

const postsStore = usePostsStore()
const router = useRouter()

const time = useRelativeTime(() => props.post.createdAt)
const isAnonymous = computed(() => props.post.author === 'anonymous')
const sealed = ref(true)

const formattedAuthor = computed(() => {
  if (isAnonymous.value) return 'Stranger'
  return props.post.author.replace(/_/g, ' ')
})

const paragraphs = computed(() => (props.post.body || '').split('\n\n').filter(Boolean))

const paperClass = computed(() => `paper-${props.post.paperStyle || 'cream'}`)
const textureClass = computed(() => `texture-${props.post.paperTexture || 'smooth'}`)

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
    :class="['letter', paperClass, textureClass, { sealed: isAnonymous && sealed, named: !isAnonymous }]"
    :tabindex="0"
    role="button"
    :aria-expanded="!isAnonymous || !sealed"
    @click="onCardClick"
    @keydown="onKey"
  >
    <!-- Envelope decorations for sealed anonymous letters -->
    <template v-if="isAnonymous">
      <div class="env-interior" aria-hidden="true" />
      <div class="env-flap" aria-hidden="true" />
    </template>

    <!-- "Dear ..." addressing line: capsule as recipient -->
    <p class="dear">
      <span class="dear-prefix">Dear&hellip;</span>
      <span class="dear-name">{{ post.subreddit }}</span>
    </p>

    <h2 class="title">{{ post.title }}</h2>

    <!-- Sealed-state hint (only when anonymous and sealed) -->
    <p v-if="isAnonymous && sealed" class="seal-hint">Tap to open</p>

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
  /* background-image + blend-mode supplied by the texture-* class. */
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
  transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), padding-top 700ms var(--ease-out);
}
.letter:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--paper-shadow), 0 18px 36px hsla(0 0% 0% / 0.08);
}
.letter:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 3px;
}
.letter.sealed { padding-top: 165px; }

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
.letter:not(.sealed):not(.named) .reveal-inner { transition-delay: 620ms; }

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
  height: 150px;
  background-color: var(--paper-bg, var(--paper));
  background-image:
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"),
    linear-gradient(180deg, hsla(0 0% 0% / 0.04), transparent 35%, hsla(0 0% 0% / 0.12) 95%, hsla(0 0% 0% / 0.18) 100%),
    radial-gradient(ellipse at top, hsla(0 0% 100% / 0.1), transparent 70%);
  background-blend-mode: multiply, normal, normal;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  filter: drop-shadow(0 6px 12px hsla(0 0% 0% / 0.28));
  z-index: 2;
  transform: rotateX(0);
  opacity: 1;
}
:root[data-theme='dark'] .env-flap { background-blend-mode: screen, normal, normal; }

.letter:not(.sealed) .env-flap {
  pointer-events: none;
  animation: flap-lift 1100ms cubic-bezier(0.65, 0, 0.25, 1) 220ms both;
}
/* Multi-stage easing: small initial peel, hesitation, then full
   rotation back. Reads as a thumb sliding under the flap. */
@keyframes flap-lift {
  0%   { transform: rotateX(0deg);    opacity: 1; filter: drop-shadow(0 8px 14px hsla(0 0% 0% / 0.22)); }
  10%  { transform: rotateX(-6deg);               filter: drop-shadow(0 12px 18px hsla(0 0% 0% / 0.28)); }
  28%  { transform: rotateX(-28deg);              filter: drop-shadow(0 22px 28px hsla(0 0% 0% / 0.36)); }
  85%  { transform: rotateX(-160deg); opacity: 0.6; filter: drop-shadow(0 0 0 transparent); }
  100% { transform: rotateX(-178deg); opacity: 0;   filter: drop-shadow(0 0 0 transparent); }
}

/* The dark "inside" of the envelope revealed as the flap lifts. */
.env-interior {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 150px;
  background:
    linear-gradient(180deg, hsla(0 0% 0% / 0.35), hsla(0 0% 0% / 0.12) 60%, transparent);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  transition: opacity 400ms var(--ease-out);
}
.letter.sealed .env-interior {
  opacity: 0;
}
.letter:not(.sealed) .env-interior {
  animation: interior-show 1100ms var(--ease-out) 220ms both;
}
@keyframes interior-show {
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  85%  { opacity: 0.6; }
  100% { opacity: 0; }
}

@media (max-width: 640px) {
  .letter { padding: var(--space-6) var(--space-4) var(--space-5); }
  .letter.sealed { padding-top: 145px; }
  .env-flap { height: 120px; }
  .title { font-size: 21px; }
  .body { font-size: 15px; }
}
</style>
