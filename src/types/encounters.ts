export interface Tooltip {
  text: string;
  color?: string;
  icon?: string;
}

export interface TierData {
  Tooltips?: string[];
  AdditionalTooltips?: string[];
  Attributes?: Record<string, any>;
}

export interface Item {
  id: string;
  InternalName: string;
  Size: string;
  Heroes: string[];
  Tags: string[];
  StartingTier: string;
  Tiers: {
    [key: string]: {
      Tooltips?: string[];
      AdditionalTooltips?: string[];
      Attributes?: Record<string, any>;
    };
  };
  // Add other properties as needed
}
