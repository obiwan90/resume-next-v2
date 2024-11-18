"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"

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

    useEffect(() => {
        if (expandedId) {
            const expandedExperience = experiences.find(exp => exp._id === expandedId)
            console.log('Expanded experience projects:', expandedExperience?.projects)
        }
    }, [expandedId, experiences])

    return (
        <div className="space-y-8">
            {experiences.map((experience) => (
                <motion.div
                    key={experience._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-6">
                        <div
                            className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                            onClick={() => setExpandedId(expandedId === experience._id ? null : experience._id)}
                        >
                            <div>
                                <h3 className="text-xl font-semibold">{experience.position}</h3>
                                <p className="text-muted-foreground">{experience.company}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    {new Date(experience.startDate).toLocaleDateString()} - {
                                        experience.isCurrentRole
                                            ? 'Present'
                                            : experience.endDate && new Date(experience.endDate).toLocaleDateString()
                                    }
                                </span>
                                <motion.div
                                    animate={{ rotate: expandedId === experience._id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="h-5 w-5" />
                                </motion.div>
                            </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{experience.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {experience.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
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
                                        <div key={index} className="bg-muted/50 rounded-lg p-6 space-y-4">
                                            <h4 className="text-lg font-semibold">{project.name}</h4>
                                            <p className="text-muted-foreground">{project.description}</p>
                                            <div className="space-y-2 bg-background/50 p-4 rounded-md">
                                                <h5 className="font-semibold">Project Background</h5>
                                                <div className="space-y-2 text-sm">
                                                    <p><span className="font-medium">Problem:</span> {project.background.problem}</p>
                                                    <p><span className="font-medium">Solution:</span> {project.background.solution}</p>
                                                    <p><span className="font-medium">Impact:</span> {project.background.impact}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h5 className="font-semibold">Key Responsibilities</h5>
                                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                    {project.responsibilities.map((resp, idx) => (
                                                        <li key={idx}>{resp}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="space-y-2">
                                                <h5 className="font-semibold">Tech Stack</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack.map((tech, idx) => (
                                                        <Badge key={idx} variant="outline">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="space-y-2">
                                        <h4 className="font-semibold">Key Achievements</h4>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            {experience.achievements.map((achievement, index) => (
                                                <li key={index}>{achievement}</li>
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