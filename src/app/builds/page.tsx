import Link from 'next/link'
import { getBuilds } from '@/lib/buildService'
import { Suspense } from 'react'
import BuildsGrid from '@/components/BuildsGrid'
import BuildsNavigation from '@/components/BuildsNavigation'

export default async function BuildsPage() {
  const builds = await getBuilds()
  
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

      <Suspense fallback={<div>Loading builds...</div>}>
        <BuildsGrid initialBuilds={builds} />
      </Suspense>
    </div>
  )
} 