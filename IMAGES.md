# 이미지 교체 안내 (IMG 01 ~ 48)

각 자리에 `IMG NN`이 표시된다. 실제 이미지가 준비되면 해당 번호를 짚어서 교체하면 된다.
번호는 페이지를 위에서 아래로 훑는 순서(홈 → 각 상세페이지)로 매겨졌고, `src/i18n/images.ts`가 단일 소스다.

## 홈 화면

| No | 위치 | 무엇 |
|---|---|---|
| 01 | Hero | 프로필 사진 |
| 02 | Marquee 1행 | Moabom 보고서 |
| 03 | Marquee 1행 | Moabom 아키텍처 |
| 04 | Marquee 1행 | FOMO 대시보드 |
| 05 | Marquee 1행 | FOMO 토론 화면 |
| 06 | Marquee 1행 | CAGE 그래프 |
| 07 | Marquee 1행 | VoiceStep 화면 |
| 08 | Marquee 2행 | Physical AI 주행 |
| 09 | Marquee 2행 | LiDAR 콘 인식 |
| 10 | Marquee 2행 | TrackWithReID |
| 11 | Marquee 2행 | ShiftLoss 그래프 |
| 12 | Marquee 2행 | LST 학습 곡선 |
| 13 | Marquee 2행 | Linkus20 에디터 |
| 14 | About | 코너 장식 좌상 |
| 15 | About | 코너 장식 좌하 |
| 16 | About | 코너 장식 우상 |
| 17 | About | 코너 장식 우하 |
| 18 | Moabom 카드 | 이미지 A |
| 19 | Moabom 카드 | 이미지 B |
| 20 | Moabom 카드 | 이미지 C |
| 21 | FOMO Breaker 카드 | 이미지 A |
| 22 | FOMO Breaker 카드 | 이미지 B |
| 23 | FOMO Breaker 카드 | 이미지 C |
| 24 | CAGE-CareRF 카드 | 이미지 A |
| 25 | CAGE-CareRF 카드 | 이미지 B |
| 26 | CAGE-CareRF 카드 | 이미지 C |
| 27 | StableDiffusion + LST 카드 | 이미지 A |
| 28 | StableDiffusion + LST 카드 | 이미지 B |
| 29 | StableDiffusion + LST 카드 | 이미지 C |

> Marquee는 3배 복제되어 스크롤되므로 같은 번호가 화면에 3번 보인다. 같은 이미지 한 장으로 교체하면 된다.
> 대표(핵심) 프로젝트 카드는 4개다: Moabom · FOMO Breaker · CAGE-CareRF · StableDiffusion + LST.

## 프로젝트 상세페이지 (각 2장)

| No | 프로젝트 | 슬롯 |
|---|---|---|
| 30 · 31 | Moabom | 스크린샷 1 · 2 |
| 32 · 33 | FOMO Breaker | 스크린샷 1 · 2 |
| 34 · 35 | CAGE-CareRF | 스크린샷 1 · 2 |
| 36 · 37 | ShiftLoss | 스크린샷 1 · 2 |
| 38 · 39 | StableDiffusion + LST | 스크린샷 1 · 2 |
| 40 · 41 | VoiceStep | 스크린샷 1 · 2 |
| 42 · 43 | Linkus20 | 스크린샷 1 · 2 |
| 44 · 45 | LG Aimers | 스크린샷 1 · 2 |
| 46 · 47 | TrackWithReID | 스크린샷 1 · 2 |
| 48 · 49 | Physical_AI_ws | 스크린샷 1 · 2 |
| 50 · 51 | Lider_Cone_Path | 스크린샷 1 · 2 |

## 교체 방법

1. 이미지를 `public/images/`에 넣는다 (예: `public/images/07.webp`).
2. 해당 `<Placeholder .../>`를 `<img src="/DeoduckPortfolio/images/07.webp" .../>`로 바꾼다.
   - 위치: 홈은 `src/sections/`, 상세는 `src/pages/ProjectDetail.tsx`.
3. seed 값이 곧 번호의 키다 (`src/i18n/images.ts`의 순서 = 번호).
