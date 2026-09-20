import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ServiceDetailPage } from '@/pages/ServiceDetailPage'
import { LawyerProfilePage } from '@/pages/LawyerProfilePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ScrollToTop } from '@/components/ScrollToTop'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/team/:slug" element={<LawyerProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
