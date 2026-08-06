import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import Placeholder from '../components/Placeholder'
import { imageAsset } from '../i18n/imageAssets'
import { useLang } from '../i18n/LanguageContext'
import type { Project } from '../i18n/types'

/** 스택(넘김) 연출 없이 카드를 위에서 아래로 그냥 나열한다. */
export default function ProjectsSection() {
  const { t } = useLang()
  const featured = t.projects.items.filter((p) => p.featured)
  const rest = t.projects.items.filter((p) => !p.featured)

  return (
    <section id="projects" className="surface scroll-mt-24 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn y={24}>
          <p className="t-eyebrow font-mono text-accent">{t.projects.eyebrow}</p>
          <h2 className="t-h2 font-display mb-12 mt-3 text-ink md:mb-16">{t.projects.heading}</h2>
        </FadeIn>

        <div className="flex flex-col gap-6 md:gap-8">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} viewDetail={t.projects.viewDetail} />
          ))}
        </div>
      </div>

      {rest.length > 0 && (
        <div className="mx-auto mt-20 max-w-4xl md:mt-28">
          <FadeIn y={20}>
            <h3 className="t-eyebrow mb-6 font-mono text-accent">{t.projects.moreHeading}</h3>
          </FadeIn>
          <ul>
            {/* 그 외 경험은 상세 페이지로 보내지 않는다. 한 줄 요약만 담백하게. */}
            {rest.map((project) => (
              <FadeIn key={project.id} y={14}>
                <li className="flex flex-col gap-1.5 border-t border-ink/10 py-5 sm:flex-row sm:items-baseline sm:gap-5 md:py-6">
                  <span className="t-eyebrow shrink-0 font-mono text-ink/45 sm:w-10">
                    {project.no}
                  </span>
                  <span className="t-h3 min-w-0 shrink-0 text-ink sm:w-52">{project.name}</span>
                  <span className="t-body min-w-0 flex-1 text-ink/50 sm:truncate">
                    {project.tagline}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

function ProjectCard({ project, viewDetail }: { project: Project; viewDetail: string }) {
  // 등록된 이미지가 없는 프로젝트(ShiftLoss 등)는 이미지 블록 자체를 생략한다.
  const hasImages = Boolean(imageAsset(`${project.id}-a`))
  const hasWide = Boolean(imageAsset(`${project.id}-c`))

  return (
    <FadeIn y={20}>
      <article className="card flex flex-col gap-5 rounded-[28px] p-5 md:rounded-[36px] md:p-7">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="t-eyebrow font-mono text-accent">{project.no}</span>
              <span className="t-eyebrow font-mono text-ink/55">{project.category}</span>
            </div>
            <h3 className="t-h3 text-ink">{project.name}</h3>
            {/* 한 줄 설명은 줄바꿈 없이 한 줄로. 폭이 모자라면 말줄임(모바일은 예외적으로 래핑 허용). */}
            <p className="t-body text-ink/65 md:truncate">{project.tagline}</p>
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

        {/* 넓은 앵커 이미지(-c)가 있으면 비대칭 3장, 없으면 2장을 같은 비중으로 나눈다. */}
        {hasImages &&
          (hasWide ? (
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-2 flex flex-col gap-3">
                <Placeholder
                  label={`${project.name} 01`}
                  seed={`${project.id}-a`}
                  rounded="rounded-lg"
                  className="w-full flex-1"
                  scoped
                />
                <Placeholder
                  label={`${project.name} 02`}
                  seed={`${project.id}-b`}
                  rounded="rounded-lg"
                  className="w-full flex-1"
                  scoped
                />
              </div>
              <Placeholder
                label={`${project.name} 03`}
                seed={`${project.id}-c`}
                rounded="rounded-lg"
                className="col-span-3 min-h-[170px] w-full md:min-h-[240px]"
                scoped
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Placeholder
                label={`${project.name} 01`}
                seed={`${project.id}-a`}
                rounded="rounded-lg"
                className="aspect-video w-full"
                scoped
              />
              <Placeholder
                label={`${project.name} 02`}
                seed={`${project.id}-b`}
                rounded="rounded-lg"
                className="aspect-video w-full"
                scoped
              />
            </div>
          ))}
      </article>
    </FadeIn>
  )
}
