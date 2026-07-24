import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

/** 수상은 경력과 성격이 다르다. 같은 목록에 섞지 않고 별도 면으로 둔다. */
export default function AwardsSection() {
  const { t } = useLang()

  return (
    <section id="awards" className="surface scroll-mt-24 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-4xl">
        <FadeIn y={24}>
          <h2 className="t-h2 font-display mb-12 text-mist md:mb-16">{t.awards.heading}</h2>
        </FadeIn>

        <ul>
          {t.awards.items.map((award, i) => (
            <FadeIn key={award.title} delay={i * 0.05} y={16}>
              <li
                className="flex flex-col gap-1 py-5 md:flex-row md:gap-10 md:py-6"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgb(215 226 234 / 0.1)' }}
              >
                <span className="t-eyebrow shrink-0 pt-1 font-mono text-accent md:w-44">
                  {award.year}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="t-h3 text-mist">{award.title}</h3>
                  {award.org && <p className="t-body text-mist/50">{award.org}</p>}
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <FadeIn y={16}>
            <div>
              <h3 className="t-eyebrow mb-4 font-mono text-mist/35">
                {t.awards.certificationsLabel}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {t.awards.certifications.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-mist/15 px-3.5 py-1.5 font-mono text-[0.7rem] text-mist/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} y={16}>
            <div>
              <h3 className="t-eyebrow mb-4 font-mono text-mist/35">{t.awards.copyrightsLabel}</h3>
              <ul className="flex flex-wrap gap-2">
                {t.awards.copyrights.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-mist/15 px-3.5 py-1.5 font-mono text-[0.7rem] text-mist/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
