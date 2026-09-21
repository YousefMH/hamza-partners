import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { useMobileServicesSnap } from '@/hooks/useMobileServicesSnap'
import {
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

function MobileServicePanel({
  service,
  index,
  total,
}: {
  service: (typeof services)[number]
  index: number
  total: number
}) {
  const isLast = index === total - 1

  return (
    <article
      role="listitem"
      className={cn(
        'services-page-panel relative flex flex-col justify-center px-5',
        isLast && 'services-page-panel--last',
        index % 2 === 0 ? 'bg-ivory' : 'bg-[#f5f3ed]',
      )}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group services-mobile-card mx-auto flex w-full max-w-[22rem] flex-col"
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <span className="font-display text-sm font-bold tabular-nums tracking-wide text-gold-dark">
            {service.number}
          </span>
          <span className="text-[0.7rem] font-bold tabular-nums tracking-wide text-muted/80">
            {String(index + 1).padStart(2, '0')}
            <span className="mx-1 text-border">/</span>
            {String(total).padStart(2, '0')}
          </span>
        </div>

        <div
          className="mb-5 flex size-14 items-center justify-center rounded-full border border-gold/35 bg-white/70 text-gold-dark"
          aria-hidden="true"
        >
          <ServiceIcon name={service.icon} className="size-6" />
        </div>

        <h3 className="font-display text-[clamp(1.35rem,5.2vw,1.7rem)] leading-[1.5] text-charcoal text-balance">
          {service.title}
        </h3>

        <span
          className="my-4 block h-px w-10 bg-gradient-to-l from-gold to-transparent"
          aria-hidden="true"
        />

        <p className="text-[1.02rem] leading-[1.95] text-muted text-pretty">
          {service.shortDescription}
        </p>

        <span className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm border border-charcoal/15 bg-white/80 px-4 text-[0.95rem] font-bold text-charcoal transition-colors group-hover:border-gold group-hover:text-gold-dark">
          {siteConfig.cta.discoverMore}
          <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </Link>

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
      <div className="services-intro container-editorial section-pad pb-4 lg:pb-0">
        <motion.div
          className="max-w-2xl"
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
          <p className="mt-4 text-sm text-muted lg:hidden">مرّر — كل خدمة على شاشة كاملة</p>
        </motion.div>
      </div>

      {/*
        Mobile: one viewport per service in document flow.
        Last panel uses softer snap-stop so leaving into the next section stays smooth.
      */}
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

      {/* Desktop editorial grid */}
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
