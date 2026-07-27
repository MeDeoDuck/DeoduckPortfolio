/**
 * 프레임 시퀀스 스크러버.
 * AI 생성 영상을 프레임(webp)으로 풀어 캔버스에 그린다.
 * <video> currentTime 스크럽은 역재생이 끊겨서 쓰지 않는다 — 프레임 방식은
 * 진행도 → 프레임 번호 매핑이라 되감기도 정확히 대칭이다.
 */

export interface FrameStory {
  /** progress 0~5 → 프레임. 로드가 덜 됐으면 가장 가까운 로드된 프레임을 그린다. */
  update(p: number): void
  setSize(w: number, h: number): void
  dispose(): void
}

export function createFrameStory(
  canvas: HTMLCanvasElement,
  base: string,
  count: number
): FrameStory {
  const ctx = canvas.getContext('2d')!
  const imgs: (HTMLImageElement | null)[] = Array(count).fill(null)
  const ready: boolean[] = Array(count).fill(false)
  let disposed = false
  let want = 0
  let drawn = -1
  let loading = 0
  const MAX_PARALLEL = 6

  const url = (i: number) => `${base}f${String(i + 1).padStart(3, '0')}.webp`

  /** 스크럽 위치 주변부터 채운다 — 사용자가 보고 있는 곳이 항상 먼저 로드된다. */
  function nextToLoad(): number {
    for (let d = 0; d < count; d++) {
      const a = want + d
      const b = want - d
      if (a < count && imgs[a] === null) return a
      if (b >= 0 && imgs[b] === null) return b
    }
    return -1
  }

  function pump() {
    if (disposed) return
    while (loading < MAX_PARALLEL) {
      const idx = nextToLoad()
      if (idx < 0) return
      const im = new Image()
      im.decoding = 'async'
      imgs[idx] = im
      loading += 1
      im.onload = () => {
        loading -= 1
        ready[idx] = true
        if (!disposed && nearestReady(want) === idx) draw(idx)
        pump()
      }
      im.onerror = () => {
        loading -= 1
        pump()
      }
      im.src = url(idx)
    }
  }

  function nearestReady(i: number): number {
    for (let d = 0; d < count; d++) {
      if (i + d < count && ready[i + d]) return i + d
      if (i - d >= 0 && ready[i - d]) return i - d
    }
    return -1
  }

  /** cover-fit: 화면비가 달라도 인물이 중앙에 오도록 중앙 크롭 */
  function draw(idx: number) {
    const im = imgs[idx]
    if (!im) return
    const cw = canvas.width
    const ch = canvas.height
    const scale = Math.max(cw / im.naturalWidth, ch / im.naturalHeight)
    const dw = im.naturalWidth * scale
    const dh = im.naturalHeight * scale
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(im, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    drawn = idx
  }

  return {
    update(p: number) {
      want = Math.round((Math.min(5, Math.max(0, p)) / 5) * (count - 1))
      const n = nearestReady(want)
      if (n >= 0 && n !== drawn) draw(n)
    },
    setSize(w: number, h: number) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      if (drawn >= 0) draw(drawn)
      else pump()
    },
    dispose() {
      disposed = true
      for (let i = 0; i < count; i++) imgs[i] = null
    },
  }
}
