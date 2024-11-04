'use client'

import { Comment } from '@/types/types'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { toggleCommentLike } from '@/lib/commentService'
import CommentForm from './CommentForm'

interface CommentItemProps {
  comment: Comment
  replies: Comment[]
  onReply: (content: string, parentId: string) => Promise<void>
  depth?: number
}

export default function CommentItem({ 
  comment, 
  replies, 
  onReply,
  depth = 0 
}: CommentItemProps) {
  const { user } = useAuth()
  const [isReplying, setIsReplying] = useState(false)
  const [isLiked, setIsLiked] = useState(user ? comment.likedBy?.includes(user.uid) : false)
  const [likeCount, setLikeCount] = useState(comment.likes || 0)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLike = async () => {
    if (!user) return

    try {
      const liked = await toggleCommentLike(comment.id, user.uid)
      setIsLiked(liked)
      setLikeCount(prev => liked ? prev + 1 : prev - 1)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const hasReplies = replies && replies.length > 0
  const shouldIndent = depth < 5

  return (
    <div 
      className={`${shouldIndent ? 'border-l-2 border-gray-700 pl-4' : ''} mb-4`}
      style={{ marginLeft: depth > 5 ? '1rem' : '0' }}
    >
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`w-5 h-5 flex items-center justify-center text-gray-400 
                hover:text-gray-200 transition-all duration-200 transform
                ${hasReplies ? 'opacity-100' : 'opacity-50'}`}
            >
              {hasReplies ? (
                <span className={`transform transition-transform duration-200 ${
                  isCollapsed ? '' : 'rotate-90'
                }`}>
                  ▶
                </span>
              ) : '•'}
            </button>
            <div className="font-medium text-gray-200">{comment.userName}</div>
          </div>
          <div className="text-sm text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className={`
          overflow-hidden transition-all duration-200 ease-in-out
          ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}
        `}>
          <div className="mt-2 text-gray-300">{comment.content}</div>

          <div className="mt-4 flex items-center space-x-4 text-sm">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-400' : 'text-gray-400'
              } hover:text-red-400 transition-colors`}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{likeCount}</span>
            </button>

            {user && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                Reply
              </button>
            )}

            {hasReplies && (
              <span className="text-gray-400">
                {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
              </span>
            )}
          </div>

          {isReplying && (
            <div className="mt-4">
              <CommentForm
                onSubmit={async (content) => {
                  await onReply(content, comment.id)
                  setIsReplying(false)
                }}
                parentId={comment.id}
                autoFocus
              />
            </div>
          )}
        </div>

        <div className={`
          mt-4 space-y-4 overflow-hidden transition-all duration-200 ease-in-out
          ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[10000px] opacity-100'}
        `}>
          {hasReplies && replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={reply.replies || []}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 