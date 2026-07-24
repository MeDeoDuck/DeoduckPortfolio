import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface Props {
  text: string
  className?: string
}

/** 스크롤 진행에 따라 글자가 하나씩 또렷해진다. */
export default function AnimatedText({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  // 모션 민감 사용자에게 글자 단위 애니메이션은 과하다. 그냥 읽히게 둔다.
  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  const chars = Array.from(text)

  return (
    <p ref={ref} className={className}>
      {chars.map((ch, i) => (
        <Char key={i} progress={scrollYProgress} index={i} total={chars.length}>
          {ch}
        </Char>
      ))}
    </p>
  )
}

function Char({
  children,
  progress,
  index,
  total,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  index: number
  total: number
}) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="opacity-20">{children}</span>
      <motion.span className="absolute left-0 top-0 whitespace-pre" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  )
}
