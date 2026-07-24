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

export interface Content {
  nav: {
    about: string
    capabilities: string
    projects: string
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
