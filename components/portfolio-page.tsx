"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
  SiSanity,
  SiClerk,
  SiFirebase,
  SiAmazon,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiTerraform,
  SiGit,
  SiVisualstudiocode,
  SiFigma,
  SiPostman,
  SiJira,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { RiReactjsLine } from 'react-icons/ri'
import { HiMail } from 'react-icons/hi'
import { Github, ExternalLink, FileText, Sparkles, Code2, Rocket, Star, Mail, Linkedin, ChevronRight, Trophy, Briefcase, Award, ChevronUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
import { cn } from "@/lib/utils"

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
        { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
        { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" }
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
    cloud: {
      title: "Cloud & DevOps",
      description: "Building and deploying scalable cloud solutions",
      items: [
        { name: "AWS", icon: SiAmazon, color: "#FF9900" },
        { name: "Docker", icon: SiDocker, color: "#2496ED" },
        { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
        { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
        { name: "Terraform", icon: SiTerraform, color: "#7B42BC" }
      ]
    },
    tools: {
      title: "Development Tools",
      description: "Mastering modern development tools and practices",
      items: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "VS Code", icon: SiVisualstudiocode, color: "#007ACC" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Jira", icon: SiJira, color: "#0052CC" }
      ]
    }
  }
}

const skillChartData = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React/Next.js", value: 90, color: "#61DAFB" },
      { name: "TypeScript", value: 85, color: "#3178C6" },
      { name: "Vue.js", value: 82, color: "#4FC08D" },
      { name: "UI/UX Design", value: 85, color: "#FF4088" },
      { name: "Tailwind CSS", value: 88, color: "#06B6D4" }
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", value: 85, color: "#339933" },
      { name: "Spring Boot", value: 80, color: "#6DB33F" },
      { name: "Database Design", value: 88, color: "#336791" },
      { name: "System Design", value: 82, color: "#FF6B6B" },
      { name: "API Development", value: 88, color: "#38BDF8" }
    ]
  }
]

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

// 自定义 Tooltip 组件
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border p-3 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{payload[0].payload.name}</p>
        <p className="text-sm text-muted-foreground">
          Proficiency: {payload[0].value}%
        </p>
      </div>
    )
  }
  return null
}

// 添加新的动画组件
const Card3D = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300",
        "hover:shadow-primary/5 dark:hover:shadow-primary/10",
        "transform perspective-1000",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative z-10"
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}

// 添加滚动指示器组件
const ScrollIndicator = () => {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const calculateScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      setScroll((scrollPosition / totalHeight) * 100)
    }

    window.addEventListener('scroll', calculateScroll)
    return () => window.removeEventListener('scroll', calculateScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary"
        style={{ width: `${scroll}%` }}
      />
    </motion.div>
  )
}

