"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiFlutter,
  SiNuxtdotjs,
  SiVercel,
  SiPrisma,
  SiSupabase,
  SiGithub,
  SiLinkedin,
  SiSpring,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiVuedotjs,
  SiMysql,
  SiRedis,
  SiElasticsearch,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { RiReactjsLine } from 'react-icons/ri'
import { HiMail } from 'react-icons/hi'
import { Github, ExternalLink, FileText } from "lucide-react"
import { ChevronRight } from "lucide-react"

const socialLinks = [
  { icon: HiMail, href: "mailto:your.email@example.com", label: "Email" },
  { icon: SiLinkedin, href: "https://www.linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: SiGithub, href: "https://github.com/yourusername", label: "GitHub" },
]

const skills = {
  title: "Technical Arsenal",
  sections: {
    frontend: {
      title: "Frontend Essentials",
      description: "Mastering core web technologies and modern frameworks",
      items: [
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: SiCss3, color: "#1572B6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" }
      ]
    },
    backend: {
      title: "Backend Engineering",
      description: "Architecting robust and scalable server solutions",
      items: [
        { name: "Java", icon: FaJava, color: "#007396" },
        { name: "Spring", icon: SiSpring, color: "#6DB33F" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "Redis", icon: SiRedis, color: "#DC382D" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Elasticsearch", icon: SiElasticsearch, color: "#005571" }
      ]
    },
    mobile: {
      title: "Cross-Platform Mobile",
      description: "Delivering seamless mobile experiences across platforms",
      items: [
        { name: "UniApp", icon: RiReactjsLine, color: "#2B9939" },
        { name: "Flutter", icon: SiFlutter, color: "#02569B" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
        { name: "Prisma", icon: SiPrisma, color: "#2D3748" }
      ]
    },
    fullstack: {
      title: "Full Stack Solutions",
      description: "Creating end-to-end applications with modern frameworks",
      items: [
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { name: "Nuxt.js", icon: SiNuxtdotjs, color: "#00DC82" },
        { name: "Vercel", icon: SiVercel, color: "#000000" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" }
      ]
    }
  }
}

interface Project {
  _id: string
  title: string
  description: string
  coverImage: {
    asset: {
      url: string
    }
    alt: string
  }
  projectUrl?: string
  githubUrl?: string
  tags: string[]
  isRecentUpdate: boolean
}

interface Experience {
  _id: string
  company: string
  position: string
  startDate: string
  endDate: string
  isCurrentRole: boolean
  description: string
  projects: {
    name: string
    description: string
    background: {
      problem: string
      solution: string
      impact: string
    }
    responsibilities: string[]
    techStack: string[]
  }[]
  skills: string[]
  achievements: string[]
}

interface PortfolioPageProps {
  recentProjects: Project[]
  currentExperience: Experience
}

// 定义一些通用的动画变体
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
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

export function PortfolioPage({ recentProjects, currentExperience }: PortfolioPageProps) {
  const [typedName, setTypedName] = useState("")
  const fullName = "Developer Name"

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typedName.length < fullName.length) {
        setTypedName(fullName.slice(0, typedName.length + 1))
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [typedName])

  return (
    <>
      <motion.section
        className="mb-12 flex items-start gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            alt="Profile"
            className="rounded-full object-cover"
            height={160}
            width={160}
            src="https://avatars.githubusercontent.com/u/583231?v=4"
            priority
          />
        </motion.div>
        <div className="flex-1">
          <motion.h1
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {typedName}
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Full Stack Developer | AI Enthusiast | Blockchain Explorer
          </motion.p>
          <motion.p
            className="text-muted-foreground mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            With over 5 years of experience in full-stack development, I specialize in creating innovative solutions that leverage cutting-edge technologies.
          </motion.p>
          <motion.div
            className="flex space-x-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.label}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={link.href}>
                  <Button variant="outline" size="icon">
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.label}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {currentExperience && (
        <motion.section
          className="mb-16 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="h-1.5 w-4 bg-primary rounded-full"></span>
            Current Role
          </h2>
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{currentExperience.position}</h3>
                  <p className="text-lg text-muted-foreground">{currentExperience.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(currentExperience.startDate).toLocaleDateString()} - Present
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentExperience.skills?.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 hover:bg-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">{currentExperience.description}</p>
              {currentExperience.achievements && currentExperience.achievements.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Key Achievements</h4>
                  <ul className="grid gap-2">
                    {currentExperience.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-2"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href="/experience" className="flex items-center gap-2">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 pt-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="h-1.5 w-4 bg-primary rounded-full"></span>
              Recent Projects
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/projects" className="flex items-center gap-2">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={project.coverImage?.asset?.url || `https://picsum.photos/seed/${project._id}/800/600`}
                      alt={project.coverImage?.alt || project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 p-4">
                        <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-200 line-clamp-3">{project.description}</p>
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {project.githubUrl && (
                            <Button size="sm" variant="secondary" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-1" />
                                Code
                              </a>
                            </Button>
                          )}
                          {project.projectUrl && (
                            <Button size="sm" variant="secondary" asChild>
                              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4 mr-1" />
                                Doc
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs px-2 py-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="h-1.5 w-4 bg-primary rounded-full"></span>
            Technical Arsenal
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(skills.sections).map(([key, section]) => (
              <motion.div
                key={key}
                className="group"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:shadow-md transition-all duration-300">
                  <div className="p-3">
                    <h3 className="text-base font-semibold mb-1.5 flex items-center gap-2">
                      <span className="h-1 w-3 bg-primary/60 rounded-full"></span>
                      {section.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {section.description}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {section.items.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-1.5 p-1 rounded-md hover:bg-accent/50 transition-colors duration-300"
                        >
                          <div
                            className="p-1 rounded-md"
                            style={{ backgroundColor: `${skill.color}15` }}
                          >
                            <skill.icon
                              className="h-3.5 w-3.5"
                              style={{ color: skill.color }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </>
  )
}