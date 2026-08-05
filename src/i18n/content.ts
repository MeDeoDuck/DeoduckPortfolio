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
      moreHeading: '그 외 경험',
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
                '입력 — 사용자 입력 → 데이터 불러오기 → 6개 지표 생성 → FOMO 점수 선형 계산 → 페르소나 input JSON 생성 → 각 Agent에 전달.\n\n토론 — Round 1 → Round 2(2~10회 반복) → Round 3 → 토론 보고서. 가중치 제안은 Weight Validator를 거쳐 Final Merge로 합쳐집니다.\n\n환각 게이트 — 페르소나별 응답에 환각이 없도록 하네스 엔지니어링을 수행합니다. 제안된 근거가 실제 신호 점수와 맞는지, 조정폭이 캡을 넘지 않는지 확인하고, 가중치는 zero-sum으로 재분배해 총합을 유지하며 최종 지수를 역산해 구성 요소와 일치하는지 검증합니다.',
              images: [
                { seed: 'fomo-p-input-flow', label: '입력 데이터 플로우차트' },
                { seed: 'fomo-p-debate-flow', label: '토론 플로우차트' },
                { seed: 'fomo-p-gate-flow', label: '환각 게이트 플로우차트' },
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
                '단일 모델과 비교해 출처 추적(Evidence), 환각 게이트(숫자 대조), 페르소나 합의·이견 표기, 신뢰도 Coverage 표기, Degraded(품질 저하) 배너, 조기 종료 라운드 관측을 모두 갖춘 것은 FOMO Breaker뿐입니다.\n\n판정 일관성 96.7%(30건 중 29건 일치), 환각 게이트 작동률 39.9%(736건 중 294건). 같은 종목 세트에서 주의 판정을 낸 종목 수는 FOMO Breaker 6개, GPT-4.1 1개, Gemini 2.5 1개였습니다.\n\n과열·FOMO 경고 도구에서는 실제 과열을 안전이라 놓치는 것(false negative)이 잘못된 경보보다 치명적입니다. 우리가 더 정확하다가 아니라, 경고 도구로서 이런 방향을 택했다는 설계 선택입니다.',
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
          role: '팀장 · 전체 총괄 (팀 3인)',
          tagline: '리뷰를 6개 관계 그래프로 모델링해 조직적 가짜 리뷰를 탐지하는 멀티관계 GNN입니다.',
          stack: ['PyTorch Geometric', 'GAT', 'GCN', 'GraphSAGE', 'Sentence-BERT', 'LightGBM'],
          metrics: [
            { value: 'PR-AUC 0.789', label: '이상 비율 ~25% 샘플링 데이터셋 · 5 seeds' },
            { value: '6', label: '관계 그래프' },
          ],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/CAGE-CareRF' }],
          detail: [
            {
              heading: '가설',
              body:
                '가짜 리뷰를 리뷰 한 건씩 따로 보면 진짜와 구분되는 특징이 뚜렷하지 않습니다. 문장만 놓고 보면 잘 쓴 리뷰와 잘 만든 가짜 리뷰가 비슷하기 때문입니다.\n\n대신 가짜 리뷰는 개별이 아니라 조직적으로 움직인다는 가설을 세웠습니다. 같은 시기에, 같은 대상에, 비슷한 패턴으로 몰리는 관계 구조를 보면 개별 텍스트에서 보이지 않던 신호가 드러납니다.',
            },
            {
              heading: '그래프 구성',
              body:
                '리뷰 사이의 관계를 6가지로 나눠 각각 별도의 그래프로 만들었습니다. 하나의 그래프에 모든 관계를 섞으면 강한 관계가 약한 관계를 덮어버리기 때문입니다.\n\n관계별로 GNN을 학습시킨 뒤 게이트로 융합해, 어떤 관계를 얼마나 반영할지 모델이 학습하도록 했습니다. 텍스트 표현은 Sentence-BERT로 얻고, 그래프 임베딩과 함께 LightGBM 스태킹 앙상블에 넣어 최종 판정을 만들었습니다.',
            },
            {
              heading: '결과',
              body:
                'fraud 비율을 약 25%로 끌어올린 cascade 샘플링 데이터셋(5 seeds)에서 PR-AUC 0.789를 기록했습니다. 같은 조건의 MLP(0.633), 최고 GNN baseline GAT(0.734)보다 높은 수치입니다. 초기의 11.16% 불균형 데이터셋에서는 PR-AUC 0.44대였습니다 — 샘플링 재구성 후 전 모델이 오른 조건에서의 비교입니다.\n\n비교 대상 상위 모델들과는 통계적으로 동급 구간에 있으며, 정밀도와 재현율 사이의 균형이 상대적으로 고른 편이었습니다. 단독 1위라고 말할 수 있는 결과는 아닙니다.\n\n3인 팀 프로젝트이며, 저는 팀장으로 문제 정의·모델 설계·실험 전반을 총괄했습니다.',
            },
          ],
          featured: true,
        },
        {
          id: 'shiftloss',
          no: '05',
          category: 'Research',
          name: 'ShiftLoss',
          period: '2026',
          role: '손실 함수 설계 · 실험',
          tagline:
            'DBLoss(NeurIPS 2025)에 미분 가능한 시간 지연 항을 추가해, 시계열 예측의 위상 오차를 분석한 논문을 작성했습니다(심사 중).',
          stack: ['PyTorch', 'PatchTST', 'DLinear', 'iTransformer', 'Amplifier'],
          metrics: [],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/ShiftLoss' }],
          detail: [
            {
              heading: '문제',
              body:
                '시계열 예측 모델은 모양은 맞게 예측하면서 시점이 조금 밀리는 경우가 있습니다. 사람이 보기에는 잘 맞춘 예측이지만, 시점 단위로 오차를 재는 손실 함수는 이를 크게 틀린 것으로 계산합니다.\n\n그 결과 모델은 위상을 맞추는 대신 진폭을 줄여 평균에 가깝게 예측하는 쪽으로 학습됩니다.',
            },
            {
              heading: '접근',
              body:
                'DBLoss에 미분 가능한 시간 지연 항을 추가해, 예측이 시간축으로 얼마나 밀렸는지를 학습 과정에서 함께 최적화하도록 했습니다. 미분 가능하게 구성했기 때문에 별도의 후처리 없이 기존 학습 루프에 그대로 붙습니다.\n\nPatchTST, DLinear, iTransformer, Amplifier 등 구조가 다른 예측 모델에 각각 적용해 손실 함수 단위의 교체가 가능한지 확인했습니다.',
            },
            {
              heading: '현재 상태',
              body:
                '논문 심사 중입니다. 벤치마크 수치는 심사 결과가 나온 뒤 공개할 예정이라 여기에는 적지 않았습니다.',
            },
          ],
          featured: true,
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
          stack: ['PyTorch', 'Latent Diffusion', 'Ladder Side Tuning'],
          metrics: [
            { value: '29%↓', label: 'GPU 메모리' },
            { value: '52%↓', label: '학습 시간' },
          ],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/StableDiffusionWithLST' }],
          detail: [
            {
              heading: '접근',
              body:
                'Latent Diffusion 백본의 파라미터를 모두 동결하고, 옆에 붙인 경량 사이드 네트워크만 학습하는 Ladder Side Tuning 구조를 적용했습니다. 백본으로 흐르는 역전파를 끊으면 중간 활성값을 보관할 필요가 줄어 메모리 사용량이 내려갑니다.',
            },
            {
              heading: '측정',
              body:
                'LSUN Churches 데이터셋, 192×192 해상도, TITAN RTX 환경에서 측정했습니다. GPU 메모리 사용량은 23,115 MiB에서 16,509 MiB로 약 29% 줄었고, 학습 시간은 1시간 7분에서 32분으로 약 52% 줄었습니다.\n\n학습 효율에 대한 결과이며, 생성 품질 자체가 기존 파인튜닝 기법보다 좋아졌다는 뜻은 아닙니다.',
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
          no: '06',
          category: 'Team',
          name: 'Physical_AI_ws',
          period: '',
          role: '팀장 · 전체 총괄 (팀)',
          tagline: 'CCTV 인지부터 A* 경로계획, Pure Pursuit 제어까지 물류 로봇 파이프라인을 ROS로 통합해본 경험이 있습니다.',
          stack: ['ROS', 'OpenCV', 'A*', 'Pure Pursuit', 'TurtleBot4'],
          metrics: [],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/Physical_AI_ws' }],
          detail: [
            {
              heading: '개요',
              body:
                '물류 창고 시나리오를 가정해, 천장 CCTV로 공간과 대상을 인지하고 A*로 경로를 계획한 뒤 Pure Pursuit으로 주행을 제어하는 파이프라인을 ROS에서 하나로 연결했습니다.\n\n인지, 계획, 제어를 각각 만드는 것보다 세 단계를 하나의 노드 그래프로 이어 붙이는 과정에서 좌표계와 타이밍 문제가 주로 발생했고, 그 부분을 맞추는 데 시간을 썼습니다. 저는 팀장으로 인지·판단·제어 통합 전반을 총괄했습니다.',
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
      moreHeading: 'Other Experience',
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
                'Input — user input, data loading, six indicators, a linear FOMO score, persona input JSON, delivery to each agent.\n\nDebate — Round 1, then Round 2 repeated 2 to 10 times, then Round 3 and the debate report. Weight proposals pass a Weight Validator and are combined in a Final Merge.\n\nHallucination gate — harness engineering keeps every persona response free of hallucination. It checks whether stated grounds match the actual signal scores and whether adjustments stay under a cap; weights are redistributed zero-sum to preserve the total, and the final index is recomputed backward to confirm it matches its components.',
              images: [
                { seed: 'fomo-p-input-flow', label: 'Input data flowchart' },
                { seed: 'fomo-p-debate-flow', label: 'Debate flowchart' },
                { seed: 'fomo-p-gate-flow', label: 'Hallucination gate flowchart' },
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
                'Compared with single models, only FOMO Breaker carries all of: evidence tracing, a hallucination gate with number cross-checks, consensus and dissent labels per persona, coverage-based confidence labels, degraded-quality banners, and early-stop round observation.\n\nVerdict consistency 96.7% (29 of 30 matched); hallucination-gate trigger rate 39.9% (294 of 736). On the same ticker set, FOMO Breaker flagged 6 tickers as caution versus 1 for GPT-4.1 and 1 for Gemini 2.5.\n\nFor an overheat warning tool, missing real overheat (a false negative) is deadlier than a false alarm. The claim is not that we are more accurate — it is a design choice about which direction a warning tool should err.',
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
          role: 'Team lead, overall ownership (team of 3)',
          tagline:
            'A multi-relational GNN that models reviews as six relation graphs to detect coordinated fake reviews.',
          stack: ['PyTorch Geometric', 'GAT', 'GCN', 'GraphSAGE', 'Sentence-BERT', 'LightGBM'],
          metrics: [
            { value: 'PR-AUC 0.789', label: 'Sampled set with ~25% fraud ratio · 5 seeds' },
            { value: '6', label: 'Relation graphs' },
          ],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/CAGE-CareRF' }],
          detail: [
            {
              heading: 'Hypothesis',
              body:
                'Looked at one review at a time, fake reviews do not carry a clear signature. On text alone, a well written genuine review and a well made fake one look much the same.\n\nThe hypothesis was that fake reviews move as a group rather than individually. Once you look at the relational structure, who posts when, about what, in what pattern, signals appear that are invisible in any single piece of text.',
            },
            {
              heading: 'Graph construction',
              body:
                'Relations between reviews were split into six types, each built as its own graph. Mixing every relation into one graph lets the strong relations bury the weak ones.\n\nA GNN was trained per relation and the outputs fused through a gate, so the model learns how much weight each relation deserves. Text representations came from Sentence-BERT and were combined with the graph embeddings in a LightGBM stacking ensemble for the final decision.',
            },
            {
              heading: 'Results',
              body:
                'On a cascade-sampled dataset with the fraud ratio raised to about 25% (5 seeds), PR-AUC reached 0.789 — above an MLP at 0.633 and the strongest GNN baseline, a GAT at 0.734, under the same conditions. On the original 11.16% imbalanced set, PR-AUC was in the 0.44 range; the comparison holds after the sampling redesign lifted every model.\n\nAgainst the strongest comparison models the result sits within a statistically comparable band, with a relatively even balance between precision and recall. It is not a result I would describe as a clear first place.\n\nA team project with 3 members. As team lead I owned the problem definition, model design, and experiments end to end.',
            },
          ],
          featured: true,
        },
        {
          id: 'shiftloss',
          no: '05',
          category: 'Research',
          name: 'ShiftLoss',
          period: '2026',
          role: 'Loss function design and experiments',
          tagline:
            'Wrote an analysis paper adding a differentiable time-shift term to DBLoss (NeurIPS 2025) for phase error in forecasting (under review).',
          stack: ['PyTorch', 'PatchTST', 'DLinear', 'iTransformer', 'Amplifier'],
          metrics: [],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/ShiftLoss' }],
          detail: [
            {
              heading: 'Problem',
              body:
                'Forecasting models often get the shape right while the timing slips by a few steps. To a human reader that is a good forecast, but a pointwise loss scores it as badly wrong.\n\nThe model then learns to avoid the penalty by shrinking amplitude and predicting closer to the mean instead of fixing the phase.',
            },
            {
              heading: 'Approach',
              body:
                'A differentiable time-shift term was added to DBLoss so that how far a prediction has slipped along the time axis is optimized during training. Because the term is differentiable, it drops into an existing training loop without extra post-processing.\n\nIt was applied to PatchTST, DLinear, iTransformer, and Amplifier to check whether it works as a drop-in replacement across architectures.',
            },
            {
              heading: 'Status',
              body:
                'The paper is under review. Benchmark numbers will be published after the review concludes, so none are listed here.',
            },
          ],
          featured: true,
        },
        {
          id: 'stablediffusion-lst',
          no: '04',
          category: 'Personal · Research',
          name: 'StableDiffusion + LST',
          period: '2025',
          role: 'Personal research and implementation (registered software copyright)',
          tagline:
            'A Ladder Side Tuning module attached to Latent Diffusion, freezing the backbone and training only a lightweight side network.',
          stack: ['PyTorch', 'Latent Diffusion', 'Ladder Side Tuning'],
          metrics: [
            { value: '29%↓', label: 'GPU memory' },
            { value: '52%↓', label: 'Training time' },
          ],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/StableDiffusionWithLST' }],
          detail: [
            {
              heading: 'Approach',
              body:
                'Every parameter of the Latent Diffusion backbone is frozen and only a lightweight side network alongside it is trained, following Ladder Side Tuning. Cutting backpropagation through the backbone removes most of the intermediate activations that would otherwise be kept in memory.',
            },
            {
              heading: 'Measurements',
              body:
                'Measured on LSUN Churches at 192 by 192 resolution on a TITAN RTX. GPU memory use went from 23,115 MiB to 16,509 MiB, about 29% lower, and training time went from 1 hour 7 minutes to 32 minutes, about 52% lower.\n\nThese are training efficiency results. They do not mean generation quality improved over existing fine-tuning methods.',
            },
            {
              heading: 'Availability',
              body:
                'The work is registered as a software copyright and the source is not public. Only the structure and the measurements are shared.',
            },
          ],
          featured: true,
        },
        {
          id: 'physical-ai',
          no: '06',
          category: 'Team',
          name: 'Physical_AI_ws',
          period: '',
          role: 'Team lead, overall ownership (team)',
          tagline:
            'Experience integrating a logistics robot pipeline in ROS, from CCTV perception through A* planning to Pure Pursuit control.',
          stack: ['ROS', 'OpenCV', 'A*', 'Pure Pursuit', 'TurtleBot4'],
          metrics: [],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/Physical_AI_ws' }],
          detail: [
            {
              heading: 'Overview',
              body:
                'Assuming a warehouse scenario, an overhead CCTV feed handles perception of the space and its targets, A* plans the route, and Pure Pursuit drives the robot, all wired together as one pipeline in ROS.\n\nBuilding perception, planning, and control separately was the easier part. Most of the effort went into joining the three into a single node graph, where coordinate frames and timing caused the real problems. As team lead I owned the perception-planning-control integration end to end.',
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
