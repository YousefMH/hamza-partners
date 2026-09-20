import { siteConfig } from '@/data/siteConfig'

export interface WhyUsItem {
  id: string
  title: string
  body: string
}

export const whyUs: WhyUsItem[] = [
  {
    id: '1',
    title: 'فهم قانوني عميق',
    body: 'خبرة متخصصة في التعامل مع القضايا والمعاملات القانونية المعقدة.',
  },
  {
    id: '2',
    title: 'منظور تجاري',
    body: 'نفهم أن الحل القانوني الجيد يجب أن يخدم أهداف الأعمال وليس فقط المتطلبات القانونية.',
  },
  {
    id: '3',
    title: 'دقة وسرية',
    body: 'نلتزم بأعلى معايير السرية والدقة في التعامل مع عملائنا.',
  },
  {
    id: '4',
    title: 'شراكة طويلة الأمد',
    body: 'نسعى لبناء علاقات مهنية مستدامة مع عملائنا.',
  },
]

export const trustIndicators = [
  {
    label: 'عراقة منذ 1935',
    icon: 'scale',
  },
  {
    label: 'حلول قانونية متكاملة',
    icon: 'briefcase',
  },
  {
    label: 'فهم عميق للأعمال',
    icon: 'building-2',
  },
  {
    label: 'التزام بالسرية والدقة',
    icon: 'shield-check',
  },
] as const

export type TrustIndicator = (typeof trustIndicators)[number]

const yearsOfHeritage = new Date().getFullYear() - siteConfig.foundedYear

// PLACEHOLDER counts (except founding year) — replace with verified figures before production
export const stats = [
  { id: '1', value: siteConfig.foundedYear, prefix: '', label: 'سنة التأسيس' },
  { id: '2', value: yearsOfHeritage, prefix: '+', label: 'عامًا من العراقة' },
  { id: '3', value: 500, prefix: '+', label: 'ملف ومعاملة قانونية' },
  { id: '4', value: 100, prefix: '+', label: 'عميل وشركة' },
] as const
