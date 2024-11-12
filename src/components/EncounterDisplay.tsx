'use client'

import { useState } from 'react'
import { ChevronDown, Shield, Heart, Skull, Sword, Sparkles } from 'lucide-react'
import Image from 'next/image'
import encounterData from '@/data/out.json'
import SkillCard from '@/components/SkillCard'
import CardDisplay from '@/components/CardDisplay'
import { items } from '../../data.js'

interface Skill {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  heroes: string[];
  unlockLevel: number;
  startingTier: string;
  tiers: {
    [key: string]: {
      Attributes: {
        Damage?: number;
        Shield?: number;
        Healing?: number;
        Duration?: number;
        Cooldown?: number;
      };
      Tooltips: string[];
      AbilityIds: string[];
    };
  };
  buyPrice: number;
}

interface MonsterItem {
  ItemID: string;
  InternalName: string;
  Size?: string;
  Heroes?: string[];
  DropRate?: number;
}

interface EncounterDisplayProps {
  name: string;
  monster: any;
  isExpanded: boolean;
  onToggle: () => void;
}

interface MonsterSkillData {
  SkillID: string;
  Name: string;
  Description?: string;
  Tier?: string;
  Damage?: number;
  Shield?: number;
  Healing?: number;
  Duration?: number;
  Cooldown?: number;
}

// Update the MonsterSkill interface to match the data we receive
interface MonsterSkill {
  Name: string;
  SkillID: string;
  Description?: string;
  Tier?: string;
  Damage?: number;
  Shield?: number;
  Healing?: number;
  Duration?: number;
  Cooldown?: number;
}

// Update the SkillsData interface to better match out.json structure
interface SkillsData {
  [key: string]: {
    Heroes: string[];
    StartingTier: string;
    Tiers: {
      [key: string]: {
        AbilityIds: string[];
        Attributes: {
          [key: string]: any;
          BuyPrice?: number;
          DamageAmount?: number;
          ShieldAmount?: number;
          HealAmount?: number;
          CooldownMax?: number;
          Duration?: number;
          Multicast?: number;
        };
        AuraIds: string[];
        TooltipIds: number[];
        Tooltips: string[];
      };
    };
    InternalID: string;
    Name: string;
    ArtKey: string;
  };
}

// Update the mapTierData function
const mapTierData = (tierStats: TierStats, item: ItemData) => {
  const itemData = encounterData.items[item.id as keyof typeof encounterData.items];
  const tierData = itemData?.Tiers[tierStats.tier as keyof typeof itemData.Tiers];
  
  // Only include price attributes if they're not already in tierStats
  const attributes = {
    ...tierStats,
    ...(tierData?.Attributes || {})
  };

  // Remove duplicate price fields
  if (tierData?.Attributes?.BuyPrice) {
    delete attributes.buyPrice;
  }
  if (tierData?.Attributes?.SellPrice) {
    delete attributes.sellPrice;
  }

  // Get all tooltips from the tier data
  const tooltips = [
    // Get regular tooltips (lowercase)
    ...(tierData?.tooltips || []),
    // Get any additional tooltip arrays
    ...Object.entries(tierData || {})
      .filter(([key, value]) => 
        key.toLowerCase().includes('tooltip') && 
        Array.isArray(value) &&
        key !== 'tooltips' &&
        key !== 'TooltipIds'
      )
      .flatMap(([_, tooltipArray]) => tooltipArray)
  ].filter(tooltip => 
    typeof tooltip === 'string' && 
    tooltip.trim() !== ''
  );

  return {
    Attributes: attributes,
    Tooltips: tooltips,
    AbilityIds: tierData?.AbilityIds || []
  };
};

