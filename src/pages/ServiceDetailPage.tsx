import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { getServiceBySlug, getServiceConsultLabel, services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SeoHead } from '@/components/SeoHead'
import { Button } from '@/components/ui/Button'
import { appUrl } from '@/lib/paths'
import { contactHref } from '@/lib/navigation'
import { trackEvent } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { notFoundSeo, serviceSeo } from '@/lib/seo'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { DoubleLine, Meander, SectionLabel } from '@/components/Decorative/Ornaments'

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getServiceBySlug(slug) : undefined

  useEffect(() => {
    if (!service) return
    trackEvent('service_view', { service: service.slug })
  }, [service])

  if (!service) {
    return (
      <>
        <SeoHead seo={notFoundSeo()} />
        <Header forceSolid />
        <main className="container-editorial flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
          <h1 className="font-display text-3xl text-charcoal">الخدمة غير موجودة</h1>
          <p className="mt-4 text-muted">تعذر العثور على صفحة الخدمة المطلوبة.</p>
          <Link to="/" className="mt-8 text-gold-dark hover:text-charcoal">
            العودة إلى الصفحة الرئيسية
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  const related = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3)

  const consultHref = contactHref(service.slug)
  const whatsappHref = buildWhatsAppUrl({ service, source: 'service-detail' })

  return (
    <>
      <SeoHead seo={serviceSeo(service)} />
      <Header forceSolid />
      <main>
        <section className="bg-charcoal pt-28 pb-16 text-ivory md:pt-36 md:pb-20">
          <div className="container-editorial text-center md:text-start">
            <a
              href={appUrl('/#services')}
              className="mb-8 inline-flex items-center justify-center gap-2 text-base text-ivory/85 transition-colors hover:text-gold-champagne md:justify-start"
            >
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              خدماتنا
            </a>

            <div className="flex justify-center md:justify-start">
              <Meander className="mb-8 w-36 max-w-xs sm:w-44 md:w-full" tone="champagne" />
            </div>

            <p className="font-display text-base font-bold text-gold">{service.number}</p>

            <div className="mt-5 flex flex-col items-center gap-4 md:mt-4 md:flex-row md:items-start md:gap-4">
              <span
                className="flex size-14 items-center justify-center rounded-full border border-gold-champagne/35 bg-charcoal/40 md:mt-1 md:size-auto md:rounded-none md:border-0 md:bg-transparent"
                aria-hidden="true"
              >
                <ServiceIcon
                  name={service.icon}
                  className="size-6 text-gold-champagne md:size-6"
                />
              </span>
              <div className="max-w-3xl">
                <h1 className="text-[clamp(1.65rem,5.5vw,2.75rem)] font-extrabold leading-[1.45] text-balance">
                  {service.title}
                </h1>
                <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-[1.85] text-ivory/88 md:mx-0 md:max-w-none md:text-lg">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-ivory">
          <div className="container-editorial grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
            <div className="text-center md:text-start">
              <SectionLabel>نظرة عامة</SectionLabel>
              <DoubleLine className="mx-auto mb-8 max-w-[7rem] md:mx-0" />
              <p className="mx-auto max-w-2xl text-[1.05rem] leading-[1.9] text-muted md:mx-0 md:text-lg">
                {service.description}
              </p>

              <div className="mt-12">
                <SectionLabel>ماذا تشمل الخدمة؟</SectionLabel>
                <DoubleLine className="mx-auto mb-8 max-w-[7rem] md:mx-0" />
                <ul className="mx-auto max-w-2xl space-y-5 md:mx-0 md:space-y-4">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex flex-col items-center gap-2.5 text-[1.02rem] leading-[1.75] text-charcoal md:flex-row md:items-start md:gap-3 md:text-base md:leading-relaxed"
                    >
                      <Check
                        className="size-5 shrink-0 text-gold md:mt-1"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="max-w-sm md:max-w-none">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
                <Button
                  href={consultHref}
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    trackEvent('service_consultation_click', {
                      service: service.slug,
                      source: 'service-detail',
                    })
                    trackEvent('consultation_cta_click', {
                      source: 'service-detail',
                      service: service.slug,
                    })
                  }}
                >
                  {getServiceConsultLabel(service)}
                </Button>
                <Button
                  href={whatsappHref}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('whatsapp_click', {
                      source: 'service-detail',
                      service: service.slug,
                    })
                  }
                >
                  {siteConfig.cta.whatsappShort}
                </Button>
                <Button
                  href={appUrl('/#services')}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  كل خدماتنا
                </Button>
              </div>
            </div>

            <aside className="space-y-6 text-center md:text-start">
              <div className="border border-border bg-white p-6 md:p-7">
                <p className="font-display text-base font-bold text-gold-dark">ملخص سريع</p>
                <p className="body-copy mx-auto mt-4 max-w-sm md:mx-0 md:max-w-none">
                  {service.shortDescription}
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <Button
                    href={consultHref}
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      trackEvent('service_consultation_click', {
                        service: service.slug,
                        source: 'service-detail-sidebar',
                      })
                      trackEvent('consultation_cta_click', {
                        source: 'service-detail',
                        service: service.slug,
                      })
                    }}
                  >
                    {siteConfig.cta.contact}
                  </Button>
                </div>
              </div>

              {related.length > 0 && (
                <div className="border border-border bg-white p-6 md:p-7">
                  <p className="font-display text-base font-bold text-gold-dark">خدمات ذات صلة</p>
                  <ul className="mt-5 space-y-4">
                    {related.map((item) => (
                      <li key={item.id} className="border-t border-border pt-4">
                        <Link
                          to={`/services/${item.slug}`}
                          className="font-display text-base leading-relaxed text-charcoal transition-colors hover:text-gold-dark"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
