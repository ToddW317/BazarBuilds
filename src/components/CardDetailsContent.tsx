'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Item, Encounter, EncounterData } from '@/types/encounters'
import { getItemImageUrl } from '@/utils/imageUtils'
import { heroColors, tierStyles, getTierColor } from '@/utils/styleConstants'
import encounterData from '@/data/out.json'
import { 
  Clock, 
  Zap, 
  Sparkles, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Swords,
  Shield,
  Heart,
  Flame,
  Snowflake,
  Skull,
  Crown,
  Maximize2
} from 'lucide-react'

interface CardDetailsContentProps {
  params: { id: string }
  initialCard: Item
}

export default function CardDetailsContent({ params, initialCard }: CardDetailsContentProps) {
  const [selectedTier, setSelectedTier] = useState<string>(initialCard.StartingTier)
  const [imageError, setImageError] = useState(false)
  const [imagePath, setImagePath] = useState<string>(() => getItemImageUrl(initialCard))

  const currentTierData = initialCard.Tiers[selectedTier]
  const heroColor = initialCard.Heroes?.[0] 
    ? heroColors[initialCard.Heroes[0] as keyof typeof heroColors] || heroColors.Common
    : heroColors.Common

  // Find encounters that drop this item
  const foundInEncounters = useMemo(() => {
    const encounters: { name: string; level: number }[] = []
    const typedData = encounterData as unknown as EncounterData
    
    Object.entries(typedData.monsters || {}).forEach(([name, monster]) => {
      if (monster.Items.some(item => item.ItemID === params.id)) {
        encounters.push({
          name,
          level: monster.Level
        })
      }
    })

    return encounters.sort((a, b) => a.level - b.level)
  }, [params.id])

  // Map attributes to icons and labels
  const getAttributeIcon = (key: string) => {
    switch(key) {
      case 'BuyPrice':
        return (
          <div className="flex items-center gap-1 text-red-400">
            <DollarSign className="w-4 h-4" />
            <ArrowUpRight className="w-3 h-3" />
          </div>
        );
      case 'SellPrice':
        return (
          <div className="flex items-center gap-1 text-green-400">
            <DollarSign className="w-4 h-4" />
            <ArrowDownRight className="w-3 h-3" />
          </div>
        );
      case 'DamageAmount':
        return <Swords className="w-4 h-4 text-red-400" />;
      case 'ShieldAmount':
        return <Shield className="w-4 h-4 text-blue-400" />;
      case 'HealAmount':
        return <Heart className="w-4 h-4 text-green-400" />;
      case 'BurnAmount':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 'FreezeAmount':
        return <Snowflake className="w-4 h-4 text-cyan-400" />;
      case 'PoisonAmount':
        return <Skull className="w-4 h-4 text-purple-400" />;
      case 'HasteAmount':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'CooldownMax':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'Multicast':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      default:
        return null;
    }
  };

  // Add this helper function at the top of the component
  const getAllAttributeKeys = (tiers: Record<string, any>): string[] => {
    const allKeys = new Set<string>();
    Object.values(tiers).forEach(tier => {
      Object.keys(tier.Attributes || {})
        .filter(key => !key.startsWith('Custom_'))
        .forEach(key => allKeys.add(key));
    });
    return Array.from(allKeys).sort();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Image and Basic Info */}
      <div className="lg:col-span-1 space-y-6">
        {/* Card Image */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="aspect-video relative">
            {!imageError ? (
              <img
                src={imagePath}
                alt={initialCard.InternalName}
                className="w-full h-full object-cover"
                onError={() => {
                  if (!imageError) {
                    setImageError(true);
                    const newPath = getItemImageUrl({...initialCard, ArtKey: ''});
                    if (newPath !== imagePath) {
                      setImagePath(newPath);
                    }
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-4">{initialCard.InternalName}</h1>
            
            {/* Tags */}
            <div className="space-y-4">
              {/* Hero Tags */}
              <div className="flex flex-wrap gap-2">
                {initialCard.Heroes.map((hero, index) => {
                  const colors = heroColors[hero as keyof typeof heroColors] || heroColors.Common;
                  return (
                    <span
                      key={`hero-${index}`}
                      className={`
                        px-2 py-0.5 rounded flex items-center gap-1 text-sm
                        ${colors.bg} ${colors.text} ${colors.ring}
                      `}
                    >
                      <Crown className="w-4 h-4" />
                      {hero}
                    </span>
                  );
                })}
              </div>

              {/* Size Tag */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 bg-gray-700/50 rounded flex items-center gap-1 text-sm text-blue-300">
                  <Maximize2 className="w-4 h-4" />
                  {initialCard.Size}
                </span>
              </div>

              {/* Item Tags */}
              <div className="flex flex-wrap gap-2">
                {initialCard.Tags.map((tag, index) => (
                  <span
                    key={`tag-${index}`}
                    className="px-2 py-0.5 bg-gray-700/50 rounded text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Tiers, Abilities, Attributes */}
      <div className="lg:col-span-2 space-y-6">
        {/* Tier Selection */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex gap-2">
              {Object.keys(initialCard.Tiers).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`
                    px-3 py-1.5 rounded text-sm font-medium flex-1 transition-all
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
          </div>
        </div>

        {/* Attributes */}
        {currentTierData && (
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Attributes</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {getAllAttributeKeys(initialCard.Tiers).map(key => {
                  const value = currentTierData.Attributes[key];
                  const icon = getAttributeIcon(key);
                  if (!icon) return null;

                  return (
                    <div 
                      key={key}
                      className="flex items-center gap-2 bg-gray-700/30 rounded p-2"
                    >
                      {icon}
                      <span className="text-white">
                        {typeof value === 'number' && key.includes('Price') 
                          ? `${value}g`
                          : typeof value === 'number' && value > 1000 
                            ? `${(value / 1000).toFixed(1)}s`
                            : value || '0'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Abilities */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Abilities</h2>
            <div className="text-gray-300">
              {currentTierData.tooltips && currentTierData.tooltips[0] === "" 
                ? "No abilities for this card"
                : currentTierData.tooltips?.[0] || "No abilities for this card"}
            </div>
          </div>
        </div>

        {/* Found In Encounters */}
        {foundInEncounters.length > 0 && (
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Found In Encounters</h2>
              <div className="space-y-2">
                {foundInEncounters.map((encounter, index) => (
                  <Link
                    key={index}
                    href={`/encounters?search=${encodeURIComponent(encounter.name)}`}
                    className="block p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{encounter.name}</span>
                      <span className="text-sm text-gray-400">Level {encounter.level}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
