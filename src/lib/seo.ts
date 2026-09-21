import { siteConfig } from '@/data/siteConfig'
import type { Service } from '@/data/services'
import type { TeamMember } from '@/data/team'

/** Canonical origin without trailing slash (GitHub Pages until custom domain). */
export const SITE_ORIGIN = siteConfig.url.replace(/\/$/, '')

export type PageSeo = {
  title: string
  description: string
  path: string
  canonical: string
  robots?: string
  ogType?: 'website' | 'article' | 'profile'
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/** Absolute URL for a site path. Accepts '', '/', '/services/x', 'services/x'. */
export function absoluteUrl(path = ''): string {
  if (!path || path === '/') return `${SITE_ORIGIN}/`
  const cleaned = path.replace(/^\//, '').replace(/\/$/, '')
  return `${SITE_ORIGIN}/${cleaned}/`
}

export function absoluteAssetUrl(assetPath: string): string {
  const cleaned = assetPath.replace(/^\//, '')
  return `${SITE_ORIGIN}/${cleaned}`
}

export function pageTitle(segment?: string): string {
  if (!segment) {
    return `${siteConfig.firmNameAr} | استشارات قانونية للشركات والاستثمار`
  }
  return `${segment} | ${siteConfig.firmNameAr}`
}

export const defaultDescription = siteConfig.description

export const defaultOgImage = absoluteAssetUrl('og-image.png')

function organizationId(): string {
  return `${SITE_ORIGIN}/#organization`
}

function legalServiceId(): string {
  return `${SITE_ORIGIN}/#legalservice`
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    '@id': organizationId(),
    name: siteConfig.firmNameAr,
    alternateName: siteConfig.firmNameEn,
    url: `${SITE_ORIGIN}/`,
    logo: absoluteAssetUrl('favicon.svg'),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneHref.replace(/^tel:/, ''),
    foundingDate: `${siteConfig.foundedYear}-01-01`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'القاهرة',
      addressCountry: 'EG',
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.twitter].filter(Boolean),
  }
}

export function legalServiceJsonLd(): Record<string, unknown> {
  return {
    '@type': 'LegalService',
    '@id': legalServiceId(),
    name: siteConfig.firmNameAr,
    url: `${SITE_ORIGIN}/`,
    image: defaultOgImage,
    foundingDate: `${siteConfig.foundedYear}-01-01`,
    provider: { '@id': organizationId() },
    areaServed: { '@type': 'Country', name: 'Egypt' },
    availableLanguage: ['ar', 'en'],
    priceRange: '$$',
  }
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    name: siteConfig.firmNameAr,
    alternateName: siteConfig.firmNameEn,
    url: `${SITE_ORIGIN}/`,
    inLanguage: 'ar',
    publisher: { '@id': organizationId() },
  }
}

export function homeSeo(): PageSeo {
  return {
    title: pageTitle(),
    description: defaultDescription,
    path: '/',
    canonical: absoluteUrl('/'),
    ogType: 'website',
    image: defaultOgImage,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [organizationJsonLd(), legalServiceJsonLd(), websiteJsonLd()],
    },
  }
}

export function serviceSeo(service: Service): PageSeo {
  const path = `/services/${service.slug}`
  const canonical = absoluteUrl(path)
  const title = pageTitle(service.title)
  const description = service.shortDescription

  return {
    title,
    description,
    path,
    canonical,
    ogType: 'article',
    image: defaultOgImage,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: { '@id': organizationId() },
          areaServed: { '@type': 'Country', name: 'Egypt' },
          url: canonical,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'الرئيسية',
              item: absoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'خدماتنا',
              item: `${SITE_ORIGIN}/#services`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: service.title,
              item: canonical,
            },
          ],
        },
      ],
    },
  }
}

export function lawyerSeo(member: TeamMember): PageSeo {
  const path = `/team/${member.slug}`
  const canonical = absoluteUrl(path)
  const title = pageTitle(member.name)
  const description = `${member.name} — ${member.position}. ${member.expertise}`

  return {
    title,
    description,
    path,
    canonical,
    ogType: 'profile',
    image: member.image || defaultOgImage,
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
          worksFor: { '@id': organizationId() },
          knowsLanguage: member.languages,
          sameAs: member.linkedin ? [member.linkedin] : [],
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'الرئيسية',
              item: absoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'الفريق',
              item: `${SITE_ORIGIN}/#team`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: member.name,
              item: canonical,
            },
          ],
        },
      ],
    },
  }
}

export function notFoundSeo(): PageSeo {
  return {
    title: pageTitle('الصفحة غير موجودة'),
    description: 'الصفحة المطلوبة غير متاحة على موقع حمزة وشركاؤه.',
    path: '/404',
    canonical: absoluteUrl('/'),
    robots: 'noindex, follow',
    ogType: 'website',
    image: defaultOgImage,
  }
}
