<script setup lang="ts">
import { powerCards } from '~/data/cards.generated'
import { combos, comboFor } from '~/data/combos'

const byId = Object.fromEntries(powerCards.map((c) => [c.id, c]))
const hand = ref<string[]>(['piggy-bank', 'lucky-clover', 'second-wind'])
const extraSlot = ref(false)
const note = ref('')

const slots = computed(() => (extraSlot.value ? 4 : 3))
const active = computed(() => comboFor(hand.value))
const slotList = computed(() => Array.from({ length: 4 }, (_, i) => hand.value[i] ?? null))

function toggle(id: string) {
  const i = hand.value.indexOf(id)
  if (i >= 0) {
    hand.value.splice(i, 1)
    note.value = `${byId[id]!.name} removed from your hand.`
    return
  }
  if (hand.value.length >= slots.value) {
    const out = hand.value.shift()!
    note.value = `Your hand is full, so ${byId[out]!.name} was swapped out for ${byId[id]!.name}.`
  } else {
    note.value = `${byId[id]!.name} added to your hand.`
  }
  hand.value.push(id)
}

function toggleExtra() {
  extraSlot.value = !extraSlot.value
  if (!extraSlot.value) {
    while (hand.value.length > 3) hand.value.shift()
  }
  note.value = extraSlot.value ? 'Extra Slot unlocked: you can carry four cards.' : 'Back to three slots.'
}

// A hint at what to add when the hand has no combo yet.
const hint = computed(() => {
  if (active.value.length) return ''
  const open = combos.find((c) => c.ids.some((id) => hand.value.includes(id)) && !c.ids.every((id) => hand.value.includes(id)))
  if (!open) return 'Pick cards that help each other and something clicks.'
  const have = open.ids.find((id) => hand.value.includes(id))!
  const need = open.ids.find((id) => id !== have)!
  return `${byId[have]!.name} has a friend: try adding ${byId[need]!.name}.`
})

const clear = () => {
  hand.value = []
  note.value = 'Hand cleared.'
}
</script>

<template>
  <div class="lab">
    <div class="hand-wrap">
      <div class="hand-head">
        <p class="count"><strong>{{ hand.length }}</strong> / {{ slots }} slots</p>
        <button type="button" class="link" @click="clear">Clear hand</button>
      </div>
      <div class="hand" role="list" aria-label="Your hand">
        <div v-for="(id, i) in slotList" :key="i" class="slot" role="listitem" :class="{ locked: i === 3 && !extraSlot, empty: !id && !(i === 3 && !extraSlot) }">
          <template v-if="id">
            <PowerCard :card="byId[id]!" compact :tilt="false" />
            <button type="button" class="x" :aria-label="`Remove ${byId[id]!.name}`" @click="toggle(id)">&times;</button>
          </template>
          <button v-else-if="i === 3 && !extraSlot" type="button" class="slot-btn" @click="toggleExtra">
            <span class="lock" aria-hidden="true">+1</span>
            <strong>Extra Slot</strong>
            <span>a rare upgrade. Tap to try it.</span>
          </button>
          <p v-else class="slot-empty">Empty slot<br /><span>pick a card below</span></p>
        </div>
      </div>
      <button v-if="extraSlot" type="button" class="link center" @click="toggleExtra">Lock the fourth slot again</button>

      <div class="combos" aria-live="polite">
        <template v-if="active.length">
          <div v-for="c in active" :key="c.name" class="combo">
            <p class="combo-tag">Combo</p>
            <h3>{{ c.name }}</h3>
            <p>{{ c.text }}</p>
          </div>
        </template>
        <p v-else class="no-combo">{{ hint }}</p>
      </div>
      <p class="sr-only" aria-live="polite">{{ note }}</p>
    </div>

    <h3 class="picker-h">All {{ powerCards.length }} power cards</h3>
    <div class="grid">
      <div
        v-for="c in powerCards"
        :key="c.id"
        class="pick"
        role="button"
        tabindex="0"
        :aria-pressed="hand.includes(c.id)"
        :aria-label="`${c.name}: ${hand.includes(c.id) ? 'in your hand, press to remove' : 'press to add to your hand'}`"
        @click="toggle(c.id)"
        @keydown.enter.prevent="toggle(c.id)"
        @keydown.space.prevent="toggle(c.id)"
      >
        <PowerCard :card="c" :selected="hand.includes(c.id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab {
  display: grid;
  gap: 28px;
}
.hand-wrap {
  padding: clamp(14px, 3vw, 24px);
  border-radius: 24px;
  background: linear-gradient(160deg, #2f6b3a, #1d4a28);
  border: 3px solid #12301a;
  box-shadow: 8px 8px 0 #12301a;
  color: #fff;
}
.hand-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.count {
  margin: 0;
  font-size: 1.1rem;
}
.count strong {
  font: 400 1.8rem/1 var(--font-display);
}
.link {
  background: none;
  border: 0;
  color: #cfe9d4;
  text-decoration: underline;
  text-underline-offset: 3px;
  font: inherit;
  cursor: pointer;
}
.link.center {
  display: block;
  margin: 10px auto 0;
}
.hand {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 140px), 1fr));
}
.slot {
  position: relative;
  min-height: 200px;
  border-radius: 20px;
}
.slot.empty,
.slot.locked {
  border: 3px dashed rgba(255, 255, 255, 0.45);
  display: grid;
  place-items: center;
  text-align: center;
  padding: 10px;
}
.slot-empty {
  margin: 0;
  color: #dff0e2;
}
.slot-empty span {
  font-size: 0.85rem;
  opacity: 0.8;
}
.slot-btn {
  display: grid;
  gap: 6px;
  justify-items: center;
  width: 100%;
  height: 100%;
  background: none;
  border: 0;
  color: #fff;
  font: inherit;
  cursor: pointer;
}
.slot-btn span:last-child {
  font-size: 0.85rem;
  opacity: 0.85;
}
.lock {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #e2b13a;
  color: #3b2a07;
  font: 400 1.2rem/1 var(--font-display);
}
.x {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #c2473b;
  color: #fff;
  font: 700 1.1rem/1 var(--font-body);
  cursor: pointer;
}
.combos {
  margin-top: 18px;
  display: grid;
  gap: 12px;
}
.combo {
  padding: 14px 16px;
  border-radius: 16px;
  background: #fff3d6;
  color: #5a3a22;
  border: 3px solid #e2b13a;
  animation: pop 0.35s ease;
}
.combo h3 {
  margin: 0 0 0.2em;
  font-size: 1.5rem;
}
.combo p {
  margin: 0;
}
.combo .combo-tag {
  margin: 0 0 2px;
  color: #c2473b;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.no-combo {
  margin: 0;
  padding: 12px 4px;
  color: #dff0e2;
  text-align: center;
}
@keyframes pop {
  from {
    transform: scale(0.96);
  }
}

.picker-h {
  margin: 0;
}
.grid {
  display: grid;
  gap: 22px 18px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
}
.pick {
  border-radius: 20px;
  cursor: pointer;
  outline-offset: 6px;
}
.pick:hover {
  filter: brightness(1.03);
}
@media (prefers-reduced-motion: reduce) {
  .combo {
    animation: none;
  }
}
</style>
