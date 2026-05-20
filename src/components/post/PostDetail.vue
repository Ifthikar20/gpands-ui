<script setup>
import { ref, computed } from 'vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useRelativeTime } from '@/composables/useRelativeTime.js'
import { formatCount } from '@/composables/useVote.js'

const props = defineProps({ post: { type: Object, required: true } })
const postsStore = usePostsStore()
const time = useRelativeTime(() => props.post.createdAt)

const isAnonymous = computed(() => props.post.author === 'anonymous')
const community = computed(() => communities.getCommunity(props.post.subreddit))
const formattedAuthor = computed(() =>
  isAnonymous.value ? 'Stranger' : props.post.author.replace(/_/g, ' '),
)
const paragraphs = computed(() =>
  (props.post.body || '').split('\n\n').filter(Boolean),
)
const paperClass = computed(() => `paper-${props.post.paperStyle || 'cream'}`)
const textureClass = computed(() => `texture-${props.post.paperTexture || 'smooth'}`)

const newComment = ref('')

function resonate() {
  postsStore.votePost(props.post.id, 1)
}

function submitComment() {
  const text = newComment.value.trim()
  if (!text) return
  postsStore.addComment(props.post.id, text)
  newComment.value = ''
}
</script>

<template>
  <div class="post-page">
    <article :class="['letter-detail', paperClass, textureClass, { named: !isAnonymous }]">
      <p class="dear">
        <span class="dear-prefix">Dear&hellip;</span>
        <span class="dear-name">{{ post.subreddit }}</span>
      </p>

      <h1 class="title">{{ post.title }}</h1>

      <div v-if="post.image && post.type === 'image'" class="postcard">
        <img :src="post.image" :alt="post.title" />
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
    </article>

    <section class="engage">
      <button
        class="resonate"
        :class="{ active: post.userVote === 1 }"
        @click="resonate"
      >
        <SvgIcon name="heart" :size="14" />
        <span>{{ post.userVote === 1 ? 'Resonated' : 'Resonate' }} &middot; {{ formatCount(post.score) }}</span>
      </button>

      <div class="write-back">
        <label class="wb-label" for="wb-input">Write back</label>
        <textarea
          id="wb-input"
          v-model="newComment"
          rows="4"
          placeholder="A few lines back to the writer&hellip;"
          class="wb-input"
        />
        <div class="wb-actions">
          <button
            class="send-reply"
            :disabled="!newComment.trim()"
            @click="submitComment"
          >Send</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.post-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.letter-detail {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
  padding: var(--space-8) var(--space-6) var(--space-6);
  background-color: var(--paper-bg, var(--paper));
  /* background-image + blend-mode supplied by the texture-* class. */
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  box-shadow: 0 1px 2px var(--paper-shadow), 0 12px 28px hsla(0 0% 0% / 0.05);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.dear {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 16px;
  color: var(--text-body);
}
.dear-prefix { color: var(--text-muted); margin-right: 6px; }
.dear-name {
  color: var(--text-primary);
  font-weight: 600;
  text-transform: lowercase;
}

.title {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 30px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  max-width: 560px;
  margin: 0 auto;
}

.postcard {
  align-self: center;
  max-width: 520px;
  width: 100%;
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: 0 6px 18px hsla(0 0% 0% / 0.22);
  transform: rotate(-1deg);
  background: white;
  padding: 6px 6px 10px;
}
.postcard img { display: block; width: 100%; height: auto; }

.body {
  text-align: left;
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
  color: var(--text-primary);
  font-family: var(--font-typewriter);
  font-size: 15px;
  line-height: 1.85;
}

.from {
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
  margin: var(--space-4) auto 0;
  color: var(--text-muted);
}
.from-prefix {
  font-family: var(--font-typewriter);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
}
.from-avatar { align-self: center; }
.from-name { color: var(--text-primary); }
.letter-detail.named .from-name {
  font-family: var(--font-script);
  font-size: 30px;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--accent-orange);
  transform: rotate(-2deg);
  line-height: 1;
}
.letter-detail:not(.named) .from-name {
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
}

/* ── Engagement section (separate from the letter card) ──── */
.engage {
  max-width: 560px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
}

.resonate {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  background: transparent;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-pill);
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.resonate:hover {
  color: var(--accent-orange);
  border-color: var(--accent-orange);
}
.resonate.active {
  color: var(--accent-orange);
  border-color: var(--accent-orange);
  background: var(--accent-orange-soft);
}

.write-back {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.wb-label {
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 700;
}
.wb-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px dashed var(--border-strong);
  padding: 10px 0;
  font-family: var(--font-typewriter);
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-primary);
  resize: vertical;
  outline: none;
  transition: border-color var(--dur-fast) var(--ease-out);
}
.wb-input::placeholder {
  font-style: italic;
  color: var(--text-muted);
  font-family: var(--font-serif, Georgia, serif);
}
.wb-input:focus { border-color: var(--accent-orange); }
.wb-actions { display: flex; justify-content: flex-end; }
.send-reply {
  padding: 7px 16px;
  background: var(--text-primary);
  color: var(--bg-canvas);
  border-radius: var(--radius-pill);
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  transition: filter var(--dur-fast) var(--ease-out);
}
.send-reply:hover:not(:disabled) { filter: brightness(1.15); }
.send-reply:disabled { opacity: 0.4; cursor: not-allowed; }

@media (max-width: 640px) {
  .letter-detail { padding: var(--space-6) var(--space-4); }
  .title { font-size: 24px; }
  .body { font-size: 14px; }
}
</style>
