import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import Navbar from '../components/Navbar'
import ContactButton from '../components/ContactButton'
import Placeholder from '../components/Placeholder'
import { useLang } from '../i18n/LanguageContext'

export default function HeroSection() {
  const { t } = useLang()

  return (
    <section className="relative flex h-screen min-h-[640px] flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn delay={0} y={-20}>
        <Navbar />
      </FadeIn>

      <div className="relative flex flex-1 flex-col justify-center">
        <FadeIn delay={0.1} y={20}>
          <p className="px-6 font-mono text-[0.7rem] uppercase tracking-[0.35em] text-mist/50 md:px-10 md:text-xs">
            {t.hero.greeting}
          </p>
        </FadeIn>

        <div className="overflow-hidden px-6 md:px-10">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-display w-full whitespace-nowrap text-[15vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17vw]">
              {t.hero.name}
            </h1>
          </FadeIn>
        </div>

        {/* 지표 스트립 — 이 페이지에서 가장 먼저 기억되어야 할 것 */}
        <FadeIn delay={0.3} y={20}>
          <ul className="relative z-20 mt-4 flex flex-wrap gap-x-8 gap-y-3 px-6 md:mt-6 md:gap-x-14 md:px-10">
            {t.hero.metrics.map((m) => (
              <li key={m.label} className="flex flex-col">
                <span className="font-mono text-xl font-bold text-frost sm:text-2xl md:text-3xl">
                  {m.value}
                </span>
                <span className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-mist/45 md:text-xs">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>

      <div className="relative z-20 flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.4} y={20}>
          <p
            className="max-w-[190px] font-light uppercase leading-snug tracking-wide text-mist sm:max-w-[240px] md:max-w-[300px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.35rem)' }}
          >
            {t.hero.tagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton label={t.hero.cta} />
        </FadeIn>
      </div>

      {/* 마그네틱 포트레이트 (임시 자리) */}
      <FadeIn
        delay={0.6}
        y={30}
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[260px] -translate-x-1/2 sm:w-[340px] md:w-[420px] lg:w-[480px]"
      >
        <Magnet padding={150} strength={3}>
          <Placeholder
            label="프로필 사진 자리"
            seed="portrait"
            rounded="rounded-t-[80px]"
            className="aspect-[3/4] w-full"
          />
        </Magnet>
      </FadeIn>
    </section>
  )
}
