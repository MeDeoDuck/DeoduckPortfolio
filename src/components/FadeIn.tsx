import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}

/** 강한 ease-out. 기본 CSS 이징은 힘이 없어 의도가 안 읽힌다. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  x = 0,
  y = 30,
  className,
}: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reduce ? 0 : x, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay: reduce ? 0 : delay,
        duration: reduce ? 0.22 : duration,
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  )
}
