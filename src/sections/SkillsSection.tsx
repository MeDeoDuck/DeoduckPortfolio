import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { useLang } from '../i18n/LanguageContext'
import type { SkillItem } from '../i18n/types'

export default function SkillsSection() {
  const { t } = useLang()

  return (
    /* 면은 색이 아니라 높이로 나눈다. 원본처럼 파란 판을 깔면 3색 팔레트가 무너진다. */
    <section id="skills" className="scroll-mt-24 bg-paper px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn y={20}>
          <p className="t-eyebrow font-mono text-accent">{t.skills.eyebrow}</p>
          <h2 className="t-h2 font-display mt-3 text-ink">{t.skills.heading}</h2>
        </FadeIn>

        <div className="mt-12 grid gap-x-12 gap-y-10 md:mt-16 md:grid-cols-2">
          {t.skills.groups.map((group, gi) => (
            <FadeIn
              key={group.label}
              delay={gi * 0.06}
              y={16}
              className={group.wide ? 'md:col-span-2' : undefined}
            >
              <p className="t-eyebrow text-ink/50">{group.label}</p>
              {/* 항목 수와 무관하게 항상 정확히 두 줄. 끝줄에 한두 개만 남으면 눈에 걸린다. */}
              <div
                className="mt-4 flex flex-wrap gap-3 md:grid md:[grid-template-columns:repeat(var(--cols),var(--tile))]"
                style={
                  {
                    '--cols': Math.ceil(group.items.length / 2),
                    '--tile': `${group.tile ?? 84}px`,
                  } as CSSProperties
                }
              >
                {group.items.map((item) => (
                  <Tile key={item.name} item={item} width={group.tile ?? 84} />
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/** "anthropics/superpowers"처럼 소유자가 붙은 이름은 두 줄로 끊어 읽힌다. */
function splitName(name: string) {
  const at = name.indexOf('/')
  return at < 0 ? { owner: undefined, label: name } : { owner: name.slice(0, at + 1), label: name.slice(at + 1) }
}

/** 아이콘이 없거나 CDN이 죽어도 빈 칸을 남기지 않는다. 이름 첫 글자로 대체한다. */
function monogram(name: string) {
  const head = splitName(name).label.replace(/[^A-Za-z0-9가-힣+]/g, '')
  return head.slice(0, 2).toUpperCase()
}

function Tile({ item, width }: { item: SkillItem; width: number }) {
  const reduce = useReducedMotion()
  const [broken, setBroken] = useState(false)
  const showIcon = Boolean(item.icon) && !broken
  const { owner, label } = splitName(item.name)

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      style={{ width }}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-paper p-3 shadow-[0_1px_2px_rgb(29_29_31/0.04)] transition-[border-color,box-shadow] duration-200 hover:border-accent/35 hover:shadow-[0_1px_2px_rgb(29_29_31/0.04),0_10px_22px_-14px_rgb(29_29_31/0.35)]"
    >
      <div className="flex h-10 w-10 items-center justify-center">
        {showIcon ? (
          <img
            src={item.icon}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setBroken(true)}
            /* 배경이 꽉 찬 정사각 로고(MORAI·Higgsfield)가 각지지 않게. 투명 로고엔 영향 없다. */
            className="h-full w-full rounded-[9px] object-contain"
          />
        ) : (
          <span className="font-mono text-[0.8rem] font-bold tracking-tight text-accent">
            {monogram(item.name)}
          </span>
        )}
      </div>
      <span className="text-center text-[0.68rem] font-medium leading-tight text-ink/70">
        {owner && <span className="block text-[0.6rem] font-normal text-ink/35">{owner}</span>}
        {label}
      </span>
    </motion.div>
  )
}
