import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'
import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

export default function AboutSection() {
  const { t } = useLang()

  return (
    <section
      id="about"
      className="relative flex min-h-[80vh] scroll-mt-24 flex-col items-center justify-center px-5 py-24 md:px-10 md:py-32"
    >
      <div className="relative z-10 flex max-w-[640px] flex-col items-center gap-8 md:gap-10">
        <FadeIn y={24}>
          <h2 className="t-h2 font-display text-center text-ink">{t.about.heading}</h2>
        </FadeIn>

        <AnimatedText text={t.about.body} className="t-body text-center text-ink/85" />

        <FadeIn delay={0.1} y={16}>
          <ContactButton label={t.hero.cta} />
        </FadeIn>
      </div>
    </section>
  )
}
