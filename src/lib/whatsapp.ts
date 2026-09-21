import { siteConfig } from '@/data/siteConfig'
import type { Service } from '@/data/services'

export type WhatsAppSource =
  | 'hero'
  | 'header'
  | 'service'
  | 'featured-service'
  | 'mobile-sticky'
  | 'cta'
  | 'contact'
  | 'mobile-nav'
  | 'service-detail'

type BuildWhatsAppUrlOptions = {
  service?: Pick<Service, 'title' | 'shortTitle'> | null
  source?: WhatsAppSource
}

/** Digits-only WhatsApp number from site config (wa.me requires no + or spaces). */
export function whatsappPhoneDigits(): string {
  const fromHref = siteConfig.contact.whatsappHref.match(/wa\.me\/(\d+)/)?.[1]
  if (fromHref) return fromHref
  return siteConfig.contact.whatsapp.replace(/\D/g, '')
}

/**
 * Professional Arabic WhatsApp deep link — single source for all CTAs.
 */
export function buildWhatsAppUrl(options: BuildWhatsAppUrlOptions = {}): string {
  const { service, source } = options
  const label = service?.shortTitle || service?.title
  const firm = siteConfig.firmNameEn

  let text: string
  if (label) {
    text = `مرحبًا، أرغب في الاستفسار عن خدمات ${label} لدى ${firm}.`
  } else {
    text = `مرحبًا، أرغب في الاستفسار عن الخدمات القانونية لدى ${firm}.`
  }

  if (source) {
    text += `\n(المصدر: ${source})`
  }

  const phone = whatsappPhoneDigits()
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
