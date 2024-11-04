'use client'

import { getBuildById, incrementBuildViews } from '@/lib/buildService'
import { notFound } from 'next/navigation'
import BuildDetailsContent from '@/components/BuildDetailsContent'
import { use } from 'react'
import { useState } from 'react'

interface BuildDetailsPageProps {
  params: {
    id: string
  }
}

export default function BuildDetailsPage({ params }: BuildDetailsPageProps) {
  const id = use(Promise.resolve(params.id))
  const build = use(getBuildById(id))
  const [copySuccess, setCopySuccess] = useState(false)

  if (!build) {
    notFound()
  }

  // Increment view count when the page is loaded
  // We use a client-side approach to avoid double-counting during SSR
  if (typeof window !== 'undefined') {
    // Use setTimeout to ensure this runs after the component mounts
    setTimeout(() => {
      incrementBuildViews(id)
    }, 0)
  }

  const handleCopyBuild = async () => {
    try {
      // Get the current URL
      const buildUrl = window.location.href
      await navigator.clipboard.writeText(buildUrl)
      
      // Show success message
      setCopySuccess(true)
      
      // Reset success message after 2 seconds
      setTimeout(() => {
        setCopySuccess(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy build URL:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={handleCopyBuild}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 
              text-gray-200 rounded-lg transition-colors"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            <span>{copySuccess ? 'Copied!' : 'Copy Build URL'}</span>
          </button>
        </div>

        <BuildDetailsContent build={build} buildId={id} />
      </div>
    </div>
  )
} 