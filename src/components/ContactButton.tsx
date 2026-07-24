interface Props {
  label: string
  href?: string
  className?: string
}

/** 강조는 한 가지 색으로만 한다. 그라디언트를 여러 색으로 채우면 나머지가 다 흐려진다. */
export default function ContactButton({
  label,
  href = 'mailto:seankim0824@gmail.com',
  className,
}: Props) {
  return (
    <a
      href={href}
      className={`pressable hover-lift inline-block rounded-full bg-accent px-7 py-3 text-xs font-medium tracking-wide text-white sm:px-9 sm:py-3.5 sm:text-sm ${className ?? ''}`}
      style={{ boxShadow: '0 6px 20px rgb(10 132 255 / 0.28)' }}
    >
      {label}
    </a>
  )
}
