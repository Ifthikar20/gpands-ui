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

const sealed = ref(true) // anonymous posts start sealed
const upBounce = ref(false)
const downBounce = ref(false)
watch(upBounce, (v) => v && setTimeout(() => (upBounce.value = false), 280))
watch(downBounce, (v) => v && setTimeout(() => (downBounce.value = false), 280))

const formattedAuthor = computed(() => props.post.author.replace(/_/g, ' '))

const preview = computed(() => {
  if (!props.post.body) return ''
  return props.post.body.length > 320 ? props.post.body.slice(0, 320) + '…' : props.post.body
})

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
    :class="['card', isAnonymous ? 'envelope' : 'letter', { sealed: isAnonymous && sealed }]"
    :tabindex="0"
    role="button"
    :aria-expanded="!isAnonymous || !sealed"
    @click="onCardClick"
    @keydown="onKey"
  >
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
    </header>

    <header v-else class="head envelope-head">
      <CapsuleChip :name="post.subreddit" size="sm" />
      <span class="anon-label">Sealed by anonymous</span>
      <span class="meta">{{ time }}</span>
    </header>

    <h3 class="title">{{ post.title }}</h3>

    <!-- ── Seal overlay (anonymous only, while sealed) ───────── -->
    <div v-if="isAnonymous && sealed" class="seal-stage" @click.stop="sealed = false">
      <div class="wax" :style="{ background: community?.color || 'var(--accent-orange)' }">
        <span class="monogram">G&amp;S</span>
        <span class="wax-glow" />
      </div>
      <p class="seal-hint">Tap the seal to open</p>
    </div>

    <!-- ── Body (always for letters, after unseal for envelopes) -->
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
  padding: var(--space-5) var(--space-5) var(--space-4);
  cursor: pointer;
  outline: none;
  transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
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
  background: var(--paper);
  background-image:
    repeating-linear-gradient(transparent 0, transparent 27px, var(--paper-line) 28px),
    radial-gradient(ellipse at top right, hsla(0 0% 0% / 0.04), transparent 60%);
  box-shadow: 0 1px 2px var(--paper-shadow), 0 12px 28px hsla(0 0% 0% / 0.06);
}
.letter:hover { box-shadow: 0 4px 8px var(--paper-shadow), 0 18px 36px hsla(0 0% 0% / 0.08); }

/* ── Envelope (anonymous posts) ───────────────────────────── */
.envelope {
  background: var(--paper);
  background-image:
    linear-gradient(135deg, hsla(0 0% 0% / 0.04), transparent 70%),
    radial-gradient(ellipse at bottom right, hsla(0 0% 0% / 0.05), transparent 60%);
  box-shadow: 0 1px 2px var(--paper-shadow), 0 12px 28px hsla(0 0% 0% / 0.08);
}
.envelope::before {
  /* Subtle envelope-flap fold line at top */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--paper-line) 20%, var(--paper-line) 80%, transparent);
  pointer-events: none;
}
.envelope.sealed { padding-bottom: var(--space-6); }
.envelope:hover .wax { transform: scale(1.04) rotate(-3deg); }

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

.envelope-head {
  flex-wrap: wrap;
}
.anon-label {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  color: var(--text-muted);
  font-size: 13px;
  flex: 1;
}

.meta {
  font-size: 12px;
  color: var(--text-muted);
}

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
}

/* ── Seal overlay (sealed envelope only) ──────────────────── */
.seal-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) 0 var(--space-2);
}
.wax {
  position: relative;
  width: 86px;
  height: 86px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
  font-family: var(--font-serif, Georgia, serif);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.02em;
  box-shadow:
    0 6px 16px hsla(0 0% 0% / 0.3),
    inset 0 -8px 14px hsla(0 0% 0% / 0.25),
    inset 0 8px 14px hsla(0 0% 100% / 0.18);
  transition: transform 320ms var(--ease-spring), box-shadow var(--dur-base) var(--ease-out);
  cursor: pointer;
}
.wax::before {
  /* Drip / irregular outer edge — subtle hex-ish indent */
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px dashed hsla(0 0% 100% / 0.18);
  pointer-events: none;
  animation: seal-spin 24s linear infinite;
}
.wax-glow {
  position: absolute;
  top: 10%;
  left: 18%;
  width: 30%;
  height: 22%;
  background: var(--wax-shine);
  border-radius: 50%;
  filter: blur(2px);
  pointer-events: none;
}
.monogram { position: relative; z-index: 1; text-shadow: 0 1px 1px hsla(0 0% 0% / 0.3); }
@keyframes seal-spin {
  to { transform: rotate(360deg); }
}
.seal-hint {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  color: var(--text-muted);
  font-size: 13px;
  letter-spacing: 0.02em;
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
  color: var(--text-primary);
  font-size: 15px;
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
  .title { font-size: 19px; }
}
</style>
