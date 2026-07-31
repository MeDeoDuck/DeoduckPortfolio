import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /**
   * 깊이. 클수록 스크롤을 더 많이 뒤처져 따라온다.
   * 이웃한 블록에 서로 다른 값을 주면 그 차이가 곧 움직임으로 읽힌다.
   */
  depth?: number
  /** 화면을 지날 때 눕혔다 세우는 각도(도). 0이면 기울이지 않는다. */
  tilt?: number
  className?: string
}

/**
 * 스크롤에 연동된 깊이 이동.
 *
 * FadeIn은 한 번 등장하고 끝나지만 이건 화면을 지나는 내내 계속 움직인다.
 * 요소가 뷰포트를 가로지르는 진행도 0~1을 y 이동과 X축 회전으로 옮기고,
 * 화면 한가운데(0.5)에서 정확히 제자리·정면이 되도록 잡았다. 되감으면 그대로 되돌아온다.
 *
 * 스프링을 한 겹 씌워 스크롤이 튈 때도 값이 부드럽게 따라온다.
 * prefers-reduced-motion이면 아무것도 하지 않는다.
 */
export default function ScrollDepth({ children, depth = 1, tilt = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // 아래에서 올라와 위로 빠져나갈 때까지를 0~1로 잡는다.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.35 })

  const y = useTransform(smooth, [0, 1], [depth * 44, depth * -44])
  const rotateX = useTransform(smooth, [0, 0.5, 1], [tilt, 0, -tilt])

  if (reduce) return <div className={className}>{children}</div>

  return (
    // rotateX가 원근 없이 걸리면 그냥 세로로 눌린 것처럼 보인다. 부모에서 perspective를 준다.
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div style={{ y, rotateX, transformStyle: 'preserve-3d' }}>{children}</motion.div>
    </div>
  )
}
