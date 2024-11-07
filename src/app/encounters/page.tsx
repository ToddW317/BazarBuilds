'use client'

import { useState, useMemo } from 'react'
import { Encounter, EncounterData, Item, ExtendedItem, Tooltip, Skill } from '@/types/encounters'
import encounterData from '@/data/out.json'
import WIPBadge from '@/components/WIPBadge'
import CreditBanner from '@/components/CreditBanner'
import { attributeIcons, tagIcons, decipherCustomAttribute } from '@/utils/cardIcons'

const heroColors = {
  'Jules': {
    bg: 'bg-orange-900/20',
    text: 'text-orange-300',
    ring: 'ring-orange-500/50'
  },
  'Dooley': {
    bg: 'bg-cyan-900/20',
    text: 'text-cyan-300',
    ring: 'ring-cyan-500/50'
  },
  'Stelle': {
    bg: 'bg-yellow-900/20',
    text: 'text-yellow-300',
    ring: 'ring-yellow-500/50'
  },
  'Pygmalien': {
    bg: 'bg-emerald-900/20',
    text: 'text-emerald-300',
    ring: 'ring-emerald-500/50'
  },
  'Vanessa': {
    bg: 'bg-blue-900/20',
    text: 'text-blue-300',
    ring: 'ring-blue-500/50'
  },
  'Common': {
    bg: 'bg-purple-900/20',
    text: 'text-purple-300',
    ring: 'ring-purple-500/50'
  }
} as const;

function getTierColor(tier: string) {
  switch (tier) {
    case 'Bronze': return 'text-amber-600'
    case 'Silver': return 'text-gray-400'
    case 'Gold': return 'text-yellow-400'
    case 'Diamond': return 'text-cyan-400'
    case 'Legendary': return 'text-purple-400'
    default: return 'text-white'
  }
}

function isBossEncounter(encounter: Encounter): boolean {
  // List of known boss names
  const bossNames = [
    'Gorgon Noble',
    'Infernal',
    'Lord of the Wastes',
    'Veteran Octopus',
    'Awakened District',
    'Mr. Moo',
    'Bounty Hunter',
    'The Cult',
    'Ifrit',
    'Void Colossus',
    'Robo-Bouncer',
    'Hulking Experiment'
  ]
  
  // Check if it's a boss based on name or high health/level
  return bossNames.includes(encounter.name) || 
         encounter.Health >= 2000 ||
         encounter.Level >= 10
}

