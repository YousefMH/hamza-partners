import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const solid = scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background,border-color,color,box-shadow] duration-500',
          solid
            ? 'border-b border-gold/30 bg-ivory shadow-[0_1px_0_rgba(198,161,91,0.12)]'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-editorial flex h-[4.5rem] items-center justify-between gap-4 md:h-20">
          <a href="#home" className="group flex flex-col items-start">
            <span
              className={cn(
                'font-display text-lg font-bold transition-colors md:text-xl',
                solid ? 'text-charcoal' : 'text-ivory',
              )}
            >
              {siteConfig.firmNameAr}
            </span>
            <span
              className={cn(
                'text-xs transition-colors',
                solid
                  ? 'text-muted group-hover:text-gold-dark'
                  : 'text-gold-champagne/90 group-hover:text-gold-champagne',
              )}
            >
              {siteConfig.firmNameEn}
            </span>
          </a>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="القائمة الرئيسية"
          >
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-base transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100',
                  solid
                    ? 'text-charcoal/80 hover:text-charcoal'
                    : 'text-ivory/90 hover:text-ivory',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="#contact"
              className="hidden sm:inline-flex"
              size="md"
              variant={solid ? 'primary' : 'inverse'}
            >
              {siteConfig.cta.book}
            </Button>
            <button
              type="button"
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center border transition-colors lg:hidden',
                solid
                  ? 'border-charcoal/15 text-charcoal hover:border-gold'
                  : 'border-ivory/35 text-ivory hover:border-gold-champagne',
              )}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay is a sibling of header so `position:fixed` is not trapped by header styles */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-ivory lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <nav
              className="container-editorial flex h-full flex-col gap-1 pb-10 pt-28"
              aria-label="قائمة الجوال"
            >
              {siteConfig.nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 font-display text-2xl text-charcoal"
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-8">
                <Button
                  href="#contact"
                  onClick={() => setOpen(false)}
                  size="lg"
                  className="w-full"
                >
                  {siteConfig.cta.book}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
