<script setup lang="ts">
import { site } from '~/data/site'
import { games, isLive as gameIsLive } from '~/data/games'
import { clips } from '~/data/clips'

const game = games.find((g) => g.slug === 'rough-day')!
const isLive = gameIsLive(game)
const base = '/games/rough-day'

const title = 'Rough Day: Roguelite Mini Golf'
const description =
  'Draft power cards, stack combos and spend one shared bank of strokes across forty holes. A roguelite mini golf game where every run is a build, for Android and iOS.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${site.url}${base}/og.jpg`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
useHead({ link: [{ rel: 'canonical', href: `${site.url}${base}/` }] })

const steps = [
  { n: 1, h: 'Pull back, let go', p: 'Slingshot your ball. The camera turns to face your aim, and a longer pull gives you fine control over speed.' },
  { n: 2, h: 'Spend from one bank', p: 'Every putt costs a stroke from a single bank shared by the whole course. A reckless shot now is a stroke you will not have later.' },
  { n: 3, h: 'Draft your hand', p: 'Visit the Pro Shop after holes 3, 6 and 9, or grab a free pick. Your hand holds three cards, so every new one means leaving another behind.' },
  { n: 4, h: 'Beat the boss', p: 'Every stage ends at a boss gate. Strike every padlock to get through, then do it all again, a little harder.' },
]

const between = [
  { h: 'Silver', p: 'Beat bosses and spot rare silver coins. Silver is permanent, even when the run is not.', tone: 'sky' },
  { h: 'Upgrades', p: 'Spend silver to start every run with a card, and buy it again to level it up. You can only equip three, so you are choosing a build before the run begins.', tone: 'sun' },
  { h: 'Extra Slot', p: 'A rare, very expensive upgrade that lets you carry a fourth card. Fit that in your build.', tone: 'mint' },
  { h: 'Easy, Normal or Hard', p: 'Pick before every run. Harder runs start with fewer strokes and pay much more silver.', tone: 'pink' },
  { h: 'The Locker', p: 'Ball skins, hats and trails to spend your coins on. Yours to keep, whatever happens to the run.', tone: 'mint' },
]

const stages = [
  { name: 'The Meadow', p: 'Sunny, friendly and lulling you into a false sense of security.' },
  { name: 'Amber Orchard', p: 'Autumn leaves, tighter lines, meaner obstacles.' },
  { name: 'Frostbite Peaks', p: 'Icy greens under the northern lights. He swears the ice is natural.' },
  { name: 'Cloudspire Keep', p: 'A castle above the clouds, and the last stand of the lawn.' },
]

const shots = [
  { file: 'ui-run.jpg', alt: 'A meadow hole with stroke and coin counters, and two power card buttons in the corner' },
  { file: 'ui-pick.jpg', alt: 'The free pick: choose one of three power cards, with Upgrade tags on cards you already own' },
  { file: 'ui-shop.jpg', alt: 'The Pro Shop showing power cards with prices, and how many of your power-up slots are in use' },
  { file: 'ui-difficulty.jpg', alt: 'Choosing Easy, Normal or Hard before a run' },
  { file: 'ui-menu.jpg', alt: 'The Rough Day main menu with the grumpy Groundskeeper looming behind it' },
  { file: 'clips/meadow-ramp-jump-fire-double.jpg', alt: 'A fire-boosted ball streaking past a ramp in the sunny Meadow' },
  { file: 'clips/orchard-harvest-hill-chip-fire-double.jpg', alt: 'A flaming ball chipping over a hill in the Amber Orchard' },
  { file: 'clips/frostbite-frozen-hairpin-chip-fire-double.jpg', alt: 'A flaming ball on an icy fairway under the northern lights in Frostbite Peaks' },
  { file: 'clips/castle-grand-hall-chip-fire-double.jpg', alt: 'A fire trail across the long fairway of the Cloudspire Keep castle' },
]

const hero = {
  file: 'clips/frostbite-frozen-hairpin-chip-fire-double.mp4',
  poster: 'clips/frostbite-frozen-hairpin-chip-fire-double.jpg',
}

// A visual for the Overtime section: stages get longer while the bank gets smaller.
const overtime = [5, 4.3, 3.6, 3, 2.4, 1.9, 1.4, 1]
</script>