// Update the mapMonsterSkillToSkillFormat function
const mapMonsterSkillToSkillFormat = (monsterSkill: MonsterSkill): Skill => {
  const skillData = (encounterData.skills as unknown as SkillsData)[monsterSkill.SkillID];
  const tier = monsterSkill.Tier || 'Gold';
  const tierData = skillData?.Tiers[tier];

  // Get all tooltips, including both direct tooltips and any that include "tooltip" in the key
  const tooltips = [
    ...(tierData?.Tooltips || []),
    ...Object.entries(tierData || {})
      .filter(([key, value]) => 
        key.toLowerCase().includes('tooltip') && 
        Array.isArray(value) &&
        key !== 'Tooltips' &&
        key !== 'TooltipIds'
      )
      .flatMap(([_, tooltipArray]) => tooltipArray)
  ].filter(tooltip => 
    typeof tooltip === 'string' && 
    tooltip.trim() !== ''
  );

  return {
    id: monsterSkill.SkillID,
    name: monsterSkill.Name,
    // Use the skillData.ArtKey directly without the "Icon_Skill_" prefix as it's already in the filename
    image: skillData?.ArtKey ? `/skills/${skillData.ArtKey}.png` : '',
    description: monsterSkill.Description || tooltips[0] || '',
    type: 'Active',
    heroes: skillData?.Heroes || [],
    unlockLevel: 1,
    startingTier: skillData?.StartingTier || tier,
    tiers: {
      [tier]: {
        Attributes: {
          BuyPrice: tierData?.Attributes?.BuyPrice,
          DamageAmount: monsterSkill.Damage || tierData?.Attributes?.DamageAmount,
          ShieldAmount: monsterSkill.Shield || tierData?.Attributes?.ShieldAmount,
          HealAmount: monsterSkill.Healing || tierData?.Attributes?.HealAmount,
          Duration: monsterSkill.Duration || tierData?.Attributes?.Duration,
          CooldownMax: monsterSkill.Cooldown || tierData?.Attributes?.CooldownMax,
          ...tierData?.Attributes
        },
        Tooltips: tooltips,
        AbilityIds: tierData?.AbilityIds || []
      }
    },
    buyPrice: tierData?.Attributes?.BuyPrice || 0
  };
};

export default function EncounterDisplay({ name, monster, isExpanded, onToggle }: EncounterDisplayProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-semibold text-white">
            {name}
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-yellow-400">
              <Sparkles className="w-4 h-4" />
              Level {monster.Level}
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <Heart className="w-4 h-4" />
              {monster.Health} HP
            </span>
            {monster.Skills?.length > 0 && (
              <span className="flex items-center gap-1.5 text-purple-400">
                <Sword className="w-4 h-4" />
                {monster.Skills.length} Skills
              </span>
            )}
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-gray-700 space-y-8">
          {/* Monster Skills */}
          {monster.Skills?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monster.Skills?.map((skill: MonsterSkill, index: number) => (
                  <div key={`${name}-${monster.Level}-${skill.SkillID}-${index}`} className="flex-none">
                    <SkillCard skill={mapMonsterSkillToSkillFormat(skill)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monster Items/Rewards */}
          {monster.Items?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Possible Rewards ({monster.Items.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {monster.Items.map((monsterItem: MonsterItem, index: number) => {
                  const item = items.find(i => i.id === monsterItem.ItemID);
                  if (!item) return null;

                  // Create a more unique key using monster name, item ID and index
                  const uniqueKey = `${name}-${monsterItem.ItemID}-${index}`;

                  return (
                    <div key={uniqueKey} className="relative transform scale-90 origin-top-left">
                      {monsterItem.DropRate && (
                        <div className="absolute top-1 right-1 z-10 bg-yellow-500/90 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                          {(monsterItem.DropRate * 100).toFixed(1)}%
                        </div>
                      )}
                      <CardDisplay 
                        item={{
                          id: item.id,
                          InternalName: item.name,
                          Size: item.size,
                          Heroes: item.heroes,
                          StartingTier: item.startingTier,
                          Tags: item.tags,
                          // Ensure image path is properly formatted - remove any special characters
                          ArtKey: item.image?.replace(/[#]/g, ''),
                          Tiers: Object.entries(item.tiers).reduce((acc, [tier, stats]) => ({
                            ...acc,
                            [tier]: mapTierData({ ...stats, tier }, item)
                          }), {})
                        }}
                        itemId={monsterItem.ItemID}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}