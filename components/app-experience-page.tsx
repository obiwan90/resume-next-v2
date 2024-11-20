"use client"

import { motion } from "framer-motion"
// import { ExperienceTimeline } from "@/components/experience-timeline"
import { Briefcase, Star, History, Sparkles } from "lucide-react"

interface Project {
  name: string
  description: string
  background?: {
    problem: string
    solution: string
    impact: string
  }
  responsibilities: string[]
  techStack: string[]
}

interface Experience {
  _id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  isCurrentRole: boolean
  description: string
  projects: Project[]
  skills: string[]
  achievements: string[]
  order: number
}

interface AppExperiencePageProps {
  experiences: Experience[]
}

export function AppExperiencePage({ experiences }: AppExperiencePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* 动态背景 */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* 标题部分 */}
      <div className="space-y-6 mb-12">
        {/* 主标题 */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-2 bg-primary/10 rounded-xl"
          >
            <Briefcase className="h-8 w-8 text-primary" />
          </motion.div>
          <div className="space-y-1">
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Professional Journey
            </motion.h1>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground italic">
                A Timeline of Growth & Achievement
              </p>
            </motion.div>
          </div>
        </div>

        {/* 统计信息 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <History className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">{experiences.length}</div>
              <div className="text-sm text-muted-foreground">Positions</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Star className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">
                {experiences.reduce((acc, exp) => acc + exp.projects.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">
                {experiences.reduce((acc, exp) => acc + exp.achievements.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 时间线 */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ExperienceTimeline experiences={experiences} />
      </motion.div> */}

      {/* 底部装饰 */}
      <motion.div
        className="mt-12 text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-border" />
          <span className="text-sm">Every step counts</span>
          <div className="h-[1px] w-12 bg-border" />
        </div>
      </motion.div>
    </motion.div>
  )
}