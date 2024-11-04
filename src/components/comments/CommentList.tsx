'use client'

import { Comment } from '@/types/types'
import CommentItem from './CommentItem'

interface CommentListProps {
  comments: Comment[]
  onReply: (content: string, parentId: string) => Promise<void>
}

export default function CommentList({ comments, onReply }: CommentListProps) {
  // Create a nested comment structure
  const createCommentTree = (comments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment & { replies?: Comment[] }>()
    const roots: (Comment & { replies?: Comment[] })[] = []

    // First pass: create map of all comments
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] })
    })

    // Second pass: build the tree
    comments.forEach(comment => {
      const commentWithReplies = commentMap.get(comment.id)!
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId)
        if (parent) {
          parent.replies = parent.replies || []
          parent.replies.push(commentWithReplies)
        }
      } else {
        roots.push(commentWithReplies)
      }
    })

    return roots
  }

  const commentTree = createCommentTree(comments)

  if (comments.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400">No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {commentTree.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          replies={comment.replies || []}
          onReply={onReply}
          depth={0}
        />
      ))}
    </div>
  )
} 