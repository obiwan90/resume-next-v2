"use client"

import { motion } from "framer-motion"
import { MessageSquare, Heart, MessagesSquare } from "lucide-react"

interface SpeakingHeaderProps {
    commentsCount: number
    likesCount: number
}

export function SpeakingHeader({ commentsCount, likesCount }: SpeakingHeaderProps) {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                <div className="absolute -top-[500px] -right-[400px] w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="inline-flex items-center gap-2 text-primary">
                            <MessagesSquare className="h-5 w-5" />
                            <span className="text-sm font-medium">Comments</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight">
                            Share Your Thoughts
                        </h1>

                        <p className="text-xl text-muted-foreground">
                            Let&apos;s discuss technology and creativity together
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 inline-flex items-center gap-6"
                    >
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <MessageSquare className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{commentsCount}</div>
                                <div className="text-sm text-muted-foreground">Comments</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Heart className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{likesCount}</div>
                                <div className="text-sm text-muted-foreground">Likes</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
} 