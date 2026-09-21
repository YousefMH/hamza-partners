import { useEffect } from 'react'

const MOBILE_MAX = '(max-width: 1023px)'
const REDUCE_MOTION = '(prefers-reduced-motion: reduce)'
const SNAP_CLASS = 'services-snap-on'
/** Ignore sub-pixel / rubber-band jitter when inferring scroll direction. */
const DIRECTION_EPSILON_PX = 4

function documentTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY
}

function fillOf(rect: DOMRect, vh: number): number {
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
  return visible / vh
}

/**
 * Mobile services use document-level mandatory snap only while scrolling
 * *down* through the corridor.
 *
 * Critical: upward intent must clear the snap class *synchronously* on
 * wheel/touchmove (not only on scroll). Otherwise mandatory snap settles
 * back onto the intro / service panels before React/rAF can disarm it —
 * trapping the visitor on “مجالات عملنا”, or yanking downward when
 * returning from Featured.
 *
 * After the last card (or past it), snap stays latched off until the
 * visitor returns above the corridor, or intentionally scrolls down again
 * onto an earlier card.
 */
export function useMobileServicesSnap() {
  useEffect(() => {
    const html = document.documentElement
    const mobileQuery = window.matchMedia(MOBILE_MAX)
    const reduceQuery = window.matchMedia(REDUCE_MOTION)

    let frame = 0
    let releasedPastServices = false
    let lastY = window.scrollY
    let scrollIntent: 'up' | 'down' = 'down'
    let touchLastY = 0

    const clear = () => {
      html.classList.remove(SNAP_CLASS)
    }

    const applySnapClass = (on: boolean) => {
      html.classList.toggle(SNAP_CLASS, on)
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
      const delta = y - lastY
      if (delta > DIRECTION_EPSILON_PX) {
        scrollIntent = 'down'
        lastY = y
      } else if (delta < -DIRECTION_EPSILON_PX) {
        scrollIntent = 'up'
        lastY = y
      }

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

      const aboveCorridor = y < introTop - vh * 0.35
      const settledOnLast = bestIndex === lastIndex && bestFill >= 0.45
      const scrolledPastLast =
        y >= lastTop + vh * 0.08 || lastRect.bottom < vh * 0.6
      const browsingDownEarlierCard =
        scrollIntent === 'down' &&
        bestIndex >= 0 &&
        bestIndex < lastIndex &&
        bestFill >= 0.55

      if (aboveCorridor) {
        releasedPastServices = false
      } else if (settledOnLast || scrolledPastLast) {
        releasedPastServices = true
      } else if (releasedPastServices && browsingDownEarlierCard) {
        releasedPastServices = false
      }

      const snapOn =
        !aboveCorridor &&
        !releasedPastServices &&
        scrollIntent === 'down'

      applySnapClass(snapOn)
    }

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    /** Disarm snap before the browser applies mandatory snap settlement. */
    const setIntentAndSync = (intent: 'up' | 'down') => {
      scrollIntent = intent
      // Keep lastY current so measure() does not immediately overwrite this
      // intent from a stale scroll delta (e.g. scrollIntoView then wheel).
      lastY = window.scrollY
      measure()
    }

    const onWheel = (event: WheelEvent) => {
      if (!mobileQuery.matches || reduceQuery.matches) return
      if (event.deltaY < -DIRECTION_EPSILON_PX) {
        setIntentAndSync('up')
      } else if (event.deltaY > DIRECTION_EPSILON_PX) {
        setIntentAndSync('down')
      }
    }

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) return
      touchLastY = event.touches[0].clientY
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!mobileQuery.matches || reduceQuery.matches) return
      if (event.touches.length === 0) return
      const clientY = event.touches[0].clientY
      const fingerDelta = touchLastY - clientY
      touchLastY = clientY
      // Finger up → page scrolls down; finger down → page scrolls up.
      if (fingerDelta > DIRECTION_EPSILON_PX) {
        setIntentAndSync('down')
      } else if (fingerDelta < -DIRECTION_EPSILON_PX) {
        setIntentAndSync('up')
      }
    }

    measure()
    window.addEventListener('scroll', scheduleMeasure, { passive: true })
    window.addEventListener('resize', scheduleMeasure, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    mobileQuery.addEventListener('change', scheduleMeasure)
    reduceQuery.addEventListener('change', scheduleMeasure)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('resize', scheduleMeasure)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      mobileQuery.removeEventListener('change', scheduleMeasure)
      reduceQuery.removeEventListener('change', scheduleMeasure)
      clear()
    }
  }, [])
}
