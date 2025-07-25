'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchWithCache } from '@/lib/cache'

interface Talent {
  id: string
  name: string
  nameJa: string
  slug: string
  image: string
  profile?: string
  category: 'actor' | 'idol' | 'artist'
}

// APIレスポンスの型定義
interface ApiTalent {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  thumbnail: {
    url: string
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
  data: ApiTalent[]
}

type TabType = 'actor' | 'idol' | 'artist'

const CATEGORY_IDS = {
  actor: 'd9ac59d2-4356-4b0f-aa00-8713a909962f',
  idol: '2afe4b32-4ba2-4ae1-9185-01142930e2b2',
  artist: '9696c6f5-e622-4f83-ae67-e1247a0497e5',
}

// 静的データ（フォールバック用）
const staticTalents: { [key in TabType]: Talent[] } = {
  actor: [],
  idol: [],
  artist: [],
}

export default function ActorPage() {
  const [activeTab, setActiveTab] = useState<TabType>('actor')
  const [talents, setTalents] = useState<{ [key in TabType]: Talent[] }>(staticTalents)
  const [isLoading, setIsLoading] = useState<{ [key in TabType]: boolean }>({ 
    actor: true, 
    idol: true, 
    artist: true 
  })

  useEffect(() => {
    // 各カテゴリのデータを取得
    const fetchTalents = async (category: TabType) => {
      try {
        const data = await fetchWithCache<ApiResponse>(
          `${category}-list`,
          async () => {
            const response = await fetch(
              `https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?types=card&category_ids=${CATEGORY_IDS[category]}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            
            if (!response.ok) {
              throw new Error('Failed to fetch')
            }

            return response.json()
          },
          300 // Cache for 5 minutes
        )
        
        // APIデータを既存の構造に変換
        const apiTalents: Talent[] = data.data.map((item) => ({
          id: item.id,
          name: item.slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          nameJa: item.title,
          slug: item.slug.toLowerCase().replace(/ /g, '_'),
          image: item.metadata?.images?.[1]?.url || item.thumbnail.url,
          profile: item.excerpt || '',
          category
        }))

        // displayOrderで並び替え（displayOrderがない場合は公開日順）
        const sortedTalents = apiTalents.sort((a, b) => {
          const aItem = data.data.find(item => item.id === a.id)
          const bItem = data.data.find(item => item.id === b.id)
          
          // displayOrderが両方にある場合は、displayOrderで並び替え
          if (aItem?.displayOrder !== undefined && bItem?.displayOrder !== undefined) {
            return aItem.displayOrder - bItem.displayOrder
          }
          
          // displayOrderがない場合は公開日順（新しいものが後ろ）
          return new Date(aItem?.publishedAt || 0).getTime() - new Date(bItem?.publishedAt || 0).getTime()
        })

        setTalents(prev => ({ ...prev, [category]: sortedTalents }))
      } catch (error) {
        console.error(`Error fetching ${category}s:`, error)
      } finally {
        setIsLoading(prev => ({ ...prev, [category]: false }))
      }
    }

    // 全てのカテゴリのデータを取得
    fetchTalents('actor')
    fetchTalents('idol')
    fetchTalents('artist')
  }, [])
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20 text-white">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light tracking-widest font-gesta">TALENT</h1>
          <div className="mt-4 w-20 h-0.5 bg-white mx-auto" />
        </motion.div>

        {/* Tab Navigation */}
        <div className="container mx-auto px-4 max-w-7xl mb-12">
          <div className="flex justify-center">
            <div className="inline-flex border-b-2 border-white/20">
              {(['actor', 'idol', 'artist'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 text-lg font-light tracking-wide transition-all duration-300 ${
                    activeTab === tab
                      ? 'text-white border-b-2 border-white -mb-[2px]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Talent Grid */}
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
          {isLoading[activeTab] ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
                <p className="text-white/80">Loading...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {talents[activeTab].map((talent, index) => (
              <motion.article
                key={talent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group transform hover:scale-105 transition-transform duration-300"
              >
                <Link href={`/talent/${talent.slug}`} className="block">
                  <div className={`relative overflow-hidden bg-white/10 ${activeTab === 'idol' ? 'aspect-[16/9]' : 'aspect-[3/4]'} rounded-lg border border-white/20 shadow-lg hover:border-white/40 transition-colors duration-300`}>
                    <Image
                      src={talent.image}
                      alt={talent.nameJa}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover overlay with talent info */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <p className="text-sm opacity-90">{talent.profile}</p>
                    </motion.div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h2 className="text-xl font-light text-white">{talent.nameJa}</h2>
                    <p className="text-sm text-white/70 mt-1">{talent.name}</p>
                  </div>
                </Link>
              </motion.article>
              ))}
            </div>
          )}
          </motion.div>
        </div>

        {/* Subtle floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            className="absolute rounded-full"
            style={{
              left: '20%',
              top: '25%',
              width: 180,
              height: 180,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 12, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              left: '80%',
              top: '70%',
              width: 200,
              height: 200,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              scale: [1, 0.95, 1],
            }}
            transition={{
              duration: 42,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              left: '50%',
              top: '10%',
              width: 160,
              height: 160,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 36,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}