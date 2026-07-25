import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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
    <section id="projects" className="scroll-mt-24 bg-paper px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn y={24}>
          <h2 className="t-h2 font-display mb-12 text-ink md:mb-16">{t.projects.heading}</h2>
        </FadeIn>

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

      <div className="mx-auto mt-20 max-w-4xl md:mt-28">
        <FadeIn y={20}>
          <h3 className="t-eyebrow mb-6 font-mono text-ink/55">{t.projects.moreHeading}</h3>
        </FadeIn>
        <ul>
          {rest.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.04} y={14}>
              <li className="border-t border-ink/10">
                <Link
                  to={`/project/${project.id}`}
                  className="group pressable flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-5 md:py-6"
                >
                  <span className="t-eyebrow shrink-0 font-mono text-ink/45 sm:w-10">
                    {project.no}
                  </span>
                  <span className="t-h3 min-w-0 shrink-0 text-ink sm:w-52">{project.name}</span>
                  <span className="t-body flex-1 text-ink/50">{project.tagline}</span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-ink/45 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
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
  const reduce = useReducedMotion()
  // 화면을 통째로 넘겨야 끝나면 지루하다. 카드 위가 화면 중간에 닿을 때 마무리한다.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.5'],
  })

  const targetScale = 1 - (total - 1 - index) * 0.025
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={ref} className="sticky h-[66vh]" style={{ top: `${index * 22}px` }}>
      <motion.article
        style={{ scale: reduce ? 1 : scale }}
        className="card sticky top-24 flex flex-col gap-5 rounded-[28px] p-5 md:top-28 md:rounded-[36px] md:p-7"
      >
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="t-eyebrow font-mono text-accent">{project.no}</span>
              <span className="t-eyebrow font-mono text-ink/55">{project.category}</span>
            </div>
            <h3 className="t-h3 text-ink">{project.name}</h3>
            <p className="t-body max-w-xl text-ink/65">{project.tagline}</p>
          </div>

          <Link
            to={`/project/${project.id}`}
            className="pressable hover-edge shrink-0 self-start rounded-full border border-ink/25 px-5 py-2 text-center font-mono text-[0.7rem] tracking-widest text-ink/80"
          >
            {viewDetail}
          </Link>
        </header>

        {project.metrics.length > 0 && (
          <ul className="flex flex-wrap gap-x-8 gap-y-3 border-y border-ink/10 py-4 md:gap-x-12">
            {project.metrics.map((m) => (
              <li key={m.label} className="flex flex-col">
                <span className="t-metric font-mono text-ink">{m.value}</span>
                <span className="t-eyebrow mt-1 text-ink/55">{m.label}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2 flex flex-col gap-3">
            <Placeholder
              label={`${project.name} 01`}
              seed={`${project.id}-a`}
              rounded="rounded-2xl"
              className="w-full flex-1"
            />
            <Placeholder
              label={`${project.name} 02`}
              seed={`${project.id}-b`}
              rounded="rounded-2xl"
              className="w-full flex-1"
            />
          </div>
          <Placeholder
            label={`${project.name} 03`}
            seed={`${project.id}-c`}
            rounded="rounded-2xl"
            className="col-span-3 min-h-[170px] w-full md:min-h-[240px]"
          />
        </div>
      </motion.article>
    </div>
  )
}
