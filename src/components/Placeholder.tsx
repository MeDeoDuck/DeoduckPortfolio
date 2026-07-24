interface Props {
  /** 나중에 실제 이미지로 교체할 자리. 라벨은 무엇이 들어갈지 표시용. */
  label: string
  className?: string
  /** 그라디언트를 라벨마다 다르게 만들기 위한 시드 */
  seed?: string
  rounded?: string
}

const PALETTES: Array<[string, string]> = [
  ['#1B2430', '#39505F'],
  ['#241B30', '#4A3A63'],
  ['#1B2A26', '#35594E'],
  ['#2C2118', '#5C4632'],
  ['#191F2E', '#33436B'],
  ['#2A1A22', '#5A3646'],
]

function pick(seed: string): [string, string] {
  let sum = 0
  for (let i = 0; i < seed.length; i += 1) sum += seed.charCodeAt(i)
  return PALETTES[sum % PALETTES.length]
}

/** 임시 이미지 자리. 실제 사진·스크린샷이 준비되면 이 컴포넌트만 <img>로 바꾸면 된다. */
export default function Placeholder({ label, className, seed, rounded = 'rounded-3xl' }: Props) {
  const [from, to] = pick(seed ?? label)

  return (
    <div
      className={`relative grain flex items-center justify-center overflow-hidden border border-white/10 ${rounded} ${className ?? ''}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      role="img"
      aria-label={label}
    >
      <span className="px-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>
    </div>
  )
}
