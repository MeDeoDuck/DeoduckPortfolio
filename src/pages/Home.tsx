import Navbar from '../components/Navbar'
import HeroSection from '../sections/HeroSection'
import MarqueeSection from '../sections/MarqueeSection'
import AboutSection from '../sections/AboutSection'
import CapabilitiesSection from '../sections/CapabilitiesSection'
import ProjectsSection from '../sections/ProjectsSection'
import ExperienceSection from '../sections/ExperienceSection'
import AwardsSection from '../sections/AwardsSection'
import CredentialsSection from '../sections/CredentialsSection'
import ContactSection from '../sections/ContactSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-ink" style={{ overflowX: 'clip' }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <ExperienceSection />
        <AwardsSection />
        <CredentialsSection />
        <ContactSection />
      </main>
    </>
  )
}
