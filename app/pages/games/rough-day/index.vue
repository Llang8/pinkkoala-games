<script setup lang="ts">
import { site } from '~/data/site'
import { games, isLive as gameIsLive } from '~/data/games'

const game = games.find((g) => g.slug === 'rough-day')!
const isLive = gameIsLive(game)
const base = '/games/rough-day'

const title = 'Rough Day: Roguelite Mini Golf'
const description =
  'Share one stroke bank across every hole, buy power-ups that level up, and escape the grumpy Groundskeeper. A roguelite mini golf game for Android and iOS.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${site.url}${base}/og.png`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
useHead({ link: [{ rel: 'canonical', href: `${site.url}${base}/` }] })

const steps = [
  { n: 1, h: 'Pull back, let go', p: 'Slingshot your ball. The camera turns to face your aim, and a longer pull gives you fine control over speed.' },
  { n: 2, h: 'Spend from one bank', p: 'Every putt costs a stroke from a single bank shared by the whole course. A reckless shot now is a stroke you will not have later.' },
  { n: 3, h: 'Lose. Learn. Go again.', p: 'Run out and it is dawn again, same meadow, same mower. Every rough day teaches you something.' },
]

const powerups = [
  ['Chip Shot', 'Lob over water and rails'],
  ['Hop', 'Hop over obstacles'],
  ['Cup Magnet', 'Drag the cup closer'],
  ['Laser Sight', 'Line up the perfect shot'],
  ['Big Cup', 'A hole you cannot miss. Almost.'],
  ['Long Drive', 'Hit harder'],
  ['Double Shot', 'A second hit, mid-flight'],
  ['Fire Boost', 'Set the ball ablaze for a burst of speed'],
  ['Lifebuoy', 'Float over a splash'],
  ['Second Wind', 'Win strokes back after each hole'],
  ['Lucky Clover', 'Hope for the best'],
]

const stages = [
  { name: 'The Meadow', p: 'Sunny, friendly and lulling you into a false sense of security.' },
  { name: 'Amber Orchard', p: 'Autumn leaves, tighter lines, meaner obstacles.' },
  { name: 'Frostbite Peaks', p: 'Icy greens under the northern lights. He swears the ice is natural.' },
  { name: 'Cloudspire Keep', p: 'A castle above the clouds, and the last stand of the lawn.' },
]

const shots = [
  { file: 'ui-course.jpg', alt: 'A course overview in the Meadow with the stroke and coin counters at the top' },
  { file: 'ui-menu.jpg', alt: 'The Rough Day main menu with Continue, New Run, How to Play, Upgrades and Locker' },
  { file: 'ui-shop.jpg', alt: 'The Pro Shop offering Big Cup, Second Wind and Chip Shot power-ups' },
  { file: 'ui-upgrades.jpg', alt: 'The Upgrades screen where silver buys permanent power-ups' },
  { file: 'shot-chip-hop_ramp-jump.jpg', alt: 'A bright meadow hole with a ramp, trees and a pond' },
  { file: 'shot-chip-hop_rock-garden.jpg', alt: 'A meadow hole guarded by a windmill' },
  { file: 'shot-chip-hop_millstone.jpg', alt: 'An autumn orchard hole with amber trees and a pond' },
  { file: 'shot-chip-hop_crevasse-blizzard.jpg', alt: 'An icy green under the northern lights in the Frostbite Peaks' },
  { file: 'shot-chip-hop_cannon-crossing.jpg', alt: 'A winding frozen fairway with a red flag at the end' },
  { file: 'shot-chip-hop_windmill-alley.jpg', alt: 'A meadow fairway with a ball rolling toward the cup' },
]

const hero = { file: 'chip-hop_cannon-crossing.mp4', poster: 'shot-chip-hop_cannon-crossing.jpg' }

