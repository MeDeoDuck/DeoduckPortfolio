import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'

/** 자격과 저작권도 수상과 같은 급으로 세운다. 작은 칩으로 밀어 넣으면 있으나 마나가 된다. */
export default function CredentialsSection() {
  const { t } = useLang()

  return (
    <>
      <CredentialList
        id="certifications"
        heading={t.awards.certificationsLabel}
        items={t.awards.certifications.map((name, i) => ({
          marker: String(i + 1).padStart(2, '0'),
          text: name,
        }))}
      />
      <CredentialList
        id="copyrights"
        heading={t.awards.copyrightsLabel}
        /* 저작권은 순번 대신 등록번호가 마커 자리에 선다. */
        items={t.awards.copyrights.map((c) => ({ marker: c.code, text: c.name }))}
        surface
      />
    </>
  )
}

function CredentialList({
  id,
  heading,
  items,
  surface,
}: {
  id: string
  heading: string
  items: Array<{ marker: string; text: string }>
  surface?: boolean
}) {
  return (
    <section
      id={id}
      className={`${surface ? 'surface' : 'bg-paper'} scroll-mt-24 px-5 py-20 md:px-10 md:py-28`}
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn y={24}>
          <h2 className="t-h2 font-display mb-10 text-ink md:mb-14">{heading}</h2>
        </FadeIn>

        <ul>
          {items.map((item, i) => (
            <FadeIn key={item.text} delay={i * 0.05} y={16}>
              <li
                className="flex flex-col gap-1 py-5 md:flex-row md:gap-10 md:py-6"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgb(29 29 31 / 0.1)' }}
              >
                <span className="t-eyebrow shrink-0 pt-1 font-mono text-accent md:w-44">
                  {item.marker}
                </span>
                <h3 className="t-h3 text-ink">{item.text}</h3>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
