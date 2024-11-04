'use client'

import { useState } from 'react'
import { BuildSortOption } from '@/types/types'
import { HEROES } from '@/config/heroes'

interface BuildsFilterSidebarProps {
  onSortChange: (sort: BuildSortOption) => void
  onTagSearch: (tag: string) => void
  onHeroFilter?: (heroId: string | null) => void
  onBuildTypeFilter?: (type: string | null) => void
  onDifficultyFilter?: (difficulty: string | null) => void
  className?: string
  activeFilters?: {
    hero: string | null
    buildType: string | null
    difficulty: string | null
    tag: string | null
    sort: BuildSortOption
  }
}

export default function BuildsFilterSidebar({
  onSortChange,
  onTagSearch,
  onHeroFilter,
  onBuildTypeFilter,
  onDifficultyFilter,
  className = '',
  activeFilters = {
    hero: null,
    buildType: null,
    difficulty: null,
    tag: null,
    sort: 'newest'
  }
}: BuildsFilterSidebarProps) {
  const [isOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onTagSearch(searchInput.toLowerCase())
  }

  const handleClearSearch = () => {
    setSearchInput('')
    onTagSearch('')
  }

  return (
    <div className="space-y-4">
      {/* Search Bar - Always visible */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by tag..."
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                text-gray-100 placeholder-gray-400 pr-8"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                ×
              </button>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Active Filters Display - Mobile Only */}
      <div className="md:hidden">
        {(activeFilters.hero || activeFilters.buildType || activeFilters.difficulty || activeFilters.tag) && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.hero && (
              <button
                onClick={() => onHeroFilter?.(null)}
                className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
              >
                <span>{HEROES.find(h => h.id === activeFilters.hero)?.name}</span>
                <span className="font-bold">×</span>
              </button>
            )}
            {activeFilters.buildType && (
              <button
                onClick={() => onBuildTypeFilter?.(null)}
                className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
              >
                <span>{activeFilters.buildType}</span>
                <span className="font-bold">×</span>
              </button>
            )}
            {activeFilters.difficulty && (
              <button
                onClick={() => onDifficultyFilter?.(null)}
                className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
              >
                <span>{activeFilters.difficulty}</span>
                <span className="font-bold">×</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isOpen)}
          className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg 
            hover:bg-gray-700 transition-colors flex items-center justify-between"
        >
          <span>More Filters</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className={`
        ${className}
        ${isOpen ? 'block' : 'hidden'} 
        md:block
        bg-gray-800 rounded-lg p-4 space-y-6
        border border-gray-700
      `}>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Sort By</h3>
          <select
            value={activeFilters.sort}
            onChange={(e) => onSortChange(e.target.value as BuildSortOption)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              text-gray-100"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Liked</option>
            <option value="mostViewed">Most Viewed</option>
            <option value="topRated">Top Rated</option>
          </select>
        </div>

        {onHeroFilter && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Hero</h3>
            <div className="space-y-2">
              {HEROES.map(hero => (
                <button
                  key={hero.id}
                  onClick={() => onHeroFilter(activeFilters.hero === hero.id ? null : hero.id)}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${
                    activeFilters.hero === hero.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {hero.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {onBuildTypeFilter && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Build Type</h3>
            <div className="space-y-2">
              {['Aggro', 'Shield', 'Health'].map(type => (
                <button
                  key={type}
                  onClick={() => onBuildTypeFilter(activeFilters.buildType === type ? null : type)}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${
                    activeFilters.buildType === type
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {onDifficultyFilter && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Difficulty</h3>
            <div className="space-y-2">
              {['Easy', 'Medium', 'Hard'].map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => onDifficultyFilter(activeFilters.difficulty === difficulty ? null : difficulty)}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${
                    activeFilters.difficulty === difficulty
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 