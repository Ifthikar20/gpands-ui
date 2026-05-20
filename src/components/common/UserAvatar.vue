<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: { type: String, default: '' },
  src: { type: String, default: null },
  size: { type: Number, default: 32 },
  online: { type: Boolean, default: false },
})

// Deterministic color from username.
const bg = computed(() => {
  let h = 0
  for (let i = 0; i < props.username.length; i++) {
    h = (h * 31 + props.username.charCodeAt(i)) % 360
  }
  return `linear-gradient(135deg, hsl(${h} 70% 55%), hsl(${(h + 40) % 360} 70% 45%))`
})

const initial = computed(() => (props.username[0] || '?').toUpperCase())
</script>

<template>
  <div
    class="avatar"
    :style="{ width: size + 'px', height: size + 'px', fontSize: size * 0.4 + 'px', background: src ? 'transparent' : bg }"
  >
    <img v-if="src" :src="src" :alt="username" />
    <span v-else>{{ initial }}</span>
    <span v-if="online" class="online-dot" :style="{ width: size * 0.28 + 'px', height: size * 0.28 + 'px' }" />
  </div>
</template>

<style scoped>
.avatar {
  position: relative;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  overflow: visible;
  flex-shrink: 0;
  user-select: none;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.avatar span {
  line-height: 1;
}
.online-dot {
  position: absolute;
  right: 0;
  bottom: 0;
  background: var(--success);
  border-radius: 50%;
  border: 2px solid var(--bg-canvas);
  box-shadow: 0 0 0 1px var(--success);
}
</style>
