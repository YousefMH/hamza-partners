import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import {
  getServiceConsultLabel,
  serviceCategoryLabels,
  serviceCategoryOrder,
  services,
  type Service,
  type ServiceCategory,
} from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { contactHref, SERVICES_FILTER_EVENT, type ServicesFilterDetail } from '@/lib/navigation'
import { trackEvent } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import {
  easeOut,
  fadeUp,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerContainer,
  staggerList,
  viewportReading,
  viewportReadingLoose,
} from '@/lib/motion'
import { cn } from '@/lib/cn'

type CategoryFilter = ServiceCategory | 'all'

function ServiceCardContent({ service }: { service: Service }) {
  return (
    <>
      <div className="mb-2 flex w-full items-center justify-between gap-6">
        <span className="font-display text-sm font-bold tracking-[0.14em] text-gold md:text-base">
          {service.number}
        </span>
        <ServiceIcon
          name={service.icon}
          className="size-5 shrink-0 text-muted/80 transition-colors group-hover:text-gold"
        />
      </div>

      <h3 className="font-display text-lg leading-[1.55] text-charcoal md:text-[1.35rem] md:leading-[1.5]">
        {service.title}
      </h3>

      <span className="my-4 block h-px w-12 bg-gradient-to-l from-gold/80 to-transparent" aria-hidden="true" />

      <p className="body-copy text-[0.98rem] leading-[1.85] md:text-base">{service.shortDescription}</p>
    </>
  )
}

/**
 * Robust active-index detection for RTL/LTR horizontal snap carousels.
 * Uses visible fill of each slide — never fragile scrollLeft === 0.
 */
function useHorizontalSnapIndex(
  scrollerRef: RefObject<HTMLDivElement | null>,
  itemCount: number,
) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const root = scrollerRef.current
    if (!root || itemCount === 0) return

    const slides = root.querySelectorAll<HTMLElement>('[data-service-slide]')
    if (slides.length === 0) return

    const visibility = new Map<Element, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target, entry.intersectionRatio)
        }
        let best = 0
        let bestRatio = -1
        slides.forEach((slide, i) => {
          const ratio = visibility.get(slide) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = i
          }
        })
        if (bestRatio > 0.35) setIndex(best)
      },
      { root, threshold: [0.35, 0.5, 0.65, 0.8] },
    )

    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [scrollerRef, itemCount])

  return index
}

