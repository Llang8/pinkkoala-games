<script setup lang="ts">
import { site } from '~/data/site'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <div class="wrap row">
      <p>&copy; {{ year }} {{ site.name }}</p>
      <nav aria-label="Footer">
        <NuxtLink to="/support/">Support</NuxtLink>
        <NuxtLink to="/privacy/">Privacy</NuxtLink>
        <NuxtLink to="/terms/">Terms</NuxtLink>
        <a :href="`mailto:${site.email}`">{{ site.email }}</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  border-top: 1px solid var(--line);
  padding-block: 28px;
  color: var(--ink-soft);
  font-size: 0.95rem;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  justify-content: space-between;
}
p {
  margin: 0;
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}
a {
  color: var(--ink-soft);
}
</style>
