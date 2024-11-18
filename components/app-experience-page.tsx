"use client"

import { motion } from "framer-motion"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { Navbar } from "@/components/layout/navbar"

// 定义动画变体
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const titleVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay: 0.2 }
}

export function AppExperiencePage() {
  return (
    <motion.div
      className="min-h-screen bg-background"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="container py-12">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.h1
            className="text-4xl font-bold mb-8"
            variants={titleVariants}
          >
            Work Experience
          </motion.h1>
          <ExperienceTimeline />
        </motion.div>
      </main>
    </motion.div>
  )
}