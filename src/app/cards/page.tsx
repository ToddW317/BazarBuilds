'use client'

import { useState, useMemo } from 'react'
import cards from '@/data/cards.json'
import { Card } from '@/types/cards'

export default function CardsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedSize, setSelectedSize] = useState<string>('all')
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')

  const types = useMemo(() => 
    ['all', ...new Set(cards.map(card => card.cardType))].sort(),
    []
  )

  const sizes = ['all', 'Small', 'Medium', 'Large']
  const tiers = ['all', 'Bronze', 'Silver', 'Gold']

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'all' || card.cardType === selectedType
      const matchesSize = selectedSize === 'all' || card.size === selectedSize
      const matchesTier = selectedTier === 'all' || card.tier === selectedTier
      return matchesSearch && matchesType && matchesSize && matchesTier
    }).sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'tier':
          return a.tier.localeCompare(b.tier)
        default:
          return 0
      }
    })
  }, [searchQuery, selectedType, selectedSize, selectedTier, sortBy])

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Card Database</h1>
          <p className="text-gray-400">
            Showing {filteredCards.length} of {cards.length} cards
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search cards by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 sm:p-4 pl-12 bg-gray-700 border border-gray-600 rounded-lg 
                text-white placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              {sizes.map(size => (
                <option key={size} value={size}>
                  {size === 'all' ? 'All Sizes' : size}
                </option>
              ))}
            </select>

            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              {tiers.map(tier => (
                <option key={tier} value={tier}>
                  {tier === 'all' ? 'All Tiers' : tier}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="name">Sort by Name</option>
              <option value="tier">Sort by Tier</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCards.map(card => (
            <div 
              key={card.id}
              className={`bg-gray-800 rounded-lg border-2 
                ${card.isLegendary ? 'border-yellow-500' : 'border-gray-700'}
                hover:border-gray-600 transition-colors
                flex flex-col h-full`}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-lg font-bold text-white line-clamp-2">
                    {card.name}
                  </h3>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-1 rounded whitespace-nowrap
                      ${card.tier === 'Gold' ? 'bg-yellow-800 text-yellow-200' :
                        card.tier === 'Silver' ? 'bg-gray-600 text-gray-200' :
                        'bg-amber-900 text-amber-200'}`}>
                      {card.tier}
                    </span>
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {card.size}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-400">Type: {card.cardType}</p>
                  {card.castTime && (
                    <p className="text-sm text-blue-400">Cast Time: {card.castTime}s</p>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-grow flex flex-col">
                {/* Stats Grid */}
                {card.stats && Object.keys(card.stats).length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.entries(card.stats).map(([stat, value]) => 
                      value ? (
                        <div 
                          key={stat}
                          className="text-sm bg-gray-700 rounded p-2 flex justify-between items-center"
                        >
                          <span className="text-gray-400 truncate mr-2">
                            {stat.charAt(0).toUpperCase() + stat.slice(1)}:
                          </span>
                          <span className="text-yellow-400 flex-shrink-0">{value}</span>
                        </div>
                      ) : null
                    )}
                  </div>
                )}

                {/* Effects */}
                {card.effects?.map((effect, index) => (
                  <p key={index} className="text-sm text-gray-300 mb-2">
                    {effect}
                  </p>
                ))}
              </div>

              {/* Card Footer */}
              {card.isLegendary && (
                <div className="p-4 border-t border-gray-700">
                  <div className="text-yellow-500 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Legendary</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCards.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No cards found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
} 