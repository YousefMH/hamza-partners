import { motion, useReducedMotion } from 'framer-motion'
import { industries } from '@/data/industries'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import {
  fadeUp,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerContainer,
  staggerList,
  viewportReading,
} from '@/lib/motion'

export function Industries() {
  const reduce = useReducedMotion()

  return (
    <section className="section-pad bg-white" aria-labelledby="industries-heading">
      <div className="container-editorial">
        <motion.div
          variants={readingStagger(reduce, staggerContainer)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
          className="mb-0"
        >
          <motion.div variants={readingVariants(reduce, fadeUp)}>
            <SectionLabel>القطاعات</SectionLabel>
          </motion.div>
          <motion.h2
            id="industries-heading"
            variants={readingVariants(reduce, fadeUp)}
            className="section-title"
          >
            نخدم قطاعات متعددة
          </motion.h2>
          <motion.div variants={readingVariants(reduce, fadeUp)} className="section-rule">
            <DoubleLine />
          </motion.div>
        </motion.div>

        <motion.ul
          className="section-body flex flex-wrap justify-center gap-x-2.5 gap-y-3 md:justify-start md:gap-x-3"
          variants={readingStagger(reduce, staggerList)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          {industries.map((industry) => (
            <motion.li key={industry.id} variants={readingVariants(reduce, fadeUpSoft)}>
              <span className="inline-block border border-border bg-ivory px-5 py-3.5 font-display text-base leading-relaxed text-charcoal transition-colors duration-300 hover:border-gold hover:text-gold-dark md:px-6 md:text-lg">
                {industry.name}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
