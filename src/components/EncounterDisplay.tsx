'use client'

import { useState } from 'react'
import { ChevronDown, Shield, Heart, Skull, Sword, Sparkles } from 'lucide-react'
import Image from 'next/image'
import encounterData from '@/data/out.json'
import SkillCard from '@/components/SkillCard'
import CardDisplay from '@/components/CardDisplay'
import { Item } from '@/types/encounters'

interface MonsterItem {
  Name: string;
  Tier: string;
  Enchant: string | null;
  ItemID: string;
}

interface MonsterSkill {
  Name: string;
  SkillID: string;
  Tier: string;
}

interface SkillData {
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
        [key: string]: any;
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

interface EncounterDisplayProps {
  name: string;
  monster: {
    Level: number;
    Health: number;
    Skills?: MonsterSkill[];
    Items?: MonsterItem[];
  };
  isExpanded: boolean;
  onToggle: () => void;
}

interface EncounterData {
  items: {
    [key: string]: Item;
  };
  skills: {
    [key: string]: SkillData;
  };
  monsters: {
    [key: string]: MonsterData;
  };
}

const findItemById = (itemId: string): Item | undefined => {
  try {
    const itemData = (encounterData as EncounterData).items[itemId];
    
    if (!itemData) {
      console.log('Item not found:', itemId);
      return undefined;
    }

    return {
      id: itemId,
      InternalName: itemData.InternalName || '',
      Size: itemData.Size || 'Small',
      Heroes: itemData.Heroes || [],
      Tags: itemData.Tags || [],
      Tiers: itemData.Tiers || {},
      StartingTier: itemData.StartingTier || 'Bronze',
      ArtKey: itemData.ArtKey || '',
      Enchantments: itemData.Enchantments || {}
    };
  } catch (error) {
    console.error('Error finding item:', itemId, error);
    return undefined;
  }
};

const findSkillById = (skillId: string): SkillData | undefined => {
  try {
    const skillData = (encounterData as EncounterData).skills[skillId];
    
    if (!skillData) {
      console.log('Skill not found:', skillId);
      return undefined;
    }

    const defaultTier = skillData.StartingTier || 'Bronze';
    const tierData = skillData.Tiers?.[defaultTier];

    return {
      id: skillId,
      name: skillData.Name || '',
      description: tierData?.Tooltips?.[0] || '',
      image: skillData.ArtKey ? `/skills/${skillData.ArtKey}` : '',
      type: 'Active',
      heroes: skillData.Heroes || [],
      unlockLevel: 1,
      startingTier: defaultTier,
      tiers: skillData.Tiers || {},
      buyPrice: tierData?.Attributes?.BuyPrice || 0
    };
  } catch (error) {
    console.error('Error finding skill:', skillId, error);
    return undefined;
  }
};

export default function EncounterDisplay({ name, monster, isExpanded, onToggle }: EncounterDisplayProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Header Button */}
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
            {monster.Skills && monster.Skills.length > 0 && (
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

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 border-t border-gray-700 space-y-8">
          {/* Monster Skills */}
          {monster.Skills && monster.Skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Sword className="w-5 h-5 text-purple-400" />
                Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monster.Skills.map((skill, index) => {
                  const skillData = findSkillById(skill.SkillID);
                  if (!skillData) return null;

                  return (
                    <div key={`${skill.SkillID}-${index}`} className="flex-none">
                      <SkillCard skill={skillData} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Monster Items/Rewards */}
          {monster.Items && monster.Items.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Possible Rewards ({monster.Items.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {monster.Items.map((monsterItem, index) => {
                  const item = findItemById(monsterItem.ItemID);
                  if (!item) return null;

                  const dropRate = 1 / monster.Items!.length;

                  return (
                    <div key={`${monsterItem.ItemID}-${index}`} className="group relative">
                      <div className="absolute top-2 right-2 z-10 bg-black/75 text-yellow-400 
                        text-xs font-bold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm">
                        {(dropRate * 100).toFixed(1)}%
                      </div>
                      {monsterItem.Enchant && (
                        <div className="absolute top-2 left-2 z-10 bg-purple-500/90 
                          text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          {monsterItem.Enchant}
                        </div>
                      )}
                      <div className="transform transition-transform group-hover:scale-105">
                        <CardDisplay 
                          item={item}
                          itemId={monsterItem.ItemID}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}