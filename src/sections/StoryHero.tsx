import { useEffect, useRef } from 'react'
import { createFrameStory } from '../story/frameStory'

declare global {
  interface Window {
    __story?: {
      step(progress: number): void
      setProgress(progress: number): void
      pause(): void
      resume(): void
      sample(): { progress: number; scene: number; paused: boolean }
    }
  }
}

/** public/story/ 프레임 수. 프레임을 다시 뽑으면 여기도 맞춘다. */
const FRAME_COUNT = 169

/**
 * 스크롤 구동 스토리 히어로 — AI 생성 영상 프레임 시퀀스를 스크럽한다.
 * - 스크롤 위치 → 마스터 진행도 0~5. 되감으면 정확히 역재생.
 * - ↓/↑·PageDown/PageUp·스페이스로 장면 단위 이동.
 * - 매 프레임 캔버스만 갱신한다. React 리렌더 없음.
 * - prefers-reduced-motion: 다섯 개의 이산 상태로 스냅.
 */
export default function StoryHero() {
  const wrapRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const bubble = bubbleRef.current
    if (!wrap || !canvas || !bubble) return

    const story = createFrameStory(canvas, `${import.meta.env.BASE_URL}story/`, FRAME_COUNT)
    let raf = 0
    let disposed = false
    let current = 0
    let override: number | null = null
    let paused = false
    let last = performance.now()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onResize = () => {
      story.setSize(canvas.clientWidth, canvas.clientHeight)
    }

    const scrollProgress = () => {
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return 0
      return Math.min(5, Math.max(0, (-rect.top / total) * 5))
    }

    /* ↓/↑ 키는 장면 경계로 한 칸씩. 시퀀스 끝·처음에서는 브라우저 기본 스크롤에 맡긴다. */
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' '
      const up = e.key === 'ArrowUp' || e.key === 'PageUp'
      if (!down && !up) return
      const rect = wrap.getBoundingClientRect()
      const inStory = rect.top < window.innerHeight && rect.bottom > window.innerHeight
      if (!inStory) return
      const p = scrollProgress()
      if (down && p >= 4.999) return
      if (up && p <= 0.001) return
      e.preventDefault()
      const next = down
        ? Math.min(5, Math.floor(p + 0.02) + 1)
        : Math.max(0, Math.ceil(p - 0.02) - 1)
      const top = window.scrollY + rect.top + (next / 5) * (rect.height - window.innerHeight)
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
    }

    const loop = (now: number) => {
      if (disposed) return
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      let goal = override ?? scrollProgress()
      if (reduce) goal = Math.round(goal)
      // 지수 감쇠 — 현재 값에서 출발하므로 어느 순간 되감아도 이어진다
      if (!paused) current += (goal - current) * (1 - Math.exp(-dt * (reduce ? 16 : 9)))
      story.update(current)
      // 말풍선은 첫 장면에서만. 움직이기 시작하면 걷어낸다.
      const o = Math.max(0, 1 - current / 0.3)
      bubble.style.opacity = String(o)
      bubble.style.visibility = o < 0.02 ? 'hidden' : 'visible'
      raf = requestAnimationFrame(loop)
    }

    story.setSize(canvas.clientWidth, canvas.clientHeight)
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    raf = requestAnimationFrame(loop)

    window.__story = {
      step(p) {
        override = Math.min(5, Math.max(0, p))
      },
      setProgress(p) {
        override = Math.min(5, Math.max(0, p))
      },
      pause() {
        paused = true
      },
      resume() {
        paused = false
        override = null
      },
      sample() {
        return {
          progress: current,
          scene: Math.min(5, Math.floor(current) + 1),
          paused,
        }
      },
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      delete window.__story
      story.dispose()
    }
  }, [])

  return (
    <section ref={wrapRef} id="story" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen w-full">
        {/* 시퀀스는 장식 — 보조기기는 본문으로 간다 */}
        <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
        <div ref={bubbleRef} className="story-bubble font-mono" role="note">
          scroll down!!
        </div>
      </div>
    </section>
  )
}
