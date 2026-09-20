import { motion } from 'framer-motion'
import { stats } from '@/data/content'
import { Counter } from '@/components/ui/Counter'
import { Meander } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function Stats() {
  return (
    <section className="bg-charcoal py-16 text-ivory md:py-20" aria-labelledby="stats-heading">
      <div className="container-editorial">
        <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="stats-heading" className="sr-only">
              أرقام توضيحية
            </h2>
            <Meander className="mb-4 max-w-xs" tone="champagne" />
            <p className="text-sm text-ivory/55">أرقام توضيحية قابلة للاستبدال — ليست إحصاءات موثقة.</p>
          </div>
        </div>

        <motion.ul
          className="grid grid-cols-2 gap-8 border-t border-ivory/10 pt-10 lg:grid-cols-4 lg:gap-6"
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
              <p className="mt-3 text-sm text-ivory/70 md:text-base">{stat.label}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
