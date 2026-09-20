import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { featuredService } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { Button } from '@/components/ui/Button'
import { ColumnRule, Meander, SectionLabel } from '@/components/Decorative/Ornaments'
import { clipReveal, fadeUp, staggerContainer } from '@/lib/motion'

export function FeaturedService() {
  return (
    <section
      className="relative overflow-hidden bg-warm-gray text-ivory"
      aria-labelledby="featured-heading"
    >
      <div className="absolute inset-0">
        <motion.img
          src={siteConfig.featuredImage}
          alt=""
          className="h-full w-full object-cover opacity-35"
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        />
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      <ColumnRule className="start-1/4 hidden lg:block" />
      <ColumnRule className="start-3/4 hidden lg:block" />

      <div className="relative container-editorial section-pad">
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>
              <span className="text-gold-champagne">الخدمة المميزة</span>
            </SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Meander className="mb-8 max-w-sm" tone="champagne" />
          </motion.div>
          <motion.p variants={fadeUp} className="mb-4 font-display text-sm tracking-[0.25em] text-gold">
            {featuredService.number}
          </motion.p>
          <motion.h2
            id="featured-heading"
            variants={fadeUp}
            className="text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-snug text-ivory"
          >
            {featuredService.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/75 md:text-lg"
          >
            {featuredService.description}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Button href="#contact" variant="inverse" size="lg">
              {siteConfig.cta.book}
            </Button>
            <Link
              to={`/services/${featuredService.slug}`}
              className="inline-flex items-center justify-center border border-ivory/30 px-8 py-3.5 font-display text-sm text-ivory transition-colors hover:border-gold-champagne hover:text-gold-champagne"
            >
              {siteConfig.cta.discoverMore}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
