<script setup>
import { ref, watch } from 'vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { formatCount } from '@/composables/useVote.js'

const props = defineProps({
  score: { type: Number, required: true },
  userVote: { type: Number, default: 0 },
  orientation: { type: String, default: 'vertical' }, // 'vertical' | 'horizontal'
  size: { type: String, default: 'md' }, // 'sm' | 'md'
})

const emit = defineEmits(['vote'])

const bounceUp = ref(false)
const bounceDown = ref(false)

function vote(direction, e) {
  e?.stopPropagation()
  if (direction === 1) {
    bounceUp.value = false
    requestAnimationFrame(() => (bounceUp.value = true))
  } else {
    bounceDown.value = false
    requestAnimationFrame(() => (bounceDown.value = true))
  }
  emit('vote', direction)
}

watch(bounceUp, (v) => v && setTimeout(() => (bounceUp.value = false), 300))
watch(bounceDown, (v) => v && setTimeout(() => (bounceDown.value = false), 300))
</script>

<template>
  <div :class="['vote', orientation, size, { upvoted: userVote === 1, downvoted: userVote === -1 }]">
    <button
      class="vote-btn up"
      :class="{ 'vote-bounce': bounceUp }"
      aria-label="Upvote"
      @click="vote(1, $event)"
    >
      <SvgIcon name="arrowUp" :size="size === 'sm' ? 16 : 20" />
    </button>
    <span class="score">{{ formatCount(score) }}</span>
    <button
      class="vote-btn down"
      :class="{ 'vote-bounce': bounceDown }"
      aria-label="Downvote"
      @click="vote(-1, $event)"
    >
      <SvgIcon name="arrowDown" :size="size === 'sm' ? 16 : 20" />
    </button>
  </div>
</template>

<style scoped>
.vote {
  display: flex;
  align-items: center;
  gap: 2px;
  color: var(--text-secondary);
  font-weight: 700;
  user-select: none;
}
.vote.vertical {
  flex-direction: column;
}
.vote.horizontal {
  flex-direction: row;
}
.vote-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.vote-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.vote-btn.up:hover {
  color: var(--accent-orange);
}
.vote-btn.down:hover {
  color: var(--downvote-blue);
}
.upvoted .vote-btn.up {
  color: var(--accent-orange);
  background: var(--accent-orange-soft);
}
.downvoted .vote-btn.down {
  color: var(--downvote-blue);
  background: var(--downvote-blue-soft);
}
.upvoted .score {
  color: var(--accent-orange);
}
.downvoted .score {
  color: var(--downvote-blue);
}
.score {
  font-size: 12px;
  min-width: 28px;
  text-align: center;
  color: var(--text-primary);
}
.vote.sm .score {
  font-size: 11px;
  min-width: 22px;
}
</style>
