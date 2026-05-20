<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '@/components/common/BaseModal.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { useUiStore } from '@/stores/ui.js'
import { usePostsStore } from '@/stores/posts.js'
import { useCommunitiesStore } from '@/stores/communities.js'

const ui = useUiStore()
const posts = usePostsStore()
const communities = useCommunitiesStore()
const router = useRouter()

const tab = ref('text')
const title = ref('')
const body = ref('')
const link = ref('')
const image = ref('')
const subreddit = ref('love')
const anonymous = ref(false)

const open = computed({
  get: () => ui.createPostModalOpen,
  set: (v) => (v ? ui.openCreatePost() : ui.closeCreatePost()),
})

const canSubmit = computed(() => title.value.trim().length > 0 && subreddit.value)

function reset() {
  tab.value = 'text'
  title.value = ''
  body.value = ''
  link.value = ''
  image.value = ''
  subreddit.value = 'love'
  anonymous.value = false
}

watch(open, (v) => {
  if (!v) setTimeout(reset, 300)
})

function submit() {
  if (!canSubmit.value) return
  const id = posts.addPost({
    title: title.value.trim(),
    body: tab.value === 'text' ? body.value.trim() : tab.value === 'link' ? link.value.trim() : '',
    image: tab.value === 'image' ? image.value.trim() || null : null,
    subreddit: subreddit.value,
    type: tab.value,
    anonymous: anonymous.value,
  })
  ui.closeCreatePost()
  router.push({ name: 'post', params: { id } })
}

const tabs = [
  { value: 'text', label: 'Note', icon: 'quote' },
  { value: 'image', label: 'Image', icon: 'image' },
  { value: 'link', label: 'Link', icon: 'link' },
]
</script>

<template>
  <BaseModal v-model:open="open" title="Send a note" max-width="720px">
    <div class="form">
      <label class="field">
        <span class="label">Capsule</span>
        <div class="select">
          <select v-model="subreddit">
            <option v-for="c in communities.communities" :key="c.name" :value="c.name">
              {{ c.name }} — {{ c.title }}
            </option>
          </select>
        </div>
      </label>

      <div class="tabs" role="tablist">
        <button
          v-for="t in tabs"
          :key="t.value"
          class="tab"
          :class="{ active: tab === t.value }"
          @click="tab = t.value"
        >
          <SvgIcon :name="t.icon" :size="16" />
          {{ t.label }}
        </button>
      </div>

      <label class="field">
        <span class="label">Title</span>
        <input
          v-model="title"
          type="text"
          maxlength="300"
          placeholder="An interesting title"
          class="input"
        />
        <span class="hint">{{ 300 - title.length }} characters left</span>
      </label>

      <label v-if="tab === 'text'" class="field">
        <span class="label">Your note</span>
        <textarea v-model="body" rows="7" placeholder="Tell us what happened. Take your time." class="input" />
      </label>

      <label class="toggle">
        <input v-model="anonymous" type="checkbox" />
        <span class="toggle-track"><span class="toggle-thumb" /></span>
        <span>
          <span class="toggle-title">Post anonymously</span>
          <span class="toggle-hint">Some things are easier to say to strangers. Your name won't be attached.</span>
        </span>
      </label>

      <label v-if="tab === 'image'" class="field">
        <span class="label">Image URL</span>
        <input v-model="image" type="url" placeholder="https://..." class="input" />
        <div v-if="image" class="preview">
          <img :src="image" alt="preview" />
        </div>
      </label>

      <label v-if="tab === 'link'" class="field">
        <span class="label">Link URL</span>
        <input v-model="link" type="url" placeholder="https://..." class="input" />
      </label>
    </div>

    <template #footer>
      <button class="btn ghost" @click="ui.closeCreatePost()">Cancel</button>
      <button class="btn primary" :disabled="!canSubmit" @click="submit">Send note</button>
    </template>
  </BaseModal>
</template>

<style scoped>
.form { display: flex; flex-direction: column; gap: var(--space-4); }
.field { display: flex; flex-direction: column; gap: 6px; }
.label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
.input {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: 14px;
  width: 100%;
  resize: vertical;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.input:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px hsla(220 90% 60% / 0.18);
}
.hint { font-size: 11px; color: var(--text-muted); text-align: right; }

.select {
  display: flex;
  align-items: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 0 12px;
}
.select .prefix { color: var(--text-muted); }
.select select {
  flex: 1;
  background: transparent;
  border: none;
  padding: 10px 0;
  outline: none;
  appearance: none;
  font-size: 14px;
  cursor: pointer;
}
.select select option { background: var(--bg-elevated); }

.tabs {
  display: flex;
  border-bottom: 1px solid var(--border-subtle);
}
.tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 13px;
  border-bottom: 2px solid transparent;
  transition: color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.tab:hover { color: var(--text-primary); }
.tab.active {
  color: var(--accent-blue);
  border-bottom-color: var(--accent-blue);
}

.preview {
  margin-top: 8px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  max-height: 240px;
  display: grid;
  place-items: center;
  background: var(--bg-canvas);
}
.preview img { max-height: 240px; object-fit: contain; }

.toggle {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  cursor: pointer;
}
.toggle input { display: none; }
.toggle-track {
  position: relative;
  flex-shrink: 0;
  width: 36px;
  height: 20px;
  background: var(--bg-hover);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-pill);
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
  margin-top: 2px;
}
.toggle-thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  background: var(--text-secondary);
  border-radius: 50%;
  transition: transform var(--dur-base) var(--ease-spring), background var(--dur-fast) var(--ease-out);
}
.toggle input:checked + .toggle-track {
  background: var(--accent-orange);
  border-color: var(--accent-orange);
}
.toggle input:checked + .toggle-track .toggle-thumb {
  transform: translateX(16px);
  background: white;
}
.toggle-title {
  display: block;
  font-weight: 600;
  font-size: 13px;
  color: var(--text-primary);
}
.toggle-hint {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.btn {
  padding: 9px 18px;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 13px;
  transition: filter var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.btn.ghost {
  color: var(--text-secondary);
  background: transparent;
}
.btn.ghost:hover { background: var(--bg-hover); color: var(--text-primary); }
.btn.primary {
  background: linear-gradient(135deg, var(--accent-orange), hsl(16 100% 50%));
  color: white;
  box-shadow: var(--shadow-glow-orange);
}
.btn.primary:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.05); }
.btn.primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
