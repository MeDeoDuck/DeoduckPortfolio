interface Props {
  /** 나중에 실제 이미지로 교체할 자리. 라벨은 무엇이 들어갈지 표시용. */
  label: string
  className?: string
  /** 같은 색 안에서 밝기만 살짝 흔들기 위한 시드 */
  seed?: string
  rounded?: string
}

/** 색을 늘리지 않는다. 하나의 중성 색에서 밝기만 미세하게 달리해 면을 구분한다. */
function tone(seed: string): [number, number] {
  let sum = 0
  for (let i = 0; i < seed.length; i += 1) sum += seed.charCodeAt(i)
  const base = 0.05 + (sum % 5) * 0.012
  return [base, base + 0.055]
}

export default function Placeholder({ label, className, seed, rounded = 'rounded-3xl' }: Props) {
  const [from, to] = tone(seed ?? label)

  return (
    <div
      className={`relative grain flex items-center justify-center overflow-hidden border border-mist/10 ${rounded} ${className ?? ''}`}
      style={{
        background: `linear-gradient(140deg, rgb(215 226 234 / ${from}) 0%, rgb(215 226 234 / ${to}) 100%)`,
      }}
      role="img"
      aria-label={label}
    >
      <span className="px-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist/35">
        {label}
      </span>
    </div>
  )
}
