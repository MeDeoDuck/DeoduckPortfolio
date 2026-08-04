/**
 * 실제 발표자료 크롭 이미지가 준비된 seed 목록.
 * Placeholder가 이 목록을 보고, 있으면 <img>로, 없으면 IMG NN 자리표시자로 렌더한다.
 * 파일은 public/images/<seed>.webp 에 있고, base 경로는 vite base(/DeoduckPortfolio/)를 따른다.
 */
// 대표 카드는 전부 2장(-a·-b) 레이아웃으로 통일했다. -c 시드는 쓰지 않는다.
// moabom-b = 발표 13p 보고서 UI, stablediffusion-lst-b = 결과표.
const SEEDS = new Set<string>([
  'moabom-a', 'moabom-b', 'moabom-d1', 'moabom-d2',
  // 마퀴 전용: 발표 16p 일관성 검증(98/90/86) 슬라이드.
  'moabom-consistency',
  'fomo-breaker-a', 'fomo-breaker-b', 'fomo-breaker-d1', 'fomo-breaker-d2',
  'cage-carerf-a', 'cage-carerf-b', 'cage-carerf-d1', 'cage-carerf-d2',
  'stablediffusion-lst-a', 'stablediffusion-lst-b',
  'stablediffusion-lst-d1', 'stablediffusion-lst-d2',
  // physical-ai 카드 승격용: d1/d2를 카드 슬롯(-a/-b)으로 복제했다.
  'physical-ai-a', 'physical-ai-b',
  'track-reid-d1', 'track-reid-d2',
  'physical-ai-d1', 'physical-ai-d2',
  'ssvep-bci-d1', 'ssvep-bci-d2', 'ssvep-bci-pipeline',
  'nlp-slm-lora-d1', 'nlp-slm-lora-d2',
])

export function imageAsset(seed: string | undefined): string | undefined {
  if (!seed || !SEEDS.has(seed)) return undefined
  return `${import.meta.env.BASE_URL}images/${seed}.webp`
}
