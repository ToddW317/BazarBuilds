'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import encounterData from '@/data/out.json'
import CardDisplay from '@/components/CardDisplay'
import EncounterFilters from '@/components/EncounterFilters'
import { ChevronDown, ChevronUp, Sword, Shield, Sparkles } from 'lucide-react'
import { Encounter, EncounterData } from '@/types/encounters'

export default function EncountersPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  
  const [searchFilter, setSearchFilter] = useState(initialSearch)
  
  useEffect(() => {
    if (initialSearch) {
      handleFilterChange({
        search: initialSearch,
        levels: [],
        minHealth: null,
        maxHealth: null,
        hasItems: false,
        hasSkills: false
      })
    }
  }, [initialSearch])

  const [expandedMonster, setExpandedMonster] = useState<string | null>(null)
  const typedData = encounterData as unknown as EncounterData
  const monsters = typedData.monsters || {}

  // Get all available levels for filters
  const availableLevels = useMemo(() => {
    const levels = new Set<number>()
    Object.values(monsters).forEach(monster => levels.add(monster.Level))
    return Array.from(levels).sort((a, b) => a - b)
  }, [monsters])

  // Filter state
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  // Filter handler
  const handleFilterChange = ({
    search,
    levels,
    minHealth,
    maxHealth,
    hasItems,
    hasSkills
  }: {
    search: string
    levels: number[]
    minHealth: number | null
    maxHealth: number | null
    hasItems: boolean
    hasSkills: boolean
  }) => {
    let filtered = { ...monsters }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = Object.fromEntries(
        Object.entries(filtered).filter(([name]) => 
          name.toLowerCase().includes(searchLower)
        )
      )
    }

    // Apply level filter
    if (levels.length > 0) {
      filtered = Object.fromEntries(
        Object.entries(filtered).filter(([_, monster]) => 
          levels.includes(monster.Level)
        )
      )
    }

    // Apply health range filter
    if (minHealth !== null) {
      filtered = Object.fromEntries(
        Object.entries(filtered).filter(([_, monster]) => 
          monster.Health >= minHealth
        )
      )
    }
    if (maxHealth !== null) {
      filtered = Object.fromEntries(
        Object.entries(filtered).filter(([_, monster]) => 
          monster.Health <= maxHealth
        )
      )
    }

    // Apply has items filter
    if (hasItems) {
      filtered = Object.fromEntries(
        Object.entries(filtered).filter(([_, monster]) => 
          monster.Items.length > 0
        )
      )
    }

    // Apply has skills filter
    if (hasSkills) {
      filtered = Object.fromEntries(
        Object.entries(filtered).filter(([_, monster]) => 
          monster.Skills.length > 0
        )
      )
    }

    setFilteredMonsters(filtered)
  }

  if (Object.keys(monsters).length === 0) {
    return (
      <main className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-[2000px] mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Encounters</h1>
          <p className="text-gray-400">No monsters found.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-[2000px] mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Encounters</h1>
          <div className="text-gray-400 mb-4">
            {Object.keys(filteredMonsters).length} of {Object.keys(monsters).length} monsters
          </div>
          
          <EncounterFilters
            availableLevels={availableLevels}
            onFilterChange={handleFilterChange}
            initialSearch={searchFilter}
          />
        </div>
        
        <div className="space-y-4">
          {Object.entries(filteredMonsters).map(([monsterName, monster]) => (
            <div key={monsterName} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <button
                onClick={() => setExpandedMonster(
                  expandedMonster === monsterName ? null : monsterName
                )}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <h2 className="text-xl font-semibold text-white">
                    {monsterName}
                  </h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-yellow-400">
                      <Sparkles className="w-4 h-4" />
                      Level {monster.Level}
                    </span>
                    <span className="flex items-center gap-1.5 text-red-400">
                      <Shield className="w-4 h-4" />
                      {monster.Health} HP
                    </span>
                    {monster.Skills.length > 0 && (
                      <span className="flex items-center gap-1.5 text-purple-400">
                        <Sword className="w-4 h-4" />
                        {monster.Skills.length} Skills
                      </span>
                    )}
                  </div>
                </div>
                {expandedMonster === monsterName ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedMonster === monsterName && (
                <div className="p-6 border-t border-gray-700">
                  {/* Monster Skills */}
                  {monster.Skills.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {monster.Skills.map((skill, index) => (
                          <span 
                            key={index}
                            className={`
                              px-3 py-1.5 rounded-lg text-sm font-medium
                              ${getTierColor(skill.Tier)}
                              bg-gray-700/50
                            `}
                          >
                            {skill.Name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Monster Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Rewards</h3>
                    <div className="flex flex-wrap -mx-2">
                      {monster.Items.map((item, index) => {
                        // Get the base item details using the ItemID
                        const itemDetails = typedData.items?.[item.ItemID]
                        if (!itemDetails) return null

                        // Create a complete item object with the correct image path
                        const completeItem = {
                          ...itemDetails,
                          StartingTier: item.Tier,
                          id: item.ItemID,
                          InternalName: item.Name, // Use the item name from the monster's data
                          Size: 'Small', // Monster drops are always small
                          Heroes: ['Common'],
                          ArtKey: itemDetails.ArtKey
                        }

                        // If we have an ArtKey, try to find the corresponding item for the image
                        if (completeItem.ArtKey) {
                          const artItem = typedData.items?.[completeItem.ArtKey]
                          if (artItem) {
                            // Use the art item's name for image lookup
                            completeItem.InternalName = artItem.InternalName
                          }
                        }

                        return (
                          <CardDisplay
                            key={`${item.ItemID}-${index}`}
                            item={completeItem}
                            itemId={item.ItemID}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

// Helper function for tier colors
function getTierColor(tier: string) {
  switch (tier) {
    case 'Diamond': return 'text-cyan-400'
    case 'Gold': return 'text-yellow-400'
    case 'Silver': return 'text-gray-300'
    case 'Bronze': return 'text-orange-400'
    default: return 'text-gray-400'
  }
}