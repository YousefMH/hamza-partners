import {
  Briefcase,
  Building,
  Building2,
  Copyright,
  FilePen,
  Gavel,
  GitMerge,
  Globe,
  Handshake,
  Landmark,
  LineChart,
  Receipt,
  RefreshCw,
  Scale,
  Users,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  'building-2': Building2,
  'file-pen': FilePen,
  users: Users,
  'git-merge': GitMerge,
  handshake: Handshake,
  globe: Globe,
  'refresh-cw': RefreshCw,
  gavel: Gavel,
  scale: Scale,
  copyright: Copyright,
  landmark: Landmark,
  'line-chart': LineChart,
  receipt: Receipt,
  briefcase: Briefcase,
  building: Building,
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
