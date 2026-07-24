import Magnet from '../components/Magnet'
import Navbar from '../components/Navbar'
import ContactButton from '../components/ContactButton'
import Placeholder from '../components/Placeholder'
import { useLang } from '../i18n/LanguageContext'

/**
 * 첫 화면 진입은 CSS 애니메이션으로 돌린다.
 * 페이지 로드 중에는 메인 스레드가 바빠 JS 모션이 프레임을 떨어뜨린다.
 * CSS는 합성 스레드에서 돌아 로드 중에도 부드럽다.
 */
function rise(delay: number) {
  return { animationDelay: `${delay}ms` }
}

export default function HeroSection() {
  const { t } = useLang()

  return (
    <section className="relative flex h-screen min-h-[640px] flex-col" style={{ overflowX: 'clip' }}>
      <div className="rise" style={rise(0)}>
        <Navbar />
      </div>

      <div className="relative flex flex-1 flex-col justify-center">
        <p
          className="rise px-6 font-mono text-[0.7rem] uppercase tracking-[0.35em] text-mist/50 md:px-10 md:text-xs"
          style={rise(90)}
        >
          {t.hero.greeting}
        </p>

        <div className="overflow-hidden px-6 md:px-10">
          <h1
            className="hero-heading font-display rise w-full whitespace-nowrap text-[15vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17vw]"
            style={rise(150)}
          >
            {t.hero.name}
          </h1>
        </div>

        {/* 지표 스트립 — 이 페이지에서 가장 먼저 기억되어야 할 것 */}
        <ul className="relative z-20 mt-4 flex flex-wrap gap-x-8 gap-y-3 px-6 md:mt-6 md:gap-x-14 md:px-10">
          {t.hero.metrics.map((m, i) => (
            <li key={m.label} className="rise flex flex-col" style={rise(300 + i * 70)}>
              <span className="font-mono text-xl font-bold text-frost sm:text-2xl md:text-3xl">
                {m.value}
              </span>
              <span className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-mist/45 md:text-xs">
                {m.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-20 flex items-end justify-between gap-6 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <p
          className="rise max-w-[190px] font-light uppercase leading-snug tracking-wide text-mist sm:max-w-[240px] md:max-w-[300px]"
          style={{ ...rise(520), fontSize: 'clamp(0.75rem, 1.4vw, 1.35rem)' }}
        >
          {t.hero.tagline}
        </p>
        <div className="rise shrink-0" style={rise(590)}>
          <ContactButton label={t.hero.cta} />
        </div>
      </div>

      {/* 마그네틱 포트레이트 (임시 자리) */}
      <div
        className="rise pointer-events-none absolute bottom-0 left-1/2 z-10 w-[260px] -translate-x-1/2 sm:w-[340px] md:w-[420px] lg:w-[480px]"
        style={rise(660)}
      >
        <Magnet padding={150} strength={3}>
          <Placeholder
            label="프로필 사진 자리"
            seed="portrait"
            rounded="rounded-t-[80px]"
            className="aspect-[3/4] w-full"
          />
        </Magnet>
      </div>
    </section>
  )
}
