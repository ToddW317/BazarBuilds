'use client'

import { BuildSortOption } from '@/types/types'

interface BuildsFilterSidebarProps {
  className?: string
  onSortChange: (sort: BuildSortOption) => void
  onTagSearch: (tag: string) => void
  onHeroFilter: (hero: string | null) => void
  onBuildTypeFilter: (type: string | null) => void
  onDifficultyFilter: (difficulty: string | null) => void
  activeFilters: {
    hero: string | null
    buildType: string | null
    difficulty: string | null
    tag: string
    sort: BuildSortOption
  }
}

export default function BuildsFilterSidebar({
  className = '',
  onSortChange,
  onTagSearch,
  onHeroFilter,
  onBuildTypeFilter,
  onDifficultyFilter,
  activeFilters
}: BuildsFilterSidebarProps) {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Sort By</h3>
          <select 
            value={activeFilters.sort}
            onChange={(e) => onSortChange(e.target.value as BuildSortOption)}
            className="w-full bg-gray-700 rounded p-2"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="mostViewed">Most Viewed</option>
            <option value="topRated">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  )
} 