<template>
  <div class="rd">
    <!-- Hero -->
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <img :src="`${base}/icon.png`" alt="" width="96" height="96" class="app-icon" />
          <p class="kicker">{{ game.subtitle }}</p>
          <h1>Rough Day</h1>
          <p class="strap">Every run is a build.</p>
          <p class="lead">
            Draft power cards, stack combos and spend one shared bank of strokes across forty holes. Forty years the old
            Groundskeeper has kept this meadow perfect, and he is not about to let you scuff it.
          </p>
          <div class="cta">
            <StoreButtons :game="game" />
          </div>
        </div>
        <div class="phone">
          <video
            class="phone-video"
            :poster="`${base}/${hero.poster}`"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            aria-label="Gameplay: a chip, fire boost and double shot combo sinking a hole-in-one in Frostbite Peaks"
          >
            <source :src="`${base}/${hero.file}`" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>

    <!-- How a run works -->
    <section class="wrap sec" aria-labelledby="how-h">
      <h2 id="how-h">How a run works</h2>
      <ol class="steps">
        <li v-for="s in steps" :key="s.n">
          <span class="num" aria-hidden="true">{{ s.n }}</span>
          <h3>{{ s.h }}</h3>
          <p>{{ s.p }}</p>
        </li>
      </ol>
      <p class="sec-lead tail">Run out of strokes and it is dawn again, same meadow, same mower. Lose. Learn. Go again.</p>
    </section>

    <!-- Build lab -->
    <section class="wrap sec" aria-labelledby="build-h">
      <h2 id="build-h">Three slots. Thirteen cards. One build.</h2>
      <p class="sec-lead">
        You can only carry three power cards at a time. Every card you take means leaving another behind, so the question
        is never what is strong. It is what works together. Cards level up when you find them again, cheap and modest at
        first, and ridiculous at the top. Build a hand and see what clicks.
      </p>
      <BuildLab />
    </section>

    <!-- Clips -->
    <section class="wrap sec" aria-labelledby="clips-h">
      <h2 id="clips-h">The payoff</h2>
      <p class="sec-lead">
        Every one of these is a hole-in-one that only works because of the cards in the hand. Light the fuse, chip it
        over the water, then hit it again in mid-air. The castle ones need a fully upgraded build, so they take a lot of
        losing to earn.
      </p>
      <ClipReel :clips="clips" />
    </section>

    <!-- Overtime -->
    <section class="overtime" aria-labelledby="ot-h">
      <div class="wrap ot-grid">
        <div>
          <p class="ot-kicker">After the castle</p>
          <h2 id="ot-h">It always ends.</h2>
          <p>
            Clear the final boss and the course does not stop. Overtime begins: ten more holes and another boss, again and
            again, with holes that keep getting longer and a stroke bank that keeps getting smaller.
          </p>
          <p>
            Even a perfect build runs dry eventually. The only question is how far yours carries you. Your furthest stage
            and most holes are saved, so there is always a number to beat.
          </p>
        </div>
        <div class="chart" role="img" aria-label="A chart of Overtime stages: each stage has less room for strokes than the last">
          <p class="chart-title">Strokes you can spare</p>
          <div class="bars">
            <div v-for="(h, i) in overtime" :key="i" class="bar-col">
              <span class="bar" :style="{ height: `${h * 18}%` }" />
              <span class="bar-n">{{ i + 1 }}</span>
            </div>
          </div>
          <p class="chart-foot">Overtime stage</p>
        </div>
      </div>
    </section>

    <!-- Between runs -->
    <section class="wrap sec" aria-labelledby="between-h">
      <h2 id="between-h">Every loss pays something</h2>
      <div class="between-grid">
        <div class="between-list">
          <article v-for="b in between" :key="b.h" class="b-card" :class="b.tone">
            <h3>{{ b.h }}</h3>
            <p>{{ b.p }}</p>
          </article>
        </div>
        <img
          class="between-shot"
          :src="`${base}/ui-difficulty.jpg`"
          alt="Choosing Easy, Normal or Hard before a run"
          width="300"
          height="649"
          loading="lazy"
        />
      </div>
    </section>

    <!-- Stages -->
    <section class="wrap sec" aria-labelledby="stages-h">
      <h2 id="stages-h">Four stages, forty holes</h2>
      <p class="sec-lead">
        Every course is built from hand-made set pieces, so no two runs play the same: moving ferries, aimed ballistas,
        frozen lakes that crack under a stopped ball, pipes, crumbling footing and more.
      </p>
      <div class="stages">
        <article v-for="(s, i) in stages" :key="s.name">
          <span class="stage-n">Stage {{ i + 1 }}</span>
          <h3>{{ s.name }}</h3>
          <p>{{ s.p }}</p>
        </article>
      </div>
    </section>

    <!-- Bosses -->
    <section class="wrap sec" aria-labelledby="bosses-h">
      <h2 id="bosses-h">Meet the bosses</h2>
      <p class="sec-lead">
        Every stage ends at a boss gate, and every gate has someone guarding it. Strike every padlock to get past.
      </p>
      <BossStage />
    </section>

    <!-- Screenshots -->
    <section class="sec" aria-labelledby="shots-h">
      <div class="wrap"><h2 id="shots-h">Screenshots</h2></div>
      <ul class="shots" tabindex="0" aria-label="Screenshot gallery, scroll sideways">
        <li v-for="s in shots" :key="s.file">
          <img :src="`${base}/${s.file}`" :alt="s.alt" width="270" height="480" loading="lazy" />
        </li>
      </ul>
    </section>

    <section class="closer">
      <div class="wrap">
        <h2>Can you break the loop?</h2>
        <p>
          <span v-if="isLive">Rough Day is out now.</span>
          <span v-else>Rough Day is coming to Android and iOS. Questions or press? <a :href="`mailto:${site.email}`">{{ site.email }}</a></span>
        </p>
        <div class="closer-stores"><StoreButtons :game="game" /></div>
      </div>
    </section>

    <section class="wrap credits">
      <p>
        <NuxtLink :to="`${base}/privacy/`">Privacy policy</NuxtLink> ·
        <NuxtLink to="/terms/">Terms of Service</NuxtLink> ·
        <NuxtLink to="/support/">Support</NuxtLink> · A game by <NuxtLink to="/">{{ site.name }}</NuxtLink>
      </p>
    </section>
  </div>
