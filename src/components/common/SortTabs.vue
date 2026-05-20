<script setup>
import { ref, watch, nextTick } from 'vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [
      { value: 'hot', label: 'Hot', icon: 'flame' },
      { value: 'new', label: 'New', icon: 'sparkle' },
      { value: 'top', label: 'Top', icon: 'chart' },
      { value: 'rising', label: 'Rising', icon: 'rocket' },
    ],
  },
  modelValue: { type: String, default: 'hot' },
})
const emit = defineEmits(['update:modelValue'])

const root = ref(null)
const indicator = ref({ left: 0, width: 0 })

function update() {
  if (!root.value) return
  const el = root.value.querySelector('[data-active="true"]')
  if (!el) return
  const parentBox = root.value.getBoundingClientRect()
  const box = el.getBoundingClientRect()
  indicator.value = { left: box.left - parentBox.left, width: box.width }
}

watch(
  () => props.modelValue,
  async () => {
    await nextTick()
    update()
  },
  { immediate: true },
)

function onResize() { update() }

import { onMounted, onUnmounted } from 'vue'
onMounted(() => {
  update()
  window.addEventListener('resize', onResize)
})
onUnmounted(() => window.removeEventListener('resize', onResize))
</script>

<template>
  <div ref="root" class="sort-tabs">
    <button
      v-for="t in tabs"
      :key="t.value"
      class="tab"
      :data-active="modelValue === t.value"
      :class="{ active: modelValue === t.value }"
      @click="emit('update:modelValue', t.value)"
    >
      <SvgIcon :name="t.icon" :size="16" />
      <span>{{ t.label }}</span>
    </button>
    <span class="indicator" :style="{ left: indicator.left + 'px', width: indicator.width + 'px' }" />
  </div>
</template>

<style scoped>
.sort-tabs {
  position: relative;
  display: flex;
  gap: 4px;
  padding: 6px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}
.tab {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  color: var(--text-secondary);
  transition: color var(--dur-fast) var(--ease-out);
}
.tab:hover {
  color: var(--text-primary);
}
.tab.active {
  color: var(--text-primary);
}
.indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  background: var(--bg-elevated);
  border-radius: var(--radius-sm);
  transition: left var(--dur-base) var(--ease-spring), width var(--dur-base) var(--ease-spring);
  z-index: 0;
  box-shadow: 0 1px 2px hsla(0 0% 0% / 0.3) inset;
}
</style>
