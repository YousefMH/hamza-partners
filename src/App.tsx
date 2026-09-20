import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ServiceDetailPage } from '@/pages/ServiceDetailPage'
import { LawyerProfilePage } from '@/pages/LawyerProfilePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ScrollToTop } from '@/components/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
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
