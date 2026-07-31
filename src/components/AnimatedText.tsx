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

  /*
   * 글자마다 inline-block을 주면 브라우저가 모든 글자를 줄바꿈 지점으로 본다.
   * 그러면 self-healing·LangGraph 같은 단어가 중간에서 잘린다.
   * 어절을 통째로 감싸고 그 안에서만 글자를 쪼갠다. 공백은 바깥에 남겨
   * 줄바꿈은 어절 사이에서만 일어나게 한다.
   */
  const total = Array.from(text).length
  const tokens = text.split(/(\s+)/).filter(Boolean)
  let cursor = 0

  return (
    <p ref={ref} className={className}>
      {tokens.map((token, ti) => {
        const start = cursor
        const chars = Array.from(token)
        cursor += chars.length
        // 공백은 애니메이션 없이 그대로 — 여기가 유일한 줄바꿈 지점이다.
        if (/^\s+$/.test(token)) return <span key={ti}>{token}</span>
        return (
          <span key={ti} className="inline-block">
            {chars.map((ch, i) => (
              <Char key={i} progress={scrollYProgress} index={start + i} total={total}>
                {ch}
              </Char>
            ))}
          </span>
        )
      })}
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
