import { Github, Mail } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

export default function ContactSection() {
  const { t } = useLang()

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center gap-10 bg-ink px-5 pb-20 pt-10 sm:px-8 md:px-10 md:pb-28"
    >
      <FadeIn y={30}>
        <h2
          className="hero-heading font-display text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 10vw, 130px)' }}
        >
          {t.contact.heading}
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p className="max-w-[560px] text-center font-light leading-relaxed text-mist/70">
          {t.contact.body}
        </p>
      </FadeIn>

      <FadeIn delay={0.2} y={20}>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <a
            href={`mailto:${t.contact.email}`}
            className="pressable hover-lift flex items-center gap-2 rounded-full border border-mist/40 px-6 py-3 font-mono text-xs tracking-wider text-mist hover:border-mist md:text-sm"
          >
            <Mail size={16} />
            {t.contact.email}
          </a>
          <a
            href={t.contact.github}
            target="_blank"
            rel="noreferrer"
            className="pressable hover-lift flex items-center gap-2 rounded-full border border-mist/40 px-6 py-3 font-mono text-xs tracking-wider text-mist hover:border-mist md:text-sm"
          >
            <Github size={16} />
            github.com/MeDeoDuck
          </a>
        </div>
      </FadeIn>

      <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist/25">
        {t.footer}
      </p>
    </section>
  )
}
