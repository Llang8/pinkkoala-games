<script setup lang="ts">
import { site } from '~/data/site'
import { games, gamePath } from '~/data/games'

useSeoMeta({
  title: `Privacy | ${site.name}`,
  description: 'How PinkKoala handles data: this website and each of our games.',
})
</script>

<template>
  <div class="prose">
    <h1>Privacy</h1>
    <p class="meta">Last updated {{ site.privacyUpdated }}</p>

    <h2>This website</h2>
    <p>
      This website has no cookies, no analytics, no tracking scripts and no third-party fonts or embeds. Our hosting
      provider (Netlify) keeps standard server logs, such as IP addresses, for security and operations.
    </p>

    <h2>Our games</h2>
    <p>Each game has its own privacy policy, because each game handles data differently.</p>
    <ul>
      <li v-for="g in games" :key="g.slug">
        <NuxtLink :to="`${gamePath(g.slug)}privacy/`">{{ g.title }} privacy policy</NuxtLink>
      </li>
    </ul>

    <h2>Contact</h2>
    <p>
      Questions or requests about your data: <a :href="`mailto:${site.email}`">{{ site.email }}</a>.
    </p>
  </div>
</template>
