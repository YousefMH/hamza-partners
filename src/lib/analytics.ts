export type AnalyticsPayload = Record<string, string | number | boolean | undefined | null>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Lightweight analytics abstraction. Safe no-op when GA4 / Meta are absent.
 * Never throws — conversion tracking must not break the UX.
 */
export function trackEvent(eventName: string, payload: AnalyticsPayload = {}): void {
  try {
    const detail = { event: eventName, ...payload }

    if (typeof window === 'undefined') return

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(detail)

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload)
    }

    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, payload)
    }

    if (import.meta.env.DEV) {
      console.debug('[analytics]', eventName, payload)
    }
  } catch {
    // Intentionally swallow — analytics must never interrupt the visitor.
  }
}
