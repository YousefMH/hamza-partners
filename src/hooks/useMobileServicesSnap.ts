import { useEffect } from 'react'

const MOBILE_MAX = '(max-width: 1023px)'
const REDUCE_MOTION = '(prefers-reduced-motion: reduce)'
const SNAP_CLASS = 'services-snap-on'

function documentTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY
}

function fillOf(rect: DOMRect, vh: number): number {
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
  return visible / vh
}

/**
 * Arm mandatory snap from just above the services intro through intermediate
 * service cards, so “مجالات عملنا” is a real full-screen stop and is not
 * skipped between the header and the first card.
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
      const intro = document.querySelector<HTMLElement>('.services-intro-panel')
      if (panels.length === 0 || !intro) {
        clear()
        return
      }

      const vh = window.innerHeight
      const y = window.scrollY
      const lastIndex = panels.length - 1
      const last = panels[lastIndex]
      const introTop = documentTop(intro)
      const lastTop = documentTop(last)

      let bestIndex = -1
      let bestFill = 0
      for (let index = 0; index < panels.length; index += 1) {
        const fill = fillOf(panels[index].getBoundingClientRect(), vh)
        if (fill > bestFill) {
          bestFill = fill
          bestIndex = index
        }
      }

      const onLastCard = bestIndex === lastIndex && bestFill > 0.4
      // Arm early so a fling from the hero still settles on the intro screen
      const inCorridor = y >= introTop - vh * 0.55 && y < lastTop + vh * 0.08
      const shouldSnap = inCorridor && !onLastCard

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
