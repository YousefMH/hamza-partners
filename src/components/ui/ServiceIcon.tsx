import {
  Building2,
  Building,
  Copyright,
  Factory,
  FilePen,
  Gavel,
  HeartPulse,
  Hotel,
  Landmark,
  LineChart,
  MonitorSmartphone,
  Receipt,
  RefreshCw,
  Scale,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  'file-pen': FilePen,
  scale: Scale,
  'building-2': Building2,
  factory: Factory,
  'shield-alert': ShieldAlert,
  'refresh-cw': RefreshCw,
  gavel: Gavel,
  receipt: Receipt,
  copyright: Copyright,
  landmark: Landmark,
  'line-chart': LineChart,
  hotel: Hotel,
  building: Building,
  'heart-pulse': HeartPulse,
  'monitor-smartphone': MonitorSmartphone,
}

export function ServiceIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = iconMap[name] ?? Scale
  return <Icon className={className} strokeWidth={1.25} aria-hidden="true" />
}