function MobileServicesCarousel({ items }: { items: Service[] }) {
  const reduce = useReducedMotion()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const activeIndex = useHorizontalSnapIndex(scrollerRef, items.length)
  const total = items.length

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    root.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior })
  }, [items])

  return (
    <div className="lg:hidden">
      <div
        className="mb-4 flex items-center justify-between gap-3 px-5"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-xs font-bold tracking-wide text-muted">
          اسحب أفقياً لعرض الخدمات
        </p>
        <span className="font-display text-xs font-bold tabular-nums tracking-wide text-gold-dark">
          {String(activeIndex + 1).padStart(2, '0')}
          <span className="mx-1 text-muted/45">من</span>
          {String(total).padStart(2, '0')}
        </span>
      </div>

      <div
        ref={scrollerRef}
        className="services-x-scroller flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label="قائمة مجالات العمل"
        dir="rtl"
      >
        {items.map((service, index) => {
          const consult = contactHref(service.slug)
          const whatsappHref = buildWhatsAppUrl({ service, source: 'service' })

          return (
            <article
              key={service.id}
              role="listitem"
              data-service-slide
              data-service-index={index}
              className="services-x-slide w-[min(100%,22.5rem)] shrink-0 snap-center"
            >
              <motion.div
                className="services-mobile-card flex h-full min-h-[28rem] flex-col"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: easeOut }}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="font-display text-sm font-bold tracking-[0.12em] text-gold-dark">
                    {service.number}
                  </span>
                  <span className="text-[0.7rem] font-bold tabular-nums tracking-wide text-muted/70">
                    {String(index + 1).padStart(2, '0')}
                    <span className="mx-1 text-border">/</span>
                    {String(total).padStart(2, '0')}
                  </span>
                </div>

                <Link to={`/services/${service.slug}`} className="group flex flex-1 flex-col">
                  <div
                    className="mb-5 flex size-12 items-center justify-center border border-gold/35 bg-ivory text-gold-dark transition-colors group-hover:border-gold group-hover:bg-white"
                    aria-hidden="true"
                  >
                    <ServiceIcon name={service.icon} className="size-5" />
                  </div>

                  <h3 className="font-display text-[clamp(1.25rem,4.6vw,1.55rem)] leading-[1.45] text-charcoal text-balance">
                    {service.title}
                  </h3>

                  <span
                    className="my-4 block h-px w-10 bg-gradient-to-l from-gold to-transparent"
                    aria-hidden="true"
                  />

                  <p className="text-[1.02rem] leading-[1.85] text-muted text-pretty">
                    {service.shortDescription}
                  </p>
                </Link>

                <div className="mt-7 flex flex-col gap-2.5">
                  <a
                    href={consult}
                    className="btn-wood inline-flex min-h-11 w-full items-center justify-center px-4 text-[0.95rem] font-bold text-charcoal"
                    onClick={() => {
                      trackEvent('service_consultation_click', {
                        service: service.slug,
                        source: 'service-mobile',
                      })
                      trackEvent('consultation_cta_click', {
                        source: 'service',
                        service: service.slug,
                      })
                    }}
                  >
                    {getServiceConsultLabel(service)}
                  </a>
                  <div className="flex gap-2">
                    <Link
                      to={`/services/${service.slug}`}
                      className="btn-radius inline-flex min-h-11 flex-1 items-center justify-center gap-1 border border-charcoal/12 bg-ivory px-3 text-[0.9rem] font-bold text-charcoal"
                    >
                      {siteConfig.cta.discoverMore}
                      <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
                    </Link>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-radius inline-flex min-h-11 flex-1 items-center justify-center border border-charcoal/12 bg-white px-3 text-[0.9rem] font-bold text-gold-dark"
                      onClick={() =>
                        trackEvent('whatsapp_click', {
                          source: 'service',
                          service: service.slug,
                        })
                      }
                    >
                      {siteConfig.cta.whatsappShort}
                    </a>
                  </div>
                </div>
              </motion.div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function CategoryFilters({
  active,
  onChange,
}: {
  active: CategoryFilter
  onChange: (value: CategoryFilter) => void
}) {
  const options: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: siteConfig.cta.filterAll },
    ...serviceCategoryOrder.map((id) => ({
      id,
      label: serviceCategoryLabels[id],
    })),
  ]

  return (
    <div
      className="flex flex-wrap justify-center gap-2 lg:justify-start"
      role="group"
      aria-label="تصفية مجالات العمل"
    >
      {options.map((option) => {
        const isActive = active === option.id
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            className={cn(
              'border px-3.5 py-2 font-display text-sm font-bold tracking-wide transition-colors',
              isActive
                ? 'border-gold bg-transparent text-gold-dark shadow-[inset_0_-1px_0_0_var(--color-gold)]'
                : 'border-border/90 bg-transparent text-charcoal/80 hover:border-gold/60 hover:text-gold-dark',
            )}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export function Services() {
  const reduce = useReducedMotion()
  const [category, setCategory] = useState<CategoryFilter>('all')

  useEffect(() => {
    const onFilter = (event: Event) => {
      const detail = (event as CustomEvent<ServicesFilterDetail>).detail
      if (!detail?.category) return
      setCategory(detail.category)
    }
    window.addEventListener(SERVICES_FILTER_EVENT, onFilter)
    return () => window.removeEventListener(SERVICES_FILTER_EVENT, onFilter)
  }, [])

  const filtered = useMemo(() => {
    if (category === 'all') return services
    return services.filter((service) => service.category === category)
  }, [category])

  return (
    <section
      id="services"
      className="bg-ivory section-pad lg:bg-white"
      aria-labelledby="services-heading"
    >
      <div className="container-editorial">
        <motion.div
          className="mx-auto flex max-w-2xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-start"
          variants={readingStagger(reduce, staggerContainer)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <motion.div variants={readingVariants(reduce, fadeUp)}>
            <SectionLabel>مجالات العمل</SectionLabel>
          </motion.div>
          <motion.h2
            id="services-heading"
            variants={readingVariants(reduce, fadeUp)}
            className="section-title"
          >
            مجالات عملنا
          </motion.h2>
          <motion.div variants={readingVariants(reduce, fadeUp)} className="section-rule">
            <DoubleLine />
          </motion.div>
          <motion.p variants={readingVariants(reduce, fadeUpSoft)} className="lede">
            خبرات قانونية متخصصة تغطي احتياجات الأعمال والاستثمار والتقاضي.
          </motion.p>
          <motion.div variants={readingVariants(reduce, fadeUp)} className="mt-8 w-full">
            <CategoryFilters active={category} onChange={setCategory} />
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-10 md:mt-12">
        <MobileServicesCarousel items={filtered} />
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={category}
          className="container-editorial section-body mt-0 hidden grid-cols-2 border-t border-border lg:grid xl:grid-cols-3"
          variants={readingStagger(reduce, staggerList)}
          initial={reduce ? false : 'hidden'}
          animate="visible"
          exit={reduce ? undefined : { opacity: 0 }}
          viewport={viewportReadingLoose}
        >
          {filtered.map((service) => (
            <motion.li
              key={service.id}
              variants={readingVariants(reduce, fadeUp)}
              className="group border-b border-border odd:border-e xl:border-e xl:[&:nth-child(3n)]:border-e-0"
            >
              <div className="flex h-full flex-col gap-6 p-8 text-start transition-colors duration-300 hover:bg-ivory/80 xl:p-9">
                <Link to={`/services/${service.slug}`} className="flex flex-col gap-1">
                  <ServiceCardContent service={service} />
                </Link>
                <div className="mt-auto flex flex-col gap-2.5 border-t border-border/70 pt-5">
                  <a
                    href={contactHref(service.slug)}
                    className="inline-flex items-center justify-start gap-2 text-[0.95rem] font-bold text-gold-dark transition-colors hover:text-charcoal"
                    onClick={() => {
                      trackEvent('service_consultation_click', {
                        service: service.slug,
                        source: 'service',
                      })
                      trackEvent('consultation_cta_click', {
                        source: 'service',
                        service: service.slug,
                      })
                    }}
                  >
                    {getServiceConsultLabel(service)}
                    <ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-sm font-bold text-muted transition-colors hover:text-charcoal"
                  >
                    {siteConfig.cta.discoverMore}
                  </Link>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  )
}
