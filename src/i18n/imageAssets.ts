/**
 * 실제 발표자료 크롭 이미지가 준비된 seed 목록.
 * Placeholder가 이 목록을 보고, 있으면 <img>로, 없으면 IMG NN 자리표시자로 렌더한다.
 * 파일은 public/images/<seed>.webp 에 있고, base 경로는 vite base(/DeoduckPortfolio/)를 따른다.
 */
const SEEDS = new Set<string>([
  'moabom-a', 'moabom-b', 'moabom-c', 'moabom-d1', 'moabom-d2',
  'fomo-breaker-a', 'fomo-breaker-b', 'fomo-breaker-c', 'fomo-breaker-d1', 'fomo-breaker-d2',
  // cage-carerf는 실험 결과 표(-c)를 뺐다. 카드가 자동으로 2장 레이아웃으로 떨어진다.
  'cage-carerf-a', 'cage-carerf-b', 'cage-carerf-d1', 'cage-carerf-d2',
  'stablediffusion-lst-a', 'stablediffusion-lst-b', 'stablediffusion-lst-c',
  'stablediffusion-lst-d1', 'stablediffusion-lst-d2',
  'track-reid-d1', 'track-reid-d2',
  'physical-ai-d1', 'physical-ai-d2',
  'ssvep-bci-d1', 'ssvep-bci-d2', 'ssvep-bci-pipeline',
  'nlp-slm-lora-d1', 'nlp-slm-lora-d2',
])

export function imageAsset(seed: string | undefined): string | undefined {
  if (!seed || !SEEDS.has(seed)) return undefined
  return `${import.meta.env.BASE_URL}images/${seed}.webp`
}
