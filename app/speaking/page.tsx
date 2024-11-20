'use client'

import { useUser } from '@clerk/nextjs'
import { SignInButton } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'
import { SpeakingPageContent } from "@/components/speaking-page-content"
import { CommentInput } from "@/components/comments/comment-input"
import { SpeakingHeader } from "@/components/speaking/speaking-header"
import { CommentsContainer } from "@/components/comments/comments-container"
import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Comment } from '@/types/comment'
import { userService } from "@/lib/services/user-service"

export default function SpeakingPage() {
    const { user, isLoaded, isSignedIn } = useUser()
    const router = useRouter()
    const [comments, setComments] = useState<Comment[]>([])
    const [userLikes, setUserLikes] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // 处理用户数据同步
    useEffect(() => {
        const syncUser = async () => {
            if (isSignedIn && user) {
                try {
                    console.log("Starting user sync with data:", {
                        isSignedIn,
                        userId: user.id,
                        email: user.emailAddresses[0]?.emailAddress,
                        name: `${user.firstName || ''} ${user.lastName || ''}`,
                        imageUrl: user.imageUrl
                    })

                    if (!user.id) {
                        throw new Error('User ID is missing')
                    }

                    if (!user.emailAddresses?.[0]?.emailAddress) {
                        throw new Error('User email is missing')
                    }

                    const response = await fetch('/api/users/sync', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: user.emailAddresses[0].emailAddress,
                            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Anonymous',
                            avatarUrl: user.imageUrl
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to sync user data');
                    }

                    const result = await response.json();
                    console.log("User sync successful:", result);
                    toast.success('Welcome back!', {
                        icon: '👋',
                    });
                } catch (error) {
                    console.error('Error syncing user:', error);
                    toast.error(`Failed to sync user data: ${error instanceof Error ? error.message : 'Unknown error'}`);
                }
            } else {
                console.log("User sync skipped:", { isSignedIn, userId: user?.id });
            }
        }

        syncUser();
    }, [isSignedIn, user]);

    // 获取评论和点赞数据
    const fetchData = useCallback(async () => {
        if (!user) return;

        try {
            setIsLoading(true)
            const [commentsResponse, likesResponse] = await Promise.all([
                fetch('/api/comments'),
                fetch(`/api/users/${user.id}/likes`)
            ]);

            if (!commentsResponse.ok) {
                throw new Error('Failed to fetch comments');
            }

            const commentsData = await commentsResponse.json();
            let likesData = [];

            if (likesResponse.ok) {
                likesData = await likesResponse.json();
            }

            setComments(commentsData);
            setUserLikes(likesData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load comments');
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (isLoaded && user) {
            fetchData()
        }
    }, [isLoaded, user, fetchData])

    const handleCommentAdded = useCallback(() => {
        fetchData()
    }, [fetchData])

    // 如果未登录，显示登录面板
    if (isLoaded && !isSignedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl">
                    {/* 背景装饰 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl" />
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-repeat-[32px_32px]" />

                    {/* 主卡片 */}
                    <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 dark:border-white/10 shadow-2xl">
                        <div className="text-center space-y-8">
                            {/* 标题和图标 */}
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600">
                                        Join the Discussion
                                    </h2>
                                    <p className="mt-2 text-muted-foreground">
                                        Sign in to share your thoughts and engage with our vibrant community
                                    </p>
                                </div>
                            </div>

                            {/* 统计数据 */}
                            <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {comments.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Conversations
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {comments.reduce((acc, comment) =>
                                            acc + (Array.isArray(comment.likes) ? comment.likes.length : 0),
                                            0)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Interactions
                                    </div>
                                </div>
                            </div>

                            {/* 登录按钮 */}
                            <div className="space-y-4">
                                <SignInButton mode="modal">
                                    <button className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg">
                                        Sign In to Participate
                                    </button>
                                </SignInButton>
                                <p className="text-sm text-muted-foreground">
                                    Join our community and be part of the conversation
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 装饰元素 */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-600/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl" />
                </div>
            </div>
        )
    }

    // 如果已登录，显示评论内容
    if (isLoaded && isSignedIn) {
        const userData = {
            id: user!.id,
            imageUrl: user!.imageUrl || "https://github.com/shadcn.png",
            firstName: user!.firstName || "User",
        }

        const totalLikes = comments.reduce((acc, comment) =>
            acc + (Array.isArray(comment.likes) ? comment.likes.length : 0),
            0)

        return (
            <main className="min-h-screen relative">
                {/* Background elements */}
                <div className="fixed inset-0 -z-10 overflow-hidden bg-dot-pattern">
                    {/* ... 背景动画代码 ... */}
                </div>

                {/* Content area */}
                <div className="relative">
                    <SpeakingPageContent user={userData}>
                        <SpeakingHeader
                            commentsCount={comments.length}
                            likesCount={totalLikes}
                        />

                        <div className="relative">
                            <div className="max-w-4xl mx-auto px-4 py-8">
                                {/* Comment input area */}
                                <div className="mb-12 bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-white/10">
                                    <div className="relative">
                                        <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            Share Your Thoughts
                                        </h2>
                                        <CommentInput
                                            user={userData}
                                            onCommentAdded={handleCommentAdded}
                                        />
                                    </div>
                                </div>

                                {/* Comments list */}
                                {isLoading ? (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    </div>
                                ) : (
                                    <CommentsContainer
                                        comments={comments}
                                        userLikes={userLikes}
                                        currentUser={{
                                            id: user.id,
                                            name: user.firstName || '',
                                            image: user.imageUrl || '',
                                            email: user.emailAddresses?.[0]?.emailAddress || null
                                        }}
                                        onCommentUpdated={fetchData}
                                    />
                                )}
                            </div>
                        </div>
                    </SpeakingPageContent>
                </div>
            </main>
        )
    }

    // 加载状态
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    )
}