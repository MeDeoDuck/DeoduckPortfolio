import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

interface Props {
  /** 상세 페이지에서는 앵커 대신 홈으로 돌아가는 링크를 쓴다 */
  variant?: 'home' | 'detail'
}

export default function Navbar({ variant = 'home' }: Props) {
  const { t, lang, toggle } = useLang()

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#capabilities', label: t.nav.capabilities },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <nav className="flex w-full items-center justify-between gap-4 px-6 pt-6 text-sm font-medium uppercase tracking-wider text-mist md:px-10 md:pt-8 md:text-lg lg:text-[1.35rem]">
      <div className="flex items-center gap-4 md:gap-8">
        {variant === 'home' ? (
          links.map((l) => (
            <a key={l.href} href={l.href} className="pressable hover-dim">
              {l.label}
            </a>
          ))
        ) : (
          <Link to="/" className="pressable hover-dim">
            {t.detailLabels.back}
          </Link>
        )}
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={lang === 'ko' ? 'Switch to English' : '한국어로 전환'}
        className="pressable flex shrink-0 items-center gap-1 rounded-full border border-mist/40 px-3 py-1 font-mono text-[0.7rem] tracking-widest md:text-xs"
        style={{ transition: 'transform 160ms var(--ease-out), border-color 200ms ease' }}
      >
        <span className={lang === 'ko' ? 'text-mist' : 'text-mist/40'}>KO</span>
        <span className="text-mist/30">/</span>
        <span className={lang === 'en' ? 'text-mist' : 'text-mist/40'}>EN</span>
      </button>
    </nav>
  )
}
