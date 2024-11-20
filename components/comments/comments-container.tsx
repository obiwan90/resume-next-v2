"use client"

import { useState, useEffect } from "react"
import { CommentList } from "./comment-list"
import { Comment } from '@/types/comment'
import { toast } from 'react-hot-toast'

interface CommentsContainerProps {
    comments: Comment[]
    userLikes: any[]
    currentUser: {
        id: string
        name: string | null
        image: string | null
        email?: string | null
    }
    onCommentUpdated?: () => Promise<void>
}

export function CommentsContainer({
    comments: initialComments,
    userLikes,
    currentUser,
    onCommentUpdated
}: CommentsContainerProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments)
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        setComments(initialComments)
    }, [initialComments])

    const handleLike = async (commentId: string) => {
        if (isUpdating) return
        setIsUpdating(true)
        try {
            const response = await fetch(`/api/comments/${commentId}/like`, {
                method: 'POST'
            })
            if (!response.ok) {
                throw new Error('Failed to like comment')
            }

            await onCommentUpdated?.()
            toast.success('Like updated!')
        } catch (error) {
            console.error('Error liking comment:', error)
            toast.error('Failed to update like')
        } finally {
            setIsUpdating(false)
        }
    }

    const handleReply = async (commentId: string, content: string) => {
        if (isUpdating) return
        setIsUpdating(true)
        try {
            const response = await fetch(`/api/comments/${commentId}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                throw new Error('Failed to add reply')
            }

            await onCommentUpdated?.()
            toast.success('Reply added!')
        } catch (error) {
            console.error('Error adding reply:', error)
            toast.error('Failed to add reply')
        } finally {
            setIsUpdating(false)
        }
    }

    const handleLikeReply = async (commentId: string, replyId: string) => {
        if (isUpdating) return
        setIsUpdating(true)
        try {
            const response = await fetch(`/api/comments/replies/${replyId}/like`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Failed to like reply')
            }

            await onCommentUpdated?.()
            toast.success('Like updated!')
        } catch (error) {
            console.error('Error liking reply:', error)
            toast.error('Failed to update like')
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <CommentList
            comments={comments}
            currentUserId={currentUser.id}
            onLike={handleLike}
            onReply={handleReply}
            onLikeReply={handleLikeReply}
            disabled={isUpdating}
        />
    )
} 