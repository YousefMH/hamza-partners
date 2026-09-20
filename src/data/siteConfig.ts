export const siteConfig = {
  firmNameAr: 'حمزة وشركاؤه',
  firmNameEn: 'Hamza & Partners',
  tagline: 'شراكة قانونية تتجاوز حدود الاستشارة',
  description:
    'نقدم حلولًا قانونية متكاملة للشركات والمستثمرين والأفراد، تجمع بين الخبرة القانونية العميقة والفهم الدقيق للأعمال والأسواق.',
  url: 'https://hamza-partners.example',
  // PLACEHOLDER — replace with real contact details
  contact: {
    phone: '+966 11 000 0000',
    phoneHref: 'tel:+966110000000',
    whatsapp: '+966 50 000 0000',
    whatsappHref: 'https://wa.me/966500000000',
    email: 'info@hamza-partners.example',
    address: 'برج الأعمال، طريق الملك فهد، الرياض، المملكة العربية السعودية',
    hours: 'الأحد – الخميس: 9:00 ص – 6:00 م',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Riyadh%20Saudi%20Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed',
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
    { label: 'الرئيسية', href: '#home' },
    { label: 'من نحن', href: '#about' },
    { label: 'مجالات العمل', href: '#services' },
    { label: 'فريق العمل', href: '#team' },
    { label: 'الخبرات', href: '#experience' },
    { label: 'المقالات', href: '#articles' },
    { label: 'تواصل معنا', href: '#contact' },
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
