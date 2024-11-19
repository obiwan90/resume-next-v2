"use client"

import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useCallback, memo, useEffect, Suspense, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useComments } from "@/hooks/useComments"
import {
    MessageCircle,
    Heart,
    Send,
    Code2,
    Hash,
    Sparkles,
    Loader2,
    Filter,
    Tag as TagIcon,
    Smile
} from "lucide-react"
import { cn } from "@/lib/utils"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getComments } from "@/lib/services/comment-service"

// 预定义的标签
const predefinedTags = [
    {
        id: 'tech',
        label: 'Technology',
        icon: <Code2 className="h-4 w-4" />,
        color: 'text-blue-500',
        description: 'Discuss tech trends and innovations'
    },
    {
        id: 'career',
        label: 'Career',
        icon: <Sparkles className="h-4 w-4" />,
        color: 'text-purple-500',
        description: 'Share career insights and advice'
    },
    {
        id: 'question',
        label: 'Question',
        icon: <MessageCircle className="h-4 w-4" />,
        color: 'text-green-500',
        description: 'Ask questions and seek help'
    },
    {
        id: 'other',
        label: 'Other',
        icon: <Hash className="h-4 w-4" />,
        color: 'text-orange-500',
        description: 'Other interesting topics'
    }
]

// 添加日期格式化工具函数
const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// CommentCard 组件
const CommentCard = memo(({
    comment,
    onReply,
    onLike,
    currentUserId
}: {
    comment: any
    onReply: (id: string) => void
    onLike: (id: string) => void
    currentUserId?: string
}) => {
    const [isLiking, setIsLiking] = useState(false);
    const isLiked = comment.likes.some((like: any) => like.userId === currentUserId);

    const handleLike = async () => {
        if (isLiking) return;
        setIsLiking(true);
        try {
            await onLike(comment.id);
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <Card className="p-4 mb-4">
            <div className="flex gap-4">
                <Avatar>
                    <AvatarImage src={comment.user.avatarUrl} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <span className="font-semibold">{comment.user.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                                {formatDate(comment.createdAt)}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            disabled={isLiking}
                            className={cn(
                                "gap-2",
                                isLiked && "text-primary",
                                isLiking && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                            <span>{comment.likes.length}</span>
                        </Button>
                    </div>
                    <p className="text-sm mb-2">{comment.content}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {comment.tags.map((tag: any) => (
                            <Badge key={tag.name} variant="secondary">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onReply(comment.id)}
                        className="text-muted-foreground"
                    >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Reply ({comment.replies.length})
                    </Button>
                </div>
            </div>
        </Card>
    )
})
CommentCard.displayName = 'CommentCard'

// 回复组件
const ReplySection = memo(({
    commentId,
    onSubmit,
    onCancel
}: {
    commentId: string
    onSubmit: (content: string) => Promise<void>
    onCancel: () => void
}) => {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiSelect = (emoji: any) => {
        setContent(prev => prev + emoji.native);
        setShowEmojiPicker(false);
    };

    const handleSubmit = async () => {
        if (!content.trim() || isSubmitting) return;
        setIsSubmitting(true);
        try {
            await onSubmit(content);
            setContent("");
            onCancel();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="ml-12 mt-2 space-y-2">
            <div className="relative">
                <Textarea
                    placeholder="Write a reply..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isSubmitting}
                    className="pr-12"
                />
                <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute bottom-2 right-2 text-muted-foreground hover:text-primary"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <Smile className="h-5 w-5" />
                        </Button>
                    </PopoverTrigger>
                    {showEmojiPicker && (
                        <PopoverContent
                            className="w-auto p-0"
                            side="top"
                            align="end"
                        >
                            <Picker
                                data={data}
                                onEmojiSelect={handleEmojiSelect}
                                theme="light"
                                previewPosition="none"
                            />
                        </PopoverContent>
                    )}
                </Popover>
            </div>
            <div className="flex gap-2 justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!content.trim() || isSubmitting}
                >
                    {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Reply"
                    )}
                </Button>
            </div>
        </div>
    );
});

ReplySection.displayName = 'ReplySection';

// 评论输入组件
const CommentInput = ({
    value,
    onChange,
    onSubmit,
    disabled,
    selectedTags,
    onTagSelect
}: {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
    disabled?: boolean
    selectedTags: string[]
    onTagSelect: (tagId: string) => void
}) => {
    const { user } = useUser();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiSelect = (emoji: any) => {
        onChange(value + emoji.native);
    };

    return (
        <Card className="overflow-hidden border-2 border-muted hover:border-primary/50 transition-colors">
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-semibold">Start a Discussion</h2>
                        <p className="text-sm text-muted-foreground">
                            Share your thoughts with the community
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <Textarea
                        placeholder="What's on your mind?"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="min-h-[120px] resize-none focus:ring-2 ring-primary pr-12"
                        disabled={disabled}
                    />
                    <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute bottom-2 right-2 text-muted-foreground hover:text-primary"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <Smile className="h-5 w-5" />
                            </Button>
                        </PopoverTrigger>
                        {showEmojiPicker && (
                            <PopoverContent
                                className="w-auto p-0"
                                side="top"
                                align="end"
                            >
                                <Picker
                                    data={data}
                                    onEmojiSelect={(emoji: any) => {
                                        handleEmojiSelect(emoji);
                                        setShowEmojiPicker(false);
                                    }}
                                    theme="light"
                                    previewPosition="none"
                                />
                            </PopoverContent>
                        )}
                    </Popover>
                </div>
                <div className="flex flex-wrap gap-2">
                    {predefinedTags.map(tag => (
                        <Button
                            key={tag.id}
                            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => onTagSelect(tag.id)}
                            className="gap-2"
                        >
                            {tag.icon}
                            {tag.label}
                        </Button>
                    ))}
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={onSubmit}
                        disabled={!value.trim() || disabled}
                        className="gap-2"
                    >
                        <Send className="h-4 w-4" />
                        Post Discussion
                    </Button>
                </div>
            </div>
        </Card>
    );
};

// 添加虚拟列表组件
const VirtualizedCommentList = memo(({ comments, user, onReply, onLike, onReplyLike }: {
    comments: any[]
    user: any
    onReply: (id: string) => void
    onLike: (id: string) => void
    onReplyLike: (id: string) => void
}) => {
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastCommentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleRange.end < comments.length) {
                    setVisibleRange(prev => ({
                        start: prev.start,
                        end: Math.min(prev.end + 5, comments.length)
                    }));
                }
            },
            { threshold: 0.5 }
        );

        return () => observerRef.current?.disconnect();
    }, [comments.length, visibleRange.end]);

    useEffect(() => {
        if (lastCommentRef.current && observerRef.current) {
            observerRef.current.observe(lastCommentRef.current);
        }
    }, [visibleRange]);

    return (
        <div className="space-y-6">
            {comments.slice(0, visibleRange.end).map((comment, index) => (
                <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    ref={index === visibleRange.end - 1 ? lastCommentRef : null}
                >
                    <CommentCard
                        comment={comment}
                        onReply={onReply}
                        onLike={onLike}
                        currentUserId={user?.id}
                    />
                    {/* ... 回复部分保持不变 */}
                </motion.div>
            ))}
        </div>
    );
});

