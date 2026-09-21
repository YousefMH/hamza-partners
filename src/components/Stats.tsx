import { motion, useReducedMotion } from 'framer-motion'
import { stats } from '@/data/content'
import { siteConfig } from '@/data/siteConfig'
import { Counter } from '@/components/ui/Counter'
import { Meander } from '@/components/Decorative/Ornaments'
import {
  fadeUp,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerList,
  viewportReading,
} from '@/lib/motion'

export function Stats() {
  const reduce = useReducedMotion()

  return (
    <section className="section-pad bg-charcoal text-ivory" aria-labelledby="stats-heading">
      <div className="container-editorial">
        <motion.div
          className="mb-10 flex flex-col items-center gap-3 text-center md:mb-12 md:flex-row md:items-end md:justify-between md:text-start"
          variants={readingVariants(reduce, fadeUpSoft)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <div>
            <h2 id="stats-heading" className="sr-only">
              أرقام توضيحية
            </h2>
            <Meander className="mb-5 w-full max-w-xs" tone="champagne" />
            <p className="text-base leading-relaxed text-ivory/75">
              إرث منذ {siteConfig.foundedYear} — وبقية الأرقام توضيحية قابلة للاستبدال.
            </p>
          </div>
        </motion.div>

        <motion.ul
          className="grid grid-cols-2 divide-y divide-ivory/10 border-t border-ivory/15 pt-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0 lg:divide-ivory/15"
          variants={readingStagger(reduce, staggerList)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          {stats.map((stat) => (
            <motion.li
              key={stat.id}
              variants={readingVariants(reduce, fadeUp)}
              className="px-4 py-8 text-center first:pt-8 odd:border-e odd:border-ivory/10 lg:border-e-0 lg:px-8 lg:py-10 lg:text-start lg:first:ps-0 lg:last:pe-0"
            >
              <Counter
                value={stat.value}
                prefix={stat.prefix}
                className="font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-extrabold leading-none tracking-tight text-gold-champagne"
              />
              <p className="mt-4 text-sm leading-relaxed tracking-wide text-ivory/70 md:mt-5 md:text-base">
                {stat.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
