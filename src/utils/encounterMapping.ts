import { encounters } from '@/data/encounters'

interface Monster {
  Items?: {
    ItemID: string;
    Name: string;
    Tier: string;
    Enchant: string | null;
    DropRate?: number;
  }[];
  Level: number;
}

export interface EncounterInfo {
  name: string;
  level: number;
  dropRate?: number;
}

export interface ItemEncounters {
  [itemId: string]: EncounterInfo[];
}

export const getItemEncounters = (): ItemEncounters => {
  const itemEncounters: ItemEncounters = {};

  encounters.forEach(encounter => {
    encounter.monsters.forEach((monster: Monster) => {
      monster.Items?.forEach(item => {
        if (!itemEncounters[item.ItemID]) {
          itemEncounters[item.ItemID] = [];
        }

        itemEncounters[item.ItemID].push({
          name: encounter.name,
          level: monster.Level,
          dropRate: item.DropRate
        });
      });
    });
  });

  // Sort encounters by level for each item
  Object.keys(itemEncounters).forEach(itemId => {
    itemEncounters[itemId].sort((a, b) => a.level - b.level);
  });

  return itemEncounters;
}; 