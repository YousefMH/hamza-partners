import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { featuredService, getServiceConsultLabel } from '@/data/services'
import { contactHref } from '@/lib/navigation'
import { trackEvent } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'
import { Meander, SectionLabel } from '@/components/Decorative/Ornaments'
import { Link } from 'react-router-dom'
import {
  clipReveal,
  fadeUp,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerContainer,
  viewportReading,
} from '@/lib/motion'

export function FeaturedService() {
  const reduce = useReducedMotion()
  const consultLabel = getServiceConsultLabel(featuredService)

  return (
    <section
      className="relative overflow-hidden bg-warm-gray text-ivory"
      aria-labelledby="featured-heading"
    >
      <div className="absolute inset-0">
        <motion.img
          src={siteConfig.featuredImage}
          alt=""
          className="h-full w-full object-cover opacity-30"
          variants={readingVariants(reduce, clipReveal)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/50" />
      </div>

      <div className="relative container-editorial section-pad">
        <motion.div
          className="mx-auto max-w-3xl text-center md:mx-0 md:text-start"
          variants={readingStagger(reduce, staggerContainer)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <motion.div variants={readingVariants(reduce, fadeUp)}>
            <SectionLabel>
              <span className="text-gold-champagne">الخدمة المميزة</span>
            </SectionLabel>
          </motion.div>
          <motion.div
            variants={readingVariants(reduce, fadeUp)}
            className="flex justify-center md:justify-start"
          >
            <Meander className="mb-6 w-full max-w-sm" tone="champagne" />
          </motion.div>
          <motion.p
            variants={readingVariants(reduce, fadeUp)}
            className="mb-4 font-display text-sm font-bold tracking-[0.18em] text-gold md:mb-5"
          >
            {featuredService.number}
          </motion.p>
          <motion.h2
            id="featured-heading"
            variants={readingVariants(reduce, fadeUp)}
            className="text-[clamp(1.85rem,4vw,3.15rem)] font-extrabold leading-[1.4] tracking-tight text-ivory"
          >
            {featuredService.title}
          </motion.h2>
          <motion.p
            variants={readingVariants(reduce, fadeUpSoft)}
            className="mt-7 max-w-2xl text-lg leading-[1.9] text-ivory/90 md:mt-8 md:text-xl"
          >
            {featuredService.description}
          </motion.p>
          <motion.div
            variants={readingVariants(reduce, fadeUp)}
            className="mt-10 flex flex-wrap justify-center gap-4 md:mt-12 md:justify-start md:gap-5"
          >
            <Button
              href={contactHref(featuredService.slug)}
              variant="inverse"
              size="lg"
              onClick={() => {
                trackEvent('service_consultation_click', {
                  service: featuredService.slug,
                  source: 'featured-service',
                })
                trackEvent('consultation_cta_click', {
                  source: 'featured-service',
                  service: featuredService.slug,
                })
              }}
            >
              {consultLabel}
            </Button>
            <Link
              to={`/services/${featuredService.slug}`}
              className="btn-radius inline-flex items-center justify-center border border-ivory/30 px-8 py-3.5 font-display text-sm text-ivory transition-colors hover:border-gold-champagne hover:text-gold-champagne"
            >
              {siteConfig.cta.discoverMore}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
