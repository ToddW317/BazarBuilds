export interface ItemAttributes {
  CooldownMax?: number;
  BuyPrice: number;
  SellPrice: number;
  Multicast?: number;
  DamageAmount?: number;
  Custom_0?: number;
  HealAmount?: number;
  ShieldApplyAmount?: number;
  SlowAmount?: number;
  SlowTargets?: number;
  FreezeAmount?: number;
  FreezeTargets?: number;
}

export interface ItemTier {
  AbilityIds: string[];
  Attributes: ItemAttributes;
  AuraIds: string[];
  TooltipIds: number[];
  tooltips?: {
    Content: {
      Key: string;
      Text: string;
    };
    TooltipType: string;
  }[];
}

export interface Item {
  Heroes: string[];
  Tags: string[];
  StartingTier: string;
  Size: string;
  Tiers: {
    Bronze?: ItemTier;
    Silver?: ItemTier;
    Gold?: ItemTier;
    Diamond?: ItemTier;
  };
  InternalName: string;
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
  items: {
    [key: string]: Item;
  };
  [key: string]: any;
} 