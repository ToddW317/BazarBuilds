export const attributeIcons: Record<string, { icon: string; label: string }> = {
  DamageAmount: { icon: '⚔️', label: 'Damage' },
  HealAmount: { icon: '💖', label: 'Heal' },
  ShieldApplyAmount: { icon: '🛡️', label: 'Shield' },
  SlowAmount: { icon: '🐌', label: 'Slow Duration' },
  SlowTargets: { icon: '🎯', label: 'Slow Targets' },
  FreezeAmount: { icon: '❄️', label: 'Freeze Duration' },
  FreezeTargets: { icon: '🎯', label: 'Freeze Targets' },
  BuyPrice: { icon: '💰', label: 'Buy' },
  SellPrice: { icon: '💎', label: 'Sell' },
  Multicast: { icon: '🔄', label: 'Multicast' },
  Custom_0: { icon: '✨', label: 'Special' },
  PoisonAmount: { icon: '☠️', label: 'Poison' },
  BurnAmount: { icon: '🔥', label: 'Burn' }
}

export const tagIcons: Record<string, string> = {
  Weapon: '⚔️',
  Tool: '🔧',
  Food: '🍎',
  Property: '🏠',
  Vehicle: '🚗',
  Aquatic: '🌊',
  // Add more as needed
}

export function decipherCustomAttribute(key: string, value: number, itemTags: string[]): string {
  // Logic to figure out what Custom_0 means based on tags and value
  if (itemTags.includes('Weapon')) return `Damage: ${value}`
  if (itemTags.includes('Food')) return `Heal: ${value}`
  if (itemTags.includes('Tool')) return `Effect: ${value}`
  return `Value: ${value}`
} 