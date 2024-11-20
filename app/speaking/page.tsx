import { auth, currentUser } from '@clerk/nextjs/server'
import { SpeakingPageContent } from "@/components/speaking-page-content"
import { CommentList } from "@/components/comments/comment-list"
import { CommentInput } from "@/components/comments/comment-input"
import { SpeakingHeader } from "@/components/speaking/speaking-header"
import { commentService } from "@/lib/services/comment-service"
import { LoginCard } from "@/components/speaking/login-card"

export default async function SpeakingPage() {
    try {
        const { userId } = await auth()
        const user = userId ? await currentUser() : null

        const userData = user ? {
            id: userId!,
            imageUrl: user.imageUrl || "https://github.com/shadcn.png",
            firstName: user.firstName || "User",
        } : null

        const [comments, userLikes] = await Promise.all([
            commentService.getComments(),
            userId ? commentService.getUserLikes(userId) : []
        ])

        const totalLikes = comments.reduce((acc, comment) =>
            acc + (comment.likes?.length || 0), 0
        )

        return (
            <main className="min-h-screen relative">
                {/* Enhanced animated background */}
                <div className="fixed inset-0 -z-10 overflow-hidden bg-dot-pattern">
                    {/* Animated gradient circles */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-400/30 via-indigo-400/30 to-purple-400/30 dark:from-violet-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/30 via-teal-400/30 to-emerald-400/30 dark:from-cyan-900/20 dark:via-teal-900/20 dark:to-emerald-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-bl from-amber-400/30 via-orange-400/30 to-rose-400/30 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-rose-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

                    {/* Enhanced grid pattern */}
                    <div className="absolute inset-0 bg-grid-slate-200/40 dark:bg-grid-slate-900/20 bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)] animate-grid-fade" />

                    {/* Noise texture */}
                    <div className="absolute inset-0 bg-noise opacity-20 animate-noise" />

                    {/* Floating particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="particles-container" />
                    </div>
                </div>

                {/* Content area */}
                <div className="relative">
                    {userData ? (
                        <SpeakingPageContent user={userData}>
                            <SpeakingHeader
                                commentsCount={comments.length}
                                likesCount={totalLikes}
                            />

                            <div className="relative">
                                <div className="max-w-4xl mx-auto px-4 py-8">
                                    {/* Comment input area */}
                                    <div className="mb-12 bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-white/5 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                        <div className="relative">
                                            <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                Share Your Thoughts
                                            </h2>
                                            <CommentInput user={userData} />
                                        </div>
                                    </div>

                                    {/* Comments list */}
                                    <CommentList
                                        comments={comments}
                                        userLikes={userLikes}
                                        currentUserId={userId}
                                    />
                                </div>
                            </div>
                        </SpeakingPageContent>
                    ) : (
                        <LoginCard
                            commentsCount={comments.length}
                            likesCount={totalLikes}
                        />
                    )}
                </div>
            </main>
        )
    } catch (error) {
        console.error('SpeakingPage Error:', error)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                        Speaking Page
                    </h2>
                    <p className="text-muted-foreground">Coming soon...</p>
                </div>
            </div>
        )
    }
}