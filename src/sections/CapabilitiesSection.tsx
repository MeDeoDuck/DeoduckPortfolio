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
      {/* 제목 기준선은 기술 스택 섹션(max-w-5xl)의 왼쪽 라인에 맞춘다. 콘텐츠는 4xl 유지. */}
      <div className="mx-auto max-w-5xl">
        <FadeIn y={24}>
          <p className="t-eyebrow font-mono text-accent">{t.capabilities.eyebrow}</p>
          <h2 className="t-h2 font-display mb-12 mt-3 text-ink md:mb-16">
            {t.capabilities.heading}
          </h2>
        </FadeIn>
      </div>
      <div className="mx-auto max-w-4xl">
        {t.capabilities.items.map((item, i) => (
          <FadeIn key={item.no} delay={i * 0.06} y={18}>
            <div
              className="flex flex-col gap-2 py-6 md:flex-row md:gap-10 md:py-7"
              style={{ borderTop: i === 0 ? 'none' : '1px solid rgb(29 29 31 / 0.1)' }}
            >
              <span className="t-eyebrow shrink-0 pt-1 font-mono text-accent md:w-16">
                {item.no}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="t-h3 text-ink">{item.name}</h3>
                <p className="t-body max-w-2xl text-ink/65">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