</template>

<style scoped>
/* Rough Day palette: meadow green, flag red, ink brown (matches the game). */
.rd {
  --rd-green: #2f6b3a;
  --rd-green-deep: #214d2a;
  --rd-flag: #e23d3d;
  --rd-ink: #5a3a22;
  --rd-cream: #f6f1de;
}

.hero {
  background: linear-gradient(160deg, var(--rd-green) 0%, var(--rd-green-deep) 100%);
  color: #fff;
  padding-block: clamp(32px, 7vw, 72px);
  overflow: hidden;
}
.hero-grid {
  display: grid;
  gap: 32px;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
}
.app-icon {
  border-radius: 22px;
  margin-bottom: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
}
.kicker {
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  font-size: 0.9rem;
  color: #ffd9d9;
}
.hero h1 {
  font-size: clamp(3.4rem, 12vw, 6.5rem);
  margin-bottom: 0.1em;
}
.strap {
  margin: 0 0 14px;
  font: 400 clamp(1.5rem, 4vw, 2.1rem) / 1.1 var(--font-display);
  color: #ffe49a;
}
.lead {
  font-size: 1.2rem;
  max-width: 30em;
  color: #e9f3e6;
}
.cta {
  margin-top: 24px;
}
.hero :deep(.btn) {
  background: var(--rd-flag);
  color: #fff;
  box-shadow: 0 4px 0 #a52a2a;
}
.hero :deep(.btn[aria-disabled='true']) {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  box-shadow: none;
}

.phone {
  justify-self: center;
  width: min(100%, 300px);
  aspect-ratio: 9 / 16;
  border-radius: 34px;
  border: 8px solid #10240f;
  background: #10240f;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  transform: rotate(2.5deg);
}
.phone-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sec {
  padding-block: clamp(32px, 6vw, 56px);
}
.sec-lead {
  max-width: 42em;
  color: var(--ink-soft);
  font-size: 1.1rem;
}
.sec-lead.tail {
  margin: 18px 0 0;
}

