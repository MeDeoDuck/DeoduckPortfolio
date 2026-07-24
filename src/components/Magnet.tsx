import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  /** 커서가 이 거리 안으로 들어오면 반응 시작 */
  padding?: number
  /** 클수록 덜 움직인다 */
  strength?: number
  className?: string
}

/**
 * 마우스 위치를 그대로 따라가면 기계적으로 느껴진다.
 * 스프링으로 보간해 관성이 생기게 한다. 장식용 모션이라 이 정도가 맞다.
 * 임계 감쇠에 가깝게 둬서 튀지 않는다.
 */
export default function Magnet({ children, padding = 220, strength = 2.2, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // 감쇠비를 임계(≈1)에 맞추고 질량을 낮춘다.
  // 과감쇠면 꼬리가 길게 남아 "언제 끝나지" 싶은 느낌이 든다.
  // X와 Y는 각각의 스프링으로 둔다. 하나로 묶으면 속도가 다를 때 어긋난다.
  const spring = { stiffness: 320, damping: 19, mass: 0.3 }
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, spring)
  const y = useSpring(rawY, spring)

  useEffect(() => {
    if (reduce) return

    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const within =
        Math.abs(dx) < rect.width / 2 + padding && Math.abs(dy) < rect.height / 2 + padding

      rawX.set(within ? dx / strength : 0)
      rawY.set(within ? dy / strength : 0)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [padding, strength, reduce, rawX, rawY])

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} className={className} style={{ x, y, willChange: 'transform' }}>
      {children}
    </motion.div>
  )
}
