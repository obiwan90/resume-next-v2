"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
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

interface PortfolioPageProps {
  recentProjects: Project[]
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

export function PortfolioPage({ recentProjects }: PortfolioPageProps) {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.section
          className="mb-12 flex items-start gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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

        <motion.section
          className="mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            className="mb-6 text-2xl font-bold"
            variants={fadeInUp}
          >
            {skills.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills.sections).map(([key, section], index) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                whileHover={cardHover.hover}
                className="group"
              >
                <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                  <div className="p-6">
                    <motion.h3
                      className="text-lg font-semibold mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 * index }}
                    >
                      {section.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-muted-foreground mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 * index }}
                    >
                      {section.description}
                    </motion.p>
                    <motion.div
                      className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                      variants={staggerContainer}
                    >
                      {section.items.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          className="flex items-center gap-3"
                          variants={{
                            initial: { opacity: 0, x: -10 },
                            animate: { opacity: 1, x: 0 }
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <skill.icon className="h-5 w-5" style={{ color: skill.color }} />
                          <span className="text-sm">{skill.name}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="h-1.5 w-4 bg-primary rounded-full"></span>
            Recent Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative aspect-video">
                    <Image
                      src={project.coverImage?.asset?.url || `https://picsum.photos/seed/${project._id}/800/600`}
                      alt={project.coverImage?.alt || project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <div className="space-y-4">
                          <p className="text-gray-200 text-sm">{project.description}</p>
                          <div className="flex gap-2">
                            {project.githubUrl && (
                              <Button size="sm" variant="secondary" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4 mr-2" />
                                  Code
                                </a>
                              </Button>
                            )}
                            {project.projectUrl && (
                              <Button size="sm" variant="secondary" asChild>
                                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Doc
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/projects">
                View All Projects
              </Link>
            </Button>
          </div>
        </motion.section>
      </main>
    </div>
  )
}