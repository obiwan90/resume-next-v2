"use client"

import { motion } from "framer-motion"
import { ProjectsGrid } from "@/components/projects-grid"

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

interface AppProjectsPageProps {
  projects: Project[]
}

export function AppProjectsPage({ projects }: AppProjectsPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <ProjectsGrid projects={projects} />
    </motion.div>
  )
}