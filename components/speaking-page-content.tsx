"use client"

import { motion } from "framer-motion"
import { MessageSquare, Sparkles, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { Card } from "@/components/ui/card"

interface SpeakingPageContentProps {
    user: {
        id: string;
        imageUrl: string;
        firstName: string;
    } | null;
    children: React.ReactNode;
}

export function SpeakingPageContent({ user, children }: SpeakingPageContentProps) {
    return (
        <div className="min-h-screen bg-background">
            {!user ? (
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <Card className="relative overflow-hidden">
                        {/* 背景装饰 */}
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />
                            <div className="absolute -top-[200px] -right-[200px] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
                        </div>

                        <div className="p-8 text-center space-y-6">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full blur" />
                                    <div className="relative p-4 bg-background rounded-full">
                                        <MessageSquare className="h-12 w-12 text-primary" />
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className="text-2xl font-bold">Join the Discussion</h2>
                                    <p className="text-muted-foreground mt-2">
                                        Share your thoughts and connect with others
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col items-center gap-4 mt-4"
                                >
                                    <SignInButton mode="modal">
                                        <Button
                                            size="lg"
                                            className="relative group"
                                        >
                                            <span className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                            <span className="relative flex items-center gap-2">
                                                <Sparkles className="h-4 w-4" />
                                                Sign in to Comment
                                            </span>
                                        </Button>
                                    </SignInButton>

                                    <SignInButton mode="modal">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="relative group"
                                        >
                                            <span className="relative flex items-center gap-2">
                                                <Github className="h-4 w-4" />
                                                Continue with GitHub
                                            </span>
                                        </Button>
                                    </SignInButton>
                                </motion.div>
                            </motion.div>

                            {/* 装饰性元素 */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-muted-foreground">
                                <Sparkles className="h-4 w-4 text-primary" />
                                <span>Join our growing community</span>
                            </div>
                        </div>
                    </Card>
                </div>
            ) : (
                children
            )}
        </div>
    )
} 