export interface ExperienceItem {
  id: string
  title: string
  summary: string
}

/** Anonymized experience themes aligned with common corporate practice work — no client names or results claimed */
export const experience: ExperienceItem[] = [
  {
    id: '1',
    title: 'صفقات اندماج واستحواذ',
    summary:
      'مرافقة قانونية لصفقات اندماج واستحواذ عبر العناية الواجبة والتفاوض والموافقات التنظيمية حتى الإغلاق.',
  },
  {
    id: '2',
    title: 'تأسيس وهيكلة كيانات',
    summary:
      'تأسيس شركات وهيكلة ملكية للمستثمرين المحليين والأجانب مع استكمال التراخيص والتسجيلات النظامية.',
  },
  {
    id: '3',
    title: 'نزاعات تجارية وتحكيم',
    summary:
      'إدارة منازعات تجارية معقدة أمام المحاكم التجارية ومسارات التحكيم والوساطة بما يحفظ المصالح التجارية.',
  },
  {
    id: '4',
    title: 'حوكمة وإعادة هيكلة',
    summary:
      'بناء أطر حوكمة وإعادة تنظيم رأسمالي وتشغيلي يدعم استمرارية الأعمال وامتثال الجهات الرقابية.',
  },
]
