"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, ChevronUp } from "lucide-react"
import { ExperienceTimeline } from "./experience-timeline"
import Image from "next/image"

interface Experience {
    _id: string
    company: string
    position: string
    startDate: string
    endDate: string | null
    isCurrentRole: boolean
    description: string
    projects: Array<{
        name: string
        description: string
        background: {
            problem: string
            solution: string
            impact: string
        }
        responsibilities: string[]
        techStack: string[]
    }>
    skills: string[]
    achievements: string[]
    order: number
}

interface ExperiencePageContentProps {
    experiences: Experience[]
}

// 添加滚动进度指示器组件
const ScrollProgress = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrolled = (window.scrollY / scrollHeight) * 100
            setProgress(scrolled)
        }

        window.addEventListener('scroll', updateProgress)
        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-primary/10 z-50">
            <motion.div
                className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                style={{ width: `${progress}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
        </div>
    )
}

// 添加滚动到顶部按钮组件
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > 500)
        }
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary z-50 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronUp className="w-6 h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

// 添加页面切换动画组件
const PageTransition = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}

// 改进加载动画组件
const PageLoadingAnimation = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    if (!isLoading) return null

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onAnimationComplete={() => setIsLoading(false)}
        >
            <div className="relative">
                <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <Briefcase className="h-16 w-16 text-primary relative z-10" />
                </motion.div>
            </div>
        </motion.div>
    )
}

// 添加动态背景组件
const DynamicBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* 网格背景 */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

            {/* 动态渐变 */}
            <motion.div
                className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full"
                style={{
                    background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
                        hsl(var(--primary) / 0.05) 0%, transparent 70%)`,
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.3, 0.2, 0.3],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* 装饰性圆形 */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse" />

            {/* 渐变叠加 */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
    )
}

// 添加浮动装饰组件
const FloatingDecoration = () => {
    return (
        <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute top-20 left-10 w-3 h-3 rounded-full bg-primary/30"
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-40 right-20 w-2 h-2 rounded-full bg-secondary/30"
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            {/* 添加更多浮动元素 */}
        </div>
    )
}

export function ExperiencePageContent({ experiences }: ExperiencePageContentProps) {
    return (
        <PageTransition>
            <PageLoadingAnimation />
            <div className="min-h-screen relative">
                <DynamicBackground />
                <FloatingDecoration />
                <ScrollProgress />
                <ScrollToTop />

                <main className="container mx-auto px-4">
                    {/* 页面标题 - 修改这部分 */}
                    <motion.section
                        className="min-h-[80vh] flex items-center justify-center py-32"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                                {/* 左侧图片 */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="w-full md:w-1/3"
                                >
                                    <div className="relative aspect-square rounded-2xl overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&h=800&q=80"
                                            alt="Work Experience"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
                                    </div>
                                </motion.div>

                                {/* 右侧文字 */}
                                <div className="flex-1 text-center md:text-left space-y-6">
                                    <motion.h1
                                        className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Work Experience
                                    </motion.h1>
                                    <motion.p
                                        className="text-xl text-muted-foreground max-w-2xl md:mx-0"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        A comprehensive overview of my professional journey, highlighting key roles, projects, and achievements in software development and engineering.
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* 经验时间线 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative z-10 space-y-24 mb-24"
                    >
                        <div className="grid gap-8">
                            <ExperienceTimeline experiences={experiences} />
                        </div>
                    </motion.div>

                    {/* 底部装饰 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-center py-24"
                    >
                        <motion.div
                            className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-accent/30 backdrop-blur-sm relative overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            {/* 添加动态光效果 */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45" />

                            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                            <p className="text-sm text-muted-foreground font-medium relative z-10">
                                Each role has shaped my journey as a developer
                            </p>
                            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </PageTransition>
    )
} 