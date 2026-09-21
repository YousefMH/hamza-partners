import { Helmet } from 'react-helmet-async'
import type { PageSeo } from '@/lib/seo'
import { siteConfig } from '@/data/siteConfig'

type SeoHeadProps = {
  seo: PageSeo
}

export function SeoHead({ seo }: SeoHeadProps) {
  const robots = seo.robots ?? 'index, follow'
  const ogType = seo.ogType ?? 'website'
  const image = seo.image
  const jsonLd = seo.jsonLd

  return (
    <Helmet>
      <html lang="ar" dir="rtl" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={seo.canonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="ar_EG" />
      <meta property="og:site_name" content={siteConfig.firmNameAr} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      {image ? <meta property="og:image" content={image} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {image ? <meta name="twitter:image" content={image} /> : null}

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  )
}
