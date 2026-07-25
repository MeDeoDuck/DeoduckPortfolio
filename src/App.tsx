import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import ScrollToTop from './components/ScrollToTop'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

/**
 * 라우트 전환은 "갑자기 바뀌는 것"을 막는 용도다.
 * 짧게(180ms) 끊고 지나가야 이동이 느리게 느껴지지 않는다.
 */
function AnimatedRoutes() {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0.1 : 0.18, ease: EASE_OUT }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="relative min-h-screen bg-paper" style={{ overflowX: 'clip' }}>
          <AnimatedRoutes />
        </div>
      </HashRouter>
    </LanguageProvider>
  )
}
