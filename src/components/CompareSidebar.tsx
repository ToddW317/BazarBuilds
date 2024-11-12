'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCompareStore } from '@/store/compareStore';
import { X, ChevronDown, Crown, Maximize2, Sparkles, ChevronLeft, ChevronRight, List } from 'lucide-react';
import Link from 'next/link';
import { parseCardTooltip } from '@/utils/cardTooltipFormatter';
import { getAttributeIcon, getAttributeLabel } from '@/utils/attributeUtils';
import { useState, useRef } from 'react';
import { ENCHANTMENTS } from './EnchantmentsDisplay';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ComparedItem = {
  id: string;
  type: 'item' | 'skill' | 'encounter';
  name: string;
  imageUrl?: string;
  attributes?: Record<string, any>;
  tooltips?: string[];
  size?: string;
  heroes?: string[];
  tags?: string[];
  enchantments?: Record<string, any>;
  tiers?: Record<string, any>;
  startingTier?: string;
};

export const CompareSidebar = () => {
  const { comparedItems, removeItem, clearItems } = useCompareStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTiers, setSelectedTiers] = useState<Record<string, string>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll function
  const smoothScroll = (target: number, duration: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const start = container.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Using a less dramatic easing function for quicker response
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      
      container.scrollLeft = start + (distance * easeOutQuad);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const targetScroll = container.scrollLeft - 300;
    smoothScroll(targetScroll, 150);
  };

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const targetScroll = container.scrollLeft + 300;
    smoothScroll(targetScroll, 150);
  };

  if (comparedItems.length === 0) return null;

  const formatAttributeValue = (key: string, value: any): string => {
    if (typeof value !== 'number') return value.toString();
    
    if (key.toLowerCase().includes('cooldown')) {
      return `${(value / 1000).toFixed(1)}s`;
    }
    
    return value.toString();
  };

  const renderTooltip = (tooltip: string, attributes: Record<string, any> = {}) => {
    const segments = parseCardTooltip(tooltip, attributes);
    return (
      <div className="flex flex-wrap items-start gap-x-1.5 gap-y-1 text-sm leading-relaxed">
        {segments.map(({ id, text, color, Icon }) => (
          <span key={id} className="inline-flex items-center gap-1.5 whitespace-normal">
            {Icon && <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />}
            <span className={`${color ? `font-semibold ${color}` : 'text-gray-300'} break-words`}>
              {text}
            </span>
          </span>
        ))}
      </div>
    );
  };

  const handleTierChange = (e: React.MouseEvent, itemId: string, tier: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTiers(prev => ({ ...prev, [itemId]: tier }));
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t shadow-lg z-50"
    >
      {/* Header */}
      <div className="border-b border-gray-700">
        <div className="p-4 flex items-center justify-between">
          <div 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2 cursor-pointer flex-1"
          >
            <span className="text-lg font-medium">
              Comparing {comparedItems.length} {comparedItems.length === 1 ? 'Card' : 'Cards'}
            </span>
            <ChevronDown 
              className={`w-5 h-5 transform transition-transform duration-200 
                ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </div>
          <div className="flex items-center gap-2">
            {/* Quick Navigation Menu */}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="hover:bg-gray-700 rounded-lg transition-colors p-2 flex items-center gap-2">
                    <List className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  align="center"
                  sideOffset={5}
                  className="bg-gray-800/95 border border-gray-700 p-0 w-[300px] overflow-hidden"
                  style={{ transform: 'translateX(-50%)' }}
                >
                  <motion.div
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    exit={{ x: -300 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="w-full"
                  >
                    <div className="p-3 border-b border-gray-700">
                      <div className="text-sm font-medium text-gray-400">Quick Navigation</div>
                    </div>
                    <div 
                      className="max-h-[300px] overflow-y-auto custom-scrollbar"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgb(75 85 99) transparent'
                      }}
                    >
                      {comparedItems.map((item) => (
                        <Link 
                          key={item.id}
                          href={`/cards/${item.id}`}
                          className="flex items-center gap-3 p-3 hover:bg-gray-700/50 transition-colors border-b border-gray-700/50 last:border-0"
                        >
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-10 h-10 object-contain rounded-md bg-gray-700/50"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">
                              {item.name}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {item.size && (
                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                  <Maximize2 className="w-3 h-3" />
                                  {item.size}
                                </div>
                              )}
                              {item.heroes?.[0] && (
                                <div className="text-xs text-purple-300 flex items-center gap-1">
                                  <Crown className="w-3 h-3" />
                                  {item.heroes[0]}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Clear All Button */}
            <button
              onClick={clearItems}
              className="hover:bg-gray-700 rounded-lg transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto', maxHeight: '80vh' }}
            exit={{ height: 0 }}
            className="relative"
          >
            <div className="p-4 relative">
              {/* Left Navigation Button */}
              <button
                onClick={handleScrollLeft}
                className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-800/80 to-transparent z-10 flex items-center justify-center hover:from-gray-800/95 transition-all group"
              >
                <ChevronLeft className="w-8 h-8 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Right Navigation Button */}
              <button
                onClick={handleScrollRight}
                className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-800/80 to-transparent z-10 flex items-center justify-center hover:from-gray-800/95 transition-all group"
              >
                <ChevronRight className="w-8 h-8 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Card Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto overflow-y-visible scrollbar-hide pb-4 px-12"
                style={{
                  scrollBehavior: 'smooth',
                }}
              >
                {comparedItems.map((item: ComparedItem) => {
                  const currentTier = selectedTiers[item.id] || item.startingTier || 'Bronze';
                  const tierData = item.tiers?.[currentTier] || {};

                  return (
                    <div key={item.id} className="relative flex-shrink-0" style={{ width: '300px' }}>
                      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
                        {/* Header with image and name */}
                        <div className="flex items-start gap-4 mb-4">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 object-contain"
                            />
                          )}
                          <h3 className="text-lg font-medium">{item.name}</h3>
                        </div>

                        {/* Tier Selection */}
                        {item.tiers && (
                          <div className="flex gap-2 mb-4">
                            {Object.keys(item.tiers).map((tier) => (
                              <button
                                key={tier}
                                onClick={(e) => handleTierChange(e, item.id, tier)}
                                className={`px-2 py-1 rounded text-sm ${
                                  currentTier === tier
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                }`}
                              >
                                {tier}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Tags Section */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {/* Size Tag */}
                          {item.size && (
                            <span className="px-2 py-1 bg-indigo-500/20 rounded text-xs text-indigo-300 flex items-center gap-1">
                              <Maximize2 className="w-3 h-3" />
                              {item.size}
                            </span>
                          )}

                          {/* Hero Tag */}
                          {item.heroes?.[0] && (
                            <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300 flex items-center gap-1">
                              <Crown className="w-3 h-3" />
                              {item.heroes[0]}
                            </span>
                          )}

                          {/* Item Tags */}
                          {item.tags?.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-500/20 rounded text-xs text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Enchantments Dropdown */}
                        {item.enchantments && Object.keys(item.enchantments).length > 0 && (
                          <div className="mb-4">
                            <TooltipProvider delayDuration={0}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="px-3 py-1 bg-purple-500/20 rounded flex items-center gap-1.5 text-sm text-purple-300 hover:bg-purple-500/30 transition-colors cursor-pointer">
                                    <Sparkles className="w-4 h-4" />
                                    {Object.keys(item.enchantments).length} Enchant{Object.keys(item.enchantments).length !== 1 ? 's' : ''}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent 
                                  side="top" 
                                  className="bg-gray-800/95 border border-gray-700 p-2 w-[300px]"
                                >
                                  <div className="grid grid-cols-1 gap-2">
                                    {Object.entries(item.enchantments).map(([enchantName]) => {
                                      const enchantData = ENCHANTMENTS[enchantName];
                                      if (!enchantData) return null;
                                      
                                      return (
                                        <div 
                                          key={enchantName}
                                          className="flex items-start gap-2 p-2 rounded border"
                                          style={{
                                            backgroundColor: enchantData.bgColor,
                                            borderColor: enchantData.borderColor
                                          }}
                                        >
                                          <enchantData.Icon 
                                            style={{ color: enchantData.color }} 
                                            className="w-4 h-4 flex-shrink-0 mt-0.5" 
                                          />
                                          <div className="flex-1">
                                            <span 
                                              style={{ color: enchantData.color }} 
                                              className="font-medium block text-sm"
                                            >
                                              {enchantData.Name}
                                            </span>
                                            {enchantData.Tooltips.map((tooltip: string, i: number) => (
                                              <span key={i} className="text-xs text-gray-300 block">
                                                {tooltip}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}

                        {/* Attributes */}
                        {tierData.Attributes && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {Object.entries(tierData.Attributes)
                              .filter(([key, value]) => 
                                !key.startsWith('Custom_') && 
                                !(key === 'Multicast' && value === 1)
                              )
                              .map(([key, value]) => {
                                const icon = getAttributeIcon(key);
                                if (!icon) return null;

                                return (
                                  <div key={key} className="flex items-center gap-2 text-sm">
                                    {icon}
                                    <span className="text-gray-400">{getAttributeLabel(key)}:</span>
                                    <span className="text-white">
                                      {formatAttributeValue(key, value)}
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                        )}

                        {/* Tooltips */}
                        {item.tooltips && (
                          <div className="space-y-2 mb-4">
                            {item.tooltips.map((tooltip, index) => (
                              <div key={index}>
                                {renderTooltip(tooltip, tierData.Attributes)}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Card Details Link */}
                        <Link 
                          href={`/cards/${item.id}`}
                          className="block w-full py-2 px-4 bg-blue-500/10 hover:bg-blue-500/20 
                            text-blue-400 rounded-lg transition-colors text-sm font-medium text-center mb-2"
                        >
                          View Details
                        </Link>

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-full py-2 px-4 bg-red-500/10 hover:bg-red-500/20 
                            text-red-400 rounded-lg transition-colors text-sm font-medium"
                        >
                          Remove from Compare
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 