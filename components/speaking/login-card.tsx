"use client"

import { LoginButton } from "@/components/auth/login-button"

interface LoginCardProps {
    commentsCount: number
    likesCount: number
}

export function LoginCard({ commentsCount, likesCount }: LoginCardProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-32">
            <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-white/5">
                <div className="text-center space-y-6">
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Join the Conversation
                    </h2>
                    <p className="text-muted-foreground">
                        Sign in to share your thoughts and engage with {commentsCount} comments and {likesCount} likes.
                    </p>
                    <div className="flex justify-center">
                        <LoginButton />
                    </div>
                </div>
            </div>
        </div>
    )
}