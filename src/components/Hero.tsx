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
      className="relative flex min-h-[100svh] flex-col bg-charcoal text-ivory"
      aria-labelledby="hero-heading"
    >
      {/* Clip image zoom here only — never clip the hero copy/CTAs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.img
          src={siteConfig.heroImage}
          alt=""
          className="h-full w-full object-cover opacity-45"
          initial={reduce ? false : { scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-charcoal/95 via-charcoal/85 to-charcoal/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/45" />
        <div className="marble-texture absolute inset-0 opacity-25 mix-blend-soft-light" />
      </div>

      <div className="relative z-10 container-editorial flex flex-1 flex-col justify-end pb-8 pt-[calc(3.75rem+env(safe-area-inset-top,0px))] sm:pb-10 sm:pt-28 md:justify-center md:pb-20 md:pt-28">
        <motion.div
          className="max-w-3xl pb-2 sm:pb-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <Meander className="mb-4 w-full max-w-[12rem] opacity-80 sm:mb-6 sm:max-w-xs md:mb-8" tone="champagne" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mb-3 font-display text-sm font-bold text-gold-champagne sm:mb-4 sm:text-base md:mb-5"
          >
            {siteConfig.firmNameAr}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="text-[clamp(1.85rem,7.2vw,4.1rem)] font-extrabold leading-[1.3] text-ivory sm:leading-[1.35]"
          >
            خبرة قانونية راسخة
            <br />
            <span className="text-gold-champagne">ورؤية تصنع الفارق</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-base leading-[1.75] text-ivory/92 sm:mt-6 sm:text-lg sm:leading-[1.9] md:mt-7 md:text-xl"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-row flex-wrap gap-3 sm:mt-8 sm:gap-4 md:mt-10"
          >
            <Button href="/#contact" variant="inverse" size="md" className="sm:px-8 sm:py-3.5">
              {siteConfig.cta.book}
            </Button>
            <Button href="/#services" variant="ghost" size="md" className="sm:px-8 sm:py-3.5">
              {siteConfig.cta.discoverServices}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Short fade into the next section — kept below the CTA band */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-10 bg-gradient-to-t from-ivory to-transparent sm:h-14 md:h-20"
        aria-hidden="true"
      />
    </section>
  )
}
