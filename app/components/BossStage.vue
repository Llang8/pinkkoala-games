<script setup lang="ts">
// A small three.js stage showing the four Rough Day bosses, built from the same flat-shaded
// primitives as in the game (app/lib/bossModels.js). three.js is loaded lazily, only once the
// section scrolls near the viewport, and rendering pauses whenever it is off screen.
interface Boss {
  kind: string
  name: string
  stage: string
  blurb: string
  sky: [string, string]
  ground: number
}

const bosses: Boss[] = [
  {
    kind: 'groundskeeper',
    name: 'The Groundskeeper',
    stage: 'Stage 1 · The Meadow',
    blurb: 'Forty years of perfect lawn. He leans on his rake and shakes a fist at anyone who scuffs it.',
    sky: ['#bfe3ff', '#8fcf8f'],
    ground: 0x4f9a4a,
  },
  {
    kind: 'scarecrowKing',
    name: 'Scarecrow King',
    stage: 'Stage 2 · Amber Orchard',
    blurb: 'A burlap-sacked scarecrow in a crooked gold crown, with a crow on his shoulder and a pumpkin scepter.',
    sky: ['#ffe0ad', '#e69a52'],
    ground: 0xb5702e,
  },
  {
    kind: 'frostWarden',
    name: 'Frost Warden',
    stage: 'Stage 3 · Frostbite Peaks',
    blurb: 'A snowman ranger in a warden\'s hat, glaring over an icy scarf. He swears the ice is natural.',
    sky: ['#d6ecff', '#8fb8e8'],
    ground: 0xdce9f5,
  },
  {
    kind: 'castleWarden',
    name: 'Castle Warden',
    stage: 'Stage 4 · Cloudspire Keep',
    blurb: 'A knight in steel with a plumed helm and a royal shield, brandishing the key to the gate he guards.',
    sky: ['#c9c4ff', '#6a6fb5'],
    ground: 0x8d93a8,
  },
]

const current = ref(0)
const ready = ref(false)
const failed = ref(false)
const wrap = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

const boss = computed(() => bosses[current.value]!)
const stageStyle = computed(() => ({
  '--sky-a': boss.value.sky[0],
  '--sky-b': boss.value.sky[1],
}))

// Set once three.js is up; lets the button handler swap models.
let selectBoss: ((i: number) => void) | null = null
let teardown: (() => void) | null = null

function choose(i: number) {
  current.value = i
  selectBoss?.(i)
}

async function start() {
  const THREE = await import('three')
  const { buildBossModel } = await import('~/lib/bossModels.js')
  const el = canvas.value
  const box = wrap.value
  if (!el || !box) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  const target = new THREE.Vector3(0, 2.7, 0)

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 1.5))
  const sun = new THREE.DirectionalLight(0xffffff, 2.4)
  sun.position.set(5, 10, 7)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 8, bottom: -6, near: 1, far: 30 })
  scene.add(sun)

  const groundMat = new THREE.MeshStandardMaterial({ color: bosses[0]!.ground, flatShading: true, roughness: 0.9 })
  const ground = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.6, 0.5, 40), groundMat)
  ground.position.y = -0.25
  ground.receiveShadow = true
  scene.add(ground)

  // One slot per boss, built on first view and kept.
  const models: Array<ReturnType<typeof buildBossModel> | undefined> = []
  const stage = new THREE.Group()
  scene.add(stage)
  let shown = 0
  let pop = 1 // 0 -> 1 grow-in after a swap

  const show = (i: number) => {
    stage.clear()
    models[i] ??= buildBossModel(bosses[i]!.kind)
    const m = models[i]!
    m.holder.traverse((o: any) => {
      if (o.isMesh) o.castShadow = true
    })
    stage.add(m.holder)
    groundMat.color.setHex(bosses[i]!.ground)
    shown = i
    pop = reduced ? 1 : 0
  }
  show(0)
  selectBoss = (i) => {
    show(i)
    if (!running) renderOnce()
  }

  // Drag to turn him; he sways on his own when left alone.
  let yaw = 0
  let dragging = false
  let lastX = 0
  let idleSince = 0
  const onDown = (e: PointerEvent) => {
    dragging = true
    lastX = e.clientX
    el.setPointerCapture(e.pointerId)
  }
  const onMove = (e: PointerEvent) => {
    if (!dragging) return
    yaw += (e.clientX - lastX) * 0.012
    lastX = e.clientX
    if (!running) renderOnce()
  }
  const onUp = () => {
    dragging = false
    idleSince = elapsed()
  }
  el.addEventListener('pointerdown', onDown)
  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerup', onUp)
  el.addEventListener('pointercancel', onUp)

  const resize = () => {
    const w = box.clientWidth
    const h = box.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // Keep about 8 units of width in frame on narrow screens.
    const halfV = Math.tan((camera.fov * Math.PI) / 360)
    const dist = Math.max(13.5, 4.4 / (halfV * camera.aspect))
    camera.position.set(0, 3.6 + (dist - 13.5) * 0.12, dist)
    camera.lookAt(target)
    camera.updateProjectionMatrix()
  }
  resize()
  const ro = new ResizeObserver(() => {
    resize()
    if (!running) renderOnce()
  })
  ro.observe(box)

  const t0 = performance.now()
  const elapsed = () => (performance.now() - t0) / 1000
  let running = false
  let raf = 0

  const frame = () => {
    const t = elapsed()
    const m = models[shown]!
    m.idle(t)
    pop = Math.min(1, pop + 0.06)
    const ease = 1 - (1 - pop) ** 3
    m.holder.scale.setScalar(Math.max(0.001, ease))
    m.holder.position.y = Math.abs(Math.sin(t * 2.1)) * m.bob
    const sway = dragging || reduced ? 0 : Math.sin((t - idleSince) * 0.9) * 0.45
    stage.rotation.y = yaw + sway
    renderer.render(scene, camera)
  }
  const loop = () => {
    frame()
    raf = requestAnimationFrame(loop)
  }
  const renderOnce = () => frame()

  // Only animate while the stage is on screen.
  const io = new IntersectionObserver(
    ([entry]) => {
      const visible = !!entry?.isIntersecting
      if (visible && !running && !reduced) {
        running = true
        loop()
      } else if (!visible && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    },
    { threshold: 0.05 },
  )
  io.observe(box)
  if (reduced) renderOnce()
  ready.value = true

  teardown = () => {
    running = false
    cancelAnimationFrame(raf)
    io.disconnect()
    ro.disconnect()
    el.removeEventListener('pointerdown', onDown)
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerup', onUp)
    el.removeEventListener('pointercancel', onUp)
    scene.traverse((o: any) => {
      if (o.isMesh) {
        o.geometry.dispose()
        ;(Array.isArray(o.material) ? o.material : [o.material]).forEach((mt: any) => mt.dispose())
      }
    })
    renderer.dispose()
    selectBoss = null
  }
}

