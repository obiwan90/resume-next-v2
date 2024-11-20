"use client"

import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"

interface SpeakingHeroSectionProps {
    user: any
}

export function SpeakingHeroSection({ user }: SpeakingHeroSectionProps) {
    return (
        <section className="h-[calc(100vh-5.5rem)] flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary"
                    >
                        Speaking & Discussions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground"
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
        </section>
    )
} 