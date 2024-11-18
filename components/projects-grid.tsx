"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
    _id: string
    title: string
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
}

interface ProjectsGridProps {
    projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    const defaultImageUrl = "https://picsum.photos/800/600"

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
                                src={project.coverImage?.asset?.url || defaultImageUrl}
                                alt={project.coverImage?.alt || project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                    <div className="space-y-4">
                                        <p className="text-gray-200 text-sm">{project.description}</p>
                                        <div className="flex gap-2">
                                            {project.githubUrl && (
                                                <Button size="sm" variant="secondary" asChild>
                                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                        <Github className="h-4 w-4 mr-2" />
                                                        Code
                                                    </a>
                                                </Button>
                                            )}
                                            {project.projectUrl && (
                                                <Button size="sm" variant="secondary" asChild>
                                                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        Demo
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-wrap gap-2">
                                {project.tags?.map((tag) => (
                                    <Badge key={tag} variant="secondary">
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