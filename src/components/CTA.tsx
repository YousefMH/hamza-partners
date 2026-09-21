import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { contactHref } from '@/lib/navigation'
import { trackEvent } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
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
  const whatsappHref = buildWhatsAppUrl({ source: 'cta' })

  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory" aria-labelledby="cta-heading">
      <div className="relative container-editorial py-[clamp(4.5rem,8vw,7.5rem)] text-center">
        <motion.div
          className="mx-auto max-w-2xl"
          variants={readingStagger(reduce, staggerContainer)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <motion.div variants={readingVariants(reduce, fadeUp)} className="mx-auto mb-8 max-w-xs md:mb-10">
            <Meander className="w-full" tone="champagne" />
          </motion.div>
          <motion.h2
            id="cta-heading"
            variants={readingVariants(reduce, fadeUp)}
            className="text-[clamp(1.85rem,3.6vw,2.85rem)] font-extrabold leading-[1.4] tracking-tight"
          >
            هل تحتاج إلى شريك قانوني يفهم أعمالك؟
          </motion.h2>
          <motion.p
            variants={readingVariants(reduce, fadeUpSoft)}
            className="mt-6 text-lg leading-[1.9] text-ivory/90 md:mt-7 md:text-xl"
          >
            تحدث مع فريقنا لمناقشة احتياجاتك القانونية والحصول على التوجيه المناسب.
          </motion.p>
          <motion.div
            variants={readingVariants(reduce, fadeUp)}
            className="mt-10 flex flex-wrap justify-center gap-4 md:mt-12 md:gap-5"
          >
            <Button
              href={contactHref()}
              variant="inverse"
              size="lg"
              onClick={() =>
                trackEvent('consultation_cta_click', { source: 'cta' })
              }
            >
              {siteConfig.cta.bookFull}
            </Button>
            <Button
              href={whatsappHref}
              variant="ghost"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: 'cta' })}
            >
              {siteConfig.cta.whatsapp}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
