export type ServiceCategory =
  | 'corporate'
  | 'disputes'
  | 'finance'
  | 'sector'
  | 'regulatory'

export interface Service {
  id: string
  number: string
  title: string
  shortDescription: string
  description: string
  icon: string
  slug: string
  featured: boolean
  category: ServiceCategory
}

export const services: Service[] = [
  {
    id: '01',
    number: '01',
    title: 'صياغة الاتفاقيات في ضوء التدفقات الاستثمارية وإدارتها',
    shortDescription:
      'صياغة وإدارة اتفاقيات الاستثمار بما يحمي حقوق الأطراف ويواكب التدفقات الرأسمالية.',
    description:
      'نرافق المستثمرين والشركات في صياغة الاتفاقيات الاستثمارية وإدارتها عبر دورة الصفقة كاملة، من التفاوض الأولي حتى التنفيذ والمتابعة، مع مراعاة هيكلة المخاطر والحوكمة والمتطلبات التنظيمية.',
    icon: 'file-pen',
    slug: 'investment-agreements',
    featured: false,
    category: 'corporate',
  },
  {
    id: '02',
    number: '02',
    title: 'الوساطة والتحكيم وتسوية المنازعات الدولية',
    shortDescription:
      'تمثيل وتسوية المنازعات عبر الوساطة والتحكيم المحلي والدولي بكفاءة عالية.',
    description:
      'نوفر تمثيلًا متخصصًا في الوساطة والتحكيم وتسوية المنازعات العابرة للحدود، مع استراتيجيات عملية تحفظ المصالح التجارية وتقلل من تكلفة النزاع ومدته.',
    icon: 'scale',
    slug: 'mediation-arbitration',
    featured: false,
    category: 'disputes',
  },
  {
    id: '03',
    number: '03',
    title: 'حوكمة الشركات والاندماجات والاستحواذات',
    shortDescription:
      'إرشاد استراتيجي في الحوكمة وهيكلة صفقات الاندماج والاستحواذ بأعلى درجات الدقة.',
    description:
      'نقدّم استشارات متعمقة في حوكمة الشركات وهيكلة الاندماجات والاستحواذات، بما يشمل العناية الواجبة، التفاوض، الاتفاقيات الجوهرية، والموافقات التنظيمية — لتمكين صفقات آمنة ومتوافقة مع أهداف الأعمال.',
    icon: 'building-2',
    slug: 'corporate-governance-ma',
    featured: true,
    category: 'corporate',
  },
  {
    id: '04',
    number: '04',
    title: 'المشروعات الصناعية والتجارية وخدمات الشركات',
    shortDescription:
      'دعم قانوني شامل لتأسيس وتشغيل المشروعات الصناعية والتجارية وخدمات الشركات.',
    description:
      'نرافق تأسيس وتشغيل المشروعات الصناعية والتجارية عبر الاستشارات التنظيمية، العقود التشغيلية، الشراكات، والامتثال المستمر لاحتياجات الأعمال.',
    icon: 'factory',
    slug: 'industrial-commercial-projects',
    featured: false,
    category: 'sector',
  },
  {
    id: '05',
    number: '05',
    title: 'الجرائم المالية وجرائم الشركات',
    shortDescription:
      'دفاع واستشارات في قضايا الجرائم المالية وجرائم الشركات والامتثال الجنائي.',
    description:
      'نتعامل مع قضايا الجرائم المالية وجرائم الشركات بحساسية عالية، مع التركيز على التحقيقات الداخلية، الدفاع الجنائي، والامتثال الوقائي.',
    icon: 'shield-alert',
    slug: 'financial-corporate-crime',
    featured: false,
    category: 'disputes',
  },
  {
    id: '06',
    number: '06',
    title: 'إعادة الهيكلة والإعسار والإفلاس',
    shortDescription:
      'حلول قانونية لإعادة الهيكلة وإدارة الإعسار والإفلاس وحماية مصالح الدائنين والمدينين.',
    description:
      'نصمّم مسارات إعادة الهيكلة والإعسار بما يوازن بين استمرارية الأعمال وحقوق الأطراف، مع تمثيل فعّال أمام الجهات المختصة.',
    icon: 'refresh-cw',
    slug: 'restructuring-insolvency',
    featured: false,
    category: 'corporate',
  },
  {
    id: '07',
    number: '07',
    title: 'التقاضي والمنازعات',
    shortDescription:
      'تمثيل قضائي قوي في المنازعات التجارية والمدنية أمام المحاكم واللجان.',
    description:
      'نقدّم تمثيلًا قضائيًا متكاملًا في المنازعات التجارية والمدنية، مع استراتيجية واضحة من مرحلة ما قبل الدعوى حتى التنفيذ.',
    icon: 'gavel',
    slug: 'litigation-disputes',
    featured: false,
    category: 'disputes',
  },
  {
    id: '08',
    number: '08',
    title: 'المعاملات والاستشارات الضريبية',
    shortDescription:
      'استشارات ضريبية للمعاملات وهيكلة الأعمال والامتثال للأنظمة الضريبية.',
    description:
      'نساعد العملاء على هيكلة معاملاتهم بوعي ضريبي، ومعالجة النزاعات والامتثال للمتطلبات الضريبية المعمول بها.',
    icon: 'receipt',
    slug: 'tax-advisory',
    featured: false,
    category: 'finance',
  },
  {
    id: '09',
    number: '09',
    title: 'الملكية الفكرية',
    shortDescription:
      'حماية وتسجيل وإنفاذ حقوق الملكية الفكرية للعلامات والبراءات والمصنفات.',
    description:
      'نوفر حماية شاملة لحقوق الملكية الفكرية، من التسجيل والعقود الترخيصية إلى الإنفاذ ومكافحة التعدي.',
    icon: 'copyright',
    slug: 'intellectual-property',
    featured: false,
    category: 'regulatory',
  },
  {
    id: '10',
    number: '10',
    title: 'الخدمات المصرفية والتمويل',
    shortDescription:
      'استشارات في التمويل المصرفي وهيكلة التسهيلات والضمانات والمعاملات الائتمانية.',
    description:
      'نرافق البنوك والمقترضين في هيكلة التمويلات والضمانات والاتفاقيات الائتمانية بما يحقق الأمان القانوني والكفاءة التجارية.',
    icon: 'landmark',
    slug: 'banking-finance',
    featured: false,
    category: 'finance',
  },
  {
    id: '11',
    number: '11',
    title: 'أسواق المال',
    shortDescription:
      'دعم قانوني لإصدارات الأوراق المالية والطرح والامتثال لأنظمة أسواق المال.',
    description:
      'نقدّم استشارات متخصصة في أسواق المال، بما يشمل الطروحات والإفصاح والحوكمة والامتثال لمتطلبات الجهات الرقابية.',
    icon: 'line-chart',
    slug: 'capital-markets',
    featured: false,
    category: 'finance',
  },
  {
    id: '12',
    number: '12',
    title: 'قطاع الضيافة والسياحة',
    shortDescription:
      'خدمات قانونية متخصصة لمشروعات الضيافة والسياحة والعقود التشغيلية.',
    description:
      'ندعم مشغّلي ومطوري قطاع الضيافة والسياحة في العقود، التراخيص، الشراكات، والامتثال التنظيمي.',
    icon: 'hotel',
    slug: 'hospitality-tourism',
    featured: false,
    category: 'sector',
  },
  {
    id: '13',
    number: '13',
    title: 'العقارات',
    shortDescription:
      'استشارات وصفقات عقارية تشمل التطوير والتمويل والمعاملات والعقود.',
    description:
      'نغطي المعاملات العقارية من الشراء والبيع إلى التطوير والتمويل والعقود التشغيلية، مع إدارة المخاطر القانونية المرتبطة.',
    icon: 'building',
    slug: 'real-estate',
    featured: false,
    category: 'sector',
  },
  {
    id: '14',
    number: '14',
    title: 'القطاع الطبي والرعاية الصحية',
    shortDescription:
      'استشارات قانونية لمؤسسات الرعاية الصحية والامتثال والتنظيم الطبي.',
    description:
      'نساعد مقدّمي الرعاية الصحية على الامتثال التنظيمي، العقود، الشراكات، وإدارة المخاطر القانونية للقطاع الطبي.',
    icon: 'heart-pulse',
    slug: 'healthcare',
    featured: false,
    category: 'sector',
  },
  {
    id: '15',
    number: '15',
    title: 'الجرائم الإلكترونية',
    shortDescription:
      'تعامل متخصص مع قضايا الجرائم الإلكترونية وحماية البيانات والأمن السيبراني.',
    description:
      'نتعامل مع قضايا الجرائم الإلكترونية وحماية البيانات والاستجابة للحوادث السيبرانية بإطار قانوني واضح وسريع.',
    icon: 'monitor-smartphone',
    slug: 'cybercrime',
    featured: false,
    category: 'regulatory',
  },
]

export const featuredService = services.find((s) => s.featured)!

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
