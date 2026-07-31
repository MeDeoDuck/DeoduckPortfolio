import { content } from './content'
import { imageAsset } from './imageAssets'

/**
 * 이미지 자리마다 연속 번호를 매긴다.
 * 렌더 순서로 세면 StrictMode 이중 렌더·리렌더에 번호가 어긋난다.
 * 그래서 데이터를 기준으로 한 번만, 결정적으로 매긴다.
 * 각 Placeholder는 자기 seed로 이 표에서 번호를 찾아 쓴다.
 *
 * 번호 순서 = 페이지를 위에서 아래로 훑는 순서:
 *   히어로 → 마퀴 → 대표 프로젝트 카드 → 각 프로젝트 상세페이지
 */

/**
 * 장식용 마퀴 타일.
 * 한 프로젝트당 한 장만 쓴다. 같은 프로젝트를 연달아 넣으면 띠 전체가
 * 한두 프로젝트로 보인다. 이미지가 있는 8개 프로젝트를 두 줄에 나눠
 * 대표작·비대표작을 섞고, 결과표·표지 대신 파이프라인·구조도만 고른다.
 */
export const MARQUEE_ROW_ONE = [
  'moabom-a', // 서비스 아키텍처
  'cage-carerf-b', // 전체 학습 파이프라인
  'physical-ai-d1', // 인지 → 판단 → 제어 파이프라인
  'nlp-slm-lora-d2', // 과제 수행 파이프라인
]

export const MARQUEE_ROW_TWO = [
  'fomo-breaker-b', // 환각 게이트 플로우차트
  'stablediffusion-lst-a', // UNet + LST 구조
  'ssvep-bci-pipeline', // 최종 EEG 전처리 파이프라인
  'track-reid-d1', // ByteTrack + TransReID 통합
]

function buildOrder(): string[] {
  const items = content.ko.projects.items
  const featured = items.filter((p) => p.featured)

  const keys: string[] = []

  // 히어로 프로필
  keys.push('portrait')

  // 마퀴 (스크롤 타일). 3배 복제되지만 같은 자리 = 같은 번호.
  keys.push(...MARQUEE_ROW_ONE, ...MARQUEE_ROW_TWO)

  // 대표 프로젝트 카드 (홈): 기본 3장, 넓은 앵커 이미지(-c)를 뺀 카드는 2장
  for (const p of featured) {
    keys.push(`${p.id}-a`, `${p.id}-b`)
    if (imageAsset(`${p.id}-c`)) keys.push(`${p.id}-c`)
  }

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
