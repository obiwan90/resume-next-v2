"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, Briefcase, Calendar, Award, Code2, Target } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
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

interface ExperienceTimelineProps {
    experiences: Experience[]
}

// 修改示例图片数组的第一张图片
const decorativeImages = [
    // 第一张图片更换为更专业的团队协作场景
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&h=800&q=80", // 现代办公团队协作场景
    // 技术/办公场景
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=800&q=80", // 编程/代码场景
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=800&q=80", // 笔记本工作场景
    "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=600&h=800&q=80", // 现代办公室
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&h=800&q=80", // 团队协作
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&h=800&q=80",  // 会议/讨论
    // 科技/创新场景
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=800&q=80", // 数据可视化
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=800&q=80", // 现代科技
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=600&h=800&q=80", // 创新/想法
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=800&q=80"  // 数据中心
]

// 在组件中使用图片时添加加载状态和错误处理
const ImageWithFallback = ({ src, alt }: { src: string; alt: string }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    return (
        <div className="relative w-full h-full min-h-[200px] overflow-hidden rounded-xl">
            <motion.div
                className="absolute inset-0 bg-primary/5"
                animate={{
                    opacity: loading ? [0.5, 0.3, 0.5] : 0
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <Image
                src={error ? "/fallback-image.jpg" : src}
                alt={alt}
                fill
                className={cn(
                    "object-cover transition-transform duration-500 hover:scale-105",
                    loading ? "blur-sm" : "blur-0"
                )}
                onError={() => setError(true)}
                onLoadingComplete={() => setLoading(false)}
                priority
            />
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>
    )
}

// 添加动态装饰组件
const TimelineDecorations = () => {
    return (
        <div className="absolute left-[1.6rem] top-0 bottom-0 -z-10">
            {/* 垂直连接线动画 */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* 装饰性光点 */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/10"
                animate={{
                    y: [0, 100, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    )
}

// 添加交互式节点组件
const TimelineNode = ({ index, isExpanded }: { index: number; isExpanded: boolean }) => {
    return (
        <motion.div
            className="absolute left-[1.875rem] -translate-x-1/2 top-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 }}
        >
            <motion.div
                className={cn(
                    "relative w-4 h-4 rounded-full",
                    isExpanded ? "bg-primary" : "bg-primary/50"
                )}
                animate={{
                    scale: isExpanded ? [1, 1.2, 1] : 1,
                    boxShadow: isExpanded
                        ? [
                            "0 0 0 0 rgba(var(--primary), 0.4)",
                            "0 0 0 10px rgba(var(--primary), 0)",
                        ]
                        : "none"
                }}
                transition={{ duration: 1, repeat: isExpanded ? Infinity : 0 }}
            >
                <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>
        </motion.div>
    )
}

// 添加展开动画变体
const expandAnimation = {
    initial: { opacity: 0, height: 0 },
    animate: {
        opacity: 1,
        height: "auto",
        transition: {
            height: {
                type: "spring",
                stiffness: 100,
                damping: 15
            },
            opacity: {
                duration: 0.2
            }
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            height: {
                duration: 0.2
            },
            opacity: {
                duration: 0.1
            }
        }
    }
}

// 添加项目卡片组件
const ProjectCard = ({ project }: { project: Experience['projects'][0] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "group bg-accent/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300",
                "border border-primary/10 hover:border-primary/20"
            )}
            whileHover={{ scale: 1.02 }}
        >
            {/* 项目头部 */}
            <div className="p-6 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <Code2 className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                        {project.name}
                    </h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                </p>
            </div>

            {/* 项目详情 */}
            <div className="p-6 space-y-6">
                <div className="space-y-4 bg-background/80 p-5 rounded-lg border border-primary/10">
                    <h5 className="font-semibold flex items-center gap-2">
                        <div className="h-1 w-4 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                        Project Background
                    </h5>
                    <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                        <div className="space-y-2">
                            <p className="text-sm">
                                <span className="font-semibold text-primary">Problem:</span>
                                <span className="text-muted-foreground ml-2">{project.background.problem}</span>
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold text-primary">Solution:</span>
                                <span className="text-muted-foreground ml-2">{project.background.solution}</span>
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold text-primary">Impact:</span>
                                <span className="text-muted-foreground ml-2">{project.background.impact}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h5 className="font-semibold flex items-center gap-2">
                        <div className="h-1 w-4 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                        Key Responsibilities
                    </h5>
                    <ul className="grid gap-3 pl-4">
                        {project.responsibilities.map((resp, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-3 text-muted-foreground group/item"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 group-hover/item:bg-primary transition-colors duration-300" />
                                <span className="group-hover/item:text-foreground transition-colors duration-300">
                                    {resp}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h5 className="font-semibold flex items-center gap-2">
                        <div className="h-1 w-4 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                        Tech Stack
                    </h5>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                            <Badge
                                key={idx}
                                variant="outline"
                                className="bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    return (
        <div className="grid gap-16">
            {experiences.map((experience, index) => (
                <motion.div
                    key={experience._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    {/* 桌面端布局 */}
                    <div className="hidden md:grid gap-8"
                        style={{
                            gridTemplateColumns: index % 2 === 0 ? '1fr 320px' : '320px 1fr'
                        }}
                    >
                        {index % 2 === 0 ? (
                            <>
                                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10">
                                    <CardHeader className="space-y-6 bg-gradient-to-b from-primary/5 to-transparent">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                            <div className="space-y-1">
                                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                                    <motion.div
                                                        className="p-2 rounded-lg bg-primary/10"
                                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                                        transition={{ type: "spring", stiffness: 400 }}
                                                    >
                                                        <Briefcase className="h-5 w-5 text-primary" />
                                                    </motion.div>
                                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                                                        {experience.company}
                                                    </span>
                                                </CardTitle>
                                                <CardDescription className="text-lg font-medium text-primary/90">
                                                    {experience.position}
                                                </CardDescription>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-sm flex items-center gap-2 px-3 py-1.5 bg-primary/5 whitespace-nowrap hover:bg-primary/10 transition-colors duration-300"
                                            >
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(experience.startDate)} - {experience.isCurrentRole ? 'Present' : formatDate(experience.endDate)}
                                            </Badge>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed">
                                            {experience.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {experience.skills.map((skill, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Badge
                                                        variant="secondary"
                                                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 transition-colors duration-300 cursor-default"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardHeader>

                                    <div className="px-8 pb-8">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-between hover:bg-primary/5 group relative overflow-hidden"
                                            onClick={() => setExpandedId(expandedId === experience._id ? null : experience._id)}
                                        >
                                            <motion.span
                                                className="font-medium flex items-center gap-2 relative z-10"
                                                animate={{
                                                    color: expandedId === experience._id ? "hsl(var(--primary))" : "currentColor"
                                                }}
                                            >
                                                <Target className="h-4 w-4 text-primary" />
                                                {expandedId === experience._id ? 'Hide Details' : 'View Details'}
                                            </motion.span>
                                            <motion.div
                                                className="h-4 w-4"
                                                animate={{ rotate: expandedId === experience._id ? 180 : 0 }}
                                                transition={{ type: "spring", stiffness: 200 }}
                                            >
                                                <ChevronDown className="h-4 w-4" />
                                            </motion.div>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"
                                                initial={{ y: "100%" }}
                                                whileHover={{ y: "0%" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Button>

                                        <AnimatePresence mode="wait">
                                            {expandedId === experience._id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{
                                                        height: {
                                                            type: "spring",
                                                            stiffness: 100,
                                                            damping: 15
                                                        },
                                                        opacity: { duration: 0.2 }
                                                    }}
                                                    className="mt-8 pt-8 border-t space-y-8"
                                                >
                                                    <div className={cn(
                                                        "grid gap-8",
                                                        experience.projects.length === 1
                                                            ? "grid-cols-1"
                                                            : "grid-cols-1 md:grid-cols-2"
                                                    )}>
                                                        {experience.projects.map((project, index) => (
                                                            <ProjectCard key={index} project={project} />
                                                        ))}
                                                    </div>

                                                    <motion.div
                                                        className="space-y-4 p-6 bg-accent/30 rounded-xl border border-primary/10"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="p-2 rounded-lg bg-primary/10">
                                                                <Award className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <h4 className="font-bold">Key Achievements</h4>
                                                        </div>
                                                        <ul className="grid gap-3 pl-4">
                                                            {experience.achievements.map((achievement, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-start gap-3 text-muted-foreground group"
                                                                >
                                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 group-hover:bg-primary transition-colors duration-300" />
                                                                    <span className="group-hover:text-foreground transition-colors duration-300">
                                                                        {achievement}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </Card>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    className="relative h-full group"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <ImageWithFallback
                                        src={decorativeImages[index % decorativeImages.length]}
                                        alt={`Decorative image for ${experience.company}`}
                                    />
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    className="relative h-full group"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <ImageWithFallback
                                        src={decorativeImages[index % decorativeImages.length]}
                                        alt={`Decorative image for ${experience.company}`}
                                    />
                                </motion.div>

                                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10">
                                    <CardHeader className="space-y-6 bg-gradient-to-b from-primary/5 to-transparent">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                            <div className="space-y-1">
                                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                                    <motion.div
                                                        className="p-2 rounded-lg bg-primary/10"
                                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                                        transition={{ type: "spring", stiffness: 400 }}
                                                    >
                                                        <Briefcase className="h-5 w-5 text-primary" />
                                                    </motion.div>
                                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                                                        {experience.company}
                                                    </span>
                                                </CardTitle>
                                                <CardDescription className="text-lg font-medium text-primary/90">
                                                    {experience.position}
                                                </CardDescription>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-sm flex items-center gap-2 px-3 py-1.5 bg-primary/5 whitespace-nowrap hover:bg-primary/10 transition-colors duration-300"
                                            >
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(experience.startDate)} - {experience.isCurrentRole ? 'Present' : formatDate(experience.endDate)}
                                            </Badge>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed">
                                            {experience.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {experience.skills.map((skill, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Badge
                                                        variant="secondary"
                                                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 transition-colors duration-300 cursor-default"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardHeader>

                                    <div className="px-8 pb-8">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-between hover:bg-primary/5 group relative overflow-hidden"
                                            onClick={() => setExpandedId(expandedId === experience._id ? null : experience._id)}
                                        >
                                            <motion.span
                                                className="font-medium flex items-center gap-2 relative z-10"
                                                animate={{
                                                    color: expandedId === experience._id ? "hsl(var(--primary))" : "currentColor"
                                                }}
                                            >
                                                <Target className="h-4 w-4 text-primary" />
                                                {expandedId === experience._id ? 'Hide Details' : 'View Details'}
                                            </motion.span>
                                            <motion.div
                                                className="h-4 w-4"
                                                animate={{ rotate: expandedId === experience._id ? 180 : 0 }}
                                                transition={{ type: "spring", stiffness: 200 }}
                                            >
                                                <ChevronDown className="h-4 w-4" />
                                            </motion.div>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"
                                                initial={{ y: "100%" }}
                                                whileHover={{ y: "0%" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Button>

                                        <AnimatePresence mode="wait">
                                            {expandedId === experience._id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{
                                                        height: {
                                                            type: "spring",
                                                            stiffness: 100,
                                                            damping: 15
                                                        },
                                                        opacity: { duration: 0.2 }
                                                    }}
                                                    className="mt-8 pt-8 border-t space-y-8"
                                                >
                                                    <div className={cn(
                                                        "grid gap-8",
                                                        experience.projects.length === 1
                                                            ? "grid-cols-1"
                                                            : "grid-cols-1 md:grid-cols-2"
                                                    )}>
                                                        {experience.projects.map((project, index) => (
                                                            <ProjectCard key={index} project={project} />
                                                        ))}
                                                    </div>

                                                    <motion.div
                                                        className="space-y-4 p-6 bg-accent/30 rounded-xl border border-primary/10"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="p-2 rounded-lg bg-primary/10">
                                                                <Award className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <h4 className="font-bold">Key Achievements</h4>
                                                        </div>
                                                        <ul className="grid gap-3 pl-4">
                                                            {experience.achievements.map((achievement, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-start gap-3 text-muted-foreground group"
                                                                >
                                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 group-hover:bg-primary transition-colors duration-300" />
                                                                    <span className="group-hover:text-foreground transition-colors duration-300">
                                                                        {achievement}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </Card>
                            </>
                        )}
                    </div>

                    {/* 移动端布局 */}
                    <div className="md:hidden space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="aspect-[16/9] relative rounded-xl overflow-hidden"
                        >
                            <ImageWithFallback
                                src={decorativeImages[index % decorativeImages.length]}
                                alt={`Decorative image for ${experience.company}`}
                            />
                        </motion.div>

                        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10">
                            <CardHeader className="space-y-6 bg-gradient-to-b from-primary/5 to-transparent">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                                            <motion.div
                                                className="p-2 rounded-lg bg-primary/10"
                                                whileHover={{ scale: 1.1, rotate: 10 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                <Briefcase className="h-5 w-5 text-primary" />
                                            </motion.div>
                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                                                {experience.company}
                                            </span>
                                        </CardTitle>
                                        <CardDescription className="text-lg font-medium text-primary/90">
                                            {experience.position}
                                        </CardDescription>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="text-sm flex items-center gap-2 px-3 py-1.5 bg-primary/5 whitespace-nowrap hover:bg-primary/10 transition-colors duration-300"
                                    >
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(experience.startDate)} - {experience.isCurrentRole ? 'Present' : formatDate(experience.endDate)}
                                    </Badge>
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                    {experience.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {experience.skills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Badge
                                                variant="secondary"
                                                className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 transition-colors duration-300 cursor-default"
                                            >
                                                {skill}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardHeader>

                            <div className="px-8 pb-8">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-between hover:bg-primary/5 group relative overflow-hidden"
                                    onClick={() => setExpandedId(expandedId === experience._id ? null : experience._id)}
                                >
                                    <motion.span
                                        className="font-medium flex items-center gap-2 relative z-10"
                                        animate={{
                                            color: expandedId === experience._id ? "hsl(var(--primary))" : "currentColor"
                                        }}
                                    >
                                        <Target className="h-4 w-4 text-primary" />
                                        {expandedId === experience._id ? 'Hide Details' : 'View Details'}
                                    </motion.span>
                                    <motion.div
                                        className="h-4 w-4"
                                        animate={{ rotate: expandedId === experience._id ? 180 : 0 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </motion.div>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"
                                        initial={{ y: "100%" }}
                                        whileHover={{ y: "0%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Button>

                                <AnimatePresence mode="wait">
                                    {expandedId === experience._id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{
                                                height: {
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15
                                                },
                                                opacity: { duration: 0.2 }
                                            }}
                                            className="mt-8 pt-8 border-t space-y-8"
                                        >
                                            <div className={cn(
                                                "grid gap-8",
                                                experience.projects.length === 1
                                                    ? "grid-cols-1"
                                                    : "grid-cols-1 md:grid-cols-2"
                                            )}>
                                                {experience.projects.map((project, index) => (
                                                    <ProjectCard key={index} project={project} />
                                                ))}
                                            </div>

                                            <motion.div
                                                className="space-y-4 p-6 bg-accent/30 rounded-xl border border-primary/10"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 rounded-lg bg-primary/10">
                                                        <Award className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <h4 className="font-bold">Key Achievements</h4>
                                                </div>
                                                <ul className="grid gap-3 pl-4">
                                                    {experience.achievements.map((achievement, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start gap-3 text-muted-foreground group"
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2 group-hover:bg-primary transition-colors duration-300" />
                                                            <span className="group-hover:text-foreground transition-colors duration-300">
                                                                {achievement}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            ))}
        </div>
    )
} 