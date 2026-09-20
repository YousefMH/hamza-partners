import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CounterProps {
  value: number
  prefix?: string
  duration?: number
  className?: string
}

export function Counter({ value, prefix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (!inView) return
    motionValue.set(reduce ? value : value)
  }, [inView, motionValue, reduce, value])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString('ar-SA')}`
      }
    })
    return unsubscribe
  }, [prefix, spring])

  return (
    <motion.span ref={ref} className={className}>
      {prefix}0
    </motion.span>
  )
}
