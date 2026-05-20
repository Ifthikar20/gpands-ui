<script setup>
import { useUiStore } from '@/stores/ui.js'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const ui = useUiStore()

const principles = [
  {
    title: 'Everyone has a story worth telling.',
    body: 'Not just celebrities or influencers — the guy at the gas station, the single mom working two jobs, the college kid figuring life out.',
  },
  {
    title: 'Stories connect people more than opinions do.',
    body: 'Reddit is full of debates. Twitter is full of takes. A real human story cuts through all of that.',
  },
  {
    title: 'Some things are easier to say to strangers.',
    body: "A safe space — anonymous or not — to share what you can't say at the dinner table, at work, or even to your friends.",
  },
]

const futures = [
  'Featured weekly stories',
  'Audio & video submissions',
  'Local editions (“Good People of Dallas”)',
  'Nonprofit partnerships',
  'A podcast pulling the best stories',
]
</script>

<template>
  <div class="about">
    <header class="hero paper">
      <div class="hero-mark">
        <SvgIcon name="gps" :size="56" />
      </div>
      <h1>
        <span>Good People</span>
        <span class="amp"> &amp; </span>
        <span class="story">Story</span>
      </h1>
      <p class="lede">
        A community-driven storytelling platform where everyday people share real life experiences,
        organized by the topics they choose — love, loss, career, faith, funny moments, hardship,
        growth, and anything in between.
      </p>
      <div class="hero-actions">
        <button class="btn primary" @click="ui.openCreatePost()">
          <SvgIcon name="quote" :size="16" /> Send a note
        </button>
        <router-link to="/topics" class="btn ghost">Browse topics</router-link>
      </div>
    </header>

    <section class="pitch">
      <p>
        The goal is simple: give ordinary people a place to tell their story and be heard, without needing a
        following, a blog, or a camera crew. <strong>You pick a topic, write what happened, and put it out
        there.</strong> Other people read it, relate to it, and engage with it.
      </p>
      <p class="positioning">
        It sits in the space between Reddit and Humans of New York. Reddit has the community voting but
        feels chaotic and impersonal. HONY has the emotional depth but depends on one creator to curate
        everything. <em>Good People &amp; Story</em> puts the power in the hands of the people — anyone can
        post, anyone can read, and the best stories rise through community engagement.
      </p>
    </section>

    <section class="principles">
      <h2>What we believe</h2>
      <ol>
        <li v-for="(p, i) in principles" :key="i" class="paper">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.body }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="vision">
      <h2>Where this could go</h2>
      <p class="muted">
        The long-term vision could grow into something bigger. But the starting point is dead simple:
        a clean feed of real human stories, sorted by topic, powered by the community.
      </p>
      <ul class="future-list">
        <li v-for="(f, i) in futures" :key="i">
          <span class="bullet">›</span> {{ f }}
        </li>
      </ul>
    </section>

    <footer class="cta paper">
      <h2>Tell us what happened.</h2>
      <p>The version of this you tell to strangers might be the truest one.</p>
      <button class="btn primary large" @click="ui.openCreatePost()">
        <SvgIcon name="quote" :size="16" /> Send a note
      </button>
    </footer>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding-bottom: var(--space-8);
}

.hero {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at top left, hsla(16 95% 55% / 0.12), transparent 55%),
    radial-gradient(ellipse at bottom right, hsla(265 70% 60% / 0.1), transparent 55%);
  pointer-events: none;
}
.hero-mark {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: inline-grid;
  place-items: center;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-purple));
  color: white;
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-glow-orange);
  position: relative;
}
.hero h1 {
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  position: relative;
}
.hero h1 .amp {
  color: var(--accent-orange);
  font-family: var(--font-script);
  font-style: normal;
  font-weight: 500;
}
.hero h1 .story { font-family: var(--font-serif, Georgia, serif); font-style: italic; font-weight: 600; }

.lede {
  max-width: 480px;
  margin: var(--space-4) auto 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-body);
  position: relative;
}
.hero-actions {
  display: inline-flex;
  gap: var(--space-3);
  margin-top: var(--space-6);
  position: relative;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-weight: 700;
  font-size: 13px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.btn.primary {
  background: linear-gradient(135deg, var(--accent-orange), hsl(16 95% 48%));
  color: white;
  box-shadow: var(--shadow-glow-orange);
}
.btn.primary:hover { transform: translateY(-1px); filter: brightness(1.05); }
.btn.primary.large { padding: 14px 28px; font-size: 14px; }
.btn.ghost {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}
.btn.ghost:hover { background: var(--bg-hover); }

.pitch {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-body);
  padding: 0 var(--space-2);
  max-width: 680px;
}
.pitch .positioning { color: var(--text-body); }

section h2 {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: var(--space-4);
}

.principles ol {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.principles li {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-md);
  transition: transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.principles li:hover {
  transform: translateY(-1px);
  border-color: var(--border-strong);
}
.num {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 28px;
  font-weight: 700;
  color: var(--accent-orange);
  line-height: 1;
  flex-shrink: 0;
  min-width: 48px;
}
.principles h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}
.principles p {
  color: var(--text-body);
  font-size: 16px;
  line-height: 1.7;
  max-width: 480px;
}

.vision .muted {
  color: var(--text-body);
  margin-bottom: var(--space-4);
  font-size: 16px;
  line-height: 1.7;
  max-width: 480px;
}
.future-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-2);
}
.future-list li {
  padding: var(--space-3) var(--space-4);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.bullet { color: var(--accent-orange); font-weight: 700; }

.cta {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  border-radius: var(--radius-lg);
}
.cta h2 {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: var(--space-2);
}
.cta p { color: var(--text-secondary); margin-bottom: var(--space-5); }
</style>
