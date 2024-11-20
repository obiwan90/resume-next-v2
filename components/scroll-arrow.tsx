"use client"

import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"

export function ScrollArrow() {
    const scrollToComments = () => {
        const commentsSection = document.getElementById('comments-section')
        commentsSection?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
            animate={{
                y: [0, 10, 0],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            onClick={scrollToComments}
        >
            <div className="relative">
                <motion.div
                    className="absolute -inset-4 rounded-full bg-primary/20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <MessageSquare className="h-8 w-8 text-primary relative z-10" />
            </div>
        </motion.div>
    )
} 