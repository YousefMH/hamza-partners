import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = decodeURIComponent(hash.replace('#', ''))
    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return true
      }
      return false
    }

    if (scrollToTarget()) return

    // Allow the destination page to mount before retrying hash targets
    const timer = window.setTimeout(() => {
      if (!scrollToTarget()) {
        window.scrollTo(0, 0)
      }
    }, 50)

    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
