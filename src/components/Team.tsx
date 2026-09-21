import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { team } from '@/data/team'
import { siteConfig } from '@/data/siteConfig'
import { SectionLabel, DoubleLine } from '@/components/Decorative/Ornaments'
import { easeOut, fadeUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/cn'

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

/** True when a real mouse/trackpad hover is available (desktop). */
function useFineHover() {
  const [fineHover, setFineHover] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setFineHover(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return fineHover
}

type PortraitProps = {
  src: string
  alt: string
  index: number
  reduce: boolean | null
  fineHover: boolean
}

function TeamPortrait({ src, alt, index, reduce, fineHover }: PortraitProps) {
  const baseClass =
    'h-full w-full object-cover will-change-[filter,transform] transition-[filter,transform] duration-700 group-hover:scale-[1.03]'

  // Desktop: grayscale until hover — CSS only so hover works reliably
  if (fineHover || reduce) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          baseClass,
          reduce ? undefined : 'grayscale group-hover:grayscale-0',
        )}
      />
    )
  }

  // Touch / mobile: color in view, grayscale out of frame
  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      className={baseClass}
      initial={{ filter: 'grayscale(1)' }}
      whileInView={{ filter: 'grayscale(0)' }}
      viewport={{ once: false, amount: 0.45, margin: '0px 0px -6% 0px' }}
      transition={{
        duration: 1.15,
        delay: index * 0.08,
        ease: easeOut,
      }}
    />
  )
}

export function Team() {
  const reduce = useReducedMotion()
  const fineHover = useFineHover()

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
          <motion.div variants={fadeUp} className="section-rule">
            <DoubleLine />
          </motion.div>
          <motion.p variants={fadeUp} className="lede">
            بيانات توضيحية قابلة للاستبدال — ليست ملفات محامين حقيقية.
          </motion.p>
        </motion.div>

        <motion.ul
          className="section-body grid gap-8 md:grid-cols-3 md:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {team.map((member, index) => (
            <motion.li key={member.id} variants={fadeUp} className="group">
              <Link to={`/team/${member.slug}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-border">
                  <TeamPortrait
                    src={member.image}
                    alt={`${member.name} — ${member.position}`}
                    index={index}
                    reduce={reduce}
                    fineHover={fineHover}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-60" />
                </div>
              </Link>
              <div className="mt-5 flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:justify-between md:text-start">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg leading-relaxed text-charcoal sm:text-xl">
                    <Link to={`/team/${member.slug}`} className="transition-colors hover:text-gold-dark">
                      {member.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-sm text-gold-dark sm:text-base">{member.position}</p>
                  <p className="body-copy mt-2 text-sm sm:text-base">{member.expertise}</p>
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-gold md:mt-1"
                  aria-label={`LinkedIn — ${member.name}`}
                >
                  <LinkedInIcon className="size-[18px]" />
                </a>
              </div>
              <div className="mt-4 flex justify-center md:justify-start">
                <Link
                  to={`/team/${member.slug}`}
                  className="inline-flex border-b border-gold/40 pb-0.5 text-base font-bold text-gold-dark transition-colors hover:border-gold hover:text-charcoal"
                >
                  {siteConfig.cta.viewProfile}
                </Link>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
