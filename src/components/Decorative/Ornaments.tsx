import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import {
  fadeIn,
  readingStagger,
  readingVariants,
  ruleReveal,
  staggerReading,
  viewportReading,
} from '@/lib/motion'

interface MeanderProps {
  className?: string
  tone?: 'gold' | 'champagne' | 'muted'
}

export function Meander({ className, tone = 'gold' }: MeanderProps) {
  const stroke =
    tone === 'champagne' ? '#D8C08A' : tone === 'muted' ? '#E4E0D6' : '#C6A15B'

  return (
    <svg
      className={cn('h-3 max-w-full', className)}
      viewBox="0 0 480 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 6h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v4H480"
        fill="none"
        stroke={stroke}
        strokeWidth="1.25"
      />
    </svg>
  )
}

export function DoubleLine({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn('flex flex-col gap-1', className)}
      aria-hidden="true"
      variants={readingStagger(reduce, staggerReading)}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportReading}
    >
      <motion.span
        variants={readingVariants(reduce, ruleReveal)}
        className="block h-px w-full origin-right bg-gold/70"
      />
      <motion.span
        variants={readingVariants(reduce, ruleReveal)}
        className="block h-px w-full origin-right bg-gold/35"
      />
    </motion.div>
  )
}

export function ColumnRule({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent',
        className,
      )}
      aria-hidden="true"
    />
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.p
      className="label-eyebrow"
      variants={readingStagger(reduce, staggerReading)}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportReading}
    >
      <motion.span
        variants={readingVariants(reduce, ruleReveal)}
        className="label-eyebrow-rule origin-right"
        aria-hidden="true"
      />
      <motion.span variants={readingVariants(reduce, fadeIn)} className="label-eyebrow-text">
        {children}
      </motion.span>
      <motion.span
        variants={readingVariants(reduce, ruleReveal)}
        className="label-eyebrow-rule origin-left"
        aria-hidden="true"
      />
    </motion.p>
  )
}
