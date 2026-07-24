import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useReducedMotion } from 'framer-motion'
import Placeholder from '../components/Placeholder'

/** 나중에 실제 프로젝트 스크린샷으로 교체할 자리 */
const ROW_ONE = [
  'Moabom 보고서',
  'Moabom 아키텍처',
  'FOMO 대시보드',
  'FOMO 토론 화면',
  'CAGE 그래프',
  'VoiceStep 화면',
]
const ROW_TWO = [
  'Physical AI 주행',
  'LiDAR 콘 인식',
  'TrackWithReID',
  'ShiftLoss 그래프',
  'LST 학습 곡선',
  'Linkus20 에디터',
]

export default function MarqueeSection() {
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
      className="overflow-hidden bg-ink pb-10 pt-24 sm:pt-32 md:pt-40"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-3">
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
          rounded="rounded-2xl"
          className="h-[170px] w-[280px] shrink-0 sm:h-[210px] sm:w-[340px] md:h-[270px] md:w-[420px]"
        />
      ))}
    </div>
  )
}
