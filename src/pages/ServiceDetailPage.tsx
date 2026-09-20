import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { getServiceBySlug, services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { appUrl } from '@/lib/paths'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { DoubleLine, Meander, SectionLabel } from '@/components/Decorative/Ornaments'

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!service) {
    return (
      <>
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

  return (
    <>
      <Header />
      <main>
        <section className="bg-charcoal pt-28 pb-16 text-ivory md:pt-36 md:pb-20">
          <div className="container-editorial">
            <a href={appUrl("/#services")}
              className="mb-8 inline-flex items-center gap-2 text-base text-ivory/85 transition-colors hover:text-gold-champagne"
            >
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              مجالات العمل
            </a>
            <Meander className="mb-8 w-full max-w-xs" tone="champagne" />
            <p className="font-display text-base font-bold text-gold">{service.number}</p>
            <div className="mt-4 flex items-start gap-4">
              <ServiceIcon name={service.icon} className="mt-1 size-6 shrink-0 text-gold-champagne" />
              <div className="max-w-3xl">
                <h1 className="text-[clamp(1.65rem,3.8vw,2.75rem)] font-extrabold leading-[1.45]">
                  {service.title}
                </h1>
                <p className="mt-5 text-lg leading-[1.85] text-ivory/88">{service.shortDescription}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-ivory">
          <div className="container-editorial grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
            <div>
              <SectionLabel>نظرة عامة</SectionLabel>
              <DoubleLine className="mb-8 max-w-[7rem]" />
              <p className="max-w-2xl text-lg leading-[1.9] text-muted">{service.description}</p>

              <div className="mt-12">
                <SectionLabel>ماذا تشمل الخدمة؟</SectionLabel>
                <DoubleLine className="mb-8 max-w-[7rem]" />
                <ul className="max-w-2xl space-y-4">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-charcoal">
                      <Check
                        className="mt-1 size-5 shrink-0 text-gold"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <Button href={appUrl("/#contact")} size="lg">
                  {siteConfig.cta.book}
                </Button>
                <Button href={appUrl("/#services")} variant="secondary" size="lg">
                  كل مجالات العمل
                </Button>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="border border-border bg-white p-6 md:p-7">
                <p className="font-display text-base font-bold text-gold-dark">ملخص سريع</p>
                <p className="body-copy mt-4">{service.shortDescription}</p>
                <div className="mt-6 border-t border-border pt-5">
                  <Button href={appUrl("/#contact")} className="w-full" size="lg">
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
