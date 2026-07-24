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
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {/* 코너 장식 (임시 자리) */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute left-[1%] top-[6%] w-[92px] sm:left-[2%] sm:w-[130px] md:left-[4%] md:w-[170px]"
      >
        <Placeholder label="deco 1" seed="deco-a" className="aspect-square w-full" />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] left-[3%] w-[80px] sm:left-[6%] sm:w-[115px] md:left-[10%] md:w-[145px]"
      >
        <Placeholder label="deco 2" seed="deco-b" className="aspect-square w-full" />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute right-[1%] top-[6%] w-[92px] sm:right-[2%] sm:w-[130px] md:right-[4%] md:w-[170px]"
      >
        <Placeholder label="deco 3" seed="deco-c" className="aspect-square w-full" />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] right-[3%] w-[85px] sm:right-[6%] sm:w-[120px] md:right-[10%] md:w-[155px]"
      >
        <Placeholder label="deco 4" seed="deco-d" className="aspect-square w-full" />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-display text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 150px)' }}
          >
            {t.about.heading}
          </h2>
        </FadeIn>

        <AnimatedText
          text={t.about.body}
          className="max-w-[620px] text-center font-medium leading-relaxed text-mist"
          />
      </div>

      <div className="relative z-10 mt-16 sm:mt-20 md:mt-24">
        <FadeIn delay={0.1} y={20}>
          <ContactButton label={t.hero.cta} />
        </FadeIn>
      </div>
    </section>
  )
}
