import { content } from './content'

/**
 * 이미지 자리마다 연속 번호를 매긴다.
 * 렌더 순서로 세면 StrictMode 이중 렌더·리렌더에 번호가 어긋난다.
 * 그래서 데이터를 기준으로 한 번만, 결정적으로 매긴다.
 * 각 Placeholder는 자기 seed로 이 표에서 번호를 찾아 쓴다.
 *
 * 번호 순서 = 페이지를 위에서 아래로 훑는 순서:
 *   히어로 → 마퀴 → About 장식 → 대표 프로젝트 카드 → 각 프로젝트 상세페이지
 */

// 실제 발표자료 이미지가 있는 seed로 채운다(장식용 마퀴). 없는 자리는 두지 않는다.
export const MARQUEE_ROW_ONE = [
  'moabom-c',
  'moabom-a',
  'moabom-b',
  'fomo-breaker-c',
  'fomo-breaker-a',
  'fomo-breaker-b',
]

export const MARQUEE_ROW_TWO = [
  'cage-carerf-c',
  'cage-carerf-a',
  'cage-carerf-b',
  'stablediffusion-lst-c',
  'stablediffusion-lst-a',
  'stablediffusion-lst-b',
]

function buildOrder(): string[] {
  const items = content.ko.projects.items
  const featured = items.filter((p) => p.featured)

  const keys: string[] = []

  // 히어로 프로필
  keys.push('portrait')

  // 마퀴 (스크롤 타일). 3배 복제되지만 같은 자리 = 같은 번호.
  keys.push(...MARQUEE_ROW_ONE, ...MARQUEE_ROW_TWO)

  // About 코너 장식
  keys.push('deco-a', 'deco-b', 'deco-c', 'deco-d')

  // 대표 프로젝트 카드 (홈): 각 3장
  for (const p of featured) keys.push(`${p.id}-a`, `${p.id}-b`, `${p.id}-c`)

  // 각 프로젝트 상세페이지: 각 2장
  for (const p of items) keys.push(`${p.id}-d1`, `${p.id}-d2`)

  return keys
}

const ORDER = buildOrder()
const MAP = new Map<string, number>(ORDER.map((key, i) => [key, i + 1]))

export function imageNumber(seed: string): number | undefined {
  return MAP.get(seed)
}

export const TOTAL_IMAGES = ORDER.length

/** 교체용 매니페스트 (사람이 읽는 용도). "IMG 07 = ..." */
export const IMAGE_MANIFEST = ORDER.map((key, i) => ({ no: i + 1, key }))
