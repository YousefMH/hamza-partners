import {
  Briefcase,
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
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  'building-2': Building2,
  'file-pen': FilePen,
  users: Users,
  'shield-check': ShieldCheck,
  'git-merge': GitMerge,
  handshake: Handshake,
  'refresh-cw': RefreshCw,
  globe: Globe,
  gavel: Gavel,
  scale: Scale,
  copyright: Copyright,
  landmark: Landmark,
  'line-chart': LineChart,
  receipt: Receipt,
  briefcase: Briefcase,
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
