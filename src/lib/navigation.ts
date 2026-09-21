import { appUrl } from '@/lib/paths'
import type { ServiceCategory } from '@/data/services'

export const SERVICES_FILTER_EVENT = 'hamza:services-filter'

export type ServicesFilterDetail = {
  category: ServiceCategory | 'all'
}

/** Home contact section with optional service prefill via query string. */
export function contactHref(serviceSlug?: string): string {
  if (!serviceSlug) return appUrl('/#contact')
  return appUrl(`/?service=${encodeURIComponent(serviceSlug)}#contact`)
}

export function dispatchServicesFilter(category: ServiceCategory | 'all'): void {
  window.dispatchEvent(
    new CustomEvent<ServicesFilterDetail>(SERVICES_FILTER_EVENT, {
      detail: { category },
    }),
  )
}

export function openServicesWithCategory(category: ServiceCategory | 'all'): void {
  dispatchServicesFilter(category)
  const el = document.getElementById('services')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.location.hash = '#services'
  }
}
