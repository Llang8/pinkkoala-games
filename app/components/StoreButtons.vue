<script setup lang="ts">
import type { Game } from '~/data/games'

defineProps<{ game: Game }>()
</script>

<template>
  <div class="stores">
    <a v-if="game.stores.play" class="btn" :href="game.stores.play" rel="noopener">Get it on Google Play</a>
    <span v-else class="btn" aria-disabled="true">Google Play: coming soon</span>

    <a v-if="game.stores.appStore" class="btn" :href="game.stores.appStore" rel="noopener">Download on the App Store</a>
    <span v-else class="btn" aria-disabled="true">App Store: coming soon</span>
  </div>
</template>

<style scoped>
.stores {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
</style>
