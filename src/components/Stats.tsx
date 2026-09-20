import { motion } from 'framer-motion'
import { stats } from '@/data/content'
import { Counter } from '@/components/ui/Counter'
import { Meander } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function Stats() {
  return (
    <section className="section-pad bg-charcoal text-ivory" aria-labelledby="stats-heading">
      <div className="container-editorial">
        <div className="mb-8 flex flex-col items-start gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="stats-heading" className="sr-only">
              أرقام توضيحية
            </h2>
            <Meander className="mb-4 max-w-xs" tone="champagne" />
            <p className="text-base leading-relaxed text-ivory/80">
              أرقام توضيحية قابلة للاستبدال — ليست إحصاءات موثقة.
            </p>
          </div>
        </div>

        <motion.ul
          className="grid grid-cols-2 gap-8 border-t border-ivory/10 pt-8 lg:grid-cols-4 lg:gap-6 lg:pt-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {stats.map((stat) => (
            <motion.li key={stat.id} variants={fadeUp} className="text-center lg:text-start">
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
