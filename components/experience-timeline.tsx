"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Briefcase, Calendar, Award } from "lucide-react"

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

interface ExperienceTimelineProps {
    experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    return (
        <div className="space-y-8">
            {experiences.map((experience) => (
                <motion.div
                    key={experience._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                        <div
                            className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 cursor-pointer hover:bg-accent/50 p-4 rounded-lg transition-all duration-300"
                            onClick={() => setExpandedId(expandedId === experience._id ? null : experience._id)}
                        >
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-primary" />
                                    <h3 className="text-xl font-bold">{experience.position}</h3>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">
                                        {new Date(experience.startDate).toLocaleDateString()} - {
                                            experience.isCurrentRole
                                                ? 'Present'
                                                : experience.endDate && new Date(experience.endDate).toLocaleDateString()
                                        }
                                    </span>
                                </div>
                                <p className="text-lg font-medium text-primary/80">{experience.company}</p>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedId === experience._id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 md:mt-0"
                            >
                                <ChevronDown className="h-6 w-6 text-primary" />
                            </motion.div>
                        </div>

                        <div className="px-4">
                            <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
                        </div>

                        <div className="mt-4 px-4">
                            <div className="flex flex-wrap gap-2">
                                {experience.skills.map((skill, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="px-3 py-1 bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedId === experience._id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6 pt-6 border-t space-y-6"
                                >
                                    {experience.projects.map((project, index) => (
                                        <div
                                            key={index}
                                            className="bg-accent/50 rounded-xl p-6 space-y-4 hover:shadow-md transition-all duration-300"
                                        >
                                            <h4 className="text-lg font-bold text-primary">{project.name}</h4>
                                            <p className="text-muted-foreground">{project.description}</p>

                                            <div className="space-y-3 bg-background/80 p-5 rounded-lg border border-border/50">
                                                <h5 className="font-semibold flex items-center gap-2">
                                                    <span className="h-1 w-4 bg-primary rounded-full"></span>
                                                    Project Background
                                                </h5>
                                                <div className="space-y-3 text-sm pl-4 border-l-2 border-primary/20">
                                                    <p><span className="font-semibold text-primary">Problem:</span> {project.background.problem}</p>
                                                    <p><span className="font-semibold text-primary">Solution:</span> {project.background.solution}</p>
                                                    <p><span className="font-semibold text-primary">Impact:</span> {project.background.impact}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h5 className="font-semibold flex items-center gap-2">
                                                    <span className="h-1 w-4 bg-primary rounded-full"></span>
                                                    Key Responsibilities
                                                </h5>
                                                <ul className="grid gap-2 pl-4">
                                                    {project.responsibilities.map((resp, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-2 text-muted-foreground"
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2"></span>
                                                            {resp}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="space-y-3">
                                                <h5 className="font-semibold flex items-center gap-2">
                                                    <span className="h-1 w-4 bg-primary rounded-full"></span>
                                                    Tech Stack
                                                </h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack.map((tech, idx) => (
                                                        <Badge
                                                            key={idx}
                                                            variant="outline"
                                                            className="bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="space-y-3 p-6 bg-accent/30 rounded-xl">
                                        <h4 className="font-bold flex items-center gap-2">
                                            <Award className="h-5 w-5 text-primary" />
                                            Key Achievements
                                        </h4>
                                        <ul className="grid gap-3 pl-4">
                                            {experience.achievements.map((achievement, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-2 text-muted-foreground"
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2"></span>
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
} 