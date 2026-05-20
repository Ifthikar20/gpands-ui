<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import CapsuleChip from '@/components/common/CapsuleChip.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useCommunitiesStore } from '@/stores/communities.js'
import { useRelativeTime } from '@/composables/useRelativeTime.js'
import { formatCount } from '@/composables/useVote.js'

const props = defineProps({ post: { type: Object, required: true } })

const postsStore = usePostsStore()
const communities = useCommunitiesStore()
const router = useRouter()

const time = useRelativeTime(() => props.post.createdAt)
const isAnonymous = computed(() => props.post.author === 'anonymous')
const community = computed(() => communities.getCommunity(props.post.subreddit))
const isFollowing = computed(() => communities.isJoined(props.post.subreddit))

const sealed = ref(true)
const upBounce = ref(false)
const downBounce = ref(false)
watch(upBounce, (v) => v && setTimeout(() => (upBounce.value = false), 280))
watch(downBounce, (v) => v && setTimeout(() => (downBounce.value = false), 280))

const formattedAuthor = computed(() => props.post.author.replace(/_/g, ' '))

const preview = computed(() => {
  if (!props.post.body) return ''
  return props.post.body.length > 320 ? props.post.body.slice(0, 320) + '…' : props.post.body
})

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

function vote(direction, e) {
  e?.stopPropagation()
  postsStore.votePost(props.post.id, direction)
  if (direction === 1) upBounce.value = true
  else downBounce.value = true
}

function toggleFollow(e) {
  e?.stopPropagation()
  communities.toggleJoin(props.post.subreddit)
}
</script>

<template>
  <article
    :class="['card', isAnonymous ? 'envelope' : 'letter', paperClass, { sealed: isAnonymous && sealed }]"
    :tabindex="0"
    role="button"
    :aria-expanded="!isAnonymous || !sealed"
    @click="onCardClick"
    @keydown="onKey"
  >
    <!-- ── Envelope decorations (anonymous only) ───────────────── -->
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

    <!-- ── Header ───────────────────────────────────────────── -->
    <header v-if="!isAnonymous" class="head letter-head">
      <UserAvatar :username="post.author" :size="38" />
      <div class="byline">
        <div class="row">
          <router-link :to="`/u/${post.author}`" class="author" @click.stop>
            {{ formattedAuthor }}
          </router-link>
          <CapsuleChip :name="post.subreddit" size="sm" />
        </div>
        <span class="meta">{{ time }}</span>
      </div>
      <button class="follow-pill" :class="{ following: isFollowing }" @click="toggleFollow">
        {{ isFollowing ? 'Following' : 'Follow' }}
      </button>

      <!-- Postage stamp (top-right corner) -->
      <div class="stamp" :style="{ '--stamp-color': community?.color || 'var(--accent-orange)' }" aria-hidden="true">
        <span class="stamp-inner">
          <span class="stamp-mono">G&amp;S</span>
          <span class="stamp-value">{{ post.subreddit.slice(0, 4) }}</span>
        </span>
      </div>
    </header>

    <h3 class="title">{{ post.title }}</h3>

    <div v-if="isAnonymous" class="env-meta">
      <CapsuleChip :name="post.subreddit" size="sm" />
      <span class="meta-dot" aria-hidden="true">·</span>
      <span class="meta">{{ time }}</span>
    </div>

    <p v-if="isAnonymous && sealed" class="seal-hint">Tap the seal to open</p>

    <!-- ── Body reveal ─────────────────────────────────────────── -->
    <div class="reveal" :class="{ open: !isAnonymous || !sealed }">
      <div class="reveal-inner">
        <p v-if="preview" class="body" :class="{ serif: !isAnonymous }">{{ preview }}</p>

        <div v-if="post.type === 'image' && post.image" class="media">
          <img :src="post.image" :alt="post.title" loading="lazy" />
        </div>

        <p v-if="!isAnonymous" class="signature">— {{ formattedAuthor }}</p>

        <footer class="actions" @click.stop>
          <div class="vote" :class="{ up: post.userVote === 1, down: post.userVote === -1 }">
            <button :class="['vote-btn', { bounce: upBounce }]" aria-label="Upvote" @click="vote(1, $event)">
              <SvgIcon name="arrowUp" :size="18" />
            </button>
            <span class="score">{{ formatCount(post.score) }}</span>
            <button :class="['vote-btn', { bounce: downBounce }]" aria-label="Downvote" @click="vote(-1, $event)">
              <SvgIcon name="arrowDown" :size="18" />
            </button>
          </div>
          <button class="action" @click="onCardClick">
            <SvgIcon name="comment" :size="18" />
            <span>{{ formatCount(post.commentCount) }}</span>
          </button>
          <button class="action" aria-label="Share">
            <SvgIcon name="share" :size="18" />
          </button>
          <button class="action save" aria-label="Save">
            <SvgIcon name="save" :size="18" />
          </button>
        </footer>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ── Shared card frame ────────────────────────────────────── */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: var(--space-5);
  cursor: pointer;
  outline: none;
  overflow: hidden;
  transition: transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), padding-top 600ms var(--ease-out);
}
.card:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
}
.card:active { transform: translateY(0); }
.card:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 3px;
}

