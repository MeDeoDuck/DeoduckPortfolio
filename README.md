# DeoduckPortfolio — 김재현 개인 포트폴리오 웹사이트

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Type](https://img.shields.io/badge/type-React%20%2B%20TypeScript%20%2B%20Vite-blue)

## 🎯 프로젝트 소개

**AI 엔지니어 김재현의 개인 포트폴리오 사이트.** 실배포한 멀티에이전트 LLM 제품과 정량 지표를 중심으로 구성했고, 프로젝트마다 상세 페이지를 둔다.

- 🌐 **한국어 / 영어 토글** (선택은 localStorage에 저장)
- 📄 **싱글 페이지 + 프로젝트 상세 라우팅** (HashRouter로 GitHub Pages에서도 새로고침 안전)
- 🎞 **스크롤 연동 모션** (마퀴, 스티키 스택 카드, 문자 단위 텍스트 리빌, 마그네틱 커서)
- 🧱 **콘텐츠 분리** (`src/i18n/content.ts` 하나만 고치면 문구 전부 반영)

---

## ✨ 섹션 구성

- ✅ **Hero** 이름 + 핵심 지표 3개(사용자 97명 · 98% · 99%↓) + 마그네틱 포트레이트
- ✅ **Marquee** 스크롤 방향에 따라 반대로 흐르는 2열 타일
- ✅ **About** 스크롤에 맞춰 또렷해지는 소개 문단
- ✅ **Capabilities** 01~05 역량 목록 (라이트 섹션으로 대비)
- ✅ **Projects** 대표 3개는 스티키 스택 카드, 나머지는 목록. 각각 상세 페이지
- ✅ **Contact** 이메일 · GitHub

---

## 🛠 기술 스택

| 구분 | 기술 |
|---|---|
| 프레임워크 | React 18 + TypeScript |
| 빌드 | Vite 5 |
| 스타일 | Tailwind CSS 3 |
| 모션 | Framer Motion 12 |
| 아이콘 | Lucide React |
| 라우팅 | React Router 6 (HashRouter) |
| 폰트 | Kanit(영문 디스플레이) · Pretendard(한글) · JetBrains Mono(지표) |
| 배포 | GitHub Pages (GitHub Actions) |

---

## 📁 프로젝트 구조

```
DeoduckPortfolio/
├── index.html                  # 폰트 로드 · 메타
├── vite.config.ts              # base: '/DeoduckPortfolio/'
├── .github/workflows/deploy.yml# Pages 자동 배포
└── src/
    ├── App.tsx                 # 라우팅 (/, /project/:id)
    ├── index.css               # 전역 스타일 · .hero-heading 그라디언트 · 그레인
    ├── i18n/
    │   ├── types.ts            # 콘텐츠 스키마
    │   ├── content.ts          # 한/영 카피 전부 (여기만 고치면 됨)
    │   └── LanguageContext.tsx # 언어 토글 · localStorage
    ├── components/             # FadeIn · Magnet · AnimatedText · Placeholder · Navbar · ContactButton
    ├── sections/               # Hero · Marquee · About · Capabilities · Projects · Contact
    └── pages/                  # Home · ProjectDetail
```

---

## 🚀 실행 방법

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 타입체크 + 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 확인
```

---

## 🖼 이미지 교체

현재 모든 이미지는 `src/components/Placeholder.tsx`가 그리는 **임시 자리**다. 실제 스크린샷·사진이 준비되면 해당 위치의 `<Placeholder .../>`를 `<img src="..." />`로 바꾸면 된다. 교체 지점은 다음 네 곳이다.

- `sections/HeroSection.tsx` 프로필 사진
- `sections/MarqueeSection.tsx` 상단 타일 2열
- `sections/AboutSection.tsx` 코너 장식 4개
- `sections/ProjectsSection.tsx`, `pages/ProjectDetail.tsx` 프로젝트 스크린샷

---

## 🌐 배포

`main`에 푸시하면 GitHub Actions가 빌드해 Pages로 올린다.

1. 저장소 **Settings → Pages → Source: GitHub Actions** 로 설정
2. `main` 푸시
3. `https://medeoduck.github.io/DeoduckPortfolio/`

경로가 바뀌면 `vite.config.ts`의 `base` 값을 함께 고쳐야 한다.

---

## ✏️ 문구 수정

`src/i18n/content.ts` 한 파일에 한국어·영어 카피가 모두 들어 있다. `ko`와 `en`의 구조와 프로젝트 `id` 순서는 같게 유지한다.
