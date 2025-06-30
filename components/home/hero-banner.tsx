'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { JQueryRipple } from './jquery-ripple'

interface Banner {
  id: number
  name: string
  subtitle: string
  description: string
  imagePC: string
  imageSP: string
  link?: string
}

const banners: Banner[] = [
  {
    id: 1,
    name: 'AURA\nTALENT',
    subtitle: 'AURA所属タレント',
    description: '才能あふれるタレントが多数所属\n最高のエンターテインメントをお届けします',
    imagePC: '/aura/aura1001.jpg',
    imageSP: '/aura/aura1001.jpg',
  },
  {
    id: 2,
    name: 'NEW\nTALENTS',
    subtitle: '新規タレント募集',
    description: '次世代のスターを目指す\nあなたの夢を応援します',
    imagePC: '/aura/aura1005.jpg',
    imageSP: '/aura/aura1005.jpg',
  },
  {
    id: 3,
    name: 'AURA\nPRESS',
    subtitle: '会員制ファンサイト',
    description: '舞台裏や撮影現場の様子など\n限定コンテンツが満載',
    imagePC: '/aura/aura1009.jpg',
    imageSP: '/aura/aura1009.jpg',
    link: 'https://aurapress.com/',
  },
  {
    id: 4,
    name: 'MAIL\nORDER',
    subtitle: 'オフィシャルショップ',
    description: 'オリジナルグッズや出演作品\n限定特典付きで販売中',
    imagePC: '/aura/aura1012.jpg',
    imageSP: '/aura/aura1012.jpg',
    link: 'https://aura-mailorder.com/',
  },
]

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {banners[currentIndex]?.link ? (
            <a
              href={banners[currentIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              <BannerContent banner={banners[currentIndex]!} />
            </a>
          ) : (
            <BannerContent banner={banners[currentIndex]!} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function BannerContent({ banner }: { banner: Banner }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <JQueryRipple imageUrl={isMobile ? banner.imageSP : banner.imagePC}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-24 left-8 text-white lg:bottom-32 lg:left-16 z-10">
        <motion.h1 
          className="whitespace-pre-line text-5xl font-light tracking-wider lg:text-7xl drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
        >
          {banner.name}
        </motion.h1>
        <motion.p 
          className="mt-4 whitespace-pre-line text-sm lg:text-base drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        >
          {banner.description}
        </motion.p>
      </div>
    </JQueryRipple>
  )
}