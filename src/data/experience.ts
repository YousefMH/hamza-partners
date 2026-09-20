export interface ExperienceItem {
  id: string
  title: string
  summary: string
}

// PLACEHOLDER — anonymized experience themes only; no client names or results claimed
export const experience: ExperienceItem[] = [
  {
    id: '1',
    title: 'استحواذات واندماجات',
    summary:
      'مرافقة قانونية لصفقات استحواذ واندماج عبر مراحل العناية الواجبة والتفاوض والإغلاق.',
  },
  {
    id: '2',
    title: 'مشروعات استثمارية',
    summary:
      'هيكلة ودعم مشروعات استثمارية متعددة القطاعات مع مراعاة الامتثال والمخاطر التعاقدية.',
  },
  {
    id: '3',
    title: 'نزاعات تجارية',
    summary:
      'إدارة منازعات تجارية معقدة عبر التقاضي والتحكيم مع التركيز على حماية المصالح التجارية.',
  },
  {
    id: '4',
    title: 'إعادة هيكلة شركات',
    summary:
      'تصميم مسارات إعادة هيكلة تحفظ استمرارية الأعمال وتوازن حقوق الأطراف ذات العلاقة.',
  },
]
