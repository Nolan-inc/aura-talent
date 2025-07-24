'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Actor {
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

interface ApiActor {
  id: string
  title: string
  slug: string
  thumbnail: {
    url: string
    alt: string
  }
  displayOrder?: number
  metadata?: {
    images?: Array<{
      url: string
      alt: string
      order: number
    }>
  }
}

interface ApiResponse {
  success: boolean
  data: ApiActor[]
}

export function ActorMarquee() {
  const [actors, setActors] = useState<Actor[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayCount = isMobile ? 5 : 8

  useEffect(() => {
    // Check if mobile with debounce
    let timeoutId: NodeJS.Timeout
    const checkMobile = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768)
      }, 150) // 150msのデバウンス
    }
    
    // 初期値を設定
    setIsMobile(window.innerWidth < 768)
    
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timeoutId)
    }
  }, [])

  // Auto-rotate actors
  useEffect(() => {
    if (actors.length > displayCount) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + displayCount) % actors.length)
      }, 5000) // Change every 5 seconds
      return () => clearInterval(interval)
    }
    return () => {} // Add empty return for the else case
  }, [actors.length, displayCount])

  // APIからデータを取得（一度だけ）
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await fetch(
          'https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?types=card&category_ids=d9ac59d2-4356-4b0f-aa00-8713a909962f%2C9696c6f5-e622-4f83-ae67-e1247a0497e5%2C2afe4b32-4ba2-4ae1-9185-01142930e2b2'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data: ApiResponse = await response.json()
        
        // displayOrderで並び替え
        const sortedData = data.data.sort((a, b) => 
          (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity)
        )
        
        // displayOrderが5未満のタレントのみをフィルタリング
        const filteredData = sortedData.filter(item => 
          item.displayOrder !== undefined && item.displayOrder < 5
        )
        
        // デスクトップとモバイルの両方のポジションを含むデータを作成
        const mappedActors: Actor[] = filteredData.map((item, index) => {
          // デスクトップポジションをデフォルトとして使用
          const desktopPositionIndex = index % desktopPositions.length
          const desktopPosition = desktopPositions[desktopPositionIndex] || desktopPositions[0] || { x: 10, y: 10, size: 200, rotate: 0 }
          
          return {
            id: item.id,
            name: item.slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            nameJa: item.title,
            slug: item.slug.toLowerCase().replace(/ /g, '_'),
            marqueeImage: item.metadata?.images?.[0]?.url || item.thumbnail.url,
            position: desktopPosition // デフォルトポジションを設定
          }
        })

        setActors(mappedActors)
      } catch (error) {
        console.error('Error fetching actors:', error)
        setActors([])
      }
    }

    fetchActors()
  }, []) // 空の依存配列で一度だけ実行
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
            className="mb-16 text-center text-4xl font-light tracking-wider text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            TALENT
          </motion.h2>

          {/* Scattered Floating Images */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[800px] max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Get current visible actors */}
              {(() => {
              const visibleActors = []
              const positions = isMobile ? mobilePositions : desktopPositions
              for (let i = 0; i < displayCount && i < actors.length; i++) {
                const actorIndex = (currentIndex + i) % actors.length
                const positionIndex = i % positions.length
                visibleActors.push({ 
                  ...actors[actorIndex], 
                  displayIndex: i,
                  position: positions[positionIndex]
                })
              }
              return visibleActors
            })().map((actor, index) => (
              <motion.div
                key={`${actor.id}-${currentIndex}`}
                className="absolute"
                style={{
                  left: `${actor.position?.x || 10}%`,
                  top: `${actor.position?.y || 10}%`,
                  width: actor.position?.size || 200,
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
                      actor.position?.rotate || 0, 
                      (actor.position?.rotate || 0) + (isMobile ? 2 : 5), 
                      actor.position?.rotate || 0
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
                    href={`/talent/${actor.slug}`}
                    className="block relative group overflow-hidden rounded-xl md:rounded-2xl shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="relative overflow-hidden bg-tiffany-100 aspect-[3/4]">
                      <Image
                        src={actor.marqueeImage || '/aura/aura1001.jpg'}
                        alt={actor.nameJa || 'Actor'}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      {/* Name overlay - simplified for mobile */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      >
                        <p className="text-base md:text-lg font-light">{actor.nameJa}</p>
                        {!isMobile && <p className="text-sm opacity-80">{actor.name}</p>}
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
                href="/talent"
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
        <div className="absolute top-20 left-10 w-64 h-64 bg-tiffany-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-tiffany-100 rounded-full opacity-20 blur-3xl" />
      </div>
    </section>
  )
}