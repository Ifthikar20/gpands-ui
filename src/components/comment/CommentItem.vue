<script setup>
import { ref, computed } from 'vue'
import VoteWidget from '@/components/common/VoteWidget.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { usePostsStore } from '@/stores/posts.js'
import { useRelativeTime } from '@/composables/useRelativeTime.js'

const props = defineProps({
  comment: { type: Object, required: true },
  postId: { type: String, required: true },
  depth: { type: Number, default: 0 },
})

const posts = usePostsStore()
const collapsed = ref(false)
const replyOpen = ref(false)
const replyText = ref('')
const time = useRelativeTime(() => props.comment.createdAt)

const lineColor = computed(() => {
  const hue = (200 + props.depth * 35) % 360
  return `hsl(${hue} 60% 45%)`
})

function vote(direction) {
  posts.voteComment(props.postId, props.comment.id, direction)
}

function submitReply() {
  const text = replyText.value.trim()
  if (!text) return
  posts.addComment(props.postId, text, props.comment.id)
  replyText.value = ''
  replyOpen.value = false
}
</script>

<template>
  <div class="comment" :style="{ '--line': lineColor }">
    <div class="rail">
      <button class="collapse" :aria-label="collapsed ? 'Expand' : 'Collapse'" @click="collapsed = !collapsed">
        <UserAvatar :username="comment.author" :size="28" />
      </button>
      <button v-if="!collapsed" class="line" :aria-label="'Collapse thread'" @click="collapsed = true" />
    </div>

    <div class="body-col">
      <header class="meta">
        <span v-if="comment.author === 'anonymous'" class="author muted">anonymous</span>
        <router-link v-else :to="`/u/${comment.author}`" class="author">u/{{ comment.author }}</router-link>
        <span class="dot">•</span>
        <span class="muted">{{ time }}</span>
        <button v-if="collapsed" class="expand" @click="collapsed = false">[+] {{ comment.children?.length || 0 }} more</button>
      </header>

      <div v-if="!collapsed" class="text">{{ comment.body }}</div>

      <footer v-if="!collapsed" class="actions">
        <VoteWidget
          :score="comment.score"
          :user-vote="comment.userVote"
          orientation="horizontal"
          size="sm"
          @vote="vote"
        />
        <button class="action" @click="replyOpen = !replyOpen">
          <SvgIcon name="reply" :size="14" />
          <span>Reply</span>
        </button>
        <button class="action">
          <SvgIcon name="share" :size="14" />
          <span>Share</span>
        </button>
        <button class="action">
          <SvgIcon name="save" :size="14" />
          <span>Save</span>
        </button>
      </footer>

      <div v-if="replyOpen && !collapsed" class="reply-box">
        <textarea v-model="replyText" placeholder="What are your thoughts?" rows="3" />
        <div class="reply-actions">
          <button class="btn ghost" @click="replyOpen = false">Cancel</button>
          <button class="btn primary" :disabled="!replyText.trim()" @click="submitReply">Reply</button>
        </div>
      </div>

      <div v-if="!collapsed && comment.children?.length" class="children">
        <CommentItem
          v-for="child in comment.children"
          :key="child.id"
          :comment="child"
          :post-id="postId"
          :depth="depth + 1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment {
  display: flex;
  gap: var(--space-3);
  padding-top: var(--space-3);
}
.rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.collapse { padding: 0; border-radius: 50%; }
.line {
  flex: 1;
  width: 2px;
  background: var(--line);
  opacity: 0.35;
  border-radius: var(--radius-pill);
  margin: 4px 0;
  transition: opacity var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.line:hover { opacity: 0.7; background: var(--accent-blue); }

.body-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}
.author { font-weight: 700; color: var(--text-primary); }
.muted { color: var(--text-muted); }
.dot { color: var(--text-muted); }
.expand {
  margin-left: 8px;
  color: var(--accent-blue);
  font-weight: 600;
  font-size: 12px;
}

.text {
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-primary);
  white-space: pre-wrap;
}

.actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
}
.action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.action:hover { background: var(--bg-hover); color: var(--text-primary); }

.reply-box {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.reply-box textarea {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: 14px;
  resize: vertical;
  width: 100%;
}
.reply-box textarea:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px hsla(220 90% 60% / 0.18);
}
.reply-actions { display: flex; gap: 8px; justify-content: flex-end; }
.btn {
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 12px;
  transition: background var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out);
}
.btn.ghost { color: var(--text-secondary); }
.btn.ghost:hover { background: var(--bg-hover); color: var(--text-primary); }
.btn.primary { background: var(--accent-orange); color: white; }
.btn.primary:hover:not(:disabled) { filter: brightness(1.1); }
.btn.primary:disabled { opacity: 0.45; cursor: not-allowed; }

.children {
  display: flex;
  flex-direction: column;
}
</style>
