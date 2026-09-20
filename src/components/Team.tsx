import { motion } from 'framer-motion'
import { team } from '@/data/team'
import { siteConfig } from '@/data/siteConfig'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { fadeUp, staggerContainer } from '@/lib/motion'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23h-4V8.5z" />
    </svg>
  )
}

export function Team() {
  return (
    <section id="team" className="section-pad bg-ivory marble-texture" aria-labelledby="team-heading">
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>الفريق</SectionLabel>
          </motion.div>
          <motion.h2 id="team-heading" variants={fadeUp} className="section-title">
            فريق العمل
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-5 max-w-[7rem]">
            <DoubleLine />
          </motion.div>
          <motion.p variants={fadeUp} className="lede mt-5">
            بيانات توضيحية قابلة للاستبدال — ليست ملفات محامين حقيقية.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-14 grid gap-10 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {team.map((member) => (
            <motion.li key={member.id} variants={fadeUp} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-border">
                <img
                  src={member.image}
                  alt=""
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-60" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl leading-relaxed text-charcoal">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-base text-gold-dark">{member.position}</p>
                  <p className="body-copy mt-2 text-base">{member.expertise}</p>
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-muted transition-colors hover:text-gold"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="size-[18px]" />
                </a>
              </div>
              <a
                href="#contact"
                className="mt-4 inline-flex border-b border-gold/40 pb-0.5 text-base font-bold text-gold-dark transition-colors hover:border-gold hover:text-charcoal"
              >
                {siteConfig.cta.viewProfile}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
