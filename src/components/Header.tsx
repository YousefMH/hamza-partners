import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, MessageCircle, X } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { appUrl } from '@/lib/paths'
import { contactHref } from '@/lib/navigation'
import { trackEvent } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'

type HeaderProps = {
  /** Keep ivory solid chrome (for light pages without a dark hero) */
  forceSolid?: boolean
}

function sectionIdFromHref(href: string): string {
  const hash = href.includes('#') ? href.slice(href.indexOf('#') + 1) : ''
  return hash || 'home'
}

export function Header({ forceSolid = false }: HeaderProps) {
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('home')
  const reduce = useReducedMotion()
  const onHome = pathname === '/'
  const solidChrome = forceSolid || !onHome || scrolled || open

  const sectionIds = useMemo(
    () => siteConfig.nav.map((item) => sectionIdFromHref(item.href)),
    [],
  )

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /** Keep the underline in sync with the visible section while scrolling the home page. */
  useEffect(() => {
    if (!onHome) {
      setActiveId('')
      return
    }

    const fromHash = hash.replace(/^#/, '')
    if (fromHash && sectionIds.includes(fromHash)) {
      setActiveId(fromHash)
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const visibility = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        let bestId = 'home'
        let bestRatio = -1
        for (const id of sectionIds) {
          const ratio = visibility.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        if (bestRatio > 0) {
          setActiveId(bestId)
          return
        }

        // Near the top of the page → home
        if (window.scrollY < 80) {
          setActiveId('home')
        }
      },
      {
        // Band under the fixed header where the “current” section should register
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.4, 0.6],
      },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [onHome, hash, sectionIds])

  const closeMenu = () => setOpen(false)

  const activateSection = (href: string) => {
    const id = sectionIdFromHref(href)
    setActiveId(id)
    closeMenu()
  }

  const whatsappHref = buildWhatsAppUrl({ source: open ? 'mobile-nav' : 'header' })
  const bookHref = contactHref()

  const whatsappIconClass = cn(
    'inline-flex size-9 shrink-0 items-center justify-center rounded-sm transition-colors sm:size-10',
    solidChrome
      ? 'border border-charcoal/12 bg-white text-gold-dark hover:border-gold hover:text-charcoal'
      : 'border border-ivory/25 bg-charcoal/30 text-gold-champagne hover:border-gold-champagne hover:text-ivory',
  )

  /** Locked bar height — open/closed chrome must never jump */
  const barRowClass =
    'container-editorial flex h-14 w-full shrink-0 items-center gap-2 overflow-hidden sm:gap-3 md:h-16 lg:h-[4.5rem] lg:gap-6'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[70] h-[calc(3.5rem+env(safe-area-inset-top,0px))] overflow-hidden pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 md:h-[calc(4rem+env(safe-area-inset-top,0px))] lg:h-[calc(4.5rem+env(safe-area-inset-top,0px))]',
          solidChrome
            ? 'border-b border-gold/20 bg-ivory/95 shadow-[0_1px_0_rgba(198,161,91,0.08)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent shadow-none',
        )}
      >
        <div className={barRowClass}>
          <a
            href={appUrl('/#home')}
            onClick={() => activateSection('/#home')}
            className="group shrink-0"
            aria-label={siteConfig.firmNameAr}
          >
            <span
              className={cn(
                'block whitespace-nowrap font-display text-[0.9375rem] font-bold leading-none transition-colors sm:text-base md:text-lg lg:text-xl',
                solidChrome ? 'text-charcoal' : 'text-ivory',
              )}
            >
              {siteConfig.firmNameAr}
            </span>
            <span
              className={cn(
                'mt-0.5 hidden whitespace-nowrap text-[0.65rem] leading-none transition-colors sm:block sm:text-[0.7rem]',
                solidChrome
                  ? 'text-muted group-hover:text-gold-dark'
                  : 'text-gold-champagne/90 group-hover:text-gold-champagne',
              )}
            >
              {siteConfig.firmNameEn}
            </span>
          </a>

          <nav
            className="ms-auto hidden items-center gap-6 lg:flex lg:gap-7"
            aria-label="القائمة الرئيسية"
          >
            {siteConfig.nav.map((item) => {
              const id = sectionIdFromHref(item.href)
              const isActive = onHome && activeId === id

              return (
                <a
                  key={item.href}
                  href={appUrl(item.href)}
                  onClick={() => activateSection(item.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative whitespace-nowrap text-[0.95rem] transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-gold after:transition-transform after:duration-300',
                    isActive
                      ? 'after:origin-right after:scale-x-100'
                      : 'after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100',
                    solidChrome
                      ? isActive
                        ? 'font-bold text-gold-dark'
                        : 'text-charcoal/80 hover:text-charcoal'
                      : isActive
                        ? 'font-bold text-gold-champagne'
                        : 'text-ivory/90 hover:text-ivory',
                  )}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="ms-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5 lg:ms-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(whatsappIconClass, 'hidden sm:inline-flex')}
              aria-label={siteConfig.cta.whatsapp}
              onClick={() => trackEvent('whatsapp_click', { source: 'header' })}
            >
              <MessageCircle size={18} strokeWidth={1.6} aria-hidden="true" />
            </a>

            {/* On the home hero, the primary CTA already lives in the section —
                keep this compact header button only after scroll / off-home. */}
            {(scrolled || !onHome) && (
              <a
                href={bookHref}
                onClick={() => {
                  activateSection('/#contact')
                  trackEvent('consultation_cta_click', { source: 'header' })
                }}
                className={cn(
                  'btn-wood inline-flex h-9 max-w-[9.5rem] items-center justify-center whitespace-nowrap border px-2.5 font-display text-[0.8125rem] font-bold text-charcoal transition-[filter,background-color] duration-300 sm:h-10 sm:max-w-none sm:px-4 sm:text-sm lg:hidden',
                )}
              >
                {siteConfig.cta.book}
              </a>
            )}

            <span className="hidden lg:inline-flex">
              <Button
                href={bookHref}
                size="md"
                variant={solidChrome ? 'primary' : 'inverse'}
                onClick={() => {
                  activateSection('/#contact')
                  trackEvent('consultation_cta_click', { source: 'header' })
                }}
              >
                {siteConfig.cta.book}
              </Button>
            </span>

            <button
              type="button"
              className={cn(
                'inline-flex size-9 shrink-0 items-center justify-center rounded-sm transition-colors sm:size-10 lg:hidden',
                solidChrome
                  ? 'btn-radius border border-charcoal/12 bg-white text-charcoal hover:border-gold'
                  : 'btn-radius border border-ivory/25 bg-charcoal/30 text-ivory hover:border-gold-champagne',
              )}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-[60] flex flex-col overflow-x-hidden bg-ivory pt-[calc(3.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(3.5rem+env(safe-area-inset-top,0px))] md:pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
          >
            <nav
              className="container-editorial flex flex-1 flex-col overflow-y-auto overscroll-contain py-3"
              aria-label="قائمة الجوال"
            >
              {siteConfig.nav.map((item, index) => {
                const id = sectionIdFromHref(item.href)
                const isActive = onHome && activeId === id

                return (
                  <motion.a
                    key={item.href}
                    href={appUrl(item.href)}
                    onClick={() => activateSection(item.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'border-b py-3.5 font-display text-lg font-bold transition-colors sm:py-4 sm:text-xl',
                      isActive
                        ? 'border-gold text-gold-dark'
                        : 'border-border text-charcoal hover:text-gold-dark',
                    )}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.25 }}
                  >
                    {item.label}
                  </motion.a>
                )
              })}
            </nav>

            <div className="container-editorial shrink-0 space-y-3 border-t border-border py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
              <Button
                href={bookHref}
                onClick={() => {
                  activateSection('/#contact')
                  trackEvent('consultation_cta_click', { source: 'mobile-nav' })
                }}
                size="lg"
                className="w-full"
              >
                {siteConfig.cta.book}
              </Button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-radius inline-flex min-h-11 w-full items-center justify-center gap-2 border border-charcoal/15 bg-white font-display text-base font-bold text-charcoal transition-colors hover:border-gold hover:text-gold-dark"
                onClick={() => {
                  trackEvent('whatsapp_click', { source: 'mobile-nav' })
                  closeMenu()
                }}
              >
                <MessageCircle size={18} strokeWidth={1.6} aria-hidden="true" />
                {siteConfig.cta.whatsapp}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
