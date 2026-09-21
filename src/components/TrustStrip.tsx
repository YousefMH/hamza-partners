import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, Building2, Scale, ShieldCheck, type LucideIcon } from 'lucide-react'
import { trustIndicators } from '@/data/content'
import {
  fadeUp,
  readingStagger,
  readingVariants,
  staggerList,
  viewportReading,
} from '@/lib/motion'
import { cn } from '@/lib/cn'

const trustIcons: Record<(typeof trustIndicators)[number]['icon'], LucideIcon> = {
  scale: Scale,
  briefcase: Briefcase,
  'building-2': Building2,
  'shield-check': ShieldCheck,
}

/**
 * Four trust signals pulled out of the old About section —
 * sits flush under the hero so the page reads as one continuous opening.
 */
export function TrustStrip() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="مرتكزات العمل"
      className="relative z-10 -mt-6 bg-ivory sm:-mt-8 md:-mt-10"
    >
      <div className="container-editorial">
        <motion.ul
          variants={readingStagger(reduce, staggerList)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportReading}
          className="grid grid-cols-2 overflow-hidden border border-border bg-white shadow-[0_12px_40px_rgba(21,21,21,0.06)] lg:grid-cols-4"
        >
          {trustIndicators.map((item, index) => {
            const Icon = trustIcons[item.icon]

            return (
              <motion.li
                key={item.label}
                variants={readingVariants(reduce, fadeUp)}
                className={cn(
                  'group relative flex flex-col items-center gap-3 px-4 py-7 text-center sm:gap-3.5 sm:px-5 sm:py-8 md:items-start md:px-7 md:py-9 md:text-start',
                  index % 2 === 0 && 'border-e border-border',
                  index < 2 && 'border-b border-border lg:border-b-0',
                  index < 3 && 'lg:border-e lg:border-border',
                )}
              >
                <span className="inline-flex size-9 items-center justify-center border border-gold/40 text-gold-dark transition-colors duration-300 group-hover:border-gold group-hover:bg-gold/10 sm:size-10">
                  <Icon className="size-4 sm:size-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="font-display text-[0.95rem] leading-relaxed text-charcoal sm:text-base md:text-lg">
                  {item.label}
                </p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
