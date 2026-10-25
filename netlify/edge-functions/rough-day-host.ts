import type { Config, Context } from '@netlify/edge-functions'

// Shows the Rough Day page at "/" when the request comes in on one of the hosts listed in the
// ROUGH_DAY_HOSTS environment variable (comma separated). Every other host gets the studio home.
export default async (request: Request, context: Context) => {
  const hosts = (Netlify.env.get('ROUGH_DAY_HOSTS') ?? '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean)
  const host = new URL(request.url).hostname.toLowerCase()
  if (!hosts.includes(host)) return
  return context.rewrite('/games/rough-day/')
}

export const config: Config = { path: '/' }
