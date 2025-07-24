'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function SparkleBackground() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    // スパークルを生成
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = []
      for (let i = 0; i < 50; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2,
        })
      }
      setSparkles(newSparkles)
    }

    generateSparkles()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* 追加の輝きエフェクト */}
      {sparkles.map((sparkle, index) => (
        index < 20 && (
          <motion.div
            key={`glow-${sparkle.id}`}
            className="absolute rounded-full"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: sparkle.size * 3,
              height: sparkle.size * 3,
              background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
              filter: 'blur(2px)',
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: sparkle.duration * 1.5,
              delay: sparkle.delay + 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      ))}
    </div>
  )
}