/* ── Letter (named posts) ─────────────────────────────────── */
.letter {
  background-color: var(--paper-bg, var(--paper));
  background-image:
    repeating-linear-gradient(transparent 0, transparent 27px, var(--paper-line) 28px),
    radial-gradient(ellipse at top right, hsla(0 0% 0% / 0.04), transparent 60%);
  box-shadow: 0 1px 2px var(--paper-shadow), 0 12px 28px hsla(0 0% 0% / 0.06);
}
.letter:hover { box-shadow: 0 4px 8px var(--paper-shadow), 0 18px 36px hsla(0 0% 0% / 0.08); }

/* ── Envelope (anonymous posts) ───────────────────────────── */
.envelope {
  background-color: var(--paper-bg, var(--paper));
  background-image:
    linear-gradient(135deg, hsla(0 0% 0% / 0.03), transparent 70%),
    radial-gradient(ellipse at bottom right, hsla(0 0% 0% / 0.05), transparent 60%);
  box-shadow: 0 1px 2px var(--paper-shadow), 0 12px 28px hsla(0 0% 0% / 0.08);
  /* 3D context so the flap rotates with depth instead of flattening. */
  perspective: 1500px;
  perspective-origin: 50% 0%;
}
.envelope.sealed {
  padding-top: 175px;
}

/* The triangular flap. Sealed = visible (sits flat over the top of
   the card). Unsealed runs the flap-lift keyframes that lift, pause
   at -18deg, then rotate fully back. */
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
  /* Sealed initial state — visible, flat. */
  transform: rotateX(0deg);
  opacity: 1;
}
.envelope:not(.sealed) .env-flap {
  pointer-events: none;
  animation: flap-lift 780ms cubic-bezier(0.4, 0, 0.3, 1) 180ms both;
}
@keyframes flap-lift {
  0%   { transform: rotateX(0deg);    opacity: 1; filter: drop-shadow(0 8px 14px hsla(0 0% 0% / 0.22)); }
  18%  { transform: rotateX(-18deg);              filter: drop-shadow(0 18px 24px hsla(0 0% 0% / 0.32)); }
  100% { transform: rotateX(-172deg); opacity: 0; filter: drop-shadow(0 0 0 transparent); }
}

/* Wax seal — sealed by default; cracks open via keyframes. */
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
  /* Sealed initial state — full size, centered, visible. */
  opacity: 1;
  transform: translateX(-50%) scale(1) rotate(0);
  transition: transform 240ms var(--ease-spring), box-shadow var(--dur-base) var(--ease-out);
}
.envelope.sealed:hover .wax {
  transform: translateX(-50%) scale(1.05) rotate(-4deg);
  box-shadow:
    0 12px 24px hsla(0 0% 0% / 0.4),
    inset 0 -8px 16px hsla(0 0% 0% / 0.28),
    inset 0 8px 14px hsla(0 0% 100% / 0.22);
}
.envelope:not(.sealed) .wax {
  pointer-events: none;
  animation: wax-crack 500ms cubic-bezier(0.4, 0, 0.5, 1.3) both;
}
@keyframes wax-crack {
  0%   { transform: translateX(-50%) scale(1)    rotate(0deg);   opacity: 1; }
  20%  { transform: translateX(-50%) scale(1.18) rotate(-5deg);  opacity: 1; }
  100% { transform: translateX(-50%) scale(1.7)  rotate(32deg) translateY(-38px); opacity: 0; }
}

