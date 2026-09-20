import { cn } from '@/lib/cn'
import { Meander } from '@/components/Decorative/Ornaments'

type SectionDividerProps = {
  /** Background of the band — match the quieter adjacent surface */
  surface?: 'ivory' | 'white' | 'charcoal'
  className?: string
}

/**
 * Classical section break: hairline rules + short meander + center diamond.
 * Fits the ivory / charcoal / gold identity without looking like generic card chrome.
 */
export function SectionDivider({ surface = 'ivory', className }: SectionDividerProps) {
  const dark = surface === 'charcoal'
  const line = dark
    ? 'bg-gradient-to-l from-transparent via-gold-champagne/45 to-transparent'
    : 'bg-gradient-to-l from-transparent via-gold/50 to-transparent'
  const diamond = dark
    ? 'border-gold-champagne/70 bg-charcoal'
    : 'border-gold/70 bg-ivory'
  const meanderTone = dark ? 'champagne' : 'gold'

  return (
    <div
      className={cn(
        'relative select-none py-7 md:py-9',
        surface === 'white' && 'bg-white',
        surface === 'ivory' && 'bg-ivory',
        surface === 'charcoal' && 'bg-charcoal',
        className,
      )}
      aria-hidden="true"
      role="presentation"
    >
      <div className="container-editorial">
        <div className="flex items-center gap-3 md:gap-5">
          <span className={cn('h-px flex-1', line)} />
          <span className={cn('hidden h-px w-8 sm:block', dark ? 'bg-gold-champagne/35' : 'bg-gold/35')} />
          <Meander className="w-[4.5rem] shrink-0 opacity-90 sm:w-24 md:w-36" tone={meanderTone} />
          <span
            className={cn('size-2 shrink-0 rotate-45 border', diamond)}
          />
          <Meander className="w-[4.5rem] shrink-0 opacity-90 sm:w-24 md:w-36" tone={meanderTone} />
          <span className={cn('hidden h-px w-8 sm:block', dark ? 'bg-gold-champagne/35' : 'bg-gold/35')} />
          <span className={cn('h-px flex-1', line)} />
        </div>
        <div className="mx-auto mt-2.5 flex max-w-xs items-center justify-center gap-2 opacity-70 md:mt-3">
          <span className={cn('h-px w-10', dark ? 'bg-gold-champagne/25' : 'bg-gold/25')} />
          <span className={cn('size-1 rotate-45', dark ? 'bg-gold-champagne/50' : 'bg-gold/45')} />
          <span className={cn('h-px w-10', dark ? 'bg-gold-champagne/25' : 'bg-gold/25')} />
        </div>
      </div>
    </div>
  )
}
