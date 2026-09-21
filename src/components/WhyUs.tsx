import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { whyUs } from '@/data/content'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import {
  accentPop,
  fadeStart,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerContainer,
  staggerReading,
  viewportReading,
} from '@/lib/motion'

export function WhyUs() {
  const reduce = useReducedMotion()

  return (
    <section id="why-us" className="section-pad bg-ivory" aria-labelledby="why-us-heading">
      <div className="container-editorial">
        <motion.div
          className="mx-auto max-w-2xl text-center md:mx-0 md:max-w-none md:text-start"
          variants={readingStagger(reduce, staggerContainer)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <motion.div variants={readingVariants(reduce, fadeUpSoft)}>
            <SectionLabel>لماذا تختارنا</SectionLabel>
          </motion.div>
          <motion.h2
            id="why-us-heading"
            variants={readingVariants(reduce, fadeUpSoft)}
            className="section-title"
          >
            ثقة قانونية منذ {siteConfig.foundedYear}
          </motion.h2>
          <motion.div variants={readingVariants(reduce, fadeUpSoft)} className="section-rule">
            <DoubleLine />
          </motion.div>
          <motion.p variants={readingVariants(reduce, fadeUpSoft)} className="lede">
            مكتب تأسس عام {siteConfig.foundedYear} — استشارة دقيقة للشركات والأفراد بمعايير المهنة.
          </motion.p>
        </motion.div>

        <motion.ul
          className="section-body grid border-t border-border md:grid-cols-2"
          variants={readingStagger(reduce, staggerReading)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          {whyUs.map((item, index) => (
            <motion.li
              key={item.id}
              variants={readingStagger(reduce, staggerReading)}
              className="border-b border-border px-5 py-8 text-center md:odd:border-e md:px-8 md:py-9 md:text-start"
            >
              <motion.span
                variants={readingVariants(reduce, accentPop)}
                className="font-display text-[clamp(1.65rem,3.5vw,2.1rem)] font-extrabold leading-none tracking-tight text-gold/50"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>
              <motion.h3
                variants={readingVariants(reduce, fadeStart)}
                className="mt-4 font-display text-xl leading-[1.4] text-charcoal md:text-[1.35rem]"
              >
                {item.title}
              </motion.h3>
              <span
                className="mx-auto mt-3 block h-px w-9 bg-gold/65 md:mx-0"
                aria-hidden="true"
              />
              <motion.p
                variants={readingVariants(reduce, fadeUpSoft)}
                className="mt-3 text-[1rem] leading-[1.75] text-muted"
              >
                {item.body}
              </motion.p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
