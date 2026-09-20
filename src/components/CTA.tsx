import { motion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { Button } from '@/components/ui/Button'
import { Meander } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory" aria-labelledby="cta-heading">
      <div className="relative container-editorial section-pad text-center">
        <motion.div
          className="mx-auto max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.div variants={fadeUp} className="mx-auto mb-6 max-w-xs md:mb-8">
            <Meander tone="champagne" />
          </motion.div>
          <motion.h2
            id="cta-heading"
            variants={fadeUp}
            className="text-[clamp(1.65rem,3.2vw,2.5rem)] font-extrabold leading-[1.45]"
          >
            هل تحتاج إلى شريك قانوني يفهم أعمالك؟
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-[1.9] text-ivory/90 md:mt-6 md:text-xl">
            تحدث مع فريقنا لمناقشة احتياجاتك القانونية والحصول على التوجيه المناسب.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10">
            <Button href="/#contact" variant="inverse" size="lg">
              {siteConfig.cta.bookFull}
            </Button>
            <Button href="/#contact" variant="ghost" size="lg">
              {siteConfig.cta.contact}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
