import { Github, Mail } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

export default function ContactSection() {
  const { t } = useLang()

  return (
    <section
      id="contact"
      className="relative flex scroll-mt-24 flex-col items-center gap-8 bg-paper px-5 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32"
    >
      <FadeIn y={24}>
        <p className="t-eyebrow text-center font-mono text-accent">{t.contact.eyebrow}</p>
        <h2 className="t-h2 font-display mt-3 text-center text-ink">{t.contact.heading}</h2>
      </FadeIn>

      <FadeIn delay={0.08} y={16}>
        <p className="t-body max-w-[520px] text-center text-ink/60">{t.contact.body}</p>
      </FadeIn>

      <FadeIn delay={0.16} y={16}>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={`mailto:${t.contact.email}`}
            className="pressable hover-edge flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-mono text-xs tracking-wider text-ink/80"
          >
            <Mail size={15} />
            {t.contact.email}
          </a>
          <a
            href={t.contact.github}
            target="_blank"
            rel="noreferrer"
            className="pressable hover-edge flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-mono text-xs tracking-wider text-ink/80"
          >
            <Github size={15} />
            github.com/MeDeoDuck
          </a>
        </div>
      </FadeIn>

      <p className="t-eyebrow mt-8 font-mono text-ink/20">{t.footer}</p>
    </section>
  )
}
