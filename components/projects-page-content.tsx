"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProjectsGrid } from "./projects-grid"
import { Rocket, Code2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { PageTransition, PageLoadingAnimation, ScrollProgress, ScrollToTop } from "@/components/ui/page-transition"
import { Project } from '@/types'

interface ProjectsPageContentProps {
    projects: Project[]
}

// 添加动态背景组件
const DynamicBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
            <motion.div
                className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full"
                style={{
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)",
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
            <motion.div
                className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full"
                style={{
                    background: "radial-gradient(circle, hsl(var(--secondary) / 0.05) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
    )
}

// 添加统计组件
const ProjectStats = ({ projects }: { projects: Project[] }) => {
    const totalProjects = projects.length
    const uniqueTags = [...new Set(projects.flatMap(p => p.tags))].length
    const recentUpdates = projects.filter(p => p.isRecentUpdate ?? false).length

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
                { label: "Total Projects", value: totalProjects, icon: <Code2 className="h-5 w-5" /> },
                { label: "Technologies Used", value: uniqueTags, icon: <Rocket className="h-5 w-5" /> },
                { label: "Recent Updates", value: recentUpdates, icon: <Code2 className="h-5 w-5" /> }
            ].map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:border-primary/20 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

// 添加标签过滤组件
const TagFilter = ({ tags, selectedTag, onSelectTag }: {
    tags: string[]
    selectedTag: string | null
    onSelectTag: (tag: string | null) => void
}) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Badge
                    variant="secondary"
                    className={`px-3 py-1.5 cursor-pointer ${!selectedTag ? 'bg-primary/20' : 'bg-primary/10 hover:bg-primary/20'}`}
                    onClick={() => onSelectTag(null)}
                >
                    All
                </Badge>
            </motion.div>
            {tags.map(tag => (
                <motion.div
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Badge
                        variant="secondary"
                        className={`px-3 py-1.5 cursor-pointer ${selectedTag === tag ? 'bg-primary/20' : 'bg-primary/10 hover:bg-primary/20'}`}
                        onClick={() => onSelectTag(tag)}
                    >
                        {tag}
                    </Badge>
                </motion.div>
            ))}
        </div>
    )
}

export function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
    // 确保所有项目数据都包含必需的字段
    const validatedProjects: Project[] = projects.map(project => ({
        ...project,
        slug: project.slug || `project-${project.id}`,  // 提供默认值
        publishedAt: project.publishedAt || new Date().toISOString(),  // 提供默认值
        isRecentUpdate: project.isRecentUpdate || false  // 提供默认值
    }))

    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const allTags = [...new Set(validatedProjects.flatMap(p => p.tags))].sort()

    const filteredProjects = selectedTag
        ? validatedProjects.filter(p => p.tags.includes(selectedTag))
        : validatedProjects

    return (
        <PageTransition>
            <PageLoadingAnimation />
            <div className="min-h-screen relative">
                <DynamicBackground />
                <ScrollProgress />
                <ScrollToTop />

                <main className="container mx-auto px-4">
                    {/* 修改标题部分，添加左侧图片 */}
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
                                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&h=800&q=80"
                                            alt="Project Showcase"
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
                                        Project Showcase
                                    </motion.h1>
                                    <motion.p
                                        className="text-xl text-muted-foreground max-w-2xl md:mx-0"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Explore my portfolio of projects, featuring web applications, design work, and technical experiments with cutting-edge technologies.
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* 项目统计 */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="py-24"
                    >
                        <ProjectStats projects={projects} />
                    </motion.section>

                    {/* 标签过滤器和项目网格 */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="py-24 bg-accent/20 relative"
                    >
                        {/* 背景装饰 */}
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                        </div>

                        <div className="container mx-auto px-4">
                            <div className="flex flex-col items-center text-center mb-16">
                                <div className="p-3 rounded-xl bg-primary/10 mb-4">
                                    <Code2 className="h-10 w-10 text-primary" />
                                </div>
                                <h2 className="text-4xl font-bold mb-4">Project Gallery</h2>
                                <p className="text-muted-foreground max-w-2xl">
                                    Filter through my projects by technology or browse them all
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mb-12"
                            >
                                <TagFilter
                                    tags={allTags}
                                    selectedTag={selectedTag}
                                    onSelectTag={setSelectedTag}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <ProjectsGrid projects={filteredProjects} />
                            </motion.div>
                        </div>
                    </motion.section>

                    {/* 底部装饰 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center py-24"
                    >
                        <motion.div
                            className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-accent/30 backdrop-blur-sm relative overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45" />
                            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                            <p className="text-sm text-muted-foreground font-medium relative z-10">
                                Crafting digital experiences that matter
                            </p>
                            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </PageTransition>
    )
} 