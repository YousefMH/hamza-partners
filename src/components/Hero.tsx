import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { appUrl } from '@/lib/paths'
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

      {/*
        Spacer matches the fixed mobile header so justify-center lands in the
        visible band (horizontal + vertical middle of the screen below chrome).
      */}
      <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col">
        <div className="h-12 shrink-0 sm:h-14 md:h-16 lg:h-[4.5rem]" aria-hidden="true" />
        <div className="container-editorial flex flex-1 flex-col items-center justify-center py-6 md:items-start md:justify-center md:py-10">
          <motion.div
            className="w-full max-w-xl text-center md:max-w-3xl md:text-start"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="flex justify-center md:justify-start">
              <Meander
                className="mb-3 w-36 opacity-80 sm:mb-4 sm:w-44 md:mb-8 md:w-full md:max-w-xs"
                tone="champagne"
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mb-2.5 font-display text-sm font-bold text-gold-champagne md:mb-5 md:text-base"
            >
              {siteConfig.firmNameAr}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              className="text-[clamp(1.55rem,5.8vw,4.1rem)] font-extrabold leading-[1.35] text-ivory"
            >
              خبرة قانونية راسخة
              <br />
              <span className="text-gold-champagne">ورؤية تصنع الفارق</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-3.5 max-w-md text-[0.9375rem] leading-[1.75] text-ivory/92 sm:mt-4 sm:text-base md:mx-0 md:mt-7 md:max-w-xl md:text-xl md:leading-[1.9]"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:mt-6 sm:flex-row sm:gap-3 md:mt-10 md:justify-start"
            >
              <Button
                href={appUrl("/#contact")}
                variant="inverse"
                size="md"
                className="w-full max-w-[16.5rem] sm:w-auto sm:max-w-none sm:px-8 sm:py-3.5"
              >
                {siteConfig.cta.book}
              </Button>
              <Button
                href={appUrl("/#services")}
                variant="ghost"
                size="md"
                className="w-full max-w-[16.5rem] sm:w-auto sm:max-w-none sm:px-8 sm:py-3.5"
              >
                {siteConfig.cta.discoverServices}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-8 bg-gradient-to-t from-ivory to-transparent sm:h-12 md:h-20"
        aria-hidden="true"
      />
    </section>
  )
}
