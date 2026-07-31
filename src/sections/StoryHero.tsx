import { useEffect, useRef, useState } from 'react'
import type { Story } from '../three/storyScene'

/**
 * WebGL을 못 쓰는 환경(구형 브라우저·GPU 차단·헤드리스)에서는 3D가 뜨지 않는다.
 * 그때 320vh를 그대로 두면 화면 세 개 분량의 백지가 남으므로 구간 자체를 접는다.
 * 컨텍스트는 만들자마자 버린다 — 확인용으로 잡아둔 채 두면 뒤에서 진짜 렌더러가 못 만든다.
 */
function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') ?? c.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

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
 * 스크롤 구동 3D 스토리 히어로. 5장면 시퀀스.
 * - 스크롤 위치 → 마스터 진행도 0~5. 되감으면 정확히 역재생.
 * - ↓/↑·PageDown/PageUp·스페이스로 장면 단위 이동.
 * - 매 프레임 Three 객체를 직접 갱신한다. React 리렌더 없음.
 * - three는 지연 로드해 초기 번들에서 뺀다.
 * - prefers-reduced-motion: 다섯 개의 이산 상태로 스냅.
 */
export default function StoryHero() {
  const wrapRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  // 서버·초기 렌더에서는 일단 3D가 된다고 보고, 확인 후 안 되면 접는다.
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (!webglAvailable()) {
      setSupported(false)
      return
    }

    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const bubble = bubbleRef.current
    if (!wrap || !canvas || !bubble) return

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
      if (story) {
        let goal = override ?? scrollProgress()
        if (reduce) goal = Math.round(goal)
        // 지수 감쇠 — 현재 값에서 출발하므로 어느 순간 되감아도 이어진다
        if (!paused) current += (goal - current) * (1 - Math.exp(-dt * (reduce ? 16 : 9)))
        story.update(current, now / 1000, reduce)
        story.render()
        // 말풍선은 첫 장면에서만. 움직이기 시작하면 걷어낸다.
        const o = Math.max(0, 1 - current / 0.3)
        bubble.style.opacity = String(o)
        bubble.style.visibility = o < 0.02 ? 'hidden' : 'visible'
      }
      raf = requestAnimationFrame(loop)
    }

    // 청크 로드 실패·렌더러 생성 실패도 백지로 끝나지 않게 같은 폴백으로 보낸다.
    import('../three/storyScene')
      .then(({ createStory }) => {
        if (disposed) return
        story = createStory(canvas)
        story.setSize(canvas.clientWidth, canvas.clientHeight)
        window.addEventListener('resize', onResize)
        window.addEventListener('pointermove', onPointer, { passive: true })
        window.addEventListener('keydown', onKey)
        raf = requestAnimationFrame(loop)
      })
      .catch(() => {
        if (!disposed) setSupported(false)
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
      window.removeEventListener('keydown', onKey)
      delete window.__story
      story?.dispose()
    }
  }, [])

  // 3D를 못 그리면 스크롤 구간을 없앤다. 다음 섹션(이름·헤드라인)이 첫 화면이 된다.
  if (!supported) return <section id="story" aria-hidden="true" />

  return (
    <section ref={wrapRef} id="story" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen w-full">
        {/* 3D 시퀀스는 장식 — 보조기기는 본문으로 간다 */}
        <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
        <div ref={bubbleRef} className="story-bubble font-mono" role="note">
          scroll down!!
        </div>
      </div>
    </section>
  )
}