onMounted(() => {
  const box = wrap.value
  if (!box) return
  // Load three.js only when the section is within a screenful of the viewport.
  const gate = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      gate.disconnect()
      start().catch(() => {
        failed.value = true
      })
    },
    { rootMargin: '400px' },
  )
  gate.observe(box)
  onBeforeUnmount(() => {
    gate.disconnect()
    teardown?.()
  })
})
</script>

<template>
  <div class="boss">
    <div ref="wrap" class="stage" :style="stageStyle">
      <canvas ref="canvas" role="img" :aria-label="`3D model of ${boss.name}. Drag to turn him.`" />
      <p v-if="!ready" class="loading">{{ failed ? 'The 3D view needs WebGL.' : 'Waking the boss...' }}</p>
      <p v-else class="hint" aria-hidden="true">Drag to turn</p>
    </div>

    <div class="info">
      <div class="tabs" role="group" aria-label="Choose a boss">
        <button
          v-for="(b, i) in bosses"
          :key="b.kind"
          type="button"
          :aria-pressed="i === current"
          :class="{ on: i === current }"
          @click="choose(i)"
        >
          <span class="n">{{ i + 1 }}</span>
          <span class="t">{{ b.name }}</span>
        </button>
      </div>
      <div class="card" aria-live="polite">
        <p class="stage-n">{{ boss.stage }}</p>
        <h3>{{ boss.name }}</h3>
        <p>{{ boss.blurb }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.boss {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 28px;
  align-items: center;
}
.stage {
  position: relative;
  aspect-ratio: 5 / 4;
  border-radius: 28px;
  background: linear-gradient(180deg, var(--sky-a), var(--sky-b));
  border: 3px solid #12301a;
  box-shadow: 8px 8px 0 #12301a;
  overflow: hidden;
  transition: background 0.4s ease;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: pan-y;
}
canvas:active {
  cursor: grabbing;
}
.loading,
.hint {
  position: absolute;
  margin: 0;
  font-weight: 700;
  color: #12301a;
}
.loading {
  inset: 0;
  display: grid;
  place-items: center;
}
.hint {
  left: 14px;
  bottom: 12px;
  padding: 0.2em 0.8em;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.tabs {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 18px;
}
.tabs button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 2px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  color: var(--ink);
  font: inherit;
  font-weight: 700;
  text-align: left;
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
.n {
  flex: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--line);
  color: var(--ink);
  font: 400 1rem/1 var(--font-display);
}
.on .n {
  background: #fff;
  color: #2f6b3a;
}
.t {
  line-height: 1.15;
}
.card {
  padding: 18px 20px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 2px solid var(--line);
}
.card h3 {
  margin-bottom: 0.3em;
  font-size: 1.7rem;
}
.card p:last-child {
  margin: 0;
  color: var(--ink-soft);
}
.stage-n {
  margin: 0 0 4px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2f6b3a;
}
@media (prefers-color-scheme: dark) {
  .stage-n {
    color: #8fd19a;
  }
}
@media (max-width: 820px) {
  .boss {
    grid-template-columns: 1fr;
  }
  .stage {
    aspect-ratio: 1 / 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .stage {
    transition: none;
  }
}
</style>
