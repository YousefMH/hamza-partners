import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Meander } from '@/components/Decorative/Ornaments'
import { fadeIn, readingVariants, viewportReading } from '@/lib/motion'

type SectionDividerProps = {
  /** Background of the band — match the quieter adjacent surface */
  surface?: 'ivory' | 'white' | 'charcoal'
  className?: string
}

/**
 * Classical section break: hairline rules + short meander + center diamond.
 * Soft fade-in marks a reading pause between sections.
 */
export function SectionDivider({ surface = 'ivory', className }: SectionDividerProps) {
  const reduce = useReducedMotion()
  const dark = surface === 'charcoal'
  const line = dark
    ? 'bg-gradient-to-l from-transparent via-gold-champagne/45 to-transparent'
    : 'bg-gradient-to-l from-transparent via-gold/50 to-transparent'
  const diamond = dark ? 'border-gold-champagne/70 bg-charcoal' : 'border-gold/70 bg-ivory'
  const meanderTone = dark ? 'champagne' : 'gold'

  return (
    <motion.div
      className={cn(
        'relative select-none overflow-x-hidden py-3.5 md:py-4',
        surface === 'white' && 'bg-white',
        surface === 'ivory' && 'bg-ivory',
        surface === 'charcoal' && 'bg-charcoal',
        className,
      )}
      aria-hidden="true"
      role="presentation"
      variants={readingVariants(reduce, fadeIn)}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportReading}
    >
      <div className="container-editorial">
        <div className="flex min-w-0 items-center gap-3 md:gap-5">
          <span className={cn('h-px min-w-0 flex-1', line)} />
          <span
            className={cn(
              'hidden h-px w-8 shrink-0 sm:block',
              dark ? 'bg-gold-champagne/35' : 'bg-gold/35',
            )}
          />
          <Meander className="w-16 shrink-0 opacity-90 sm:w-24 md:w-36" tone={meanderTone} />
          <span className={cn('size-2 shrink-0 rotate-45 border', diamond)} />
          <Meander className="w-16 shrink-0 opacity-90 sm:w-24 md:w-36" tone={meanderTone} />
          <span
            className={cn(
              'hidden h-px w-8 shrink-0 sm:block',
              dark ? 'bg-gold-champagne/35' : 'bg-gold/35',
            )}
          />
          <span className={cn('h-px min-w-0 flex-1', line)} />
        </div>
        <div className="mx-auto mt-1.5 flex max-w-xs items-center justify-center gap-2 opacity-70">
          <span className={cn('h-px w-10', dark ? 'bg-gold-champagne/25' : 'bg-gold/25')} />
          <span className={cn('size-1 rotate-45', dark ? 'bg-gold-champagne/50' : 'bg-gold/45')} />
          <span className={cn('h-px w-10', dark ? 'bg-gold-champagne/25' : 'bg-gold/25')} />
        </div>
      </div>
    </motion.div>
  )
}
