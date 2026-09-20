import { motion } from 'framer-motion'
import { whyUs } from '@/data/content'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function WhyUs() {
  return (
    <section id="why-us" className="section-pad bg-ivory" aria-labelledby="why-us-heading">
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>مزايانا</SectionLabel>
          </motion.div>
          <motion.h2 id="why-us-heading" variants={fadeUp} className="section-title">
            لماذا نحن؟
          </motion.h2>
          <motion.div variants={fadeUp} className="section-rule">
            <DoubleLine />
          </motion.div>
        </motion.div>

        <motion.ol
          className="section-body divide-y divide-border border-y border-border"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {whyUs.map((item, index) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              className="grid gap-3 py-8 md:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.35fr)] md:items-start md:gap-8 md:py-9"
            >
              <span className="font-display text-base font-bold text-gold">
                0{index + 1}
              </span>
              <h3 className="font-display text-xl leading-relaxed text-charcoal md:text-2xl">
                {item.title}
              </h3>
              <p className="body-copy">{item.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
