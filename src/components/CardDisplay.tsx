'use client'

import { useState } from 'react'
import { Item } from '@/types/encounters'
import { attributeIcons, tagIcons, decipherCustomAttribute } from '@/utils/cardIcons'

const sizeWidths = {
  Small: 'w-1/4',
  Medium: 'w-1/3',
  Large: 'w-1/2'
} as const

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

export default function CardDisplay({ item, itemId }: CardDisplayProps) {
  const [selectedTier, setSelectedTier] = useState<string>(item.StartingTier)
  const tiers = Object.keys(item.Tiers)
  const currentTierData = item.Tiers[selectedTier as keyof typeof item.Tiers]

  return (
    <div className={`${sizeWidths[item.Size]} p-2 transition-all duration-300`}>
      <div className={`
        bg-gray-800 rounded-xl overflow-hidden h-full border-2 transition-all duration-300
        ${tierStyles[selectedTier as keyof typeof tierStyles]}
      `}>
        {/* Card Header */}
        <div className="p-4 bg-gray-900/50">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">
              {item.InternalName}
            </h3>
            <div className="flex gap-1">
              {item.Tags.map((tag, i) => (
                <span key={i} className="text-lg" title={tag}>
                  {tagIcons[tag] || tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tier Selection */}
          <div className="mt-4 flex gap-1">
            {tiers.map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`
                  px-2 py-1 rounded text-sm font-medium transition-all
                  ${tier === selectedTier 
                    ? `${getTierColor(tier)} ring-1 ring-current scale-110` 
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                {tier[0]} {/* Just show first letter of tier */}
              </button>
            ))}
          </div>
        </div>

        {currentTierData && (
          <div className="p-4 space-y-3">
            {/* Key Attributes */}
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
                      title={iconInfo.label}
                    >
                      <span className="text-lg">{iconInfo.icon}</span>
                      <span className="text-white">
                        {key === 'Custom_0' 
                          ? decipherCustomAttribute(key, value as number, item.Tags)
                          : value
                        }
                      </span>
                    </div>
                  )
                })}
            </div>

            {/* Effects */}
            {currentTierData.tooltips && (
              <div className="space-y-1">
                {currentTierData.tooltips.map((tooltip, index) => (
                  <div 
                    key={index}
                    className="text-sm text-gray-300 bg-gray-700/30 rounded-lg p-2"
                  >
                    {tooltip.TooltipType === 'Active' && '🎯 '}
                    {tooltip.TooltipType === 'Passive' && '✨ '}
                    {tooltip.Content.Text}
                  </div>
                ))}
              </div>
            )}

            {/* Heroes */}
            {item.Heroes.length > 0 && item.Heroes[0] !== 'Common' && (
              <div className="flex flex-wrap gap-1">
                {item.Heroes.map((hero, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs rounded-lg bg-purple-900/20 text-purple-300"
                  >
                    👑 {hero}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 