import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, Building2, Scale, ShieldCheck, type LucideIcon } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { trustIndicators } from '@/data/content'
import { appUrl } from '@/lib/paths'
import { Button } from '@/components/ui/Button'
import { Meander } from '@/components/Decorative/Ornaments'
import {
  fadeUp,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerContainer,
  staggerList,
} from '@/lib/motion'
import { cn } from '@/lib/cn'

const trustIcons: Record<(typeof trustIndicators)[number]['icon'], LucideIcon> = {
  scale: Scale,
  briefcase: Briefcase,
  'building-2': Building2,
  'shield-check': ShieldCheck,
}

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
          className="h-full w-full object-cover opacity-40"
          initial={reduce ? false : { scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-charcoal/96 via-charcoal/88 to-charcoal/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/50" />
        <div className="marble-texture absolute inset-0 opacity-20 mix-blend-soft-light" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col">
        <div
          className="h-14 shrink-0 sm:h-14 md:h-16 lg:h-[4.5rem]"
          aria-hidden="true"
        />

        {/* Primary copy — grows to fill space above the trust band */}
        <div className="hero-main container-editorial flex flex-1 flex-col items-center justify-center py-8 sm:py-10 md:items-start md:py-10 lg:py-12">
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

        {/* Trust band — same charcoal language as the hero, not a separate card */}
        <motion.div
          className="hero-trust shrink-0 border-t border-gold-champagne/25 bg-gradient-to-t from-charcoal to-charcoal/40"
          variants={readingStagger(reduce, staggerList)}
          initial={reduce ? false : 'hidden'}
          animate="visible"
          aria-label="مرتكزات العمل"
        >
          <div className="container-editorial">
            <ul className="grid grid-cols-2 lg:grid-cols-4">
              {trustIndicators.map((item, index) => {
                const Icon = trustIcons[item.icon]

                return (
                  <motion.li
                    key={item.label}
                    variants={readingVariants(reduce, fadeUpSoft)}
                    className={cn(
                      'flex flex-col items-center gap-2.5 px-3 py-5 text-center sm:gap-3 sm:px-4 sm:py-6 md:items-start md:px-5 md:py-7 md:text-start lg:px-6',
                      index % 2 === 0 && 'border-e border-gold-champagne/15',
                      index < 2 && 'border-b border-gold-champagne/15 lg:border-b-0',
                      index < 3 && 'lg:border-e lg:border-gold-champagne/15',
                    )}
                  >
                    <Icon
                      className="size-4 text-gold-champagne sm:size-[1.125rem]"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                    <p className="font-display text-[0.8125rem] leading-snug text-ivory/90 sm:text-sm md:text-[0.9375rem] md:leading-relaxed">
                      {item.label}
                    </p>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
