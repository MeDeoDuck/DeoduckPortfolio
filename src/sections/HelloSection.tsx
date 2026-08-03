import FadeIn from '../components/FadeIn'
import Typewriter from '../components/Typewriter'
import { useLang } from '../i18n/LanguageContext'
import type { InfoItem } from '../i18n/types'

export default function HelloSection() {
  const { t } = useLang()
  const h = t.hello

  return (
    <section
      id="hello"
      className="relative scroll-mt-24 px-5 py-24 md:px-10 md:py-32"
      style={{ overflowX: 'clip' }}
    >
      {/* 팔레트는 셋뿐이다. 면을 칠하는 대신 액센트를 아주 옅게 흘려 이 구역의 공기만 바꾼다. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[520px] w-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgb(0 113 227 / 0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:gap-16">
          <FadeIn x={-28} y={0} duration={0.6} className="shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}images/portrait.jpg`}
              alt="김재현 프로필 사진"
              loading="lazy"
              decoding="async"
              className="h-72 w-56 rounded-3xl border border-ink/10 object-cover shadow-[0_1px_2px_rgb(29_29_31/0.04),0_24px_48px_-28px_rgb(29_29_31/0.28)] md:h-80 md:w-60"
            />
          </FadeIn>

          <div className="flex flex-1 flex-col justify-between gap-8">
            <div>
              <FadeIn y={20}>
                <p className="t-eyebrow font-mono text-accent">{h.eyebrow}</p>
              </FadeIn>

              <FadeIn delay={0.06} y={20}>
                <Typewriter
                  text={h.typed}
                  className="t-h2 font-display mt-4 text-ink"
                />
              </FadeIn>

              <FadeIn delay={0.12} y={20}>
                <h2 className="t-h2 font-display mt-3 text-ink">
                  {h.headline.lead}
                  <span className="text-accent">{h.headline.accent}</span>
                  {h.headline.tail}
                </h2>
              </FadeIn>

              <FadeIn delay={0.18} y={20}>
                <div className="mt-7 h-[2px] w-52 rounded-full bg-accent" />
              </FadeIn>
            </div>

            <FadeIn delay={0.24} y={20}>
              {/* 자기소개는 문장 단위로 줄을 끊어 쓴다. \n이 그대로 줄바꿈으로 보이게 pre-line. */}
              <p className="t-body max-w-lg whitespace-pre-line text-ink/65">{h.body}</p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <InfoCard label={h.infoLabel} items={h.info} delay={0.06} />
          <InfoCard label={h.contactLabel} items={h.contacts} delay={0.12} />
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  label,
  items,
  delay,
}: {
  label: string
  items: InfoItem[]
  delay: number
}) {
  return (
    <FadeIn delay={delay} y={18}>
      <div className="card h-full rounded-3xl p-6">
        <p className="t-eyebrow font-mono text-accent">{label}</p>
        <dl className="mt-5 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.label}>
              <dt className="t-eyebrow text-ink/50">{item.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                {item.href ? (
                  /* mailto·tel은 같은 탭에서 핸들러가 받는다. 새 탭을 열면 빈 탭만 남는다. */
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="pressable hover-dim break-all underline decoration-ink/20 underline-offset-4 hover:decoration-accent"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="break-keep">{item.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </FadeIn>
  )
}
