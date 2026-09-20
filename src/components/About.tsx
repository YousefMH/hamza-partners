import { motion } from 'framer-motion'
import { Briefcase, Building2, Scale, ShieldCheck, type LucideIcon } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { trustIndicators } from '@/data/content'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

const trustIcons: Record<(typeof trustIndicators)[number]['icon'], LucideIcon> = {
  scale: Scale,
  briefcase: Briefcase,
  'building-2': Building2,
  'shield-check': ShieldCheck,
}

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
              className="section-title max-w-xl"
            >
              شراكة قانونية تتجاوز حدود الاستشارة
            </motion.h2>
            <motion.div variants={fadeUp} className="section-rule">
              <DoubleLine />
            </motion.div>
            <motion.p variants={fadeUp} className="lede">
              في {siteConfig.firmNameAr} نقدّم خدمات قانونية رفيعة المستوى للشركات والمستثمرين
              والمؤسسات والأفراد. نجمع بين العمق القانوني والمنظور التجاري لنصوغ حلولًا دقيقة
              تحمي المصالح وتفتح آفاق النمو في أسواق متغيرة.
            </motion.p>
          </div>

          <motion.ul
            variants={staggerContainer}
            className="grid content-center gap-0 border-t border-border sm:grid-cols-2"
          >
            {trustIndicators.map((item) => {
              const Icon = trustIcons[item.icon]
              return (
                <motion.li
                  key={item.label}
                  variants={fadeUp}
                  className="border-b border-border px-0 py-6 sm:px-5 sm:odd:border-e md:py-7"
                >
                  <span className="mb-3.5 inline-flex size-10 items-center justify-center border border-gold/35 text-gold-dark">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <p className="font-display text-xl leading-relaxed text-charcoal">{item.label}</p>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
