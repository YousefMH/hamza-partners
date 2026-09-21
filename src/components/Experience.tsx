import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '@/data/experience'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import {
  accentPop,
  fadeStart,
  fadeUp,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerContainer,
  staggerReading,
  viewportReading,
} from '@/lib/motion'

export function Experience() {
  const reduce = useReducedMotion()

  return (
    <section id="experience" className="section-pad bg-white" aria-labelledby="experience-heading">
      <div className="container-editorial">
        <motion.div
          variants={readingStagger(reduce, staggerContainer)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <motion.div variants={readingVariants(reduce, fadeUp)}>
            <SectionLabel>المحفظة</SectionLabel>
          </motion.div>
          <motion.h2
            id="experience-heading"
            variants={readingVariants(reduce, fadeUp)}
            className="section-title"
          >
            خبراتنا
          </motion.h2>
          <motion.div variants={readingVariants(reduce, fadeUp)} className="section-rule">
            <DoubleLine />
          </motion.div>
          <motion.p variants={readingVariants(reduce, fadeUpSoft)} className="lede">
            موضوعات خبرة مجهولة الهوية — دون ذكر عملاء أو نتائج محددة.
          </motion.p>
        </motion.div>

        <motion.ul
          className="section-body grid gap-0 border-t border-border md:grid-cols-2"
          variants={readingStagger(reduce, staggerReading)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          {experience.map((item, index) => (
            <motion.li
              key={item.id}
              variants={readingStagger(reduce, staggerReading)}
              className="border-b border-border p-6 text-center transition-colors hover:bg-ivory md:odd:border-e md:p-8 md:text-start"
            >
              <motion.span
                variants={readingVariants(reduce, accentPop)}
                className="font-display text-base font-bold text-gold"
              >
                0{index + 1}
              </motion.span>
              <motion.h3
                variants={readingVariants(reduce, fadeStart)}
                className="mt-4 font-display text-2xl leading-relaxed text-charcoal"
              >
                {item.title}
              </motion.h3>
              <motion.p variants={readingVariants(reduce, fadeUpSoft)} className="body-copy mt-3">
                {item.summary}
              </motion.p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
