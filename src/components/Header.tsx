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
  const solid = forceSolid || !onHome || scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
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
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
          solid
            ? 'border-b border-gold/25 bg-ivory/95 shadow-[0_1px_0_rgba(198,161,91,0.1)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-editorial flex h-16 items-center justify-between gap-3 md:h-[4.5rem] md:gap-4">
          <a
            href="/#home"
            onClick={closeMenu}
            className="group min-w-0 flex-1 py-1"
            aria-label={siteConfig.firmNameAr}
          >
            <span
              className={cn(
                'block truncate font-display text-[1.05rem] font-bold leading-tight transition-colors sm:text-lg md:text-xl',
                solid ? 'text-charcoal' : 'text-ivory',
              )}
            >
              {siteConfig.firmNameAr}
            </span>
            <span
              className={cn(
                'mt-0.5 hidden truncate text-[0.7rem] leading-none transition-colors sm:block',
                solid
                  ? 'text-muted group-hover:text-gold-dark'
                  : 'text-gold-champagne/90 group-hover:text-gold-champagne',
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
                  solid
                    ? 'text-charcoal/80 hover:text-charcoal'
                    : 'text-ivory/90 hover:text-ivory',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              href="/#contact"
              className="hidden lg:inline-flex"
              size="md"
              variant={solid ? 'primary' : 'inverse'}
            >
              {siteConfig.cta.book}
            </Button>

            <button
              type="button"
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-sm border transition-colors lg:hidden',
                solid
                  ? 'border-charcoal/15 bg-white/60 text-charcoal hover:border-gold'
                  : 'border-ivory/40 bg-charcoal/20 text-ivory backdrop-blur-sm hover:border-gold-champagne',
              )}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-charcoal/45 backdrop-blur-[2px]"
              aria-label="إغلاق الخلفية"
              onClick={closeMenu}
            />

            <motion.div
              className="absolute inset-y-0 end-0 flex w-[min(100%,22rem)] flex-col bg-ivory shadow-[-12px_0_40px_rgba(21,21,21,0.18)]"
              initial={reduce ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="قائمة التنقل"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-5">
                <p className="font-display text-base font-bold text-charcoal">القائمة</p>
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center border border-charcoal/15 text-charcoal"
                  aria-label="إغلاق القائمة"
                  onClick={closeMenu}
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>

              <nav
                className="flex flex-1 flex-col overflow-y-auto px-5 py-4"
                aria-label="قائمة الجوال"
              >
                {siteConfig.nav.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="border-b border-border py-3.5 font-display text-lg font-bold text-charcoal transition-colors hover:text-gold-dark"
                    initial={reduce ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.035, duration: 0.28 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <Button href="/#contact" onClick={closeMenu} size="lg" className="w-full">
                  {siteConfig.cta.book}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
