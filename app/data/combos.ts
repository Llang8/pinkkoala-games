// Pairs of power cards that work well together in Rough Day. Hand-written from how the cards
// behave in the game (see powerups.js in the game repo). `ids` are power-up ids.
export interface Combo {
  ids: [string, string]
  name: string
  text: string
}

export const combos: Combo[] = [
  {
    ids: ['piggy-bank', 'lucky-clover'],
    name: 'Coin engine',
    text: 'Clover pays extra coins every hole. Piggy Bank turns the coins you hold into strokes. The richer you get, the longer you last.',
  },
  {
    ids: ['piggy-bank', 'second-wind'],
    name: 'Slow burn',
    text: 'Two ways to bank strokes after every hole, and they stack. Slow, steady, and hard to kill.',
  },
  {
    ids: ['second-wind', 'lifebuoy'],
    name: 'Stroke saver',
    text: 'Water costs nothing and every hole pays strokes back. Mistakes get cheap.',
  },
  {
    ids: ['chip-shot', 'fire-boost'],
    name: 'Over and gone',
    text: 'Lob it over the water, then light the fuse. Chip for the carry, Fire for the roll-out.',
  },
  {
    ids: ['double-shot', 'hop'],
    name: 'Two free moves',
    text: 'Hop the rail, then nudge the ball with a free second hit while it is still rolling.',
  },
  {
    ids: ['air-brake', 'fire-boost'],
    name: 'Gas and brake',
    text: 'A burst of speed, then slam on the brakes right at the edge. Fast and precise.',
  },
  {
    ids: ['magnet', 'big-cup'],
    name: 'Cannot miss',
    text: 'A wider cup that also pulls. Near misses start dropping in.',
  },
  {
    ids: ['laser-sight', 'long-drive'],
    name: 'Sniper',
    text: 'See the whole line, then hit it harder than the gauge usually allows.',
  },
  {
    ids: ['ace-hunter', 'double-shot'],
    name: 'Free steering',
    text: 'Double Shot hits cost no stroke, so you can nudge the ball home mid-roll and it still counts as a hole in one. Ace Hunter pays the stroke back.',
  },
  {
    ids: ['ace-hunter', 'chip-shot'],
    name: 'Over and in',
    text: 'Chip straight over the rails and aim at the cup. Land it in one and the putt is free.',
  },
  {
    ids: ['ace-hunter', 'big-cup'],
    name: 'Ace farm',
    text: 'A wider cup makes aces easier to land, and Ace Hunter pays you back for every one.',
  },
  {
    ids: ['air-brake', 'big-cup'],
    name: 'Soft landing',
    text: 'Ease off the speed near the cup and give the ball a bigger target to drop into.',
  },
]

export const comboFor = (hand: string[]) =>
  combos.filter((c) => c.ids.every((id) => hand.includes(id)))
