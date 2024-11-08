'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface EncounterFiltersProps {
  availableLevels: number[]
  onFilterChange: (filters: {
    search: string
    levels: number[]
    minHealth: number | null
    maxHealth: number | null
    hasItems: boolean
    hasSkills: boolean
  }) => void
  initialSearch?: string
}

export default function EncounterFilters({ availableLevels, onFilterChange, initialSearch = '' }: EncounterFiltersProps) {
  const [search, setSearch] = useState(initialSearch)
  const [selectedLevels, setSelectedLevels] = useState<number[]>([])
  const [minHealth, setMinHealth] = useState<string>('')
  const [maxHealth, setMaxHealth] = useState<string>('')
  const [hasItems, setHasItems] = useState(false)
  const [hasSkills, setHasSkills] = useState(false)

  useEffect(() => {
    onFilterChange({
      search,
      levels: selectedLevels,
      minHealth: minHealth ? parseInt(minHealth) : null,
      maxHealth: maxHealth ? parseInt(maxHealth) : null,
      hasItems,
      hasSkills
    })
  }, [search, selectedLevels, minHealth, maxHealth, hasItems, hasSkills])

  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-6">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search monsters..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            onFilterChange({
              search: e.target.value,
              levels: selectedLevels,
              minHealth: minHealth ? parseInt(minHealth) : null,
              maxHealth: maxHealth ? parseInt(maxHealth) : null,
              hasItems,
              hasSkills
            })
          }}
          className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Level Filter */}
      <div>
        <h3 className="text-white font-medium mb-2">Level</h3>
        <div className="flex flex-wrap gap-2">
          {availableLevels.map((level) => (
            <button
              key={level}
              onClick={() => {
                setSelectedLevels(prev =>
                  prev.includes(level)
                    ? prev.filter(l => l !== level)
                    : [...prev, level]
                )
              }}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedLevels.includes(level)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Health Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-white font-medium mb-2 block">Min Health</label>
          <input
            type="number"
            value={minHealth}
            onChange={(e) => setMinHealth(e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            placeholder="0"
          />
        </div>
        <div>
          <label className="text-white font-medium mb-2 block">Max Health</label>
          <input
            type="number"
            value={maxHealth}
            onChange={(e) => setMaxHealth(e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            placeholder="99999"
          />
        </div>
      </div>

      {/* Additional Filters */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={hasItems}
            onChange={(e) => setHasItems(e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          Has Items
        </label>
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={hasSkills}
            onChange={(e) => setHasSkills(e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          Has Skills
        </label>
      </div>
    </div>
  )
}
