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

const projects = [
  {
    title: "AI-Powered Task Manager",
    description: "A smart task management app that uses AI to prioritize and categorize tasks",
    image: "https://picsum.photos/seed/ai-task/800/400",
    tags: ["React", "Node.js", "OpenAI API", "MongoDB"]
  },
  {
    title: "Blockchain Voting System",
    description: "A secure and transparent voting system built on blockchain technology",
    image: "https://picsum.photos/seed/blockchain/800/400",
    tags: ["Solidity", "Ethereum", "Web3.js", "Next.js"]
  },
  {
    title: "AR Shopping Experience",
    description: "An augmented reality app for trying on clothes virtually",
    image: "https://picsum.photos/seed/ar-shop/800/400",
    tags: ["React Native", "ARKit", "ARCore", "Node.js"]
  }
]

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

export function PortfolioPage() {
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
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            className="mb-6 text-2xl font-bold"
            variants={fadeInUp}
          >
            Recent Projects
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={cardHover.hover}
              >
                <Card className="overflow-hidden">
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
                          className="font-medium text-white text-lg mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p
                          className="text-sm text-gray-300 mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                        >
                          {project.description}
                        </motion.p>
                        <motion.div
                          className="flex flex-wrap gap-2"
                          variants={staggerContainer}
                        >
                          {project.tags.map((tag, tagIndex) => (
                            <motion.div
                              key={tagIndex}
                              variants={{
                                initial: { opacity: 0, scale: 0.8 },
                                animate: { opacity: 1, scale: 1 }
                              }}
                            >
                              <Badge variant="secondary" className="text-xs">
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
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button className="mt-6" variant="outline">
              See more projects
            </Button>
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}