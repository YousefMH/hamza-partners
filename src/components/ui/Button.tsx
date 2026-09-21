import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { easeOut } from '@/lib/motion'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type SharedProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse'
  size?: 'md' | 'lg'
  children: ReactNode
  className?: string
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

const variants = {
  primary: 'btn-wood-dark text-ivory border',
  secondary:
    'btn-radius bg-transparent text-charcoal border border-charcoal/25 hover:border-gold hover:text-gold-dark',
  ghost:
    'btn-radius bg-transparent text-ivory border border-ivory/35 hover:border-gold-champagne hover:text-gold-champagne',
  inverse: 'btn-wood text-charcoal border',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const reduce = useReducedMotion()
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-display text-base font-bold transition-[filter,background-color,border-color,color,box-shadow] duration-300',
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

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = props as ButtonAsButton
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  )
}
