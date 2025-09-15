'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  floatRange: number
  blur: number
}

// Optimized bubble data - fewer bubbles but still beautiful
const BUBBLE_DATA: Bubble[] = [
  { id: 0, x: 10, y: 15, size: 180, duration: 35, delay: 0, floatRange: 25, blur: 3 },
  { id: 1, x: 40, y: 60, size: 150, duration: 40, delay: 2, floatRange: 30, blur: 2 },
  { id: 2, x: 70, y: 25, size: 200, duration: 45, delay: 4, floatRange: 20, blur: 4 },
  { id: 3, x: 30, y: 80, size: 160, duration: 38, delay: 1, floatRange: 28, blur: 2.5 },
  { id: 4, x: 85, y: 50, size: 140, duration: 42, delay: 3, floatRange: 22, blur: 3 },
  { id: 5, x: 55, y: 10, size: 170, duration: 36, delay: 5, floatRange: 26, blur: 3.5 },
  { id: 6, x: 20, y: 45, size: 190, duration: 41, delay: 2.5, floatRange: 24, blur: 4 },
  { id: 7, x: 60, y: 70, size: 130, duration: 39, delay: 3.5, floatRange: 27, blur: 2 },
]

export function BubbleBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Pause animations when page is not visible
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Don't render bubbles if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" />
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-white/50 via-transparent to-transparent z-10" />
      
      {/* Beautiful floating bubbles with visible animation */}
      {BUBBLE_DATA.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            background: `
              radial-gradient(circle at 30% 30%, 
                rgba(10, 186, 181, 0.25) 0%,
                rgba(10, 186, 181, 0.15) 30%, 
                rgba(10, 186, 181, 0.08) 60%, 
                transparent 80%
              )
            `,
            boxShadow: `
              inset 0 0 30px rgba(10, 186, 181, 0.15),
              0 0 60px rgba(10, 186, 181, 0.1)
            `,
            filter: `blur(${bubble.blur}px)`,
          }}
          animate={isVisible ? {
            y: [0, -bubble.floatRange, 0, bubble.floatRange * 0.7, 0],
            x: [0, bubble.floatRange * 0.3, -bubble.floatRange * 0.3, 0],
            scale: [1, 1.05, 0.95, 1],
          } : {}}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: bubble.delay,
          }}
        />
      ))}
      
      {/* Extra large visible background bubbles */}
      <motion.div 
        className="absolute rounded-full"
        style={{
          left: '25%',
          top: '35%',
          width: 350,
          height: 350,
          background: 'radial-gradient(circle, rgba(10, 186, 181, 0.12) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={isVisible ? {
          y: [0, -40, 0],
          x: [0, 20, 0],
        } : {}}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div 
        className="absolute rounded-full"
        style={{
          left: '65%',
          top: '55%',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(10, 186, 181, 0.12) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={isVisible ? {
          y: [0, 30, 0],
          x: [0, -25, 0],
        } : {}}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />
    </div>
  )
}