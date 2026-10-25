import { games, gamePath } from '../../app/data/games'
import { site } from '../../app/data/site'

// Prerendered at build time (see nuxt.config.ts). Add a game to games.ts and it appears here.
export default defineEventHandler((event) => {
  const paths = [
    '/',
    '/support/',
    '/privacy/',
    ...(site.privacyIsDraft ? [] : ['/terms/']), // the draft terms page is noindex
    ...games.flatMap((g) => [gamePath(g.slug)]),
  ]
  const urls = paths.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join('\n')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
