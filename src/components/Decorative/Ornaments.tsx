import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

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
        d="M0 6h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v8h8V2h8v4H480"
        fill="none"
        stroke={stroke}
        strokeWidth="1.25"
      />
    </svg>
  )
}

export function DoubleLine({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-1', className)} aria-hidden="true">
      <span className="block h-px w-full bg-gold/70" />
      <span className="block h-px w-full bg-gold/35" />
    </div>
  )
}

export function ColumnRule({ className }: { className?: string }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent', className)}
      aria-hidden="true"
    />
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="label-eyebrow">
      <span className="label-eyebrow-rule" aria-hidden="true" />
      <span className="label-eyebrow-text">{children}</span>
      <span className="label-eyebrow-rule" aria-hidden="true" />
    </p>
  )
}
