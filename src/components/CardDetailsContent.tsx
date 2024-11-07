'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import WIPBadge from '@/components/WIPBadge'
import { Item, Build } from '@/types/encounters'
import encounterData from '@/data/out.json'
import { Tab } from '@headlessui/react'
import { getRelatedBuilds } from '@/lib/buildService'
import { formatImagePath } from '@/components/CardDisplay'
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

const tierStyles = {
  Bronze: 'border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.3)]',
  Silver: 'border-gray-400 shadow-[0_0_15px_rgba(156,163,175,0.3)]',
  Gold: 'border-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
  Diamond: 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
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

interface CardDetailsProps {
  params: {
    id: string
  }
}

interface BuildStatistics {
  totalBuilds: number
  popularityScore: number // 0-100
  winRate: number // 0-100
  pickRate: number // 0-100
  metaScore: number // 0-100
  topBuilds: {
    id: string
    name: string
    author: string
    votes: number
    winRate: number
  }[]
}

interface ChangelogEntry {
  date: string
  version: string
  changes: {
    type: 'buff' | 'nerf' | 'change' | 'bugfix'
    description: string
  }[]
}

export default function CardDetailsContent({ params }: CardDetailsProps) {
  const item = (encounterData.items as Record<string, Item>)[params.id]
  const [selectedTier, setSelectedTier] = useState<string>(item?.StartingTier || '')
  const [selectedTab, setSelectedTab] = useState(0)
  const [relatedBuilds, setRelatedBuilds] = useState<Build[]>([])
  const [statistics, setStatistics] = useState<BuildStatistics>({
    totalBuilds: 0,
    popularityScore: 0,
    winRate: 0,
    pickRate: 0,
    metaScore: 0,
    topBuilds: []
  })

  const changelog: ChangelogEntry[] = [
    {
      date: '2024-03-15',
      version: '1.2.0',
      changes: [
        { type: 'buff', description: 'Increased base damage by 10%' },
        { type: 'change', description: 'Adjusted scaling with character level' }
      ]
    },
    {
      date: '2024-02-28',
      version: '1.1.5',
      changes: [
        { type: 'nerf', description: 'Reduced effect duration from 5s to 4s' },
        { type: 'bugfix', description: 'Fixed interaction with certain hero abilities' }
      ]
    }
  ]

  const getItemImageUrl = (itemId: string) => {
    try {
      if (!item) return '/items/default-item.png'
      
      const imagePath = formatImagePath(
        item.InternalName,
        item.Size,
        item.Heroes[0] || 'Common'
      )
      return `/items/${imagePath}`
    } catch (error) {
      console.error('Error getting item image:', error)
      return '/items/default-item.png'
    }
  }

  useEffect(() => {
    const loadRelatedBuilds = async () => {
      const builds = await getRelatedBuilds(params.id)
      setRelatedBuilds(builds)
    }
    loadRelatedBuilds()
  }, [params.id])

  if (!item) {
    return <div className="text-white">Card not found</div>
  }

  const currentTierData = item.Tiers[selectedTier as keyof typeof item.Tiers]
  const tiers = Object.keys(item.Tiers)

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mb-8">
        <WIPBadge />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className={`
              bg-gray-800 rounded-xl overflow-hidden border
              ${tierStyles[selectedTier as keyof typeof tierStyles] || ''}
            `}>
              <div className="relative aspect-video">
                <img
                  src={getItemImageUrl(params.id)}
                  alt={item.InternalName}
                  className="w-full h-full object-contain bg-gray-900"
                  onError={(e: any) => {
                    e.currentTarget.src = '/items/default-item.png'
                  }}
                />
              </div>

              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h1 className="text-xl font-bold text-white">{item.InternalName}</h1>
                  <span className={`
                    px-2 py-1 rounded-full text-sm font-medium
                    ${item.Size === 'Small' ? 'bg-green-500/20 text-green-300 ring-1 ring-green-500/50' :
                      item.Size === 'Medium' ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/50' :
                      'bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/50'}
                  `}>
                    {item.Size}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.Tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-700/50 text-gray-300 text-sm"
                    >
                      <span className="text-lg">{tagIcons[tag]}</span>
                      {tag}
                    </span>
                  ))}
                </div>

                {item.Heroes.length > 0 && item.Heroes[0] !== 'Common' && (
                  <div className="flex flex-wrap gap-2">
                    {item.Heroes.map((hero, index) => {
                      const colors = heroColors[hero as keyof typeof heroColors] || heroColors.Common;
                      return (
                        <span 
                          key={index}
                          className={`
                            text-sm px-2 py-1 rounded-lg ring-1
                            ${colors.bg} ${colors.text} ${colors.ring}
                          `}
                        >
                          👑 {hero}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-xl p-4">
              <h2 className="text-lg font-semibold text-white mb-4">Tier Information</h2>
              <div className="flex gap-2 mb-4">
                {tiers.map(tier => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${tier === selectedTier 
                        ? `${getTierColor(tier)} ring-1 ring-current bg-gray-700/30` 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/20'}
                    `}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              {currentTierData && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-blue-400 font-semibold mb-3">Attributes</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(currentTierData.Attributes)
                        .filter(([key]) => key !== 'CooldownMax')
                        .map(([key, value]) => {
                          const iconInfo = attributeIcons[key]
                          if (!iconInfo) return null

                          return (
                            <div 
                              key={key}
                              className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3"
                              title={iconInfo.label}
                            >
                              <span className="text-2xl">{iconInfo.icon}</span>
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-400">{iconInfo.label}</span>
                                <span className="text-white font-medium">
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
                  </div>

                  {currentTierData.tooltips && (
                    <div>
                      <h3 className="text-green-400 font-semibold mb-3">Effects</h3>
                      <div className="space-y-3">
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
                              className="flex items-start gap-3 bg-gray-700/30 rounded-lg p-4"
                            >
                              <span className="text-xl mt-0.5">
                                {tooltipType === 'Active' ? '🎯' : 
                                 tooltipType === 'Passive' ? '✨' : '📜'}
                              </span>
                              <div className="flex-1">
                                <div className="text-gray-300">{tooltipContent}</div>
                                {tooltipType && (
                                  <div className="text-sm text-gray-500 mt-2">{tooltipType}</div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {relatedBuilds.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-white mb-4">Related Builds</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedBuilds.map((build, index) => (
                    <Link 
                      key={index}
                      href={`/builds/${build.id}`}
                      className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                    >
                      <h3 className="text-white font-medium mb-2">{build.name}</h3>
                      <p className="text-sm text-gray-400">{build.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Card Statistics</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Meta Score</span>
            <span className={`
              text-lg font-bold px-3 py-1 rounded-full
              ${statistics.metaScore >= 80 ? 'bg-green-500/20 text-green-300' :
                statistics.metaScore >= 60 ? 'bg-blue-500/20 text-blue-300' :
                statistics.metaScore >= 40 ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'}
            `}>
              {statistics.metaScore}/100
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="text-sm text-gray-400">Popularity</div>
            <div className="text-2xl font-bold text-white">{statistics.popularityScore}%</div>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="text-sm text-gray-400">Win Rate</div>
            <div className="text-2xl font-bold text-white">{statistics.winRate}%</div>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="text-sm text-gray-400">Pick Rate</div>
            <div className="text-2xl font-bold text-white">{statistics.pickRate}%</div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Popular Builds</h3>
          <div className="space-y-3">
            {statistics.topBuilds.length > 0 ? (
              statistics.topBuilds.map((build, index) => (
                <Link 
                  key={build.id}
                  href={`/builds/${build.id}`}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
                    <div>
                      <div className="font-medium text-white">{build.name}</div>
                      <div className="text-sm text-gray-400">by {build.author}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      <span className="text-yellow-400">★</span> {build.votes}
                    </div>
                    <div className="text-sm text-green-400">{build.winRate}% WR</div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-2">📊</div>
                <div className="font-medium">No builds yet</div>
                <div className="text-sm">Be the first to create a build with this card!</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Changelog</h2>
        <div className="space-y-4">
          {changelog.map((entry, index) => (
            <div key={index} className="border-l-2 border-gray-700 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-400">
                  {entry.date}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                  v{entry.version}
                </span>
              </div>
              <div className="space-y-2">
                {entry.changes.map((change, changeIndex) => (
                  <div 
                    key={changeIndex}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-1">
                      {change.type === 'buff' ? '⬆️' :
                       change.type === 'nerf' ? '⬇️' :
                       change.type === 'bugfix' ? '🐛' : '📝'}
                    </span>
                    <span className={`
                      text-sm
                      ${change.type === 'buff' ? 'text-green-400' :
                        change.type === 'nerf' ? 'text-red-400' :
                        change.type === 'bugfix' ? 'text-blue-400' :
                        'text-gray-300'}
                    `}>
                      {change.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
