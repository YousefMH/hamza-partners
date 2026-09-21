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
            <SectionLabel>نماذج أعمال</SectionLabel>
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
              className="border-b border-border px-6 py-8 text-center transition-colors hover:bg-ivory md:odd:border-e md:px-8 md:py-10 md:text-start"
            >
              <motion.span
                variants={readingVariants(reduce, accentPop)}
                className="font-display text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-tight text-gold/55"
                aria-hidden="true"
              >
                0{index + 1}
              </motion.span>
              <motion.h3
                variants={readingVariants(reduce, fadeStart)}
                className="mt-5 font-display text-xl leading-[1.45] text-charcoal md:text-2xl"
              >
                {item.title}
              </motion.h3>
              <span
                className="mx-auto mt-4 block h-px w-10 bg-gold/70 md:mx-0"
                aria-hidden="true"
              />
              <motion.p variants={readingVariants(reduce, fadeUpSoft)} className="body-copy mt-4">
                {item.summary}
              </motion.p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
