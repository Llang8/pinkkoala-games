export interface Game {
  slug: string
  title: string
  subtitle: string
  tagline: string
  platforms: string[]
  // Store links. null means "not live yet": the page shows a disabled "coming soon" button.
  stores: { play: string | null; appStore: string | null }
  icon: string
  accent: string
}

// One entry per game. The home page and sitemap are built from this list; each game
// has its own hand-built page under app/pages/games/<slug>/.
export const games: Game[] = [
  {
    slug: 'rough-day',
    title: 'Rough Day',
    subtitle: 'Roguelite Mini Golf',
    tagline: 'Draft power cards. Stack combos. Outlast the Groundskeeper.',
    platforms: ['Android', 'iOS'],
    // PLACEHOLDER: paste the real listing URLs when each store goes live.
    // Play listing will be https://play.google.com/store/apps/details?id=com.lucas.roughday
    stores: { play: null, appStore: null },
    icon: '/games/rough-day/icon.png',
    accent: '#2f6b3a',
  },
]

export const gamePath = (slug: string) => `/games/${slug}/`
export const isLive = (g: Game) => !!(g.stores.play || g.stores.appStore)
export const statusLabel = (g: Game) => (isLive(g) ? 'out now' : 'coming soon')
