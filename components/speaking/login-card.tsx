"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, Heart, Users } from "lucide-react"

interface LoginCardProps {
    commentsCount: number
    likesCount: number
}

export function LoginCard({ commentsCount, likesCount }: LoginCardProps) {
    return (
        <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
            {/* Hero Section */}
            <div className="w-full max-w-6xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-2">
                        Join the Discussion
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Share your thoughts, connect with others.
                    </p>
                </motion.div>
            </div>

            {/* Stats Cards */}
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors duration-300">
                            <MessageCircle className="w-6 h-6 text-violet-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-violet-600">{commentsCount}</div>
                            <div className="text-sm text-muted-foreground">Active Discussions</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors duration-300">
                            <Heart className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-indigo-600">{likesCount}</div>
                            <div className="text-sm text-muted-foreground">Total Reactions</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                            <Users className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">Join Now</div>
                            <div className="text-sm text-muted-foreground">Be part of the comments section</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500" />
                <Button
                    className="relative bg-background/80 hover:bg-background/60 backdrop-blur-sm text-foreground px-8 py-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = '/sign-in'}
                >
                    Sign in to Comment
                </Button>
            </motion.div>

            {/* Features */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                    <span>Real-time Interactions</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>Secure Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Emoji Support</span>
                </div>
            </motion.div>
        </div>
    )
}