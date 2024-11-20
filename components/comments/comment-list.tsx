"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { Heart, MessageCircle, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { commentService } from "@/lib/services/comment-service"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { cn } from "@/lib/utils"
import { EmojiPicker } from "@/components/ui/emoji-picker"

interface Comment {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
    userId: string
    user: {
        id: string
        name: string
        email: string
        avatarUrl: string | null
        clerkId: string
        createdAt: Date
        updatedAt: Date
    }
    likes: {
        id: string
        userId: string
        commentId: string | null
        replyId: string | null
        createdAt: Date
    }[]
    replies: {
        id: string
        content: string
        createdAt: Date
        updatedAt: Date
        userId: string
        commentId: string
        user: {
            id: string
            name: string
            email: string
            avatarUrl: string | null
            clerkId: string
            createdAt: Date
            updatedAt: Date
        }
    }[]
}

interface CommentListProps {
    comments: Comment[]
    userLikes: (string | null)[]
    currentUserId?: string | null
}

const LikeAnimation = () => (
    <motion.div
        className="absolute -top-4 -right-2 text-primary"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        ❤️
    </motion.div>
)

export function CommentList({ comments, userLikes, currentUserId }: CommentListProps) {
    const [expandedComments, setExpandedComments] = useState<string[]>([])
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [likedComments, setLikedComments] = useState<string[]>(userLikes as string[])
    const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
        return comments.reduce((acc, comment) => ({
            ...acc,
            [comment.id]: Array.isArray(comment.likes) ? comment.likes.length : 0
        }), {})
    })
    const [showLikeAnimation, setShowLikeAnimation] = useState<string | null>(null)
    const router = useRouter()

    const toggleReplies = (commentId: string) => {
        setExpandedComments(prev =>
            prev.includes(commentId)
                ? prev.filter(id => id !== commentId)
                : [...prev, commentId]
        )
    }

    const handleReplySubmit = async (commentId: string) => {
        if (!currentUserId || !replyContent.trim() || isSubmitting) return

        try {
            setIsSubmitting(true)
            const promise = fetch('/api/replies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: replyContent.trim(),
                    commentId
                }),
            }).then(async (res) => {
                if (!res.ok) {
                    const error = await res.text()
                    throw new Error(error)
                }
                setReplyContent("")
                setReplyingTo(null)
                router.refresh()
            })

            await toast.promise(
                promise,
                {
                    loading: 'Posting reply...',
                    success: 'Reply posted successfully!',
                    error: (err) => {
                        console.error('Reply post error:', err)
                        return err?.message || 'Failed to post reply. Please try again.'
                    }
                }
            )
        } catch (error) {
            console.error('Error adding reply:', error)
            toast.error('Failed to post reply. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleLike = async (commentId: string) => {
        if (!currentUserId) {
            toast.error('Please sign in to like comments')
            return
        }

        try {
            const response = await fetch('/api/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentId }),
            })

            if (!response.ok) {
                throw new Error('Failed to toggle like')
            }

            const { liked } = await response.json()

            setLikedComments(prev =>
                liked
                    ? [...prev, commentId]
                    : prev.filter(id => id !== commentId)
            )

            setLikeCounts(prev => {
                const currentCount = prev[commentId] || 0
                return {
                    ...prev,
                    [commentId]: Math.max(0, currentCount + (liked ? 1 : -1))
                }
            })

            if (liked) {
                setShowLikeAnimation(commentId)
                setTimeout(() => setShowLikeAnimation(null), 500)
                toast.success('Added to your likes!', {
                    icon: '❤️',
                    style: {
                        background: '#ff5d8f',
                        color: '#fff',
                    },
                })
            } else {
                toast('Removed from your likes', {
                    icon: '💔',
                })
            }

            router.refresh()
        } catch (error) {
            console.error('Error toggling like:', error)
            toast.error('Failed to update like')
        }
    }

    if (comments.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="inline-block p-6 bg-card/30 backdrop-blur-sm rounded-2xl">
                    <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {comments.map((comment) => (
                <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-card/30 hover:bg-card/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 border border-border/50"
                >
                    <div className="flex gap-4">
                        <Avatar className="w-10 h-10 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
                            <img
                                src={comment.user.avatarUrl || "/default-avatar.png"}
                                alt={comment.user.name}
                                className="object-cover"
                            />
                        </Avatar>
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-foreground/90">{comment.user.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {formatDate(comment.createdAt.toString())}
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/80 leading-relaxed">{comment.content}</p>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-200",
                                            likedComments.includes(comment.id) && "text-primary"
                                        )}
                                        onClick={() => handleLike(comment.id)}
                                    >
                                        <Heart
                                            className={cn(
                                                "w-4 h-4 transition-all duration-200",
                                                likedComments.includes(comment.id) && "fill-current scale-110"
                                            )}
                                        />
                                        <span className="text-sm">
                                            {typeof likeCounts[comment.id] === 'number' ? likeCounts[comment.id] : 0}
                                        </span>
                                    </Button>
                                    <AnimatePresence>
                                        {showLikeAnimation === comment.id && <LikeAnimation />}
                                    </AnimatePresence>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1.5 text-muted-foreground hover:text-primary"
                                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm">{comment.replies.length}</span>
                                </Button>
                                {comment.replies.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-1.5 text-muted-foreground hover:text-primary"
                                        onClick={() => toggleReplies(comment.id)}
                                    >
                                        {expandedComments.includes(comment.id) ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                        <span className="text-sm">View Replies</span>
                                    </Button>
                                )}
                            </div>

                            {/* Reply input */}
                            <AnimatePresence>
                                {replyingTo === comment.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="pt-4"
                                    >
                                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                                            <div className="relative">
                                                <Textarea
                                                    value={replyContent}
                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                    placeholder="Write your reply..."
                                                    className="min-h-[80px] resize-none bg-transparent pr-10"
                                                />
                                                <div className="absolute bottom-2 right-2">
                                                    <EmojiPicker
                                                        onChange={(emoji) => setReplyContent(prev => prev + emoji)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2 mt-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setReplyingTo(null)}
                                                    className="hover:bg-background/80"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleReplySubmit(comment.id)}
                                                    disabled={!replyContent.trim() || isSubmitting}
                                                    className="bg-primary/90 hover:bg-primary"
                                                >
                                                    Reply
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Replies list */}
                            <AnimatePresence>
                                {expandedComments.includes(comment.id) && comment.replies.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 space-y-4 pl-8 border-l-2 border-primary/10"
                                    >
                                        {comment.replies.map((reply) => (
                                            <div
                                                key={reply.id}
                                                className="flex gap-4 bg-background/30 backdrop-blur-sm rounded-lg p-4"
                                            >
                                                <Avatar className="w-8 h-8 ring-1 ring-primary/10">
                                                    <img
                                                        src={reply.user.avatarUrl || "/default-avatar.png"}
                                                        alt={reply.user.name}
                                                        className="object-cover"
                                                    />
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-sm text-foreground/90">
                                                            {reply.user.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatDate(reply.createdAt.toString())}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm mt-1 text-foreground/80">
                                                        {reply.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
} 