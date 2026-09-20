import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ServiceDetailPage } from '@/pages/ServiceDetailPage'
import { ScrollToTop } from '@/components/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