const clips = [
  { file: 'chip-hop_ramp-jump.mp4', poster: 'shot-chip-hop_ramp-jump.jpg', label: 'Hop the ramp' },
  { file: 'magnet-effect.mp4', poster: 'shot-chip-hop_windmill-alley.jpg', label: 'Cup Magnet' },
  { file: 'wind-blast_double-hop.mp4', poster: 'shot-wind-blast_double-hop.jpg', label: 'Double hop' },
]
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
          <p class="lead">
            Forty years the old Groundskeeper has kept this meadow perfect, and he is not about to let you scuff it.
            One shared bank of strokes. Waste them and it is dawn again.
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
            aria-label="Gameplay: a chip shot over a gap onto the green"
          >
            <source :src="`${base}/${hero.file}`" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>

    <!-- How it plays -->
    <section class="wrap sec" aria-labelledby="how-h">
      <h2 id="how-h">How it plays</h2>
      <ol class="steps">
        <li v-for="s in steps" :key="s.n">
          <span class="num" aria-hidden="true">{{ s.n }}</span>
          <h3>{{ s.h }}</h3>
          <p>{{ s.p }}</p>
        </li>
      </ol>
    </section>

    <!-- Clips -->
    <section class="wrap sec" aria-labelledby="clips-h">
      <h2 id="clips-h">Shots worth sharing</h2>
      <p class="sec-lead">Chip over water. Hop a ramp. Drag the cup toward you. Nobody said it had to be fair.</p>
      <div class="clips">
        <figure v-for="c in clips" :key="c.file">
          <video
            :poster="`${base}/${c.poster}`"
            autoplay
            muted
            loop
            playsinline
            preload="none"
            :aria-label="c.label"
          >
            <source :src="`${base}/${c.file}`" type="video/mp4" />
          </video>
          <figcaption>{{ c.label }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Power-ups -->
    <section class="wrap sec" aria-labelledby="pu-h">
      <h2 id="pu-h">Power-ups that level up</h2>
      <p class="sec-lead">
        Visit the Pro Shop after holes 3, 6 and 9. Pick up a power-up again and it upgrades, so no two runs build the
        same.
      </p>
      <ul class="pu">
        <li v-for="[name, blurb] in powerups" :key="name">
          <strong>{{ name }}</strong>
          <span>{{ blurb }}</span>
        </li>
      </ul>
      <div class="extras">
        <div>
          <h3>Cannon pads</h3>
          <p>Some gaps are too wide to putt. Roll onto a glowing pad, aim the cannon and fire. The lob is free.</p>
        </div>
        <div>
          <h3>Mulligans</h3>
          <p>Out of strokes on the last shot? Spend a Mulligan to take it back and try again.</p>
        </div>
        <div>
          <h3>Boss gates</h3>
          <p>Every stage ends at a boss gate. Strike every padlock to open it, with bonus strokes waiting beyond.</p>
        </div>
      </div>
    </section>

    <!-- Stages -->
    <section class="wrap sec" aria-labelledby="stages-h">
      <h2 id="stages-h">Four stages, forty holes</h2>
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

    <!-- Meta rows -->
    <section class="wrap sec" aria-labelledby="more-h">
      <h2 id="more-h">Keep and collect</h2>
      <p class="sec-lead">
        Beat bosses and spot rare silver coins to earn silver, then spend it on permanent upgrades from the main menu so
        every new run starts stronger. Spend your coins on ball skins, from polka dots and pinstripes to gold, galaxy and
        ember trails. Skins are yours to keep, whatever happens to the run.
      </p>
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
        Art and sound by <a href="https://kenney.nl" rel="noopener">Kenney</a> (CC0).
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
  margin-bottom: 0.2em;
}
.lead {
  font-size: 1.2rem;
  max-width: 30em;
  color: #e9f3e6;
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
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
  max-width: 40em;
  color: var(--ink-soft);
  font-size: 1.1rem;
}

.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
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

.clips {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
}
.clips figure {
  margin: 0;
}
.clips video {
  width: 100%;
  aspect-ratio: 9 / 16;
  object-fit: cover;
  border-radius: var(--radius);
  background: var(--rd-green-deep);
  box-shadow: var(--shadow);
}
.clips figcaption {
  margin-top: 8px;
  font-weight: 700;
  text-align: center;
}

.pu {
  list-style: none;
  padding: 0;
  margin: 24px 0 32px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
}
.pu li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 16px;
  background: var(--surface);
  border-left: 6px solid var(--rd-flag);
  border-radius: 12px;
  box-shadow: var(--shadow);
}
.pu span {
  color: var(--ink-soft);
  font-size: 0.95rem;
}
.extras {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
}
.extras p {
  color: var(--ink-soft);
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

@media (max-width: 760px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .phone {
    transform: none;
    width: min(70%, 260px);
  }
}
</style>
