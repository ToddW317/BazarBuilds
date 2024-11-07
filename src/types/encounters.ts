interface Tooltip {
  Content: TooltipContent;
  TooltipType: string;
}

export interface ItemAttributes {
  CooldownMax?: number;
  BuyPrice?: number;
  SellPrice?: number;
  Multicast?: number;
  DamageAmount?: number;
  PoisonApplyAmount?: number;
  Custom_0?: number;
  [key: string]: number | undefined;
}

export interface ItemTier {
  AbilityIds: string[];
  Attributes: ItemAttributes;
  AuraIds: never[] | string[];
  TooltipIds: number[];
  tooltips: (string | Tooltip | null)[];
}

export interface SkillTier {
  AbilityIds: string[];
  Attributes: {
    [key: string]: number;
  };
  AuraIds: string[];
  TooltipIds: number[];
  Tooltips: string[];
}

export interface Skill {
  Heroes: string[];
  StartingTier: string;
  Tiers: {
    [key: string]: SkillTier;
  };
  InternalID: string;
  Name: string;
}

export interface Item {
  InternalName: string;
  StartingTier: string;
  Size: string;
  ArtKey: string;
  Tags: string[];
  Heroes: string[];
  Tiers: Record<string, TierData>;
  images: string[];
  changelog?: ChangeLogEntry[];
}

export interface EncounterItem {
  Name: string;
  Tier: string;
  Enchant: string | null;
  ItemID: string;
}

export interface EncounterSkill {
  Name: string;
  Tier: string;
  SkillID: string;
}

export interface Encounter {
  name: string;
  Health: number;
  Level: number;
  Items: EncounterItem[];
  Skills: EncounterSkill[];
}
export interface EncounterData {
  items: Record<string, Item>;
  monsters: Record<string, Encounter>;
  skills: Record<string, Skill>;
}

interface TierData {
  Attributes: Record<string, any>;
  tooltips?: Tooltip[];
}

interface TooltipContent {
  Text?: string;
}

export type CachedItems = Record<string, Item>

interface ChangeLogEntry {
  date: string;
  changes: string;
}
