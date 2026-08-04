import Navbar from '../components/Navbar'
import ScrollDepth from '../components/ScrollDepth'
import HelloSection from '../sections/HelloSection'
import SkillsSection from '../sections/SkillsSection'
import MarqueeSection from '../sections/MarqueeSection'
import CapabilitiesSection from '../sections/CapabilitiesSection'
import ProjectsSection from '../sections/ProjectsSection'
import ExperienceSection from '../sections/ExperienceSection'
import ActivitiesSection from '../sections/ActivitiesSection'
import AwardsSection from '../sections/AwardsSection'
import CredentialsSection from '../sections/CredentialsSection'
import ContactSection from '../sections/ContactSection'

/**
 * 인사가 첫 화면이다.
 *
 * 섹션마다 깊이를 다르게 줘서 화면을 내리는 동안 서로 다른 속도로 따라오게 했다.
 * 값이 같으면 아무 일도 일어나지 않는다 — 차이가 곧 움직임이다.
 * 첫 화면(인사)은 건드리지 않는다. 처음 보는 화면이 흔들리면 불안해 보인다.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-paper" style={{ overflowX: 'clip' }}>
        {/* 읽는 흐름: 누구다 → 뭘 할 수 있다 → 증거 → 실무 → 증빙 → 참조 → 연락 */}
        <HelloSection />

        <ScrollDepth depth={0.4}>
          <MarqueeSection />
        </ScrollDepth>

        <ScrollDepth depth={0.7} tilt={1.5}>
          <CapabilitiesSection />
        </ScrollDepth>

        <ProjectsSection />

        <ScrollDepth depth={0.6} tilt={1.5}>
          <ExperienceSection />
        </ScrollDepth>

        <ScrollDepth depth={1.1} tilt={1.5}>
          <AwardsSection />
        </ScrollDepth>

        <ScrollDepth depth={0.5} tilt={1.5}>
          <CredentialsSection />
        </ScrollDepth>

        <ScrollDepth depth={1.2} tilt={1.5}>
          <SkillsSection />
        </ScrollDepth>

        <ScrollDepth depth={0.8} tilt={1.5}>
          <ActivitiesSection />
        </ScrollDepth>

        <ContactSection />
      </main>
    </>
  )
}
