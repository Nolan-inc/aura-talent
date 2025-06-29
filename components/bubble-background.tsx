'use client'

import { motion } from 'framer-motion'

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

// Pre-calculated bubble positions for consistent rendering
const BUBBLE_DATA: Bubble[] = [
  { id: 0, x: 10, y: 15, size: 120, duration: 25, delay: 0, floatRange: 30, blur: 3 },
  { id: 1, x: 25, y: 35, size: 150, duration: 28, delay: 2, floatRange: 25, blur: 4 },
  { id: 2, x: 40, y: 60, size: 100, duration: 22, delay: 1, floatRange: 35, blur: 2.5 },
  { id: 3, x: 55, y: 20, size: 180, duration: 30, delay: 3, floatRange: 20, blur: 5 },
  { id: 4, x: 70, y: 45, size: 110, duration: 26, delay: 1.5, floatRange: 28, blur: 3.5 },
  { id: 5, x: 15, y: 70, size: 140, duration: 24, delay: 2.5, floatRange: 32, blur: 4.2 },
  { id: 6, x: 85, y: 25, size: 130, duration: 27, delay: 0.5, floatRange: 22, blur: 3.8 },
  { id: 7, x: 30, y: 85, size: 160, duration: 29, delay: 3.5, floatRange: 26, blur: 4.5 },
  { id: 8, x: 60, y: 50, size: 90, duration: 21, delay: 1.2, floatRange: 30, blur: 2.8 },
  { id: 9, x: 45, y: 10, size: 170, duration: 31, delay: 2.8, floatRange: 24, blur: 4.8 },
  { id: 10, x: 20, y: 55, size: 125, duration: 23, delay: 0.8, floatRange: 33, blur: 3.2 },
  { id: 11, x: 75, y: 65, size: 145, duration: 28.5, delay: 3.2, floatRange: 21, blur: 4.1 },
  { id: 12, x: 35, y: 30, size: 115, duration: 25.5, delay: 1.8, floatRange: 29, blur: 3.6 },
  { id: 13, x: 90, y: 40, size: 135, duration: 26.5, delay: 2.2, floatRange: 27, blur: 3.9 },
  { id: 14, x: 50, y: 75, size: 105, duration: 22.5, delay: 0.3, floatRange: 31, blur: 3.1 },
  { id: 15, x: 65, y: 15, size: 155, duration: 29.5, delay: 2.7, floatRange: 23, blur: 4.4 },
  { id: 16, x: 80, y: 80, size: 95, duration: 20.5, delay: 1.5, floatRange: 34, blur: 2.7 },
  { id: 17, x: 12, y: 42, size: 165, duration: 30.5, delay: 3.8, floatRange: 25.5, blur: 4.6 },
  { id: 18, x: 42, y: 88, size: 122, duration: 24.5, delay: 0.7, floatRange: 28.5, blur: 3.4 },
  { id: 19, x: 58, y: 5, size: 188, duration: 32, delay: 2.3, floatRange: 22.5, blur: 5.2 },
]

