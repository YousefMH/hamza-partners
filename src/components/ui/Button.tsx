import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { easeOut } from '@/lib/motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse'
  size?: 'md' | 'lg'
  children: ReactNode
  href?: string
}

const variants = {
  primary:
    'bg-charcoal text-ivory hover:bg-warm-gray border border-charcoal',
  secondary:
    'bg-transparent text-charcoal border border-charcoal/25 hover:border-gold hover:text-gold-dark',
  ghost: 'bg-transparent text-ivory border border-ivory/35 hover:border-gold-champagne hover:text-gold-champagne',
  inverse:
    'bg-gold text-charcoal border border-gold hover:bg-gold-champagne',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  type = 'button',
  ...props
}: ButtonProps) {
  const reduce = useReducedMotion()
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-display text-base font-bold transition-colors duration-300',
    size === 'lg' ? 'px-8 py-3.5' : 'px-6 py-2.5',
    variants[variant],
    className,
  )

  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileHover={reduce ? undefined : { x: -2 }}
      transition={{ duration: 0.25, ease: easeOut }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  )
}
