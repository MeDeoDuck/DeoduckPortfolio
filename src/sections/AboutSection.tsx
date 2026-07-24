import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'
import FadeIn from '../components/FadeIn'
import Placeholder from '../components/Placeholder'
import { useLang } from '../i18n/LanguageContext'

export default function AboutSection() {
  const { t } = useLang()

  return (
    <section
      id="about"
      className="relative flex min-h-[80vh] scroll-mt-24 flex-col items-center justify-center px-5 py-24 md:px-10 md:py-32"
    >
      {/* 코너 장식 (임시 자리) */}
      <FadeIn
        delay={0.1}
        x={-60}
        y={0}
        duration={0.7}
        className="pointer-events-none absolute left-[2%] top-[8%] w-[76px] sm:w-[104px] md:left-[6%] md:w-[132px]"
      >
        <Placeholder label="deco 1" seed="deco-a" className="aspect-square w-full" />
      </FadeIn>
      <FadeIn
        delay={0.2}
        x={-60}
        y={0}
        duration={0.7}
        className="pointer-events-none absolute bottom-[10%] left-[5%] w-[64px] sm:w-[88px] md:left-[11%] md:w-[112px]"
      >
        <Placeholder label="deco 2" seed="deco-b" className="aspect-square w-full" />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={60}
        y={0}
        duration={0.7}
        className="pointer-events-none absolute right-[2%] top-[8%] w-[76px] sm:w-[104px] md:right-[6%] md:w-[132px]"
      >
        <Placeholder label="deco 3" seed="deco-c" className="aspect-square w-full" />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={60}
        y={0}
        duration={0.7}
        className="pointer-events-none absolute bottom-[10%] right-[5%] w-[68px] sm:w-[92px] md:right-[11%] md:w-[118px]"
      >
        <Placeholder label="deco 4" seed="deco-d" className="aspect-square w-full" />
      </FadeIn>

      <div className="relative z-10 flex max-w-[640px] flex-col items-center gap-8 md:gap-10">
        <FadeIn y={24}>
          <h2 className="t-h2 font-display text-center text-mist">{t.about.heading}</h2>
        </FadeIn>

        <AnimatedText text={t.about.body} className="t-body text-center text-mist/85" />

        <FadeIn delay={0.1} y={16}>
          <ContactButton label={t.hero.cta} />
        </FadeIn>
      </div>
    </section>
  )
}
