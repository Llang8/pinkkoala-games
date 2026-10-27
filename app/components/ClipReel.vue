<script setup lang="ts">
import type { Clip } from '~/data/clips'

const props = defineProps<{ clips: Clip[] }>()

const STAGES: Record<number, { name: string; short: string }> = {
  1: { name: 'The Meadow', short: 'Meadow' },
  2: { name: 'Amber Orchard', short: 'Orchard' },
  3: { name: 'Frostbite Peaks', short: 'Frostbite' },
  4: { name: 'Cloudspire Keep', short: 'Castle' },
}

const filter = ref<0 | 1 | 2 | 3 | 4>(0)
const shown = computed(() => props.clips.filter((c) => filter.value === 0 || c.stage === filter.value))
const present = computed(() => [...new Set(props.clips.map((c) => c.stage))].sort())

const reduced = ref(false)
const root = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

function observeAll() {
  if (!io || !root.value) return
  io.disconnect()
  root.value.querySelectorAll('video').forEach((v) => io!.observe(v))
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement
        if (reduced.value) continue
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      }
    },
    { threshold: 0.35 },
  )
  observeAll()
})
onBeforeUnmount(() => io?.disconnect())
watch(shown, () => nextTick(observeAll))
</script>

<template>
  <div ref="root" class="reel">
    <div class="tabs" role="group" aria-label="Filter clips by stage">
      <button type="button" :class="{ on: filter === 0 }" :aria-pressed="filter === 0" @click="filter = 0">All stages</button>
      <button
        v-for="s in present"
        :key="s"
        type="button"
        :class="[`s${s}`, { on: filter === s }]"
        :aria-pressed="filter === s"
        @click="filter = s as 1 | 2 | 3 | 4"
      >
        {{ STAGES[s]!.short }}
      </button>
    </div>
    <div class="clips">
      <figure v-for="c in shown" :key="c.id" :class="`s${c.stage}`">
        <video
          :poster="`/games/rough-day/clips/${c.id}.jpg`"
          muted
          loop
          playsinline
          preload="none"
          :controls="reduced"
          :aria-label="`${c.combo} on ${c.hole}, ${STAGES[c.stage]!.name}`"
        >
          <source :src="`/games/rough-day/clips/${c.id}.mp4`" type="video/mp4" />
        </video>
        <figcaption>
          <span class="chip">{{ STAGES[c.stage]!.short }}</span>
          <strong>{{ c.combo }}</strong>
          <span class="hole">{{ c.hole }}<template v-if="c.note"> · {{ c.note }}</template></span>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}
.tabs button {
  padding: 0.45em 1em;
  border-radius: 999px;
  border: 2px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
.tabs button:hover {
  border-color: var(--pink);
}
.tabs button.on {
  background: #2f6b3a;
  border-color: #12301a;
  color: #fff;
  box-shadow: 3px 3px 0 #12301a;
}
.tabs button.s2.on {
  background: #b5702e;
  border-color: #5a3418;
  box-shadow: 3px 3px 0 #5a3418;
}
.tabs button.s3.on {
  background: #3f78c4;
  border-color: #1d3d6b;
  box-shadow: 3px 3px 0 #1d3d6b;
}
.tabs button.s4.on {
  background: #6a6fb5;
  border-color: #2e3166;
  box-shadow: 3px 3px 0 #2e3166;
}
.clips {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr));
}
figure {
  margin: 0;
}
video {
  width: 100%;
  aspect-ratio: 9 / 16;
  object-fit: cover;
  border-radius: var(--radius);
  background: #1d4a28;
  box-shadow: var(--shadow);
}
figcaption {
  display: grid;
  gap: 2px;
  margin-top: 10px;
}
.chip {
  justify-self: start;
  padding: 0.1em 0.7em;
  border-radius: 999px;
  background: #2f6b3a;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.s2 .chip {
  background: #b5702e;
}
.s3 .chip {
  background: #3f78c4;
}
.s4 .chip {
  background: #6a6fb5;
}
figcaption strong {
  font: 400 1.25rem/1.15 var(--font-display);
}
.hole {
  color: var(--ink-soft);
  font-size: 0.9rem;
}
</style>
