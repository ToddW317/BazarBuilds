'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getBuildsByUserId, getBuildById } from '@/lib/buildService'
import { Build } from '@/types/types'
import Link from 'next/link'

export default function ProfilePage() {
  const { user } = useAuth()
  const [userBuilds, setUserBuilds] = useState<Build[]>([])
  const [likedBuilds, setLikedBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserBuilds() {
      if (!user) return

      try {
        // Fetch builds created by the user
        const builds = await getBuildsByUserId(user.uid)
        setUserBuilds(builds)

        // Fetch liked builds
        const likedBuildPromises = user.likedBuilds?.map(buildId => 
          getBuildById(buildId)
        ) || []
        
        const likedBuildsResults = await Promise.all(likedBuildPromises)
        setLikedBuilds(likedBuildsResults.filter((build): build is Build => 
          build !== null
        ))
      } catch (error) {
        console.error('Error fetching builds:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserBuilds()
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
          <p className="text-gray-400">Please sign in to view your profile.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt={user.displayName || 'User'} 
              className="w-16 h-16 rounded-full mr-4"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">
              {user.displayName || 'Anonymous User'}
            </h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* My Builds Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">My Builds</h2>
            <Link 
              href="/builds/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Build
            </Link>
          </div>
          
          {userBuilds.length === 0 ? (
            <p className="text-gray-400">You haven't created any builds yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBuilds.map(build => (
                <Link 
                  key={build.id} 
                  href={`/builds/${build.id}`}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{build.title}</h3>
                  <p className="text-gray-400 mb-4">{build.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">👁️ {build.views || 0}</span>
                    <span className="text-gray-500">❤️ {build.likes || 0}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Liked Builds Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Liked Builds</h2>
          {likedBuilds.length === 0 ? (
            <p className="text-gray-400">You haven't liked any builds yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedBuilds.map(build => (
                <Link 
                  key={build.id} 
                  href={`/builds/${build.id}`}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{build.title}</h3>
                  <p className="text-gray-400 mb-2">by {build.creatorName}</p>
                  <p className="text-gray-400 mb-4">{build.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">👁️ {build.views || 0}</span>
                    <span className="text-gray-500">❤️ {build.likes || 0}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 