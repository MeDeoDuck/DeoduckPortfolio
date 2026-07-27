import { useEffect, useRef } from 'react'
import type { Story } from '../three/storyScene'

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

/**
 * 스크롤 구동 3D 스토리 히어로. 텍스트가 전혀 없는 5장면 시퀀스.
 * - 스크롤 위치 → 마스터 진행도 0~5. 되감으면 정확히 역재생.
 * - 매 프레임 Three 객체를 직접 갱신한다. React 리렌더 없음.
 * - three는 지연 로드해 초기 번들에서 뺀다.
 * - prefers-reduced-motion: 다섯 개의 이산 상태로 스냅.
 */
export default function StoryHero() {
  const wrapRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    let story: Story | null = null
    let raf = 0
    let disposed = false
    let current = 0
    let override: number | null = null
    let paused = false
    let last = performance.now()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onPointer = (e: PointerEvent) => {
      if (!story || reduce) return
      story.setParallax(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      )
    }

    const onResize = () => {
      story?.setSize(canvas.clientWidth, canvas.clientHeight)
    }

    const scrollProgress = () => {
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return 0
      return Math.min(5, Math.max(0, (-rect.top / total) * 5))
    }

    const loop = (now: number) => {
      if (disposed) return
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (story) {
        let goal = override ?? scrollProgress()
        if (reduce) goal = Math.round(goal)
        // 지수 감쇠 — 현재 값에서 출발하므로 어느 순간 되감아도 이어진다
        if (!paused) current += (goal - current) * (1 - Math.exp(-dt * (reduce ? 16 : 6)))
        story.update(current, now / 1000, reduce)
        story.render()
      }
      raf = requestAnimationFrame(loop)
    }

    import('../three/storyScene').then(({ createStory }) => {
      if (disposed) return
      story = createStory(canvas)
      story.setSize(canvas.clientWidth, canvas.clientHeight)
      window.addEventListener('resize', onResize)
      window.addEventListener('pointermove', onPointer, { passive: true })
      raf = requestAnimationFrame(loop)
    })

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
      window.removeEventListener('pointermove', onPointer)
      delete window.__story
      story?.dispose()
    }
  }, [])

  return (
    // 텍스트 없는 순수 장식 시퀀스 — 보조기기는 건너뛰고 본문으로 간다
    <section ref={wrapRef} id="story" aria-hidden="true" style={{ height: '520vh' }}>
      <div className="sticky top-0 h-screen w-full">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </section>
  )
}
