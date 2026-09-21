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
          className="mb-8 flex flex-col items-center gap-3 text-center md:mb-10 md:flex-row md:items-end md:justify-between md:text-start"
          variants={readingVariants(reduce, fadeUpSoft)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          <div>
            <h2 id="stats-heading" className="sr-only">
              أرقام توضيحية
            </h2>
            <Meander className="mb-4 w-full max-w-xs" tone="champagne" />
            <p className="text-base leading-relaxed text-ivory/80">
              إرث منذ {siteConfig.foundedYear} — وبقية الأرقام توضيحية قابلة للاستبدال.
            </p>
          </div>
        </motion.div>

        <motion.ul
          className="grid grid-cols-2 gap-8 border-t border-ivory/10 pt-8 lg:grid-cols-4 lg:gap-6 lg:pt-10"
          variants={readingStagger(reduce, staggerList)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
        >
          {stats.map((stat) => (
            <motion.li
              key={stat.id}
              variants={readingVariants(reduce, fadeUp)}
              className="text-center lg:text-start"
            >
              <Counter
                value={stat.value}
                prefix={stat.prefix}
                className="font-display text-4xl text-gold-champagne md:text-5xl"
              />
              <p className="mt-3 text-base leading-relaxed text-ivory/85 md:text-lg">{stat.label}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
