import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import Placeholder from '../components/Placeholder'
import { useLang } from '../i18n/LanguageContext'
import type { Project } from '../i18n/types'

export default function ProjectsSection() {
  const { t } = useLang()
  const featured = t.projects.items.filter((p) => p.featured)
  const rest = t.projects.items.filter((p) => !p.featured)

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-28"
    >
      <h2
        className="hero-heading font-display mb-14 text-center font-black uppercase leading-none tracking-tight md:mb-20"
        style={{ fontSize: 'clamp(2.6rem, 11vw, 150px)' }}
      >
        {t.projects.heading}
      </h2>

      <div className="mx-auto max-w-6xl">
        {featured.map((project, i) => (
          <StackCard
            key={project.id}
            project={project}
            index={i}
            total={featured.length}
            viewDetail={t.projects.viewDetail}
          />
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-5xl md:mt-32">
        <FadeIn y={24}>
          <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-mist/50 md:mb-10">
            {t.projects.moreHeading}
          </h3>
        </FadeIn>
        <ul>
          {rest.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.05} y={20}>
              <li className="border-t border-white/10">
                <Link
                  to={`/project/${project.id}`}
                  className="group flex flex-col gap-2 py-6 transition-colors duration-200 hover:bg-white/[0.03] sm:flex-row sm:items-baseline sm:gap-6 md:py-7"
                >
                  <span className="font-mono text-xs text-mist/35">{project.no}</span>
                  <span className="min-w-[190px] font-display text-lg font-medium uppercase tracking-wide text-mist md:text-xl">
                    {project.name}
                  </span>
                  <span className="flex-1 text-sm font-light leading-relaxed text-mist/55 md:text-base">
                    {project.tagline}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-mist/40 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mist"
                  />
                </Link>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}

function StackCard({
  project,
  index,
  total,
  viewDetail,
}: {
  project: Project
  index: number
  total: number
  viewDetail: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={ref} className="sticky h-[85vh]" style={{ top: `${index * 28}px` }}>
      <motion.article
        style={{ scale }}
        className="sticky top-24 flex flex-col gap-6 rounded-[40px] border-2 border-mist/70 bg-ink p-4 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
      >
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4 md:gap-7">
            <span
              className="font-display font-black leading-none text-mist/20"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 96px)' }}
            >
              {project.no}
            </span>
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist/45">
                {project.category}
              </span>
              <h3
                className="font-display font-medium uppercase leading-tight text-mist"
                style={{ fontSize: 'clamp(1.3rem, 3vw, 2.4rem)' }}
              >
                {project.name}
              </h3>
              <p className="max-w-xl text-sm font-light leading-relaxed text-mist/60 md:text-base">
                {project.tagline}
              </p>
            </div>
          </div>

          <Link
            to={`/project/${project.id}`}
            className="shrink-0 rounded-full border-2 border-mist px-7 py-2.5 text-center text-xs font-medium uppercase tracking-widest text-mist transition-colors duration-200 hover:bg-mist/10 sm:px-9 sm:py-3 sm:text-sm"
          >
            {viewDetail}
          </Link>
        </header>

        {project.metrics.length > 0 && (
          <ul className="flex flex-wrap gap-x-8 gap-y-3 border-y border-white/10 py-4 md:gap-x-12">
            {project.metrics.map((m) => (
              <li key={m.label} className="flex flex-col">
                <span className="font-mono text-base font-bold text-frost md:text-xl">
                  {m.value}
                </span>
                <span className="mt-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-mist/40 md:text-[0.7rem]">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-5 gap-3 md:gap-4">
          <div className="col-span-2 flex flex-col gap-3 md:gap-4">
            <Placeholder
              label={`${project.name} 01`}
              seed={`${project.id}-a`}
              rounded="rounded-[28px] md:rounded-[44px]"
              className="w-full"
              />
            <Placeholder
              label={`${project.name} 02`}
              seed={`${project.id}-b`}
              rounded="rounded-[28px] md:rounded-[44px]"
              className="w-full flex-1"
            />
          </div>
          <Placeholder
            label={`${project.name} 03`}
            seed={`${project.id}-c`}
            rounded="rounded-[28px] md:rounded-[44px]"
            className="col-span-3 min-h-[190px] w-full md:min-h-[280px]"
          />
        </div>
      </motion.article>
    </div>
  )
}
