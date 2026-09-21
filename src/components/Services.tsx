import { useEffect, useMemo, useState } from 'react'
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
import { useMobileServicesSnap } from '@/hooks/useMobileServicesSnap'
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
      <div className="mb-1 flex w-full items-center justify-between gap-6">
        <span className="font-display text-base font-bold tracking-wide text-gold">
          {service.number}
        </span>
        <ServiceIcon
          name={service.icon}
          className="size-5 shrink-0 text-muted transition-colors group-hover:text-gold"
        />
      </div>

      <h3 className="font-display text-lg leading-[1.65] text-charcoal md:text-xl">
        {service.title}
      </h3>

      <p className="body-copy text-base">{service.shortDescription}</p>
    </>
  )
}

const mobileCardViewport = {
  once: true,
  amount: 0.35,
  margin: '0px 0px -8% 0px',
} as const

function MobileServicePanel({
  service,
  index,
  total,
}: {
  service: Service
  index: number
  total: number
}) {
  const reduce = useReducedMotion()
  const isLast = index === total - 1
  const consultHref = contactHref(service.slug)
  const whatsappHref = buildWhatsAppUrl({ service, source: 'service' })

  return (
    <article
      role="listitem"
      data-service-index={index}
      className={cn(
        'services-page-panel relative flex flex-col items-center justify-center px-5',
        isLast && 'services-page-panel--last',
      )}
    >
      <motion.div
        className="services-mobile-shell w-full max-w-[22.5rem]"
        initial={reduce ? false : { opacity: 0, y: 42 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={mobileCardViewport}
        transition={{ duration: 0.55, ease: easeOut }}
      >
        <div className="group services-mobile-card flex w-full flex-col">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="font-display text-sm font-bold tabular-nums tracking-wide text-gold-dark">
              {service.number}
            </span>
            <span className="text-[0.7rem] font-bold tabular-nums tracking-wide text-muted/75">
              {String(index + 1).padStart(2, '0')}
              <span className="mx-1 text-border">/</span>
              {String(total).padStart(2, '0')}
            </span>
          </div>

          <Link to={`/services/${service.slug}`} className="contents">
            <div
              className="mb-5 flex size-14 items-center justify-center rounded-full border border-gold/30 bg-ivory text-gold-dark transition-colors group-hover:border-gold group-hover:bg-white"
              aria-hidden="true"
            >
              <ServiceIcon name={service.icon} className="size-6" />
            </div>

            <h3 className="font-display text-[clamp(1.3rem,5vw,1.65rem)] leading-[1.5] text-charcoal text-balance">
              {service.title}
            </h3>

            <span
              className="my-4 block h-px w-10 bg-gradient-to-l from-gold to-transparent"
              aria-hidden="true"
            />

            <p className="text-[1.02rem] leading-[1.9] text-muted text-pretty">
              {service.shortDescription}
            </p>
          </Link>

          <div className="mt-7 flex flex-col gap-2.5">
            <a
              href={consultHref}
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
        </div>
      </motion.div>

      {!isLast ? (
        <span
          className="pointer-events-none absolute inset-x-0 bottom-[max(0.85rem,env(safe-area-inset-bottom))] flex justify-center"
          aria-hidden="true"
        >
          <span className="service-scroll-cue h-7 w-px bg-gradient-to-b from-gold/80 to-transparent" />
        </span>
      ) : (
        <span
          className="pointer-events-none absolute inset-x-0 bottom-[max(0.85rem,env(safe-area-inset-bottom))] text-center text-[0.65rem] font-bold tracking-wide text-muted/70"
          aria-hidden="true"
        >
          مرّر لمتابعة الصفحة
        </span>
      )}
    </article>
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
              'btn-radius border px-3.5 py-2 font-display text-sm font-bold transition-colors',
              isActive
                ? 'border-gold bg-ivory text-gold-dark'
                : 'border-border bg-white text-charcoal hover:border-gold hover:text-gold-dark',
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

function MobileServicesProgress({ total }: { total: number }) {
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    const panels = document.querySelectorAll<HTMLElement>('.services-page-panel')
    if (panels.length === 0) return

    const visibility = new Map<Element, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target, entry.intersectionRatio)
        }
        let bestIndex = 0
        let bestRatio = -1
        panels.forEach((panel, index) => {
          const ratio = visibility.get(panel) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestIndex = index
          }
        })
        if (bestRatio > 0.2) {
          setCurrent(bestIndex + 1)
        }
      },
      { threshold: [0.2, 0.4, 0.6, 0.8] },
    )

    panels.forEach((panel) => observer.observe(panel))
    return () => observer.disconnect()
  }, [total])

  return (
    <div
      className="pointer-events-none sticky top-[calc(3.5rem+env(safe-area-inset-top,0px))] z-20 flex justify-center py-2 lg:hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="rounded-sm border border-gold/30 bg-ivory/95 px-3 py-1 font-display text-xs font-bold tabular-nums tracking-wide text-gold-dark shadow-sm backdrop-blur-sm">
        {String(current).padStart(2, '0')}
        <span className="mx-1 text-muted/50">من</span>
        {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}

export function Services() {
  const reduce = useReducedMotion()
  const [category, setCategory] = useState<CategoryFilter>('all')
  useMobileServicesSnap()

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

  const total = filtered.length

  return (
    <section id="services" className="bg-ivory lg:bg-white lg:section-pad" aria-labelledby="services-heading">
      <div className="services-intro services-intro-panel container-editorial lg:section-pad lg:pb-0">
        <motion.div
          className="services-intro-copy mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center lg:mx-0 lg:items-start lg:text-start"
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
          <p className="mt-5 text-sm text-muted lg:hidden">مرّر لعرض كل خدمة في بطاقتها</p>
          <span
            className="service-scroll-cue mt-8 hidden h-8 w-px bg-gradient-to-b from-gold/80 to-transparent lg:!hidden max-lg:block"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <div className="hidden max-lg:block" role="list" aria-label="قائمة مجالات العمل">
        <MobileServicesProgress total={total} />
        {filtered.map((service, index) => (
          <MobileServicePanel
            key={service.id}
            service={service}
            index={index}
            total={total}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={category}
          className="container-editorial section-body hidden grid-cols-2 border-t border-border lg:grid xl:grid-cols-3"
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
              <div className="flex h-full flex-col gap-5 p-8 text-start transition-colors duration-300 hover:bg-ivory">
                <Link to={`/services/${service.slug}`} className="flex flex-col gap-5">
                  <ServiceCardContent service={service} />
                </Link>
                <div className="mt-auto flex flex-col gap-2 pt-2">
                  <a
                    href={contactHref(service.slug)}
                    className="inline-flex items-center justify-start gap-2 text-base font-bold text-gold-dark transition-colors hover:text-charcoal"
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
                    <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
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