// 添加交互式背景组件
const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
            hsl(var(--primary) / 0.1) 0%, 
            transparent 50%)`
        }}
        animate={{
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

// 修改 Featured Skills 部分的图表组件
const SkillChart = ({ skillSet }: { skillSet: typeof skillChartData[0] }) => {
  return (
    <Card3D>
      <div className="p-8">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
          {skillSet.category}
        </h3>
        <div className="space-y-6">
          {skillSet.skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.value}%</span>
              </div>
              <div className="h-2 bg-accent/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card3D>
  )
}

// 添加滚动到顶部按钮组件
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-300 backdrop-blur-sm z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// 添加页面加载动画组件
const PageLoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      onAnimationComplete={() => setIsLoading(false)}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <Code2 className="h-16 w-16 text-primary animate-pulse" />
      </motion.div>
    </motion.div>
  )
}

// 修改 Hero Section 组件，添加打字机效果和更多动画
const HeroSection = ({ typedName, fullName }: { typedName: string; fullName: string }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[80vh] flex items-center"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isImageLoaded ? 1 : 0,
              scale: isImageLoaded ? 1 : 0.5
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="relative"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden">
              <Image
                alt="Profile"
                className="object-cover"
                fill
                priority
                src="https://picsum.photos/400/400?random=1"
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            </div>
            <motion.div
              className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground p-3 rounded-xl shadow-lg"
              initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.4
              }}
            >
              <Code2 className="h-6 w-6" />
            </motion.div>
          </motion.div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {typedName}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block ml-1"
                >
                  |
                </motion.span>
              </motion.h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Full Stack Developer
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0"
            >
              专注于创建优雅的用户界面和高性能的应用程序。热衷于探索新技术，
              并将其应用于解决实际问题。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              {socialLinks.map((link, index) => (
                <Button
                  key={link.label}
                  variant="outline"
                  size="lg"
                  className="gap-2 relative overflow-hidden group"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <link.icon className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </Button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export function PortfolioPage({ recentProjects, currentExperience }: PortfolioPageProps) {
  const [typedName, setTypedName] = useState("")
  const fullName = "HHi, I'm Obiwan"

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
      <PageLoadingAnimation />
      <InteractiveBackground />
      <div className="min-h-screen">
        <ScrollIndicator />
        <ScrollToTopButton />

        <main className="relative z-10">
          <HeroSection typedName={typedName} fullName={fullName} />

          {/* Featured Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative py-24"
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center text-center mb-16">
                <div className="p-3 rounded-xl bg-primary/10 mb-4">
                  <Star className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Featured Skills</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Core competencies and expertise levels in various technologies and frameworks
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {skillChartData.map((skillSet) => (
                  <SkillChart key={skillSet.category} skillSet={skillSet} />
                ))}
              </div>
            </div>
          </motion.section>

          {/* Current Role Section */}
          {currentExperience && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative py-24"
            >
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">
                  <div className="p-3 rounded-xl bg-primary/10 mb-4">
                    <Briefcase className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4">Current Role</h2>
                  <p className="text-muted-foreground max-w-2xl">
                    My current position and responsibilities in software development and engineering
                  </p>
                </div>

                <Card3D>
                  <div className="p-8 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">
                          {currentExperience.position}
                        </h3>
                        <p className="text-xl text-muted-foreground">
                          {currentExperience.company}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {new Date(currentExperience.startDate).toLocaleDateString()} - Present
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentExperience.skills?.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1 bg-primary/10 hover:bg-primary/20 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {currentExperience.description}
                      </p>
                    </div>

                    {currentExperience.achievements && (
                      <div className="space-y-4 bg-accent/50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          Key Achievements
                        </h4>
                        <ul className="grid gap-3 pl-4">
                          {currentExperience.achievements.map((achievement, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <span className="h-2 w-2 rounded-full bg-primary/60 mt-2"></span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-end pt-4">
                      <Button asChild>
                        <Link href="/experience" className="flex items-center gap-2">
                          View Full Experience
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card3D>
              </div>
            </motion.section>
          )}

          {/* Recent Projects Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative py-24 bg-accent/20"
          >
            {/* 背景装饰 */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center text-center mb-16">
                <div className="p-3 rounded-xl bg-primary/10 mb-4">
                  <Rocket className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Recent Projects</h2>
                <p className="text-muted-foreground max-w-2xl">
                  A showcase of my latest work, featuring web applications, design projects, and experiments with cutting-edge technologies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentProjects.map((project, index) => (
                  <Card3D key={project._id}>
                    <div className="group relative aspect-video overflow-hidden rounded-t-xl">
                      <Image
                        src={project.coverImage?.asset?.url || `https://picsum.photos/seed/${project._id}/800/450`}
                        alt={project.coverImage?.alt || project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                        <p className="text-gray-200 line-clamp-3">{project.description}</p>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-primary/10 hover:bg-primary/20 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2 group hover:border-primary/50"
                            asChild
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                              <span>Source Code</span>
                            </a>
                          </Button>
                        )}
                        {project.projectUrl && (
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1 gap-2 group"
                            asChild
                          >
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              <span>Live Demo</span>
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card3D>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <Button asChild variant="outline" size="lg" className="group">
                  <Link href="/projects" className="flex items-center gap-2">
                    View All Projects
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.section>

          {/* Technical Arsenal Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative py-24"
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center text-center mb-16">
                <div className="p-3 rounded-xl bg-primary/10 mb-4">
                  <Code2 className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Technical Arsenal</h2>
                <p className="text-muted-foreground max-w-2xl">
                  A comprehensive overview of the technologies, tools, and frameworks I specialize in.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skills.sections).map(([key, section]) => (
                  <Card3D key={key}>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-12 w-1.5 rounded-full bg-gradient-to-b from-primary to-primary/20" />
                        <div>
                          <h3 className="text-xl font-bold">{section.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {section.items.map((skill) => (
                          <motion.div
                            key={skill.name}
                            whileHover={{ scale: 1.05 }}
                            className="group flex items-center gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-300"
                          >
                            <div
                              className="p-2 rounded-md transition-colors duration-300"
                              style={{
                                backgroundColor: `${skill.color}15`,
                                boxShadow: `0 0 0 0 ${skill.color}30`,
                              }}
                            >
                              <skill.icon
                                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                                style={{ color: skill.color }}
                              />
                            </div>
                            <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
                              {skill.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Footer Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <motion.div
              className="flex items-center justify-center gap-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <p className="text-lg font-medium gradient-text">
                Building the future, one line at a time
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  )
}