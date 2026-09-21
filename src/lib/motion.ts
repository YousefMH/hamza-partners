import type { Transition, Variants } from 'framer-motion'

/** Shared easing — soft deceleration for editorial reveals */
export const easeOut = [0.22, 1, 0.36, 1] as const

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
}

/**
 * Trigger slightly before the block is centered so copy is readable
 * while the motion finishes — works on phone, tablet, and desktop.
 */
export const viewportReading = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -8% 0px',
} as const

export const viewportReadingLoose = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -4% 0px',
} as const

/** Primary block enter — short travel so mobile doesn't feel floaty */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
}

/** Softer follow-up for body copy under a heading */
export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
}

/** Stagger tuned for reading order (label → title → rule → lede) */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

/** Tighter stagger for long lists / chips so waiting isn't tedious */
export const staggerReading: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

export const staggerList: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.02,
    },
  },
}

/** RTL-friendly rule draw (origin on the reading start / right) */
export const ruleReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0.4 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
}

export const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
}

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.05, ease: easeOut },
  },
}

/** Accent number / index — draws the eye before the title */
export const accentPop: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
}

/** Horizontal slip for list rows (RTL: from the start edge) */
export const fadeStart: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Instant variants when the user prefers reduced motion */
export function readingVariants(reduce: boolean | null, variants: Variants): Variants {
  if (reduce) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { duration: 0 } },
    }
  }
  return variants
}

export function readingStagger(reduce: boolean | null, variants: Variants = staggerContainer): Variants {
  if (reduce) {
    return {
      hidden: {},
      visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
    }
  }
  return variants
}
