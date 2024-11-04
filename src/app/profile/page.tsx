'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'
import { updateUsername } from '@/lib/userService'
import { getBuildsByUserId } from '@/lib/buildService'
import { getUserStats } from '@/lib/statsService'
import Link from 'next/link'
import BuildsNavigation from '@/components/BuildsNavigation'

interface UserStats {
  buildsCreated: number
  buildsLiked: number
  commentsCount: number
  likes: {
    totalLikes: number
    buildLikes: number
    commentLikes: number
  }
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [username, setUsername] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState<UserStats>({
    buildsCreated: 0,
    buildsLiked: 0,
    commentsCount: 0,
    likes: {
      totalLikes: 0,
      buildLikes: 0,
      commentLikes: 0
    }
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  useEffect(() => {
    const loadUserStats = async () => {
      if (!user) return
      
      try {
        const userStats = await getUserStats(user.uid)
        setStats(userStats)
      } catch (error) {
        console.error('Error loading user stats:', error)
      } finally {
        setIsLoadingStats(false)
      }
    }

    loadUserStats()
  }, [user])

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setIsSaving(true)
      setError('')
      await updateUsername(user.uid, username)
      setIsEditing(false)
    } catch (error) {
      setError('Failed to update username. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Please sign in to view your profile</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
      </div>

      <BuildsNavigation />

      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mt-6 border border-gray-700">
        <div className="space-y-8">
          {/* Account Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Account Information</h2>
            <div className="flex items-center space-x-4">
              {user.photoURL && (
                <div className="relative">
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full border-2 border-gray-700"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800" />
                </div>
              )}
              <div>
                <p className="text-gray-300">
                  <span className="text-gray-400">Email:</span> {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Username Section */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-white">Username</h3>
            {isEditing ? (
              <form onSubmit={handleUpdateUsername} className="space-y-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    text-gray-100 placeholder-gray-400"
                  placeholder="Enter new username"
                  required
                  minLength={3}
                  maxLength={30}
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                      hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg 
                      hover:bg-gray-600 border border-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">{user.displayName || 'No username set'}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Updated Activity Statistics */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Your Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Build Stats */}
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <h4 className="text-lg font-medium text-white mb-3">Build Activity</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Builds Created</span>
                    <span className="text-blue-400 font-bold">{stats.buildsCreated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Builds Liked</span>
                    <span className="text-red-400 font-bold">{stats.buildsLiked}</span>
                  </div>
                </div>
              </div>

              {/* Interaction Stats */}
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <h4 className="text-lg font-medium text-white mb-3">Comments</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Comments Made</span>
                    <span className="text-yellow-400 font-bold">{stats.commentsCount}</span>
                  </div>
                </div>
              </div>

              {/* Likes Breakdown */}
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 md:col-span-2">
                <h4 className="text-lg font-medium text-white mb-3">Likes Received</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-red-400 mb-1">
                      {stats.likes.totalLikes}
                    </div>
                    <div className="text-gray-400 text-sm">Total Likes</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {stats.likes.buildLikes}
                    </div>
                    <div className="text-gray-400 text-sm">Build Likes</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">
                      {stats.likes.commentLikes}
                    </div>
                    <div className="text-gray-400 text-sm">Comment Likes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/builds/my-builds"
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg 
                hover:bg-gray-600 border border-gray-600 transition-colors"
            >
              View My Builds
            </Link>
            <Link 
              href="/builds/liked"
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg 
                hover:bg-gray-600 border border-gray-600 transition-colors"
            >
              View Liked Builds
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 