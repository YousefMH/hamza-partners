/**
 * Post-Vite SEO static emitter for GitHub Pages.
 * - Writes robots.txt + sitemap.xml from service/team slugs in source
 * - Clones index.html into per-route shells with injected head meta + JSON-LD
 * - Injects noindex into 404.html
 */
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')

const SITE_ORIGIN = 'https://yousefmh.github.io/hamza-partners'
const FIRM = 'حمزة وشركاؤه'
const DEFAULT_DESCRIPTION =
  'مكتب محاماة مصري تأسس عام 1935 — نقدّم حلولًا قانونية متكاملة للشركات والمستثمرين والأفراد، بخبرة متراكمة وفهم دقيق للأعمال.'
const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`

function extractSlugs(filePath) {
  const src = readFileSync(filePath, 'utf8')
  return [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
}

function extractServiceMeta(filePath) {
  const src = readFileSync(filePath, 'utf8')
  const blocks = src.split(/{\s*id:\s*'/)
  const items = []
  for (const block of blocks.slice(1)) {
    const slug = block.match(/slug:\s*'([^']+)'/)?.[1]
    const title = block.match(/title:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    const shortDescription = block.match(
      /shortDescription:\s*\n?\s*'((?:\\'|[^'])*)'/,
    )?.[1]?.replace(/\\'/g, "'")
    if (slug && title && shortDescription) {
      items.push({ slug, title, shortDescription })
    }
  }
  return items
}

function extractTeamMeta(filePath) {
  const src = readFileSync(filePath, 'utf8')
  const blocks = src.split(/{\s*id:\s*'/)
  const items = []
  for (const block of blocks.slice(1)) {
    const slug = block.match(/slug:\s*'([^']+)'/)?.[1]
    const name = block.match(/name:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    const position = block.match(/position:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    const expertise = block.match(/expertise:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    const image = block.match(/image:\s*\n?\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    if (slug && name && position && expertise) {
      items.push({ slug, name, position, expertise, image })
    }
  }
  return items
}

function pageTitle(segment) {
  return segment ? `${segment} | ${FIRM}` : `${FIRM} | استشارات قانونية للشركات والاستثمار`
}

function absoluteUrl(routePath) {
  if (!routePath || routePath === '/') return `${SITE_ORIGIN}/`
  const cleaned = routePath.replace(/^\//, '').replace(/\/$/, '')
  return `${SITE_ORIGIN}/${cleaned}/`
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function injectHead(html, { title, description, canonical, robots, ogType, image, jsonLd }) {
  let next = html
  next = next.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  )
  next = next.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/,
    `<meta name="robots" content="${escapeHtml(robots ?? 'index, follow')}" />`,
  )
  next = next.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${escapeHtml(ogType ?? 'website')}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  )
  next = next.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${escapeHtml(image ?? OG_IMAGE)}" />`,
  )
  next = next.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  )
  next = next.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  )
  if (!next.includes('name="twitter:image"')) {
    next = next.replace(
      /<meta\s+name="twitter:description"[^>]*>/,
      (match) =>
        `${match}\n    <meta name="twitter:image" content="${escapeHtml(image ?? OG_IMAGE)}" />`,
    )
  } else {
    next = next.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image" content="${escapeHtml(image ?? OG_IMAGE)}" />`,
    )
  }

  if (jsonLd) {
    const script = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
    if (next.includes('type="application/ld+json"')) {
      next = next.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        script,
      )
    } else {
      next = next.replace('</head>', `    ${script}\n  </head>`)
    }
  }

  return next
}

function writeShell(routeDir, html) {
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(path.join(routeDir, 'index.html'), html)
}

