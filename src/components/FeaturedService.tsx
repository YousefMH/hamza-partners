import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { featuredService } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { appUrl } from '@/lib/paths'
import { Button } from '@/components/ui/Button'
import { Meander, SectionLabel } from '@/components/Decorative/Ornaments'
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
          className="h-full w-full object-cover opacity-30"
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/50" />
      </div>

      <div className="relative container-editorial section-pad">
        <motion.div
          className="mx-auto max-w-3xl text-center md:mx-0 md:text-start"
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
          <motion.div variants={fadeUp} className="flex justify-center md:justify-start">
            <Meander className="mb-6 w-full max-w-sm" tone="champagne" />
          </motion.div>
          <motion.p variants={fadeUp} className="mb-3 font-display text-base font-bold text-gold">
            {featuredService.number}
          </motion.p>
          <motion.h2
            id="featured-heading"
            variants={fadeUp}
            className="text-[clamp(1.75rem,3.8vw,3rem)] font-extrabold leading-[1.45] text-ivory"
          >
            {featuredService.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-[1.9] text-ivory/90 md:mt-7 md:text-xl"
          >
            {featuredService.description}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10 md:justify-start">
            <Button href={appUrl("/#contact")} variant="inverse" size="lg">
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
