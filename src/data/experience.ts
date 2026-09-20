export interface ExperienceItem {
  id: string
  title: string
  summary: string
}

/** Anonymized themes aligned with Egyptian corporate practice — no client names or results claimed */
export const experience: ExperienceItem[] = [
  {
    id: '1',
    title: 'صفقات اندماج واستحواذ',
    summary:
      'مرافقة قانونية لصفقات اندماج واستحواذ في مصر عبر الفحص النافي للجهالة والتفاوض وموافقات المنافسة والرقابة المالية.',
  },
  {
    id: '2',
    title: 'تأسيس كيانات أمام هيئة الاستثمار',
    summary:
      'تأسيس شركات وفروع ومكاتب تمثيل للمستثمرين المحليين والأجانب واستكمال التسجيلات والتراخيص النظامية.',
  },
  {
    id: '3',
    title: 'نزاعات وتحكيم تجاري',
    summary:
      'إدارة منازعات تجارية أمام المحاكم المصرية ومسارات التحكيم بما في ذلك مركز القاهرة الإقليمي.',
  },
  {
    id: '4',
    title: 'عقود وكالة وفرنشايز',
    summary:
      'صياغة ومراجعة عقود الوكالة والتوزيع والامتياز التجاري بما يتوافق مع قانون التجارة المصري.',
  },
]
