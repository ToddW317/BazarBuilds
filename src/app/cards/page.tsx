'use client'

import { useState, useMemo } from 'react'
import cards from '@/data/cards.json'
import { Card } from '@/types/cards'

const isBossEncounter = (cardName: string) => {
  const bossNames = [
    'Gorgon Noble',
    'Infernal',
    'Lord of the Wastes',
    'Veteran Octopus',
    'Awakened District',
    'Mr. Moo',
    'Bounty Hunter',
    'The Cult',
    'Ifrit'
    // Add other boss names here
  ];
  return bossNames.includes(cardName);
};

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map(card => (
            <div 
              key={card.id}
              className={`bg-gray-800 rounded-xl overflow-hidden
                ${card.isLegendary ? 'ring-2 ring-yellow-500' : ''}
                hover:ring-2 hover:ring-blue-500 transition-all
                flex flex-col shadow-lg`}
            >
              {/* Card Header */}
              <div className="relative p-4 bg-gray-900/50">
                {/* Tier Badge */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {card.name}
                  </h3>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${card.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-300 ring-1 ring-yellow-500/50' :
                        card.tier === 'Silver' ? 'bg-gray-500/20 text-gray-300 ring-1 ring-gray-500/50' :
                        card.tier === 'Diamond' ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/50' :
                        'bg-amber-800/20 text-amber-300 ring-1 ring-amber-500/50'}`}>
                      {card.tier}
                    </span>
                  </div>
                </div>

                {/* Type and Size Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-md border border-gray-700
                    ${card.cardType === 'Combat' ? 'bg-red-900/30 text-red-200' :
                      card.cardType === 'Item' ? 'bg-blue-900/30 text-blue-200' :
                      card.cardType === 'Skill' ? 'bg-purple-900/30 text-purple-200' :
                      card.cardType === 'Reward' ? 'bg-green-900/30 text-green-200' :
                      card.cardType === 'Merchant' ? 'bg-yellow-900/30 text-yellow-200' :
                      card.cardType === 'Encounter' ? 'bg-indigo-900/30 text-indigo-200' :
                      'bg-gray-700/50 text-gray-300'}`}>
                    {card.cardType}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-md border border-gray-700
                    ${card.size === 'Small' ? 'bg-green-900/30 text-green-200' :
                      card.size === 'Medium' ? 'bg-yellow-900/30 text-yellow-200' :
                      'bg-red-900/30 text-red-200'}`}>
                    {card.size}
                  </span>
                </div>

                {/* Legendary Indicator */}
                {card.isLegendary && (
                  <div className="absolute -top-1 -right-1 p-4">
                    <div className="text-yellow-500 animate-pulse">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Stats */}
              <div className="p-4 flex-grow bg-gradient-to-b from-gray-800 to-gray-900">
                {/* Primary Stats */}
                {card.stats && Object.keys(card.stats).length > 0 && (
                  <div className="space-y-4">
                    {/* Combat Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(card.stats).map(([stat, value]) => 
                        value && stat !== 'ammo' ? (
                          <div 
                            key={stat}
                            className="flex items-center gap-2 bg-gray-700/30 rounded-lg p-2.5
                              border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                          >
                            <span className={`text-lg
                              ${stat === 'damage' ? 'text-red-400' :
                                stat === 'heal' ? 'text-green-400' :
                                stat === 'shield' ? 'text-blue-400' :
                                stat === 'burn' ? 'text-orange-400' :
                                stat === 'poison' ? 'text-purple-400' :
                                'text-gray-400'}`}>
                              {stat === 'damage' ? '⚔️' :
                               stat === 'heal' ? '💖' :
                               stat === 'shield' ? '🛡️' :
                               stat === 'burn' ? '🔥' :
                               stat === 'poison' ? '☠️' :
                               '📊'}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-400 capitalize">
                                {stat}
                              </span>
                              <span className="text-sm font-medium text-white">
                                {typeof value === 'number' ? value.toFixed(1) : value}
                              </span>
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                )}

                {/* Card Type Specific Info */}
                {card.cardType === 'Combat' && (
                  <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-900/30">
                    <span className="text-red-200 text-sm">Combat Encounter</span>
                  </div>
                )}

                {card.cardType === 'Merchant' && (
                  <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-900/30">
                    <span className="text-yellow-200 text-sm">Merchant Encounter</span>
                  </div>
                )}

                {card.cardType === 'Encounter' && (
                  <div className="mt-4 p-3 bg-indigo-900/20 rounded-lg border border-indigo-900/30">
                    <span className="text-indigo-200 text-sm">Special Encounter</span>
                  </div>
                )}

                {card.cardType === 'Reward' && (
                  <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-900/30">
                    <span className="text-green-200 text-sm">Reward Card</span>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-700/50">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span className="font-medium">ID: {card.id.slice(0, 8)}...</span>
                    {card.isLegendary && (
                      <span className="text-yellow-500 font-medium">Legendary</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {card.cardType} • {card.size} • {card.tier}
                    </span>
                  </div>
                </div>
              </div>
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