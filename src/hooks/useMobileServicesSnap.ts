import { useEffect } from 'react'

const MOBILE_MAX = '(max-width: 1023px)'
const REDUCE_MOTION = '(prefers-reduced-motion: reduce)'
const SNAP_CLASS = 'services-snap-on'

/**
 * Mandatory document snap only while an intermediate service panel owns the
 * viewport. As soon as the last service is focused (or we leave the block),
 * snap turns off so the rest of the page scrolls normally.
 */
export function useMobileServicesSnap() {
  useEffect(() => {
    const html = document.documentElement
    const mobileQuery = window.matchMedia(MOBILE_MAX)
    const reduceQuery = window.matchMedia(REDUCE_MOTION)

    let frame = 0

    const clear = () => {
      html.classList.remove(SNAP_CLASS)
    }

    const measure = () => {
      if (!mobileQuery.matches || reduceQuery.matches) {
        clear()
        return
      }

      const panels = document.querySelectorAll<HTMLElement>('.services-page-panel')
      if (panels.length === 0) {
        clear()
        return
      }

      const vh = window.innerHeight
      const lastIndex = panels.length - 1

      let bestIndex = -1
      let bestFill = 0

      for (let index = 0; index < panels.length; index += 1) {
        const rect = panels[index].getBoundingClientRect()
        const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
        const fill = visible / vh
        if (fill > bestFill) {
          bestFill = fill
          bestIndex = index
        }
      }

      const shouldSnap =
        bestIndex >= 0 && bestIndex < lastIndex && bestFill > 0.35

      html.classList.toggle(SNAP_CLASS, shouldSnap)
    }

    const onScrollOrResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    mobileQuery.addEventListener('change', onScrollOrResize)
    reduceQuery.addEventListener('change', onScrollOrResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      mobileQuery.removeEventListener('change', onScrollOrResize)
      reduceQuery.removeEventListener('change', onScrollOrResize)
      clear()
    }
  }, [])
}
