# PinkKoala

Studio and publisher site for **PinkKoala** (https://pinkkoala.games, domain registered at Porkbun). Home of **Rough Day** (Roguelite Mini Golf) and future games.

Nuxt 4, fully static, hosted on Netlify. No cookies, no analytics, no third-party scripts or fonts.

## Run it

Needs Node `^22.21`, `^24.11` or newer (Nuxt 4.6 uses `path.matchesGlob`; older 22.x fails to start).

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static site into .output/public
```

## Where things live

| What | Where |
| --- | --- |
| Studio name, email, privacy date | `app/data/site.ts` |
| Games list (home cards, sitemap) | `app/data/games.ts` |
| Studio home | `app/pages/index.vue` |
| Rough Day page | `app/pages/games/rough-day/index.vue` |
| Rough Day privacy policy (draft) | `app/pages/games/rough-day/privacy.vue` |
| Rough Day media (clips, screenshots, icon, OG image) | `public/games/rough-day/` |
| AdMob line (when ads ship) | `public/app-ads.txt` |

To add a game: add an entry to `games.ts`, then create `app/pages/games/<slug>/index.vue` (and `privacy.vue`) with its own design and put its media in `public/games/<slug>/`.

## Deploy on Netlify

1. Push this repo to GitHub.
2. Netlify: **Add new site > Import an existing project**, pick the repo. `netlify.toml` already sets the build command (`npm run generate`), publish directory (`.output/public`) and Node 22.
3. **Domain management > Add a domain**: `pinkkoala.games`. Either use Netlify DNS (change the nameservers at Porkbun to the ones Netlify shows) or add the DNS records Netlify lists in Porkbun's DNS panel. HTTPS turns on automatically once DNS resolves.

## Pointing a separate Rough Day domain at the game page

1. In Netlify, **Add a domain alias** for the new domain (and `www.`), and set up its DNS the same way.
2. Under **Site configuration > Environment variables** add `ROUGH_DAY_HOSTS` with the hostnames, comma separated, e.g. `roughday.game,www.roughday.game`.
3. Redeploy. On those hosts `/` now shows the Rough Day page (`netlify/edge-functions/rough-day-host.ts`). Every other page and asset works as normal on either domain.

## Placeholders to replace

- `app/data/site.ts`: `email` (needs a real mailbox), `privacyIsDraft`.
- `app/data/games.ts`: `stores.play` and `stores.appStore` (set the URL when each store listing is live).
- `app/pages/games/rough-day/privacy.vue`: every `[CHECK]` (analytics opt-out toggle, Firebase retention period, legal bases).
- `public/app-ads.txt`: the AdMob line when ads ship.
- Social images `public/og-default.png` and `public/games/rough-day/og.jpg` are simple placeholders.
- Rough Day screenshots (public/games/rough-day/ui-*.jpg) and the gallery frames are low-res placeholders captured from the dev build and trick-shot clips; swap in proper phone screenshots (Android and iOS) before launch.
- `app/pages/terms/index.vue`: every `[CHECK]` (legal name and country, governing law, payments/ads wording).
- `app/lib/bossModels.js` is a copy of the game's boss models (`src/course/bossModels.js` plus the Groundskeeper from `CourseBuilder.js`) used by the three.js boss stage. Re-copy it if the game's bosses change.
