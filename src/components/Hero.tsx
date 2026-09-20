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

      <div className="relative z-10 container-editorial flex flex-1 flex-col justify-start pt-[4.75rem] pb-8 sm:justify-center sm:pb-10 sm:pt-24 md:pb-20 md:pt-28">
        <motion.div
          className="mx-auto w-full max-w-3xl text-center md:mx-0 md:max-w-3xl md:text-start"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="flex justify-center md:justify-start">
            <Meander className="mb-4 w-40 opacity-80 sm:mb-5 sm:w-52 md:mb-8 md:w-full md:max-w-xs" tone="champagne" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mb-3 font-display text-sm font-bold text-gold-champagne sm:text-[0.95rem] md:mb-5 md:text-base"
          >
            {siteConfig.firmNameAr}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="text-[clamp(1.65rem,6.2vw,4.1rem)] font-extrabold leading-[1.35] text-ivory"
          >
            خبرة قانونية راسخة
            <br />
            <span className="text-gold-champagne">ورؤية تصنع الفارق</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-[1.8] text-ivory/92 sm:mt-5 sm:text-base md:mx-0 md:mt-7 md:max-w-xl md:text-xl md:leading-[1.9]"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row sm:flex-wrap md:mt-10 md:justify-start"
          >
            <Button href="/#contact" variant="inverse" size="md" className="w-full max-w-xs sm:w-auto sm:px-8 sm:py-3.5">
              {siteConfig.cta.book}
            </Button>
            <Button href="/#services" variant="ghost" size="md" className="w-full max-w-xs sm:w-auto sm:px-8 sm:py-3.5">
              {siteConfig.cta.discoverServices}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-10 bg-gradient-to-t from-ivory to-transparent sm:h-14 md:h-20"
        aria-hidden="true"
      />
    </section>
  )
}
