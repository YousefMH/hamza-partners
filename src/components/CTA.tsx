import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { appUrl } from '@/lib/paths'
import { Button } from '@/components/ui/Button'
import { Meander } from '@/components/Decorative/Ornaments'
import {
  fadeUp,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerContainer,
  viewportReading,
} from '@/lib/motion'

export function CTA() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory" aria-labelledby="cta-heading">
      <div className="relative container-editorial section-pad text-center">
        <motion.div
          className="mx-auto max-w-2xl"
          variants={readingStagger(reduce, staggerContainer)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <motion.div variants={readingVariants(reduce, fadeUp)} className="mx-auto mb-6 max-w-xs md:mb-8">
            <Meander className="w-full" tone="champagne" />
          </motion.div>
          <motion.h2
            id="cta-heading"
            variants={readingVariants(reduce, fadeUp)}
            className="text-[clamp(1.65rem,3.2vw,2.5rem)] font-extrabold leading-[1.45]"
          >
            هل تحتاج إلى شريك قانوني يفهم أعمالك؟
          </motion.h2>
          <motion.p
            variants={readingVariants(reduce, fadeUpSoft)}
            className="mt-5 text-lg leading-[1.9] text-ivory/90 md:mt-6 md:text-xl"
          >
            تحدث مع فريقنا لمناقشة احتياجاتك القانونية والحصول على التوجيه المناسب.
          </motion.p>
          <motion.div
            variants={readingVariants(reduce, fadeUp)}
            className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10"
          >
            <Button href={appUrl('/#contact')} variant="inverse" size="lg">
              {siteConfig.cta.bookFull}
            </Button>
            <Button href={appUrl('/#contact')} variant="ghost" size="lg">
              {siteConfig.cta.contact}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
