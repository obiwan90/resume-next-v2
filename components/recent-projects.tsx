import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
    _id: string
    title: string
    description: string
    coverImage: {
        asset: {
            url: string
        }
        alt: string
    }
    projectUrl?: string
    githubUrl?: string
    tags: string[]
    isRecentUpdate: boolean
}

interface RecentProjectsProps {
    projects: Project[]
}

export function RecentProjects({ projects }: RecentProjectsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="group overflow-hidden dark:bg-zinc-900/30 hover:dark:bg-zinc-800/50 border-zinc-200/10 hover:border-zinc-200/20 transition-all duration-300">
                        {/* 项目封面图 */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={project.coverImage.asset.url}
                                alt={project.coverImage.alt}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* 悬浮链接 */}
                            <div className="absolute inset-0 bg-zinc-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                {project.githubUrl && (
                                    <Link
                                        href={project.githubUrl}
                                        target="_blank"
                                        className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100 transition-colors duration-200"
                                    >
                                        <Github className="h-5 w-5" />
                                    </Link>
                                )}
                                {project.projectUrl && (
                                    <Link
                                        href={project.projectUrl}
                                        target="_blank"
                                        className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100 transition-colors duration-200"
                                    >
                                        <ExternalLink className="h-5 w-5" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* 项目信息 */}
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold tracking-tight dark:text-zinc-100">
                                    {project.title}
                                </h3>
                                <p className="text-sm dark:text-zinc-400 line-clamp-2">
                                    {project.description}
                                </p>
                            </div>

                            {/* 技术标签 */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="dark:bg-zinc-800/50 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-700/50"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* 最近更新标记 */}
                            {project.isRecentUpdate && (
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                        Recent Update
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
} 