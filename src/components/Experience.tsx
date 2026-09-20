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
          <motion.h2 id="experience-heading" variants={fadeUp} className="section-title">
            خبراتنا
          </motion.h2>
          <motion.div variants={fadeUp} className="section-rule">
            <DoubleLine />
          </motion.div>
          <motion.p variants={fadeUp} className="lede">
            موضوعات خبرة مجهولة الهوية — دون ذكر عملاء أو نتائج محددة.
          </motion.p>
        </motion.div>

        <motion.ul
          className="section-body grid gap-0 border-t border-border md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {experience.map((item, index) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              className="border-b border-border p-6 transition-colors hover:bg-ivory md:odd:border-e md:p-8"
            >
              <span className="font-display text-base font-bold text-gold">0{index + 1}</span>
              <h3 className="mt-4 font-display text-2xl leading-relaxed text-charcoal">
                {item.title}
              </h3>
              <p className="body-copy mt-3">{item.summary}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
