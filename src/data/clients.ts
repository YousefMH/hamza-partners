import { appUrl } from '@/lib/paths'

/**
 * Client logos for the homepage marquee.
 *
 * IMPORTANT: Replace these with the firm’s verified client marks before
 * presenting the site as an official client roster. The brands below are
 * real logo marks used for layout; confirm legal clearance for each.
 */
export type Client = {
  id: string
  name: string
  /** Path under `public/` (resolved with Vite base via appUrl) */
  logo: string
}

export const clients: Client[] = [
  { id: 'microsoft', name: 'Microsoft', logo: 'clients/microsoft.svg' },
  { id: 'amazon', name: 'Amazon', logo: 'clients/amazon.svg' },
  { id: 'google', name: 'Google', logo: 'clients/google.svg' },
  { id: 'ibm', name: 'IBM', logo: 'clients/ibm.svg' },
  { id: 'siemens', name: 'Siemens', logo: 'clients/siemens.svg' },
  { id: 'samsung', name: 'Samsung', logo: 'clients/samsung.svg' },
  { id: 'vodafone', name: 'Vodafone', logo: 'clients/vodafone.svg' },
  { id: 'orange', name: 'Orange', logo: 'clients/orange.svg' },
  { id: 'hsbc', name: 'HSBC', logo: 'clients/hsbc.svg' },
  { id: 'mastercard', name: 'Mastercard', logo: 'clients/mastercard.svg' },
  { id: 'unilever', name: 'Unilever', logo: 'clients/unilever.svg' },
  { id: 'adobe', name: 'Adobe', logo: 'clients/adobe.svg' },
]

export function clientLogoUrl(logo: string): string {
  return appUrl(`/${logo}`)
}
