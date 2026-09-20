import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'

type HeaderProps = {
  /** Keep ivory solid chrome (for light pages without a dark hero) */
  forceSolid?: boolean
}

export function Header({ forceSolid = false }: HeaderProps) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const onHome = pathname === '/'
  const solidDesktop = forceSolid || !onHome || scrolled || open

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

  const closeMenu = () => setOpen(false)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
          'border-b border-gold/20 bg-ivory/95 shadow-[0_1px_0_rgba(198,161,91,0.08)] backdrop-blur-md',
          solidDesktop
            ? 'lg:border-gold/25 lg:bg-ivory/95 lg:shadow-[0_1px_0_rgba(198,161,91,0.1)] lg:backdrop-blur-md'
            : 'lg:border-transparent lg:bg-transparent lg:shadow-none lg:backdrop-blur-none',
        )}
      >
        <div className="container-editorial flex h-12 items-center gap-2 sm:h-14 sm:gap-3 md:h-16 lg:h-[4.5rem] lg:gap-6">
          <a
            href="/#home"
            onClick={closeMenu}
            className="group min-w-0 flex-1"
            aria-label={siteConfig.firmNameAr}
          >
            <span
              className={cn(
                'block truncate font-display text-sm font-bold leading-none transition-colors sm:text-base md:text-lg lg:text-xl',
                'text-charcoal',
                solidDesktop ? 'lg:text-charcoal' : 'lg:text-ivory',
              )}
            >
              {siteConfig.firmNameAr}
            </span>
            <span
              className={cn(
                'mt-1 hidden truncate text-[0.65rem] leading-none transition-colors sm:block sm:text-[0.7rem]',
                'text-muted group-hover:text-gold-dark',
                solidDesktop
                  ? 'lg:text-muted lg:group-hover:text-gold-dark'
                  : 'lg:text-gold-champagne/90 lg:group-hover:text-gold-champagne',
              )}
            >
              {siteConfig.firmNameEn}
            </span>
          </a>

          <nav
            className="hidden items-center gap-6 lg:flex lg:gap-7"
            aria-label="القائمة الرئيسية"
          >
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'relative whitespace-nowrap text-[0.95rem] transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100',
                  solidDesktop
                    ? 'text-charcoal/80 hover:text-charcoal'
                    : 'text-ivory/90 hover:text-ivory',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <a
              href="/#contact"
              className={cn(
                'inline-flex h-9 items-center justify-center whitespace-nowrap rounded-sm px-3 font-display text-[0.8125rem] font-bold transition-colors sm:h-10 sm:px-4 sm:text-sm lg:hidden',
                'border border-gold bg-gold text-charcoal hover:bg-gold-champagne',
              )}
            >
              {siteConfig.cta.book}
            </a>

            <span className="hidden lg:inline-flex">
              <Button
                href="/#contact"
                size="md"
                variant={solidDesktop ? 'primary' : 'inverse'}
              >
                {siteConfig.cta.book}
              </Button>
            </span>

            <button
              type="button"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-charcoal/12 bg-white text-charcoal transition-colors hover:border-gold sm:size-10 lg:hidden"
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
            className="fixed inset-0 z-[60] flex flex-col overflow-x-hidden bg-ivory pt-[env(safe-area-inset-top,0px)] lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
          >
            <div className="container-editorial flex h-12 shrink-0 items-center justify-between border-b border-border sm:h-14">
              <p className="min-w-0 truncate font-display text-sm font-bold text-charcoal sm:text-base">
                {siteConfig.firmNameAr}
              </p>
              <button
                type="button"
                className="inline-flex size-9 shrink-0 items-center justify-center border border-charcoal/15 text-charcoal sm:size-10"
                aria-label="إغلاق القائمة"
                onClick={closeMenu}
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            <nav
              className="container-editorial flex flex-1 flex-col overflow-y-auto overscroll-contain py-3"
              aria-label="قائمة الجوال"
            >
              {siteConfig.nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-border py-3.5 font-display text-lg font-bold text-charcoal transition-colors hover:text-gold-dark sm:py-4 sm:text-xl"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.25 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="container-editorial shrink-0 border-t border-border py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
              <Button href="/#contact" onClick={closeMenu} size="lg" className="w-full">
                {siteConfig.cta.book}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
