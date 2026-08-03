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
  ai: [
    { name: 'PyTorch', icon: devicon('pytorch/pytorch-original') },
    { name: 'Hugging Face', icon: simple('huggingface') },
    { name: 'scikit-learn', icon: devicon('scikitlearn/scikitlearn-original') },
    { name: 'OpenCV', icon: devicon('opencv/opencv-original') },
    { name: 'NumPy', icon: devicon('numpy/numpy-original') },
    { name: 'Pandas', icon: devicon('pandas/pandas-original') },
    { name: 'LangGraph', icon: simple('langchain') },
    { name: 'LangChain', icon: simple('langchain') },
    { name: 'n8n', icon: simple('n8n') },
    { name: 'PEFT', icon: glyph('peft') },
    { name: 'Quantization', icon: glyph('quantization') },
    { name: 'Distillation', icon: glyph('distillation') },
    { name: 'MoT', icon: glyph('mot') },
    { name: 'GNN', icon: glyph('gnn') },
    { name: 'Time Series', icon: glyph('time-series') },
  ],
  backend: [
    { name: 'FastAPI', icon: devicon('fastapi/fastapi-original') },
    { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original') },
    { name: 'SQLite', icon: devicon('sqlite/sqlite-original') },
    { name: 'Azure', icon: devicon('azure/azure-original') },
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
    { name: 'GitLab', icon: devicon('gitlab/gitlab-original') },
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
        '완벽한 AI는 없다고 믿기에, 검증부터 설계합니다.\nLLM 에이전트 서비스를 설계하고 배포해 운영하며,\n비용과 일관성 문제를 직접 해결했습니다.\n신뢰할 수 있는 AI 제품을 만드는 엔지니어로 성장하며,\n문제 해결 노하우를 저만의 실무용 skill.md로 쌓아가는 것이 목표입니다.',
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
        '완벽한 AI는 없다고 믿기에, 검증부터 설계합니다.\nLLM 에이전트 서비스를 설계하고 배포해 운영하며,\n비용과 일관성 문제를 직접 해결했습니다.\n신뢰할 수 있는 AI 제품을 만드는 엔지니어로 성장하며,\n문제 해결 노하우를 저만의 실무용 skill.md로 쌓아가는 것이 목표입니다.',
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
        { label: 'AI Plugin', items: SKILLS.plugin, wide: true, tile: 128 },
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
          name: '멀티에이전트 LLM 시스템',
          desc:
            'LangGraph로 에이전트 간 흐름을 오케스트레이션합니다. 하나의 큰 프롬프트에 맡기는 대신 역할을 나눠 분업시키고, 자유 대화가 아닌 규칙 기반 흐름 제어로 결과를 예측 가능하게 만듭니다.',
        },
        {
          no: '02',
          name: '모델 경량화 · 비용 최적화',
          desc:
            '지식 증류로 큰 모델의 판단을 작은 모델에 옮기고, GPTQ와 AWQ 양자화로 모델 크기를 줄입니다. 반복 호출이 많은 구간을 로컬 모델로 전환해 API 비용을 낮춥니다.',
        },
        {
          no: '03',
          name: '백엔드 · 배포',
          desc:
            'FastAPI와 PostgreSQL로 서비스를 구성하고, Docker로 묶어 Azure Container Apps에 배포합니다. CI/CD로 배포 과정을 자동화하고 스키마 마이그레이션을 관리합니다.',
        },
        {
          no: '04',
          name: '하네스 · 가드레일 엔지니어링',
          desc:
            '모델 출력을 그대로 쓰지 않고 근거 검증 게이트를 통과시킵니다. 서로 다른 LLM으로 교차검증하고, 실패한 단계를 다시 시도해 복구하는 self-healing 파이프라인을 구현합니다.',
        },
        {
          no: '05',
          name: '컴퓨터비전 · 로보틱스',
          desc:
            '객체 검출·추적·재식별 파이프라인을 다루고, LiDAR 점군에서 지면과 장애물을 분리합니다. ROS로 인지에서 경로계획, 제어까지 하나로 연결합니다.',
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
      moreHeading: '그 외 작업',
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
          stack: ['LangGraph', 'FastAPI', 'PostgreSQL', 'Docker', 'Azure', 'GPT-4.1', 'KLUE-RoBERTa'],
          metrics: [
            { value: '98%', label: '판정 일관성 (300회 실행)' },
            { value: '99%↓', label: '추론 비용' },
          ],
          links: [{ label: '벤치마크 저장소', href: 'https://github.com/MeDeoDuck/MoabomVSAll' }],
          detail: [
            {
              heading: '문제',
              body:
                '제품 하나를 사기 전에 확인해야 할 리뷰는 채널마다 흩어져 있습니다. 영상 여러 개를 끝까지 보고 댓글까지 훑어야 판단이 서고, 채널마다 기준과 편향이 달라 어느 쪽을 믿어야 할지 판단하기 어렵습니다.\n\nMoabom은 이 과정을 자동화합니다. 제품 단위로 자막과 댓글을 모아, 어떤 근거에서 나온 판단인지 함께 제시하는 보고서를 만듭니다.',
            },
            {
              heading: '에이전트 구성',
              body:
                '영상 선정, 댓글 필터, 보고서 생성 세 개의 에이전트로 역할을 나눴습니다. 하나의 큰 프롬프트가 전부를 처리하는 대신, 각 단계가 다음 단계로 넘길 입력을 책임지는 구조입니다.\n\n에이전트 간 흐름은 LangGraph에서 규칙 기반으로 제어했습니다. 모델이 다음 행동을 자유롭게 정하지 않기 때문에 같은 입력에 대해 같은 경로를 밟고, 실패 지점을 특정할 수 있습니다.',
            },
            {
              heading: '비용 최적화',
              body:
                '댓글 분류는 호출 빈도가 가장 높은 구간이라 상용 API로 계속 처리하면 운영이 어려웠습니다. GPT-4.1로 라벨 6,375건을 만들고, 이를 교사 데이터로 KLUE-RoBERTa에 증류해 해당 구간을 로컬 모델로 전환했습니다.\n\n증류 모델의 댓글 분류 macro F1은 0.917이고, 이 전환으로 추론 비용을 99% 줄이면서 처리량은 22배로 늘렸습니다.',
            },
            {
              heading: '신뢰성',
              body:
                '리뷰 요약은 근거 없는 문장이 섞이면 바로 쓸모가 없어집니다. 서로 다른 LLM으로 교차검증하고, 원문에 없는 주장을 걸러내는 환각 방지 규칙을 넣었으며, 실패한 단계를 다시 시도해 복구하는 self-healing 구조를 붙였습니다.\n\n제품 10종 × 시스템 3종 × 반복 10회, 총 300회 실행에서 판정 일관성 98%를 측정했습니다. 같은 조건에서 GPT-4.1 단독은 90%, Gemini는 86%였습니다.',
            },
            {
              heading: '배포와 운영',
              body:
                'Docker로 묶어 Azure Container Apps에 배포하고 PostgreSQL로 데이터를 관리했습니다. v1 배포 후 사용자 13명에게 설문을 받아 개선 사항을 반영했고, 배포에서 피드백, 개선으로 이어지는 한 바퀴를 완주했습니다.\n\n약 1주의 배포·설문 기간 동안 사용자 97명이 들어왔습니다. 제품 본체 서버는 이후 종료했고, 공개 저장소는 판정 일관성 벤치마크(MoabomVSAll)로 유지합니다.',
            },
            {
              heading: '팀과 역할',
              body:
                '3인 캡스톤 프로젝트입니다. 저는 백엔드 아키텍처와 DB 설계, 댓글 필터링 에이전트, KLUE-RoBERTa 증류를 맡았습니다. 보고서 생성 파이프라인은 다른 팀원이 담당했습니다.',
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
          stack: ['React', 'TypeScript', 'FastAPI', 'WebSocket', 'GPT-4.1', 'Llama-3.3-70B (Groq)'],
          metrics: [
            { value: '390/736', label: '검증 게이트가 보류·거부한 제안 (30회 실행)' },
            { value: '5', label: '서로 다른 이론을 가진 페르소나' },
            { value: '2', label: '발언·내부 사고 분리 LLM' },
          ],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/FOMO-Breaker' }],
          detail: [
            {
              heading: '문제',
              body:
                '결론만 주는 AI는 이미 사고 싶은 사람에게 사도 된다는 근거만 더해줍니다. 판단 과정이 보이지 않으면 사용자는 확신만 얻고 검증은 건너뛰게 됩니다.\n\nFOMO Breaker는 결론 대신 과정을 보여주는 쪽을 택했습니다. 서로 다른 관점이 부딪히는 토론을 그대로 노출해, 사용자가 자기 판단의 근거를 다시 확인하도록 만듭니다.',
            },
            {
              heading: '페르소나 설계',
              body:
                '5명의 페르소나에 각각 다른 금융 이론 prior와 리스크 임계값, 시간 지평을 부여했습니다. 같은 종목, 같은 데이터를 봐도 서로 다른 결론에 도달하도록 전제를 다르게 설정한 것입니다.\n\n말투만 다른 페르소나는 결국 같은 답을 냅니다. 의견이 갈리게 하려면 판단 기준 자체가 달라야 한다고 보고, 이론적 전제 수준에서 차이를 만들었습니다.\n\n세계관은 소프트 룰로, 수치 임계는 하드 룰로 나눴습니다. 페르소나의 성격은 프롬프트가 만들고, 넘어서는 안 되는 한계선은 코드가 지키는 구조입니다.',
            },
            {
              heading: '검증 게이트',
              body:
                '페르소나는 최종 점수의 가중치를 바꾸자고 제안할 수 있지만, 제안이 곧바로 반영되지는 않습니다. 제안한 근거가 실제 신호 점수와 맞는지, 조정폭이 캡을 넘지 않는지 확인하는 게이트를 통과해야 합니다.\n\n가중치는 zero-sum으로 재분배해 총합이 유지되도록 했고, 최종 지수를 역산해 구성 요소와 일치하는지 검증합니다. 30회 실행에서 페르소나가 낸 제안 736건 중 390건(53%)이 이 게이트에서 보류되거나 거부됐습니다.',
            },
            {
              heading: '이중 LLM 구조',
              body:
                '토론에서 하는 발언과 내부 사고를 서로 다른 모델로 분리했습니다. 발언은 사용자에게 노출되는 텍스트, 내부 사고는 다음 발언과 가중치 제안을 결정하는 판단 과정입니다.\n\n둘을 분리하면 사용자에게 보여줄 문장을 다듬는 일과 판단을 내리는 일이 섞이지 않습니다. 토론 진행은 WebSocket으로 실시간 스트리밍해, 결론이 아니라 결론이 만들어지는 과정을 보게 했습니다.',
            },
            {
              heading: '범위',
              body:
                '투자 자문 서비스가 아닙니다. 매수·매도를 권하지 않고, 사용자가 이미 가진 매수 의사에 과열과 리스크 요인이 있는지 점검하는 용도로 범위를 한정했습니다.\n\n5인 팀 프로젝트이며, 저는 PM으로 팀을 이끌고 백엔드와 멀티에이전트 토론 구조·검증 게이트의 설계 및 구현을 맡았습니다.',
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
            { value: 'PR-AUC 0.789', label: 'baseline MLP(0.633) 대비 +24.7%' },
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
                'PR-AUC 0.789로, baseline인 MLP(0.633) 대비 24.7% 높았습니다. 최고 GNN baseline인 GAT(0.734) 대비로는 7.4% 높습니다.\n\n비교 대상 상위 모델들과는 통계적으로 동급 구간에 있으며, 정밀도와 재현율 사이의 균형이 상대적으로 고른 편이었습니다. 단독 1위라고 말할 수 있는 결과는 아닙니다.\n\n3인 팀 프로젝트이며, 저는 팀장으로 문제 정의·모델 설계·실험 전반을 총괄했습니다.',
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
            'DBLoss(NeurIPS 2025)에 미분 가능한 시간 지연 항을 더해, 시계열 예측에서 생기는 위상 오차를 흡수하는 손실 함수입니다.',
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
          id: 'voicestep',
          no: '06',
          category: 'Team',
          name: 'VoiceStep',
          period: '',
          role: '백엔드 · LLM 연동 (팀)',
          tagline: '음성으로 면접과 업무 대화를 연습하는 AI 서비스입니다.',
          stack: ['faster-whisper', 'Gemini', 'FastAPI', 'React'],
          metrics: [],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/VoiceStep' }],
          detail: [
            {
              heading: '개요',
              body:
                '텍스트로 답을 적어보는 것과 실제로 말해보는 것은 난이도가 다릅니다. VoiceStep은 사용자가 말로 답하면 이를 받아 적고, 대화를 이어가며 연습할 수 있게 만든 서비스입니다.\n\n음성 인식은 faster-whisper로 처리하고, 대화 생성과 피드백은 Gemini로 처리했습니다. 백엔드는 FastAPI, 프론트엔드는 React로 구성했습니다.',
            },
            {
              heading: '역할',
              body: '팀 프로젝트이며, 저는 백엔드 구성과 음성 인식·LLM 연동을 맡았습니다.',
            },
          ],
          featured: false,
        },
        {
          id: 'lg-aimers',
          no: '07',
          category: 'Program',
          name: 'LG Aimers 8th: LLM Compression',
          period: '',
          role: '참여 · 수료',
          tagline: '양자화, 프루닝, 지식 증류를 적용해 LLM을 경량화하는 실험을 진행했습니다.',
          stack: ['PyTorch', 'GPTQ', 'AWQ', 'Pruning', 'Distillation'],
          metrics: [],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/LG_Aimers_8th_Quant' }],
          detail: [
            {
              heading: '개요',
              body:
                'LG Aimers 8기 과정에서 LLM 경량화를 주제로 실험했습니다. 양자화(GPTQ, AWQ), 프루닝, 지식 증류를 적용하며 압축률과 성능 저하 사이의 관계를 확인했습니다.\n\n여기서 정리한 내용을 이후 Moabom의 로컬 모델 전환에 적용했습니다. 과정은 수료했습니다.',
            },
          ],
          featured: false,
        },
        {
          id: 'track-reid',
          no: '08',
          category: 'Personal',
          name: 'TrackWithReID',
          period: '',
          role: '개인 개발',
          tagline: '재식별 결과를 연관 비용에 융합해, 가림과 재등장 상황에서도 추적 ID를 유지합니다.',
          stack: ['YOLOX', 'ByteTrack', 'TransReID'],
          metrics: [],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/TrackWithReID' }],
          detail: [
            {
              heading: '문제와 접근',
              body:
                '위치와 겹침만으로 추적하면 대상이 가려졌다 다시 나타날 때 다른 ID가 붙습니다. 사라진 동안의 궤적을 이어붙일 근거가 없기 때문입니다.\n\nTransReID로 얻은 외형 특징을 ByteTrack의 연관 비용에 함께 넣어, 위치가 끊긴 구간에서도 외형으로 같은 대상임을 확인하도록 했습니다. 검출은 YOLOX를 사용했습니다.',
            },
          ],
          featured: false,
        },
        {
          id: 'physical-ai',
          no: '09',
          category: 'Team',
          name: 'Physical_AI_ws',
          period: '',
          role: '팀장 · 전체 총괄 (팀)',
          tagline: 'CCTV 인지에서 A* 경로계획, Pure Pursuit 제어까지 ROS로 통합한 물류 로봇 파이프라인입니다.',
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
          featured: false,
        },
        {
          id: 'lidar-cone',
          no: '10',
          category: 'Team',
          name: 'Lider_Cone_Path',
          period: '',
          role: '알고리즘 구현 (팀)',
          tagline: 'LiDAR 점군에서 지면 분리, 콘 인식, 중앙선 회귀, 경로계획까지 C++로 직접 구현했습니다.',
          stack: ['C++', 'LiDAR', 'Point Cloud', 'Clustering'],
          metrics: [],
          links: [{ label: '저장소', href: 'https://github.com/MeDeoDuck/Lider_Cone_Path' }],
          detail: [
            {
              heading: '개요',
              body:
                '라이브러리에 맡기지 않고 파이프라인 전체를 C++로 구현했습니다. 점군에서 지면을 분리하고, 남은 점을 클러스터링해 콘을 인식하고, 양쪽 콘 사이의 중앙선을 회귀로 구한 뒤 주행 경로를 만듭니다.\n\n직접 구현하면서 각 단계의 파라미터가 다음 단계에 어떻게 전파되는지, 어디서 오차가 누적되는지를 확인할 수 있었습니다. 팀 프로젝트입니다.',
            },
          ],
          featured: false,
        },
        {
          id: 'ssvep-bci',
          no: '11',
          category: 'Coursework',
          name: 'SSVEP BCI 신호 분석',
          period: '2025.11',
          role: '신호 전처리 직접 구현 (팀 3인)',
          tagline:
            '외부 라이브러리 없이 FFT와 필터를 직접 구현해 EEG(SSVEP) 뇌파를 전처리하고, 사용자가 응시한 자극 주파수를 분류한 신호처리 과제입니다.',
          stack: ['Python', 'FFT · IFFT', 'Bandpass · Notch', 'CSP', 'SVM'],
          metrics: [
            { value: '83.3%', label: '습식 EEG 정확도' },
            { value: '37.0%', label: '건식 EEG 정확도' },
          ],
          links: [],
          detail: [
            {
              heading: '문제',
              body:
                'SSVEP는 특정 주파수로 깜빡이는 자극을 응시할 때 시각 피질에서 같은 주파수 성분이 증폭되는 현상입니다. 이 성분을 분류하면 사용자가 무엇을 보고 있는지 알 수 있지만, 원신호에는 전원 노이즈와 잡음이 섞여 있어 전처리가 성능을 좌우합니다.\n\n과제 조건은 신호처리 라이브러리를 쓰지 않고 이론만으로 전처리 파이프라인을 직접 구현하는 것이었습니다.',
            },
            {
              heading: '접근',
              body:
                'FFT는 주기성과 대칭성을 이용해 짝수·홀수 항으로 나눠 O(N log N)으로 직접 구현하고, zero-padding으로 길이를 2의 거듭제곱에 맞췄습니다. 필터는 EEG 대역(6–45Hz)만 남기는 Bandpass, 60Hz 전원 노이즈와 고조파를 제거하는 Notch, 이동평균 스무딩, 기준선 보정을 순서대로 적용했습니다.\n\n성능이 기대만큼 나오지 않아, Bandpass·Notch가 이미 잡음을 제거한 상태라는 가설을 세우고 Hanning 윈도우를 제거하자 성능이 크게 올랐습니다.',
            },
            {
              heading: '결과',
              body:
                '습식(Wet) EEG는 정확도 83.3%, 건식(Dry)은 37.0%로, 장비에 따른 신호 품질 차이를 실험으로 확인했습니다.\n\n팀 3인 과제이며, 핵심 성과는 라이브러리 없이 전처리를 직접 구현한 점과 장비별 성능 차를 검증한 점입니다.',
            },
          ],
          featured: false,
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
        'I believe no AI is perfect, so I start from verification.\nI design, ship, and operate LLM agent services,\nand I have solved their cost and consistency problems myself.\nI am growing into an engineer who builds trustworthy AI products,\nand my goal is to distill each problem I solve into my own practical skill.md library.',
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
        'I believe no AI is perfect, so I start from verification.\nI design, ship, and operate LLM agent services,\nand I have solved their cost and consistency problems myself.\nI am growing into an engineer who builds trustworthy AI products,\nand my goal is to distill each problem I solve into my own practical skill.md library.',
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
        { label: 'AI Plugin', items: SKILLS.plugin, wide: true, tile: 128 },
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
          name: 'Multi-agent LLM systems',
          desc:
            'I orchestrate flow between agents with LangGraph. Instead of handing everything to one large prompt, I split the work by role and control the flow with explicit rules rather than free-form conversation, so the output stays predictable.',
        },
        {
          no: '02',
          name: 'Model compression and cost optimization',
          desc:
            'I move a large model judgment into a small one through knowledge distillation, and shrink models with GPTQ and AWQ quantization. Where calls repeat at high volume, I switch to a local model to cut API cost.',
        },
        {
          no: '03',
          name: 'Backend and deployment',
          desc:
            'I build services with FastAPI and PostgreSQL, package them with Docker, and deploy to Azure Container Apps. I automate the release path with CI/CD and manage schema migrations.',
        },
        {
          no: '04',
          name: 'Harness and guardrail engineering',
          desc:
            'I never use model output as is. It passes an evidence gate first. I cross-check with a second LLM and build self-healing pipelines that retry and recover from a failed step.',
        },
        {
          no: '05',
          name: 'Computer vision and robotics',
          desc:
            'I work on detection, tracking, and re-identification pipelines, and separate ground from obstacles in LiDAR point clouds. With ROS I connect perception, planning, and control into one pipeline.',
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
      moreHeading: 'Other Work',
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
          stack: ['LangGraph', 'FastAPI', 'PostgreSQL', 'Docker', 'Azure', 'GPT-4.1', 'KLUE-RoBERTa'],
          metrics: [
            { value: '98%', label: 'Verdict consistency over 300 runs' },
            { value: '99%↓', label: 'Inference cost' },
          ],
          links: [{ label: 'Benchmark repo', href: 'https://github.com/MeDeoDuck/MoabomVSAll' }],
          detail: [
            {
              heading: 'Problem',
              body:
                'Reviews for a single product are scattered across channels. You have to watch several videos end to end and scan the comments before you can decide, and each channel carries its own criteria and bias, so it is unclear which one to trust.\n\nMoabom automates that pass. It gathers transcripts and comments per product and produces a report that states what evidence each judgment came from.',
            },
            {
              heading: 'Agent design',
              body:
                'The work is split across three agents: video selection, comment filtering, and report generation. Rather than one large prompt handling everything, each stage owns the input it hands to the next.\n\nFlow between agents is controlled by explicit rules in LangGraph. Because the model does not choose its next action freely, the same input follows the same path and a failure can be traced to a specific stage.',
            },
            {
              heading: 'Cost optimization',
              body:
                'Comment classification was the highest volume call in the pipeline, and running it on a commercial API was not sustainable. I generated 6,375 labels with GPT-4.1, distilled them into KLUE-RoBERTa, and moved that stage to a local model.\n\nThe distilled model reached macro F1 0.917 on comment classification. The switch cut inference cost by 99% and raised throughput by 22 times.',
            },
            {
              heading: 'Reliability',
              body:
                'A review summary loses its value the moment an unsupported sentence slips in. I cross-checked with a second LLM, added rules that filter claims absent from the source text, and built a self-healing path that retries a failed stage.\n\nAcross 10 products by 3 systems by 10 repetitions, 300 runs in total, verdict consistency measured 98%. Under the same conditions GPT-4.1 alone reached 90% and Gemini 86%.',
            },
            {
              heading: 'Deployment and operation',
              body:
                'The service runs in Docker on Azure Container Apps with PostgreSQL behind it. After the v1 release I collected a survey from 13 users and shipped the changes it pointed to, closing one full loop from release to feedback to improvement.\n\nAbout 97 users came in during the roughly one-week deployment and survey window. The product server has since been taken down; the public repository stays as the verdict-consistency benchmark (MoabomVSAll).',
            },
            {
              heading: 'Team and role',
              body:
                'A capstone project with a team of 3. I owned the backend architecture, DB design, the comment filtering agent, and the KLUE-RoBERTa distillation. The report generation pipeline was owned by another teammate.',
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
          stack: ['React', 'TypeScript', 'FastAPI', 'WebSocket', 'GPT-4.1', 'Llama-3.3-70B (Groq)'],
          metrics: [
            { value: '390/736', label: 'Proposals held or rejected at the gate, 30 runs' },
            { value: '5', label: 'Personas with distinct theory priors' },
            { value: '2', label: 'LLMs splitting speech from internal reasoning' },
          ],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/FOMO-Breaker' }],
          detail: [
            {
              heading: 'Problem',
              body:
                'An AI that returns only a conclusion hands someone who already wants to buy one more reason to buy. When the reasoning stays hidden, the user gains confidence and skips the check.\n\nFOMO Breaker shows the process instead of the verdict. It exposes a debate where different views collide, so the user has to revisit the grounds for their own decision.',
            },
            {
              heading: 'Persona design',
              body:
                'Each of the five personas carries a different financial theory prior, risk threshold, and time horizon. Given the same ticker and the same data, they are set up to reach different conclusions.\n\nPersonas that differ only in tone end up agreeing. To make opinions actually diverge, the judging criteria themselves have to differ, so the differences were built in at the level of theoretical priors.\n\nEach worldview is enforced as soft rules while numeric thresholds are hard rules: the persona\'s character lives in the prompt, and the limits it must not cross live in code.',
            },
            {
              heading: 'Verification gate',
              body:
                'A persona may propose a change to the weights behind the final score, but the proposal is not applied on the spot. It has to pass a gate that checks whether the stated grounds match the actual signal scores and whether the adjustment stays under a cap.\n\nWeights are redistributed zero-sum so the total is preserved, and the final index is recomputed backward to confirm it matches its components. Across 30 runs, 390 of the 736 persona proposals (53%) were held or rejected at this gate.',
            },
            {
              heading: 'Dual LLM structure',
              body:
                'What a persona says in the debate and what it reasons internally run on separate models. Speech is the text the user sees; internal reasoning decides the next statement and any weight proposal.\n\nKeeping them apart means polishing a sentence for the user does not get mixed with making a judgment. The debate streams over WebSocket in real time, so the user watches the conclusion being formed rather than receiving it.',
            },
            {
              heading: 'Scope',
              body:
                'This is not investment advice. It does not recommend buying or selling. The scope is limited to checking a purchase intent the user already holds for signs of overheating and risk.\n\nA team project with 5 members. As PM I led the team and owned the backend and the design and implementation of the multi-agent debate structure and the verification gate.',
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
            { value: 'PR-AUC 0.789', label: '+24.7% over the baseline MLP at 0.633' },
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
                'PR-AUC reached 0.789, 24.7% above the baseline MLP at 0.633, and 7.4% above the strongest GNN baseline, a GAT at 0.734.\n\nAgainst the strongest comparison models the result sits within a statistically comparable band, with a relatively even balance between precision and recall. It is not a result I would describe as a clear first place.\n\nA team project with 3 members. As team lead I owned the problem definition, model design, and experiments end to end.',
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
            'A loss function that adds a differentiable time-shift term to DBLoss (NeurIPS 2025) to absorb phase error in time series forecasting.',
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
          id: 'voicestep',
          no: '06',
          category: 'Team',
          name: 'VoiceStep',
          period: '',
          role: 'Backend and LLM integration (team)',
          tagline: 'An AI service for practicing interviews and work conversations by voice.',
          stack: ['faster-whisper', 'Gemini', 'FastAPI', 'React'],
          metrics: [],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/VoiceStep' }],
          detail: [
            {
              heading: 'Overview',
              body:
                'Writing an answer down and saying it out loud are different levels of difficulty. VoiceStep transcribes what the user says and keeps the conversation going so they can practice under the harder condition.\n\nSpeech recognition runs on faster-whisper, and dialogue and feedback run on Gemini. The backend is FastAPI and the frontend is React.',
            },
            {
              heading: 'Role',
              body: 'A team project. I owned the backend and the speech recognition and LLM integration.',
            },
          ],
          featured: false,
        },
        {
          id: 'lg-aimers',
          no: '07',
          category: 'Program',
          name: 'LG Aimers 8th: LLM Compression',
          period: '',
          role: 'Participant, completed',
          tagline: 'Experiments in compressing LLMs with quantization, pruning, and knowledge distillation.',
          stack: ['PyTorch', 'GPTQ', 'AWQ', 'Pruning', 'Distillation'],
          metrics: [],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/LG_Aimers_8th_Quant' }],
          detail: [
            {
              heading: 'Overview',
              body:
                'I worked on LLM compression during the 8th LG Aimers program, applying quantization (GPTQ, AWQ), pruning, and knowledge distillation to see how compression ratio trades against degradation.\n\nWhat I took from it was later applied to the local model switch in Moabom. I completed the program.',
            },
          ],
          featured: false,
        },
        {
          id: 'track-reid',
          no: '08',
          category: 'Personal',
          name: 'TrackWithReID',
          period: '',
          role: 'Personal project',
          tagline:
            'Fuses re-identification into the association cost so a track keeps its ID through occlusion and reappearance.',
          stack: ['YOLOX', 'ByteTrack', 'TransReID'],
          metrics: [],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/TrackWithReID' }],
          detail: [
            {
              heading: 'Problem and approach',
              body:
                'Tracking on position and overlap alone assigns a new ID whenever a target is occluded and comes back, because nothing connects the trajectory across the gap.\n\nAppearance features from TransReID were folded into the ByteTrack association cost, so identity can be confirmed by appearance where position breaks. Detection runs on YOLOX.',
            },
          ],
          featured: false,
        },
        {
          id: 'physical-ai',
          no: '09',
          category: 'Team',
          name: 'Physical_AI_ws',
          period: '',
          role: 'Team lead, overall ownership (team)',
          tagline:
            'A logistics robot pipeline built in ROS, running from CCTV perception through A* path planning to Pure Pursuit control.',
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
          featured: false,
        },
        {
          id: 'lidar-cone',
          no: '10',
          category: 'Team',
          name: 'Lider_Cone_Path',
          period: '',
          role: 'Algorithm implementation (team)',
          tagline:
            'Ground separation, cone detection, centerline regression, and path planning from LiDAR point clouds, written from scratch in C++.',
          stack: ['C++', 'LiDAR', 'Point Cloud', 'Clustering'],
          metrics: [],
          links: [{ label: 'Repository', href: 'https://github.com/MeDeoDuck/Lider_Cone_Path' }],
          detail: [
            {
              heading: 'Overview',
              body:
                'The whole pipeline was implemented in C++ rather than delegated to a library. Ground points are separated from the cloud, the remainder is clustered into cones, a centerline is regressed between the two cone rows, and a driving path is generated from it.\n\nWriting it directly made it visible how each stage parameter propagates into the next and where error accumulates. A team project.',
            },
          ],
          featured: false,
        },
        {
          id: 'ssvep-bci',
          no: '11',
          category: 'Coursework',
          name: 'SSVEP BCI signal analysis',
          period: '2025.11',
          role: 'Signal preprocessing from scratch (team of 3)',
          tagline:
            'A signal-processing assignment that implements FFT and filters from scratch, with no library, to preprocess EEG (SSVEP) and classify the stimulus frequency the user was looking at.',
          stack: ['Python', 'FFT · IFFT', 'Bandpass · Notch', 'CSP', 'SVM'],
          metrics: [
            { value: '83.3%', label: 'Wet EEG accuracy' },
            { value: '37.0%', label: 'Dry EEG accuracy' },
          ],
          links: [],
          detail: [
            {
              heading: 'Problem',
              body:
                'SSVEP is the effect where staring at a stimulus flickering at a given frequency amplifies the same frequency component in the visual cortex. Classifying that component tells you what the user is looking at, but the raw signal carries mains noise and interference, so preprocessing decides the outcome.\n\nThe assignment required building the preprocessing pipeline from theory alone, without any signal-processing library.',
            },
            {
              heading: 'Approach',
              body:
                'FFT was implemented directly at O(N log N) by splitting into even and odd terms, with zero-padding to a power of two. Filters were applied in order: a bandpass keeping the EEG band (6–45Hz), a notch removing 60Hz mains noise and its harmonics, moving-average smoothing, and baseline correction.\n\nWhen accuracy fell short, I hypothesized the bandpass and notch had already removed the noise, and removing the Hanning window raised performance sharply.',
            },
            {
              heading: 'Result',
              body:
                'Wet EEG reached 83.3% accuracy and dry EEG 37.0%, confirming experimentally how much the equipment changes signal quality.\n\nA team assignment of 3. The core outcome was implementing the preprocessing from scratch and verifying the gap between equipment types.',
            },
          ],
          featured: false,
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
