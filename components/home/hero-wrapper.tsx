'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface HeroWrapperProps {
  imageUrl: string
  priority?: boolean
  alt?: string
  blurhash?: string
  children: React.ReactNode
}

export function HeroWrapper({ 
  imageUrl, 
  priority = true, 
  alt = 'Hero background',
  blurhash,
  children 
}: HeroWrapperProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // 画像のプリロード
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = imageUrl
      link.fetchPriority = 'high'
      document.head.appendChild(link)
      
      return () => {
        document.head.removeChild(link)
      }
    }
  }, [imageUrl, priority])

  return (
    <div className="relative w-full h-full">
      {/* 非表示のNext.js Imageで最適化とプリロード */}
      <div className="hidden">
        <Image
          src={imageUrl}
          alt={alt}
          width={1920}
          height={1080}
          priority={priority}
          quality={90}
          onLoad={() => setIsImageLoaded(true)}
          placeholder={blurhash ? 'blur' : 'empty'}
          blurDataURL={blurhash}
        />
      </div>
      
      {/* BlurHashプレースホルダー */}
      {!isImageLoaded && blurhash && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${blurhash})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      
      {/* メインコンテンツ */}
      {children}
    </div>
  )
}