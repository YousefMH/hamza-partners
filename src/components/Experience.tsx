import { motion } from 'framer-motion'
import { experience } from '@/data/experience'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function Experience() {
  return (
    <section id="experience" className="section-pad bg-white" aria-labelledby="experience-heading">
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>المحفظة</SectionLabel>
          </motion.div>
          <motion.h2
            id="experience-heading"
            variants={fadeUp}
            className="text-[clamp(1.85rem,3.5vw,3rem)] text-charcoal"
          >
            خبراتنا
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-5 max-w-[7rem]">
            <DoubleLine />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-sm text-muted">
            موضوعات خبرة مجهولة الهوية — دون ذكر عملاء أو نتائج محددة.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-14 grid gap-0 border-t border-border md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {experience.map((item, index) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              className="border-b border-border p-7 transition-colors hover:bg-ivory md:odd:border-e md:p-9"
            >
              <span className="font-display text-sm tracking-[0.2em] text-gold">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl text-charcoal">{item.title}</h3>
              <p className="mt-3 text-warm-gray">{item.summary}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
