"use client"

import { motion } from "framer-motion"
import { ExperienceTimeline } from "@/components/experience-timeline"

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

interface AppExperiencePageProps {
  experiences: Experience[]
}

export function AppExperiencePage({ experiences }: AppExperiencePageProps) {
  console.log('Experience page data:', JSON.stringify(experiences, null, 2))

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Work Experience</h1>
        <ExperienceTimeline experiences={experiences} />
      </motion.div>
    </>
  )
}