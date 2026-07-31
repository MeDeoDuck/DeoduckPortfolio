# 포트폴리오 리디자인 브리프 (2026-08-01 갱신)

> **다음 세션 시작점.** 이 파일을 먼저 읽고 "▶︎ 다음 단계"부터 이어서 진행한다.
> 라이브: https://medeoduck.github.io/DeoduckPortfolio/#/ · 코드: `~/.claude/apps/DeoduckPortfolio`
> 작업 브랜치: `worktree-portfolio-redesign` (푸시됨, PR 미생성 — `gh` CLI 없음)

---

## 1. 사용자 요구사항 (확정)

| 항목 | 내용 |
|---|---|
| 목표 | 디자인 포트폴리오에 맞게 다듬기. **기존 콘텐츠를 유지한 채 디자인을 완전히 새로 만들어도 됨** |
| 도구 | **Lazyweb으로 진행** (사용자 지정) |
| ❌ 제외 | **영상 안 써도 됨** → webp 169장 프레임 스크럽 제거 |
| ✅ 필수 | **Three.js는 꼭 넣을 것** |
| 문구 | 소개 아래 문구들을 `/humanizer`로 다듬기 |

---

## 2. ✅ 완료 (브랜치 `worktree-portfolio-redesign`, 커밋 2건)

### `9201aad` 히어로를 Three.js로 되돌리고 빈 자리표시자를 걷어냄

- **영상 → Three.js 교체 완료.** `storyScene.ts`는 완성돼 있었으나 `e76fd0f`에서 import가 끊겨 잠들어 있었다. 그 커밋이 "되돌릴 수 있게 남겨둔다"고 적어둔 대로 직전 배선(`21b7a12`)을 복원했다. 새로 만들 필요 없었다.
- `public/story/` 169장(2.1MB) + `src/story/frameStory.ts` 제거
- **WebGL 폴백 추가 (버그였음).** 폴백이 없어 컨텍스트 생성이 실패하면 320vh = 화면 세 개가 백지로 남았다. 이제 못 쓰면 구간을 접어 `HelloSection`(이름·헤드라인)이 첫 화면이 된다.
- **회색 `IMG NN` 박스 제거.** About 코너 deco 1~4는 실제 이미지가 없는 순수 장식이라 삭제. 상세페이지 스크린샷은 자산이 있는 프로젝트만 렌더 (`shiftloss`·`voicestep`·`linkus20`·`lg-aimers`·`lidar-cone` 5건이 회색 박스였음).

### `9336f7a` 소개·역량 문구를 다듬고 한국어 줄바꿈을 어절 단위로

- 역량 5개 항목이 전부 `…하고, …합니다` 동일 통사 틀 → 항목별 문장 수·쉼표 위치를 달리했다. **기술 주장·수치는 그대로.**
- `역할을 나눠 분업시키고` 의미 중복 정리
- 영문 소개문 `…self-healing pipelines, by applying it to…` 문법 오류(쉼표 오접속 + `it`이 복수 선행사) 수정
- **`AnimatedText` 줄바꿈 버그.** 글자마다 `inline-block`이라 브라우저가 모든 글자를 줄바꿈 지점으로 봤다 → `self-healing`이 `self-heali / ng`로 갈라짐. 어절 단위로 감쌌다.
- 한국어 본문 `word-break: keep-all` (기본값은 `자유`를 `자 / 유`로 끊음)

### 검증 상태

- `npm run build`(tsc --noEmit 포함) 통과
- 데스크톱 1440x900 / 모바일 375x812 렌더 확인, 가로 넘침 없음
- ⚠️ **3D 씬 자체는 미검증** — 헤드리스 환경에 GPU가 없어 WebGL 컨텍스트를 못 만든다. GPU 있는 브라우저에서 한 번 확인 필요.

---

## 3. ▶︎ 다음 단계

### (a) Lazyweb 리디자인 — 아직 못 함

**막힌 이유**: MCP 서버가 rate limit(HTTP 429)에 걸려 있었다. 세션 중에 풀려 `✔ Connected`가 됐지만, **MCP 도구 목록은 세션 시작 시점에 고정**되므로 이번 세션에서는 못 잡았다.

**재개법**: 새 세션(`claude --continue`)을 열고 `lazyweb_search`가 잡히는지 먼저 확인.

1. **STEP 1 — `lazyweb_search`**: "developer portfolio hero", "project case study page" 등 2~6단어 패턴, platform `desktop`
2. **STEP 2 — `lazyweb_generate_report`**: 스크린샷 + 컨텍스트 + 목표 → `lazyweb_get_report` 폴링 → 리포트 URL
   - objective: `improve` (기존 화면 개선)
   - 컨텍스트에 **"Three.js 필수 / 영상 프레임 제거 완료"** 제약 포함
3. 리포트 방향대로 재구성

### (b) 3D 씬 실기 확인

GPU 있는 브라우저에서 `npm run dev` 후 히어로 스크롤 — 5장면(대기 → 넥타이 비행 → 착용 → 노트북 비행 → 제시)이 도는지.

### (c) PR 생성

`gh` CLI가 설치돼 있지 않아 자동 생성 실패. 수동:
https://github.com/MeDeoDuck/DeoduckPortfolio/pull/new/worktree-portfolio-redesign

### (d) 폴리시

구현 후 `make-interfaces-feel-better`로 모션·shadow·radius·타이포 검수.

---

## 4. 참고 — 콘텐츠 인벤토리 (전부 유지 대상)

`src/pages/Home.tsx` 섹션 순서:

```
StoryHero → HelloSection → SkillsSection → MarqueeSection → AboutSection
→ CapabilitiesSection → ProjectsSection → ExperienceSection
→ AwardsSection → CredentialsSection → ContactSection
```

- **한/영 i18n** — `src/i18n/content.ts`. localStorage 키 `deoduck-lang`, 기본은 브라우저 로케일.
- **대표 프로젝트 4** — Moabom, FOMO Breaker, CAGE·CareRF, StableDiffusion+LST. 그 외 9건.
- **이미지 자산** — `public/images/` webp, 등록 seed 목록은 `src/i18n/imageAssets.ts`.
- 기술 스택: React + Vite + TypeScript + Tailwind + Three.js + react-router(HashRouter)
