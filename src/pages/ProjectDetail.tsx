import { ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import Navbar from '../components/Navbar'
import Placeholder from '../components/Placeholder'
import { useLang } from '../i18n/LanguageContext'

export default function ProjectDetail() {
  const { id } = useParams()
  const { t } = useLang()
  const project = t.projects.items.find((p) => p.id === id)

  if (!project) {
    return (
      <>
        <Navbar variant="detail" />
        <main className="flex min-h-screen items-center justify-center bg-ink">
          <Link to="/" className="pressable font-mono text-xs uppercase tracking-widest text-mist/60">
            {t.detailLabels.back}
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar variant="detail" />
      <main className="min-h-screen bg-ink pb-24 pt-24 md:pt-28" style={{ overflowX: 'clip' }}>
        <article className="mx-auto max-w-3xl px-5 md:px-10">
          <FadeIn y={16}>
            <p className="t-eyebrow font-mono text-mist/40">
              {project.no} · {project.category}
            </p>
          </FadeIn>

          <FadeIn delay={0.05} y={20}>
            <h1 className="t-h2 font-display mt-3 text-mist">{project.name}</h1>
          </FadeIn>

          <FadeIn delay={0.1} y={16}>
            <p className="t-body mt-4 max-w-2xl text-mist/70">{project.tagline}</p>
          </FadeIn>

          {project.metrics.length > 0 && (
            <FadeIn delay={0.15} y={16}>
              <ul className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-y border-mist/10 py-5 md:gap-x-14">
                {project.metrics.map((m) => (
                  <li key={m.label} className="flex flex-col">
                    <span className="t-metric font-mono text-mist">{m.value}</span>
                    <span className="t-eyebrow mt-1 text-mist/40">{m.label}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}

          <FadeIn delay={0.18} y={16}>
            <dl className="mt-9 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="t-eyebrow font-mono text-mist/35">{t.detailLabels.role}</dt>
                <dd className="t-body mt-1.5 text-mist/75">{project.role}</dd>
              </div>
              {project.period && (
                <div>
                  <dt className="t-eyebrow font-mono text-mist/35">{t.detailLabels.period}</dt>
                  <dd className="t-body mt-1.5 text-mist/75">{project.period}</dd>
                </div>
              )}
            </dl>
          </FadeIn>

          <FadeIn delay={0.22} y={16}>
            <div className="mt-8">
              <p className="t-eyebrow font-mono text-mist/35">{t.detailLabels.stack}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-mist/15 px-3 py-1 font-mono text-[0.7rem] text-mist/65"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {project.links.length > 0 && (
            <FadeIn delay={0.26} y={16}>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group pressable hover-edge flex items-center gap-2 rounded-full border border-mist/25 px-5 py-2.5 font-mono text-[0.72rem] tracking-widest text-mist/85"
                  >
                    {l.label}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.3} y={20}>
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              <Placeholder
                label={`${project.name} 스크린샷 1`}
                seed={`${project.id}-d1`}
                rounded="rounded-2xl"
                className="min-h-[180px] w-full md:min-h-[230px]"
              />
              <Placeholder
                label={`${project.name} 스크린샷 2`}
                seed={`${project.id}-d2`}
                rounded="rounded-2xl"
                className="min-h-[180px] w-full md:min-h-[230px]"
              />
            </div>
          </FadeIn>

          <div className="mt-14 flex flex-col gap-10">
            {project.detail.map((block, i) => (
              <FadeIn key={block.heading} delay={i * 0.04} y={18}>
                <section>
                  <h2 className="t-h3 font-display text-mist">{block.heading}</h2>
                  <div className="mt-3 flex flex-col gap-3.5">
                    {block.body.split('\n\n').map((para, j) => (
                      <p key={j} className="t-body max-w-2xl text-mist/65">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 border-t border-mist/10 pt-7">
            <Link
              to="/"
              className="pressable inline-block font-mono text-[0.72rem] uppercase tracking-[0.25em] text-mist/45 hover:text-mist"
            >
              {t.detailLabels.back}
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}
