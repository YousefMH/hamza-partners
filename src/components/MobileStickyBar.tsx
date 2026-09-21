import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/data/siteConfig'
import { trackEvent } from '@/lib/analytics'
import { contactHref } from '@/lib/navigation'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/cn'

/**
 * Mobile-only sticky conversion bar — appears after the Hero leaves view.
 * Hides while contact fields are focused so the bar does not cover inputs.
 */
export function MobileStickyBar() {
  const [pastHero, setPastHero] = useState(false)
  const [fieldFocused, setFieldFocused] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('home')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting)
      },
      { threshold: 0.08, rootMargin: '-8% 0px 0px 0px' },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target
      if (!(target instanceof HTMLElement)) return
      const tag = target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        setFieldFocused(true)
      }
    }
    const onFocusOut = () => {
      window.setTimeout(() => {
        const active = document.activeElement
        const tag = active?.tagName
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
          setFieldFocused(false)
        }
      }, 0)
    }
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  const visible = pastHero && !fieldFocused
  const consultHref = contactHref()
  const whatsappHref = buildWhatsAppUrl({ source: 'mobile-sticky' })

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-0 z-[55] lg:hidden',
        'transition-[opacity,transform] duration-300',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0',
      )}
      aria-hidden={!visible}
    >
      <div
        className={cn(
          'pointer-events-auto border-t border-gold/25 bg-ivory/95 shadow-[0_-8px_24px_rgba(21,21,21,0.08)] backdrop-blur-md',
          'px-3 pt-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))]',
        )}
      >
        <div className="mx-auto flex max-w-lg gap-2">
          <a
            href={consultHref}
            className="btn-wood inline-flex min-h-11 flex-1 items-center justify-center px-3 font-display text-sm font-bold text-charcoal"
            tabIndex={visible ? 0 : -1}
            onClick={() =>
              trackEvent('consultation_cta_click', { source: 'mobile-sticky' })
            }
          >
            {siteConfig.cta.book}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-radius inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 border border-charcoal/15 bg-white px-3 font-display text-sm font-bold text-charcoal transition-colors hover:border-gold hover:text-gold-dark"
            tabIndex={visible ? 0 : -1}
            aria-label={siteConfig.cta.whatsapp}
            onClick={() => trackEvent('whatsapp_click', { source: 'mobile-sticky' })}
          >
            <MessageCircle size={16} strokeWidth={1.6} aria-hidden="true" />
            {siteConfig.cta.whatsappShort}
          </a>
        </div>
      </div>
    </div>
  )
}