function EncounterCard({ encounter, items }: { encounter: Encounter, items: Record<string, ExtendedItem> }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isBoss = isBossEncounter(encounter)

  // Updated to handle both data sources
  const getEncounterImageUrl = (encounterName: string) => {
    // Default to encounters directory
    const formattedName = encounterName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    
    return `/encounters/${formattedName}.webp`;
  }

  // Updated getSkillImageUrl function
  const getSkillImageUrl = (skillName: string, skillId: string) => {
    // First try to get the skill from encounterData using the ID
    const skillData = encounterData.skills[skillId];
    
    // If we have the skill data and it has an ArtKey, use that directly
    if (skillData?.ArtKey) {
      // Some ArtKeys already include the Icon_Skill_ prefix, some don't
      if (skillData.ArtKey.startsWith('Icon_Skill_')) {
        return `/skills/${skillData.ArtKey}.png`;
      }
      return `/skills/Icon_Skill_${skillData.ArtKey}.png`;
    }
    
    // Fallback: format the skill name
    const formattedName = skillName
      .replace(/\s+/g, '') // Remove spaces
      .replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters
    
    return `/skills/Icon_Skill_${formattedName}.png`;
  }

  // Helper function to get item description from tooltips
  const getItemDescription = (itemId: string, tier: string) => {
    try {
      const item = items[itemId] as ExtendedItem;
      if (!item) {
        return 'No description available';
      }

      const tierData = item.Tiers[tier];
      if (!tierData) {
        return 'No description available';
      }

      if (!Array.isArray(tierData.tooltips) || !tierData.tooltips.length) {
        return 'No description available';
      }

      return tierData.tooltips
        .map((tooltip: string | Tooltip) => {
          if (typeof tooltip === 'string') {
            return tooltip;
          }
          return tooltip?.Content?.Text || '';
        })
        .filter((text: string) => text)
        .join(' ');
    } catch (error) {
      console.error('Error getting item description:', error);
      return 'No description available';
    }
  }

  // Updated skill description helper
  const getSkillDescription = (skillName: string, skillId: string, tier: string) => {
    try {
      const skillData = encounterData.skills[skillId] as Skill;
      if (!skillData?.Tiers?.[tier]) {
        return 'No description available';
      }

      const tierData = skillData.Tiers[tier];
      
      if (tierData.Tooltips && Array.isArray(tierData.Tooltips)) {
        return tierData.Tooltips.map((tooltip: string) => {
          return tooltip.replace(/(\d+)(\s*)(milliseconds|ms|seconds|s)/gi, 
            (match, num) => `${(parseInt(num) / 100).toFixed(1)}s`
          );
        }).join(' ');
      }

      return 'No description available';
    } catch (error) {
      console.error('Error getting skill description:', error);
      return 'No description available';
    }
  }

  // Add helper function to format image paths according to the pattern
  const formatImagePath = (itemName: string, size: string = 'M', character: string = 'ADV') => {
    // Clean up the item name
    const cleanName = itemName
      .replace(/\s+/g, '')  // Remove spaces
      .replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters

    // Format size (S, M, L)
    const sizeMap: { [key: string]: string } = {
      'Small': 'S',
      'Medium': 'M',
      'Large': 'L'
    };

    // Format character codes
    const charMap: { [key: string]: string } = {
      'Jules': 'JUL',
      'Dooley': 'DOO',
      'Stelle': 'STE',
      'Pygmalien': 'PYG',
      'Vanessa': 'VAN',
      'Common': 'ADV'
    };

    return `CF_${sizeMap[size] || 'M'}_${charMap[character] || 'ADV'}_${cleanName}_D.jpeg`;
  };

  // Update getItemImageUrl function
  const getItemImageUrl = (itemId: string) => {
    const item = encounterData.items[itemId];
    if (item) {
      // Try to get the first hero, fallback to 'Common'
      const hero = item.Heroes?.[0] || 'Common';
      return `/items/${formatImagePath(item.InternalName, item.Size, hero)}`;
    }
    return '/items/default-item.png';
  };

  return (
    <div className={`
      bg-gray-800 rounded-xl overflow-hidden transition-all
      ${isBoss 
        ? 'ring-2 ring-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
        : 'hover:ring-2 hover:ring-blue-500'
      }
    `}>
      {/* Add Image Section */}
      <div className="relative w-full h-48">
        <img
          src={getEncounterImageUrl(encounter.name)}
          alt={encounter.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/encounters/default-encounter.webp';
          }}
        />
        {/* Add overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      <div className={`p-4 ${isBoss ? 'bg-purple-900/20' : 'bg-gray-900/50'}`}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-2">
            {isBoss && (
              <span className="text-2xl" title="Boss">👑</span>
            )}
            <h3 className={`text-xl font-bold ${isBoss ? 'text-purple-200' : 'text-white'}`}>
              {encounter.name}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/50">
              Level {encounter.Level}
            </span>
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${isBoss 
                ? 'bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/50' 
                : 'bg-red-500/20 text-red-300 ring-1 ring-red-500/50'
              }
            `}>
              HP {encounter.Health.toLocaleString()}
            </span>
          </div>
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            mt-4 w-full text-left flex items-center justify-between transition-colors
            ${isBoss 
              ? 'text-purple-400 hover:text-purple-300' 
              : 'text-gray-400 hover:text-white'
            }
          `}
        >
          <span>{isExpanded ? 'Hide Details' : 'Show Details'}</span>
          <svg 
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Updated Skills Section */}
          {encounter.Skills.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-3">Skills</h4>
              <div className="space-y-2">
                {encounter.Skills.map((skill, index) => (
                  <div key={index} className="bg-purple-900/20 rounded-lg p-3 border border-purple-900/30">
                    <div className="flex items-start gap-3">
                      {/* Updated Skill Image */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
                        <img
                          src={getSkillImageUrl(skill.Name, skill.SkillID)}
                          alt={skill.Name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const currentSrc = e.currentTarget.src;
                            if (currentSrc.includes('Icon_Skill_')) {
                              // If the normal path fails, try MON_ prefix
                              if (!currentSrc.includes('MON_')) {
                                const fileName = currentSrc.split('/').pop()?.replace('Icon_Skill_', 'Icon_Skill_MON_');
                                if (fileName) {
                                  e.currentTarget.src = `/skills/${fileName}`;
                                  return;
                                }
                              }
                              // If all attempts fail, use default
                              e.currentTarget.src = '/skills/default-skill.png';
                            }
                          }}
                        />
                      </div>

                      {/* Skill Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-purple-200">{skill.Name}</span>
                          <span className={`${getTierColor(skill.Tier)} text-sm`}>{skill.Tier}</span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {getSkillDescription(skill.Name, skill.SkillID, skill.Tier)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Items Section */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-400 mb-3">Items</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {encounter.Items.map((item, index) => {
                const itemDetails = items[item.ItemID];
                const currentTierData = itemDetails?.Tiers[item.Tier];
                
                return (
                  <div 
                    key={index} 
                    className="relative group hover:z-[9999]"
                    style={{ isolation: 'isolate' }}
                  >
                    <div 
                      onClick={() => window.open(`/cards/${item.ItemID}`, '_blank')}
                      className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 cursor-pointer 
                        hover:border-blue-500/50 transition-all duration-200"
                    >
                      {/* Card Header with Image */}
                      <div className="relative">
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={getItemImageUrl(item.ItemID)}
                            alt={item.Name}
                            className="absolute inset-0 w-full h-full object-contain bg-gray-900"
                            onError={(e) => {
                              const currentSrc = e.currentTarget.src;
                              if (!currentSrc.includes('default-item')) {
                                if (itemDetails?.ArtKey) {
                                  e.currentTarget.src = `/items/${itemDetails.ArtKey}.png`;
                                  return;
                                }
                              }
                              e.currentTarget.src = '/items/default-item.png';
                            }}
                          />
                          {/* Dark overlay for better text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                        </div>

                        {/* Item Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <div className="flex justify-between items-end gap-2">
                            <div className="flex-1">
                              <h3 className="text-base font-bold text-white leading-tight line-clamp-2">
                                {item.Name}
                              </h3>
                            </div>
                            <div className="flex-shrink-0">
                              <span className={`
                                inline-flex px-2 py-0.5 rounded-full text-xs font-medium
                                ${getTierColor(item.Tier)} ring-1 ring-current
                              `}>
                                {item.Tier}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-3 space-y-3">
                        {/* Tags */}
                        {itemDetails && (
                          <div className="flex flex-wrap gap-1">
                            {itemDetails.Tags.map((tag, i) => (
                              <span 
                                key={i} 
                                className="inline-flex items-center text-xs px-1.5 py-0.5 rounded bg-gray-700/50 text-gray-300"
                                title={tag}
                              >
                                {tagIcons[tag]} {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Attributes */}
                        {currentTierData && (
                          <div className="grid grid-cols-2 gap-1.5 text-sm">
                            {Object.entries(currentTierData.Attributes)
                              .filter(([key]) => key !== 'CooldownMax')
                              .map(([key, value]) => {
                                const iconInfo = attributeIcons[key]
                                if (!iconInfo) return null

                                return (
                                  <div 
                                    key={key}
                                    className="flex items-center gap-1.5 bg-gray-700/30 rounded p-1.5"
                                    title={iconInfo.label}
                                  >
                                    <span className="text-base">{iconInfo.icon}</span>
                                    <span className="text-white">
                                      {key === 'Custom_0' 
                                        ? decipherCustomAttribute(key, value as number, itemDetails?.Tags || [])
                                        : value
                                      }
                                    </span>
                                  </div>
                                )
                              })}
                          </div>
                        )}

                        {/* Effects/Tooltips */}
                        {currentTierData?.tooltips && (
                          <div className="space-y-1">
                            {currentTierData.tooltips.map((tooltip, index) => {
                              const tooltipContent = typeof tooltip === 'string' 
                                ? tooltip 
                                : tooltip?.Content?.Text || '';
                              const tooltipType = typeof tooltip === 'string' 
                                ? '' 
                                : tooltip?.TooltipType || '';

                              return (
                                <div 
                                  key={index}
                                  className="text-xs text-gray-300 bg-gray-700/30 rounded p-1.5"
                                >
                                  {tooltipType && (
                                    <span className="mr-1">
                                      {tooltipType === 'Active' ? '🎯' : 
                                       tooltipType === 'Passive' ? '✨' : ''}
                                    </span>
                                  )}
                                  {tooltipContent}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Heroes */}
                        {itemDetails?.Heroes.length > 0 && itemDetails.Heroes[0] !== 'Common' && (
                          <div className="flex flex-wrap gap-1">
                            {itemDetails.Heroes.map((hero, index) => {
                              const colors = heroColors[hero as keyof typeof heroColors] || heroColors.Common;
                              return (
                                <span 
                                  key={index}
                                  className={`
                                    text-xs px-1.5 py-0.5 rounded ring-1
                                    ${colors.bg} ${colors.text} ${colors.ring}
                                    transition-colors duration-200 hover:bg-opacity-30
                                  `}
                                >
                                  👑 {hero}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Enchant */}
                        {item.Enchant && (
                          <div className="mt-2">
                            <span className="text-sm text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded ring-1 ring-emerald-500/30">
                              ✨ {item.Enchant}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add hover card */}
                    <ItemCardHover 
                      item={item}
                      itemDetails={itemDetails}
                      currentTierData={currentTierData}
                      getItemImageUrl={getItemImageUrl}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Add a list of excluded encounter names/patterns
const excludedEncounterPatterns = [
  /QA Test/i,
  /Monster_Battle_Player_Template/i,
  /Training Dummy/i,
  /\[Community Team\]/i,
  /test/i,
  /template/i
]

// Update the parsing logic
const parsedEncounters = (() => {
  console.log('Starting to parse encounters...');
  
  if (!encounterData.monsters) {
    console.log('No monsters data found');
    return [];
  }

  const encounterEntries = Object.entries(encounterData.monsters).filter(([key, value]: [string, any]) => {
    // First check if this is a test/template encounter that should be excluded
    const shouldExclude = excludedEncounterPatterns.some(pattern => 
      pattern.test(key) || pattern.test(value.name || '')
    )
    if (shouldExclude) {
      return false
    }

    // Then check if it's a valid encounter
    const isValid = typeof value === 'object' && 
      value !== null &&
      typeof value.Health === 'number' && 
      typeof value.Level === 'number';
    
    if (isValid) {
      console.log('Valid encounter found:', key);
    }
    return isValid;
  });

  console.log('Filtered entries:', encounterEntries.length);

  const mapped = encounterEntries.map(([name, data]: [string, any]) => {
    const encounter = {
      name,
      Health: data.Health,
      Level: data.Level,
      Items: data.Items || [],
      Skills: data.Skills || []
    } as Encounter;
    console.log('Parsed encounter:', encounter.name);
    return encounter;
  });

  console.log('Total parsed encounters:', mapped.length);
  return mapped;
})();

// Parse unique tags once
const allItemTags = (() => {
  const tags = new Set<string>()
  if (encounterData.items) {
    Object.values(encounterData.items).forEach((item: any) => {
      if (item.Tags) {
        item.Tags.forEach((tag: string) => tags.add(tag))
      }
    })
  }
  return Array.from(tags).sort()
})()

// Move ItemCardHover component definition before getItemImageUrl
function ItemCardHover({ 
  item, 
  itemDetails, 
  currentTierData,
  getItemImageUrl 
}: { 
  item: any, 
  itemDetails: any, 
  currentTierData: any,
  getItemImageUrl: (itemId: string) => string
}) {
  return (
    <div className="fixed z-[9999] left-auto ml-2 top-auto w-96 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
      <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden backdrop-blur-sm">
        {/* Large Image Display */}
        <div className="relative aspect-video w-full">
          <img
            src={getItemImageUrl(item.ItemID)}
            alt={item.Name}
            className="w-full h-full object-contain bg-gray-900"
            onError={(e) => {
              const currentSrc = e.currentTarget.src;
              if (!currentSrc.includes('default-item')) {
                if (itemDetails?.ArtKey) {
                  e.currentTarget.src = `/items/${itemDetails.ArtKey}.png`;
                  return;
                }
              }
              e.currentTarget.src = '/items/default-item.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>

        {/* Item Details */}
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">{item.Name}</h3>
            <span className={`${getTierColor(item.Tier)} text-sm font-medium px-2 py-1 rounded-full ring-1 ring-current`}>
              {item.Tier}
            </span>
          </div>

          {/* Tags */}
          {itemDetails && (
            <div className="flex flex-wrap gap-2">
              {itemDetails.Tags.map((tag: string, i: number) => (
                <span 
                  key={i} 
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-700/50 text-gray-300 text-sm"
                >
                  <span className="text-lg">{tagIcons[tag]}</span>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Attributes */}
          {currentTierData && (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(currentTierData.Attributes)
                .filter(([key]) => key !== 'CooldownMax')
                .map(([key, value]) => {
                  const iconInfo = attributeIcons[key]
                  if (!iconInfo) return null

                  return (
                    <div 
                      key={key}
                      className="flex items-center gap-2 bg-gray-700/30 rounded-lg p-2"
                    >
                      <span className="text-xl" title={iconInfo.label}>{iconInfo.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">{iconInfo.label}</span>
                        <span className="text-white">
                          {key === 'Custom_0' 
                            ? decipherCustomAttribute(key, value as number, itemDetails?.Tags || [])
                            : value
                          }
                        </span>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}

          {/* Effects/Tooltips */}
          {currentTierData?.tooltips && (
            <div className="space-y-2">
              {currentTierData.tooltips.map((tooltip: any, index: number) => {
                const tooltipContent = typeof tooltip === 'string' 
                  ? tooltip 
                  : tooltip?.Content?.Text || '';
                const tooltipType = typeof tooltip === 'string' 
                  ? '' 
                  : tooltip?.TooltipType || '';

                return (
                  <div 
                    key={index}
                    className="flex items-start gap-2 bg-gray-700/30 rounded-lg p-3"
                  >
                    <span className="text-lg mt-0.5">
                      {tooltipType === 'Active' ? '🎯' : 
                       tooltipType === 'Passive' ? '✨' : '📜'}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm text-gray-300">{tooltipContent}</div>
                      {tooltipType && (
                        <div className="text-xs text-gray-500 mt-1">{tooltipType}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Heroes */}
          {itemDetails?.Heroes.length > 0 && itemDetails.Heroes[0] !== 'Common' && (
            <div className="flex flex-wrap gap-2">
              {itemDetails.Heroes.map((hero: string, index: number) => {
                const colors = heroColors[hero as keyof typeof heroColors] || heroColors.Common;
                return (
                  <span 
                    key={index}
                    className={`
                      px-2 py-1 rounded-lg text-sm
                      ${colors.bg} ${colors.text} ${colors.ring}
                    `}
                  >
                    👑 {hero}
                  </span>
                );
              })}
            </div>
          )}

          {/* Enchant */}
          {item.Enchant && (
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <span className="text-emerald-400">{item.Enchant}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EncountersPage() {
  const [selectedLevel, setSelectedLevel] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [showBossesOnly, setShowBossesOnly] = useState(false)

  const filteredEncounters = useMemo(() => {
    return parsedEncounters.filter(encounter => {
      const matchesLevel = selectedLevel === 0 || encounter.Level === selectedLevel;
      const matchesSearch = encounter.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTier = !selectedTier || encounter.Items.some(item => item.Tier === selectedTier);
      const matchesTag = !selectedTag || encounter.Items.some(item => {
        const itemDetails = encounterData.items[item.ItemID] as ExtendedItem;
        return itemDetails?.Tags?.includes(selectedTag);
      });
      const matchesBossFilter = !showBossesOnly || isBossEncounter(encounter);
      
      return matchesLevel && matchesSearch && matchesTier && matchesTag && matchesBossFilter;
    }).sort((a, b) => a.Level - b.Level);
  }, [selectedLevel, searchQuery, selectedTier, selectedTag, showBossesOnly]);

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <CreditBanner />
      <div className="py-8">
        <WIPBadge />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">PvE Encounters</h1>
              <p className="text-gray-400">
                Showing {filteredEncounters.length} of {parsedEncounters.length} encounters
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid gap-4 mb-8">
            {/* Search */}
            <input
              type="text"
              placeholder="Search encounters by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
                text-gray-100 placeholder-gray-500
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Level Selection */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(Number(e.target.value))}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
                  text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>All Levels</option>
                {Array.from({ length: 15 }, (_, i) => i + 1).map(level => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>

              {/* Tier Filter */}
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
                  text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Tiers</option>
                {['Bronze', 'Silver', 'Gold', 'Diamond', 'Legendary'].map(tier => (
                  <option key={tier} value={tier}>{tier}</option>
                ))}
              </select>

              {/* Tag Filter */}
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
                  text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Item Types</option>
                {allItemTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>

              {/* Boss Toggle */}
              <button
                onClick={() => setShowBossesOnly(!showBossesOnly)}
                className={`
                  p-3 rounded-lg font-medium transition-colors
                  ${showBossesOnly 
                    ? 'bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/50' 
                    : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                  }
                `}
              >
                👑 {showBossesOnly ? 'Show All' : 'Bosses Only'}
              </button>
            </div>
          </div>

          {/* Encounters Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEncounters.map(encounter => (
              <EncounterCard 
                key={encounter.name} 
                encounter={encounter}
                items={encounterData.items}
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredEncounters.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              No encounters found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 