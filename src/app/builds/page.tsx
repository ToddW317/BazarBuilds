'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getBuilds } from '@/lib/buildService'
import { Build, BuildSortOption } from '@/types/types'
import BuildsGrid from '@/components/BuildsGrid'
import BuildsFilter from '@/components/BuildsFilter'
import BuildsNavigation from '@/components/BuildsNavigation'

export default function BuildsPage() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [filteredBuilds, setFilteredBuilds] = useState<Build[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadBuilds = async (sortBy: BuildSortOption = 'newest') => {
    setIsLoading(true)
    const newBuilds = await getBuilds(sortBy)
    setBuilds(newBuilds)
    setFilteredBuilds(newBuilds)
    setIsLoading(false)
  }

  useEffect(() => {
    loadBuilds()
  }, [])

  const handleSortChange = (sortBy: BuildSortOption) => {
    loadBuilds(sortBy)
  }

  const handleTagSearch = (tag: string) => {
    if (!tag) {
      setFilteredBuilds(builds)
      return
    }
    
    const filtered = builds.filter(build => 
      build.tags?.some(buildTag => 
        buildTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
    setFilteredBuilds(filtered)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Builds</h1>
          <p className="text-gray-400">Discover and share the best builds for The Bazaar</p>
        </div>
        
        <Link 
          href="/builds/new"
          className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit Build
        </Link>
      </div>

      <BuildsNavigation />
      
      <BuildsFilter 
        onSortChange={handleSortChange}
        onTagSearch={handleTagSearch}
      />

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading builds...</p>
        </div>
      ) : (
        <BuildsGrid initialBuilds={filteredBuilds} />
      )}
    </div>
  )
} 