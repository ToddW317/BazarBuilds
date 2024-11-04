'use client'

import { useState } from 'react'

interface CommentFormProps {
  onSubmit: (content: string, parentId?: string | null) => Promise<void>
  parentId?: string | null
  autoFocus?: boolean
}

export default function CommentForm({ 
  onSubmit, 
  parentId = null,
  autoFocus = false 
}: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    try {
      setIsSubmitting(true)
      await onSubmit(content, parentId)
      setContent('')
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          text-gray-100 placeholder-gray-400"
        rows={3}
        autoFocus={autoFocus}
        disabled={isSubmitting}
        required
        maxLength={1000}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 
            transition-colors"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  )
} 