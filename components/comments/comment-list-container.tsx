"use client"

import { useState } from "react"
import { CommentList } from "./comment-list"

interface Comment {
    id: string
    content: string
    createdAt: string
    user: {
        id: string
        name: string
        image: string
    }
    likes: number
    hasLiked: boolean
    replies: Reply[]
}

interface Reply {
    id: string
    content: string
    createdAt: string
    user: {
        id: string
        name: string
        image: string
    }
    likes: number
    hasLiked: boolean
}

interface CommentListContainerProps {
    initialComments: Comment[]
    currentUser: any
}

export function CommentListContainer({ initialComments, currentUser }: CommentListContainerProps) {
    const [comments, setComments] = useState(initialComments)

    const handleLike = (commentId: string) => {
        console.log('Like comment:', commentId)
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        hasLiked: !comment.hasLiked,
                        likes: comment.hasLiked ? comment.likes - 1 : comment.likes + 1
                    }
                    : comment
            )
        )
    }

    const handleReply = (commentId: string, content: string) => {
        console.log('Reply to comment:', commentId, content)
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: [...comment.replies, {
                            id: Date.now().toString(),
                            content,
                            createdAt: new Date().toISOString(),
                            user: {
                                id: currentUser.id,
                                name: currentUser.firstName || 'Anonymous',
                                image: currentUser.imageUrl
                            },
                            likes: 0,
                            hasLiked: false
                        }]
                    }
                    : comment
            )
        )
    }

    const handleLikeReply = (commentId: string, replyId: string) => {
        console.log('Like reply:', commentId, replyId)
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: comment.replies.map(reply =>
                            reply.id === replyId
                                ? {
                                    ...reply,
                                    hasLiked: !reply.hasLiked,
                                    likes: reply.hasLiked ? reply.likes - 1 : reply.likes + 1
                                }
                                : reply
                        )
                    }
                    : comment
            )
        )
    }

    return (
        <CommentList
            comments={comments}
            currentUser={currentUser}
            onLike={handleLike}
            onReply={handleReply}
            onLikeReply={handleLikeReply}
        />
    )
} 