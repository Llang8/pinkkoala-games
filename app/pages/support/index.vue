<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: `Support | ${site.name}`,
  description: 'Help with PinkKoala games: contact, FAQ and how to ask for your data to be deleted.',
})
</script>

<template>
  <div class="prose">
    <h1>Support</h1>
    <p>
      Something broken, confusing or just rude? Email
      <a :href="`mailto:${site.email}`">{{ site.email }}</a> and tell us the game, your phone model and what happened.
      We read everything.
    </p>

    <h2>Rough Day: quick answers</h2>

    <h3>How do I restart my run?</h3>
    <p>Open the pause menu during a run and choose to give up. You will start again at dawn, same meadow, same mower.</p>

    <h3>How do I turn off sound?</h3>
    <p>Use the sound controls in the game's settings. Music and sound effects can be turned down or off.</p>

    <h3>How do I opt out of analytics?</h3>
    <p>
      The game has a settings toggle for anonymous analytics. Turn it off and the game stops sending gameplay events.
      See the <NuxtLink to="/games/rough-day/privacy/">Rough Day privacy policy</NuxtLink> for what is collected.
    </p>

    <h3>Will I lose my progress if I uninstall?</h3>
    <p>
      Yes. Progress, skins and settings are stored on your device only, so uninstalling the game removes them. There
      are no accounts to restore from.
    </p>

    <h2>Deleting your data</h2>
    <p>
      We do not have accounts or names, so there is very little to delete: your progress lives on your device, and
      anonymous analytics are tied to a random identifier. To ask for analytics data to be deleted, email us from any
      address and include the app version and, if you can find it, the app-instance ID. We will do what we can and
      tell you what we found.
    </p>
  </div>
</template>
