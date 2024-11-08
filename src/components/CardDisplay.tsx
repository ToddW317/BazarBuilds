'use client'

import { useState } from 'react';
import { Item } from '@/types/encounters';
import { getItemImageUrl } from '@/utils/imageUtils'; // Import statement added
import { attributeIcons, tagIcons, decipherCustomAttribute } from '@/utils/cardIcons';
import { heroColors, tierStyles, sizeWidths, getTierColor } from '@/utils/styleConstants';
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
} from 'lucide-react';

interface CardDisplayProps {
  item: Item;
  itemId: string;
}

export default function CardDisplay({ item, itemId }: CardDisplayProps) {
  const [selectedTier, setSelectedTier] = useState<string>(item.StartingTier);
  const [imageError, setImageError] = useState(false);
  const currentTierData = item.Tiers[selectedTier] || {};
  const attributes = currentTierData.Attributes || {};

  const [imagePath, setImagePath] = useState<string>(() => getItemImageUrl(item));

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

  // Update the getDefaultTooltip function to include ability names
  const getAbilityDisplay = (attributes: Record<string, any>, tooltips: any[] | undefined) => {
    // If tooltips array is empty or undefined, return "no abilities" message
    if (!tooltips || tooltips.length === 0) {
      return {
        name: "No Ability",
        description: "This card has no abilities"
      };
    }
    
    // If there's a tooltip but it's empty, return no abilities message
    if (tooltips[0] === "") {
      return {
        name: "Basic Attack",
        description: attributes.DamageAmount 
          ? `Deal ${attributes.DamageAmount} damage` 
          : "No abilities for this card"
      };
    }
    
    // Return the tooltip text
    return {
      name: "Active Ability",
      description: tooltips[0]
    };
  };

  // Add the same helper function
  const getAttributeDescription = (key: string): string => {
    switch(key) {
      case 'BuyPrice':
        return 'Buy Price';
      case 'SellPrice':
        return 'Sell Price';
      case 'DamageAmount':
        return 'Damage';
      case 'ShieldAmount':
        return 'Shield';
      case 'HealAmount':
        return 'Heal';
      case 'BurnAmount':
        return 'Burn';
      case 'FreezeAmount':
        return 'Freeze';
      case 'PoisonAmount':
        return 'Poison';
      case 'HasteAmount':
        return 'Haste';
      case 'CooldownMax':
        return 'Cast Time';
      case 'Multicast':
        return 'Multicast';
      default:
        return key;
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-2 transition-all duration-300 max-w-sm">
      <div 
        onClick={() => window.open(`/cards/${itemId}`, '_blank')}
        className={`
          bg-gray-800 rounded-lg overflow-hidden border transition-all duration-300
          ${tierStyles[selectedTier as keyof typeof tierStyles]}
          cursor-pointer hover:border-blue-500/50
          h-full flex flex-col
        `}
      >
        {/* Card Header with Image */}
        <div className="relative">
          <div className="relative aspect-video w-full">
            {!imageError ? (
              <img
                src={imagePath}
                alt={item.InternalName}
                className="w-full h-full object-cover"
                onError={() => {
                  if (!imageError) {
                    setImageError(true);
                    // Try to get alternative image
                    const newPath = getItemImageUrl({...item, ArtKey: ''});
                    if (newPath !== imagePath) {
                      setImagePath(newPath);
                    }
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image not available</span>
              </div>
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            
            {/* Card Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-lg font-bold text-white drop-shadow-lg">
                {item.InternalName}
              </h3>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-3 space-y-3 flex-1 flex flex-col">
          {/* Tier Selection */}
          <div className="flex gap-1">
            {Object.keys(item.Tiers).map((tier) => (
              <button
                key={tier}
                onClick={(e) => {
                  e.stopPropagation();
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

          {/* Hero and Size Tags */}
          <div className="flex flex-wrap gap-1.5">
            {/* Hero Tag */}
            {item.Heroes.map((hero, index) => {
              const colors = heroColors[hero as keyof typeof heroColors] || heroColors.Common;
              return (
                <span
                  key={`hero-${index}`}
                  className={`
                    px-2 py-0.5 rounded flex items-center gap-1 text-xs
                    ${colors.bg} ${colors.text} ${colors.ring}
                  `}
                >
                  <Crown className="w-3 h-3" />
                  {hero}
                </span>
              );
            })}

            {/* Size Tag */}
            <span
              className="px-2 py-0.5 bg-gray-700/50 rounded flex items-center gap-1 text-xs text-blue-300"
            >
              <Maximize2 className="w-3 h-3" />
              {item.Size}
            </span>
          </div>

          {/* Regular Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.Tags.map((tag, index) => (
              <span
                key={`tag-${index}`}
                className="px-2 py-0.5 bg-gray-700/50 rounded text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Abilities Section - Updated */}
          {currentTierData && attributes && (
            <div className="bg-gray-700/30 rounded p-2 space-y-2">
              {/* Ability Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-300">
                  {getAbilityDisplay(attributes, currentTierData.tooltips).name}
                </span>
                {attributes.CooldownMax && (
                  <span className="text-xs text-blue-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {(attributes.CooldownMax / 1000).toFixed(1)}s
                  </span>
                )}
              </div>
              {/* Ability Description */}
              <p className="text-xs text-gray-300 leading-relaxed">
                {getAbilityDisplay(attributes, currentTierData.tooltips).description}
              </p>
            </div>
          )}

          {/* Attributes Section */}
          {currentTierData && attributes && (
            <div className="grid grid-cols-2 gap-1.5 text-sm mt-auto">
              {Object.entries(attributes)
                .filter(([key]) => !key.startsWith('Custom_'))
                .map(([key, value]) => {
                  const icon = getAttributeIcon(key);
                  if (!icon) return null;

                  return (
                    <div 
                      key={key}
                      className="flex items-center gap-1.5 bg-gray-700/30 rounded p-1.5"
                    >
                      <span className="text-gray-400 text-xs">
                        {getAttributeDescription(key)}
                      </span>
                      {icon}
                      <span className="text-white">
                        {typeof value === 'number' && key.includes('Price') 
                          ? `${value}g`
                          : typeof value === 'number' && value > 1000 
                            ? `${(value / 1000).toFixed(1)}s`
                            : value}
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}