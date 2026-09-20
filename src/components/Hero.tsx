import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { Button } from '@/components/ui/Button'
import { ColumnRule, Meander } from '@/components/Decorative/Ornaments'
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
        <div className="absolute inset-0 bg-gradient-to-l from-charcoal/95 via-charcoal/85 to-charcoal/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40" />
        <div className="marble-texture absolute inset-0 opacity-30 mix-blend-soft-light" />
      </div>

      <ColumnRule className="start-[12%] hidden md:block" />
      <ColumnRule className="start-[88%] hidden lg:block" />
      <div
        className="pointer-events-none absolute inset-y-16 start-[min(6vw,4rem)] hidden w-px bg-gold/35 md:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-24 start-[calc(min(6vw,4rem)+10px)] hidden w-px bg-gold/15 md:block"
        aria-hidden="true"
      />

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
            className="mb-5 font-display text-sm tracking-[0.25em] text-gold-champagne"
          >
            {siteConfig.firmNameAr}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="text-[clamp(2.35rem,6vw,4.75rem)] font-semibold leading-[1.2] text-ivory"
          >
            خبرة قانونية راسخة
            <br />
            <span className="text-gold-champagne">ورؤية تصنع الفارق</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Button href="#contact" variant="inverse" size="lg">
              {siteConfig.cta.book}
            </Button>
            <Button href="#services" variant="ghost" size="lg">
              {siteConfig.cta.discoverServices}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  )
}
