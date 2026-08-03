import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useReducedMotion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Placeholder from '../components/Placeholder'
import { useLang } from '../i18n/LanguageContext'
import { MARQUEE_ROW_ONE as ROW_ONE, MARQUEE_ROW_TWO as ROW_TWO } from '../i18n/images'

export default function MarqueeSection() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const rowOneRef = useRef<HTMLDivElement>(null)
  const rowTwoRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    let frame = 0
    const apply = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const top = section.getBoundingClientRect().top + window.scrollY
      const shift = (window.scrollY - top + window.innerHeight) * 0.22 - 200
      // React 상태를 거치지 않는다. 스크롤 프레임마다 리렌더가 돌면 끊긴다.
      if (rowOneRef.current) {
        rowOneRef.current.style.transform = `translate3d(${shift}px, 0, 0)`
      }
      if (rowTwoRef.current) {
        rowTwoRef.current.style.transform = `translate3d(${-shift}px, 0, 0)`
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduce])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-paper pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      {/* 제목 기준선은 기술 스택 섹션(max-w-5xl)의 왼쪽 라인에 맞춘다. 패딩은 바깥, max-w는 안쪽. */}
      <div className="px-5 pb-12 md:px-10 md:pb-16">
        <div className="mx-auto max-w-5xl">
          <FadeIn y={20}>
            <p className="t-eyebrow font-mono text-accent">{t.marquee.eyebrow}</p>
            <h2 className="t-h2 font-display mt-3 text-ink">{t.marquee.heading}</h2>
          </FadeIn>
        </div>
      </div>
      <div className="flex flex-col gap-3" aria-hidden="true">
        <Row innerRef={rowOneRef} items={ROW_ONE} />
        <Row innerRef={rowTwoRef} items={ROW_TWO} />
      </div>
    </section>
  )
}

function Row({
  items,
  innerRef,
}: {
  items: string[]
  innerRef: RefObject<HTMLDivElement>
}) {
  const tripled = [...items, ...items, ...items]
  return (
    <div ref={innerRef} className="flex gap-3" style={{ willChange: 'transform' }}>
      {tripled.map((label, i) => (
        <Placeholder
          key={`${label}-${i}`}
          label={label}
          seed={label}
          decorative
          rounded="rounded-2xl"
          className="h-[170px] w-[280px] shrink-0 sm:h-[210px] sm:w-[340px] md:h-[270px] md:w-[420px]"
        />
      ))}
    </div>
  )
}
