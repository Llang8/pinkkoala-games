<script setup lang="ts">
import { gamePath, type Game } from '~/data/games'

defineProps<{ game: Game }>()
</script>

<template>
  <NuxtLink :to="gamePath(game.slug)" class="card" :style="{ '--accent': game.accent }">
    <img :src="game.icon" :alt="`${game.title} icon`" width="96" height="96" class="icon" />
    <div class="body">
      <span class="badge">{{ game.status }}</span>
      <h3>{{ game.title }}</h3>
      <p class="sub">{{ game.subtitle }}</p>
      <p class="tag">{{ game.tagline }}</p>
      <p class="plat">{{ game.platforms.join(' · ') }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 18px;
  background: var(--surface);
  border: 2px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  color: var(--ink);
  text-decoration: none;
  transition: transform 0.12s ease, border-color 0.12s ease;
}
.card:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
}
.icon {
  width: 96px;
  height: 96px;
  border-radius: 22px;
  flex: none;
}
h3 {
  margin: 8px 0 0;
  font-size: 1.7rem;
}
.sub {
  margin: 0;
  color: var(--accent);
  font-weight: 700;
}
.tag {
  margin: 6px 0 4px;
}
.plat {
  margin: 0;
  font-size: 0.9rem;
  color: var(--ink-soft);
}
@media (prefers-color-scheme: dark) {
  .sub {
    color: var(--pink);
  }
}
@media (max-width: 480px) {
  .card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
