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
 *
 * Uses exit hysteresis: once the last card (or anything past it) is reached,
 * snap stays off until the visitor scrolls clearly back onto an earlier card.
 * Without that latch, fill dropping below a threshold mid-exit re-arms snap
 * and the browser pulls back to the last service panel (“reverse scroll”).
 */
export function useMobileServicesSnap() {
  useEffect(() => {
    const html = document.documentElement
    const mobileQuery = window.matchMedia(MOBILE_MAX)
    const reduceQuery = window.matchMedia(REDUCE_MOTION)

    let frame = 0
    let releasedPastServices = false

    const clear = () => {
      html.classList.remove(SNAP_CLASS)
    }

    const measure = () => {
      if (!mobileQuery.matches || reduceQuery.matches) {
        releasedPastServices = false
        clear()
        return
      }

      const panels = document.querySelectorAll<HTMLElement>('.services-page-panel')
      const intro = document.querySelector<HTMLElement>('.services-intro-panel')
      if (panels.length === 0 || !intro) {
        releasedPastServices = false
        clear()
        return
      }

      const vh = window.innerHeight
      const y = window.scrollY
      const lastIndex = panels.length - 1
      const last = panels[lastIndex]
      const introTop = documentTop(intro)
      const lastTop = documentTop(last)
      const lastRect = last.getBoundingClientRect()

      let bestIndex = -1
      let bestFill = 0
      for (let index = 0; index < panels.length; index += 1) {
        const fill = fillOf(panels[index].getBoundingClientRect(), vh)
        if (fill > bestFill) {
          bestFill = fill
          bestIndex = index
        }
      }

      const aboveCorridor = y < introTop - vh * 0.55
      const settledOnLast = bestIndex === lastIndex && bestFill >= 0.45
      const scrolledPastLast =
        y >= lastTop + vh * 0.1 || lastRect.bottom < vh * 0.55
      const backOnEarlierCard =
        bestIndex >= 0 && bestIndex < lastIndex && bestFill >= 0.45

      if (aboveCorridor) {
        releasedPastServices = false
      } else if (settledOnLast || scrolledPastLast) {
        releasedPastServices = true
      } else if (backOnEarlierCard) {
        releasedPastServices = false
      }

      const inCorridor = !aboveCorridor && !releasedPastServices
      html.classList.toggle(SNAP_CLASS, inCorridor)
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
