import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { Button } from '@/components/ui/Button'
import { Meander } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-charcoal text-ivory"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <motion.img
          src={siteConfig.heroImage}
          alt=""
          className="h-full w-full object-cover opacity-45"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-charcoal/95 via-charcoal/85 to-charcoal/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/45" />
        <div className="marble-texture absolute inset-0 opacity-25 mix-blend-soft-light" />
      </div>

      <div className="relative container-editorial flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:justify-center md:pb-24 md:pt-28">
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <Meander className="mb-8 max-w-xs opacity-80" tone="champagne" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mb-5 font-display text-base font-bold text-gold-champagne"
          >
            {siteConfig.firmNameAr}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="text-[clamp(2.15rem,5.2vw,4.1rem)] font-extrabold leading-[1.35] text-ivory"
          >
            خبرة قانونية راسخة
            <br />
            <span className="text-gold-champagne">ورؤية تصنع الفارق</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-[1.9] text-ivory/92 md:text-xl"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Button href="/#contact" variant="inverse" size="lg">
              {siteConfig.cta.book}
            </Button>
            <Button href="/#services" variant="ghost" size="lg">
              {siteConfig.cta.discoverServices}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  )
}
