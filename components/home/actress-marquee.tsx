'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Actress {
  id: string
  name: string
  nameJa: string
  slug: string
  marqueeImage: string
  position: {
    x: number
    y: number
    size: number
    rotate: number
  }
}

// Pre-defined positions for scattered layout - desktop
const desktopPositions = [
  { x: 10, y: 5, size: 280, rotate: -5 },
  { x: 65, y: 15, size: 220, rotate: 8 },
  { x: 35, y: 45, size: 260, rotate: -12 },
  { x: 5, y: 65, size: 200, rotate: 15 },
  { x: 70, y: 55, size: 240, rotate: -8 },
  { x: 45, y: 20, size: 180, rotate: 5 },
  { x: 25, y: 75, size: 220, rotate: -10 },
  { x: 80, y: 35, size: 200, rotate: 12 },
]

// Pre-defined positions for mobile - cleaner layout
const mobilePositions = [
  { x: 15, y: 5, size: 160, rotate: -3 },
  { x: 55, y: 20, size: 140, rotate: 5 },
  { x: 10, y: 40, size: 150, rotate: -5 },
  { x: 60, y: 55, size: 130, rotate: 3 },
  { x: 30, y: 70, size: 140, rotate: -2 },
]

interface ApiActress {
  id: string
  title: string
  slug: string
  thumbnail: {
    url: string
    alt: string
  }
}

interface ApiResponse {
  success: boolean
  data: ApiActress[]
}

export function ActressMarquee() {
  const [actresses, setActresses] = useState<Actress[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayCount = isMobile ? 5 : 8

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-rotate actresses
  useEffect(() => {
    if (actresses.length > displayCount) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + displayCount) % actresses.length)
      }, 5000) // Change every 5 seconds
      return () => clearInterval(interval)
    }
    return () => {} // Add empty return for the else case
  }, [actresses.length, displayCount])

  useEffect(() => {
    const fetchActresses = async () => {
      try {
        const response = await fetch(
          'http://localhost:3003/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?type=card&category_id=d9ac59d2-4356-4b0f-aa00-8713a909962f'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data: ApiResponse = await response.json()
        const positions = isMobile ? mobilePositions : desktopPositions
        
        const mappedActresses: Actress[] = data.data.map((item, index) => {
          const positionIndex = index % positions.length
          const position = positions[positionIndex] || positions[0] || { x: 10, y: 10, size: 200, rotate: 0 }
          
          return {
            id: item.id,
            name: item.slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            nameJa: item.title,
            slug: item.slug.toLowerCase().replace(/ /g, '_'),
            marqueeImage: item.thumbnail.url,
            position: position
          }
        })

        setActresses(mappedActresses)
      } catch (error) {
        console.error('Error fetching actresses:', error)
        setActresses([])
      }
    }

    fetchActresses()
  }, [isMobile])
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.h2 
            className="mb-16 text-center text-4xl font-light tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ACTRESS
          </motion.h2>

          {/* Scattered Floating Images */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[800px] max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Get current visible actresses */}
              {(() => {
              const visibleActresses = []
              const positions = isMobile ? mobilePositions : desktopPositions
              for (let i = 0; i < displayCount && i < actresses.length; i++) {
                const actressIndex = (currentIndex + i) % actresses.length
                const positionIndex = i % positions.length
                visibleActresses.push({ 
                  ...actresses[actressIndex], 
                  displayIndex: i,
                  position: positions[positionIndex]
                })
              }
              return visibleActresses
            })().map((actress, index) => (
              <motion.div
                key={`${actress.id}-${currentIndex}`}
                className="absolute"
                style={{
                  left: `${actress.position?.x || 10}%`,
                  top: `${actress.position?.y || 10}%`,
                  width: actress.position?.size || 200,
                  maxWidth: isMobile ? '45%' : 'none',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
              >
                <motion.div
                  animate={{
                    y: isMobile ? [0, -10, 0] : [0, -20, 0],
                    rotate: [
                      actress.position?.rotate || 0, 
                      (actress.position?.rotate || 0) + (isMobile ? 2 : 5), 
                      actress.position?.rotate || 0
                    ],
                  }}
                  transition={{
                    duration: 6 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ 
                    scale: isMobile ? 1.05 : 1.1,
                    rotate: 0,
                    transition: { duration: 0.3 }
                  }}
                  className="relative"
                >
                  <Link
                    href={`/actress/${actress.slug}`}
                    className="block relative group overflow-hidden rounded-xl md:rounded-2xl shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="relative overflow-hidden bg-gray-100">
                      <img
                        src={actress.marqueeImage}
                        alt={actress.nameJa}
                        className="w-full h-auto object-cover"
                      />
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      {/* Name overlay - simplified for mobile */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      >
                        <p className="text-base md:text-lg font-light">{actress.nameJa}</p>
                        {!isMobile && <p className="text-sm opacity-80">{actress.name}</p>}
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
            </AnimatePresence>

            {/* View All Button - centered at bottom */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href="/actress"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 group"
              >
                <span className="text-sm tracking-wider">VIEW MORE</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sky-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>
    </section>
  )
}