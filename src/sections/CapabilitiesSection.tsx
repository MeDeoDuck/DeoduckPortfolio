import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

export default function CapabilitiesSection() {
  const { t } = useLang()

  return (
    /* 면은 색이 아니라 높이로 나눈다. 흰 판을 끼워 넣으면 팔레트가 무너진다. */
    <section
      id="capabilities"
      className="surface scroll-mt-24 px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn y={24}>
          <h2 className="t-h2 font-display mb-12 text-mist md:mb-16">
            {t.capabilities.heading}
          </h2>
        </FadeIn>

        {t.capabilities.items.map((item, i) => (
          <FadeIn key={item.no} delay={i * 0.06} y={18}>
            <div
              className="flex flex-col gap-2 py-6 md:flex-row md:gap-10 md:py-7"
              style={{ borderTop: i === 0 ? 'none' : '1px solid rgb(215 226 234 / 0.1)' }}
            >
              <span className="t-eyebrow shrink-0 pt-1 font-mono text-accent md:w-16">
                {item.no}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="t-h3 text-mist">{item.name}</h3>
                <p className="t-body max-w-2xl text-mist/55">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
