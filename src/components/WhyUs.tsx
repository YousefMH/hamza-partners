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
          <motion.h2
            id="why-us-heading"
            variants={fadeUp}
            className="text-[clamp(1.85rem,3.5vw,3rem)] text-charcoal"
          >
            لماذا نحن؟
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-5 max-w-[7rem]">
            <DoubleLine />
          </motion.div>
        </motion.div>

        <motion.ol
          className="mt-14 divide-y divide-border border-y border-border"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {whyUs.map((item, index) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              className="grid gap-4 py-8 md:grid-cols-[5rem_1fr_1.2fr] md:items-baseline md:gap-10 md:py-10"
            >
              <span className="font-display text-sm tracking-[0.2em] text-gold">
                0{index + 1}
              </span>
              <h3 className="font-display text-xl text-charcoal md:text-2xl">{item.title}</h3>
              <p className="text-warm-gray md:text-base">{item.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
