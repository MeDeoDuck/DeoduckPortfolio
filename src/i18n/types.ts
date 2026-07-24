export type Lang = 'ko' | 'en'

export interface Metric {
  /** 숫자 위주 값. 예: "MAU 97", "98%", "99%↓" */
  value: string
  /** 짧은 설명 라벨 */
  label: string
}

export interface Capability {
  /** "01" ~ "05" */
  no: string
  name: string
  desc: string
}

export interface ProjectLink {
  label: string
  href: string
}

export interface DetailBlock {
  heading: string
  /** 문단. 줄바꿈은 \n\n 으로 구분 */
  body: string
}

export interface Project {
  /** 라우트 슬러그. 예: "moabom" */
  id: string
  /** "01" 형태 */
  no: string
  /** 예: "Team · Capstone", "Personal", "Research" */
  category: string
  name: string
  /** 예: "2026.03 ~ 2026.06" */
  period: string
  /** 본인 역할 */
  role: string
  /** 카드에 들어갈 한 줄 */
  tagline: string
  stack: string[]
  /** 카드·상세 상단에 크게 박히는 지표 (없으면 빈 배열) */
  metrics: Metric[]
  links: ProjectLink[]
  /** 상세 페이지 본문 */
  detail: DetailBlock[]
  /** 대표 3개만 true — 스티키 스택 카드에 노출 */
  featured: boolean
}

export interface TimelineItem {
  /** 예: "2026.07 ~ 현재". 자료 없으면 빈 문자열 */
  period: string
  /** 직함·역할. 예: "일학습병행 인턴" */
  title: string
  /** 소속. 예: "웨이버스 (공간정보·GeoAI 플랫폼)" */
  org: string
  /** 한 줄 보충 설명. 없으면 생략 */
  note?: string
  /** 하위 항목(연구실 3곳 등). 없으면 생략 */
  children?: Array<{ label: string; period: string }>
}

export interface AwardItem {
  /** 예: "2026" */
  year: string
  title: string
  /** 시상 주체. 없으면 생략 */
  org?: string
}

export interface Content {
  nav: {
    about: string
    capabilities: string
    projects: string
    experience: string
    awards: string
    contact: string
  }
  hero: {
    greeting: string
    name: string
    tagline: string
    metrics: Metric[]
    cta: string
  }
  about: {
    heading: string
    /** 스크롤 문자 애니메이션에 쓰이는 본문 (한 문단) */
    body: string
  }
  capabilities: {
    heading: string
    items: Capability[]
  }
  projects: {
    heading: string
    moreHeading: string
    viewDetail: string
    liveLabel: string
    items: Project[]
  }
  /** 경력·학력·활동. 수상과는 분리한다. */
  experience: {
    heading: string
    items: TimelineItem[]
  }
  /** 수상·자격·저작권. 경력과는 분리한다. */
  awards: {
    heading: string
    items: AwardItem[]
    certificationsLabel: string
    certifications: string[]
    copyrightsLabel: string
    copyrights: string[]
  }
  contact: {
    heading: string
    body: string
    email: string
    github: string
  }
  detailLabels: {
    back: string
    role: string
    period: string
    stack: string
    links: string
  }
  footer: string
}
