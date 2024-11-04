export interface Loot {
  name: string;
  size: 'Small' | 'Medium' | 'Large';
  type?: string;
  castTime?: number;
  effect: string;
  additionalEffect?: string;
  critChance?: number;
  quantity?: number;
}

export interface Skill {
  name: string;
  effect: string;
}

export interface Encounter {
  id: string;
  name: string;
  level: number;
  imageUrl: string;
  skill?: Skill;
  loot: Loot[];
} 