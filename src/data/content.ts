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
    body: 'خبرة عملية في المعاملات والقضايا المعقّدة أمام الجهات المصرية المختصة.',
  },
  {
    id: '2',
    title: 'منظور تجاري',
    body: 'نربط الرأي القانوني بأهداف العمل، لا بالنصوص وحدها.',
  },
  {
    id: '3',
    title: 'دقة وسرية',
    body: 'معايير مهنية صارمة في الصياغة، والمراجعة، وحماية معلومات العميل.',
  },
  {
    id: '4',
    title: 'شراكة ممتدة',
    body: 'نرافق العملاء عبر مراحل النمو والنزاع، لا في معاملة واحدة منقطعة.',
  },
]

export const trustIndicators = [
  {
    label: 'خبرة متخصصة',
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
  { id: '2', value: yearsOfHeritage, prefix: '+', label: 'عامًا منذ التأسيس' },
  { id: '3', value: 500, prefix: '+', label: 'ملف ومعاملة قانونية' },
  { id: '4', value: 100, prefix: '+', label: 'عميل وشركة' },
] as const
