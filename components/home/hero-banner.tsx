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

// APIレスポンスの型定義
interface ApiBanner {
  id: string
  title: string
  slug: string
  publishedAt: string
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
  url?: string
}

interface ApiResponse {
  success: boolean
  data: ApiBanner[]
}

// 静的なフォールバックデータ
const staticBanners: Banner[] = [
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
  const [banners, setBanners] = useState<Banner[]>(staticBanners)

  // APIからバナーデータを取得
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          'https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?types=card&category_ids=4008c980-d4ce-4671-a4db-8d119cc7525a'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch banners')
        }

        const data: ApiResponse = await response.json()
        
        if (data.success && data.data.length > 0) {
          // displayOrderで並び替え
          const sortedData = data.data.sort((a, b) => 
            (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity)
          )
          
          // APIデータをBanner型にマップ
          const mappedBanners: Banner[] = sortedData.map((item, index) => ({
            id: index + 1,
            name: item.title.toUpperCase().replace(/ /g, '\n'), // スペースを改行に変換
            subtitle: item.slug || '',
            description: item.title,
            imagePC: item.metadata?.images?.[0]?.url || item.thumbnail.url,
            imageSP: item.thumbnail.url,
            link: item.url
          }))
          
          setBanners(mappedBanners)
        }
      } catch (error) {
        console.error('Error fetching banners:', error)
        // エラー時は静的データを使用
      }
    }

    fetchBanners()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [banners.length])

  return (
    <section className="relative h-[65vh] md:h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <BannerContent banner={banners[currentIndex]!} />
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
        {banner.subtitle && (
          <motion.p 
            className="mt-2 text-xl lg:text-2xl font-light tracking-wide drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
          >
            {banner.subtitle}
          </motion.p>
        )}
      </div>
    </JQueryRipple>
  )
}