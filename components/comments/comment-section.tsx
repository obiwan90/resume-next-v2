"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Heart, Reply, Smile, Sparkles, Send, MessageCircle } from "lucide-react"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { cn } from "@/lib/utils"

interface User {
    id: string
    firstName: string | null
    lastName: string | null
    imageUrl: string
    emailAddresses: Array<{
        emailAddress: string
    }>
}

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

interface CommentSectionProps {
    user: User
}

// 添加 3D 卡片效果组件
const Card3D = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
            className={cn(
                "group relative rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300",
                "hover:shadow-primary/5 dark:hover:shadow-primary/10",
                "transform perspective-1000",
                className
            )}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                className="relative z-10"
                style={{
                    transform: "translateZ(20px)",
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    )
}

// 添加动态波浪背景
const WaveBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg className="absolute w-full h-full" preserveAspectRatio="none">
                <motion.path
                    d="M0,64 C150,64 150,32 300,32 C450,32 450,64 600,64 C750,64 750,32 900,32 L900,128 L0,128 Z"
                    fill="hsl(var(--primary) / 0.05)"
                    animate={{
                        d: [
                            "M0,64 C150,64 150,32 300,32 C450,32 450,64 600,64 C750,64 750,32 900,32 L900,128 L0,128 Z",
                            "M0,32 C150,32 150,64 300,64 C450,64 450,32 600,32 C750,32 750,64 900,64 L900,128 L0,128 Z",
                            "M0,64 C150,64 150,32 300,32 C450,32 450,64 600,64 C750,64 750,32 900,32 L900,128 L0,128 Z",
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </svg>
        </div>
    )
}

// 改进评论输入框组件
const CommentInput = ({
    onSubmit,
    placeholder = "Share your thoughts...",
    className = ""
}: {
    onSubmit: (content: string) => void
    placeholder?: string
    className?: string
}) => {
    const [content, setContent] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    return (
        <Card3D className={className}>
            <div className="p-6 space-y-4">
                <Textarea
                    placeholder={placeholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                        "min-h-[120px] resize-none bg-accent/50 border-primary/10 focus:border-primary/20",
                        "transition-all duration-300",
                        isFocused && "shadow-lg shadow-primary/5"
                    )}
                />

                <div className="flex justify-between items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 relative overflow-hidden group"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <Smile className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                            <span>Add Emoji</span>
                            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={() => {
                                if (content.trim()) {
                                    onSubmit(content)
                                    setContent("")
                                    setShowEmojiPicker(false)
                                }
                            }}
                            className="gap-2 relative overflow-hidden group"
                            disabled={!content.trim()}
                        >
                            <MessageSquare className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                            <span>Send Message</span>
                            <motion.div
                                className="absolute inset-0 bg-primary/10"
                                initial={{ x: "100%" }}
                                whileHover={{ x: "0%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </Button>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {showEmojiPicker && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute z-50 bottom-full right-0 mb-2"
                        >
                            <Card3D>
                                <div className="p-2">
                                    <Picker
                                        data={data}
                                        onEmojiSelect={(emoji: any) => {
                                            setContent(prev => prev + emoji.native)
                                        }}
                                        theme="light"
                                    />
                                </div>
                            </Card3D>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Card3D>
    )
}

// 添加评论卡片组件
const CommentCard = ({ comment }: { comment: Comment }) => {
    const [isLiked, setIsLiked] = useState(comment.hasLiked)
    const [likesCount, setLikesCount] = useState(comment.likes)
    const [isReplying, setIsReplying] = useState(false)
    const [showReplies, setShowReplies] = useState(false)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
        >
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                            <AvatarImage src={comment.user.image} alt={comment.user.name} />
                            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{comment.user.name}</span>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {comment.content}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 rounded-full"
                            onClick={handleLike}
                        >
                            <Heart
                                className={`h-4 w-4 transition-colors duration-300 ${isLiked ? 'fill-primary text-primary' : ''}`}
                            />
                            <span>{likesCount}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 rounded-full"
                            onClick={() => setIsReplying(!isReplying)}
                        >
                            <Reply className="h-4 w-4" />
                            <span>Reply</span>
                        </Button>
                        {comment.replies.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 rounded-full"
                                onClick={() => setShowReplies(!showReplies)}
                            >
                                <MessageCircle className="h-4 w-4" />
                                <span>{comment.replies.length} replies</span>
                            </Button>
                        )}
                    </div>

                    <AnimatePresence>
                        {isReplying && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-12"
                            >
                                <CommentInput
                                    onSubmit={(content) => {
                                        console.log("Replying:", content)
                                        setIsReplying(false)
                                    }}
                                    placeholder="Write a reply..."
                                />
                            </motion.div>
                        )}

                        {showReplies && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-12 space-y-4"
                            >
                                {comment.replies.map((reply) => (
                                    <ReplyCard key={reply.id} reply={reply} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>
        </motion.div>
    )
}

// 添加回复卡片组件
const ReplyCard = ({ reply }: { reply: Reply }) => {
    const [isLiked, setIsLiked] = useState(reply.hasLiked)
    const [likesCount, setLikesCount] = useState(reply.likes)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
        >
            <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                            <AvatarImage src={reply.user.image} alt={reply.user.name} />
                            <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{reply.user.name}</span>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(reply.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {reply.content}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 rounded-full"
                            onClick={handleLike}
                        >
                            <Heart
                                className={`h-4 w-4 transition-colors duration-300 ${isLiked ? 'fill-primary text-primary' : ''}`}
                            />
                            <span>{likesCount}</span>
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

// 示例评论数据
const mockComments: Comment[] = [
    {
        id: "1",
        content: "Great article! Really enjoyed reading it.",
        createdAt: "2024-03-20T10:00:00Z",
        user: {
            id: "1",
            name: "John Doe",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        },
        likes: 5,
        hasLiked: false,
        replies: [
            {
                id: "2",
                content: "Thanks for sharing!",
                createdAt: "2024-03-20T11:00:00Z",
                user: {
                    id: "2",
                    name: "Jane Smith",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                },
                likes: 2,
                hasLiked: false
            }
        ]
    }
]

export function CommentSection({ user }: CommentSectionProps) {
    const [comment, setComment] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [comments, setComments] = useState(mockComments)

    const handleSubmit = () => {
        if (comment.trim()) {
            // 添加新评论
            const newComment = {
                id: Date.now().toString(),
                content: comment,
                createdAt: new Date().toISOString(),
                user: {
                    id: user.id,
                    name: user.firstName || 'Anonymous',
                    image: user.imageUrl
                },
                likes: 0,
                hasLiked: false,
                replies: []
            }
            setComments(prev => [newComment, ...prev])
            setComment("")
            setShowEmojiPicker(false)
        }
    }

    return (
        <>
            {/* 评论列表区域 - 添加底部 padding 以防止被输入框遮挡 */}
            <div className="space-y-6 pb-[180px]"> {/* 增加底部间距 */}
                {comments.map((comment, index) => (
                    <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10">
                            <div className="p-6 space-y-4">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                                        <AvatarImage src={comment.user.image} alt={comment.user.name} />
                                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{comment.user.name}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-2 rounded-full"
                                        onClick={() => handleLike(comment.id)}
                                    >
                                        <Heart
                                            className={`h-4 w-4 transition-colors duration-300 ${comment.hasLiked ? 'fill-primary text-primary' : ''}`}
                                        />
                                        <span>{comment.likes}</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-2 rounded-full"
                                        onClick={() => handleReply(comment.id, "Test reply")}
                                    >
                                        <Reply className="h-4 w-4" />
                                        <span>Reply</span>
                                    </Button>
                                </div>

                                {/* 回复区域 */}
                                {comment.replies.length > 0 && (
                                    <div className="pl-12 space-y-4 mt-4 border-l-2 border-primary/10">
                                        {comment.replies.map((reply) => (
                                            <ReplyCard key={reply.id} reply={reply} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* 固定在底部的输入框 - 修改这部分 */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl px-4">
                <div className="relative p-4 rounded-xl border border-primary/10 bg-background/30 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-background/5 rounded-xl" />
                    <div className="relative z-10">
                        <div className="flex items-start gap-4">
                            <Avatar className="hidden sm:block shadow-md">
                                <AvatarImage src={user.imageUrl} alt={user.firstName || ""} />
                                <AvatarFallback>{user.firstName?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-4">
                                <Textarea
                                    placeholder="Share your thoughts..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="min-h-[60px] max-h-[120px] resize-none bg-background/50 border-primary/10 focus:border-primary/20 shadow-inner backdrop-blur-sm"
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <div className="flex justify-between items-center">
                                    <div className="relative emoji-picker-container">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-2 shadow-sm hover:shadow-md transition-shadow"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setShowEmojiPicker(!showEmojiPicker)
                                            }}
                                        >
                                            <Smile className="h-4 w-4" />
                                            <span className="hidden sm:inline">Emoji</span>
                                        </Button>
                                        <AnimatePresence>
                                            {showEmojiPicker && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute bottom-[calc(100%+1rem)] right-0"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Card className="backdrop-blur-md bg-background/80 border border-primary/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                                                        <div className="p-2">
                                                            <Picker
                                                                data={data}
                                                                onEmojiSelect={(emoji: any) => {
                                                                    setComment(prev => prev + emoji.native)
                                                                }}
                                                                theme="light"
                                                            />
                                                        </div>
                                                    </Card>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <Button
                                        onClick={handleSubmit}
                                        className="gap-2 shadow-md hover:shadow-lg transition-shadow"
                                        disabled={!comment.trim()}
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                        <span className="hidden sm:inline">Comment</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 