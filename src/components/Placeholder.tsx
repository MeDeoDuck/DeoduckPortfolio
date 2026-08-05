import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { imageNumber } from '../i18n/images'
import { imageAsset } from '../i18n/imageAssets'

interface Props {
  /** 나중에 실제 이미지로 교체할 자리. 라벨은 무엇이 들어갈지 표시용. */
  label: string
  className?: string
  /** 같은 색 안에서 밝기만 살짝 흔들기 위한 시드. 교체 번호도 이걸로 찾는다. */
  seed?: string
  rounded?: string
  /** 교체용 연속 번호를 강제로 지정. 안 주면 seed로 자동 조회 */
  index?: number
  /** 장식용(마퀴 등): 실제 이미지여도 클릭·포커스 없이 그냥 보여준다. */
  decorative?: boolean
  /**
   * 라이트박스 위치는 항상 화면(뷰포트) 기준. scoped는 닫기 규칙만 다르다 —
   * 오버레이(바깥) 클릭으로 닫히지 않고, 닫기 버튼·이미지 재클릭·Esc로만 닫는다.
   */
  scoped?: boolean
}

/** 색을 늘리지 않는다. 하나의 중성 색에서 밝기만 미세하게 달리해 면을 구분한다. */
function tone(seed: string): [number, number] {
  let sum = 0
  for (let i = 0; i < seed.length; i += 1) sum += seed.charCodeAt(i)
  const base = 0.05 + (sum % 5) * 0.012
  return [base, base + 0.055]
}

export default function Placeholder({
  label,
  className,
  seed,
  rounded = 'rounded-3xl',
  index,
  decorative = false,
  scoped = false,
}: Props) {
  const key = seed ?? label
  const src = imageAsset(key)

  // 실제 이미지가 준비된 자리는 <img>로 렌더한다.
  if (src) {
    if (decorative) {
      return (
        <div
          className={`relative overflow-hidden bg-ink/[0.03] ${rounded} ${className ?? ''}`}
          aria-hidden="true"
        >
          {/* 이미지 외곽선은 순수 검정. ink(#1D1D1F)처럼 색이 섞인 준-검정은
              밑면 색을 주워 담아 가장자리에 때가 낀 것처럼 보인다. */}
          <img
            src={src}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
          />
        </div>
      )
    }
    return (
      <ImageTile
        src={src}
        label={label}
        rounded={rounded}
        className={className}
        seedKey={key}
        scoped={scoped}
      />
    )
  }

  const [from, to] = tone(key)
  const resolved = index ?? imageNumber(key)
  const num = resolved != null ? String(resolved).padStart(2, '0') : null

  return (
    <div
      className={`relative grain flex flex-col items-center justify-center gap-2 overflow-hidden border border-ink/10 ${rounded} ${className ?? ''}`}
      style={{
        background: `linear-gradient(140deg, rgb(29 29 31 / ${from}) 0%, rgb(29 29 31 / ${to}) 100%)`,
      }}
      role="img"
      aria-label={num ? `이미지 ${num}: ${label}` : label}
    >
      {num && (
        <span className="font-display text-2xl font-bold leading-none text-ink/45 sm:text-3xl">
          IMG {num}
        </span>
      )}
      <span className="px-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/40">
        {label}
      </span>
    </div>
  )
}

/**
 * 실제 발표자료 이미지 타일.
 * apple-design: 눌림·호버는 스프링(critically-damped 근사)으로 즉시 반응하고,
 * 탭하면 라이트박스가 scale+opacity로 materialize 한다. reduced-motion이면 크로스페이드로 대체.
 */
function ImageTile({
  src,
  label,
  rounded,
  className,
  seedKey,
  scoped = false,
}: {
  src: string
  label: string
  rounded: string
  className?: string
  seedKey: string
  scoped?: boolean
}) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  // 상세 슬롯(-d1/-d2)과 본문 이미지(-p-)는 전체를 다 보여주고, 카드 썸네일은 꽉 채운다.
  const fit = /-d1$|-d2$|-p-/.test(seedKey) ? 'object-contain' : 'object-cover'
  // stiffness 260 / damping 26 ≈ response ~0.4s, damping ratio ~0.8 (살짝만 진동)
  const spring = { type: 'spring' as const, stiffness: 260, damping: 26 }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${label} — 크게 보기`}
        whileHover={reduce ? undefined : { scale: 1.015 }}
        whileTap={reduce ? undefined : { scale: 0.985 }}
        transition={spring}
        className={`group relative block overflow-hidden bg-ink/[0.03] ${rounded} ${className ?? ''}`}
      >
        <img
          src={src}
          alt={label}
          loading="lazy"
          className={`h-full w-full outline outline-1 -outline-offset-1 outline-black/10 ${fit}`}
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-inset ring-accent/0 transition-[box-shadow] duration-200 group-hover:ring-accent/30"
          aria-hidden
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={
              /* 카드 기준(absolute)으로 띄우면 카드가 화면보다 길 때 이미지가 화면 밖 아래에 놓인다.
                 그래서 scoped도 위치는 화면(뷰포트) 고정 — 닫기 규칙만 기본 모드와 다르다. */
              'fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm md:p-10'
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            /* scoped: 오버레이(바깥) 클릭으로는 닫지 않는다. 닫기 버튼·이미지 클릭·Esc만 허용. */
            onClick={scoped ? undefined : () => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={label}
          >
            {scoped && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="닫기"
                className="pressable absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg leading-none text-white transition-colors hover:bg-white/30"
              >
                ×
              </button>
            )}
            <motion.img
              src={src}
              alt={label}
              className={
                scoped
                  ? 'max-h-[90vh] max-w-[95vw] cursor-zoom-out rounded-xl object-contain shadow-2xl'
                  : 'max-h-[90vh] max-w-[95vw] rounded-xl shadow-2xl'
              }
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={spring}
              /* scoped: 이미지를 다시 클릭하면 닫힌다. 기본 모드는 배경 클릭 닫힘을 막기 위해 전파만 차단. */
              onClick={scoped ? () => setOpen(false) : (e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
