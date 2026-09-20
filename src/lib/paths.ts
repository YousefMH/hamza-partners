/**
 * Build a URL under Vite `base` so GitHub Pages project paths resolve correctly.
 * Examples with base `/hamza-partners/`:
 * - appUrl() → `/hamza-partners/`
 * - appUrl('#contact') → `/hamza-partners/#contact`
 * - appUrl('/#services') → `/hamza-partners/#services`
 */
export function appUrl(path = ''): string {
  const base = import.meta.env.BASE_URL
  if (!path || path === '/') return base
  if (path.startsWith('/#')) return `${base}${path.slice(1)}`
  if (path.startsWith('#')) return `${base}${path}`
  if (path.startsWith('/')) return `${base}${path.replace(/^\//, '')}`
  return `${base}${path}`
}
