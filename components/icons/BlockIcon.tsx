import {
  Handshake,
  Settings2,
  Layers,
  Lightbulb,
  MessageCircle,
  Share2,
  Target,
  ArrowDownRight,
  ArrowUpRight,
  LucideProps,
} from 'lucide-react';
import { BMCBlockKey } from '@/lib/types';

const iconMap: Record<BMCBlockKey, React.ComponentType<LucideProps>> = {
  keyPartnerships: Handshake,
  keyActivities: Settings2,
  keyResources: Layers,
  valuePropositions: Lightbulb,
  customerRelationships: MessageCircle,
  channels: Share2,
  customerSegments: Target,
  costStructure: ArrowDownRight,
  revenueStreams: ArrowUpRight,
};

interface BlockIconProps extends Omit<LucideProps, 'ref'> {
  blockKey: BMCBlockKey;
}

export default function BlockIcon({ blockKey, size = 14, ...props }: BlockIconProps) {
  const Icon = iconMap[blockKey];
  return <Icon size={size} strokeWidth={2} {...props} />;
}
