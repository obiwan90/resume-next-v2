"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
// import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { Code2, Home, Briefcase, FolderGit2, MessageSquare, Palette } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/components/ui/avatar"

const navItems = [
    {
        name: "Home",
        href: "/",
        icon: <Home className="h-4 w-4" />
    },
    {
        name: "Experience",
        href: "/experience",
        icon: <Briefcase className="h-4 w-4" />
    },
    {
        name: "Projects",
        href: "/projects",
        icon: <FolderGit2 className="h-4 w-4" />
    },
    {
        name: "Speaking",
        href: "/speaking",
        icon: <MessageSquare className="h-4 w-4" />
    },
    {
        name: "Hobbies",
        href: "/hobbies",
        icon: <Palette className="h-4 w-4" />
    },
]

export function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // 预加载路由
    const prefetchRoute = (href: string) => {
        router.prefetch(href)
    }

    return (
        <header className={cn(
            "navbar-float z-50",
            isScrolled && "scrolled"
        )}>
            <div className="container flex h-14 items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-2"
                >
                    <motion.div
                        initial={{ scale: 0.8, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <Code2 className="h-5 w-5 text-primary" />
                    </motion.div>
                    <span className="hidden md:inline-block font-bold gradient-text text-sm">
                        Portfolio
                    </span>
                </Link>

                {/* 导航链接 - 桌面端显示完整导航，移动端只显示图标 */}
                <nav className="flex items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-300",
                                "hover:bg-accent hover:text-accent-foreground",
                                pathname === item.href
                                    ? "bg-accent text-accent-foreground shadow-sm"
                                    : "text-muted-foreground hover:translate-y-[-1px]",
                                "md:px-3 md:py-1.5",
                                "px-2 py-2"
                            )}
                            onMouseEnter={() => prefetchRoute(item.href)}
                        >
                            {item.icon}
                            <span className="hidden md:inline">{item.name}</span>
                        </Link>
                    ))}
                    <div className="ml-2 flex items-center gap-2">
                        <ThemeToggle />
                        {user && (
                            <div className="ml-2">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-8 h-8"
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
} 