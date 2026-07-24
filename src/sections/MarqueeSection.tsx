import { useEffect, useRef, useState } from 'react'
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
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const shift = offset - 200

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-ink pb-10 pt-24 sm:pt-32 md:pt-40"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-3">
        <Row items={ROW_ONE} translate={shift} />
        <Row items={ROW_TWO} translate={-shift} />
      </div>
    </section>
  )
}

function Row({ items, translate }: { items: string[]; translate: number }) {
  const tripled = [...items, ...items, ...items]
  return (
    <div
      className="flex gap-3"
      style={{ transform: `translateX(${translate}px)`, willChange: 'transform' }}
    >
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
