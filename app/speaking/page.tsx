"use client"

import { SignInButton, SignedIn, SignedOut, useUser, useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
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
    Smile,
    AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AutoCarousel } from "@/components/ui/auto-carousel"
import { Separator } from "@/components/ui/separator"
import { Carousel } from "@/components/ui/carousel"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Toaster, toast } from "react-hot-toast"

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

// 动画变体定义
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
}

// 添加新的动画变体
const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    },
    exit: { opacity: 0, y: -20 }
};

// 添加新的动画效果定义
const shimmerAnimation = {
    initial: {
        backgroundPosition: "-500px 0",
    },
    animate: {
        backgroundPosition: ["500px 0", "-500px 0"],
        transition: {
            repeat: Infinity,
            duration: 3,
            ease: "linear",
        },
    },
};

// CommentCard 组件
const CommentCard = memo(({
    comment,
    onReply,
    onLike,
    currentUserId
}: {
    comment: any
    onReply: (id: string, content: string) => void
    onLike: (id: string) => void
    currentUserId?: string
}) => {
    const [showRepliesDialog, setShowRepliesDialog] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const isLiked = comment.likes?.some((like: any) => like.user?.id === currentUserId);
    const latestReply = comment.replies?.[comment.replies.length - 1];
    const repliesCount = comment.replies?.length || 0;

    const handleReplyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowRepliesDialog(true);
    };

    const handleSubmitReply = () => {
        if (replyContent.trim()) {
            onReply(comment.id, replyContent);
            setShowRepliesDialog(false);
            setReplyContent("");
        }
    };

    return (
        <>
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-[280px] h-[200px] flex-shrink-0"
            >
                <Card className="h-full border border-border/50 bg-card/95">
                    <div className="h-full p-4 flex flex-col">
                        {/* 头部：用户信息和操作按钮 */}
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border-2 border-primary/20">
                                <AvatarImage src={comment.user.avatarUrl} />
                                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{comment.user.name}</div>
                                <div className="text-[10px] text-muted-foreground">
                                    {formatDate(comment.createdAt)}
                                </div>
                            </div>
                            {/* 操作按钮移到这里 */}
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onLike(comment.id);
                                    }}
                                    className={cn(
                                        "h-7 w-7 p-0", // 调整按钮大小
                                        isLiked && "text-red-500"
                                    )}
                                >
                                    <Heart
                                        className={cn(
                                            "h-4 w-4 transition-colors duration-300",
                                            isLiked && "fill-current text-red-500"
                                        )}
                                    />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleReplyClick}
                                    className={cn(
                                        "h-7 w-7 p-0",
                                        repliesCount > 0 && "text-primary"
                                    )}
                                >
                                    <MessageCircle className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* 中部：评论内容 */}
                        <div className="mt-2 flex-1">
                            <p className="text-sm leading-relaxed line-clamp-3">
                                {comment.content}
                            </p>
                        </div>

                        {/* 回复预览 */}
                        {latestReply && (
                            <div className="mt-2 bg-muted/50 rounded-lg p-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <Avatar className="h-5 w-5">
                                        <AvatarImage src={latestReply.user.avatarUrl} />
                                        <AvatarFallback>{latestReply.user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-medium">{latestReply.user.name}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                    {latestReply.content}
                                </p>
                            </div>
                        )}

                        {/* 底部：标签 */}
                        <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                                {comment.tags.map((tag: any) => (
                                    <span
                                        key={tag.name}
                                        className="text-[10px] px-2 py-0.5 bg-muted rounded-full"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* 回复对话框 */}
            <Dialog
                open={showRepliesDialog}
                onOpenChange={(open) => {
                    setShowRepliesDialog(open);
                    if (!open) {
                        setReplyContent("");
                    }
                }}
            >
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Discussion Replies</DialogTitle>
                    </DialogHeader>

                    {/* 原始评论 */}
                    <div className="border-b pb-4 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.user.avatarUrl} />
                                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{comment.user.name}</div>
                                <div className="text-xs text-muted-foreground">
                                    {formatDate(comment.createdAt)}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                    </div>

                    {/* 回复列表 */}
                    <div className="space-y-4">
                        {comment.replies?.map((reply: any) => (
                            <motion.div
                                key={reply.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pl-4 border-l"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={reply.user.avatarUrl} />
                                        <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{reply.user.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {formatDate(reply.createdAt)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm ml-8">{reply.content}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* 添加回复输入框 */}
                    <div className="mt-4 pt-4 border-t">
                        <Textarea
                            placeholder="Add your reply..."
                            className="min-h-[80px]"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <div className="flex justify-end mt-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowRepliesDialog(false);
                                    setReplyContent("");
                                }}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmitReply}
                                disabled={!replyContent.trim()}
                            >
                                Reply
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
});
CommentCard.displayName = 'CommentCard'

// CommentList 组件
const CommentList = memo(({ comments, user, onReply, onLike }: {
    comments: any[]
    user: any
    onReply: (id: string, content: string) => void
    onLike: (id: string) => void
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // 保存滚动位置
    useEffect(() => {
        const scrollPosition = scrollRef.current?.scrollLeft || 0;
        return () => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft = scrollPosition;
            }
        };
    }, []);

    console.log('Rendering CommentList with comments:', comments);

    return (
        <div className="relative w-full h-[400px] my-16" ref={scrollRef}>
            {/* 左右渐变遮罩 */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <Carousel
                items={comments.map(comment => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        onReply={onReply}
                        onLike={onLike}
                        currentUserId={user?.id}
                    />
                ))}
                direction="ltr"
                speed={30}
                gap={20}
                pauseOnHover={true}
                className="no-scrollbar py-8"
            />
        </div>
    );
});

CommentList.displayName = 'CommentList';

// 评论输入件
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

    const handleTagClick = (e: React.MouseEvent, tagId: string) => {
        e.preventDefault();
        e.stopPropagation();
        onTagSelect(tagId);
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
    };

    return (
        <motion.div className="relative py-8">
            <Card className={cn(
                "overflow-hidden backdrop-blur-sm border-2",
                "bg-gradient-to-br from-background/95 via-background/90 to-background/80",
                "hover:border-primary/50 transition-all duration-300 group"
            )}>
                <div className="p-8" onClick={(e) => e.stopPropagation()}>
                    {/* 用户信息部分 */}
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                            <AvatarImage src={user?.imageUrl} />
                            <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                Share Your Thoughts
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                What's on your mind today?
                            </p>
                        </div>
                    </div>

                    {/* 文本输入区域 */}
                    <div className="relative group" onClick={(e) => e.stopPropagation()}>
                        <Textarea
                            placeholder="Type your message here..."
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="min-h-[120px] resize-none bg-muted/50 focus:bg-background transition-colors duration-300 text-lg pr-12"
                            disabled={disabled}
                        />
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            <Popover
                                open={showEmojiPicker}
                                onOpenChange={setShowEmojiPicker}
                            >
                                <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Smile className="h-5 w-5" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" side="top" align="end">
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Picker
                                            data={data}
                                            onEmojiSelect={(emoji: any) => {
                                                handleEmojiSelect(emoji);
                                                setShowEmojiPicker(false);
                                            }}
                                            theme="light"
                                            previewPosition="none"
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* 标签选择区域 */}
                    <div className="mt-6 flex flex-wrap gap-3" onClick={(e) => e.stopPropagation()}>
                        {predefinedTags.map(tag => (
                            <Button
                                key={tag.id}
                                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                                className={cn(
                                    "gap-2 transition-all duration-300",
                                    selectedTags.includes(tag.id) && "ring-2 ring-primary/50 bg-gradient-to-r from-primary/20 to-purple-500/20"
                                )}
                                onClick={(e) => handleTagClick(e, tag.id)}
                            >
                                {tag.icon}
                                {tag.label}
                            </Button>
                        ))}
                    </div>

                    {/* 提交按钮 */}
                    <div className="mt-8 flex justify-end" onClick={(e) => e.stopPropagation()}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                onClick={handleSubmit}
                                disabled={!value.trim() || disabled}
                                className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:opacity-90 text-white px-8 shadow-lg shadow-primary/20"
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

// DiscussionSection 组件
const DiscussionSection = () => {
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
        fetchComments,
        setComments
    } = useComments([])

    const [newComment, setNewComment] = useState("")
    const [commentTags, setCommentTags] = useState<string[]>([])
    const [syncError, setSyncError] = useState(false)

    // 添加重试逻户同步
    const syncUserData = async (retryCount = 3) => {
        if (!user) return;

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

            setSyncError(false);
        } catch (error) {
            console.error('Error syncing user data:', error);
            if (retryCount > 0) {
                // 延迟重试
                setTimeout(() => {
                    syncUserData(retryCount - 1);
                }, 2000); // 2秒后重试
            } else {
                setSyncError(true);
            }
        }
    };

    // 用户登录后同步用户信息
    useEffect(() => {
        if (user) {
            syncUserData();
        }
    }, [user]);

    const handleSubmitComment = async () => {
        if (!newComment.trim() || !user) return;

        // 如果用户同步失败，先尝试重新同步
        if (syncError) {
            await syncUserData();
            if (syncError) {
                toast.error("Unable to connect to the server. Please try again later.");
                return;
            }
        }

        try {
            await createComment(newComment, commentTags);
            setNewComment("");
            setCommentTags([]);
            await fetchComments();
            toast.success("Comment posted successfully!");
        } catch (error) {
            console.error('Error submitting comment:', error);
            toast.error("Failed to submit comment. Please try again.");
        }
    }

    const handleReply = async (commentId: string, content: string) => {
        if (!content.trim() || !user) return;

        // 乐观更新
        setComments(prevComments => prevComments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, {
                        id: Date.now().toString(),
                        content,
                        user: {
                            id: user.id,
                            name: user.firstName,
                            avatarUrl: user.imageUrl
                        },
                        createdAt: new Date().toISOString()
                    }]
                };
            }
            return comment;
        }));

        try {
            await addReply(commentId, content);
            await fetchComments();
        } catch (error) {
            console.error('Error replying to comment:', error);
            await fetchComments();
        }
    };

    const handleLike = async (commentId: string) => {
        if (!user) return;

        // 乐观更新UI
        setComments(prevComments => prevComments.map(comment => {
            if (comment.id === commentId) {
                const isLiked = comment.likes?.some((like: any) => like.user?.id === user.id);
                return {
                    ...comment,
                    likes: isLiked
                        ? comment.likes.filter((like: any) => like.user?.id !== user.id)
                        : [...(comment.likes || []), { user: { id: user.id } }]
                };
            }
            return comment;
        }));

        try {
            await toggleLike(commentId);
        } catch (error) {
            console.error('Error liking comment:', error);
            // 如果失败，恢复数据
            await fetchComments();
            toast.error("Failed to update like. Please try again.");
        }
    };

    useEffect(() => {
        const loadComments = async () => {
            try {
                console.log('Loading comments...');
                await fetchComments();
                console.log('Comments loaded successfully');
            } catch (error) {
                console.error('Error loading comments:', error);
                toast.error("Failed to load comments. Please refresh the page.");
            }
        };

        loadComments();
    }, [fetchComments]);

    return (
        <div className="space-y-8 relative">
            {syncError && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Connection Error</AlertTitle>
                    <AlertDescription>
                        Unable to connect to the server. Some features may be limited.
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-2"
                            onClick={() => syncUserData()}
                        >
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {/* 标签筛选 */}
            <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {predefinedTags.map(tag => (
                    <motion.div
                        key={tag.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                            onClick={() => {
                                setSelectedTags(prev =>
                                    prev.includes(tag.id)
                                        ? prev.filter(t => t !== tag.id)
                                        : [...prev, tag.id]
                                )
                            }}
                            className={cn(
                                "gap-2 transition-all duration-300",
                                selectedTags.includes(tag.id) && "ring-2 ring-offset-2 ring-primary"
                            )}
                        >
                            <div className={cn("", tag.color)}>
                                {tag.icon}
                            </div>
                            <span>{tag.label}</span>
                        </Button>
                    </motion.div>
                ))}
            </motion.div>

            {/* 评论输入组件 */}
            <CommentInput
                value={newComment}
                onChange={setNewComment}
                onSubmit={handleSubmitComment}
                selectedTags={commentTags}
                onTagSelect={(tagId) => {
                    setCommentTags(prev =>
                        prev.includes(tagId)
                            ? prev.filter(t => t !== tagId)
                            : [...prev, tagId]
                    )
                }}
            />

            {/* 评论展示区域 */}
            {loading ? (
                <motion.div
                    className="flex flex-col items-center justify-center py-12 space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading discussions...</p>
                </motion.div>
            ) : Array.isArray(comments) && comments.length > 0 ? (
                <CommentList
                    comments={comments}
                    user={user}
                    onReply={handleReply}
                    onLike={handleLike}
                />
            ) : (
                <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No discussions yet</h3>
                    <p className="text-muted-foreground">
                        Be the first to start a discussion!
                    </p>
                </motion.div>
            )}
        </div>
    );
};

// 主页面组件
export default function SpeakingPage() {
    const { signOut } = useClerk();

    // 添加安全的登出处理函数
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
            // 如果登出失败，刷新页面
            window.location.reload();
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <motion.div
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
                className="container mx-auto px-4 py-16"
            >
                {/* 添加背景装饰 */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
                </div>

                {/* 优化标题区域 */}
                <motion.div className="mb-20 text-center relative">
                    <motion.div
                        className="absolute inset-0 -z-10"
                        animate={{
                            background: [
                                "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 50%)",
                                "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)",
                                "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 50%)",
                            ],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />

                    <h1 className={cn(
                        "text-5xl font-bold mb-6",
                        "bg-gradient-to-r from-primary via-purple-500 to-pink-500",
                        "bg-clip-text text-transparent",
                        "drop-shadow-sm"
                    )}>
                        Let's Talk
                    </h1>

                    <motion.p
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Share your thoughts, ideas, and feedback. Every voice matters in making this space better.
                    </motion.p>
                </motion.div>

                <SignedIn>
                    {/* 添加登出按钮 */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        className="absolute top-4 right-4"
                    >
                        Sign Out
                    </Button>
                    <Suspense fallback={
                        <motion.div
                            className="flex flex-col items-center justify-center py-16 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-muted-foreground">Loading the conversation...</p>
                        </motion.div>
                    }>
                        <div className="space-y-16">
                            <DiscussionSection />
                        </div>
                    </Suspense>
                </SignedIn>

                <SignedOut>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center py-16"
                    >
                        <SignInButton mode="modal">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                                >
                                    Sign in to Join Discussion
                                </Button>
                            </motion.div>
                        </SignInButton>
                    </motion.div>
                </SignedOut>

                {/* 页面底部 */}
                <motion.div
                    className="mt-24 text-center pb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-sm text-muted-foreground">
                        Let's build a positive and constructive space together.
                        <br />
                        Your thoughts and feedback help make this community better.
                    </p>
                </motion.div>
            </motion.div>
        </>
    )
} 