/* Letter emerging from inside the envelope (anonymous only). */
.envelope:not(.sealed) .reveal.open .reveal-inner {
  animation: letter-emerge 600ms cubic-bezier(0.3, 1.2, 0.5, 1) 380ms both;
}
@keyframes letter-emerge {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
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

/* ── Headers ───────────────────────────────────────────────── */
.head { display: flex; align-items: center; gap: var(--space-3); }
.letter-head .byline { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.letter-head .row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.author {
  font-weight: 700;
  font-size: 14px;
  color: var(--text-primary);
  text-transform: capitalize;
}
.author:hover { text-decoration: underline; }

.meta { font-size: 13px; color: var(--text-body); line-height: 1.7; }

.follow-pill {
  padding: 5px 14px;
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 12px;
  border-radius: var(--radius-pill);
  flex-shrink: 0;
  transition: background var(--dur-fast) var(--ease-out);
}
.follow-pill:hover { background: var(--bg-hover); }
.follow-pill.following { color: var(--text-muted); }

/* Postage stamp on letter cards (postsecret-style). */
.letter-head { position: relative; }
.stamp {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 56px;
  height: 68px;
  background: var(--stamp-color);
  /* Scalloped edge via radial-gradient mask. */
  --notch: radial-gradient(circle 3px at 3px 50%, transparent 99%, black 100%);
  -webkit-mask:
    radial-gradient(circle 4px at 4px 4px,   transparent 99%, black 100%) top left,
    radial-gradient(circle 4px at 4px -4px,  transparent 99%, black 100%) top right,
    linear-gradient(black, black);
  -webkit-mask-composite: source-over;
  padding: 6px;
  display: grid;
  place-items: center;
  transform: rotate(-4deg);
  box-shadow: 0 3px 6px hsla(0 0% 0% / 0.18);
  pointer-events: none;
  z-index: 1;
}
.stamp-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 100%;
  height: 100%;
  border: 1px dashed hsla(0 0% 100% / 0.55);
  border-radius: 3px;
  color: white;
  text-shadow: 0 1px 1px hsla(0 0% 0% / 0.25);
}
.stamp-mono {
  font-family: var(--font-serif, Georgia, serif);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.02em;
}
.stamp-value {
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.9;
}

/* ── Title ─────────────────────────────────────────────────── */
.title {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}
.envelope .title {
  font-style: italic;
  text-align: center;
  padding: 0 var(--space-2);
  max-width: 480px;
  margin: 0 auto;
}

/* ── Envelope meta line (capsule + time) ─────────────────── */
.env-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-body);
}
.meta-dot { color: var(--text-muted); }

.seal-hint {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  color: var(--text-body);
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.01em;
  line-height: 1.7;
}

/* ── Unfold reveal ─────────────────────────────────────────── */
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
  gap: var(--space-3);
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 360ms var(--ease-out) 120ms, transform 360ms var(--ease-out) 120ms;
}
.reveal.open .reveal-inner {
  opacity: 1;
  transform: none;
}

/* ── Body ──────────────────────────────────────────────────── */
.body {
  color: var(--text-body);
  font-size: 16px;
  line-height: 1.7;
  white-space: pre-wrap;
}
.body.serif {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 16px;
  line-height: 1.72;
}

.media {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-elevated);
  max-height: 560px;
  display: grid;
  place-items: center;
}
.media img {
  width: 100%;
  height: auto;
  max-height: 560px;
  object-fit: cover;
}

.signature {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  color: var(--text-secondary);
  font-size: 14px;
  text-align: right;
  margin-top: -4px;
}

/* ── Actions ───────────────────────────────────────────────── */
.actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: 4px;
  padding-top: var(--space-3);
  border-top: 1px dashed var(--paper-line);
}
.vote {
  display: inline-flex;
  align-items: center;
  background: hsla(0 0% 0% / 0.05);
  border-radius: var(--radius-pill);
  padding: 2px;
}
.vote-btn {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--text-muted);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.vote-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
.vote-btn.bounce { animation: vote-bounce 280ms var(--ease-spring); }
@keyframes vote-bounce {
  0% { transform: scale(1); }
  40% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
.vote.up .vote-btn:first-child { color: var(--accent-orange); }
.vote.down .vote-btn:last-child { color: var(--downvote-blue); }
.score {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 13px;
  padding: 0 8px;
  min-width: 28px;
  text-align: center;
  color: var(--text-primary);
}
.vote.up .score { color: var(--accent-orange); }
.vote.down .score { color: var(--downvote-blue); }

.action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.action:hover { background: var(--bg-hover); color: var(--text-primary); }
.action.save { margin-left: auto; }

@media (max-width: 640px) {
  .card { padding: var(--space-4); }
  .envelope.sealed { padding-top: 155px; }
  .env-flap { height: 120px; }
  .wax { top: 80px; width: 80px; height: 80px; font-size: 17px; }
  .title { font-size: 19px; }
}
</style>