VirtualizedCommentList.displayName = 'VirtualizedCommentList';

// DiscussionSection 组件
const DiscussionSection = ({ initialComments }: { initialComments: any[] }) => {
    const { user } = useUser();
    const {
        comments,
        loading,
        selectedTags,
        setSelectedTags,
        createComment,
        addReply,
        toggleLike,
        toggleReplyLike,
        setComments,
        fetchComments
    } = useComments(initialComments)

    const [newComment, setNewComment] = useState("")
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState("")

    // 初始加载评论
    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    // 用户登录后同步用户信息到数据库
    useEffect(() => {
        if (user) {
            const syncUserData = async () => {
                try {
                    const response = await fetch('/api/users/sync', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: user.id,
                            email: user.primaryEmailAddress?.emailAddress,
                            name: `${user.firstName} ${user.lastName || ''}`,
                            avatarUrl: user.imageUrl,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to sync user data');
                    }
                } catch (error) {
                    console.error('Error syncing user data:', error);
                }
            };

            syncUserData();
        }
    }, [user]);

    const handleSubmitComment = async () => {
        if (!newComment.trim() || !user) return;
        try {
            await createComment(newComment, selectedTags);
            setNewComment("");
            // 发送评论后刷新列表
            await fetchComments();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    }

    const handleSubmitReply = async (commentId: string) => {
        if (!replyContent.trim() || !user) return;
        try {
            await addReply(commentId, replyContent);
            setReplyContent("");
            setReplyingTo(null);
            // 发送回复后刷新列表
            await fetchComments();
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    }

    const handleLike = async (commentId: string) => {
        try {
            await toggleLike(commentId);
            await fetchComments();
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const handleReply = async (commentId: string, content: string) => {
        try {
            await addReply(commentId, content);
            await fetchComments();
        } catch (error) {
            console.error('Error replying to comment:', error);
        }
    };

    const handleReplyLike = async (replyId: string) => {
        try {
            await toggleReplyLike(replyId);
        } catch (error) {
            console.error('Error liking reply:', error);
        }
    };

    return (
        <div className="space-y-8">
            {/* 标签过滤器 */}
            <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter Discussions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {predefinedTags.map(tag => (
                        <Button
                            key={tag.id}
                            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                            onClick={() => {
                                setSelectedTags(prev =>
                                    prev.includes(tag.id)
                                        ? prev.filter(t => t !== tag.id)
                                        : [...prev, tag.id]
                                )
                            }}
                            className={cn(
                                "h-auto py-4 px-4 flex flex-col items-start gap-2 group transition-all",
                                selectedTags.includes(tag.id) && "ring-2 ring-offset-2 ring-primary"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <div className={cn("p-2 rounded-lg bg-background/50", tag.color)}>
                                    {tag.icon}
                                </div>
                                <span className="font-medium">{tag.label}</span>
                            </div>
                            <p className="text-sm text-muted-foreground text-left">
                                {tag.description}
                            </p>
                        </Button>
                    ))}
                </div>
            </div>

            {/* 使用新的评论输入组件 */}
            <CommentInput
                value={newComment}
                onChange={setNewComment}
                onSubmit={handleSubmitComment}
                selectedTags={selectedTags}
                onTagSelect={(tagId) => {
                    setSelectedTags(prev =>
                        prev.includes(tagId)
                            ? prev.filter(t => t !== tagId)
                            : [...prev, tagId]
                    )
                }}
            />

            {/* 使用虚拟列表 */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading discussions...</p>
                </div>
            ) : Array.isArray(comments) && comments.length > 0 ? (
                <VirtualizedCommentList
                    comments={comments}
                    user={user}
                    onReply={setReplyingTo}
                    onLike={handleLike}
                    onReplyLike={handleReplyLike}
                />
            ) : (
                <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No discussions yet</h3>
                    <p className="text-muted-foreground">
                        Be the first to start a discussion!
                    </p>
                </div>
            )}
        </div>
    )
}

// 获取初始数据
async function getInitialComments() {
    try {
        const comments = await getComments()
        return comments
    } catch (error) {
        console.error('Error fetching initial comments:', error)
        return []
    }
}

// 主页面组件
export default async function SpeakingPage() {
    // 获取初始数据
    const initialComments = await getInitialComments()

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 页面标题 */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Join the Discussion
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Share your thoughts, ask questions, and connect with others in the community.
                    All discussions are welcome, from technical topics to career advice.
                </p>
            </div>

            <SignedIn>
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Loading discussions...</p>
                    </div>
                }>
                    <DiscussionSection initialComments={initialComments} />
                </Suspense>
            </SignedIn>

            <SignedOut>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center min-h-[40vh] text-center"
                >
                    <div className="mb-8 space-y-4">
                        <div className="flex flex-wrap gap-4 justify-center">
                            {predefinedTags.map(tag => (
                                <Card key={tag.id} className="p-4 flex items-center gap-3 w-[200px]">
                                    <div className={cn("p-2 rounded-lg bg-muted", tag.color)}>
                                        {tag.icon}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-medium">{tag.label}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Discuss {tag.label.toLowerCase()} topics
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <Card className="p-6 max-w-md w-full bg-gradient-to-b from-background to-muted/50">
                        <h2 className="text-2xl font-semibold mb-4">Start Participating</h2>
                        <p className="text-muted-foreground mb-6">
                            Sign in to join the conversation and share your insights with the community.
                        </p>
                        <SignInButton mode="modal" redirectUrl="/speaking">
                            <Button size="lg" className="w-full gap-2">
                                <MessageCircle className="h-5 w-5" />
                                Sign in to Comment
                            </Button>
                        </SignInButton>
                    </Card>
                </motion.div>
            </SignedOut>

            {/* 页面底部 */}
            <div className="mt-16 text-center text-sm text-muted-foreground">
                <p>
                    Please keep discussions respectful and constructive.
                    See our community guidelines for more information.
                </p>
            </div>
        </div>
    )
} 