export const siteConfig = {
  firmNameAr: 'حمزة وشركاؤه',
  firmNameEn: 'Hamza & Partners',
  /** Year the firm was founded — used for heritage marketing copy */
  foundedYear: 1935,
  tagline: 'شراكة قانونية تتجاوز حدود الاستشارة',
  /** Hero H1 primary line — founding year as the lead claim */
  heroHeadline: 'منذ 1935',
  /** Hero H1 secondary line */
  heroHeadlineAccent: 'شراكة قانونية تصنع الفارق',
  description:
    'مكتب محاماة مصري تأسس عام 1935 — نقدّم حلولًا قانونية متكاملة للشركات والمستثمرين والأفراد، بخبرة متراكمة وفهم دقيق للأعمال.',
  url: 'https://yousefmh.github.io/hamza-partners',
  // PLACEHOLDER — replace with real contact details
  contact: {
    phone: '+20 2 0000 0000',
    phoneHref: 'tel:+20200000000',
    whatsapp: '+20 100 000 0000',
    whatsappHref: 'https://wa.me/201000000000',
    email: 'info@hamza-partners.example',
    address: 'وسط البلد، القاهرة، جمهورية مصر العربية',
    hours: 'الأحد – الخميس: 9:00 ص – 6:00 م',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Cairo%20Egypt&t=&z=13&ie=UTF8&iwloc=&output=embed',
  },
  social: {
    linkedin: 'https://www.linkedin.com/',
    twitter: 'https://x.com/',
  },
  heroImage:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80',
  featuredImage:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80',
  nav: [
    { label: 'الرئيسية', href: '/#home' },
    { label: 'مجالات العمل', href: '/#services' },
    { label: 'فريق العمل', href: '/#team' },
    { label: 'الخبرات', href: '/#experience' },
    { label: 'المقالات', href: '/#articles' },
    { label: 'تواصل معنا', href: '/#contact' },
  ],
  cta: {
    book: 'احجز استشارة',
    bookFull: 'احجز استشارتك',
    contact: 'تواصل معنا',
    discoverServices: 'اكتشف مجالات عملنا',
    discoverMore: 'اكتشف المزيد',
    viewProfile: 'عرض الملف',
    readArticle: 'اقرأ المقال',
    submit: 'إرسال الطلب',
  },
} as const

export type SiteConfig = typeof siteConfig
