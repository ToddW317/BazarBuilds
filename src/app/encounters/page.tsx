'use client'

import { useState, useMemo } from 'react'
import { Encounter, EncounterData, Item } from '@/types/encounters'
import encounterData from '@/data/out.json'
import WIPBadge from '@/components/WIPBadge'
import CreditBanner from '@/components/CreditBanner'

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

function EncounterCard({ encounter, items }: { encounter: Encounter, items: Record<string, Item> }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isBoss = isBossEncounter(encounter)

  // Add helper function to get encounter image URL
  const getEncounterImageUrl = (encounterName: string) => {
    // Convert encounter name to kebab case for file naming
    const formattedName = encounterName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
    
    return `/encounters/${formattedName}.webp`
  }

  // Helper function to format time values
  const formatTime = (ms: number) => {
    return (ms / 100).toFixed(1)
  }

  // Updated helper function to get item description from tooltips
  const getItemDescription = (itemId: string, tier: string) => {
    try {
      const item = encounterData.items[itemId]
      if (!item) {
        console.log('Item not found:', itemId)
        return 'No description available'
      }

      const tierData = item.Tiers[tier]
      if (!tierData) {
        console.log('Tier not found:', tier, 'for item:', itemId)
        return 'No description available'
      }

      // Check if tooltips exist and are properly formatted
      if (!Array.isArray(tierData.tooltips) || !tierData.tooltips.length) {
        console.log('No tooltips found for tier:', tier, 'item:', itemId)
        return 'No description available'
      }

      // Join all tooltip texts
      return tierData.tooltips
        .map(tooltip => {
          if (typeof tooltip === 'string') {
            return tooltip
          }
          return tooltip?.Content?.Text || ''
        })
        .filter(text => text)
        .join(' ')
    } catch (error) {
      console.error('Error getting item description:', error, { itemId, tier })
      return 'No description available'
    }
  }

  // Updated helper function to get skill description from encounterData
  const getSkillDescription = (skillName: string, skillId: string) => {
    try {
      const skillData = encounterData.skills[skillId]
      if (!skillData?.tooltips?.length) return 'No description available'

      // Handle the new tooltip structure
      return skillData.tooltips
        .filter(tooltip => tooltip?.Content?.Text)
        .map(tooltip => tooltip.Content.Text)
        .join(' ')
    } catch (error) {
      console.error('Error getting skill description:', error, { skillName, skillId })
      return 'No description available'
    }
  }

  // Updated helper function to get skill image URL
  const getSkillImageUrl = (skillName: string) => {
    // Convert skill name to proper format:
    // 1. Remove spaces and special characters
    // 2. Add "Icon_Skill_" prefix
    // 3. Capitalize first letter of each word
    const formattedName = skillName
      .split(/[\s-]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')

    return `/skills/Icon_Skill_${formattedName}.png`
  }

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
            // Fallback if image fails to load
            e.currentTarget.src = '/encounters/default-encounter.webp'
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
                      {/* Skill Image */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
                        <img
                          src={getSkillImageUrl(skill.Name)}
                          alt={skill.Name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/skills/default-skill.png'
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
                          {getSkillDescription(skill.Name, skill.SkillID)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {encounter.Items.map((item, index) => {
                const itemDetails = items[item.ItemID]
                return (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-white">{item.Name}</span>
                      <span className={`${getTierColor(item.Tier)} text-sm`}>{item.Tier}</span>
                    </div>
                    {itemDetails && (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {itemDetails.Tags.map((tag, i) => (
                            <span 
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-gray-600/50 text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-400">
                          {getItemDescription(item.ItemID, item.Tier)}
                        </p>
                        {item.Enchant && (
                          <div className="text-sm text-emerald-400">
                            Enchant: {item.Enchant}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
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

export default function EncountersPage() {
  const [selectedLevel, setSelectedLevel] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [showBossesOnly, setShowBossesOnly] = useState(false)

  const filteredEncounters = useMemo(() => {
    return parsedEncounters.filter(encounter => {
      const matchesLevel = selectedLevel === 0 || encounter.Level === selectedLevel
      const matchesSearch = encounter.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTier = !selectedTier || encounter.Items.some(item => item.Tier === selectedTier)
      const matchesTag = !selectedTag || encounter.Items.some(item => {
        const itemDetails = encounterData.items[item.ItemID]
        return itemDetails?.Tags.includes(selectedTag)
      })
      const matchesBossFilter = !showBossesOnly || isBossEncounter(encounter)
      
      return matchesLevel && matchesSearch && matchesTier && matchesTag && matchesBossFilter
    }).sort((a, b) => a.Level - b.Level)
  }, [selectedLevel, searchQuery, selectedTier, selectedTag, showBossesOnly])

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