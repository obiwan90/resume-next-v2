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

interface User {
    id: string
    name: string
    image: string
    email?: string
}

interface CommentsContainerProps {
    initialComments: Comment[]
    currentUser: User
}

export function CommentsContainer({ initialComments, currentUser }: CommentsContainerProps) {
    const [comments, setComments] = useState(initialComments)

    const handleLike = (commentId: string) => {
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
                                name: currentUser.name || 'Anonymous',
                                image: currentUser.image
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
            currentUserId={currentUser.id}
            onLike={handleLike}
            onReply={handleReply}
            onLikeReply={handleLikeReply}
        />
    )
} 