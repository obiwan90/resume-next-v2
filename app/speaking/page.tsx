"use client"

import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useCallback, memo, useEffect } from "react"
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
    Tag as TagIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

// 预定义的标签
const predefinedTags = [
    { id: 'tech', label: 'Technology', icon: <Code2 className="h-4 w-4" />, color: 'text-blue-500' },
    { id: 'career', label: 'Career', icon: <Sparkles className="h-4 w-4" />, color: 'text-purple-500' },
    { id: 'question', label: 'Question', icon: <MessageCircle className="h-4 w-4" />, color: 'text-green-500' },
    { id: 'other', label: 'Other', icon: <Hash className="h-4 w-4" />, color: 'text-orange-500' }
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
            <Textarea
                placeholder="Write a reply..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
            />
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
        fetchComments
    } = useComments()

    const [newComment, setNewComment] = useState("")
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState("")

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

                    // 登录后自动获取评论列表
                    await fetchComments();
                } catch (error) {
                    console.error('Error syncing user data:', error);
                }
            };

            syncUserData();
        }
    }, [user, fetchComments]);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* 标签选择器 */}
            <div className="flex gap-2 flex-wrap">
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
                        className="gap-2"
                    >
                        {tag.icon}
                        {tag.label}
                    </Button>
                ))}
            </div>

            {/* 评论输入框 */}
            <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Start a Discussion</h2>
                <div className="space-y-4">
                    <Textarea
                        placeholder="Share your thoughts..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[120px]"
                    />
                    <div className="flex flex-wrap gap-2">
                        {predefinedTags.map(tag => (
                            <Button
                                key={tag.id}
                                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                    setSelectedTags(prev =>
                                        prev.includes(tag.id)
                                            ? prev.filter(t => t !== tag.id)
                                            : [...prev, tag.id]
                                    )
                                }}
                                className="gap-2"
                            >
                                {tag.icon}
                                {tag.label}
                            </Button>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleSubmitComment}>
                            <Send className="h-4 w-4 mr-2" />
                            Post
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 评论列表 */}
            <div className="space-y-4">
                {Array.isArray(comments) && comments.map((comment: any) => (
                    <div key={comment.id}>
                        <CommentCard
                            comment={comment}
                            onReply={setReplyingTo}
                            onLike={handleLike}
                            currentUserId={user?.id}
                        />
                        {replyingTo === comment.id && (
                            <ReplySection
                                commentId={comment.id}
                                onSubmit={(content) => handleReply(comment.id, content)}
                                onCancel={() => setReplyingTo(null)}
                            />
                        )}
                        {/* 显示回复列表 */}
                        {comment.replies.length > 0 && (
                            <div className="ml-12 space-y-4 mt-4">
                                {comment.replies.map((reply: any) => (
                                    <Card key={reply.id} className="p-4 bg-muted/50">
                                        <div className="flex gap-4">
                                            <Avatar>
                                                <AvatarImage src={reply.user.avatarUrl} />
                                                <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold">{reply.user.name}</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {formatDate(reply.createdAt)}
                                                        </span>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleReplyLike(reply.id)}
                                                        className={cn(
                                                            "gap-2",
                                                            reply.likes.some((like: any) => like.userId === user?.id) && "text-primary"
                                                        )}
                                                    >
                                                        <Heart className={cn(
                                                            "h-4 w-4",
                                                            reply.likes.some((like: any) => like.userId === user?.id) && "fill-current"
                                                        )} />
                                                        <span>{reply.likes.length}</span>
                                                    </Button>
                                                </div>
                                                <p className="text-sm">{reply.content}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {!Array.isArray(comments) && (
                    <div className="text-center text-muted-foreground">
                        No comments yet
                    </div>
                )}
            </div>
        </div>
    )
}

// 主页面组件
export default function SpeakingPage() {
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
                <DiscussionSection />
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