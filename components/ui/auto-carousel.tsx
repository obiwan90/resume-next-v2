"use client"

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface AutoCarouselProps {
    items: React.ReactNode[]
    direction?: 'left' | 'right'
    speed?: 'slow' | 'normal' | 'fast'
    className?: string
}

export function AutoCarousel({
    items,
    direction = 'left',
    speed = 'normal',
    className
}: AutoCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative overflow-hidden",
                "before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[100px] before:bg-gradient-to-r before:from-background before:to-transparent",
                "after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[100px] after:bg-gradient-to-l after:from-background after:to-transparent",
                className
            )}
        >
            <div
                className={cn(
                    "flex gap-4",
                    direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right',
                    `duration-carousel-${speed}`
                )}
                style={{
                    width: 'fit-content',
                    willChange: 'transform',
                    '--duration': speed === 'slow' ? '70s' : speed === 'fast' ? '30s' : '50s'
                } as React.CSSProperties}
            >
                {/* 第一组内容 */}
                {items.map((item, idx) => (
                    <motion.div
                        key={`first-${idx}`}
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {item}
                    </motion.div>
                ))}
                {/* 第二组内容（用于无缝滚动） */}
                {items.map((item, idx) => (
                    <motion.div
                        key={`second-${idx}`}
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {item}
                    </motion.div>
                ))}
            </div>
        </div>
    )
} 