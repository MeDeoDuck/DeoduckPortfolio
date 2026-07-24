import { HashRouter, Route, Routes } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="relative min-h-screen bg-ink" style={{ overflowX: 'clip' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </HashRouter>
    </LanguageProvider>
  )
}
