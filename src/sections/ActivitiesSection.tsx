import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

/** 대외활동은 경력·학력과 성격이 다르다. 같은 목록에 섞지 않고 별도 섹션으로 세운다. */
export default function ActivitiesSection() {
  const { t } = useLang()

  return (
    <section id="activities" className="scroll-mt-24 bg-paper px-5 py-20 md:px-10 md:py-28">
      {/* 제목 기준선은 기술 스택 섹션(max-w-5xl)의 왼쪽 라인에 맞춘다. 콘텐츠는 4xl 유지. */}
      <div className="mx-auto max-w-5xl">
        <FadeIn y={24}>
          <h2 className="t-h2 font-display mb-12 text-ink md:mb-16">{t.activities.heading}</h2>
        </FadeIn>
      </div>
      <div className="mx-auto max-w-4xl">
        <ol>
          {t.activities.items.map((item, i) => (
            <FadeIn key={`${item.title}-${item.org}`} delay={i * 0.05} y={16}>
              <li
                className="flex flex-col gap-1.5 py-6 md:flex-row md:gap-10 md:py-7"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgb(29 29 31 / 0.1)' }}
              >
                {item.period && (
                  <span className="t-eyebrow shrink-0 pt-1 font-mono text-ink/55 md:w-44">
                    {item.period}
                  </span>
                )}

                <div className="flex min-w-0 flex-col gap-1.5">
                  <h3 className="t-h3 text-ink">{item.title}</h3>
                  <p className="t-body text-ink/65">{item.org}</p>

                  {item.note && <p className="t-body max-w-2xl text-ink/60">{item.note}</p>}

                  {item.children && item.children.length > 0 && (
                    <ul className="mt-2 flex flex-col gap-1.5 border-l border-ink/10 pl-4">
                      {item.children.map((child) => (
                        <li
                          key={child.label}
                          className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3"
                        >
                          <span className="t-body text-ink/70">{child.label}</span>
                          <span className="t-eyebrow font-mono text-ink/45">{child.period}</span>
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
