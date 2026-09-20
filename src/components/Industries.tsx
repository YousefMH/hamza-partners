import { motion } from 'framer-motion'
import { industries } from '@/data/industries'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function Industries() {
  return (
    <section className="section-pad bg-white" aria-labelledby="industries-heading">
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>القطاعات</SectionLabel>
          </motion.div>
          <motion.h2
            id="industries-heading"
            variants={fadeUp}
            className="text-[clamp(1.85rem,3.5vw,3rem)] text-charcoal"
          >
            نخدم قطاعات متعددة
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-5 max-w-[7rem]">
            <DoubleLine />
          </motion.div>
        </motion.div>

        <motion.ul
          className="flex flex-wrap gap-x-2 gap-y-3 md:gap-x-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {industries.map((industry) => (
            <motion.li key={industry.id} variants={fadeUp}>
              <span className="inline-block border border-border bg-ivory px-5 py-3 font-display text-base text-charcoal transition-colors duration-300 hover:border-gold hover:text-gold-dark md:px-6 md:text-lg">
                {industry.name}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
