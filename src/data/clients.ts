/**
 * Client marks for the homepage marquee.
 * PLACEHOLDER — replace `mark` / `name` with real client logos when available.
 */
export type Client = {
  id: string
  /** Short monogram shown in the mark tile */
  mark: string
  /** Display name beside the mark */
  name: string
}

export const clients: Client[] = [
  { id: '1', mark: 'ن', name: 'مجموعة النيل' },
  { id: '2', mark: 'أ', name: 'أفق للاستثمار' },
  { id: '3', mark: 'ع', name: 'دار العمران' },
  { id: '4', mark: 'ق', name: 'قنوات للتجارة' },
  { id: '5', mark: 'و', name: 'واحة الطاقة' },
  { id: '6', mark: 'س', name: 'سماء للاتصالات' },
  { id: '7', mark: 'ج', name: 'جسر المالية' },
  { id: '8', mark: 'ر', name: 'ريادة للصناعة' },
]
