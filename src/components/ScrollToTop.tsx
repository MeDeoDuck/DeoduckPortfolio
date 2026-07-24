import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** 라우트가 바뀌면 맨 위로. 해시 앵커 이동일 때는 건드리지 않는다. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
