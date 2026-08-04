import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

interface Props {
  /** 상세 페이지에서는 앵커 대신 홈으로 돌아가는 링크를 쓴다 */
  variant?: 'home' | 'detail'
}

export default function Navbar({ variant = 'home' }: Props) {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  // 스토리 히어로는 텍스트 금지 구간이다. 내비게이션도 그 구간을 지나야 나타난다.
  const [pastStory, setPastStory] = useState(false)

  // 크롬은 처음엔 투명하다가, 내용이 밑으로 흘러들어올 때 재질이 생긴다.
  // 문턱을 낮게 둬야 조금만 움직여도 반응한다. 대신 전환은 길고 부드럽게.
  useEffect(() => {
    const story = document.getElementById('story')
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (!story) {
        setPastStory(true)
        return
      }
      const rect = story.getBoundingClientRect()
      setPastStory(rect.bottom <= window.innerHeight + 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* 섹션 순서와 동일하게: 역량 → 프로젝트 → 경력 → 수상 → 기술 → 대외활동 → 연락 */
  const links = [
    { href: '#hello', label: t.nav.hello },
    { href: '#capabilities', label: t.nav.capabilities },
    { href: '#projects', label: t.nav.projects },
    { href: '#experience', label: t.nav.experience },
    { href: '#awards', label: t.nav.awards },
    { href: '#skills', label: t.nav.skills },
    { href: '#activities', label: t.nav.activities },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${scrolled ? 'material' : ''}`}
      style={{
        opacity: pastStory ? 1 : 0,
        pointerEvents: pastStory ? 'auto' : 'none',
        transition:
          'opacity 360ms var(--ease-out), background-color 460ms var(--ease-out), backdrop-filter 460ms var(--ease-out), border-color 460ms var(--ease-out)',
      }}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 md:px-10 md:py-4">
        <div className="flex min-w-0 items-center gap-3 overflow-x-auto md:gap-7">
          {variant === 'home' ? (
            links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="pressable hover-dim shrink-0 text-[0.8rem] text-ink/75 md:text-sm"
              >
                {l.label}
              </a>
            ))
          ) : (
            <Link to="/" className="pressable hover-dim text-[0.8rem] text-ink/75 md:text-sm">
              {t.detailLabels.back}
            </Link>
          )}
        </div>

        <div className="flex shrink-0 items-center rounded-full border border-ink/15 p-0.5 font-mono text-[0.65rem] tracking-widest">
          {(['ko', 'en'] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className="relative rounded-full px-2.5 py-1"
            >
              {lang === code && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-full bg-ink/12"
                  transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                />
              )}
              <span className={`relative ${lang === code ? 'text-ink' : 'text-ink/55'}`}>
                {code.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
