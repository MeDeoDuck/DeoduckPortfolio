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
  // 상세 페이지 전용(-p-): 2026-1 전시판넬에서 추출한 본문 이미지들.
  'moabom-p-arch', 'moabom-p-flow', 'moabom-p-agents', 'moabom-p-main',
  'moabom-p-report', 'moabom-p-comment-model', 'moabom-p-compare-model',
  'moabom-p-consistency', 'moabom-p-summary',
  // 서비스 화면 워크스루(-s01~-s13): 영상 선정 → 영상별 보고서 → 제품 단위 종합 보고서.
  'moabom-p-s01', 'moabom-p-s02', 'moabom-p-s03', 'moabom-p-s04', 'moabom-p-s05',
  'moabom-p-s06', 'moabom-p-s07', 'moabom-p-s08', 'moabom-p-s09', 'moabom-p-s10',
  'moabom-p-s11', 'moabom-p-s12', 'moabom-p-s13',
  'fomo-breaker-a', 'fomo-breaker-b', 'fomo-breaker-d1', 'fomo-breaker-d2',
  // FOMO 상세 페이지 전용(-p-): 최종발표 PDF에서 추출한 본문 이미지들.
  'fomo-p-idea', 'fomo-p-persona', 'fomo-p-debate', 'fomo-p-process',
  'fomo-p-input-flow', 'fomo-p-debate-flow', 'fomo-p-gate-flow', 'fomo-p-benchmark',
  'cage-carerf-a', 'cage-carerf-b', 'cage-carerf-d1', 'cage-carerf-d2',
  'stablediffusion-lst-a', 'stablediffusion-lst-b',
  'stablediffusion-lst-d1', 'stablediffusion-lst-d2',  // physical-ai 카드 승격용: d1/d2를 카드 슬롯(-a/-b)으로 복제했다.
  'physical-ai-a', 'physical-ai-b',
  'track-reid-d1', 'track-reid-d2',
  'physical-ai-d1', 'physical-ai-d2',
  'ssvep-bci-d1', 'ssvep-bci-d2', 'ssvep-bci-pipeline',
  'nlp-slm-lora-d1', 'nlp-slm-lora-d2',
])

/** 같은 파일명으로 이미지를 갈아끼우면 브라우저 캐시가 옛 그림을 보여준다.
 *  이미지 교체 배포 시 이 버전을 올려 캐시를 무효화한다. */
const ASSET_VERSION = 4

export function imageAsset(seed: string | undefined): string | undefined {
  if (!seed || !SEEDS.has(seed)) return undefined
  return `${import.meta.env.BASE_URL}images/${seed}.webp?v=${ASSET_VERSION}`
}
