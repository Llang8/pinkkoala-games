// Gameplay clips for the Rough Day page. Each is a real hole-in-one, rendered offline from the game
// build with its trick-shot bot (see the game repo, src/dev/tricks.js). Files live in
// public/games/rough-day/clips/<id>.mp4 with a matching <id>.jpg poster.
export interface Clip {
  id: string
  stage: 1 | 2 | 3 | 4
  /** The power cards that made the shot. */
  combo: string
  hole: string
  /** Optional extra line under the caption. */
  note?: string
}

const GRIND = 'A fully upgraded build'

export const clips: Clip[] = [
  { id: 'frostbite-frozen-hairpin-chip-fire-double', stage: 3, combo: 'Chip Shot + Fire Boost + Double Shot', hole: 'Frozen Hairpin' },
  { id: 'castle-grand-hall-chip-fire-double', stage: 4, combo: 'Chip Shot + Fire Boost + Double Shot', hole: 'Grand Hall', note: GRIND },
  { id: 'orchard-harvest-hill-chip-fire-double', stage: 2, combo: 'Chip Shot + Fire Boost + Double Shot', hole: 'Harvest Hill' },
  { id: 'meadow-first-tee-chip-hop', stage: 1, combo: 'Chip Shot + Hop', hole: 'First Tee' },
  { id: 'frostbite-snowdrift-sweep-fire-double', stage: 3, combo: 'Fire Boost + Double Shot', hole: 'Snowdrift Sweep' },
  { id: 'castle-gatehouse-chip-fire', stage: 4, combo: 'Chip Shot + Fire Boost', hole: 'Gatehouse', note: GRIND },
  { id: 'orchard-scarecrow-leap-fire-double', stage: 2, combo: 'Fire Boost + Double Shot', hole: 'Scarecrow Leap' },
  { id: 'meadow-ramp-jump-fire-double', stage: 1, combo: 'Fire Boost + Double Shot', hole: 'Ramp Jump' },
  { id: 'frostbite-snow-hill-chip-fire', stage: 3, combo: 'Chip Shot + Fire Boost', hole: 'Snow Hill' },
  { id: 'castle-rampart-switchback-chip-hop-hop', stage: 4, combo: 'Chip Shot + Double Hop', hole: 'Rampart Switchback', note: GRIND },
]

export const clipById = (id: string) => clips.find((c) => c.id === id)!
