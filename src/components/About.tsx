import { motion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import { trustIndicators } from '@/data/content'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function About() {
  return (
    <section id="about" className="section-pad relative bg-ivory marble-texture" aria-labelledby="about-heading">
      <div className="container-editorial">
        <motion.div
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-12% 0px' }}
        >
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>من نحن</SectionLabel>
            </motion.div>
            <motion.h2
              id="about-heading"
              variants={fadeUp}
              className="max-w-xl text-[clamp(1.85rem,3.5vw,3rem)] text-charcoal"
            >
              شراكة قانونية تتجاوز حدود الاستشارة
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6 max-w-[8rem]">
              <DoubleLine />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-base leading-relaxed text-warm-gray md:text-lg"
            >
              في {siteConfig.firmNameAr} نقدّم خدمات قانونية رفيعة المستوى للشركات والمستثمرين
              والمؤسسات والأفراد. نجمع بين العمق القانوني والمنظور التجاري لنصوغ حلولًا دقيقة
              تحمي المصالح وتفتح آفاق النمو في أسواق متغيرة.
            </motion.p>
          </div>

          <motion.ul
            variants={staggerContainer}
            className="grid content-center gap-0 border-t border-border sm:grid-cols-2"
          >
            {trustIndicators.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="border-b border-border px-0 py-6 sm:px-5 sm:odd:border-e"
              >
                <span className="mb-3 block font-display text-2xl text-gold/80" aria-hidden="true">
                  ‖
                </span>
                <p className="font-display text-lg text-charcoal">{item}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
