"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from "@/lib/utils";

interface CarouselProps {
    items: React.ReactNode[];
    direction?: 'ltr' | 'rtl';
    speed?: number;
    gap?: number;
    pauseOnHover?: boolean;
    className?: string;
}

export function Carousel({
    items,
    direction = 'ltr',
    speed = 30,
    gap = 20,
    pauseOnHover = true,
    className
}: CarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimationControls();
    const [isPaused, setIsPaused] = useState(false);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const firstChild = container.firstElementChild?.firstElementChild;

        if (firstChild) {
            const observer = new ResizeObserver(() => {
                setContentWidth(firstChild.clientWidth || 0);
            });

            observer.observe(firstChild);
            return () => observer.disconnect();
        }
    }, []);

    useEffect(() => {
        if (!contentWidth) return;

        const animate = async () => {
            const initialX = direction === 'ltr' ? 0 : -contentWidth;
            const targetX = direction === 'ltr' ? -contentWidth : 0;

            await controls.set({ x: initialX });
            await controls.start({
                x: targetX,
                transition: {
                    duration: contentWidth / speed,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 0,
                },
            });
        };

        if (!isPaused) {
            animate();
        }

        return () => {
            controls.stop();
        };
    }, [direction, speed, controls, isPaused, contentWidth]);

    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsPaused(true);
        }
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) {
            setIsPaused(false);
        }
    };

    const contentStyle = {
        display: 'flex',
        gap: `${gap}px`,
        ...(direction === 'rtl' && { flexDirection: 'row-reverse' as const })
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden will-change-transform",
                className
            )}
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                animate={controls}
                className="flex"
                style={contentStyle}
            >
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="flex"
                        style={contentStyle}
                    >
                        {items}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
} 