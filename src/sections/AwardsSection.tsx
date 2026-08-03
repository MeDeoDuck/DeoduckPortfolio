import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

/** 수상은 경력과 성격이 다르다. 같은 목록에 섞지 않고 별도 면으로 둔다. */
export default function AwardsSection() {
  const { t } = useLang()

  return (
    <section id="awards" className="surface scroll-mt-24 px-5 py-20 md:px-10 md:py-28">
      {/* 제목 기준선은 기술 스택 섹션(max-w-5xl)의 왼쪽 라인에 맞춘다. 콘텐츠는 4xl 유지. */}
      <div className="mx-auto max-w-5xl">
        <FadeIn y={24}>
          <h2 className="t-h2 font-display mb-12 text-ink md:mb-16">{t.awards.heading}</h2>
        </FadeIn>
      </div>
      <div className="mx-auto max-w-4xl">
        <ul>
          {t.awards.items.map((award, i) => (
            <FadeIn key={award.title} delay={i * 0.05} y={16}>
              <li
                className="flex flex-col gap-1 py-5 md:flex-row md:gap-10 md:py-6"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgb(29 29 31 / 0.1)' }}
              >
                <span className="t-eyebrow shrink-0 pt-1 font-mono text-accent md:w-44">
                  {award.year}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="t-h3 text-ink">{award.title}</h3>
                  {award.org && <p className="t-body text-ink/50">{award.org}</p>}
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
