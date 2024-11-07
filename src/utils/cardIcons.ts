import { 
  Coins, 
  Clock, 
  Zap, 
  Sword, 
  Shield, 
  Heart, 
  Star, 
  Sparkles,
  Tag,
  Flame,
  Target,
  Bolt,
  Droplet,
  Crown,
  Skull,
  Gauge,
  LucideIcon
} from 'lucide-react'

export const attributeIcons: Record<string, { icon: LucideIcon; label: string }> = {
  BuyPrice: { icon: Coins, label: 'Buy Price' },
  SellPrice: { icon: Coins, label: 'Sell Price' },
  CooldownMax: { icon: Clock, label: 'Cooldown' },
  Multicast: { icon: Zap, label: 'Multicast' },
  DamageAmount: { icon: Sword, label: 'Damage' },
  DefenseAmount: { icon: Shield, label: 'Defense' },
  HealthAmount: { icon: Heart, label: 'Health' },
  Custom_0: { icon: Star, label: 'Special' }
}

export const tagIcons: Record<string, LucideIcon> = {
  'Damage': Sword,
  'Defense': Shield,
  'Health': Heart,
  'Utility': Star,
  'Buff': Sparkles,
  'Tag': Tag,
  'Fire': Flame,
  'Ranged': Target,
  'Lightning': Bolt,
  'Water': Droplet,
  'Royal': Crown,
  'Death': Skull,
  'Speed': Gauge
}

export function decipherCustomAttribute(key: string, value: number, tags: string[]): string {
  // Handle Custom_0 attribute based on item tags
  if (key === 'Custom_0') {
    if (tags.includes('Damage')) {
      return `${value}% Damage`
    }
    if (tags.includes('Defense')) {
      return `${value}% Defense`
    }
    if (tags.includes('Health')) {
      return `${value}% Health`
    }
    if (tags.includes('Speed')) {
      return `${value}% Speed`
    }
    // Default case if no matching tag
    return `${value}%`
  }
  
  // Return the raw value for other custom attributes
  return value.toString()
} 