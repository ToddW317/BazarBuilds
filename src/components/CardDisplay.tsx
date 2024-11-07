'use client'

import { useState } from 'react'
import { Item } from '@/types/encounters'
import { attributeIcons, tagIcons, decipherCustomAttribute } from '@/utils/cardIcons'
import { LucideIcon } from 'lucide-react'
import Icon from '@/components/ui/Icon'

// Define size type
type ItemSize = 'Small' | 'Medium' | 'Large'

// Update size widths to be more proportional
const sizeWidths: Record<ItemSize, string> = {
  Small: 'w-1/4',
  Medium: 'w-1/3',
  Large: 'w-2/5'
}

const tierStyles = {
  Bronze: 'border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.3)]',
  Silver: 'border-gray-400 shadow-[0_0_15px_rgba(156,163,175,0.3)]',
  Gold: 'border-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
  Diamond: 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
} as const

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

interface CardDisplayProps {
  item: Item
  itemId: string
}

// Add helper function to format image paths according to the pattern
export const formatImagePath = (itemName: string, size: string = 'M', character: string = 'ADV') => {
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

// Add getItemImageUrl function
const getItemImageUrl = (item: Item) => {
  // Try to get the first hero, fallback to 'Common'
  const hero = item.Heroes?.[0] || 'Common';
  return `/items/${formatImagePath(item.InternalName, item.Size, hero)}`;
};

// Add hero color mapping
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

export default function CardDisplay({ item, itemId }: CardDisplayProps) {
  const [selectedTier, setSelectedTier] = useState<string>(item.StartingTier)
  const tiers = Object.keys(item.Tiers)
  const currentTierData = item.Tiers[selectedTier as keyof typeof item.Tiers]

  return (
    <div className={`${sizeWidths[item.Size as ItemSize]} p-2 transition-all duration-300`}>
      <div 
        onClick={() => window.open(`/cards/${itemId}`, '_blank')}
        className={`
          bg-gray-800 rounded-lg overflow-hidden border transition-all duration-300 h-full
          ${tierStyles[selectedTier as keyof typeof tierStyles]}
          cursor-pointer hover:border-blue-500/50
        `}
      >
        {/* Card Header */}
        <div className="relative">
          {/* Card Art */}
          <div className="relative aspect-video w-full">
            <img
              src={getItemImageUrl(item)}
              alt={item.InternalName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const currentSrc = e.currentTarget.src;
                if (!currentSrc.includes('default-item')) {
                  if (item.ArtKey) {
                    e.currentTarget.src = `/items/${item.ArtKey}.png`;
                    return;
                  }
                }
                e.currentTarget.src = '/items/default-item.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            
            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-lg font-bold text-white leading-tight">
                  {item.InternalName}
                </h3>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-medium
                  ${item.Size === 'Small' ? 'bg-green-500/20 text-green-300 ring-1 ring-green-500/50' :
                    item.Size === 'Medium' ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/50' :
                    'bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/50'}
                `}>
                  {item.Size}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-3 space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {item.Tags.map((tag, i) => {
              const TagIcon = tagIcons[tag]
              return (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-gray-700/50 text-gray-300"
                >
                  {TagIcon && <Icon icon={TagIcon} className="w-3 h-3" />}
                  {tag}
                </span>
              )
            })}
          </div>

          {/* Tier Selection */}
          <div className="flex gap-1">
            {tiers.map(tier => (
              <button
                key={tier}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click when selecting tier
                  setSelectedTier(tier);
                }}
                className={`
                  px-2 py-1 rounded text-xs font-medium flex-1 transition-all
                  ${tier === selectedTier 
                    ? `${getTierColor(tier)} ring-1 ring-current` 
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                {tier}
              </button>
            ))}
          </div>

          {currentTierData && (
            <div className="space-y-2">
              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-1.5 text-sm">
                {Object.entries(currentTierData.Attributes)
                  .filter(([key]) => key !== 'CooldownMax')
                  .map(([key, value]) => {
                    const IconComponent = attributeIcons[key]?.icon
                    if (!IconComponent) return null

                    return (
                      <div 
                        key={key}
                        className="flex items-center gap-1.5 bg-gray-700/30 rounded p-1.5"
                        title={attributeIcons[key].label}
                      >
                        <Icon icon={IconComponent} className="w-4 h-4" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400">{attributeIcons[key].label}</span>
                          <span className="text-white">
                            {key === 'Custom_0' 
                              ? decipherCustomAttribute(key, value as number, item.Tags)
                              : value
                            }
                          </span>
                        </div>
                      </div>
                    )
                  })}
              </div>

              {/* Effects */}
              {currentTierData.tooltips && (
                <div className="space-y-1">
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
              {item.Heroes.length > 0 && item.Heroes[0] !== 'Common' && (
                <div className="flex flex-wrap gap-1">
                  {item.Heroes.map((hero, index) => {
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 