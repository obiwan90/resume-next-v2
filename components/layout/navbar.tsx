"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Speaking", href: "/speaking" },
    { name: "Hobbies", href: "/hobbies" },
]

export function Navbar() {
    const pathname = usePathname()

    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex-1">
                    <span className="text-xl font-semibold">Coder's Portfolio</span>
                </div>
                <nav className="flex-1 flex justify-center space-x-4">
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
                <div className="flex-1 flex justify-end items-center space-x-2">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
} 