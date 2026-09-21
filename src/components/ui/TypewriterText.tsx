import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

export type TypewriterEntry = {
  label: string
  href?: string
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
 * Layout width is reserved via the longest word to avoid CLS.
 * The active label can link to its service detail when `href` is set.
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
  const safeEntries = useMemo(
    () => (entries.length > 0 ? entries : [{ label: '', href: undefined }]),
    [entries],
  )
  const longestWord = useMemo(
    () =>
      safeEntries.reduce(
        (a, b) => (a.label.length >= b.label.length ? a : b),
        safeEntries[0],
      ).label,
    [safeEntries],
  )

  const [index, setIndex] = useState(0)
  const [text, setText] = useState(() => (reduce ? safeEntries[0].label : ''))
  const [phase, setPhase] = useState<Phase>(() => (reduce ? 'pausing' : 'waiting'))
  const [started, setStarted] = useState(false)

  const active = safeEntries[index] ?? safeEntries[0]

  useEffect(() => {
    onActiveChange?.(active, index)
  }, [active, index, onActiveChange])

  useEffect(() => {
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
  ])

  // Reduced motion: rotate static labels slowly without typing.
  useEffect(() => {
    if (!reduce || safeEntries.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safeEntries.length)
    }, Math.max(pauseDuration, 2800))
    return () => window.clearInterval(id)
  }, [reduce, safeEntries, pauseDuration])

  useEffect(() => {
    if (reduce) {
      setText(safeEntries[index]?.label ?? '')
    }
  }, [reduce, index, safeEntries])

  const fullLength = active.label.length || 1
  const progress = text.length / fullLength
  const underlineScale =
    phase === 'deleting'
      ? Math.max(progress, 0.06)
      : phase === 'typing'
        ? Math.max(progress, 0.1)
        : text.length > 0
          ? 1
          : 0.08

  const displayText = reduce ? active.label : text
  const canLink = Boolean(active.href) && displayText.length > 0

  const labelNode = (
    <span
      className={cn(
        'font-[inherit] leading-[inherit] text-gold-champagne whitespace-pre-wrap',
        canLink && 'underline-offset-4 transition-colors hover:text-gold',
      )}
      aria-hidden="true"
    >
      {displayText}
    </span>
  )

  return (
    <span className={cn('typewriter-root relative inline-grid max-w-full text-start', className)}>
      <span
        className="invisible col-start-1 row-start-1 font-[inherit] leading-[inherit] whitespace-pre-wrap"
        aria-hidden="true"
      >
        {longestWord}
      </span>

      <span className="col-start-1 row-start-1 inline-flex max-w-full flex-wrap items-baseline gap-x-1">
        {canLink && active.href ? (
          <Link
            to={active.href}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-label={`${ariaLabelPrefix}: ${active.label} — فتح صفحة الخدمة`}
            onClick={() => onNavigate?.(active, index)}
          >
            {labelNode}
          </Link>
        ) : (
          labelNode
        )}
        {!reduce && (
          <span
            className="typewriter-cursor inline-block h-[0.95em] w-px shrink-0 translate-y-[0.08em] bg-gold-champagne"
            aria-hidden="true"
          />
        )}
      </span>

      <span
        className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-right bg-gold/50 transition-transform duration-300 ease-out"
        style={{ transform: `scaleX(${underlineScale})` }}
        aria-hidden="true"
      />

      <span className="sr-only" aria-live="polite">
        {phase === 'pausing' || reduce ? `${ariaLabelPrefix}: ${active.label}` : ''}
      </span>
    </span>
  )
}
