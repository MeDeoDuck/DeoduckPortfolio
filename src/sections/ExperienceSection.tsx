import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

export default function ExperienceSection() {
  const { t } = useLang()

  return (
    <section id="experience" className="scroll-mt-24 bg-ink px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-4xl">
        <FadeIn y={24}>
          <h2 className="t-h2 font-display mb-12 text-mist md:mb-16">{t.experience.heading}</h2>
        </FadeIn>

        <ol>
          {t.experience.items.map((item, i) => (
            <FadeIn key={`${item.title}-${item.org}`} delay={i * 0.05} y={16}>
              <li
                className="flex flex-col gap-1.5 py-6 md:flex-row md:gap-10 md:py-7"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgb(215 226 234 / 0.1)' }}
              >
                {item.period && (
                  <span className="t-eyebrow shrink-0 pt-1 font-mono text-mist/35 md:w-44">
                    {item.period}
                  </span>
                )}

                <div className="flex min-w-0 flex-col gap-1.5">
                  <h3 className="t-h3 text-mist">{item.title}</h3>
                  <p className="t-body text-mist/55">{item.org}</p>

                  {item.note && <p className="t-body max-w-2xl text-mist/45">{item.note}</p>}

                  {item.children && item.children.length > 0 && (
                    <ul className="mt-2 flex flex-col gap-1.5 border-l border-mist/10 pl-4">
                      {item.children.map((child) => (
                        <li
                          key={child.label}
                          className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3"
                        >
                          <span className="t-body text-mist/70">{child.label}</span>
                          <span className="t-eyebrow font-mono text-mist/30">{child.period}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  )
}
