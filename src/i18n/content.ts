import type { Content, Lang, SkillItem } from './types'

/** devicon / simple-icons 실제 존재 확인된 경로만 쓴다. */
const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`
const simple = (slug: string) => `https://cdn.simpleicons.org/${slug}`
/** cdn.simpleicons.org에서 빠진 슬러그는 npm 패키지 쪽 원본을 쓴다. */
const simpleRaw = (slug: string) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`
/** 공개 로고가 없는 플러그인은 페이지 팔레트로 직접 그린 마크를 쓴다. public/plugins/ */
const mark = (file: string) => `${import.meta.env.BASE_URL}plugins/${file}.svg`
/** 로고가 존재하지 않는 기술 개념(PEFT·양자화 등)도 같은 규칙으로 그린다. public/marks/ */
const glyph = (file: string) => `${import.meta.env.BASE_URL}marks/${file}.svg`
/** CDN 아이콘 세트에 없는 브랜드는 공식 사이트 로고를 받아 둔다. public/logos/ */
const logo = (file: string) => `${import.meta.env.BASE_URL}logos/${file}`

/**
 * 기술 항목은 언어에 따라 바뀌지 않는다. 분류 이름만 번역한다.
 * icon이 없는 항목은 공개 아이콘이 없는 것들 — 모노그램 타일로 그린다.
 */
const SKILLS: Record<'ai' | 'backend' | 'lang' | 'plugin', SkillItem[]> = {
  /* 13개 → 2줄 7+6 강제. 윗줄은 기본 라이브러리 6개 + Distillation, 아랫줄은 LangGraph·LangChain·PEFT부터. */
  ai: [
    { name: 'PyTorch', icon: devicon('pytorch/pytorch-original') },
    { name: 'Hugging Face', icon: simple('huggingface') },
    { name: 'scikit-learn', icon: devicon('scikitlearn/scikitlearn-original') },
    { name: 'OpenCV', icon: devicon('opencv/opencv-original') },
    { name: 'NumPy', icon: devicon('numpy/numpy-original') },
    { name: 'Pandas', icon: devicon('pandas/pandas-original') },
    { name: 'Distillation', icon: glyph('distillation') },
    { name: 'LangGraph', icon: simple('langchain') },
    { name: 'LangChain', icon: simple('langchain') },
    { name: 'PEFT', icon: glyph('peft') },
    { name: 'MoT', icon: glyph('mot') },
    { name: 'GNN', icon: glyph('gnn') },
    { name: 'Time Series', icon: glyph('time-series') },
  ],
  backend: [
    { name: 'FastAPI', icon: devicon('fastapi/fastapi-original') },
    { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original') },
    { name: 'SQLite', icon: devicon('sqlite/sqlite-original') },
    { name: 'Docker', icon: devicon('docker/docker-original') },
    { name: 'Anaconda', icon: devicon('anaconda/anaconda-original') },
    { name: 'GitHub Actions', icon: devicon('githubactions/githubactions-original') },
  ],
  lang: [
    { name: 'Python', icon: devicon('python/python-original') },
    { name: 'C++', icon: devicon('cplusplus/cplusplus-original') },
    { name: 'TypeScript', icon: devicon('typescript/typescript-original') },
    { name: 'React', icon: devicon('react/react-original') },
    { name: 'ROS', icon: devicon('ros/ros-original') },
    { name: 'MORAI', icon: logo('morai.png') },
    { name: 'Gazebo', icon: devicon('gazebo/gazebo-original') },
    { name: 'Git', icon: devicon('git/git-original') },
    { name: 'GitHub', icon: devicon('github/github-original') },
    { name: 'Claude Max', icon: simple('claude') },
    { name: 'Codex Pro', icon: simpleRaw('openai') },
    { name: 'Higgsfield', icon: logo('higgsfield.jpg') },
  ],
  plugin: [
    { name: 'anthropics/superpowers', icon: mark('superpowers') },
    { name: 'garrytan/gstack', icon: mark('gstack') },
    { name: 'mattpocock/skills', icon: mark('skills') },
    { name: 'mattpocock/sandcastle', icon: mark('sandcastle') },
    { name: 'leonxlnx/taste-skill', icon: mark('taste-skill') },
    { name: 'nextlevelbuilder/ui-ux-pro-max', icon: mark('ui-ux-pro-max') },
    { name: 'lazyweb', icon: mark('lazyweb') },
    { name: 'revfactory/harness', icon: mark('harness') },
    { name: 'anthropics/telegram', icon: simple('telegram') },
    { name: 'msitarzewski/agency-agents', icon: mark('agency-agents') },
    { name: 'coreyhaines31/marketingskills', icon: mark('marketingskills') },
  ],
}

export const content: Record<Lang, Content> = {
  ko: {
    nav: {
      hello: '인사',
      skills: '기술',
      about: '소개',
      capabilities: '역량',
      projects: '프로젝트',
      experience: '경력',
      activities: '대외활동',
      awards: '수상',
      contact: '연락',
    },
    hero: {
      greeting: 'ML 엔지니어를 지망합니다',
      name: '김재현',
      tagline:
        '완벽한 AI는 없다고 믿기에, 검증부터 설계합니다.\nLLM 에이전트 서비스를 설계하고 배포해 운영하며,\n비용과 일관성 문제를 직접 해결했습니다.\n신뢰할 수 있는 아키텍처를 만드는 엔지니어로 성장하며,\n저만의 decision log를 실무용 skill.md로 쌓아가는 것이 목표입니다.',
      metrics: [
        { value: '사용자 97명', label: '1주 배포 실사용' },
        { value: '98%', label: '판정 일관성 (300회 실행)' },
        { value: '99%↓', label: '추론 비용' },
      ],
      cta: '프로젝트 보기',
    },
    hello: {
      eyebrow: '안녕하세요 👋',
      typed: '안녕하세요, AI 엔지니어 김재현입니다',
      headline: { lead: '모델이 제안하면 ', accent: '코드가 검증하는', tail: ' 시스템을 만듭니다' },
      body:
        '완벽한 AI는 없다고 믿기에, 검증부터 설계합니다.\nLLM 에이전트 서비스를 설계하고 배포해 운영하며,\n비용과 일관성 문제를 직접 해결했습니다.\n신뢰할 수 있는 아키텍처를 만드는 엔지니어로 성장하며,\n저만의 decision log를 실무용 skill.md로 쌓아가는 것이 목표입니다.',
      infoLabel: 'Personal Info',
      info: [
        { label: '학력', value: '인하대학교 인공지능공학 학사' },
        { label: '현재', value: '웨이버스 GeoAI 그룹 인턴 (VLM · GraphRAG · Multi Agent)' },
        { label: '관심 분야', value: '멀티에이전트 LLM · 하네스 엔지니어링' },
        {
          label: '저작권',
          value: '모아봄 (Moabom) · LST 기반 Stable Diffusion 학습 성능 향상 프로그램',
        },
      ],
      contactLabel: 'Contact',
      contacts: [
        { label: 'GitHub', value: '@MeDeoDuck', href: 'https://github.com/MeDeoDuck' },
        { label: '이메일', value: 'seankim0824@gmail.com', href: 'mailto:seankim0824@gmail.com' },
        { label: '연락처', value: '010-2589-4493', href: 'tel:01025894493' },
      ],
    },
    skills: {
      eyebrow: 'Skills',
      heading: '기술 스택',
      groups: [
        { label: 'AI · ML', items: SKILLS.ai, wide: true },
        { label: 'Backend · Infra', items: SKILLS.backend },
        { label: 'Language · Tool', items: SKILLS.lang, wide: true },
        { label: 'AI Plugin & MCP', items: SKILLS.plugin, wide: true, tile: 128 },
      ],
    },
    about: {
      heading: '소개',
      body:
        '인하대학교 인공지능공학과 학사 과정에 재학 중입니다. 모델이 답을 제안하면 코드가 그 답을 검사하는 구조로 시스템을 설계합니다. 여러 에이전트가 역할을 나눠 일하는 제품을 만들어 실사용자에게 배포했고, 교사 모델의 라벨을 증류해 로컬 모델로 옮기며 추론 비용을 낮췄습니다. 근거 검증 게이트, 가드레일, self-healing 파이프라인 같은 하네스 엔지니어링을 공부하면서 실제 서비스에 적용하고 있습니다. 문제를 풀며 얻은 노하우는 저만의 업무용 skill.md로 쌓아가고 있습니다. 아직 학사 신입이고, 여기 적은 숫자는 모두 직접 측정한 값입니다.',
    },
    capabilities: {
      eyebrow: 'Capabilities',
      heading: '역량',
      items: [
        {
          no: '01',
          name: '멀티에이전트 오케스트레이션',
          highlight: true,
          desc:
            'LangGraph로 에이전트 간 흐름을 오케스트레이션합니다. 하나의 큰 프롬프트에 맡기는 대신 영상 선정, 감성 분석, 보고서 작성처럼 역할을 나눠 분업시키고, 자유 대화가 아닌 규칙 기반 흐름 제어로 결과를 예측 가능하게 만듭니다.',
        },
        {
          no: '02',
          name: '하네스 · 가드레일 엔지니어링',
          highlight: true,
          desc:
            '모델 출력을 그대로 쓰지 않고 근거 검증 게이트를 통과시킵니다. 페르소나의 세계관은 소프트 룰로 열어두되 수치 임계는 하드 룰로 강제해, 자유로운 토론에서도 판정이 일관되게 만듭니다. 게이트에서 걸러진 제안은 기록으로 남겨 시스템의 판단을 추적 가능하게 유지합니다.',
        },
        {
          no: '03',
          name: 'LLM 라우팅 · 서빙 백엔드',
          highlight: true,
          desc:
            'FastAPI와 PostgreSQL로 AI 서비스의 백엔드를 구성합니다. 확신이 낮은 예측만 큰 모델로 보내는 cascade 라우팅, 발언과 사고에 서로 다른 LLM을 배치하는 이중 구성으로 품질이 필요한 곳에만 비용을 씁니다.',
        },
        {
          no: '04',
          name: '그래프 · 시계열 모델링',
          desc:
            '관계가 있는 데이터는 그래프로 봅니다. 멀티관계 GNN으로 개별 계정이 아닌 조직 단위의 이상 패턴을 탐지하고, 시계열 예측에서는 기존 지표가 놓치는 시간 지연 오차를 손실 함수 설계로 풀어냅니다.',
        },
        {
          no: '05',
          name: '컴퓨터비전 · 로보틱스',
          desc:
            '객체 검출·추적·재식별 파이프라인을 다룹니다. CCTV 영상 인지에서 A* 경로계획, Pure Pursuit 제어까지 ROS로 하나로 연결해, 모델의 판단을 화면 밖 실제 움직임으로 이어봅니다.',
        },
      ],
    },
    marquee: {
      eyebrow: 'Projects Overview',
      heading: '프로젝트 한눈에 보기',
    },
    projects: {
      eyebrow: 'Projects',
      heading: '주요 프로젝트',
      moreHeading: 'KCI 논문 심사중',
      viewDetail: '자세히 보기',
      liveLabel: '라이브',
      items: [
        {
          id: 'moabom',
          no: '01',
          category: 'Team · Capstone',
          name: 'Moabom',
          period: '2026.03 ~ 2026.06',
          role: '백엔드 아키텍처 · DB 설계 · 댓글 필터링 Agent · KLUE 증류 (팀 3인)',
          tagline:
            '여러 유튜브 테크 리뷰의 자막과 댓글을 모아 제품 단위 구매 판단 보고서를 만드는 멀티에이전트 LLM 서비스입니다.',
          detailTagline:
            '한 테크 제품에 대한 N개의 유튜브 리뷰 영상을 자동 선별하고, 자막·댓글에 담긴 다양한 의견을 종합 분석해 한눈에 보기 좋은 리포트로 제공함으로써 합리적인 구매 판단을 지원하는 AI 웹 서비스입니다.',
          stack: ['LangGraph', 'FastAPI', 'PostgreSQL', 'Docker', 'Azure', 'GPT-4.1', 'KLUE-RoBERTa'],
          metrics: [
            { value: '98%', label: '판정 일관성 (300회 실행)' },
            { value: '99%↓', label: '추론 비용' },
          ],
          links: [{ label: '벤치마크 저장소', href: 'https://github.com/MeDeoDuck/MoabomVSAll' }],
          detail: [
            {
              heading: '프로젝트 개요',
              body:
                '제품명 입력부터 영상 선정, 자막·댓글 분석, 종합 보고서 생성까지 전 과정을 스스로 수행하는 멀티 에이전트 서비스입니다.\n\n단일 채널이 아닌 다수 채널의 리뷰어 의견과 실사용자 댓글을 동시에 취합해, 한쪽에 치우치지 않은 결론을 도출합니다.',
              images: [
                { seed: 'moabom-p-main', label: 'MOABOM 메인 화면' },
              ],
            },
            {
              heading: '개발 목표',
              body:
                '시간 절약 — AI Agent 자동 분석으로 120분 걸리던 리뷰 탐색을 5분으로 (24배 단축)\n\n편향 보정 — 다수 리뷰어와 댓글을 동시 활용해 채널 편중 완화\n\n통합 비교 — 자막 + RAG + 감성 라벨을 엮은 7섹션 종합 보고서\n\n일관성 — 다단계 파이프라인으로 일관성 있는 답변',
            },
            {
              heading: '왜 유튜브 테크 제품 리뷰인가?',
              body:
                '테크 제품 리뷰는 영상 형태가 표준화되어 있어 자막·댓글 데이터 확보가 용이합니다. 스펙·성능 등 객관 비교 요소가 많아 다수 합의 추출의 효과가 크고, 댓글에 실사용 후기가 풍부해 전문가 시각과의 대조 가치가 높습니다.\n\n시장 환경도 뚜렷합니다 — 소비자의 91.1%가 구매 전 리뷰를 확인하고 54.7%는 4개 이상을 비교하며, 리뷰의 30%는 진정성이 의심되고 82%가 가짜 리뷰를 경험했습니다. 테크 제품은 구매 의사결정에서 리뷰의 영향력이 특히 큰 품목입니다. (Capital One Shopping 2026 · Katyal et al. 2025, IJSAEM 16(9))',
            },
            {
              heading: '핵심 타깃 사용자',
              body:
                '스마트폰·노트북·이어폰 같은 테크 제품 구매를 앞두고 여러 리뷰를 비교하는 일반 소비자.\n\n리뷰 영상을 끝까지 볼 시간은 없지만, 공통적인 리뷰 내용과 실사용 여론은 알고 싶은 사용자.',
            },
            {
              heading: '사용자가 받는 결과물',
              body:
                '제품 1개당 7섹션 종합 보고서를 자동 생성합니다 — 구매 판정, 핵심 요약, 6차원 평가표, 합의 기반 장단점, 소비자 여론, 전작 대비 변화, 추천/비추.\n\n모든 주장에 몇 명의 리뷰어가 동의했는가(N/N 합의도)를 수치로 표기해 신뢰도를 바로 확인할 수 있습니다.',
              images: [
                { seed: 'moabom-p-report', label: '제품 단위 통합 보고서' },
              ],
            },
            {
              heading: '시스템 아키텍처',
              body:
                '제품명 입력 후 영상 선정 → 댓글 필터링 → 보고서 생성으로 이어지는 멀티 에이전트 파이프라인을 거칩니다. 마지막 보고서 단계는 DB 상태를 보고 캐시 반환·데이터 자가 보강·종합 생성을 분기하는 LangGraph Supervisor가 지휘합니다.',
              images: [
                { seed: 'moabom-p-arch', label: '시스템 아키텍처' },
                { seed: 'moabom-p-flow', label: 'MOABOM 서비스 사용자 이용 흐름' },
              ],
              stackImages: true,
            },
            {
              heading: '에이전트별 아키텍처',
              body:
                '영상 선정 Agent — 유튜브 리뷰 영상 후보를 임베딩 군집으로 클러스터링하고 자막을 근거로 분석해, 다양한 관점의 리뷰 영상을 자동 선별합니다.\n\n댓글 필터링 Agent — 수집된 영상 댓글을 룰 소프트필터와 다기준 선정으로 추려내고, LLM 5-class 분류와 ABSA 감성분석으로 정제해 제품과 관련된 신뢰할 수 있는 소비자 여론만 추출합니다.\n\n보고서 생성 Agent — 선정된 영상의 자막·댓글을 종합해 영상 단위 보고서 3종 + 제품 단위 종합 보고서 1종(총 4종)을 자동 생성하고, 다수 리뷰를 교차 검증해 신뢰도 높은 최종 제품 분석 리포트를 산출합니다.\n\nSupervisor Agent — 영상별 입력(자막·댓글·통합)의 신선도를 점검하여, 캐시 반환·댓글 self-heal·보고서 보장·합성·저장 중 어느 단계를 어떤 순서로 수행할지 결정하는 LangGraph 오케스트레이터입니다.',
              images: [
                { seed: 'moabom-p-agents', label: '에이전트별 아키텍처' },
              ],
            },
            {
              heading: '경량 모델 최적화',
              body:
                '댓글 분류 모델 — 정확도 유지, 비용·속도 최적화. GPT-4.1(teacher)의 라벨을 KLUE-BERT full fine-tuning으로 옮겼습니다(A40, 3 Epoch, 자체 수집 데이터). 비슷한 라벨은 Video Reaction으로 통합해 성능을 안정화했고, GPT-4.1 대비 정확도를 유지하며 추론 22배 가속 · API 비용 0을 달성했습니다.\n\n비교영상 탐지 모델 — 영상 선정 노이즈 자동 제거. 여러 제품 비교영상을 자동 분류하며, 3개 모델을 비교해 KLUE-RoBERTa를 채택했습니다(RTX 4060 Ti, 3 Epoch, 자체 수집 데이터). 제목·설명만으로 비교영상을 판별해 자막 수집 전 사전 필터링으로 비용을 절감하고, 데이터 규모에 맞는 모델 선택으로 과적합을 회피했습니다.',
              images: [
                { seed: 'moabom-p-comment-model', label: '로컬 댓글 필터링 모델 성능' },
                { seed: 'moabom-p-compare-model', label: '영상 선정 비교영상 탐지 모델 성능' },
              ],
            },
            {
              heading: '일관성 검증 — 모아봄 vs 상용 LLM',
              body:
                '동일 제품을 10회 반복 질의했을 때의 판정 일관성을 자체 실험했습니다(10개 제품 × 10회 × 3개 모델 = 총 300회). 모아봄 98.0%, GPT 90.0%, Gemini 86.0%.\n\n모아봄이 가장 안정적입니다 — 환각 방지와 다중 LLM 교차 검증 설계의 직접 효과입니다.',
              images: [
                { seed: 'moabom-p-consistency', label: 'AI별 평균 판정 일관성' },
              ],
            },
            {
              heading: '핵심 기능',
              body:
                '흩어진 정보의 제품 단위 통합과 대중적 해설 — 각기 다른 채널에 분산된 영상·자막·댓글 정보를 종합해 제품 단위 보고서로 재구성합니다. 리뷰어 의견과 실사용 댓글 반응 비교, 제품 특징별 댓글 감성 분석까지 한눈에 확인할 수 있고, 복잡한 전문 용어는 일반인도 이해하기 쉽게 풀어 설명합니다.\n\n리뷰 탐색 시간의 획기적 단축 — 120분 소요되던 제품 탐색 과정을 5분 이내로 줄였습니다(약 24배). 영상을 직접 보지 않아도 밀도 높고 구조화된 보고서로 빠른 구매 의사결정을 지원합니다.\n\n편향 없고 일관적인 제품 평가 — 대형 채널과 익숙한 채널 중심의 유튜브 추천 알고리즘을 벗어난 다양성 높은 영상 선정, 다수 리뷰어와 댓글의 동시 활용으로 특정 리뷰어의 편향을 보정합니다. 동일 제품 반복 평가에서 98.0% 일관성을 달성했습니다.\n\n타 제품군·B2B 서비스로의 높은 확장성 — 유튜브 리뷰 영상이 있는 어떤 제품(화장품·식품 등)으로도 확장 가능하고, 기업을 위한 리뷰어·소비자 반응 분석 서비스로도 활용할 수 있습니다.',
            },
            {
              heading: '서비스 화면',
              body:
                '메인 화면에서 제품명을 입력하면 영상 선정 목록을 거쳐 보고서 4종이 생성됩니다. 아래는 실제 서비스 화면입니다.',
              images: [
                { seed: 'moabom-p-s01', label: '유튜브 영상 선정 목록 - 메인 1' },
                { seed: 'moabom-p-s02', label: '유튜브 영상 선정 목록 - 메인 2' },
                { seed: 'moabom-p-s03', label: '영상 별 분석 보고서 - 로딩' },
                { seed: 'moabom-p-s04', label: '영상 별 분석 보고서 - 메인' },
                { seed: 'moabom-p-s05', label: '영상 별 분석 보고서 - 메인' },
                { seed: 'moabom-p-s06', label: '영상 별 분석 보고서 - 통합 분석 1' },
                { seed: 'moabom-p-s07', label: '영상 별 분석 보고서 - 통합 분석 2' },
                { seed: 'moabom-p-s08', label: '영상 별 분석 보고서 - 자막 기반 분석 1' },
                { seed: 'moabom-p-s09', label: '영상 별 분석 보고서 - 자막 기반 분석 2' },
                { seed: 'moabom-p-s10', label: '영상 별 분석 보고서 - 댓글 기반 분석' },
                { seed: 'moabom-p-s11', label: '제품 단위 종합 보고서 화면 - 로딩' },
                { seed: 'moabom-p-summary', label: '제품 종합 의견 요약 정리' },
                { seed: 'moabom-p-s12', label: '제품 단위 종합 보고서 화면 - 메인 1' },
                { seed: 'moabom-p-s13', label: '제품 단위 종합 보고서 화면 - 메인 2' },
              ],
              stackImages: true,
            },
          ],
          featured: true,
        },
        {
          id: 'fomo-breaker',
          no: '02',
          category: 'Team',
          name: 'FOMO Breaker',
          period: '2026',
          role: 'PM · 백엔드 · 멀티에이전트 토론·검증 게이트 (팀 5인)',
          tagline:
            '종목을 사고 싶은 이유가 분석에서 나온 것인지 FOMO에서 나온 것인지 점검하는 멀티페르소나 토론 시스템입니다.',
          detailTagline:
            '매수 버튼을 누르기 전, 데이터 기반 토론으로 한 번 더 확인하게 해주는 세컨드 오피니언 서비스입니다. 다중 AI 페르소나 토론으로 뇌동매매를 막는 지능형 멀티 에이전트입니다.',
          stack: ['React', 'TypeScript', 'FastAPI', 'WebSocket', 'GPT-4.1', 'Llama-3.3-70B (Groq)'],
          metrics: [
            { value: '390/736', label: '검증 게이트가 보류·거부한 제안 (30회 실행)' },
            { value: '5', label: '서로 다른 이론을 가진 페르소나' },
            { value: '2', label: '발언·내부 사고 분리 LLM' },
          ],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/FOMO-Breaker' }],
          detail: [
            {
              heading: '프로젝트 개요',
              body:
                'FOMO(Fear Of Missing Out)는 나만 기회를 놓칠까 두려워 급등 자산을 좇는 심리이고, Breaker는 과열된 회로를 끊어 사고를 막는 안전장치입니다.\n\nFOMO Breaker는 투자자가 매수 버튼을 누르기 전, 데이터 기반 토론으로 한 번 더 확인하게 해주는 세컨드 오피니언 서비스 — 다중 AI 페르소나 토론 기반 뇌동매매 방지 지능형 멀티 에이전트입니다. 매수 직전에 결론 대신 토론을 제공합니다.',
              images: [
                { seed: 'fomo-p-idea', label: '핵심 아이디어 — 결론 대신 토론' },
              ],
            },
            {
              heading: '문제 정의 — 투자 열풍과 시장 변동성',
              body:
                '커뮤니티·SNS를 통한 종목 정보 확산, 코로나19 이후 주식 투자의 대중화로 주식 열풍이 사회적 트렌드가 됐습니다. 급등주 추격 매수, 공포·탐욕에 흔들리는 매매가 늘며 시세 제공을 넘어선 심리적 브레이크의 필요성이 대두됐습니다.\n\n2026년 상반기 시장 현황이 이를 보여줍니다 — 사이드카 20회 발동(이미 금융위기 수준 26회에 육박), 신용융자 43조 돌파(빚투 잔액 3년 8개월 새 최고, 금감원 경고).',
            },
            {
              heading: '기존 AI 투자 서비스의 문제점',
              body:
                '기존 서비스는 AI가 지금 사라고 답을 정해주거나 자동으로 구매까지 이어줍니다. 정답만 던지는 AI 투자 서비스는 초보 투자자의 뇌동매매를 부추겨 리스크가 큽니다. FOMO Breaker는 반대로, 판단 과정 자체를 사용자 앞에 펼쳐 놓습니다.',
            },
            {
              heading: '차별점 1 — Agent별 페르소나 부여',
              body:
                '5명의 페르소나가 각각 다른 경제·행동재무학 이론을 세계관(prior)으로 삼아, 동일한 시장 데이터를 보고도 의도적으로 다른 결론에 도달하도록 설계했습니다.\n\n리스크 심사역(초저위험) — 손실회피(Kahneman & Tversky, 1979). 손실의 고통은 이익의 2배: 과열 국면의 손실 리스크를 항상 크게 잡습니다.\n\n수급 추적자(중위험) — 수급의 정보력(Choe, Kho & Stulz, 1999). 말은 속여도 돈의 이동은 못 속인다: 외국인·기관 순매수를 정보거래의 대리변수로 봅니다.\n\n모멘텀 헌터(초고위험) — 가격 모멘텀(Jegadeesh & Titman, 1993). 모멘텀은 꺾이는 신호가 나오기 전까지 지속된다: 거래량이 생사를 알려줍니다.\n\n역발상가(저위험) — 역발상 투자(Lakonishok, Shleifer & Vishny, 1994). 가격은 결국 펀더멘털로 수렴한다: 인기는 프리미엄, 프리미엄은 수익률의 적.\n\n군중심리 대변인(고위험) — 군집행동·정보 폭포(Bikhchandani et al., 1992). 분위기는 데이터보다 먼저 움직인다: 개인은 남의 행동을 따라갑니다.',
              images: [
                { seed: 'fomo-p-persona', label: 'Agent별 페르소나 부여' },
              ],
            },
            {
              heading: '차별점 2 — 다중 페르소나 토론',
              body:
                '페르소나들이 서로 토론을 진행하고, 사회자 AI가 전체 토론과 페르소나별 발언을 종합해 결론 리포트를 제공합니다. 말투만 다른 페르소나는 결국 같은 답을 내기 때문에, 판단 기준(이론적 전제) 수준에서 차이를 만들어 의견이 실제로 갈리게 했습니다.',
              images: [
                { seed: 'fomo-p-debate', label: '다중 페르소나 토론 구조' },
              ],
            },
            {
              heading: '데이터 기반 심리 브레이크 5단계 프로세스',
              body:
                '① 데이터 수집 — 시세(pykrx)·거래량·주가, 기업 DART 공시·재무제표, 시장 VKOSPI·VI 발동 확인, 뉴스 감성 분석 데이터(Hype)\n\n② 분석/엔지니어링 — 이상 징후 실시간 탐지, 거래 과열 피처 추출, 카테고리별 데이터 점수화, 심리 데이터 연산 엔진\n\n③ 다중 페르소나 토론 — 가치 vs 기술 vs 투자자 토론, 매수 논리 다각적 검증, AI 페르소나 5종 난상 토론, 사회자 AI의 중재 및 종합\n\n④ FOMO 지수 확정 — 데이터+심리 가중치 산출, 최종 FOMO 레벨 도출, 실시간 지수 시각화, 리포트 생성 및 요약\n\n⑤ 액션 플랜/심리 케어 — 충동 매수 브레이크 경고, 현실 객관화 지표 제시, 분할 매수·조정 전략, 이성적 매매 플랜 유도\n\n단순 정보 제공을 넘어, 매수 직전 감정에 제동을 거는 데이터 기반 심리 브레이크 시스템입니다.',
              images: [
                { seed: 'fomo-p-process', label: '심리 브레이크 5단계 프로세스' },
              ],
            },
            {
              heading: '시스템 아키텍처',
              body:
                '입력 — 사용자 입력 → 데이터 불러오기 → 6개 지표 생성 → FOMO 점수 선형 계산 → 페르소나 input JSON 생성 → 각 Agent에 전달.\n\n토론 — Round 1 → Round 2(2~10회 반복) → Round 3 → 토론 보고서. 가중치 제안은 Weight Validator를 거쳐 Final Merge로 합쳐집니다.\n\n검증 게이트 — 페르소나별 응답이 근거에서 벗어나지 않도록 하네스 엔지니어링을 수행합니다. 제안된 근거가 실제 신호 점수와 맞는지, 조정폭이 캡을 넘지 않는지 확인하고, 가중치는 zero-sum으로 재분배해 총합을 유지하며 최종 지수를 역산해 구성 요소와 일치하는지 검증합니다. 게이트에 걸리는 건은 대부분 근거 부족으로 인한 보류입니다.',
              images: [
                { seed: 'fomo-p-input-flow', label: '입력 데이터 플로우차트' },
                { seed: 'fomo-p-debate-flow', label: '토론 플로우차트' },
                { seed: 'fomo-p-gate-flow', label: '검증 게이트 플로우차트' },
              ],
              stackImages: true,
            },
            {
              heading: '데이터 파이프라인 · 지표 엔지니어링',
              body:
                'pykrx / KIS API — 주가·거래량·PER/PBR·배당 → Price Overheat, Volume Spike(과열 신호) → 기술적 과열 및 수급 쏠림 파악\n\nOpen DART — 주요 사항 보고서(전자공시) → 재무적 리스크 플래그 → 펀더멘털 기반 이성적 방어 논리 생성\n\nNaver News API — 뉴스 제목·본문 텍스트 → 감성·과열 지수(Sentiment/Hype) → 시장 군중 심리 및 과열 트렌드 확인\n\nKRX VKOSPI / KIS — 변동성 지표·VI 발동 현황 → 공포지수(변동성 Proxy)·VI Flag → 가시적 시장 공포·과열 수준 인지\n\n수집 지표는 행동경제학 근거 가중치로 카테고리별 점수화·병합해 종합 FOMO 지수 산출에 활용합니다.',
            },
            {
              heading: '개발 스택',
              body:
                'Frontend — React 18 + TypeScript 5, Vite 6, Tailwind CSS 4, 네이티브 WebSocket\n\nBackend — FastAPI + uvicorn, Pydantic v2, WebSocket 스트리밍, asyncio\n\nAI — GPT-4.1, Llama-3.3-70B. 공개 발언과 내부 사고를 서로 다른 모델로 분리한 이중 LLM 구성으로, 사용자에게 보여줄 문장을 다듬는 일과 판단을 내리는 일이 섞이지 않게 했습니다. 토론은 WebSocket으로 실시간 스트리밍됩니다.\n\nData API — pykrx, 네이버 뉴스 API, OpenDART, KIS API',
            },
            {
              heading: '성능 검증 — 타 AI 서비스와의 비교',
              body:
                '단일 모델과 비교해 출처 추적(Evidence), 검증 게이트(숫자 대조), 페르소나 합의·이견 표기, 신뢰도 Coverage 표기, Degraded(품질 저하) 배너, 조기 종료 라운드 관측을 모두 갖춘 것은 FOMO Breaker뿐입니다.\n\n판정 일관성 96.7%(30건 중 29건 일치), 검증 게이트 작동률 39.9%(736건 중 294건). 같은 종목 세트에서 주의 판정을 낸 종목 수는 FOMO Breaker 6개, GPT-4.1 1개, Gemini 2.5 1개였습니다.\n\n과열·FOMO 경고 도구에서는 실제 과열을 안전이라 놓치는 것(false negative)이 잘못된 경보보다 치명적입니다. 우리가 더 정확하다가 아니라, 경고 도구로서 이런 방향을 택했다는 설계 선택입니다.',
              images: [
                { seed: 'fomo-p-benchmark', label: '타 AI 서비스와의 비교' },
              ],
            },
            {
              heading: '성과 · 한계 · 향후 계획',
              body:
                '핵심 성과 — 실시간 위험 신호 탐지 파이프라인 구축을 완료하고, 감정을 배제한 팩트 기반 의사결정 체계(AI 토론장)를 성공적으로 구현했습니다.\n\n현재의 한계 — 뉴스 감성 데이터의 노이즈 처리와 비중 조절은 추가 연구가 필요하고, 각 지표에 민감한 것이 더 정확하다는 확실한 근거 지표가 아직 없습니다.\n\n향후 계획 — 사용자 과거 투자 내역 기반 투자 성향 프로파일링 고도화, 타 금융 플랫폼(MTS 등) API 연동 확장.',
            },
            {
              heading: '범위',
              body:
                '투자 자문 서비스가 아닙니다. 매수·매도를 권하지 않고, 사용자가 이미 가진 매수 의사에 과열과 리스크 요인이 있는지 점검하는 용도로 범위를 한정했습니다.',
            },
          ],
          featured: true,
        },
        {
          id: 'cage-carerf',
          no: '03',
          category: 'Team',
          name: 'CAGE-CareRF',
          period: '2026',
          role: '팀장 · 문제 정의 · 모델 설계 · 실험 총괄 (팀 3인)',
          tagline: '리뷰를 6개 관계 그래프로 모델링해 조직적 가짜 리뷰를 탐지하는 멀티관계 GNN입니다.',
          detailTagline:
            'YelpZip 리뷰 데이터에서 조직적으로 움직이는 가짜 리뷰를 잡기 위해, 리뷰 사이의 관계를 6개 채널로 분리해 학습하는 멀티관계 GNN을 설계·검증한 연구입니다. ITDA 제2회 수도권 학술제에서 발표했습니다.',
          stack: ['PyTorch Geometric', 'ChebConv', 'Sentence-BERT', 'TF-IDF · SVD', 'Focal Loss'],
          metrics: [
            { value: 'PR-AUC 0.4447', label: '원본 불균형(11:89) · 5 seeds 평균' },
            { value: '+62%', label: '최고 단일 그래프 baseline 대비' },
            { value: '6', label: '관계 그래프 채널' },
          ],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/CAGE-CareRF' }],
          detail: [
            {
              heading: '프로젝트 개요',
              body:
                'YelpZip 리뷰 데이터셋에서 가짜 리뷰를 탐지하는 그래프 신경망 연구입니다. 리뷰 한 건씩 텍스트만 보면 잘 쓴 리뷰와 잘 만든 가짜 리뷰가 비슷해 구분이 어렵습니다.\n\n대신 가짜 리뷰는 개별이 아니라 조직적으로 움직인다는 관점에서, 각 리뷰를 고립된 문장이 아니라 사용자·상품·시간·평점·행동 유사성으로 연결된 행동 기록으로 보고 그 관계 구조에서 사기 신호를 찾습니다.',
            },
            {
              heading: '핵심 가설 4가지',
              body:
                '관계 가설 — 사기 리뷰는 텍스트가 아니라 리뷰 사이의 관계 구조에서 드러난다. 리뷰를 노드로, 관계를 엣지로 한 그래프 학습이 NLP 단독보다 본질적으로 유리합니다.\n\n다중 관계 가설 — 관계마다 사기 신호의 강도가 다르므로 분리해서 학습해야 한다. 6개 관계를 독립 채널로 학습한 뒤 융합합니다.\n\n노드별 신뢰 가설 — 어떤 관계가 신뢰할 만한지는 노드마다 다르다. 관계별 가중치를 고정값이 아니라 노드별로 동적 학습합니다.\n\n위장 가설 — 숙련된 어뷰저는 정상 노드와 의도적으로 연결을 맺어 자신을 감춘다. 메시지 전파 이전 단계에서 의심스러운 이웃을 미리 필터링합니다.',
            },
            {
              heading: '그래프 엣지 설계',
              body:
                '기본 관계 3종에 조직적 어뷰징 특유의 패턴을 잡는 커스텀 관계 3종을 더해, 총 6개 관계를 별도 채널로 구성했습니다.\n\n기본 관계 — 같은 사용자(R-U-R, 동일 사용자 반복 작성) · 같은 상품·같은 달(R-T-R, 시간 집중 조작) · 같은 상품·같은 별점(R-S-R, 별점 평판 조작).\n\n커스텀 관계 — 같은 상품·7일 이내·별점 ±1(R-Burst-R, 단기 평판 폭격) · 상품 내 텍스트 유사도 top-5(R-SemSim-R, 템플릿 리뷰 양산) · 사용자 행동벡터 유사도 top-5(R-Behavior-R, 다중 계정 행동 동기화).',
            },
            {
              heading: '텍스트 인코더 — 5가지 비교',
              body:
                'fraud 라벨이 3,366개뿐인 환경에서 파라미터 300만 개 이상의 인코더를 fine-tuning하면 과적합과 label leakage 위험이 커집니다. 그래서 SBERT는 frozen으로 유지하고 학습 가능한 부분을 최소화한 5가지 인코더 변형을 비교했습니다.\n\nTF-IDF의 도메인 토큰 정밀도와 SBERT의 문맥 일반화를 결합한 concat 인코더가 PR-AUC와 Macro F1 두 핵심 지표 모두에서 1위와 표준편차 내 동률을 기록해 최종 채택됐습니다.',
            },
            {
              heading: '모델 아키텍처',
              body:
                'CARE filter — 메시지 패싱 전에 feature 유사도만으로(label-free) 위장 이웃을 걸러내 오염된 신호 전달을 줄입니다.\n\nChebConv × 6 — 관계별 독립 GNN 채널을 운영해 강한 관계 신호가 약한 신호를 희석하지 않게 합니다. baseline 실측에서 spectral 계열이 spatial 계열보다 우세했고(ChebConv 0.2752 vs GAT 0.2435), fraud의 고주파 신호 특성을 보존한다는 이론 근거를 따랐습니다.\n\nGated Fusion — 노드별 softmax 가중치로 6개 채널을 융합해, 노드마다 신뢰할 관계가 다르다는 점을 자동 학습합니다.\n\nAux Loss + Focal Loss — 채널별 보조 supervision으로 각 관계가 단독으로도 판별력을 갖게 하고, 11:89 클래스 불균형에서 어려운 샘플에 더 큰 가중치를 줍니다.',
              images: [
                { seed: 'cage-carerf-b', label: '전체 학습 파이프라인' },
              ],
            },
            {
              heading: '실험 결과',
              body:
                '제안 변형·ablation·단일 그래프 baseline 6종을 합친 15개 모델을 5개 seed 평균으로 비교했습니다. 최종 모델의 PR-AUC는 0.4447±0.0061 — 최고 baseline인 ChebConv(0.2752) 대비 +62%, baseline 평균 대비 +75%입니다.\n\n후속으로 fraud 비율을 약 25%로 끌어올린 cascade 샘플링 데이터셋에서는 PR-AUC 0.789를 기록했습니다(같은 조건의 MLP 0.633, 최고 GNN baseline GAT 0.734 — 전 모델이 함께 오른 조건에서의 비교입니다).',
            },
            {
              heading: 'Ablation — 무엇이 성능을 만들었나',
              body:
                '모듈을 하나씩 제거해 기여도를 측정했습니다. Aux Loss를 빼면 PR-AUC가 0.4447에서 0.2982로 떨어져(−33%) 압도적으로 중요했고, CARE filter 제거는 −0.0203(−5%)으로 분명한 양의 기여를 보였습니다.\n\nSkip connection과 Gating은 제거해도 표준편차 이내 차이였습니다. 핵심은 채널별 보조 supervision이고, Skip·Gating은 해석성 옵션 수준이라고 정직하게 결론지었습니다.',
            },
            {
              heading: '도메인 일반화 · 한계',
              body:
                '같은 backbone을 Amazon·YelpChi 데이터셋에 그대로 적용했을 때 YelpChi에서는 최고 baseline 대비 PR-AUC +0.094로 우세했고, Amazon에서는 동급(−0.004)이었습니다. 큰 구조 재설계 없이 다른 fraud 도메인으로 이식될 가능성을 확인했습니다.\n\n한계도 명확합니다 — 절대 성능은 SOTA 텍스트 표현·외부 메타데이터 활용 모델에 미치지 못할 수 있고, 사용자 행동벡터 관계(R-Behavior-R)는 헤비 유저와 어뷰저를 잘 구분하지 못하는 약신호였습니다.\n\n3인 팀 프로젝트이며, 저는 팀장으로 문제 정의·모델 설계·실험 전반을 총괄했습니다.',
            },
          ],
          featured: true,
        },
        {
          id: 'shiftloss',
          no: '06',
          category: 'Research',
          name: 'ShiftLoss',
          period: '2026',
          role: '개인 연구',
          tagline:
            '기존 시계열 예측 모델의 손실함수에 시간 지연 항을 추가하여 정렬 기반 손실이 유효한 조건을 분석한 시계열 예측 손실 함수 연구',
          stack: ['PyTorch', 'PatchTST', 'DLinear', 'iTransformer', 'Amplifier'],
          metrics: [],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/ShiftLoss' }],
          detail: [],
          featured: false,
        },
        {
          id: 'stablediffusion-lst',
          no: '04',
          category: 'Personal · Research',
          name: 'StableDiffusion + LST',
          period: '2025',
          role: '개인 연구 · 구현 (저작권 프로그램 등록)',
          tagline:
            'Latent Diffusion에 Ladder Side Tuning 모듈을 붙여, 백본을 동결하고 경량 사이드 네트워크만 학습하는 구조입니다.',
          detailTagline:
            'Stable Diffusion급 대형 생성 모델을 제한된 자원으로 학습하기 위해, 백본을 동결하고 경량 사이드 네트워크만 학습하는 Ladder Side Tuning을 Latent Diffusion의 UNet에 통합한 개인 연구입니다. 저작권 프로그램으로 등록했습니다.',
          stack: ['PyTorch', 'Latent Diffusion', 'Ladder Side Tuning'],
          metrics: [
            { value: '29%↓', label: 'GPU 메모리' },
            { value: '52%↓', label: '학습 시간' },
          ],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/StableDiffusionWithLST' }],
          detail: [
            {
              heading: '프로젝트 개요',
              body:
                'Stable Diffusion을 처음부터 학습하려면 NVIDIA A100 256장으로 15만 GPU-hours가 필요합니다. 개인 연구 환경에서는 비현실적인 사양입니다.\n\n이 연구는 백본 전체를 학습하는 대신 옆에 붙인 경량 사이드 네트워크만 학습하는 Ladder Side Tuning(LST)을 Latent Diffusion에 통합해, 제한된 GPU 한 장으로도 학습이 돌아가게 만드는 파라미터 효율 학습(PEFT) 연구입니다.',
            },
            {
              heading: '접근 — 왜 메모리가 줄어드는가',
              body:
                '백본 파라미터를 모두 동결하고, 각 블록의 중간 활성값을 ladder shortcut으로 사이드 네트워크에 전달해 예측은 사이드 네트워크가 담당합니다.\n\n역전파가 백본을 통과하지 않기 때문에, 백본의 중간 활성값을 역전파용으로 보관할 필요가 사라져 메모리와 연산이 함께 줄어듭니다.',
              images: [
                { seed: 'stablediffusion-lst-a', label: 'Stable Diffusion UNet + LST 구조' },
              ],
            },
            {
              heading: '구현',
              body:
                'denoising이 일어나는 latent space의 UNet 각 블록에 LST 모듈을 삽입했습니다. 각 블록의 중간 feature를 이전 LST 출력과 concat해 다음 LST 모듈의 입력으로 쓰고, 첫 스텝에는 UNet 초기 입력 h를 대신 사용합니다. 마지막에는 final_proj가 LST feature map을 원하는 출력 채널·형식으로 변환합니다.\n\nLST 모듈 자체는 GroupNorm → SiLU → 1×1 Conv의 최소 구조로 설계해, 추가되는 파라미터와 연산을 최소화했습니다.',
            },
            {
              heading: '실험 설계',
              body:
                'Latent Diffusion 공식 코드를 기반으로 LSUN Churches(192×192) 데이터셋을 TITAN RTX 한 장에서 학습했습니다.\n\nbatch 1 · 1000 epoch · learning rate 5e-5 · AdamW의 동일 조건에서, 원본 Stable Diffusion 학습과 LST 적용 학습을 비교했습니다.',
            },
            {
              heading: '결과',
              body:
                'GPU 메모리 사용량은 23,115 MiB에서 16,509 MiB로 약 29% 줄었고, 학습 시간은 1시간 7분에서 32분으로 약 52% 줄었습니다. 백본 역전파가 사라지고 사이드 네트워크와 ladder 연결만 학습한 직접 효과입니다.\n\n학습 효율에 대한 결과이며, 생성 품질 자체가 기존 파인튜닝 기법보다 좋아졌다는 뜻은 아닙니다.',
              images: [
                { seed: 'stablediffusion-lst-b', label: '적용 결과 — GPU 메모리·학습 시간 비교' },
              ],
            },
            {
              heading: '공개 범위',
              body:
                '저작권 프로그램으로 등록해 소스는 비공개입니다. 구조와 측정 결과만 공개하고 있습니다.',
            },
          ],
          featured: true,
        },
        {
          id: 'physical-ai',
          no: '05',
          category: 'Team',
          name: 'Physical_AI_ws',
          period: '2025',
          role: '팀장 · 인지 · 판단 · 제어 통합 총괄 (팀 3인)',
          tagline: 'CCTV 인지부터 A* 경로계획, Pure Pursuit 제어까지 물류 로봇 파이프라인을 ROS로 통합해본 경험이 있습니다.',
          detailTagline:
            '천장 CCTV 기반 인지, A* 경로 계획, Pure Pursuit 제어로 이어지는 자율주행 파이프라인을 ROS 2·Gazebo에서 통합하고, 랜덤 배치된 정적 장애물 환경에서 검증한 팀 프로젝트입니다.',
          stack: ['ROS 2', 'Gazebo', 'TurtleBot4', 'DMPR-PS', 'A*', 'Pure Pursuit'],
          metrics: [
            { value: '26', label: '정적 장애물 (고정 2 + 랜덤 24)' },
            { value: '3', label: '인지 · 판단 · 제어 통합 단계' },
          ],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/Physical_AI_ws' }],
          detail: [
            {
              heading: '프로젝트 개요',
              body:
                '자율주행 알고리즘은 특정 환경에서 한 번 성공했다고 해서 다른 환경에서도 안정적으로 동작한다는 보장이 없습니다. 물류센터 같은 실제 산업 환경은 장애물은 정적이지만 공간 구조가 장소마다 다릅니다.\n\n그래서 장애물을 랜덤 배치한 여러 정적 환경에서, CCTV 인지 → A* 계획 → Pure Pursuit 제어 파이프라인이 목표 지점까지 안정적으로 도달하는지를 Gazebo·TurtleBot4 시뮬레이션으로 구현·검증했습니다.',
              images: [
                { seed: 'physical-ai-d1', label: '인지 → 판단 → 제어 파이프라인' },
              ],
            },
            {
              heading: '개발 목표',
              body:
                '환경 일반화 — 단일 환경에 의존하지 않는 자율주행 파이프라인의 안정성 검증\n\n통합 동작 — 인지·판단·제어 세 단계가 하나의 시스템으로 정상 동작하는지 검증\n\nTop-Down 인지 — 천장 CCTV 시점 인지가 물류센터 같은 구조화된 정적 환경에서 실용적인지 평가',
            },
            {
              heading: '인지 — CCTV 기반 목표 탐지',
              body:
                '천장 CCTV top-down 영상에서 목표 슬롯을 찾는 인지에는 DMPR-PS(IEEE T-ITS 2021)를 사용했습니다. 사전학습 가중치가 시뮬레이터 환경에서 성능이 떨어져, MATLAB으로 직접 라벨링·증강한 데이터셋을 만들어 A6000에서 1000 epoch full fine-tuning했습니다.\n\n검출된 슬롯 네 모서리 좌표의 평균을 도착점으로 삼고, 이미지 좌표를 20m×20m 월드 좌표계로 변환한 뒤 Gazebo-ROS 2 브릿지로 rviz에 연동했습니다.',
            },
            {
              heading: '판단 — A* 경로 계획',
              body:
                '실제 이동 비용 g(n)과 목표까지의 추정 비용 h(n)을 합한 f(n) = g(n) + h(n) 기준으로 탐색하는 A*로 경로를 생성했습니다.\n\n시작점, 인지된 장애물, 도착점 좌표를 입력으로 받아 고정 장애물 2개 + 랜덤 장애물 24개(총 26개)를 배치한 맵에서 경로 생성을 확인했고, 장애물 수와 배치를 바꿔가며 반복 검증했습니다.',
            },
            {
              heading: '제어 — Pure Pursuit',
              body:
                '전역 경로를 기하학적으로 추종하는 Pure Pursuit으로 주행을 제어했습니다. 차량 운동 방정식과 경로 지오메트리만 사용하는 단순한 구조라 계산 비용이 낮아 실시간 제어와 반복 실험에 적합합니다.\n\n경로가 부드러우면 안정적으로 추종하지만, 급격히 꺾이는 구간에서는 진동과 오차가 생기는 한계도 실험에서 그대로 관찰했습니다.',
            },
            {
              heading: '결과',
              body:
                '랜덤 배치된 정적 장애물 환경에서 인지 → 판단 → 제어가 하나의 시스템으로 동작해 목표 지점 도달을 확인했습니다. 단일 환경에서의 1회 성공이 아니라, 배치가 바뀌는 환경에서의 반복 검증이라는 점이 핵심입니다.\n\n3인 팀 프로젝트로, 저는 팀장으로 Computer Vision·Planning·Control 세 파트에 모두 참여하며 통합을 총괄했습니다.',
            },
          ],
          featured: true,
        },
      ],
    },
    experience: {
      eyebrow: 'Experience',
      heading: '경력 · 학력',
      items: [
        {
          period: '2026.07 ~ 현재',
          title: 'GeoAI 그룹 인턴',
          org: '웨이버스 (VLM · GraphRAG · Multi Agent)',
          note:
            'VLM 기반 인구 밀집 지역 히트맵을 구현·고도화하고, "말로 만드는 지도" Agent와 GraphRAG를 학습하고 있습니다.',
        },
        {
          period: '2025.03 ~ 2026.06',
          title: '학부연구생',
          org: '인하대학교',
          children: [
            { label: '금융인공지능 연구실', period: '2025.12 ~ 2026.06' },
            { label: '비전 · 학습 연구실', period: '2025.06 ~ 2025.10' },
            { label: '자율시스템 연구실', period: '2025.03 ~ 2025.06' },
          ],
        },
        {
          period: '2021 ~ 현재',
          title: '인공지능공학 학사',
          org: '인하대학교',
        },
      ],
    },
    activities: {
      eyebrow: 'Activities',
      heading: '대외활동',
      items: [
        {
          period: '2026.03 ~ 현재',
          title: '부회장 · 멤버',
          org: 'LinkUs (AI talent network)',
          note:
            '회장단에서 유일한 엔지니어로, 커리어 네트워킹 모임에서 AI talent network로의 리브랜딩을 맡고 있습니다.',
          children: [
            { label: '20기 부회장', period: '2026.07 ~ 현재' },
            { label: '19기 멤버', period: '2026.03 ~ 2026.06' },
          ],
        },
        {
          period: '2026.01 ~ 2026.02',
          title: 'LLM Compression 트랙 수료',
          org: 'LG Aimers 8기 (LG AI 교육 프로그램)',
        },
        {
          period: '2025.03 ~ 2026.02',
          title: '학과 서포터즈',
          org: '인하대학교 미래자동차공학과',
        },
      ],
    },
    awards: {
      eyebrow: 'Awards',
      heading: '수상',
      items: [
        {
          year: '2024',
          title: '인컴톤 대상',
          org: 'LINK 3.0 사업단장상',
        },
        {
          year: '2026',
          title: '캡스톤 디자인 우수상',
          org: '인하대학교 소프트웨어융합대학장상',
        },
        {
          year: '2026',
          title: 'LinkUs 활동우수자 대상',
        },
      ],
      certificationsEyebrow: 'Certifications',
      certificationsLabel: '자격',
      certifications: ['OPIc IH', 'SQLD'],
      copyrightsEyebrow: 'Copyrights',
      copyrightsLabel: '저작권 등록',
      copyrights: [
        { code: 'C-2026-03297', name: '모아봄 (Moabom)' },
        { code: 'C-2026-022267', name: 'LST 기반 Stable Diffusion 학습 성능 향상 프로그램' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      heading: '연락',
      body:
        '채용과 협업 문의를 환영합니다. 프로젝트에 대해 더 알고 싶은 부분이 있으면 이메일로 알려주시면 확인 후 회신하겠습니다.',
      email: 'seankim0824@gmail.com',
      github: 'https://github.com/MeDeoDuck',
    },
    detailLabels: {
      back: '목록으로',
      role: '역할',
      period: '기간',
      stack: '기술 스택',
      links: '링크',
    },
    footer: '© 2026 김재현 · seankim0824@gmail.com',
  },

  en: {
    nav: {
      hello: 'Hello',
      skills: 'Skills',
      about: 'About',
      capabilities: 'Capabilities',
      projects: 'Projects',
      experience: 'Experience',
      activities: 'Activities',
      awards: 'Awards',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Aspiring ML engineer',
      name: 'Jaehyun Kim',
      tagline:
        'I believe no AI is perfect, so I start from verification.\nI design, ship, and operate LLM agent services,\nand I have solved their cost and consistency problems myself.\nI am growing into an engineer who builds trustworthy architecture,\nand my goal is to turn my decision log into my own practical skill.md library.',
      metrics: [
        { value: '97 users', label: 'One-week deployment' },
        { value: '98%', label: 'Verdict consistency over 300 runs' },
        { value: '99%↓', label: 'Inference cost' },
      ],
      cta: 'View projects',
    },
    hello: {
      eyebrow: 'Hello 👋',
      typed: "Hi, I'm Jaehyun Kim — AI engineer.",
      headline: {
        lead: 'I build systems where ',
        accent: 'code verifies the model',
        tail: ', not the other way around.',
      },
      body:
        'I believe no AI is perfect, so I start from verification.\nI design, ship, and operate LLM agent services,\nand I have solved their cost and consistency problems myself.\nI am growing into an engineer who builds trustworthy architecture,\nand my goal is to turn my decision log into my own practical skill.md library.',
      infoLabel: 'Personal Info',
      info: [
        { label: 'Education', value: 'BS in AI Engineering, Inha University' },
        { label: 'Currently', value: 'GeoAI group intern at WAVUS (VLM · GraphRAG · Multi Agent)' },
        { label: 'Focus', value: 'Multi-agent LLM · harness engineering' },
        {
          label: 'Copyrights',
          value: 'Moabom · Stable Diffusion training efficiency program based on LST',
        },
      ],
      contactLabel: 'Contact',
      contacts: [
        { label: 'GitHub', value: '@MeDeoDuck', href: 'https://github.com/MeDeoDuck' },
        { label: 'Email', value: 'seankim0824@gmail.com', href: 'mailto:seankim0824@gmail.com' },
        { label: 'Phone', value: '+82 10-2589-4493', href: 'tel:+821025894493' },
      ],
    },
    skills: {
      eyebrow: 'Skills',
      heading: 'Tech Stack',
      groups: [
        { label: 'AI · ML', items: SKILLS.ai, wide: true },
        { label: 'Backend · Infra', items: SKILLS.backend },
        { label: 'Language · Tool', items: SKILLS.lang, wide: true },
        { label: 'AI Plugin & MCP', items: SKILLS.plugin, wide: true, tile: 128 },
      ],
    },
    about: {
      heading: 'About',
      body:
        'I am an undergraduate in AI Engineering at Inha University. I design systems where the model proposes an answer and code checks it before anything reaches the user. I shipped a multi-agent product to real users, distilled teacher labels into a local model to cut inference cost, and I am studying harness engineering, evidence gates, guardrails, and self-healing pipelines, by applying it to services people actually use. I turn the know-how from each problem into my own library of work skill.md files. I am early in my career, and every number on this site is one I measured myself.',
    },
    capabilities: {
      eyebrow: 'Capabilities',
      heading: 'Capabilities',
      items: [
        {
          no: '01',
          name: 'Multi-agent orchestration',
          highlight: true,
          desc:
            'I orchestrate flow between agents with LangGraph. Instead of handing everything to one large prompt, the work is split by role — video selection, sentiment analysis, report writing — and controlled by explicit rules rather than free-form conversation, so results stay predictable.',
        },
        {
          no: '02',
          name: 'Harness and guardrail engineering',
          highlight: true,
          desc:
            'Model output never ships as is; it passes an evidence gate first. Persona worldviews stay open as soft rules while numeric thresholds are enforced as hard rules, so verdicts stay consistent even in free-flowing debate. Proposals filtered at the gate are logged, keeping every decision traceable.',
        },
        {
          no: '03',
          name: 'LLM routing and serving backend',
          highlight: true,
          desc:
            'I build AI service backends with FastAPI and PostgreSQL. Cascade routing sends only low-confidence predictions to the large model, and a dual-LLM setup assigns different models to speech and internal reasoning — spending cost only where quality matters.',
        },
        {
          no: '04',
          name: 'Graph and time series modeling',
          desc:
            'Data with relationships is treated as a graph. A multi-relational GNN detects anomalous patterns at the level of coordinated groups rather than individual accounts, and in time series forecasting I tackle the time-shift error existing metrics miss through loss function design.',
        },
        {
          no: '05',
          name: 'Computer vision and robotics',
          desc:
            'I work on detection, tracking, and re-identification pipelines. From CCTV perception through A* path planning to Pure Pursuit control, everything runs as one ROS pipeline — carrying the model judgment into real motion beyond the screen.',
        },
      ],
    },
    marquee: {
      eyebrow: 'Projects Overview',
      heading: 'Projects at a glance',
    },
    projects: {
      eyebrow: 'Projects',
      heading: 'Selected Projects',
      moreHeading: 'KCI Paper Under Review',
      viewDetail: 'View detail',
      liveLabel: 'Live',
      items: [
        {
          id: 'moabom',
          no: '01',
          category: 'Team · Capstone',
          name: 'Moabom',
          period: '2026.03 ~ 2026.06',
          role: 'Backend architecture, DB design, comment filtering agent, KLUE distillation (team of 3)',
          tagline:
            'A multi-agent LLM service that collects transcripts and comments across YouTube tech reviews and turns them into a purchase decision report for a single product.',
          detailTagline:
            'An AI web service that automatically selects N YouTube review videos for a tech product, analyzes the range of opinions in their transcripts and comments, and delivers an easy-to-scan report that supports a rational purchase decision.',
          stack: ['LangGraph', 'FastAPI', 'PostgreSQL', 'Docker', 'Azure', 'GPT-4.1', 'KLUE-RoBERTa'],
          metrics: [
            { value: '98%', label: 'Verdict consistency over 300 runs' },
            { value: '99%↓', label: 'Inference cost' },
          ],
          links: [{ label: 'Benchmark repo', href: 'https://github.com/MeDeoDuck/MoabomVSAll' }],
          detail: [
            {
              heading: 'Overview',
              body:
                'A multi-agent service that runs the whole journey on its own: type a product name and it selects videos, analyzes transcripts and comments, and writes the final report.\n\nIt gathers reviewer opinions across many channels together with real-user comments, so the conclusion does not lean on any single channel.',
              images: [
                { seed: 'moabom-p-main', label: 'MOABOM main screen' },
              ],
            },
            {
              heading: 'Goals',
              body:
                'Save time — AI agents cut a 120-minute review hunt down to 5 minutes (24x faster)\n\nCorrect bias — multiple reviewers plus comments soften channel bias\n\nUnified comparison — a 7-section report weaving transcripts, RAG, and sentiment labels\n\nConsistency — a multi-stage pipeline keeps verdicts stable',
            },
            {
              heading: 'Why YouTube tech reviews?',
              body:
                'Tech review videos follow a standard format, which makes transcript and comment data easy to collect. Specs and performance offer objective points of comparison, so majority-consensus extraction works well, and comments are rich in real-use feedback to contrast with expert views.\n\nThe market signal is clear too — 91.1% of consumers check reviews before buying and 54.7% compare four or more; 30% of reviews are suspected of being inauthentic and 82% have run into fake reviews. For tech products, reviews weigh especially heavily on purchase decisions. (Capital One Shopping 2026 - Katyal et al. 2025, IJSAEM 16(9))',
            },
            {
              heading: 'Target users',
              body:
                'Everyday consumers comparing reviews before buying tech products such as phones, laptops, and earbuds.\n\nPeople who cannot watch review videos end to end but still want the common findings and real-user sentiment.',
            },
            {
              heading: 'What the user gets',
              body:
                'One 7-section report per product, generated automatically: purchase verdict, key summary, 6-dimension score table, consensus-based pros and cons, consumer sentiment, changes from the previous model, and recommend or not.\n\nEvery claim carries an N-of-N agreement count — how many reviewers agreed — so trust is visible at a glance.',
              images: [
                { seed: 'moabom-p-report', label: 'Product-level integrated report' },
              ],
            },
            {
              heading: 'System architecture',
              body:
                'After the product name is entered, the pipeline runs video selection, comment filtering, and report generation as separate agents. The final stage is directed by a LangGraph Supervisor that inspects DB state and branches between cache return, self-healing data repair, and full synthesis.',
              images: [
                { seed: 'moabom-p-arch', label: 'System architecture' },
                { seed: 'moabom-p-flow', label: 'MOABOM user flow' },
              ],
              stackImages: true,
            },
            {
              heading: 'Agent-by-agent architecture',
              body:
                'Video selection agent — clusters candidate review videos by embedding and analyzes transcripts as evidence, automatically picking reviews with diverse perspectives.\n\nComment filtering agent — trims collected comments with rule-based soft filters and multi-criteria selection, then refines them with LLM 5-class classification and ABSA sentiment analysis, keeping only trustworthy, product-relevant consumer opinion.\n\nReport generation agent — synthesizes transcripts and comments into three per-video reports plus one product-level report (four in total), cross-checking multiple reviews to produce a reliable final analysis.\n\nSupervisor agent — a LangGraph orchestrator that checks the freshness of each input (transcripts, comments, integration) and decides which steps to run, in what order: cache return, comment self-heal, report guarantee, synthesis, and storage.',
              images: [
                { seed: 'moabom-p-agents', label: 'Agent-by-agent architecture' },
              ],
            },
            {
              heading: 'Lightweight model optimization',
              body:
                'Comment classifier — keep accuracy, cut cost and latency. GPT-4.1 (teacher) labels were transferred into a fully fine-tuned KLUE-BERT (A40, 3 epochs, self-collected data). Similar labels were merged into Video Reaction for stability; accuracy holds against GPT-4.1 while inference runs 22x faster at zero API cost.\n\nComparison-video detector — automatic noise removal for video selection. It classifies multi-product comparison videos; three models were benchmarked and KLUE-RoBERTa was adopted (RTX 4060 Ti, 3 epochs, self-collected data). Judging from title and description alone allows pre-filtering before transcript collection, cutting cost, and choosing a model sized to the data avoids overfitting.',
              images: [
                { seed: 'moabom-p-comment-model', label: 'Local comment filtering model performance' },
                { seed: 'moabom-p-compare-model', label: 'Comparison-video detection model performance' },
              ],
            },
            {
              heading: 'Consistency check — Moabom vs commercial LLMs',
              body:
                'We measured verdict consistency by asking about the same product ten times (10 products x 10 repeats x 3 models = 300 runs, in-house). Moabom 98.0%, GPT 90.0%, Gemini 86.0%.\n\nMoabom is the most stable — a direct effect of the anti-hallucination rules and multi-LLM cross-verification design.',
              images: [
                { seed: 'moabom-p-consistency', label: 'Average verdict consistency by AI' },
              ],
            },
            {
              heading: 'Key features',
              body:
                'Product-level integration with plain-language explanation — information scattered across channels, transcripts, and comments is rebuilt into one product report. Reviewer opinions are compared against real-user comment reactions, sentiment is analyzed per product trait, and jargon is unpacked for general readers.\n\nDramatically shorter review hunting — the 120-minute exploration drops under 5 minutes (about 24x). A dense, structured report supports fast purchase decisions without watching a single video.\n\nUnbiased, consistent evaluation — video selection escapes the big-channel bias of the recommendation algorithm, and using many reviewers plus comments together corrects individual reviewer bias. Repeated evaluation of the same product reached 98.0% consistency.\n\nHigh extensibility to other categories and B2B — any product with YouTube reviews (cosmetics, food, and more) fits, and the same engine can serve companies as a reviewer and consumer reaction analysis service.',
            },
            {
              heading: 'Service screens',
              body:
                'Type a product name on the main screen and the service walks through video selection to four generated reports. Below are actual screens.',
              images: [
                { seed: 'moabom-p-s01', label: 'Selected video list - main 1' },
                { seed: 'moabom-p-s02', label: 'Selected video list - main 2' },
                { seed: 'moabom-p-s03', label: 'Per-video report - loading' },
                { seed: 'moabom-p-s04', label: 'Per-video report - main' },
                { seed: 'moabom-p-s05', label: 'Per-video report - main' },
                { seed: 'moabom-p-s06', label: 'Per-video report - integrated analysis 1' },
                { seed: 'moabom-p-s07', label: 'Per-video report - integrated analysis 2' },
                { seed: 'moabom-p-s08', label: 'Per-video report - transcript analysis 1' },
                { seed: 'moabom-p-s09', label: 'Per-video report - transcript analysis 2' },
                { seed: 'moabom-p-s10', label: 'Per-video report - comment analysis' },
                { seed: 'moabom-p-s11', label: 'Product-level report - loading' },
                { seed: 'moabom-p-summary', label: 'Product opinion summary' },
                { seed: 'moabom-p-s12', label: 'Product-level report - main 1' },
                { seed: 'moabom-p-s13', label: 'Product-level report - main 2' },
              ],
              stackImages: true,
            },
          ],
          featured: true,
        },
        {
          id: 'fomo-breaker',
          no: '02',
          category: 'Team',
          name: 'FOMO Breaker',
          period: '2026',
          role: 'PM and backend; multi-agent debate and verification gate (team of 5)',
          tagline:
            'A multi-persona debate system that checks whether the urge to buy a stock came from analysis or from FOMO.',
          detailTagline:
            'A second-opinion service that makes an investor check once more, through a data-grounded debate, before pressing the buy button — an intelligent multi-agent system that curbs impulse trading with a multi-persona AI debate.',
          stack: ['React', 'TypeScript', 'FastAPI', 'WebSocket', 'GPT-4.1', 'Llama-3.3-70B (Groq)'],
          metrics: [
            { value: '390/736', label: 'Proposals held or rejected at the gate, 30 runs' },
            { value: '5', label: 'Personas with distinct theory priors' },
            { value: '2', label: 'LLMs splitting speech from internal reasoning' },
          ],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/FOMO-Breaker' }],
          detail: [
            {
              heading: 'Overview',
              body:
                'FOMO (Fear Of Missing Out) is the urge to chase surging assets for fear of being the only one left out; a breaker is the safety device that cuts an overheated circuit before an accident.\n\nFOMO Breaker is a second-opinion service that makes an investor check once more, through a data-grounded debate, before pressing the buy button — an intelligent multi-agent system that prevents impulse trading with a multi-persona AI debate. Right before a purchase, it offers a debate instead of a verdict.',
              images: [
                { seed: 'fomo-p-idea', label: 'Core idea — a debate instead of a verdict' },
              ],
            },
            {
              heading: 'Problem — investment frenzy and market volatility',
              body:
                'Stock tips spread through communities and social media, and investing went mainstream after COVID-19, turning the stock rush into a social trend. Chasing surging tickers and trading on fear and greed grew, raising the need for a psychological brake beyond price feeds.\n\nThe first half of 2026 shows it — sidecar circuit breakers fired 20 times (nearing the financial-crisis level of 26), and margin loans passed 43 trillion won, the highest in 3 years and 8 months, with regulator warnings.',
            },
            {
              heading: 'What is wrong with existing AI investing services',
              body:
                'Existing services let the AI decide — buy now — or even automate the purchase. An AI that hands out answers fuels impulse trading in novice investors. FOMO Breaker does the opposite: it lays the reasoning process itself in front of the user.',
            },
            {
              heading: 'Differentiator 1 — a persona per agent',
              body:
                'Five personas each take a different theory from economics and behavioral finance as their worldview (prior), so they deliberately reach different conclusions from the same market data.\n\nRisk examiner (ultra-low risk) — loss aversion (Kahneman & Tversky, 1979). The pain of loss is twice the joy of gain: it always weighs downside risk heavily in overheated phases.\n\nFlow tracker (medium risk) — the information content of order flow (Choe, Kho & Stulz, 1999). Words can lie, money flows cannot: foreign and institutional net buying proxy informed trading.\n\nMomentum hunter (ultra-high risk) — price momentum (Jegadeesh & Titman, 1993). Momentum persists until the reversal signal: volume tells life from death.\n\nContrarian (low risk) — contrarian investment (Lakonishok, Shleifer & Vishny, 1994). Prices converge to fundamentals: popularity is a premium, and premium is the enemy of returns.\n\nCrowd psychology advocate (high risk) — herding and information cascades (Bikhchandani et al., 1992). Mood moves before data: individuals follow the crowd.',
              images: [
                { seed: 'fomo-p-persona', label: 'A persona per agent' },
              ],
            },
            {
              heading: 'Differentiator 2 — multi-persona debate',
              body:
                'The personas debate each other, and a moderator AI synthesizes the whole debate into a concluding report. Personas that differ only in tone end up agreeing, so the differences were built in at the level of judging criteria — their theoretical priors — to make opinions actually diverge.',
              images: [
                { seed: 'fomo-p-debate', label: 'Multi-persona debate structure' },
              ],
            },
            {
              heading: 'The 5-stage data-driven psychological brake',
              body:
                '1. Data collection — prices and volume (pykrx), corporate DART filings and financials, market VKOSPI and VI triggers, news sentiment (hype) data\n\n2. Analysis and engineering — real-time anomaly detection, overheat feature extraction, per-category scoring, a psychology computation engine\n\n3. Multi-persona debate — value vs technicals vs investor views, multi-angle verification of the buy thesis, a five-persona open debate, moderation and synthesis by the moderator AI\n\n4. FOMO index finalization — data plus psychology weighting, the final FOMO level, real-time visualization, report generation and summary\n\n5. Action plan and care — impulse-buy brake warnings, reality-check indicators, staged-buy and adjustment strategies, guidance toward rational trading\n\nBeyond serving information, it is a data-driven brake that slows emotion at the moment right before a purchase.',
              images: [
                { seed: 'fomo-p-process', label: 'The 5-stage psychological brake' },
              ],
            },
            {
              heading: 'System architecture',
              body:
                'Input — user input, data loading, six indicators, a linear FOMO score, persona input JSON, delivery to each agent.\n\nDebate — Round 1, then Round 2 repeated 2 to 10 times, then Round 3 and the debate report. Weight proposals pass a Weight Validator and are combined in a Final Merge.\n\nVerification gate — harness engineering keeps every persona response grounded in evidence. It checks whether stated grounds match the actual signal scores and whether adjustments stay under a cap; weights are redistributed zero-sum to preserve the total, and the final index is recomputed backward to confirm it matches its components. Most gate triggers are holds for insufficient evidence.',
              images: [
                { seed: 'fomo-p-input-flow', label: 'Input data flowchart' },
                { seed: 'fomo-p-debate-flow', label: 'Debate flowchart' },
                { seed: 'fomo-p-gate-flow', label: 'Verification gate flowchart' },
              ],
              stackImages: true,
            },
            {
              heading: 'Data pipeline and indicator engineering',
              body:
                'pykrx / KIS API — prices, volume, PER/PBR, dividends → Price Overheat, Volume Spike → technical overheat and flow concentration\n\nOpen DART — major-event filings → financial risk flags → rational, fundamentals-based defense logic\n\nNaver News API — headlines and article text → sentiment and hype indices → crowd psychology and overheat trends\n\nKRX VKOSPI / KIS — volatility indicators and VI triggers → a fear proxy and VI flag → visible market fear and overheat\n\nCollected indicators are scored per category with weights grounded in behavioral economics and merged into the final FOMO index.',
            },
            {
              heading: 'Stack',
              body:
                'Frontend — React 18 + TypeScript 5, Vite 6, Tailwind CSS 4, native WebSocket\n\nBackend — FastAPI + uvicorn, Pydantic v2, WebSocket streaming, asyncio\n\nAI — GPT-4.1 and Llama-3.3-70B in a dual-LLM setup that separates public speech from internal reasoning, so polishing a sentence for the user never mixes with making a judgment. The debate streams live over WebSocket.\n\nData APIs — pykrx, Naver News API, OpenDART, KIS API',
            },
            {
              heading: 'Verification — against other AI services',
              body:
                'Compared with single models, only FOMO Breaker carries all of: evidence tracing, a verification gate with number cross-checks, consensus and dissent labels per persona, coverage-based confidence labels, degraded-quality banners, and early-stop round observation.\n\nVerdict consistency 96.7% (29 of 30 matched); verification-gate trigger rate 39.9% (294 of 736). On the same ticker set, FOMO Breaker flagged 6 tickers as caution versus 1 for GPT-4.1 and 1 for Gemini 2.5.\n\nFor an overheat warning tool, missing real overheat (a false negative) is deadlier than a false alarm. The claim is not that we are more accurate — it is a design choice about which direction a warning tool should err.',
              images: [
                { seed: 'fomo-p-benchmark', label: 'Comparison with other AI services' },
              ],
            },
            {
              heading: 'Results, limits, and next steps',
              body:
                'Achievements — a real-time risk-signal pipeline, and a fact-based decision system (the AI debate floor) that removes emotion from the loop.\n\nLimitations — noise handling and weighting for news sentiment needs further research, and there is no hard evidence yet that sensitivity to each indicator equals accuracy.\n\nFuture plans — deeper investor-profile modeling from past trading history, and API integration with brokerage platforms (MTS and others).',
            },
            {
              heading: 'Scope',
              body:
                'This is not investment advice. It does not recommend buying or selling. The scope is limited to checking a purchase intent the user already holds for signs of overheating and risk.',
            },
          ],
          featured: true,
        },
        {
          id: 'cage-carerf',
          no: '03',
          category: 'Team',
          name: 'CAGE-CareRF',
          period: '2026',
          role: 'Team lead — problem definition, model design, experiments (team of 3)',
          tagline: 'A multi-relation GNN that models reviews as six relation graphs to detect organized fake-review rings.',
          detailTagline:
            'A study that detects organized fake reviews in the YelpZip dataset with a multi-relation GNN that learns six separate relation channels between reviews. Presented at the 2nd ITDA regional conference.',
          stack: ['PyTorch Geometric', 'ChebConv', 'Sentence-BERT', 'TF-IDF · SVD', 'Focal Loss'],
          metrics: [
            { value: 'PR-AUC 0.4447', label: 'Original 11:89 imbalance · 5-seed avg' },
            { value: '+62%', label: 'vs best single-graph baseline' },
            { value: '6', label: 'Relation graph channels' },
          ],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/CAGE-CareRF' }],
          detail: [
            {
              heading: 'Overview',
              body:
                'A graph neural network study for detecting fake reviews in the YelpZip dataset. Looking at one review at a time, a well-written fake is hard to tell from a genuine review.\n\nInstead, this work starts from the view that fake reviews move in coordinated groups: each review is treated not as an isolated sentence but as a behavioral record connected by user, product, time, rating, and behavioral similarity — and the fraud signal is searched for in that relation structure.',
            },
            {
              heading: 'Four Core Hypotheses',
              body:
                'Relation — fraud shows up in the relation structure between reviews, not in the text. Graph learning over review nodes and relation edges is fundamentally better positioned than NLP alone.\n\nMulti-relation — different relations carry fraud signals of different strength, so they must be learned separately. Six relations are trained as independent channels and then fused.\n\nPer-node trust — which relation is trustworthy differs by node. Relation weights are learned dynamically per node instead of being fixed.\n\nCamouflage — skilled abusers deliberately connect to normal nodes to hide. Suspicious neighbors are filtered out before message passing.',
            },
            {
              heading: 'Edge Design',
              body:
                'Three basic relations are extended with three custom relations that target patterns unique to organized abuse, for six channels in total.\n\nBasic — same user (R-U-R, repeated authorship) · same product and month (R-T-R, time-concentrated manipulation) · same product and rating (R-S-R, rating manipulation).\n\nCustom — same product within 7 days at ±1 rating (R-Burst-R, short-term reputation bombing) · top-5 text similarity within a product (R-SemSim-R, template review farming) · top-5 user behavior-vector similarity (R-Behavior-R, multi-account synchronization).',
            },
            {
              heading: 'Text Encoder — 5 Variants Compared',
              body:
                'With only 3,366 fraud labels, fine-tuning an encoder with 3M+ parameters risks overfitting and label leakage. SBERT was therefore kept frozen and five encoder variants with minimal trainable parts were compared.\n\nThe concat encoder — combining the lexical precision of TF-IDF with the semantic generalization of SBERT — tied for first place within one standard deviation on both key metrics (PR-AUC and Macro F1) and was adopted.',
            },
            {
              heading: 'Architecture',
              body:
                'CARE filter — removes camouflaged neighbors before message passing using feature similarity only (label-free), reducing contaminated signal flow.\n\nChebConv × 6 — one independent GNN channel per relation, so strong relations do not dilute weak ones. Spectral models beat spatial ones in baseline runs (ChebConv 0.2752 vs GAT 0.2435), consistent with theory that fraud carries high-frequency graph signal.\n\nGated fusion — per-node softmax weights fuse the six channels, letting the model learn which relation each node should trust.\n\nAux loss + focal loss — per-channel auxiliary supervision makes each relation discriminative on its own, and hard samples get larger weights under the 11:89 class imbalance.',
              images: [
                { seed: 'cage-carerf-b', label: 'Full training pipeline' },
              ],
            },
            {
              heading: 'Results',
              body:
                'Fifteen models — proposed variants, ablations, and six single-graph baselines — were compared as 5-seed averages. The final model reaches PR-AUC 0.4447±0.0061, +62% over the best baseline (ChebConv, 0.2752) and +75% over the baseline average.\n\nOn a follow-up cascade-sampled dataset with the fraud ratio raised to about 25%, it recorded PR-AUC 0.789 (MLP 0.633 and the best GNN baseline GAT 0.734 under the same condition — a comparison where every model improved together).',
            },
            {
              heading: 'Ablation — What Drove the Performance',
              body:
                'Removing modules one at a time: dropping the aux loss collapses PR-AUC from 0.4447 to 0.2982 (−33%), by far the most important; removing the CARE filter costs −0.0203 (−5%), a clear positive contribution.\n\nSkip connections and gating stayed within one standard deviation when removed. The honest conclusion: per-channel auxiliary supervision is the core, while skip and gating are interpretability options.',
            },
            {
              heading: 'Generalization and Limitations',
              body:
                'Applying the same backbone unchanged to Amazon and YelpChi: on YelpChi it beat the best baseline by +0.094 PR-AUC, and on Amazon it was on par (−0.004) — suggesting portability to other fraud domains without structural redesign.\n\nLimitations are equally clear — absolute performance may trail SOTA models that use richer text representations or external metadata, and the behavior-vector relation (R-Behavior-R) was a weak signal that struggles to separate heavy users from abusers.\n\nA three-person team project; as team lead I owned problem definition, model design, and the experiments.',
            },
          ],
          featured: true,
        },
        {
          id: 'shiftloss',
          no: '06',
          category: 'Research',
          name: 'ShiftLoss',
          period: '2026',
          role: 'Personal research',
          tagline:
            'A time-series forecasting loss study that adds a time-shift term to an existing loss function and analyzes when alignment-based losses are effective.',
          stack: ['PyTorch', 'PatchTST', 'DLinear', 'iTransformer', 'Amplifier'],
          metrics: [],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/ShiftLoss' }],
          detail: [],
          featured: false,
        },
        {
          id: 'stablediffusion-lst',
          no: '04',
          category: 'Personal · Research',
          name: 'StableDiffusion + LST',
          period: '2025',
          role: 'Personal research and implementation (registered software copyright)',
          tagline:
            'Attaches Ladder Side Tuning modules to Latent Diffusion, freezing the backbone and training only a lightweight side network.',
          detailTagline:
            'A personal study that integrates Ladder Side Tuning into the Latent Diffusion UNet — freezing the backbone and training only a lightweight side network — so a Stable-Diffusion-scale model can be trained on limited hardware. Registered as a copyrighted program.',
          stack: ['PyTorch', 'Latent Diffusion', 'Ladder Side Tuning'],
          metrics: [
            { value: '29%↓', label: 'GPU memory' },
            { value: '52%↓', label: 'Training time' },
          ],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/StableDiffusionWithLST' }],
          detail: [
            {
              heading: 'Overview',
              body:
                'Training Stable Diffusion from scratch takes 150,000 GPU-hours on 256 NVIDIA A100s — unrealistic for an individual research setup.\n\nInstead of training the whole backbone, this study integrates Ladder Side Tuning (LST) into Latent Diffusion so that only a lightweight side network is trained: a parameter-efficient fine-tuning (PEFT) approach that keeps training feasible on a single limited GPU.',
            },
            {
              heading: 'Approach — Why Memory Drops',
              body:
                'All backbone parameters are frozen; intermediate activations from each block flow through ladder shortcut connections into the side network, which produces the prediction.\n\nBecause backpropagation never passes through the backbone, its intermediate activations no longer need to be kept for the backward pass — cutting both memory and compute.',
              images: [
                { seed: 'stablediffusion-lst-a', label: 'Stable Diffusion UNet with LST' },
              ],
            },
            {
              heading: 'Implementation',
              body:
                'LST modules are inserted into every UNet block of the latent-space denoising process. Each block\u2019s intermediate features are concatenated with the previous LST output as the next module\u2019s input; the first step substitutes the initial UNet input h, and a final_proj converts the last LST feature map into the target output channels and format.\n\nThe module itself is a minimal GroupNorm → SiLU → 1×1 Conv structure, keeping the added parameters and compute as small as possible.',
            },
            {
              heading: 'Experiment Setup',
              body:
                'Built on the official Latent Diffusion codebase, trained on LSUN Churches (192×192) with a single TITAN RTX.\n\nOriginal Stable Diffusion training and LST training were compared under identical settings: batch 1, 1000 epochs, learning rate 5e-5, AdamW.',
            },
            {
              heading: 'Results',
              body:
                'GPU memory dropped from 23,115 MiB to 16,509 MiB (about 29%), and training time fell from 1h 07m to 32m (about 52%) — the direct effect of removing backbone backpropagation and training only the side network and ladder connections.\n\nThese are training-efficiency results; they do not claim better generation quality than existing fine-tuning methods.',
              images: [
                { seed: 'stablediffusion-lst-b', label: 'Results — GPU memory and training time' },
              ],
            },
            {
              heading: 'Disclosure',
              body:
                'The source is closed as a registered copyrighted program; only the architecture and measurements are public.',
            },
          ],
          featured: true,
        },
        {
          id: 'physical-ai',
          no: '05',
          category: 'Team',
          name: 'Physical_AI_ws',
          period: '2025',
          role: 'Team lead — perception, planning, and control integration (team of 3)',
          tagline: 'Integrated a warehouse-robot pipeline in ROS, from CCTV perception through A* planning to Pure Pursuit control.',
          detailTagline:
            'A team project that integrates ceiling-CCTV perception, A* path planning, and Pure Pursuit control into one autonomous-driving pipeline on ROS 2 and Gazebo, validated across randomly placed static-obstacle environments.',
          stack: ['ROS 2', 'Gazebo', 'TurtleBot4', 'DMPR-PS', 'A*', 'Pure Pursuit'],
          metrics: [
            { value: '26', label: 'Static obstacles (2 fixed + 24 random)' },
            { value: '3', label: 'Integrated stages: perceive · plan · control' },
          ],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/Physical_AI_ws' }],
          detail: [
            {
              heading: 'Overview',
              body:
                'An autonomous-driving algorithm that succeeds once in one environment is not guaranteed to work in another. Real industrial spaces like fulfillment centers have static obstacles but a different layout at every site.\n\nSo the pipeline — CCTV perception → A* planning → Pure Pursuit control — was built and validated in Gazebo with a TurtleBot4, across environments whose obstacles are randomly rearranged, checking that the robot reliably reaches its goal.',
              images: [
                { seed: 'physical-ai-d1', label: 'Perceive → plan → control pipeline' },
              ],
            },
            {
              heading: 'Goals',
              body:
                'Environment generalization — validate pipeline stability without depending on a single environment\n\nIntegrated operation — verify that perception, planning, and control run correctly as one system\n\nTop-down perception — assess whether ceiling-CCTV perception is practical in structured static spaces such as warehouses',
            },
            {
              heading: 'Perception — CCTV Target Detection',
              body:
                'DMPR-PS (IEEE T-ITS 2021) detects the target slot in the top-down CCTV view. Pre-trained weights degraded in the simulator, so a custom dataset was labeled in MATLAB, augmented, and fully fine-tuned for 1000 epochs on an A6000.\n\nThe average of the four detected corner points becomes the goal; image coordinates are converted into a 20m×20m world frame and bridged into rviz via Gazebo-ROS 2.',
            },
            {
              heading: 'Planning — A*',
              body:
                'Paths are generated with A*, expanding nodes by f(n) = g(n) + h(n) — actual cost so far plus estimated cost to goal.\n\nGiven the start point, perceived obstacles, and goal, path generation was verified on maps with 2 fixed + 24 random obstacles (26 total), repeatedly re-validated as the count and layout changed.',
            },
            {
              heading: 'Control — Pure Pursuit',
              body:
                'Driving is controlled by Pure Pursuit, a geometric path-tracking method that uses only the vehicle kinematics and the path geometry. Its low compute cost suits real-time control and repeated experiments.\n\nIt tracks smooth paths stably, and the known limitation — oscillation and error on sharp turns — was observed as-is in the experiments.',
            },
            {
              heading: 'Results',
              body:
                'Across randomly rearranged static-obstacle environments, perception, planning, and control operated as one system and the robot reached its goal. The point is repeated validation under changing layouts, not a single success in one environment.\n\nA three-person team project; as team lead I worked across all three parts — computer vision, planning, and control — and owned the integration.',
            },
          ],
          featured: true,
        },
      ],
    },
    experience: {
      eyebrow: 'Experience',
      heading: 'Experience',
      items: [
        {
          period: '2026.07 ~ Present',
          title: 'GeoAI group intern',
          org: 'WAVUS (VLM · GraphRAG · Multi Agent)',
          note:
            'Building and refining a VLM-based crowd-density heatmap, and studying a "maps from words" agent with GraphRAG.',
        },
        {
          period: '2025.03 ~ 2026.06',
          title: 'Undergraduate researcher',
          org: 'Inha University',
          children: [
            { label: 'Financial AI Lab', period: '2025.12 ~ 2026.06' },
            { label: 'Vision and Learning Lab', period: '2025.06 ~ 2025.10' },
            { label: 'Autonomous Systems Lab', period: '2025.03 ~ 2025.06' },
          ],
        },
        {
          period: '2021 ~ Present',
          title: 'BS in AI Engineering',
          org: 'Inha University',
        },
      ],
    },
    activities: {
      eyebrow: 'Activities',
      heading: 'Activities',
      items: [
        {
          period: '2026.03 ~ Present',
          title: 'Vice president, member',
          org: 'LinkUs (AI talent network)',
          note:
            'The only engineer on the executive board, currently leading the rebrand from a career networking club into an AI talent network.',
          children: [
            { label: 'Vice president, 20th cohort', period: '2026.07 ~ Present' },
            { label: 'Member, 19th cohort', period: '2026.03 ~ 2026.06' },
          ],
        },
        {
          period: '2026.01 ~ 2026.02',
          title: 'Completed the LLM Compression track',
          org: 'LG Aimers 8th (LG AI education program)',
        },
        {
          period: '2025.03 ~ 2026.02',
          title: 'Department supporter',
          org: 'Department of Future Vehicle Engineering, Inha University',
        },
      ],
    },
    awards: {
      eyebrow: 'Awards',
      heading: 'Awards',
      items: [
        {
          year: '2024',
          title: 'Incomthon, Grand Prize',
          org: 'Awarded by the Director of the LINK 3.0 Program',
        },
        {
          year: '2026',
          title: 'Capstone Design, Excellence Award',
          org: 'Awarded by the Dean of the College of Software Convergence, Inha University',
        },
        {
          year: '2026',
          title: 'LinkUs, Grand Prize for outstanding members',
        },
      ],
      certificationsEyebrow: 'Certifications',
      certificationsLabel: 'Certifications',
      certifications: ['OPIc IH', 'SQLD'],
      copyrightsEyebrow: 'Copyrights',
      copyrightsLabel: 'Registered software copyrights',
      copyrights: [
        { code: 'C-2026-03297', name: 'Moabom' },
        { code: 'C-2026-022267', name: 'Stable Diffusion training efficiency program based on LST' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      heading: 'Contact',
      body:
        'Open to hiring conversations and collaboration. If you want more detail on any of these projects, send me an email and I will get back to you.',
      email: 'seankim0824@gmail.com',
      github: 'https://github.com/MeDeoDuck',
    },
    detailLabels: {
      back: 'Back',
      role: 'Role',
      period: 'Period',
      stack: 'Stack',
      links: 'Links',
    },
    footer: '© 2026 Jaehyun Kim · seankim0824@gmail.com',
  },
}
