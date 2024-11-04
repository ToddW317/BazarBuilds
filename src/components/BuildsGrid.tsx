'use client'

import { Build } from '@/types/types'
import { useState, useEffect } from 'react'
import BuildCard from './BuildCard'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore'

interface BuildsGridProps {
  initialBuilds: Build[]
  sortBy?: string
}

export default function BuildsGrid({ initialBuilds }: BuildsGridProps) {
  const [builds, setBuilds] = useState<Build[]>(initialBuilds)
  const [isLoading, setIsLoading] = useState(false)

  // Update builds when initialBuilds changes
  useEffect(() => {
    setBuilds(initialBuilds)
  }, [initialBuilds])

  // Set up individual subscriptions for each build to track view counts
  useEffect(() => {
    const buildSubscriptions = builds.map(build => {
      const buildRef = doc(db, 'builds', build.id)
      return onSnapshot(buildRef, (doc) => {
        if (doc.exists()) {
          setBuilds(prevBuilds => 
            prevBuilds.map(prevBuild => 
              prevBuild.id === build.id 
                ? { ...prevBuild, ...doc.data(), id: doc.id } as Build
                : prevBuild
            )
          )
        }
      })
    })

    return () => {
      buildSubscriptions.forEach(unsubscribe => unsubscribe())
    }
  }, [builds])

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