function main() {
  if (!existsSync(path.join(dist, 'index.html'))) {
    throw new Error('dist/index.html missing — run vite build first')
  }

  const services = extractServiceMeta(path.join(root, 'src/data/services.ts'))
  const team = extractTeamMeta(path.join(root, 'src/data/team.ts'))
  const baseHtml = readFileSync(path.join(dist, 'index.html'), 'utf8')

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: FIRM,
        alternateName: 'Hamza & Partners',
        url: `${SITE_ORIGIN}/`,
        logo: `${SITE_ORIGIN}/favicon.svg`,
        foundingDate: '1935-01-01',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'القاهرة',
          addressCountry: 'EG',
        },
      },
      {
        '@type': 'LegalService',
        '@id': `${SITE_ORIGIN}/#legalservice`,
        name: FIRM,
        url: `${SITE_ORIGIN}/`,
        image: OG_IMAGE,
        foundingDate: '1935-01-01',
        provider: { '@id': `${SITE_ORIGIN}/#organization` },
        areaServed: { '@type': 'Country', name: 'Egypt' },
        availableLanguage: ['ar', 'en'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: FIRM,
        url: `${SITE_ORIGIN}/`,
        inLanguage: 'ar',
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      },
    ],
  }

  const homeHtml = injectHead(baseHtml, {
    title: pageTitle(),
    description: DEFAULT_DESCRIPTION,
    canonical: absoluteUrl('/'),
    robots: 'index, follow',
    ogType: 'website',
    image: OG_IMAGE,
    jsonLd: homeJsonLd,
  })
  writeFileSync(path.join(dist, 'index.html'), homeHtml)

  for (const service of services) {
    const canonical = absoluteUrl(`/services/${service.slug}`)
    const html = injectHead(baseHtml, {
      title: pageTitle(service.title),
      description: service.shortDescription,
      canonical,
      ogType: 'article',
      image: OG_IMAGE,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            name: service.title,
            description: service.shortDescription,
            provider: { '@id': `${SITE_ORIGIN}/#organization` },
            url: canonical,
            areaServed: { '@type': 'Country', name: 'Egypt' },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: absoluteUrl('/') },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'مجالات العمل',
                item: `${SITE_ORIGIN}/#services`,
              },
              { '@type': 'ListItem', position: 3, name: service.title, item: canonical },
            ],
          },
        ],
      },
    })
    writeShell(path.join(dist, 'services', service.slug), html)
  }

  for (const member of team) {
    const canonical = absoluteUrl(`/team/${member.slug}`)
    const description = `${member.name} — ${member.position}. ${member.expertise}`
    const html = injectHead(baseHtml, {
      title: pageTitle(member.name),
      description,
      canonical,
      ogType: 'profile',
      image: member.image || OG_IMAGE,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            name: member.name,
            jobTitle: member.position,
            description: member.expertise,
            image: member.image,
            url: canonical,
            worksFor: { '@id': `${SITE_ORIGIN}/#organization` },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: absoluteUrl('/') },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'فريق العمل',
                item: `${SITE_ORIGIN}/#team`,
              },
              { '@type': 'ListItem', position: 3, name: member.name, item: canonical },
            ],
          },
        ],
      },
    })
    writeShell(path.join(dist, 'team', member.slug), html)
  }

  const notFoundHtml = injectHead(baseHtml, {
    title: pageTitle('الصفحة غير موجودة'),
    description: 'الصفحة المطلوبة غير متاحة على موقع حمزة وشركاؤه.',
    canonical: absoluteUrl('/'),
    robots: 'noindex, follow',
    ogType: 'website',
    image: OG_IMAGE,
  })
  writeFileSync(path.join(dist, '404.html'), notFoundHtml)

  const urls = [
    { loc: absoluteUrl('/'), priority: '1.0', changefreq: 'weekly' },
    ...services.map((s) => ({
      loc: absoluteUrl(`/services/${s.slug}`),
      priority: '0.8',
      changefreq: 'monthly',
    })),
    ...team.map((m) => ({
      loc: absoluteUrl(`/team/${m.slug}`),
      priority: '0.7',
      changefreq: 'monthly',
    })),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

  writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
  writeFileSync(
    path.join(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
  )

  // Keep public copies in sync for local preview of source tree
  writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap)
  writeFileSync(
    path.join(root, 'public/robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
  )

  console.log(
    `SEO static: home + ${services.length} services + ${team.length} team + sitemap/robots/404`,
  )
}

main()
