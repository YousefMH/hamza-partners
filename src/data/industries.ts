import type { ServiceCategory } from '@/data/services'

export interface Industry {
  id: string
  name: string
  /** Closest practice category for Services filter bridge */
  category: ServiceCategory
}

export const industries: Industry[] = [
  { id: '1', name: 'الشركات', category: 'corporate' },
  { id: '2', name: 'الاستثمار', category: 'corporate' },
  { id: '3', name: 'العقارات', category: 'real-estate' },
  { id: '4', name: 'البنوك والتمويل', category: 'finance' },
  { id: '5', name: 'السياحة والضيافة', category: 'corporate' },
  { id: '6', name: 'الرعاية الصحية', category: 'regulatory' },
  { id: '7', name: 'التكنولوجيا', category: 'regulatory' },
  { id: '8', name: 'الصناعات', category: 'corporate' },
  { id: '9', name: 'الأسواق المالية', category: 'finance' },
]
