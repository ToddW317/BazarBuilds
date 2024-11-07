export interface Tooltip {
  Content: {
    Key: string;
    Text: string;
  };
  TooltipType: string;
}

export interface ItemTier {
  AbilityIds: string[];
  Attributes: {
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
    BurnApplyAmount?: number;
    PoisonAmount?: number;
    [key: string]: number | undefined;
  };
  AuraIds: string[];
  TooltipIds: number[];
  tooltips: string[] | Tooltip[];
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
  Heroes: string[];
  Tags: string[];
  StartingTier: string;
  Size: string;
  Tiers: {
    [key: string]: ItemTier;
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
  items: Record<string, Item>;
  monsters: Record<string, Encounter>;
  skills: Record<string, Skill>;
} 