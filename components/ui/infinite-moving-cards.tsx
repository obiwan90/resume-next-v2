"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: any[]
    direction?: "left" | "right"
    speed?: "fast" | "normal" | "slow"
    pauseOnHover?: boolean
    className?: string
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollerRef = useRef<HTMLDivElement>(null)
    const [start, setStart] = useState(false)

    useEffect(() => {
        addAnimation()
    }, [])

    const speeds = {
        fast: 30,
        normal: 50,
        slow: 70,
    }

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children)
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true)
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem)
                }
            })

            setStart(true)
        }
    }

    const getDirection = (direction: string) => {
        if (direction === "left") {
            return "animate-scroll-left"
        } else {
            return "animate-scroll-right"
        }
    }

    const getSpeed = (speed: string) => {
        if (speed === "fast") {
            return "duration-[30s]"
        } else if (speed === "normal") {
            return "duration-[50s]"
        } else {
            return "duration-[70s]"
        }
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <div
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full gap-4 py-4",
                    start && "animate-scroll",
                    start && getDirection(direction),
                    start && getSpeed(speed),
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <div
                        className="flex-shrink-0 w-[350px]"
                        key={item.id ?? idx}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
} 