import { useEffect } from 'react'

const MOBILE_MAX = '(max-width: 1023px)'
const REDUCE_MOTION = '(prefers-reduced-motion: reduce)'
const SNAP_ON = 'services-snap-on'
const SNAP_RELEASED = 'services-snap-released'

/**
 * Document snap for the mobile services corridor.
 *
 * iOS-safe rules:
 * - Snap may turn OFF at any time.
 * - Snap must not turn ON during an active touch (mid-gesture
 *   scroll-snap-type changes make reverse scroll lag / lock).
 * - After the last service card, snap stays hard-off until the visitor
 *   returns above the corridor (Hero). Reverse travel stays free.
 */
export function useMobileServicesSnap() {
  useEffect(() => {
    const html = document.documentElement
    const mobileQuery = window.matchMedia(MOBILE_MAX)
    const reduceQuery = window.matchMedia(REDUCE_MOTION)

    let frame = 0
    let releasedPastServices = false
    let pointerDown = false

    const setClasses = (snapOn: boolean, released: boolean) => {
      html.classList.toggle(SNAP_ON, snapOn)
      html.classList.toggle(SNAP_RELEASED, released)
    }

    const clear = () => {
      html.classList.remove(SNAP_ON, SNAP_RELEASED)
    }

    const introTopY = (intro: HTMLElement, y: number) =>
      intro.getBoundingClientRect().top + y

    const shouldReleaseAtLast = (last: HTMLElement, y: number, vh: number) => {
      const lastRect = last.getBoundingClientRect()
      const lastTop = lastRect.top + y
      const following = document.querySelector<HTMLElement>('#services')
        ?.nextElementSibling as HTMLElement | null | undefined
      const followingTop = following?.getBoundingClientRect().top
      /*
        Mandatory snap cannot leave the last aligned panel unless snap is
        turned off — there is no snap target below. Release as soon as the
        last card is the primary view (or anything past it).
      */
      return (
        lastRect.top <= vh * 0.25 ||
        y >= lastTop - vh * 0.02 ||
        lastRect.bottom < vh * 0.75 ||
        (typeof followingTop === 'number' && followingTop < vh * 0.92)
      )
    }

    const measure = () => {
      if (!mobileQuery.matches || reduceQuery.matches) {
        releasedPastServices = false
        clear()
        return
      }

      const intro = document.querySelector<HTMLElement>('.services-intro-panel')
      const last = document.querySelector<HTMLElement>('.services-page-panel--last')
      if (!intro || !last) {
        releasedPastServices = false
        clear()
        return
      }

      const vh = window.innerHeight
      const y = window.scrollY
      const aboveCorridor = y < introTopY(intro, y) - vh * 0.3

      if (aboveCorridor) {
        releasedPastServices = false
      } else if (shouldReleaseAtLast(last, y, vh)) {
        releasedPastServices = true
      }

      if (releasedPastServices) {
        setClasses(false, true)
        return
      }

      if (aboveCorridor) {
        setClasses(false, false)
        return
      }

      // Inside corridor. Do not arm snap while a finger is down.
      if (pointerDown) {
        if (!html.classList.contains(SNAP_ON)) {
          setClasses(false, false)
        }
        return
      }

      setClasses(true, false)
    }

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    const onScroll = () => {
      if (releasedPastServices) {
        const intro = document.querySelector<HTMLElement>('.services-intro-panel')
        if (!intro) {
          setClasses(false, true)
          return
        }
        const y = window.scrollY
        if (y < introTopY(intro, y) - window.innerHeight * 0.3) {
          releasedPastServices = false
          scheduleMeasure()
        } else {
          setClasses(false, true)
        }
        return
      }
      scheduleMeasure()
    }

    const onPointerDown = () => {
      pointerDown = true
    }

    const onPointerUp = () => {
      pointerDown = false
      scheduleMeasure()
    }

    const onTouchMove = () => {
      if (!mobileQuery.matches || reduceQuery.matches) return
      if (releasedPastServices) return
      if (!html.classList.contains(SNAP_ON)) return

      const last = document.querySelector<HTMLElement>('.services-page-panel--last')
      if (!last) return
      if (shouldReleaseAtLast(last, window.scrollY, window.innerHeight)) {
        releasedPastServices = true
        setClasses(false, true)
      }
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', scheduleMeasure, { passive: true })
    window.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('touchend', onPointerUp, { passive: true })
    window.addEventListener('touchcancel', onPointerUp, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    mobileQuery.addEventListener('change', scheduleMeasure)
    reduceQuery.addEventListener('change', scheduleMeasure)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', scheduleMeasure)
      window.removeEventListener('touchstart', onPointerDown)
      window.removeEventListener('touchend', onPointerUp)
      window.removeEventListener('touchcancel', onPointerUp)
      window.removeEventListener('touchmove', onTouchMove)
      mobileQuery.removeEventListener('change', scheduleMeasure)
      reduceQuery.removeEventListener('change', scheduleMeasure)
      clear()
    }
  }, [])
}
