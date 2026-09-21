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
            نختار أن نبدأ من الجذور — مكتب تأسس عام {siteConfig.foundedYear}، وما زال يقدّم
            استشارة قانونية دقيقة للشركات والأفراد بمعايير المهنة ذاتها.
          </motion.p>
        </motion.div>

        <motion.ol
          className="section-body divide-y divide-border/90 border-y border-border"
          variants={readingStagger(reduce, staggerReading)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          {whyUs.map((item, index) => (
            <motion.li
              key={item.id}
              variants={readingStagger(reduce, staggerReading)}
              className="grid gap-4 py-9 text-center md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1.4fr)] md:items-start md:gap-10 md:py-11 md:text-start"
            >
              <motion.span
                variants={readingVariants(reduce, accentPop)}
                className="font-display text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-tight text-gold/55"
                aria-hidden="true"
              >
                0{index + 1}
              </motion.span>
              <div>
                <motion.h3
                  variants={readingVariants(reduce, fadeStart)}
                  className="font-display text-xl leading-[1.45] text-charcoal md:text-[1.65rem]"
                >
                  {item.title}
                </motion.h3>
                <span
                  className="mx-auto mt-4 block h-px w-10 bg-gold/70 md:mx-0"
                  aria-hidden="true"
                />
              </div>
              <motion.p
                variants={readingVariants(reduce, fadeUpSoft)}
                className="body-copy md:pt-1"
              >
                {item.body}
              </motion.p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
