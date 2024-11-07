'use client'

import { useState } from 'react'
import { Item } from '@/types/encounters'
import { attributeIcons, tagIcons, decipherCustomAttribute } from '@/utils/cardIcons'
import { LucideIcon } from 'lucide-react'
import Icon from '@/components/ui/Icon'
import encounterData from '@/data/out.json'
import WIPBadge from '@/components/WIPBadge'
import { 
  Sword, 
  Shield, 
  Heart, 
  Clock, 
  Coins, 
  Zap, 
  Star,
  ArrowRight,
  Skull
} from 'lucide-react'
import Link from 'next/link'

// Add hero colors
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

// Add helper function to get item image
function getItemImage(itemId: string) {
  // First, get the item data using the ID
  const item = (encounterData.items as Record<string, Item>)[itemId]
  if (!item) return '/items/default-item.png'

  // Get the ArtKey from the item data
  const artKey = item.ArtKey
  if (!artKey) {
    // If no ArtKey, try to construct the image path using the naming pattern
    const hero = item.Heroes?.[0] || 'Common'
    return `/items/CF_${item.Size === 'Small' ? 'S' : item.Size === 'Large' ? 'L' : 'M'}_${
      hero === 'Jules' ? 'JUL' :
      hero === 'Dooley' ? 'DOO' :
      hero === 'Stelle' ? 'STE' :
      hero === 'Pygmalien' ? 'PYG' :
      hero === 'Vanessa' ? 'VAN' : 'ADV'
    }_${item.InternalName.replace(/\s+/g, '')}_D.jpeg`
  }

  // If we have an ArtKey, use it to find the corresponding image
  return `/items/${artKey}.png`
}

interface CardDetailsContentProps {
  params: {
    id: string
  }
}

function MetaScore({ item }: { item: Item }) {
  // TODO: Implement actual meta score calculation based on build instances
  const metaScore = 85 // Placeholder
  
  return (
    <div className="text-center bg-gray-700/30 rounded-lg p-4">
      <div className="text-sm text-gray-400">Meta Score</div>
      <div className="text-2xl font-bold text-blue-400">{metaScore}</div>
      <div className="text-xs text-gray-500">Based on build popularity</div>
    </div>
  )
}

