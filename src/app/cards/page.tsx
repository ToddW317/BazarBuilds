'use client'

import { useState, useMemo, useEffect } from 'react'
import { Item } from '@/types/encounters'
import encounterData from '@/data/out.json'
import { cacheData, getCachedData } from '@/utils/cache'
import CardDisplay from '@/components/CardDisplay'
import WIPBadge from '@/components/WIPBadge'

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

function CardDetails({ item, itemId }: { item: Item, itemId: string }) {
  const [selectedTier, setSelectedTier] = useState<string>(item.StartingTier)
  const tiers = Object.keys(item.Tiers)

  const currentTierData = item.Tiers[selectedTier as keyof typeof item.Tiers]

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      <div className="p-4 bg-gray-900/50">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {item.InternalName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.Tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-400">
            {item.Size}
          </span>
        </div>

        {/* Tier Selection */}
        <div className="mt-4 flex gap-2">
          {tiers.map(tier => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                ${tier === selectedTier 
                  ? `${getTierColor(tier)} ring-1 ring-current` 
                  : 'text-gray-400 hover:text-gray-200'}`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {currentTierData && (
        <div className="p-4 space-y-4">
          {/* Attributes */}
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-2">Attributes</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(currentTierData.Attributes).map(([key, value]) => (
                <div key={key} className="bg-gray-700/50 rounded-lg p-2">
                  <span className="text-sm text-gray-400">{key}:</span>
                  <span className="ml-2 text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tooltips */}
          {currentTierData.tooltips && (
            <div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">Effects</h4>
              <div className="space-y-2">
                {currentTierData.tooltips.map((tooltip, index) => (
                  <div 
                    key={index}
                    className="bg-gray-700/50 rounded-lg p-3"
                  >
                    <div className="text-sm text-gray-300">{tooltip.Content.Text}</div>
                    <div className="text-xs text-gray-500 mt-1">{tooltip.TooltipType}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Heroes */}
          {item.Heroes.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-2">Heroes</h4>
              <div className="flex flex-wrap gap-2">
                {item.Heroes.map((hero, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-lg bg-purple-900/20 text-purple-300 text-sm"
                  >
                    {hero}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function CardsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedHero, setSelectedHero] = useState('')
  const [cachedItems, setCachedItems] = useState<Record<string, Item> | null>(null)

  // Initialize data from cache or file
  useEffect(() => {
    const cached = getCachedData<Record<string, Item>>('cards')
    if (cached) {
      console.log('Using cached card data')
      setCachedItems(cached)
    } else {
      console.log('Caching card data')
      setCachedItems(encounterData.items)
      cacheData('cards', encounterData.items)
    }
  }, [])

  const { allTags, allHeroes, allSizes } = useMemo(() => {
    if (!cachedItems) return { allTags: [], allHeroes: [], allSizes: [] }

    const tags = new Set<string>()
    const heroes = new Set<string>()
    const sizes = new Set<string>()

    Object.values(cachedItems).forEach(item => {
      item.Tags.forEach(tag => tags.add(tag))
      item.Heroes.forEach(hero => heroes.add(hero))
      sizes.add(item.Size)
    })

    return {
      allTags: Array.from(tags).sort(),
      allHeroes: Array.from(heroes).sort(),
      allSizes: Array.from(sizes).sort()
    }
  }, [cachedItems])

  const filteredItems = useMemo(() => {
    if (!cachedItems) return []

    return Object.entries(cachedItems)
      .filter(([_, item]) => {
        const matchesSearch = item.InternalName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesTag = !selectedTag || item.Tags.includes(selectedTag)
        const matchesSize = !selectedSize || item.Size === selectedSize
        const matchesHero = !selectedHero || item.Heroes.includes(selectedHero)
        return matchesSearch && matchesTag && matchesSize && matchesHero
      })
  }, [cachedItems, searchQuery, selectedTag, selectedSize, selectedHero])

  if (!cachedItems) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-400 py-12">
            Loading card data...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 relative">
      <WIPBadge />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Cards Database</h1>
            <p className="text-gray-400">
              Showing {filteredItems.length} of {Object.keys(cachedItems).length} cards
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid gap-4 mb-8">
          <input
            type="text"
            placeholder="Search cards by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
              text-gray-100 placeholder-gray-500
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
                text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
                text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Sizes</option>
              {allSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            <select
              value={selectedHero}
              onChange={(e) => setSelectedHero(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
                text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Heroes</option>
              {allHeroes.map(hero => (
                <option key={hero} value={hero}>{hero}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Updated Cards Grid */}
        <div className="flex flex-wrap">
          {filteredItems.map(([itemId, item]) => (
            <CardDisplay key={itemId} item={item} itemId={itemId} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No cards found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
} 