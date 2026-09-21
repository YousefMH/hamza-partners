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

export function Services() {
  const reduce = useReducedMotion()
  const total = services.length

  return (
    <section id="services" className="bg-white lg:section-pad" aria-labelledby="services-heading">
      <div className="container-editorial section-pad pb-6 lg:pb-0">
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
          <p className="mt-4 text-sm text-muted lg:hidden">مرّر لتصفح كل خدمة على حدة</p>
        </motion.div>
      </div>

      {/*
        Mobile / tablet: one full-viewport panel per service with scroll-snap.
        Desktop (lg+): classic editorial grid.
      */}
      <motion.ul
        className={cn(
          'services-snap-list',
          'lg:container-editorial lg:section-body lg:grid lg:grid-cols-2 lg:border-t lg:border-border xl:grid-cols-3',
        )}
        variants={readingStagger(reduce, staggerList)}
        initial={reduce ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportReadingLoose}
      >
        {services.map((service, index) => (
          <motion.li
            key={service.id}
            variants={readingVariants(reduce, fadeUp)}
            className={cn(
              'service-snap-panel group relative',
              'border-b border-border lg:odd:border-e xl:border-e xl:[&:nth-child(3n)]:border-e-0',
              index % 2 === 0 ? 'max-lg:bg-ivory' : 'max-lg:bg-white',
            )}
          >
            <Link
              to={`/services/${service.slug}`}
              className={cn(
                'relative flex h-full flex-col transition-colors duration-300',
                'max-lg:min-h-[100svh] max-lg:justify-center max-lg:gap-6 max-lg:px-6 max-lg:pb-14 max-lg:pt-[calc(3.5rem+1.5rem)] max-lg:text-center',
                'p-6 text-center md:gap-5 md:p-8 lg:gap-5 lg:text-start lg:hover:bg-ivory',
              )}
            >
              <div className="mb-1 flex w-full items-center justify-between gap-6 max-lg:mx-auto max-lg:mb-0 max-lg:max-w-sm">
                <span className="font-display text-base font-bold tracking-wide text-gold max-lg:text-lg">
                  {service.number}
                </span>
                <span className="font-display text-sm text-muted tabular-nums lg:hidden">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <ServiceIcon
                  name={service.icon}
                  className="hidden size-5 shrink-0 text-muted transition-colors group-hover:text-gold lg:block"
                />
              </div>
              <div className="mx-auto flex justify-center lg:hidden" aria-hidden="true">
                <ServiceIcon name={service.icon} className="size-8 text-gold-dark" />
              </div>

              <h3 className="font-display text-lg leading-[1.65] text-charcoal max-lg:mx-auto max-lg:max-w-sm max-lg:text-[clamp(1.45rem,5.5vw,1.85rem)] max-lg:leading-[1.45] md:text-xl">
                {service.title}
              </h3>

              <p className="body-copy text-base max-lg:mx-auto max-lg:max-w-sm max-lg:text-[1.05rem] max-lg:leading-[1.85]">
                {service.shortDescription}
              </p>

              <span className="mt-auto inline-flex items-center justify-center gap-3 pt-2 text-base font-bold text-gold-dark transition-colors group-hover:text-charcoal max-lg:pt-4 lg:justify-start">
                {siteConfig.cta.discoverMore}
                <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              </span>

              {/* Mobile scroll cue — not on the last panel */}
              {index < total - 1 && (
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center lg:hidden"
                  aria-hidden="true"
                >
                  <span className="service-scroll-cue h-8 w-px bg-gradient-to-b from-gold/80 to-transparent" />
                </span>
              )}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
