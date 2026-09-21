import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { useMobileServicesSnap } from '@/hooks/useMobileServicesSnap'
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

function ServiceCardContent({
  service,
}: {
  service: (typeof services)[number]
}) {
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

      <span className="mt-auto inline-flex items-center justify-center gap-3 pt-2 text-base font-bold text-gold-dark transition-colors group-hover:text-charcoal lg:justify-start">
        {siteConfig.cta.discoverMore}
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
      </span>
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
  service: (typeof services)[number]
  index: number
  total: number
}) {
  const reduce = useReducedMotion()
  const isLast = index === total - 1

  return (
    <article
      role="listitem"
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
        <Link
          to={`/services/${service.slug}`}
          className="group services-mobile-card flex w-full flex-col"
        >
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

          <span className="btn-radius mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-charcoal/12 bg-ivory px-4 text-[0.95rem] font-bold text-charcoal transition-colors group-hover:border-gold group-hover:bg-white group-hover:text-gold-dark">
            {siteConfig.cta.discoverMore}
            <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" />
          </span>
        </Link>
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

export function Services() {
  const reduce = useReducedMotion()
  const total = services.length
  useMobileServicesSnap()

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
          <p className="mt-5 text-sm text-muted lg:hidden">مرّر لعرض كل خدمة في بطاقتها</p>
          <span
            className="service-scroll-cue mt-8 hidden h-8 w-px bg-gradient-to-b from-gold/80 to-transparent lg:!hidden max-lg:block"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <div className="hidden max-lg:block" role="list" aria-label="قائمة مجالات العمل">
        {services.map((service, index) => (
          <MobileServicePanel
            key={service.id}
            service={service}
            index={index}
            total={total}
          />
        ))}
      </div>

      <motion.ul
        className="container-editorial section-body hidden grid-cols-2 border-t border-border lg:grid xl:grid-cols-3"
        variants={readingStagger(reduce, staggerList)}
        initial={reduce ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportReadingLoose}
      >
        {services.map((service) => (
          <motion.li
            key={service.id}
            variants={readingVariants(reduce, fadeUp)}
            className="group border-b border-border odd:border-e xl:border-e xl:[&:nth-child(3n)]:border-e-0"
          >
            <Link
              to={`/services/${service.slug}`}
              className="flex h-full flex-col gap-5 p-8 text-start transition-colors duration-300 hover:bg-ivory"
            >
              <ServiceCardContent service={service} />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
