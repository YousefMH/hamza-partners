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
} from '@/lib/motion'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="hero-section relative flex min-h-[100svh] flex-col bg-charcoal text-ivory"
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

      <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col">
        <div
          className="h-14 shrink-0 sm:h-14 md:h-16 lg:h-[4.5rem]"
          aria-hidden="true"
        />
        <div className="container-editorial flex flex-1 flex-col items-center justify-center py-8 pb-16 sm:py-10 sm:pb-20 md:items-start md:py-10 md:pb-20 lg:py-12 lg:pb-24">
          <motion.div
            className="hero-copy w-full max-w-xl text-center md:max-w-2xl md:text-start lg:max-w-3xl"
            variants={readingStagger(reduce, staggerContainer)}
            initial={reduce ? false : 'hidden'}
            animate="visible"
          >
            <motion.div
              variants={readingVariants(reduce, fadeUp)}
              data-hero-meander
              className="flex justify-center md:justify-start"
            >
              <Meander
                className="mb-3 w-36 opacity-80 sm:mb-4 sm:w-44 md:mb-5 md:w-48 lg:mb-8 lg:w-full lg:max-w-xs"
                tone="champagne"
              />
            </motion.div>

            <motion.p
              variants={readingVariants(reduce, fadeUp)}
              className="mb-2.5 font-display text-sm font-bold text-gold-champagne md:mb-3 lg:mb-5 lg:text-base"
            >
              {siteConfig.firmNameAr}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={readingVariants(reduce, fadeUp)}
              className="text-[clamp(1.6rem,4.2vw+0.35rem,2.65rem)] font-extrabold leading-[1.35] text-ivory lg:text-[clamp(2.35rem,4vw,4.1rem)] lg:leading-[1.35]"
            >
              <span className="text-gold-champagne">{siteConfig.heroHeadline}</span>
              <br />
              {siteConfig.heroHeadlineAccent}
            </motion.h1>

            <motion.p
              variants={readingVariants(reduce, fadeUpSoft)}
              className="mx-auto mt-3.5 max-w-md text-[0.9375rem] leading-[1.75] text-ivory/92 sm:mt-4 sm:text-base md:mx-0 md:mt-5 md:max-w-xl md:text-[1.0625rem] md:leading-[1.8] lg:mt-7 lg:text-xl lg:leading-[1.9]"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              variants={readingVariants(reduce, fadeUp)}
              className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3 md:mt-7 md:justify-start lg:mt-10"
            >
              <Button
                href={appUrl('/#contact')}
                variant="inverse"
                size="md"
                className="w-full max-w-[16.5rem] sm:w-auto sm:max-w-none sm:px-7 sm:py-3 lg:px-8 lg:py-3.5"
              >
                {siteConfig.cta.book}
              </Button>
              <Button
                href={appUrl('/#services')}
                variant="ghost"
                size="md"
                className="w-full max-w-[16.5rem] sm:w-auto sm:max-w-none sm:px-7 sm:py-3 lg:px-8 lg:py-3.5"
              >
                {siteConfig.cta.discoverServices}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-14 bg-gradient-to-t from-ivory via-ivory/80 to-transparent sm:h-16 md:h-20 lg:h-24"
        aria-hidden="true"
      />
    </section>
  )
}
