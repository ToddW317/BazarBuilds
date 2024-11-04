'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { createBuild } from '@/lib/buildService'
import { HEROES } from '@/config/heroes'
import { BuildType } from '@/types/types'
import TagInput from '@/components/TagInput'

export default function NewBuildPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    heroId: '',
    buildType: 'Aggro' as BuildType,
    description: '',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
  })
  const [files, setFiles] = useState({
    screenshots: [] as File[],
    videoClip: null as File | null,
  })
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 5) {
      alert('Maximum 5 screenshots allowed')
      return
    }

    // Create preview URLs
    const urls = selectedFiles.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => {
      // Clean up old preview URLs
      prev.forEach(url => URL.revokeObjectURL(url))
      return urls
    })

    setFiles(prev => ({ ...prev, screenshots: selectedFiles }))
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const video = document.createElement('video')
      video.preload = 'metadata'

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)
        // Calculate duration after 1.5x speed increase
        const speedUpDuration = video.duration / 1.5
        if (speedUpDuration > 30) {
          alert('Video must be 45 seconds or less (will be sped up to 30 seconds)')
          setFiles(prev => ({ ...prev, videoClip: null }))
          e.target.value = ''
          return
        }
      }

      video.src = URL.createObjectURL(file)
      setFiles(prev => ({ ...prev, videoClip: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('Please sign in to submit a build')
      return
    }

    if (!formData.heroId) {
      alert('Please select a hero')
      return
    }

    if (currentStep === 3) {
      if (files.screenshots.length === 0) {
        alert('Please upload at least one screenshot')
        return
      }
    }

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
      return
    }

    try {
      setIsSubmitting(true)
      
      const buildId = await createBuild(
        {
          ...formData,
          tags,
        },
        files,
        user.uid,
        user.displayName || 'Anonymous User'
      )
      
      // Clean up preview URLs
      previewUrls.forEach(url => URL.revokeObjectURL(url))
      
      // Use replace instead of push to avoid 404
      router.replace(`/builds`)
      
    } catch (error) {
      console.error('Error submitting build:', error)
      alert('Error submitting build. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {['Hero Selection', 'Build Details', 'Media Upload'].map((step, index) => (
            <div
              key={step}
              className={`text-sm ${currentStep > index + 1 ? 'text-blue-400' : 'text-gray-400'}`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-700 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Choose Your Hero</h2>
            <div className="grid grid-cols-3 gap-4">
              {HEROES.map(hero => (
                <div
                  key={hero.id}
                  onClick={() => setFormData(prev => ({ ...prev, heroId: hero.id }))}
                  className={`p-4 border rounded-lg cursor-pointer transition-all
                    ${formData.heroId === hero.id 
                      ? 'border-blue-500 bg-gray-800' 
                      : 'border-gray-700 hover:border-gray-600'}`}
                >
                  <div className="relative h-32 mb-2">
                    <Image
                      src={hero.imageUrl}
                      alt={hero.name}
                      fill
                      sizes="(max-width: 768px) 33vw, 25vw"
                      className="object-contain"
                    />
                  </div>
                  <p className="text-center font-medium text-gray-200">{hero.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Build Details</h2>
            
            <div>
              <label className="block mb-2 font-medium text-gray-200">Build Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  text-gray-100 placeholder-gray-400"
                placeholder="Give your build a catchy name"
                required
                minLength={3}
                maxLength={50}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-gray-200">Build Type</label>
                <select
                  value={formData.buildType}
                  onChange={(e) => setFormData(prev => ({ ...prev, buildType: e.target.value as BuildType }))}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    text-gray-100"
                >
                  <option value="Aggro">Aggro</option>
                  <option value="Shield">Shield</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-200">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' }))}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    text-gray-100"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-200">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  text-gray-100 placeholder-gray-400"
                rows={4}
                placeholder="Describe your build strategy, combos, and tips..."
                required
                minLength={10}
                maxLength={1000}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-200">Tags</label>
              <TagInput
                tags={tags}
                onChange={setTags}
                maxTags={3}
              />
              <p className="mt-1 text-sm text-gray-400">
                Add up to 3 tags to help others find your build
              </p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Upload Media</h2>

            <div>
              <label className="block mb-2 font-medium text-gray-200">Screenshots (Max 5)</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 bg-gray-800">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleScreenshotChange}
                  className="hidden"
                  id="screenshots"
                />
                <label
                  htmlFor="screenshots"
                  className="cursor-pointer text-blue-400 hover:text-blue-300 flex flex-col items-center"
                >
                  <span className="text-4xl mb-2">📸</span>
                  <span>Click to upload screenshots</span>
                </label>
              </div>
              
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative h-24">
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-200">Video Clip (30s max)</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg 
                  text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                  file:text-sm file:font-semibold file:bg-blue-500 file:text-white
                  hover:file:bg-blue-600"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-6 py-2 bg-gray-700 text-gray-200 rounded-lg 
                hover:bg-gray-600 border border-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              Back
            </button>
          )}
          
          <button
            type="submit"
            className={`px-6 py-2 ${
              currentStep === 3 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-lg ml-auto disabled:opacity-50 transition-colors`}
            disabled={isSubmitting}
          >
            {currentStep < 3 
              ? 'Next'
              : isSubmitting 
                ? 'Submitting...' 
                : 'Submit Build'
            }
          </button>
        </div>
      </form>
    </div>
  )
} 