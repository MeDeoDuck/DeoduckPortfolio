import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  /** 글자 간격(ms) */
  speed?: number
  /** 화면에 들어온 뒤 시작까지 기다리는 시간(ms) */
  startDelay?: number
}

/**
 * 한 글자씩 찍히는 문장.
 * 화면에 들어와야 시작한다. 스크롤로 지나칠 때 이미 다 찍혀 있으면 의미가 없다.
 * reduced-motion이면 타이핑도 커서 깜빡임도 없이 완성된 문장만 보여준다.
 */
export default function Typewriter({ text, className, speed = 55, startDelay = 260 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduce) {
      setCount(text.length)
      return
    }
    if (!inView) return

    // 언어를 바꾸면 문장이 통째로 갈린다. 남은 글자 수를 물려받지 않게 되감는다.
    setCount(0)
    let i = 0
    let interval = 0
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) window.clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [text, inView, reduce, speed, startDelay])

  const done = count >= text.length

  return (
    <p ref={ref} className={className}>
      {/* 스크린리더에는 타이핑 과정이 아니라 완성된 문장만 읽힌다. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, count)}
        {!reduce && (
          <span
            className={`caret ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.08em] rounded-sm bg-ink align-middle ${
              done ? 'caret-blink' : ''
            }`}
          />
        )}
      </span>
    </p>
  )
}
