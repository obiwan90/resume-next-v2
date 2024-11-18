import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ExternalLink, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"

const experiences = [
    {
        period: "2021 - Present",
        role: "Senior Full Stack Developer",
        company: "Tech Solutions Inc.",
        description: "Leading development of enterprise applications",
        skills: ["React", "Node.js", "AWS", "TypeScript"],
        projects: [
            {
                name: "AI-Powered Analytics Dashboard",
                description: "Led a team of 5 developers to build a real-time analytics platform with AI-driven insights",
                background: {
                    problem: "Clients struggled to make sense of large volumes of data in real-time",
                    solution: "Developed an AI-powered analytics platform that processes and visualizes data in real-time",
                    impact: "Reduced decision-making time by 60% and improved data accuracy by 40%"
                },
                architecture: {
                    frontend: "React with TypeScript, Redux for state management",
                    backend: "Node.js microservices with Express",
                    database: "MongoDB for raw data, Redis for caching",
                    ai: "TensorFlow for predictive analytics",
                    infrastructure: "AWS (ECS, Lambda, S3)"
                },
                responsibilities: [
                    "Led architecture design and technical decisions",
                    "Managed team of 5 developers and coordinated with stakeholders",
                    "Implemented core AI algorithms for data analysis",
                    "Set up CI/CD pipeline and monitoring systems",
                    "Conducted code reviews and mentored junior developers"
                ],
                techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Redis", "TensorFlow", "AWS"],
                highlights: [
                    "Increased user engagement by 45%",
                    "Reduced data processing time by 60%",
                    "Implemented machine learning models for predictive analytics"
                ],
                demoUrl: "https://demo.example.com",
                githubUrl: "https://github.com/example"
            },
            {
                name: "Enterprise Resource Planning System",
                description: "Developed a comprehensive ERP system for manufacturing clients",
                techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
                highlights: [
                    "Streamlined inventory management process",
                    "Integrated with IoT devices for real-time monitoring",
                    "Implemented real-time reporting system"
                ],
                demoUrl: "https://erp.example.com"
            }
        ]
    },
    {
        period: "2019 - 2021",
        role: "Full Stack Developer",
        company: "Digital Innovations",
        description: "Developed and maintained web applications",
        skills: ["React", "Next.js", "Node.js", "PostgreSQL"],
        projects: [
            {
                name: "Customer Relationship Management System",
                description: "Developed a CRM system for managing customer interactions",
                techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
                highlights: [
                    "Increased customer satisfaction by 30%",
                    "Implemented lead scoring system",
                    "Integrated with email marketing platform"
                ],
                demoUrl: "https://crm.example.com",
                githubUrl: "https://github.com/example"
            },
            {
                name: "E-commerce Platform",
                description: "Developed a full-stack e-commerce platform for online shopping",
                techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
                highlights: [
                    "Increased sales by 20%",
                    "Implemented payment gateway integration",
                    "Implemented real-time inventory management"
                ],
                demoUrl: "https://ecommerce.example.com"
            }
        ]
    },
    {
        period: "2017 - 2019",
        role: "Frontend Developer",
        company: "Web Creators",
        description: "Built responsive user interfaces",
        skills: ["React", "JavaScript", "HTML/CSS"],
        projects: [
            {
                name: "Portfolio Website",
                description: "Developed a personal portfolio website to showcase skills and projects",
                techStack: ["React", "JavaScript", "HTML/CSS"],
                highlights: [
                    "Designed and implemented responsive design",
                    "Implemented animations using CSS",
                    "Integrated with content management system"
                ],
                demoUrl: "https://portfolio.example.com"
            },
            {
                name: "Blog Platform",
                description: "Developed a full-stack blog platform for publishing and managing blog posts",
                techStack: ["JavaScript", "HTML/CSS", "Node.js"],
                highlights: [
                    "Implemented user authentication system",
                    "Implemented comment system",
                    "Integrated with content management system"
                ],
                demoUrl: "https://blog.example.com",
                githubUrl: "https://github.com/example"
            }
        ]
    }
]

export function ExperienceTimeline() {
    const [expandedId, setExpandedId] = useState<number | null>(null)

    return (
        <div className="space-y-8">
            {experiences.map((experience, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Card
                        className={`p-6 transition-all duration-300 ${expandedId === index ? 'ring-2 ring-primary' : ''
                            }`}
                    >
                        <div
                            className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 cursor-pointer"
                            onClick={() => setExpandedId(expandedId === index ? null : index)}
                        >
                            <div>
                                <h3 className="text-xl font-semibold">{experience.role}</h3>
                                <p className="text-muted-foreground">{experience.company}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground mt-2 md:mt-0">
                                    {experience.period}
                                </span>
                                <motion.div
                                    animate={{ rotate: expandedId === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="h-5 w-5" />
                                </motion.div>
                            </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{experience.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </div>

                        <AnimatePresence>
                            {expandedId === index && experience.projects && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-6 pt-6 border-t space-y-6">
                                        {experience.projects.map((project, projectIndex) => (
                                            <motion.div
                                                key={projectIndex}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: projectIndex * 0.1 }}
                                                className="bg-muted/50 rounded-lg p-6 hover:bg-muted/80 transition-colors"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className="text-lg font-semibold text-primary">
                                                        {project.name}
                                                    </h4>
                                                    <div className="flex gap-2">
                                                        {project.demoUrl && (
                                                            <Button variant="ghost" size="icon" asChild>
                                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                                                    <ExternalLink className="h-4 w-4" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                        {project.githubUrl && (
                                                            <Button variant="ghost" size="icon" asChild>
                                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                                    <Github className="h-4 w-4" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-6">
                                                    {project.description}
                                                </p>

                                                {project.background && (
                                                    <div className="mb-6">
                                                        <h5 className="text-sm font-semibold mb-2">Project Background</h5>
                                                        <div className="space-y-2 text-sm text-muted-foreground">
                                                            <p><span className="font-medium">Problem:</span> {project.background.problem}</p>
                                                            <p><span className="font-medium">Solution:</span> {project.background.solution}</p>
                                                            <p><span className="font-medium">Impact:</span> {project.background.impact}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {project.architecture && (
                                                    <div className="mb-6">
                                                        <h5 className="text-sm font-semibold mb-2">Technical Architecture</h5>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                                            <div><span className="font-medium">Frontend:</span> {project.architecture.frontend}</div>
                                                            <div><span className="font-medium">Backend:</span> {project.architecture.backend}</div>
                                                            <div><span className="font-medium">Database:</span> {project.architecture.database}</div>
                                                            <div><span className="font-medium">AI/ML:</span> {project.architecture.ai}</div>
                                                            <div><span className="font-medium">Infrastructure:</span> {project.architecture.infrastructure}</div>
                                                        </div>
                                                    </div>
                                                )}

                                                {project.responsibilities && (
                                                    <div className="mb-6">
                                                        <h5 className="text-sm font-semibold mb-2">Key Responsibilities</h5>
                                                        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                                            {project.responsibilities.map((responsibility, index) => (
                                                                <motion.li
                                                                    key={index}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.2 + index * 0.1 }}
                                                                >
                                                                    {responsibility}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack.map((tech, techIndex) => (
                                                        <Badge
                                                            key={techIndex}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="mt-4 pt-4 border-t">
                                                    <h5 className="text-sm font-semibold mb-2">Key Achievements</h5>
                                                    <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                                        {project.highlights.map((highlight, highlightIndex) => (
                                                            <motion.li
                                                                key={highlightIndex}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.2 + highlightIndex * 0.1 }}
                                                            >
                                                                {highlight}
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        ))}
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