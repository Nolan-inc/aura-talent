'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { fetchWithCache } from '@/lib/cache'

interface HeaderProps {
  isHomePage?: boolean
}

interface HeaderImage {
  id: string
  title: string
  slug: string
  thumbnail: {
    url: string
    alt: string
  }
  displayOrder: number
}

interface ApiResponse {
  data: HeaderImage[]
}

export function Header({ isHomePage = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [headerImages, setHeaderImages] = useState<HeaderImage[]>([])
  const [, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ヘッダー画像を取得
  useEffect(() => {
    const fetchHeaderImages = async () => {
      try {
        const data = await fetchWithCache<ApiResponse>(
          'header-images',
          async () => {
            const response = await fetch(
              'http://localhost:3003/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?types=card&category_ids=4008c980-d4ce-4671-a4db-8d119cc7525a'
            )
            
            if (!response.ok) {
              throw new Error('Failed to fetch header images')
            }
            
            return response.json()
          },
          300 // 5分間キャッシュ
        )
        
        // displayOrderで並び替え
        const sortedImages = data.data.sort((a, b) => 
          (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity)
        )
        
        setHeaderImages(sortedImages)
      } catch (error) {
        console.error('Error fetching header images:', error)
      }
    }

    if (isHomePage) {
      fetchHeaderImages()
    }
  }, [isHomePage])

  // 画像の自動切り替え
  useEffect(() => {
    if (headerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % headerImages.length)
      }, 5000) // 5秒ごとに切り替え

      return () => clearInterval(interval)
    }
    // 明示的にundefinedを返す
    return undefined
  }, [headerImages.length])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500',
        isHomePage && !isScrolled
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm',
        isScrolled && 'py-2',
        !isScrolled && 'py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link
            href="/"
            className="flex items-center ml-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/aura_logo.png"
                alt="AURA"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </motion.div>
          </Link>

          {/* Right side - Empty space for balance */}
          <div className="w-12 h-12" />
        </div>
      </div>

    </motion.header>
  )
}