"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { UserButton, SignedIn } from "@clerk/nextjs";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Speaking", href: "/speaking" },
    { name: "Hobbies", href: "/hobbies" },
]

export function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    // 监听滚动事件
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            isScrolled && "shadow-sm"
        )}>
            <div className="container flex h-16 items-center justify-between px-4">
                {/* 左侧：移动端菜单按钮和桌面端 Logo */}
                <div className="flex items-center">
                    {/* 移动端菜单按钮 */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                                <SheetHeader>
                                    <SheetTitle className="text-left">Navigation</SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-4 mt-6">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                                pathname === item.href
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-muted hover:text-primary hover:translate-x-1"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* 桌面端 Logo */}
                    <div className="hidden md:block">
                        <Link
                            href="/"
                            className="text-xl font-semibold hover:text-primary transition-all duration-300"
                        >
                            Coder's Portfolio
                        </Link>
                    </div>
                </div>

                {/* 中间：桌面端导航 */}
                <nav className="hidden md:flex flex-1 justify-center space-x-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                pathname === item.href
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* 右侧：主题切换按钮和用户按钮 */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/speaking"
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8",
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
} 