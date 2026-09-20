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


// PLACEHOLDER stats — not verified claims; replace with real figures before production
export const stats = [
  { id: '1', value: 15, prefix: '+', label: 'سنوات من الخبرة' },
  { id: '2', value: 500, prefix: '+', label: 'ملف ومعاملة قانونية' },
  { id: '3', value: 100, prefix: '+', label: 'عميل وشركة' },
  { id: '4', value: 15, prefix: '+', label: 'مجالًا قانونيًا' },
] as const
