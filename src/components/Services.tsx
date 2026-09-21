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

export function Services() {
  const reduce = useReducedMotion()

  return (
    <section id="services" className="section-pad bg-white" aria-labelledby="services-heading">
      <div className="container-editorial">
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
        </motion.div>

        <motion.ul
          className="section-body grid border-t border-border md:grid-cols-2 xl:grid-cols-3"
          variants={readingStagger(reduce, staggerList)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReadingLoose}
        >
          {services.map((service) => (
            <motion.li
              key={service.id}
              variants={readingVariants(reduce, fadeUp)}
              className="group border-b border-border md:odd:border-e xl:border-e xl:[&:nth-child(3n)]:border-e-0"
            >
              <Link
                to={`/services/${service.slug}`}
                className="flex h-full flex-col gap-5 p-6 text-center transition-colors duration-300 hover:bg-ivory md:gap-5 md:p-8 md:text-start"
              >
                <div className="mb-1 flex w-full items-center justify-between gap-8 px-0.5">
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
                <span className="mt-auto inline-flex items-center justify-center gap-3 pt-2 text-base font-bold text-gold-dark transition-colors group-hover:text-charcoal md:justify-start">
                  {siteConfig.cta.discoverMore}
                  <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
