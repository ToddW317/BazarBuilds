export interface Loot {
  name: string;
  size: 'Small' | 'Medium' | 'Large';
  type?: 'Weapon' | 'Tool' | 'Food' | 'Potion' | 'Property' | 'Friend' | 'Aquatic' | 'Vehicle';
  castTime?: number;
  effect: string;
  additionalEffect?: string;
  critChance?: number;
  quantity?: number;
}

export interface Encounter {
  id: string;
  name: string;
  level: number;
  imageUrl: string;
  skill?: {
    name: string;
    effect: string;
  };
  loot: Loot[];
} 