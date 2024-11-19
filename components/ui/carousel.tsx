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

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const contentWidth = container.firstElementChild?.firstElementChild?.clientWidth || 0;

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

        const timeoutId = setTimeout(() => {
            if (!isPaused) {
                animate();
            }
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            controls.stop();
        };
    }, [direction, speed, controls, isPaused, items]);

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
                "relative overflow-hidden",
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
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {items}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
} 