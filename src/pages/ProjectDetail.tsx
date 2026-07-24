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
      <main className="flex min-h-screen flex-col bg-ink">
        <Navbar variant="detail" />
        <div className="flex flex-1 items-center justify-center">
          <Link to="/" className="font-mono text-sm uppercase tracking-widest text-mist/60">
            {t.detailLabels.back}
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ink pb-24" style={{ overflowX: 'clip' }}>
      <Navbar variant="detail" />

      <article className="mx-auto max-w-5xl px-5 pt-12 sm:px-8 md:px-10 md:pt-20">
        <FadeIn y={20}>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-mist/45">
            {project.no} · {project.category}
          </p>
        </FadeIn>

        <FadeIn delay={0.05} y={30}>
          <h1
            className="hero-heading font-display mt-3 font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 9vw, 110px)' }}
          >
            {project.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.12} y={20}>
          <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-mist/75 md:text-lg">
            {project.tagline}
          </p>
        </FadeIn>

        {project.metrics.length > 0 && (
          <FadeIn delay={0.18} y={20}>
            <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-y border-white/10 py-6 md:gap-x-16">
              {project.metrics.map((m) => (
                <li key={m.label} className="flex flex-col">
                  <span className="font-mono text-xl font-bold text-frost md:text-2xl">
                    {m.value}
                  </span>
                  <span className="mt-1 text-[0.65rem] uppercase tracking-[0.15em] text-mist/45">
                    {m.label}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        )}

        <FadeIn delay={0.22} y={20}>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist/40">
                {t.detailLabels.role}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-mist/80 md:text-base">
                {project.role}
              </dd>
            </div>
            {project.period && (
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist/40">
                  {t.detailLabels.period}
                </dt>
                <dd className="mt-2 text-sm text-mist/80 md:text-base">{project.period}</dd>
              </div>
            )}
          </dl>
        </FadeIn>

        <FadeIn delay={0.26} y={20}>
          <div className="mt-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist/40">
              {t.detailLabels.stack}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-mist/25 px-3 py-1 font-mono text-[0.7rem] text-mist/70"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {project.links.length > 0 && (
          <FadeIn delay={0.3} y={20}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group pressable flex items-center gap-2 rounded-full border-2 border-mist px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-mist md:text-sm"
                  style={{ transition: 'transform 160ms var(--ease-out), background-color 200ms ease' }}
                >
                  {l.label}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.34} y={30}>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <Placeholder
              label={`${project.name} 스크린샷 1`}
              seed={`${project.id}-d1`}
              rounded="rounded-[32px]"
              className="min-h-[200px] w-full md:min-h-[260px]"
            />
            <Placeholder
              label={`${project.name} 스크린샷 2`}
              seed={`${project.id}-d2`}
              rounded="rounded-[32px]"
              className="min-h-[200px] w-full md:min-h-[260px]"
            />
          </div>
        </FadeIn>

        <div className="mt-16 flex flex-col gap-12">
          {project.detail.map((block, i) => (
            <FadeIn key={block.heading} delay={i * 0.05} y={24}>
              <section>
                <h2 className="font-display text-xl font-medium uppercase tracking-wide text-mist md:text-2xl">
                  {block.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {block.body.split('\n\n').map((para, j) => (
                    <p
                      key={j}
                      className="max-w-3xl text-sm font-light leading-relaxed text-mist/70 md:text-base"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            </FadeIn>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-8">
          <Link
            to="/"
            className="pressable inline-block font-mono text-xs uppercase tracking-[0.25em] text-mist/50 hover:text-mist"
          >
            {t.detailLabels.back}
          </Link>
        </div>
      </article>
    </main>
  )
}