export default function CardDetailsContent({ params }: CardDetailsContentProps) {
  const item = (encounterData.items as Record<string, Item>)[params.id]
  const [selectedTier, setSelectedTier] = useState<string>(item?.StartingTier || 'Bronze')
  const currentTierData = item?.Tiers[selectedTier as keyof typeof item.Tiers]
  const tiers = Object.keys(item?.Tiers || {})
  const tierIndex = tiers.indexOf(selectedTier)
  const previousTierData = tierIndex > 0 ? item?.Tiers[tiers[tierIndex - 1]] : null

  if (!item) {
    return <div>Card not found</div>
  }

  // Update how we find and map encounters that drop this item
  const dropsFrom = Object.entries(encounterData.monsters || {})
    .filter(([monsterName, monster]) => monster.Items?.some(i => i.ItemID === params.id))
    .map(([monsterName, monster]) => {
      return {
        id: monster.name, // This is the GUID
        name: monsterName, // This is the actual monster name
        Level: monster.Level,
        Health: monster.Health
      }
    })

  return (
    <div className="min-h-screen bg-gray-900 py-8 relative">
      <WIPBadge />
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{item.InternalName}</h1>
          <div className="flex flex-wrap gap-2 items-center">
            {item.Tags.map((tag, i) => {
              const TagIcon = tagIcons[tag]
              return (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300"
                >
                  {TagIcon && <Icon icon={TagIcon} className="w-4 h-4" />}
                  {tag}
                </span>
              )
            })}
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${item.Size === 'Small' ? 'bg-green-500/20 text-green-300 ring-1 ring-green-500/50' :
                item.Size === 'Medium' ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/50' :
                'bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/50'}
            `}>
              {item.Size}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Meta */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card Image */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-square w-full bg-gray-900">
                <img
                  src={getItemImage(params.id)}
                  alt={item.InternalName}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/items/default-item.png'
                  }}
                />
              </div>
            </div>

            {/* Meta Score */}
            <MetaScore item={item} />

            {/* Heroes */}
            {item.Heroes.length > 0 && item.Heroes[0] !== 'Common' && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Available for Heroes</h3>
                <div className="flex flex-wrap gap-2">
                  {item.Heroes.map((hero, index) => {
                    const colors = heroColors[hero as keyof typeof heroColors] || heroColors.Common
                    return (
                      <span 
                        key={index}
                        className={`
                          px-4 py-2 rounded-lg text-sm
                          ${colors.bg} ${colors.text} ${colors.ring}
                        `}
                      >
                        👑 {hero}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tier Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {tiers.map(tier => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 sm:flex-none
                      ${tier === selectedTier 
                        ? `bg-gray-700 text-white ring-1 ring-blue-500` 
                        : 'text-gray-400 hover:text-gray-200 bg-gray-900'
                      }
                    `}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              {currentTierData && (
                <TierDetails 
                  tier={selectedTier}
                  data={currentTierData}
                  showComparison={tierIndex > 0}
                  previousTierData={previousTierData}
                />
              )}
            </div>

            {/* Encounters */}
            {dropsFrom.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Skull className="w-5 h-5" />
                  Drops From
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dropsFrom.map((encounter) => (
                    <Link 
                      key={encounter.id}
                      href={`/encounters?searchQuery=${encodeURIComponent(encounter.name)}`}
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <div className="absolute inset-0">
                        <img
                          src={getEncounterImage(encounter.name)}
                          alt={encounter.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = '/encounters/default-encounter.webp'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                      </div>
                      <div className="relative p-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white group-hover:text-blue-300 transition-colors">
                            {encounter.name}
                          </div>
                          <div className="text-sm text-gray-400">Level {encounter.Level}</div>
                        </div>
                        <Icon icon={ArrowRight} className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Update TierDetails component to be more responsive
function TierDetails({ tier, data, showComparison = false, previousTierData = null }) {
  return (
    <div className="space-y-6">
      {/* Combat Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formatStat(
          'Damage', 
          data.Attributes.DamageAmount,
          previousTierData?.Attributes.DamageAmount,
          Sword
        )}
        {formatStat(
          'Cast Time', 
          data.Attributes.CooldownMax,
          previousTierData?.Attributes.CooldownMax,
          Clock,
          (val) => `${(val / 1000).toFixed(1)}s`
        )}
        {formatStat(
          'Multicast', 
          data.Attributes.Multicast,
          previousTierData?.Attributes.Multicast,
          Zap
        )}
        {/* Add other persistent stats here */}
      </div>

      {/* Economy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formatStat(
          'Buy Price', 
          data.Attributes.BuyPrice,
          previousTierData?.Attributes.BuyPrice,
          Coins
        )}
        {formatStat(
          'Sell Value', 
          data.Attributes.SellPrice,
          previousTierData?.Attributes.SellPrice,
          Coins
        )}
      </div>

      {/* Effects & Abilities */}
      {data.tooltips && data.tooltips.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Star className="w-5 h-5" />
            Effects & Abilities
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {data.tooltips.map((tooltip: any, index: number) => {
              const tooltipContent = typeof tooltip === 'string' 
                ? tooltip 
                : tooltip?.Content?.Text || '';
              const tooltipType = typeof tooltip === 'string' 
                ? '' 
                : tooltip?.TooltipType || '';

              return (
                <div 
                  key={index}
                  className="bg-gray-900 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <Icon 
                      icon={tooltipType === 'Active' ? Sword : 
                            tooltipType === 'Passive' ? Shield : Star} 
                      className="w-5 h-5 mt-1"
                    />
                    <div>
                      <div className="text-gray-300">{tooltipContent}</div>
                      {tooltipType && (
                        <div className="text-sm text-gray-500 mt-1">{tooltipType}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to get encounter image
function getEncounterImage(encounterName: string) {
  const formattedName = encounterName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
  return `/encounters/${formattedName}.webp`
}

// Helper to format persistent stats
function formatStat(
  label: string, 
  value: number | undefined, 
  prevValue: number | undefined, 
  icon: LucideIcon,
  formatter?: (val: number) => string
) {
  if (!value) return null
  
  const formattedValue = formatter ? formatter(value) : value
  const difference = prevValue ? value - prevValue : 0
  const showDifference = prevValue && difference !== 0

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Icon icon={icon} className="w-4 h-4" />
        {label}
      </div>
      <div className="text-xl text-white">
        {formattedValue}
        {showDifference && (
          <span className={`text-sm ml-2 ${difference > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {difference > 0 ? '+' : ''}{formatter ? formatter(difference) : difference}
          </span>
        )}
      </div>
    </div>
  )
}
