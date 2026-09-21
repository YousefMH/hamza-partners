import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
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
  index,
  total,
  mobile,
}: {
  service: (typeof services)[number]
  index: number
  total: number
  mobile?: boolean
}) {
  return (
    <>
      <div
        className={cn(
          'mb-1 flex w-full items-center justify-between gap-6',
          mobile && 'mx-auto mb-0 max-w-sm',
        )}
      >
        <span
          className={cn(
            'font-display font-bold tracking-wide text-gold',
            mobile ? 'text-lg' : 'text-base',
          )}
        >
          {service.number}
        </span>
        {mobile ? (
          <span className="font-display text-sm text-muted tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        ) : (
          <ServiceIcon
            name={service.icon}
            className="size-5 shrink-0 text-muted transition-colors group-hover:text-gold"
          />
        )}
      </div>

      {mobile && (
        <div className="mx-auto flex justify-center" aria-hidden="true">
          <ServiceIcon name={service.icon} className="size-8 text-gold-dark" />
        </div>
      )}

      <h3
        className={cn(
          'font-display text-charcoal',
          mobile
            ? 'mx-auto max-w-sm text-[clamp(1.45rem,5.5vw,1.85rem)] leading-[1.45]'
            : 'text-lg leading-[1.65] md:text-xl',
        )}
      >
        {service.title}
      </h3>

      <p
        className={cn(
          'body-copy text-base',
          mobile && 'mx-auto max-w-sm text-[1.05rem] leading-[1.85]',
        )}
      >
        {service.shortDescription}
      </p>

      <span
        className={cn(
          'mt-auto inline-flex items-center gap-3 pt-2 text-base font-bold text-gold-dark transition-colors group-hover:text-charcoal',
          mobile ? 'justify-center pt-4' : 'justify-center lg:justify-start',
        )}
      >
        {siteConfig.cta.discoverMore}
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </>
  )
}

export function Services() {
  const reduce = useReducedMotion()
  const total = services.length

  return (
    <section id="services" className="bg-ivory lg:bg-white lg:section-pad" aria-labelledby="services-heading">
      <div className="container-editorial section-pad pb-4 lg:pb-0">
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
          <p className="mt-4 text-sm text-muted lg:hidden">مرّر داخل القائمة لعرض كل خدمة بشاشة كاملة</p>
        </motion.div>
      </div>

      {/*
        Mobile: self-contained snap scroller (does NOT touch document scroll).
        Panels stay fully opaque — no entrance fade that leaves blank white screens.
      */}
      <div className="hidden max-lg:block">
        <div
          className="services-mobile-scroller mx-auto max-w-lg border-y border-border"
          role="region"
          aria-label="قائمة مجالات العمل"
        >
          {services.map((service, index) => (
            <article
              key={service.id}
              className={cn(
                'services-mobile-panel relative flex flex-col justify-center gap-5 px-6 pb-12 pt-8 text-center',
                index % 2 === 0 ? 'bg-ivory' : 'bg-[#f3f1ea]',
              )}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-center gap-5"
              >
                <ServiceCardContent
                  service={service}
                  index={index}
                  total={total}
                  mobile
                />
              </Link>
              {index < total - 1 && (
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-1"
                  aria-hidden="true"
                >
                  <span className="text-[0.65rem] font-bold tracking-wide text-gold-dark/70">
                    التالي
                  </span>
                  <span className="service-scroll-cue h-6 w-px bg-gradient-to-b from-gold to-transparent" />
                </span>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Desktop editorial grid */}
      <motion.ul
        className="container-editorial section-body hidden grid-cols-2 border-t border-border lg:grid xl:grid-cols-3"
        variants={readingStagger(reduce, staggerList)}
        initial={reduce ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportReadingLoose}
      >
        {services.map((service, index) => (
          <motion.li
            key={service.id}
            variants={readingVariants(reduce, fadeUp)}
            className="group border-b border-border odd:border-e xl:border-e xl:[&:nth-child(3n)]:border-e-0"
          >
            <Link
              to={`/services/${service.slug}`}
              className="flex h-full flex-col gap-5 p-8 text-start transition-colors duration-300 hover:bg-ivory"
            >
              <ServiceCardContent service={service} index={index} total={total} />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
