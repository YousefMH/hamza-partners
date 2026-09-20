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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color,box-shadow] duration-500',
        scrolled || open
          ? 'border-b border-gold/30 bg-ivory/90 shadow-[0_1px_0_rgba(198,161,91,0.12)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-editorial flex h-[4.5rem] items-center justify-between gap-4 md:h-20">
        <a href="#home" className="group flex flex-col items-start">
          <span className="font-display text-lg font-semibold tracking-wide text-charcoal md:text-xl">
            {siteConfig.firmNameAr}
          </span>
          <span className="text-[0.65rem] tracking-[0.18em] text-muted uppercase transition-colors group-hover:text-gold-dark">
            {siteConfig.firmNameEn}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="القائمة الرئيسية">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm text-warm-gray transition-colors hover:text-charcoal after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contact" className="hidden sm:inline-flex" size="md">
            {siteConfig.cta.book}
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-charcoal/15 text-charcoal transition-colors hover:border-gold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 top-[4.5rem] z-40 bg-ivory md:top-20 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container-editorial flex h-full flex-col gap-1 py-10" aria-label="قائمة الجوال">
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
                <Button href="#contact" onClick={() => setOpen(false)} size="lg" className="w-full">
                  {siteConfig.cta.book}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
