import type { ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import {
  fadeUp,
  fadeUpSoft,
  readingStagger,
  readingVariants,
  staggerContainer,
  viewportReading,
  viewportReadingLoose,
} from '@/lib/motion'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger child motion nodes that use variants */
  stagger?: boolean
  /** Looser trigger for tall blocks (forms, multi-column) */
  loose?: boolean
} & Omit<HTMLMotionProps<'div'>, 'children' | 'initial' | 'whileInView' | 'viewport' | 'variants'>

/**
 * Section-level reading reveal. Respects prefers-reduced-motion and uses a
 * viewport tuned so copy finishes animating while still on-screen.
 */
export function Reveal({
  children,
  className,
  stagger = true,
  loose = false,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      variants={stagger ? readingStagger(reduce, staggerContainer) : readingVariants(reduce, fadeUp)}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={loose ? viewportReadingLoose : viewportReading}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type RevealItemProps = {
  children: ReactNode
  className?: string
  soft?: boolean
} & Omit<HTMLMotionProps<'div'>, 'children' | 'variants'>

export function RevealItem({ children, className, soft = false, ...rest }: RevealItemProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      variants={readingVariants(reduce, soft ? fadeUpSoft : fadeUp)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
