"use client"

import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import Image from "next/image"

interface SpeakingHeroProps {
    user: any
}

export function SpeakingHero({ user }: SpeakingHeroProps) {
    return (
        <section className="min-h-[80vh] flex items-center justify-center relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                    {/* 左侧图片 */}
                    <div className="w-full md:w-1/3">
                        <div className="relative aspect-square rounded-2xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&h=800&q=80"
                                alt="Speaking & Discussions"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
                        </div>
                    </div>

                    {/* 右侧内容 */}
                    <div className="flex-1 text-center md:text-left space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary"
                        >
                            Speaking & Discussions
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-muted-foreground max-w-2xl"
                        >
                            Join the conversation and share your thoughts in our community discussions.
                        </motion.p>

                        {!user ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <SignInButton mode="modal">
                                    <Button
                                        size="lg"
                                        className="gap-2 relative overflow-hidden group"
                                    >
                                        <MessageSquare className="h-5 w-5" />
                                        <span>Sign In to Join Discussion</span>
                                        <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </Button>
                                </SignInButton>
                            </motion.div>
                        ) : (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-muted-foreground"
                            >
                                Welcome back! You're signed in as {user.firstName || user.email}
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
} 