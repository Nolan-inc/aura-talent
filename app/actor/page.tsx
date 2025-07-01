'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchWithCache } from '@/lib/cache'

interface Actor {
  id: string
  name: string
  nameJa: string
  slug: string
  image: string
  profile?: string
}

// APIレスポンスの型定義
interface ApiActor {
  id: string
  title: string
  slug: string
  publishedAt: string
  thumbnail: {
    url: string
  }
  metadata?: {
    images?: Array<{
      url: string
      alt: string
      order: number
    }>
  }
}

interface ApiResponse {
  data: ApiActor[]
}

// 静的データ（フォールバック用）
const staticActors: Actor[] = [
  {
    id: '1',
    name: 'Sei Shiraishi',
    nameJa: '白石聖',
    slug: 'sei_shiraishi',
    image: '/talent/acprof_fv_SeiShiraishi202505_02.jpg',
    profile: '1993年8月10日生まれ、神奈川県出身'
  },
  {
    id: '2',
    name: 'Kasumi Arimura',
    nameJa: '有村架純',
    slug: 'kasumi_arimura',
    image: '/talent/actor_thumb_202410_arimura-1.jpg',
    profile: '1993年2月13日生まれ、兵庫県出身'
  },
  {
    id: '3',
    name: 'Eiko Karata',
    nameJa: '唐田えりか',
    slug: 'eiko_karata',
    image: '/talent/marquee_img__0007_karata.jpg',
    profile: '1997年9月19日生まれ、千葉県出身'
  },
  {
    id: '4',
    name: 'Han Hyo-joo',
    nameJa: 'ハン・ヒョジュ',
    slug: 'han_hyo_joo',
    image: '/talent/marquee_img__0010_hyo-joo.jpg',
    profile: '1987年2月22日生まれ、韓国出身'
  },
  {
    id: '5',
    name: 'Michiko Kichise',
    nameJa: '吉瀬美智子',
    slug: 'michiko_kichise',
    image: '/talent/marquee_img__0013_kichise.jpg',
    profile: '1975年2月17日生まれ、福岡県出身'
  },
  {
    id: '6',
    name: 'Erika Toda',
    nameJa: '戸田恵梨香',
    slug: 'erika_toda',
    image: '/talent/marquee_img__0015_toda.jpg',
    profile: '1988年8月17日生まれ、兵庫県出身'
  },
]

export default function ActorPage() {
  const [actors, setActors] = useState<Actor[]>(staticActors)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // APIからデータを取得
    const fetchActors = async () => {
      try {
        // Use cache for API data
        const data = await fetchWithCache<ApiResponse>(
          'actors-list',
          async () => {
            const response = await fetch(
              'https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?type=card&category_id=d9ac59d2-4356-4b0f-aa00-8713a909962f',
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
        const apiActors: Actor[] = data.data.map((item) => ({
          id: item.id,
          name: item.slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // slugから英語名を生成
          nameJa: item.title, // 日本語名としてtitleを使用
          slug: item.slug.toLowerCase().replace(/ /g, '_'), // slugを正規化
          // metadata.imagesの2番目の画像を使用、なければthumbnail.urlを使用
          image: item.metadata?.images?.[1]?.url || item.thumbnail.url,
          profile: new Date(item.publishedAt).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) + ' 公開'
        }))

        setActors(apiActors)
      } catch (error) {
        console.error('Error fetching actors:', error)
        // エラー時は静的データを使用（既にセット済み）
      } finally {
        setIsLoading(false)
      }
    }

    fetchActors()
  }, [])
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20 text-gray-900">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light tracking-widest">ACTOR</h1>
          <div className="mt-4 w-20 h-0.5 bg-gray-800 mx-auto" />
        </motion.div>

        {/* Actor Grid */}
        <div className="container mx-auto px-4 max-w-7xl">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {actors.map((actor, index) => (
              <motion.article
                key={actor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/actor/${actor.slug}`}>
                  <div className="relative overflow-hidden bg-sky-100 aspect-[3/4]">
                    <Image
                      src={actor.image}
                      alt={actor.nameJa}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover overlay with actor info */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <p className="text-sm opacity-80">{actor.profile}</p>
                    </motion.div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h2 className="text-xl font-light">{actor.nameJa}</h2>
                    <p className="text-sm text-gray-600 mt-1">{actor.name}</p>
                  </div>
                </Link>
              </motion.article>
              ))}
            </div>
          )}
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
              background: 'radial-gradient(circle, rgba(135, 206, 235, 0.15) 0%, transparent 70%)',
              filter: 'blur(5px)',
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
              background: 'radial-gradient(circle, rgba(135, 206, 235, 0.15) 0%, transparent 70%)',
              filter: 'blur(5px)',
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
              background: 'radial-gradient(circle, rgba(165, 218, 248, 0.12) 0%, transparent 70%)',
              filter: 'blur(7px)',
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