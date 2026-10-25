<script setup lang="ts">
import { site } from '~/data/site'
import { games } from '~/data/games'

useSeoMeta({
  title: `${site.name}: ${site.tagline}`,
  description: site.description,
  ogTitle: site.name,
  ogDescription: site.description,
  ogImage: `${site.url}/og-default.png`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <section class="hero wrap">
    <div>
      <h1>Small games.<br /><span>Big grudges.</span></h1>
      <p class="lead">
        {{ site.name }} is a tiny independent studio and publisher. We make games that are quick to pick up, hard to put
        down, and occasionally yell at you.
      </p>
    </div>
    <img class="mascot" src="/mascot.png" alt="The PinkKoala mascot, a smiling pink koala" width="260" height="260" />
  </section>

  <section class="wrap games" aria-labelledby="games-h">
    <h2 id="games-h">Our games</h2>
    <div class="grid">
      <GameCard v-for="g in games" :key="g.slug" :game="g" />
    </div>
  </section>

  <section class="wrap contact" aria-labelledby="hi-h">
    <h2 id="hi-h">Say hi</h2>
    <p>
      Press, feedback, bug reports or just a nice note:
      <a :href="`mailto:${site.email}`">{{ site.email }}</a>. Need help with a game? Head to
      <NuxtLink to="/support/">support</NuxtLink>.
    </p>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(32px, 8vw, 88px) 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.mascot {
  width: min(260px, 60%);
  height: auto;
  border-radius: 32px;
  box-shadow: var(--shadow);
}
.hero h1 span {
  color: var(--pink-deep);
}
.lead {
  max-width: 34em;
  font-size: 1.25rem;
  color: var(--ink-soft);
}
.games {
  padding-block: 24px 40px;
}
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
}
.contact {
  padding-block: 24px 72px;
}
</style>
