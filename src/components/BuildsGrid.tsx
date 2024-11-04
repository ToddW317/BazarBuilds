'use client'

import { Build } from '@/types/types'
import { useState, useEffect } from 'react'
import BuildCard from './BuildCard'

interface BuildsGridProps {
  initialBuilds: Build[]
}

export default function BuildsGrid({ initialBuilds }: BuildsGridProps) {
  const [builds, setBuilds] = useState<Build[]>(initialBuilds)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (initialBuilds) {
      setBuilds(initialBuilds)
    }
    setIsLoading(false)
  }, [initialBuilds])

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300">Loading builds...</p>
      </div>
    )
  }

  if (!builds || builds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300">No builds found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {builds.map(build => (
        <BuildCard key={build.id} build={build} />
      ))}
    </div>
  )
} 