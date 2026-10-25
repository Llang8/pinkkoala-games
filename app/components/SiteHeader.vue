<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <header class="head">
    <a class="skip" href="#main">Skip to content</a>
    <div class="wrap bar">
      <NuxtLink to="/" class="brand" aria-label="PinkKoala home">
        <img class="logo" src="/mascot.png" alt="" width="40" height="40" />
        <span>{{ site.name }}</span>
      </NuxtLink>
      <nav aria-label="Main">
        <NuxtLink to="/games/rough-day/">Rough Day</NuxtLink>
        <NuxtLink to="/support/">Support</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.head {
  padding-block: 14px;
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font: 400 1.6rem/1 var(--font-display);
  color: var(--ink);
  text-decoration: none;
}
.logo {
  width: 40px;
  height: 40px;
}
nav {
  display: flex;
  gap: 18px;
}
nav a {
  white-space: nowrap;
  color: var(--ink);
  text-decoration: none;
  font-weight: 600;
}
nav a:hover,
nav a.router-link-active {
  color: var(--pink-deep);
}
.skip {
  position: absolute;
  left: -999px;
}
.skip:focus {
  left: 16px;
  top: 8px;
  background: var(--surface);
  padding: 8px 12px;
  border-radius: 8px;
  z-index: 10;
}
</style>