.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
}
.steps li {
  background: var(--surface);
  border: 2px solid var(--line);
  border-radius: var(--radius);
  padding: 20px;
}
.num {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--rd-green);
  color: #fff;
  font: 400 1.3rem/1 var(--font-display);
  margin-bottom: 12px;
}
.steps p {
  margin: 0;
  color: var(--ink-soft);
}

/* ---------- Overtime ---------- */
.overtime {
  margin-block: clamp(24px, 5vw, 48px);
  background: #1b1428;
  color: #f3eaff;
  padding-block: clamp(40px, 7vw, 80px);
}
.ot-grid {
  display: grid;
  gap: 36px;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
}
.ot-kicker {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
  font-size: 0.85rem;
  color: #ffb3d1;
}
.overtime h2 {
  font-size: clamp(2.6rem, 8vw, 4.6rem);
  color: #fff;
}
.overtime p {
  max-width: 34em;
  color: #d9ccee;
}
.chart {
  padding: 20px;
  border: 3px solid #ff7fb2;
  border-radius: 22px;
  background: #261b38;
  box-shadow: 6px 6px 0 #ff7fb2;
}
.chart-title,
.chart-foot {
  margin: 0;
  text-align: center;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffb3d1 !important;
}
.bars {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 180px;
  margin: 14px 0 8px;
}
.bar-col {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
}
.bar {
  width: 100%;
  border-radius: 8px 8px 2px 2px;
  background: linear-gradient(180deg, #ff9cc4, #d6377a);
}
.bar-n {
  font: 400 0.95rem/1 var(--font-display);
  color: #d9ccee;
}

/* ---------- Between runs ---------- */
.between-grid {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr auto;
  align-items: start;
}
.between-list {
  display: grid;
  gap: 14px;
}
.b-card {
  padding: 16px 20px;
  border-radius: 18px;
  border: 3px solid #3b1f33;
  box-shadow: 5px 5px 0 #3b1f33;
  color: #3b1f33;
}
.b-card h3 {
  margin: 0 0 0.2em;
}
.b-card p {
  margin: 0;
}
.b-card.sky {
  background: #cfe6ff;
}
.b-card.sun {
  background: #ffe49a;
}
.b-card.mint {
  background: #bff0d4;
}
.b-card.pink {
  background: #ffc4dc;
}
.between-shot {
  width: min(300px, 38vw);
  height: auto;
  border-radius: 28px;
  border: 6px solid #10240f;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.35);
  transform: rotate(2deg);
}
@media (prefers-color-scheme: dark) {
  .b-card {
    border-color: #ff7fb2;
    box-shadow: 5px 5px 0 #ff7fb2;
  }
}

.stages {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
}
.stages article {
  padding: 18px;
  border-radius: var(--radius);
  background: var(--rd-cream);
  color: var(--rd-ink);
}
.stages p {
  margin: 0;
}
.stage-n {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--rd-green);
}

.shots {
  list-style: none;
  margin: 0;
  padding: 4px 16px 20px;
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
}
.shots li {
  flex: none;
  scroll-snap-align: center;
}
.shots img {
  height: min(480px, 70vh);
  width: auto;
  aspect-ratio: 9 / 16;
  object-fit: cover;
  border-radius: 22px;
  box-shadow: var(--shadow);
}

.closer-stores {
  display: flex;
  justify-content: center;
}

.closer {
  background: var(--rd-green);
  color: #fff;
  text-align: center;
  padding-block: clamp(40px, 8vw, 72px);
}
.closer :deep(.btn) {
  background: var(--rd-flag);
  color: #fff;
  box-shadow: 0 4px 0 #a52a2a;
}
.closer :deep(.btn[aria-disabled='true']) {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: none;
}

.credits {
  padding-block: 28px;
  color: var(--ink-soft);
  font-size: 0.95rem;
}

@media (max-width: 820px) {
  .hero-grid,
  .ot-grid,
  .between-grid {
    grid-template-columns: 1fr;
  }
  .phone {
    transform: none;
    width: min(70%, 260px);
  }
  .between-shot {
    width: min(70%, 280px);
    justify-self: center;
    transform: none;
  }
}
</style>
