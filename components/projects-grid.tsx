"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Github, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
    _id: string
    title: string
    slug: {
        current: string
    }
    description: string
    coverImage?: {
        asset: {
            url: string
        }
        alt: string
    }
    projectUrl?: string
    githubUrl?: string
    tags: string[]
    publishedAt: string
    isRecentUpdate: boolean
}

interface ProjectsGridProps {
    projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="overflow-hidden">
                        <div className="relative aspect-video">
                            <Image
                                src={project.coverImage?.asset?.url || `https://picsum.photos/seed/${project._id}/800/600`}
                                alt={project.coverImage?.alt || project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 p-4">
                                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-sm text-gray-200 line-clamp-3">{project.description}</p>
                                    <div className="absolute bottom-4 left-4 flex gap-2">
                                        {project.githubUrl && (
                                            <Button size="sm" variant="secondary" asChild>
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-4 w-4 mr-1" />
                                                    Code
                                                </a>
                                            </Button>
                                        )}
                                        {project.projectUrl && (
                                            <Button size="sm" variant="secondary" asChild>
                                                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                                    <FileText className="h-4 w-4 mr-1" />
                                                    Doc
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="flex flex-wrap gap-1">
                                {project.tags?.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs px-2 py-0.5"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
} 