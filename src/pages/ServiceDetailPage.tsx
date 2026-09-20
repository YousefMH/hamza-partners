import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getServiceBySlug, services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { DoubleLine, Meander, SectionLabel } from '@/components/Decorative/Ornaments'

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!service) {
    return (
      <>
        <Header />
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

  const related = services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3)

  return (
    <>
      <Header />
      <main>
        <section className="bg-charcoal pt-28 pb-16 text-ivory md:pt-36 md:pb-20">
          <div className="container-editorial">
            <Link
              to="/#services"
              className="mb-8 inline-flex items-center gap-2 text-sm text-ivory/65 transition-colors hover:text-gold-champagne"
            >
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              مجالات العمل
            </Link>
            <Meander className="mb-8 max-w-xs" tone="champagne" />
            <p className="font-display text-sm tracking-[0.25em] text-gold">{service.number}</p>
            <div className="mt-4 flex items-start gap-4">
              <ServiceIcon name={service.icon} className="mt-1 size-6 text-gold-champagne" />
              <h1 className="max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-snug">
                {service.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="section-pad bg-ivory">
          <div className="container-editorial grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <SectionLabel>نظرة عامة</SectionLabel>
              <DoubleLine className="mb-8 max-w-[7rem]" />
              <p className="max-w-2xl text-lg leading-relaxed text-warm-gray">{service.description}</p>
              <p className="mt-6 max-w-2xl text-warm-gray">{service.shortDescription}</p>
              <div className="mt-10">
                <Button href="/#contact" size="lg">
                  {siteConfig.cta.book}
                </Button>
              </div>
            </div>

            {related.length > 0 && (
              <aside className="border border-border bg-white p-6">
                <p className="font-display text-sm text-gold-dark">خدمات ذات صلة</p>
                <ul className="mt-5 space-y-4">
                  {related.map((item) => (
                    <li key={item.id} className="border-t border-border pt-4">
                      <Link
                        to={`/services/${item.slug}`}
                        className="font-display text-base text-charcoal transition-colors hover:text-gold-dark"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
