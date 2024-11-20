"use client"

import { motion } from "framer-motion"
import { ProjectsGrid } from "./projects-grid"
import { Code2, Sparkles, Rocket } from "lucide-react"
import { Project } from "../types"

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
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Code2 className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Project Showcase
          </motion.h1>
          <motion.div
            initial={{ rotate: 20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Rocket className="h-8 w-8 text-primary" />
          </motion.div>
        </div>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          <p className="text-xl text-muted-foreground italic">
            Where Ideas Come to Life
          </p>
        </motion.div>
      </div>

      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ProjectsGrid projects={projects} />
      </motion.div>

      <motion.div
        className="mt-12 text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-border" />
          <span className="text-sm">Crafted with passion</span>
          <div className="h-[1px] w-12 bg-border" />
        </div>
      </motion.div>
    </motion.div>
  )
}