"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemesProviderProps } from "next-themes"

interface ThemeProviderProps extends Omit<NextThemesProviderProps, 'attribute'> {
    children: React.ReactNode
    attribute?: 'class' | 'data-theme' | 'data-mode'
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 