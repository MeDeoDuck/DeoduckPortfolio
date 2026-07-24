import Magnet from '../components/Magnet'
import ContactButton from '../components/ContactButton'
import Placeholder from '../components/Placeholder'
import { useLang } from '../i18n/LanguageContext'

/**
 * 첫 화면 진입은 CSS 애니메이션으로 돌린다.
 * 로드 중에는 메인 스레드가 바빠 JS 모션이 프레임을 떨어뜨린다.
 */
function rise(delay: number) {
  return { animationDelay: `${delay}ms` }
}

export default function HeroSection() {
  const { t } = useLang()

  return (
    <section
      className="relative flex h-screen min-h-[620px] flex-col pt-16 md:pt-20"
      style={{ overflowX: 'clip' }}
    >
      <div className="relative flex flex-1 flex-col justify-center">
        <p
          className="rise t-eyebrow px-5 font-mono text-mist/45 md:px-10"
          style={rise(60)}
        >
          {t.hero.greeting}
        </p>

        <div className="overflow-hidden px-5 md:px-10">
          <h1
            className="hero-heading font-display t-display rise mt-2 w-full whitespace-nowrap"
            style={rise(120)}
          >
            {t.hero.name}
          </h1>
        </div>

        {/* 지표 스트립 — 이 페이지에서 가장 먼저 기억되어야 할 것 */}
        <ul className="relative z-20 mt-6 flex flex-wrap gap-x-8 gap-y-3 px-5 md:gap-x-12 md:px-10">
          {t.hero.metrics.map((m, i) => (
            <li key={m.label} className="rise flex flex-col" style={rise(260 + i * 70)}>
              <span className="t-metric font-mono text-mist">{m.value}</span>
              <span className="t-eyebrow mt-1.5 text-mist/40">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-20 flex items-end justify-between gap-6 px-5 pb-8 md:px-10 md:pb-12">
        <p
          className="rise t-body max-w-[220px] text-mist/70 sm:max-w-[280px] md:max-w-[340px]"
          style={rise(480)}
        >
          {t.hero.tagline}
        </p>
        <div className="rise shrink-0" style={rise(550)}>
          <ContactButton label={t.hero.cta} />
        </div>
      </div>

      {/* 마그네틱 포트레이트 (임시 자리) */}
      <div
        className="rise pointer-events-none absolute bottom-0 left-1/2 z-10 w-[240px] -translate-x-1/2 sm:w-[310px] md:w-[380px] lg:w-[430px]"
        style={rise(620)}
      >
        <Magnet padding={150} strength={3}>
          <Placeholder
            label="프로필 사진 자리"
            seed="portrait"
            rounded="rounded-t-[72px]"
            className="aspect-[3/4] w-full"
          />
        </Magnet>
      </div>
    </section>
  )
}
