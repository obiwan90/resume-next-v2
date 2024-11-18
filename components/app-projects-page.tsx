"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import Image from "next/image"

const projects = [
  {
    title: "AI Task Manager",
    description: "Smart task management with AI prioritization",
    image: "https://picsum.photos/seed/ai-task/800/400",
    tags: ["React", "OpenAI", "Node.js"],
    link: "#"
  },
  // ... 添加更多项目
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const cardHover = {
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
}

export function AppProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Featured Projects
          </motion.h1>
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={cardHover.hover}
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative aspect-video">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.8 }}
                    >
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <motion.h3
                          className="text-xl font-bold text-white mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p
                          className="text-gray-200 mb-4"
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                        >
                          {project.description}
                        </motion.p>
                        <motion.div
                          className="flex flex-wrap gap-2"
                          variants={containerVariants}
                        >
                          {project.tags.map((tag) => (
                            <motion.div
                              key={tag}
                              variants={itemVariants}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Badge variant="secondary">
                                {tag}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}