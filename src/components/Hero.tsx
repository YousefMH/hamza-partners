import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { trustIndicators } from '@/data/content'
import { appUrl } from '@/lib/paths'
import { Button } from '@/components/ui/Button'
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
      className="hero-section relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal text-ivory"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <motion.img
          src={siteConfig.heroImage}
          alt=""
          className="h-full w-full object-cover object-[center_28%] opacity-55"
          initial={reduce ? false : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/35" />
        <div className="absolute inset-0 bg-gradient-to-l from-charcoal/75 via-charcoal/20 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col">
        <div className="h-14 shrink-0 md:h-16 lg:h-[4.5rem]" aria-hidden="true" />

        <div className="hero-main container-editorial flex flex-1 flex-col justify-center py-12 md:py-16">
          <motion.div
            className="hero-copy mx-auto w-full max-w-md text-center md:mx-0 md:max-w-2xl md:text-start"
            variants={readingStagger(reduce, staggerContainer)}
            initial={reduce ? false : 'hidden'}
            animate="visible"
          >
            <motion.p
              variants={readingVariants(reduce, fadeUp)}
              className="mb-4 font-display text-sm font-bold tracking-wide text-gold-champagne md:mb-5 md:text-[0.95rem]"
            >
              {siteConfig.heroHeadline}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={readingVariants(reduce, fadeUp)}
              className="font-display text-[clamp(2.5rem,9vw,3.5rem)] font-extrabold leading-[1.2] text-ivory md:text-[clamp(3rem,5.2vw,4.35rem)] md:leading-[1.15]"
            >
              {siteConfig.firmNameAr}
            </motion.h1>

            <motion.p
              variants={readingVariants(reduce, fadeUpSoft)}
              className="mx-auto mt-5 max-w-xs text-[1.08rem] leading-[1.8] text-ivory/90 md:mx-0 md:mt-6 md:max-w-lg md:text-[1.2rem] md:leading-[1.85]"
            >
              {siteConfig.heroHeadlineAccent}
            </motion.p>

            <motion.div
              variants={readingVariants(reduce, fadeUp)}
              className="mt-9 flex flex-col items-stretch gap-3.5 sm:mt-10 sm:flex-row sm:items-center sm:justify-center md:justify-start"
            >
              <Button
                href={appUrl('/#contact')}
                variant="inverse"
                size="lg"
                className="w-full sm:w-auto"
              >
                {siteConfig.cta.book}
              </Button>
              <a
                href={appUrl('/#services')}
                className="inline-flex min-h-11 items-center justify-center px-2 text-[0.95rem] font-bold text-ivory/75 transition-colors hover:text-gold-champagne"
              >
                {siteConfig.cta.discoverServices}
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hero-trust hidden shrink-0 border-t border-ivory/10 sm:block"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.4 }}
          aria-label="مرتكزات العمل"
        >
          <div className="container-editorial overflow-x-auto py-3.5 [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible md:py-4 [&::-webkit-scrollbar]:hidden">
            <ul className="mx-auto flex w-max max-w-none items-center px-1 md:mx-0 md:w-auto md:max-w-full md:flex-wrap md:px-0">
              {trustIndicators.map((item, index) => (
                <li key={item.label} className="flex items-center">
                  {index > 0 && (
                    <span
                      className="mx-3 h-3 w-px shrink-0 bg-gold-champagne/30 md:mx-5"
                      aria-hidden="true"
                    />
                  )}
                  <span className="whitespace-nowrap font-display text-[0.75rem] text-ivory/70 md:text-[0.8125rem]">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
