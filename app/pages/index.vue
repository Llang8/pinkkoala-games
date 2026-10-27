<script setup lang="ts">
import { site } from '~/data/site'
import { games, gamePath, statusLabel } from '~/data/games'
import { powerCards } from '~/data/cards.generated'

const fan = ['chip-shot', 'piggy-bank', 'second-wind'].map((id) => powerCards.find((c) => c.id === id)!)

useSeoMeta({
  title: `${site.name}: ${site.tagline}`,
  description: site.description,
  ogTitle: site.name,
  ogDescription: site.description,
  ogImage: `${site.url}/og-default.png`,
  twitterCard: 'summary_large_image',
})

const featured = games[0]!
const more = games.slice(1)
const ribbon = ['Small games', 'Big grudges', 'Draft your hand', 'Stack the combos', 'Made with care', 'A little spite', 'Quick to pick up', 'Hard to put down']

const values = [
  {
    h: 'Quick to pick up',
    p: 'One thumb, one idea, one more go. If it needs a tutorial longer than a sentence, we cut it.',
    tone: 'mint',
  },
  {
    h: 'Hard to put down',
    p: 'Short runs with a hook in them. Lose, learn something, and tell yourself it is the last one.',
    tone: 'sun',
  },
  {
    h: 'Occasionally yells at you',
    p: 'Our games have personality, and some of it is grumpy. We like to think it is affectionate.',
    tone: 'sky',
  },
]
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <span class="blob b1" aria-hidden="true" />
      <span class="blob b2" aria-hidden="true" />
      <span class="blob b3" aria-hidden="true" />
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="pill">Indie studio &amp; publisher</p>
          <h1>
            Small games.<br />
            <span class="mark">Big grudges.</span>
          </h1>
          <p class="lead">
            {{ site.name }} makes games that are quick to pick up, hard to put down, and occasionally yell at you.
          </p>
          <div class="cta">
            <NuxtLink class="btn" :to="gamePath(featured.slug)">Meet {{ featured.title }}</NuxtLink>
            <a class="btn ghost" :href="`mailto:${site.email}`">Say hi</a>
          </div>
        </div>
        <div class="hero-art">
          <div class="halo" aria-hidden="true" />
          <img class="mascot" src="/mascot.png" alt="The PinkKoala mascot, a smiling pink koala" width="600" height="600" />
          <p class="sticker">Now making:<br /><strong>{{ featured.title }}</strong></p>
        </div>
      </div>
      <svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 C 240 90, 480 0, 720 40 S 1200 80, 1440 30 L1440 80 L0 80 Z" fill="var(--bg)" />
      </svg>
    </section>

    <!-- Ribbon -->
    <div class="ribbon" aria-hidden="true">
      <div class="track">
        <span v-for="n in 4" :key="n" class="set">
          <span v-for="t in ribbon" :key="t">{{ t }}</span>
        </span>
      </div>
    </div>

    <!-- Featured game -->
    <section class="wrap featured-wrap" aria-labelledby="featured-h">
      <article class="featured">
        <div class="feat-copy">
          <p class="pill dark">{{ statusLabel(featured) }}</p>
          <h2 id="featured-h">{{ featured.title }}</h2>
          <p class="sub">{{ featured.subtitle }} &middot; {{ featured.platforms.join(' + ') }}</p>
          <p>
            Every run is a build. Draft power cards, stack combos and stretch one shared bank of strokes across forty
            holes, all under the glare of a very grumpy Groundskeeper. It always ends. The question is how far you get.
          </p>
          <div class="feat-actions">
            <NuxtLink class="btn red" :to="gamePath(featured.slug)">See the game</NuxtLink>
          </div>
          <StoreButtons :game="featured" class="stores" />
        </div>
        <div class="feat-art">
          <div class="phone">
            <video
              poster="/games/rough-day/shot-chip-hop_ramp-jump.jpg"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
              aria-label="Rough Day gameplay: hopping a ramp onto the green"
            >
              <source src="/games/rough-day/chip-hop_ramp-jump.mp4" type="video/mp4" />
            </video>
          </div>
          <div class="fan" aria-hidden="true">
            <PowerCard v-for="c in fan" :key="c.id" :card="c" compact :tilt="false" />
          </div>
        </div>
      </article>
    </section>

    <!-- What we're about -->
    <section class="wrap values" aria-labelledby="values-h">
      <h2 id="values-h">How we make games</h2>
      <div class="grid">
        <article v-for="v in values" :key="v.h" class="value" :class="v.tone">
          <h3>{{ v.h }}</h3>
          <p>{{ v.p }}</p>
        </article>
      </div>
    </section>

    <!-- More games -->
    <section v-if="more.length" class="wrap more" aria-labelledby="more-h">
      <h2 id="more-h">More games</h2>
      <div class="more-grid">
        <GameCard v-for="g in more" :key="g.slug" :game="g" />
      </div>
    </section>
    <section v-else class="wrap more" aria-labelledby="next-h">
      <div class="next">
        <h2 id="next-h">The next one is in the shed</h2>
        <p>More PinkKoala games are on the way. Say hi if you want to hear about them first.</p>
      </div>
    </section>

    <!-- Contact -->
    <section class="contact" aria-labelledby="hi-h">
      <div class="wrap contact-in">
        <div>
          <h2 id="hi-h">Say hi</h2>
          <p>
            Press, feedback, bug reports or a nice note. Need help with a game? Head to
            <NuxtLink to="/support/">support</NuxtLink>.
          </p>
        </div>
        <a class="btn" :href="`mailto:${site.email}`">{{ site.email }}</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  --hero-a: #ffd6e7;
  --hero-b: #ffa6cb;
  --blob: rgba(255, 255, 255, 0.55);
  --mint: #bff0d4;
  --sun: #ffe49a;
  --sky: #cfe6ff;
  --card-ink: #3b1f33;
  --edge: #3b1f33;
  overflow-x: clip;
}
@media (prefers-color-scheme: dark) {
  .home {
    --hero-a: #46193f;
    --hero-b: #24112a;
    --blob: rgba(255, 127, 178, 0.22);
    --mint: #2f6b4d;
    --sun: #7d5f1d;
    --sky: #2d4f7a;
    --card-ink: #fdeef2;
    --edge: #ff7fb2;
  }
}

