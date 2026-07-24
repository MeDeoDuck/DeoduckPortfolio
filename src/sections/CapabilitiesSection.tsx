import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

export default function CapabilitiesSection() {
  const { t } = useLang()

  return (
    <section
      id="capabilities"
      className="relative z-0 rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="font-display mb-16 text-center font-black uppercase leading-none tracking-tight text-ink sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(2.6rem, 11vw, 150px)' }}
      >
        {t.capabilities.heading}
      </h2>

      <div className="mx-auto max-w-5xl">
        {t.capabilities.items.map((item, i) => (
          <FadeIn key={item.no} delay={i * 0.1} y={24}>
            <div
              className="flex flex-col gap-3 py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:gap-12 md:py-12"
              style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(12, 12, 12, 0.15)' }}
            >
              <span
                className="font-display shrink-0 font-black leading-none text-ink"
                style={{ fontSize: 'clamp(2.2rem, 8vw, 110px)' }}
              >
                {item.no}
              </span>
              <div className="flex flex-col gap-2 pt-1 md:gap-3">
                <h3
                  className="font-medium uppercase leading-tight text-ink"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2rem)' }}
                >
                  {item.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-ink/60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)' }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
