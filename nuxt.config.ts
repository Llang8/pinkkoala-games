import { site } from './app/data/site'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  telemetry: false,

  css: ['@fontsource/lilita-one/400.css', '~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ff6fa8' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  // Tiny static site: inline the data instead of writing a payload file per page.
  experimental: { payloadExtraction: false },

  runtimeConfig: {
    public: { siteUrl: site.url },
  },

  // Fully static: `npm run generate` writes .output/public for Netlify.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml'],
    },
  },
})