/* ---------- Hero ---------- */
.hero {
  position: relative;
  background: linear-gradient(165deg, var(--hero-a), var(--hero-b));
  padding-block: clamp(36px, 7vw, 80px) clamp(72px, 10vw, 120px);
  overflow: hidden;
}
.blob {
  position: absolute;
  border-radius: 50%;
  background: var(--blob);
  pointer-events: none;
}
.b1 {
  width: 380px;
  height: 380px;
  top: -140px;
  left: -100px;
}
.b2 {
  width: 220px;
  height: 220px;
  bottom: 40px;
  left: 38%;
}
.b3 {
  width: 520px;
  height: 520px;
  right: -180px;
  top: -80px;
}
.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: center;
}
.pill {
  display: inline-block;
  margin: 0 0 18px;
  padding: 0.3em 0.9em;
  border-radius: 999px;
  background: var(--surface);
  border: 2px solid var(--edge);
  color: var(--ink);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
h1 {
  font-size: clamp(3rem, 10vw, 6rem);
  margin-bottom: 0.25em;
}
.mark {
  position: relative;
  display: inline-block;
  color: var(--pink-deep);
  z-index: 0;
}
.mark::after {
  content: '';
  position: absolute;
  left: -2%;
  right: -2%;
  bottom: 0.05em;
  height: 0.28em;
  background: #ffe49a;
  border-radius: 999px;
  z-index: -1;
  transform: rotate(-1.5deg);
}
@media (prefers-color-scheme: dark) {
  .mark {
    color: #ff9cc4;
  }
  .mark::after {
    background: #7d3f6c;
  }
}
.lead {
  max-width: 28em;
  font-size: 1.25rem;
  color: var(--ink);
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 26px;
}
.btn.ghost {
  background: transparent;
  color: var(--ink);
  box-shadow: none;
  border: 2px solid var(--ink);
}
.btn.ghost:hover {
  background: var(--surface);
  transform: none;
}

.hero-art {
  position: relative;
  display: grid;
  place-items: center;
}
.halo {
  position: absolute;
  inset: 8% 6%;
  border-radius: 50%;
  background: var(--blob);
  border: 3px dashed var(--edge);
  opacity: 0.55;
  animation: spin 40s linear infinite;
}
.mascot {
  position: relative;
  width: min(100%, 440px);
  height: auto;
  filter: drop-shadow(0 18px 22px rgba(59, 31, 51, 0.25));
  animation: bob 4.5s ease-in-out infinite;
}
.sticker {
  position: absolute;
  right: 2%;
  bottom: 6%;
  margin: 0;
  padding: 10px 16px;
  background: #ffe49a;
  color: #3b1f33;
  border: 3px solid #3b1f33;
  border-radius: 14px;
  box-shadow: 4px 4px 0 #3b1f33;
  font-size: 0.85rem;
  line-height: 1.25;
  transform: rotate(5deg);
}
.sticker strong {
  font: 400 1.35rem/1.1 var(--font-display);
}
.wave {
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: clamp(36px, 6vw, 80px);
}

@keyframes bob {
  50% {
    transform: translateY(-12px) rotate(1.5deg);
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ---------- Ribbon ---------- */
.ribbon {
  background: #3b1f33;
  color: #ffd6e7;
  transform: rotate(-1.2deg);
  margin: -8px -20px 0;
  padding-block: 12px;
  overflow: hidden;
  font: 400 1.35rem/1 var(--font-display);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 6px 0 var(--pink);
}
.track {
  display: inline-flex;
  animation: slide 40s linear infinite;
}
.set {
  display: inline-flex;
}
.set span {
  padding-inline: 18px;
}
.set span::after {
  content: '\2022';
  margin-left: 36px;
  color: var(--pink);
}
@keyframes slide {
  to {
    transform: translateX(-25%);
  }
}

/* ---------- Featured ---------- */
.featured-wrap {
  padding-block: clamp(48px, 8vw, 88px) 24px;
}
.featured {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: center;
  padding: clamp(24px, 5vw, 48px);
  border-radius: 28px;
  background: linear-gradient(150deg, #2f6b3a, #1d4a28);
  color: #fff;
  border: 3px solid #12301a;
  box-shadow: 8px 8px 0 #12301a;
  overflow: hidden;
}
.featured h2 {
  font-size: clamp(2.6rem, 8vw, 4.4rem);
  margin-bottom: 0.1em;
}
.sub {
  color: #ffd9d9;
  font-weight: 700;
}
.featured p {
  max-width: 32em;
  color: #e9f3e6;
}
.featured .sub {
  color: #ffd9d9;
}
.pill.dark {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
}
.feat-actions {
  margin-bottom: 16px;
}
.btn.red {
  background: #e23d3d;
  color: #fff;
  box-shadow: 0 4px 0 #a52a2a;
}
.stores :deep(.btn) {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  box-shadow: none;
  font-size: 1rem;
}
.feat-art {
  position: relative;
  display: grid;
  place-items: center;
}
.phone {
  width: min(100%, 250px);
  aspect-ratio: 9 / 16;
  border-radius: 32px;
  border: 8px solid #0c1f0f;
  background: #0c1f0f;
  overflow: hidden;
  transform: rotate(4deg);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.45);
}
.phone video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fan {
  position: absolute;
  left: -2%;
  bottom: 2%;
  display: flex;
  width: 64%;
}
.fan > * {
  flex: none;
  width: 52%;
}
.fan > :nth-child(1) {
  transform: rotate(-12deg) translateY(10px);
  z-index: 1;
}
.fan > :nth-child(2) {
  margin-left: -16%;
  transform: rotate(-1deg);
  z-index: 2;
}
.fan > :nth-child(3) {
  margin-left: -16%;
  transform: rotate(11deg) translateY(10px);
  z-index: 3;
}

/* ---------- Values ---------- */
.values {
  padding-block: clamp(48px, 8vw, 88px) 24px;
}
.values .grid {
  display: grid;
  gap: 22px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
}
.value {
  padding: 24px;
  border-radius: 22px;
  border: 3px solid var(--edge);
  box-shadow: 6px 6px 0 var(--edge);
  color: var(--card-ink);
  transition: transform 0.15s ease;
}
.value:nth-child(1) {
  transform: rotate(-1.2deg);
}
.value:nth-child(3) {
  transform: rotate(1.2deg);
}
.value:hover {
  transform: rotate(0) translateY(-4px);
}
.value.mint {
  background: var(--mint);
}
.value.sun {
  background: var(--sun);
}
.value.sky {
  background: var(--sky);
}
.value p {
  margin: 0;
}

/* ---------- More ---------- */
.more {
  padding-block: clamp(32px, 6vw, 64px) 24px;
}
.more-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
}
.next {
  padding: 28px;
  border: 3px dashed var(--edge);
  border-radius: 22px;
  text-align: center;
}
.next h2 {
  font-size: clamp(1.6rem, 5vw, 2.2rem);
}
.next p {
  margin: 0;
  color: var(--ink-soft);
}

/* ---------- Contact ---------- */
.contact {
  margin-top: clamp(32px, 6vw, 64px);
  background: var(--pink);
  color: var(--on-pink);
  padding-block: clamp(36px, 6vw, 64px);
}
.contact-in {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px 32px;
}
.contact h2 {
  margin-bottom: 0.2em;
}
.contact p {
  margin: 0;
  max-width: 32em;
}
.contact a:not(.btn) {
  color: var(--on-pink);
}
.contact .btn {
  background: var(--on-pink);
  color: var(--pink);
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.25);
}

/* ---------- Responsive and motion ---------- */
@media (max-width: 820px) {
  .hero-grid,
  .featured {
    grid-template-columns: 1fr;
  }
  .hero-art {
    order: -1;
    max-width: 340px;
    margin-inline: auto;
  }
  .feat-art {
    margin-top: 12px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .mascot,
  .halo,
  .track {
    animation: none;
  }
}
</style>
