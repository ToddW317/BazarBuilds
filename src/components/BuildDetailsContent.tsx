'use client'

import { Build } from '@/types/types'
import { HEROES } from '@/config/heroes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import CommentSection from './comments/CommentSection'
import CommentErrorBoundary from './comments/CommentErrorBoundary'
import BuildRating from './BuildRating'
import ImageModal from './ImageModal'
import { useAuth } from '@/contexts/AuthContext'
import { toggleBuildLike } from '@/lib/buildService'

interface BuildDetailsContentProps {
  build: Build
  buildId: string
}

export default function BuildDetailsContent({ build, buildId }: BuildDetailsContentProps) {
  const { user } = useAuth()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(user ? build.likedBy?.includes(user.uid) : false)
  const [likeCount, setLikeCount] = useState(build.likes || 0)
  const hero = HEROES.find(h => h.id === build.heroId)

  const handleLike = async () => {
    if (!user) return

    try {
      const liked = await toggleBuildLike(buildId, user.uid)
      setIsLiked(liked)
      setLikeCount(prev => liked ? prev + 1 : prev - 1)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link 
        href="/builds"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
      >
        ← Back to Builds
      </Link>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        {/* Hero Section */}
        <div className="bg-gray-900 p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-white">{build.title}</h1>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="flex items-center">
                  <span className="font-medium">Hero:</span>
                  <span className="ml-2">{hero?.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Build Type:</span>
                  <span className="ml-2">{build.buildType}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Difficulty:</span>
                  <span className="ml-2">{build.difficulty}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <BuildRating 
                buildId={buildId}
                initialRating={{
                  average: build.rating?.average || 0,
                  count: build.rating?.count || 0
                }}
              />
            </div>
          </div>
        </div>

        {/* Screenshots Gallery */}
        <div className="p-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Screenshots</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {build.screenshots.map((screenshot, index) => (
              <div 
                key={index} 
                className="relative h-48 rounded-lg overflow-hidden cursor-pointer
                  transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedImage(screenshot)}
              >
                <Image
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            src={selectedImage}
            alt="Build screenshot"
            onClose={() => setSelectedImage(null)}
          />
        )}

        {/* Video Clip */}
        {build.videoClip && (
          <div className="p-8 border-t border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Gameplay Clip</h2>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
              <video
                src={build.videoClip}
                controls
                className="w-full"
                poster={build.screenshots[0]}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="p-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Build Description</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{build.description}</p>
        </div>

        {/* Tags */}
        {build.tags && build.tags.length > 0 && (
          <div className="px-8 pb-4">
            <div className="flex flex-wrap gap-2">
              {build.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="bg-gray-900 p-8 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                } transition-colors`}
              >
                <span>{isLiked ? '❤️' : '🤍'}</span>
                <span>{likeCount} likes</span>
              </button>
              <span>•</span>
              <span>Created by {build.creatorName || 'Anonymous User'}</span>
            </div>
            <div>
              Posted on {build.createdAt.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8 bg-gray-800 rounded-lg p-8 border border-gray-700">
          <CommentErrorBoundary>
            <CommentSection buildId={buildId} />
          </CommentErrorBoundary>
        </div>
      </div>
    </div>
  )
} 