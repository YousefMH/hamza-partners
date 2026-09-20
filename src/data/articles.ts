export interface Article {
  id: string
  category: string
  title: string
  excerpt: string
  date: string
  href: string
}

// PLACEHOLDER — replace with real articles / CMS content
export const articles: Article[] = [
  {
    id: '1',
    category: 'رؤى قانونية',
    title: 'مبادئ الحوكمة الرشيدة في الشركات المساهمة',
    excerpt:
      'نظرة موجزة على أطر الحوكمة التي تعزز الشفافية وتحمي حقوق المساهمين في بيئة الأعمال المعاصرة.',
    date: '2026-08-12',
    href: '#articles',
  },
  {
    id: '2',
    category: 'تحديثات قانون الأعمال',
    title: 'مستجدات تنظيم المعاملات التجارية والاستثمارية',
    excerpt:
      'قراءة عملية لأبرز التحديثات التنظيمية التي تؤثر على هيكلة المعاملات وصياغة الاتفاقيات.',
    date: '2026-07-28',
    href: '#articles',
  },
  {
    id: '3',
    category: 'تحديثات استثمارية',
    title: 'اعتبارات قانونية لمشروعات الاستثمار الأجنبي',
    excerpt:
      'إطار موجز للمخاطر القانونية التي ينبغي مراعاتها عند دخول الأسواق وتنفيذ المشروعات الاستثمارية.',
    date: '2026-06-15',
    href: '#articles',
  },
]
