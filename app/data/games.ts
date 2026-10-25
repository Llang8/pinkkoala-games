export interface Game {
  slug: string
  title: string
  subtitle: string
  tagline: string
  status: 'coming soon' | 'live'
  platforms: string[]
  // PLACEHOLDER: swap for the real listing once Rough Day is on Google Play.
  storeUrl: string
  icon: string
  accent: string
}

// One entry per game. The home page cards are built from this list; each game
// has its own hand-built page under app/pages/games/<slug>/.
export const games: Game[] = [
  {
    slug: 'rough-day',
    title: 'Rough Day',
    subtitle: 'Roguelite Mini Golf',
    tagline: 'One stroke bank. Forty holes. One very grumpy Groundskeeper.',
    status: 'coming soon',
    platforms: ['Android'],
    storeUrl: 'https://play.google.com/store/apps/details?id=com.lucas.roughday',
    icon: '/games/rough-day/icon.png',
    accent: '#2f6b3a',
  },
]

export const gamePath = (slug: string) => `/games/${slug}/`
