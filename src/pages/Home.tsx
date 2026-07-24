import HeroSection from '../sections/HeroSection'
import MarqueeSection from '../sections/MarqueeSection'
import AboutSection from '../sections/AboutSection'
import CapabilitiesSection from '../sections/CapabilitiesSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContactSection from '../sections/ContactSection'

export default function Home() {
  return (
    <main className="bg-ink" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
