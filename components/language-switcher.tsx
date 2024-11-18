"use client"

import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Globe } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from 'next-intl'
import { useState } from 'react'

const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' }
]

export function LanguageSwitcher() {
    const router = useRouter()
    const pathname = usePathname()
    const currentLocale = useLocale()
    const [isLoading, setIsLoading] = useState(false)

    const switchLanguage = async (locale: string) => {
        if (locale === currentLocale) return;

        setIsLoading(true)
        try {
            const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);
            router.push(newPathname);
        } catch (error) {
            console.error('Language switch failed:', error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isLoading}>
                    <Globe className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                    >
                        {lang.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 