export function BubbleBackground() {
  const bubbles = BUBBLE_DATA

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Hide bubbles in hero section */}
      <div className="absolute inset-x-0 top-0 h-screen bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
      
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            background: `
              radial-gradient(circle at 35% 35%, 
                rgba(173, 216, 230, 0.4) 0%, 
                rgba(135, 206, 235, 0.25) 25%, 
                rgba(135, 206, 250, 0.15) 50%, 
                rgba(176, 224, 230, 0.1) 75%, 
                rgba(224, 255, 255, 0.05) 100%
              )
            `,
            border: '1px solid rgba(176, 224, 230, 0.15)',
            boxShadow: `
              inset -5px -5px 15px rgba(135, 206, 235, 0.15),
              inset 5px 5px 15px rgba(255, 255, 255, 0.3),
              0 8px 25px rgba(135, 206, 235, 0.1),
              0 0 40px rgba(176, 224, 230, 0.05)
            `,
            filter: `blur(${bubble.blur}px)`,
            backdropFilter: 'blur(2px)',
          }}
          animate={{
            y: [
              `${bubble.y}%`,
              `${bubble.y - bubble.floatRange}%`,
              `${bubble.y}%`,
              `${bubble.y + bubble.floatRange * 0.7}%`,
              `${bubble.y}%`,
            ],
            x: [
              `${bubble.x}%`,
              `${bubble.x + 12}%`,
              `${bubble.x - 12}%`,
              `${bubble.x + 8}%`,
              `${bubble.x}%`,
            ],
            scale: [1, 1.2, 1, 0.9, 1],
            rotate: [0, 8, -8, 5, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: bubble.delay,
          }}
        />
      ))}
      
      {/* Extra large blurry bubbles */}
      {[
        { x: 5, y: 10, size: 250 },
        { x: 75, y: 20, size: 280 },
        { x: 30, y: 60, size: 220 },
        { x: 85, y: 70, size: 260 },
        { x: 45, y: 35, size: 240 },
        { x: 15, y: 85, size: 270 },
      ].map((xlarge, i) => (
        <motion.div
          key={`xlarge-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${xlarge.x}%`,
            top: `${xlarge.y}%`,
            width: xlarge.size,
            height: xlarge.size,
              background: `
                radial-gradient(ellipse at 40% 40%, 
                  rgba(173, 216, 230, 0.3) 0%, 
                  rgba(135, 206, 250, 0.15) 30%, 
                  rgba(176, 196, 222, 0.08) 60%, 
                  rgba(230, 250, 255, 0.03) 100%
                )
              `,
              border: '1px solid rgba(176, 224, 230, 0.1)',
              boxShadow: `
                inset -8px -8px 20px rgba(135, 206, 235, 0.1),
                inset 8px 8px 20px rgba(255, 255, 255, 0.2),
                0 15px 40px rgba(135, 206, 235, 0.05)
              `,
              filter: 'blur(6px)',
              backdropFilter: 'blur(3px)',
            }}
            animate={{
              y: [0, -40, 0, 40, 0],
              x: [0, 30, -30, 15, 0],
              scale: [1, 1.3, 1, 0.85, 1],
              opacity: [0.2, 0.35, 0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
      ))}
      
      {/* Medium blurry bubbles */}
      {[
        { x: 8, y: 12, size: 80 },
        { x: 22, y: 28, size: 95 },
        { x: 38, y: 45, size: 70 },
        { x: 52, y: 18, size: 85 },
        { x: 68, y: 55, size: 90 },
        { x: 82, y: 32, size: 75 },
        { x: 18, y: 68, size: 88 },
        { x: 35, y: 82, size: 78 },
        { x: 48, y: 8, size: 92 },
        { x: 62, y: 72, size: 82 },
        { x: 78, y: 48, size: 87 },
        { x: 12, y: 38, size: 72 },
        { x: 28, y: 15, size: 98 },
        { x: 92, y: 62, size: 68 },
        { x: 55, y: 88, size: 83 },
      ].map((medium, i) => (
        <motion.div
          key={`medium-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${medium.x}%`,
            top: `${medium.y}%`,
            width: medium.size,
            height: medium.size,
              background: `
                radial-gradient(circle at 30% 30%, 
                  rgba(191, 239, 255, 0.5) 0%, 
                  rgba(135, 206, 250, 0.25) 50%, 
                  rgba(176, 224, 230, 0.1) 100%
                )
              `,
              border: '1px solid rgba(191, 239, 255, 0.15)',
              boxShadow: `
                inset -3px -3px 10px rgba(135, 206, 250, 0.15),
                inset 3px 3px 10px rgba(255, 255, 255, 0.4),
                0 5px 15px rgba(135, 206, 250, 0.1)
              `,
              filter: `blur(${3 + (i % 3)}px)`,
            }}
            animate={{
              x: [0, 50, -50, 25, 0],
              y: [0, -20, 20, -15, 0],
              scale: [1, 1.15, 0.9, 1.1, 1],
              opacity: [0.3, 0.45, 0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 20 + (i % 5) * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.8,
            }}
          />
      ))}
    </div>
  )
}