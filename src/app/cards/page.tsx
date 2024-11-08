'use client'

import { useState, useMemo } from 'react'
import encounterData from '@/data/out.json'
import CardDisplay from '@/components/CardDisplay'
import CardFilters from '@/components/CardFilters'
import { Item } from '@/types/encounters'

export default function CardsPage() {
  // Get all items with proper image mapping
  const allItems = Object.entries(encounterData.items as unknown as Record<string, Item>)
    .map(([id, item]) => {
      // Create a complete item object with the correct image path
      const completeItem: Item = {
        ...item,
        id,
        images: [], // Add the required images property
        InternalName: item.ArtKey 
          ? ((encounterData.items as any)[item.ArtKey]?.InternalName || item.InternalName)
          : item.InternalName
      };
      return completeItem;
    })
    // Filter out debug cards
    .filter(item => !item.InternalName.includes('[DEBUG]'))
    .sort((a, b) => a.InternalName.localeCompare(b.InternalName));

  // Get available filter options
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    allItems.forEach(item => item.Tags.forEach(tag => tags.add(tag)))
    return Array.from(tags).sort()
  }, [allItems])

  const availableHeroes = useMemo(() => {
    const heroes = new Set<string>()
    allItems.forEach(item => item.Heroes.forEach(hero => heroes.add(hero)))
    return Array.from(heroes).sort()
  }, [allItems])

  const availableTiers = useMemo(() => {
    const tiers = new Set<string>()
    allItems.forEach(item => Object.keys(item.Tiers).forEach(tier => tiers.add(tier)))
    return Array.from(tiers).sort()
  }, [allItems])

  // Filter state
  const [filteredItems, setFilteredItems] = useState(allItems)

  // Filter handler
  const handleFilterChange = ({
    search,
    tags,
    heroes,
    tiers
  }: {
    search: string;
    tags: string[];
    heroes: string[];
    tiers: string[];
  }) => {
    let filtered = allItems

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(item => 
        item.InternalName.toLowerCase().includes(searchLower)
      )
    }

    // Apply tag filter
    if (tags.length > 0) {
      filtered = filtered.filter(item =>
        tags.every(tag => item.Tags.includes(tag))
      )
    }

    // Apply hero filter
    if (heroes.length > 0) {
      filtered = filtered.filter(item =>
        heroes.some(hero => item.Heroes.includes(hero))
      )
    }

    // Apply tier filter
    if (tiers.length > 0) {
      filtered = filtered.filter(item =>
        tiers.some(tier => Object.keys(item.Tiers).includes(tier))
      )
    }

    setFilteredItems(filtered)
  }

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-[2000px] mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Cards</h1>
          <div className="text-gray-400 mb-4">
            {filteredItems.length} of {allItems.length} cards
          </div>
          
          <CardFilters
            onFilterChange={handleFilterChange}
            availableTags={availableTags}
            availableHeroes={availableHeroes}
            availableTiers={availableTiers}
          />
        </div>
        
        <div className="flex flex-wrap -mx-2">
          {filteredItems.map((item) => (
            <CardDisplay 
              key={item.id}
              item={item} 
              itemId={item.id!} 
            />
          ))}
        </div>
      </div>
    </main>
  )
}
