<script setup lang="ts">
import type { PowerCard } from '~/data/cards.generated'

const props = withDefaults(
  defineProps<{
    card: PowerCard
    /** Show only the name, art and type: for small hands and fans. */
    compact?: boolean
    /** Tilt and shine under the pointer. */
    tilt?: boolean
    selected?: boolean
  }>(),
  { compact: false, tilt: true, selected: false },
)

const ROMAN = ['I', 'II', 'III']
const el = ref<HTMLElement | null>(null)

function move(e: PointerEvent) {
  if (!props.tilt || !el.value || e.pointerType === 'touch') return
  const r = el.value.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.value.style.setProperty('--ry', `${(x - 0.5) * 14}deg`)
  el.value.style.setProperty('--rx', `${(0.5 - y) * 14}deg`)
  el.value.style.setProperty('--mx', `${x * 100}%`)
  el.value.style.setProperty('--my', `${y * 100}%`)
}
function leave() {
  el.value?.style.removeProperty('--rx')
  el.value?.style.removeProperty('--ry')
}
</script>

<template>
  <article
    ref="el"
    class="pcard"
    :class="{ compact, active: card.active, selected, tilt }"
    @pointermove="move"
    @pointerleave="leave"
  >
    <header>
      <h3>{{ card.name }}</h3>
      <span class="badge-icon" aria-hidden="true">{{ card.icon }}</span>
    </header>
    <!-- Trusted static SVG generated from the game repo (scripts/sync-cards.mjs). -->
    <div class="art" v-html="card.art" />
    <p class="type">
      <strong>{{ card.active ? 'Active' : 'Passive' }}</strong>
      <span>{{ card.active ? 'tap it mid-putt' : 'always on' }}</span>
    </p>
    <ol v-if="!compact" class="levels">
      <li v-for="(d, i) in card.levels" :key="i">
        <span class="lv">{{ ROMAN[i] }}</span>
        <span>{{ d }}</span>
      </li>
    </ol>
    <span class="shine" aria-hidden="true" />
  </article>
</template>

<style scoped>
.pcard {
  --ink: #5a3a22;
  --cream: #fff3d6;
  --gold: #d9a441;
  --accent: #2f9a62;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 18px;
  background: linear-gradient(170deg, #fff8e6, var(--cream));
  border: 4px solid var(--gold);
  box-shadow: 0 0 0 2px #8a5d1f, 0 10px 18px rgba(40, 20, 10, 0.28);
  color: var(--ink);
  font-family: var(--font-body);
  text-align: left;
  overflow: hidden;
  transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.pcard.active {
  --accent: #c2473b;
}
.pcard.selected {
  box-shadow: 0 0 0 3px #fff, 0 0 0 7px var(--accent), 0 14px 24px rgba(40, 20, 10, 0.35);
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
h3 {
  margin: 0;
  font-size: 1.35rem;
  color: var(--ink);
}
.badge-icon {
  flex: none;
  min-width: 38px;
  padding: 4px 8px;
  border-radius: 999px;
  background: var(--accent);
  border: 2px solid #fff;
  color: #fff;
  font: 400 0.78rem/1.2 var(--font-display);
  text-align: center;
  letter-spacing: 0.03em;
}
.art {
  border-radius: 10px;
  border: 3px solid #a87a3c;
  overflow: hidden;
  font-family: var(--font-display);
  line-height: 0;
}
.art :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}
.type {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 0.78rem;
  color: #8a6a4c;
}
.type strong {
  padding: 0.15em 0.7em;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.72rem;
}
.levels {
  list-style: none;
  margin: 0;
  padding: 8px 0 0;
  border-top: 2px dashed #d9b97c;
  display: grid;
  gap: 6px;
  font-size: 0.86rem;
  line-height: 1.3;
}
.levels li {
  display: flex;
  gap: 8px;
}
.lv {
  flex: none;
  display: grid;
  place-items: center;
  width: 24px;
  height: 20px;
  border-radius: 6px;
  background: #e9d2a3;
  font: 400 0.8rem/1 var(--font-display);
  color: var(--ink);
}
.shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 0%), rgba(255, 255, 255, 0.7), transparent 55%);
  mix-blend-mode: soft-light;
  transition: opacity 0.2s ease;
}
.pcard.tilt:hover .shine {
  opacity: 1;
}
.compact h3 {
  font-size: 1.05rem;
}
.compact .type span {
  display: none;
}
.compact {
  gap: 6px;
  padding: 9px;
}
@media (prefers-reduced-motion: reduce) {
  .pcard {
    transform: none;
    transition: none;
  }
}
</style>
