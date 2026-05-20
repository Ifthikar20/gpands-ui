<script setup>
import { ref, computed } from 'vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useRelativeTime } from '@/composables/useRelativeTime.js'

const props = defineProps({
  comment: { type: Object, required: true },
  postId: { type: String, required: true },
  depth: { type: Number, default: 0 },
})

const posts = usePostsStore()
const time = useRelativeTime(() => props.comment.createdAt)
const replyOpen = ref(false)
const replyText = ref('')

const isAnonymous = computed(() => props.comment.author === 'anonymous')
const displayName = computed(() =>
  isAnonymous.value ? 'Stranger' : props.comment.author.replace(/_/g, ' '),
)

function submitReply() {
  const text = replyText.value.trim()
  if (!text) return
  posts.addComment(props.postId, text, props.comment.id)
  replyText.value = ''
  replyOpen.value = false
}

function resonate() {
  posts.voteComment(props.postId, props.comment.id, 1)
}
</script>

<template>
  <div class="reply" :style="{ marginLeft: `${depth * 28}px` }">
    <header class="head">
      <UserAvatar
        v-if="!isAnonymous"
        :username="comment.author"
        :size="22"
        class="avatar"
      />
      <span class="author" :class="{ anon: isAnonymous }">{{ displayName }}</span>
      <span class="time">&mdash; {{ time }}</span>
    </header>

    <div class="body">{{ comment.body }}</div>

    <footer class="actions">
      <button
        class="act"
        :class="{ on: comment.userVote === 1 }"
        @click="resonate"
      >Resonate &middot; {{ comment.score }}</button>
      <button class="act" @click="replyOpen = !replyOpen">
        {{ replyOpen ? 'Cancel' : 'Reply' }}
      </button>
    </footer>

    <div v-if="replyOpen" class="reply-box">
      <textarea
        v-model="replyText"
        rows="3"
        placeholder="A few lines back&hellip;"
      />
      <button
        class="send"
        :disabled="!replyText.trim()"
        @click="submitReply"
      >Send</button>
    </div>

    <CommentItem
      v-for="child in comment.children"
      :key="child.id"
      :comment="child"
      :post-id="postId"
      :depth="depth + 1"
    />
  </div>
</template>

<style scoped>
.reply {
  padding: var(--space-3) 0;
  border-bottom: 1px dashed var(--paper-line);
}
.reply:last-child { border-bottom: none; }

.head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.avatar { box-shadow: 0 1px 2px hsla(0 0% 0% / 0.15); }
.author {
  font-family: var(--font-script);
  font-size: 20px;
  line-height: 1;
  color: var(--accent-orange);
  font-weight: 600;
  text-transform: capitalize;
  transform: rotate(-1deg);
  transform-origin: left center;
}
.author.anon {
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  transform: none;
  font-weight: 700;
}
.time {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 12px;
  color: var(--text-muted);
  margin-left: auto;
}

.body {
  font-family: var(--font-typewriter);
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-primary);
  white-space: pre-wrap;
  padding-left: 30px;
}

.actions {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  padding-left: 30px;
}
.act {
  background: transparent;
  font-family: var(--font-typewriter);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 700;
  transition: color var(--dur-fast) var(--ease-out);
}
.act:hover { color: var(--text-primary); }
.act.on { color: var(--accent-orange); }

.reply-box {
  margin: 10px 0 0 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.reply-box textarea {
  background: transparent;
  border: 1px dashed var(--border-strong);
  padding: 10px;
  font-family: var(--font-typewriter);
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-primary);
  resize: vertical;
  outline: none;
  border-radius: var(--radius-sm);
  transition: border-color var(--dur-fast) var(--ease-out);
}
.reply-box textarea::placeholder {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
}
.reply-box textarea:focus { border-color: var(--accent-orange); }
.send {
  align-self: flex-end;
  padding: 6px 14px;
  background: var(--text-primary);
  color: var(--bg-canvas);
  border-radius: var(--radius-pill);
  font-family: var(--font-typewriter);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  transition: filter var(--dur-fast) var(--ease-out);
}
.send:hover:not(:disabled) { filter: brightness(1.15); }
.send:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
