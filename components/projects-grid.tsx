"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Project } from "../types"

interface ProjectsGridProps {
    projects: Project[]
}

// 添加项目卡片组件
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-500 bg-card/50 backdrop-blur-sm border-primary/10">
                {project.coverImage && (
                    <div className="relative aspect-video overflow-hidden">
                        <Image
                            src={project.coverImage.asset.url}
                            alt={project.coverImage.alt || project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            priority={index < 6}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                            <p className="text-gray-200 line-clamp-3">{project.description}</p>
                        </div>
                    </div>
                )}

                <div className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-primary/10 hover:bg-primary/20 transition-colors"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex gap-3 pt-4">
                        {project.githubUrl && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-2 group hover:border-primary/50"
                                asChild
                            >
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                                    <span>Source Code</span>
                                </a>
                            </Button>
                        )}
                        {project.projectUrl && (
                            <Button
                                variant="default"
                                size="sm"
                                className="flex-1 gap-2 group"
                                asChild
                            >
                                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    <span>Live Demo</span>
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

// 添加瀑布流布局组件
const MasonryGrid = ({ children }: { children: React.ReactNode[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children.map((child, index) => (
                <div
                    key={index}
                    style={{
                        gridRow: `span ${Math.floor(Math.random() * 1) + 1}`
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    )
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <MasonryGrid>
            {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
            ))}
        </MasonryGrid>
    )
} 