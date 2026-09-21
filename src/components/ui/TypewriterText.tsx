import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

export type TypewriterEntry = {
  label: string
  /** React Router path to the matching service detail page */
  href: string
  slug: string
}

type TypewriterTextProps = {
  entries: readonly TypewriterEntry[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  startDelay?: number
  loop?: boolean
  className?: string
  ariaLabelPrefix?: string
  onActiveChange?: (entry: TypewriterEntry, index: number) => void
  onNavigate?: (entry: TypewriterEntry, index: number) => void
}

type Phase = 'typing' | 'pausing' | 'deleting' | 'waiting'

function jitter(base: number, spread: number): number {
  return base + (Math.random() * spread * 2 - spread)
}

/**
 * Premium Arabic RTL typewriter — types, pauses, deletes, then advances.
 * Each active label is always a link to its own service detail route for the
 * whole type / pause / delete cycle of that word.
 */
export function TypewriterText({
  entries,
  typingSpeed = 75,
  deletingSpeed = 45,
  pauseDuration = 2100,
  startDelay = 600,
  loop = true,
  className,
  ariaLabelPrefix = 'مجال العمل الحالي',
  onActiveChange,
  onNavigate,
}: TypewriterTextProps) {
  const reduce = useReducedMotion()
  const safeEntries = useMemo(() => (entries.length > 0 ? [...entries] : []), [entries])
  const longestWord = useMemo(
    () =>
      safeEntries.reduce(
        (best, entry) => (entry.label.length >= best.length ? entry.label : best),
        safeEntries[0]?.label ?? '',
      ),
    [safeEntries],
  )

  const [index, setIndex] = useState(0)
  const [text, setText] = useState(() => (reduce ? safeEntries[0]?.label ?? '' : ''))
  const [phase, setPhase] = useState<Phase>(() => (reduce ? 'pausing' : 'waiting'))
  const [started, setStarted] = useState(false)

  const active = safeEntries[index] ?? safeEntries[0]
  const displayText = reduce ? (active?.label ?? '') : text

  useEffect(() => {
    if (active) onActiveChange?.(active, index)
  }, [active, index, onActiveChange])

  useEffect(() => {
    if (!active || safeEntries.length === 0) return

    if (reduce) {
      setText(safeEntries[0].label)
      setPhase('pausing')
      setIndex(0)
      return
    }

    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    const schedule = (fn: () => void, ms: number) => {
      timer = setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
    }

    if (!started) {
      schedule(() => {
        setStarted(true)
        setPhase('typing')
      }, startDelay)
      return () => {
        cancelled = true
        clearTimeout(timer)
      }
    }

    const current = safeEntries[index]?.label ?? ''

    if (phase === 'typing') {
      if (text.length < current.length) {
        schedule(() => {
          setText(current.slice(0, text.length + 1))
        }, jitter(typingSpeed, 12))
      } else {
        setPhase('pausing')
      }
    } else if (phase === 'pausing') {
      schedule(() => setPhase('deleting'), jitter(pauseDuration, 200))
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        schedule(() => {
          setText(text.slice(0, -1))
        }, jitter(deletingSpeed, 8))
      } else {
        schedule(() => {
          const next = index + 1
          if (next >= safeEntries.length) {
            if (!loop) {
              setText(current)
              setPhase('pausing')
              return
            }
            setIndex(0)
          } else {
            setIndex(next)
          }
          setPhase('waiting')
        }, jitter(550, 80))
      }
    } else if (phase === 'waiting') {
      schedule(() => setPhase('typing'), jitter(120, 40))
    }

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [
    reduce,
    started,
    phase,
    text,
    index,
    safeEntries,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    startDelay,
    loop,
    active,
  ])

  useEffect(() => {
    if (!reduce || safeEntries.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safeEntries.length)
    }, Math.max(pauseDuration, 2800))
    return () => window.clearInterval(id)
  }, [reduce, safeEntries, pauseDuration])

  useEffect(() => {
    if (reduce && active) {
      setText(active.label)
    }
  }, [reduce, active])

  if (!active) {
    return null
  }

  return (
    <span className={cn('typewriter-root relative inline-grid max-w-full text-start', className)}>
      <span
        className="pointer-events-none invisible col-start-1 row-start-1 font-[inherit] leading-[inherit] whitespace-pre-wrap"
        aria-hidden="true"
      >
        {longestWord}
      </span>

      <span className="col-start-1 row-start-1 inline-flex max-w-full flex-wrap items-baseline">
        <Link
          key={active.slug}
          to={active.href}
          data-service-slug={active.slug}
          data-typewriter-link="true"
          title={active.label}
          className={cn(
            'relative inline-block max-w-full cursor-pointer font-[inherit] leading-[inherit]',
            'text-gold-champagne transition-colors hover:text-gold',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
          )}
          aria-label={`${ariaLabelPrefix}: ${active.label} — فتح صفحة الخدمة`}
          onClick={() => onNavigate?.(active, index)}
        >
          <span className="whitespace-pre-wrap" aria-hidden="true">
            {displayText}
            {!reduce && (
              <span
                className="typewriter-cursor ms-1 inline-block h-[0.95em] w-px shrink-0 translate-y-[0.08em] bg-gold-champagne align-baseline"
                aria-hidden="true"
              />
            )}
          </span>
          {displayText.length > 0 && (
            <span
              className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gold/50"
              aria-hidden="true"
            />
          )}
        </Link>
      </span>

      <span className="sr-only" aria-live="polite">
        {phase === 'pausing' || reduce ? `${ariaLabelPrefix}: ${active.label}` : ''}
      </span>
    </span>
  )
}
