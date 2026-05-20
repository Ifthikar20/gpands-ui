<script setup>
import { computed } from 'vue'
import { useCommunitiesStore } from '@/stores/communities.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'md' }, // 'sm' | 'md' | 'lg'
  showIcon: { type: Boolean, default: true },
  linkable: { type: Boolean, default: true },
})

const communities = useCommunitiesStore()
const capsule = computed(() => communities.getCommunity(props.name))

const iconSize = computed(() => ({ sm: 11, md: 13, lg: 16 }[props.size] || 13))
</script>

<template>
  <component
    :is="linkable ? 'router-link' : 'span'"
    :to="linkable ? `/c/${name}` : undefined"
    :class="['capsule', size]"
    :style="capsule ? { background: capsule.color } : undefined"
    @click.stop
  >
    <SvgIcon v-if="showIcon && capsule?.icon" :name="capsule.icon" :size="iconSize" class="icon" />
    <span class="name">{{ name }}</span>
  </component>
</template>

<style scoped>
.capsule {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 11px 4px 7px;
  border-radius: var(--radius-pill);
  background: var(--bg-elevated);
  color: white;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: -0.005em;
  line-height: 1;
  white-space: nowrap;
  text-shadow: 0 1px 1px hsla(0 0% 0% / 0.18);
  box-shadow: var(--shadow-sm);
  transition: transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out);
}
.capsule:hover {
  transform: translateY(-1px);
  filter: brightness(1.06);
}
.capsule .icon { opacity: 0.95; }

.capsule.sm {
  padding: 2px 9px 2px 6px;
  font-size: 11px;
  gap: 4px;
}
.capsule.lg {
  padding: 6px 14px 6px 9px;
  font-size: 14px;
  gap: 6px;
}
</style>
