import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <>
      <Header forceSolid />
      <main className="container-editorial flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
        <p className="font-display text-sm font-bold text-gold-dark">404</p>
        <h1 className="mt-3 font-display text-3xl text-charcoal md:text-4xl">الصفحة غير موجودة</h1>
        <p className="mt-4 max-w-md text-muted">
          الرابط الذي حاولت فتحه غير متاح. يمكنك العودة إلى الصفحة الرئيسية ومتابعة التصفح.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/#home" size="lg">
            الصفحة الرئيسية
          </Button>
          <Link to="/#contact" className="inline-flex items-center px-4 text-gold-dark hover:text-charcoal">
            تواصل معنا
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
