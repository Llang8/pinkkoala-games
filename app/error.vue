<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
useHead({ title: 'Lost in the rough | PinkKoala', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <SiteHeader />
  <main id="main" class="wrap">
    <h1>Lost in the rough</h1>
    <p>This page does not exist (or the Groundskeeper mowed it).</p>
    <p><NuxtLink class="btn" to="/" @click="clearError()">Back to the clubhouse</NuxtLink></p>
  </main>
  <SiteFooter />
</template>

<style scoped>
main {
  padding-block: clamp(40px, 10vw, 100px);
}
</style>
