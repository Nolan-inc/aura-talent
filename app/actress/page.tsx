'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Actress {
  id: string
  name: string
  nameJa: string
  slug: string
  image: string
  profile?: string
}

// APIレスポンスの型定義
interface ApiActress {
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
  data: ApiActress[]
}

// 静的データ（フォールバック用）
const staticActresses: Actress[] = [
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
    image: '/talent/actress_thumb_202410_arimura-1.jpg',
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

export default function ActressPage() {
  const [actresses, setActresses] = useState<Actress[]>(staticActresses)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // APIからデータを取得
    const fetchActresses = async () => {
      try {
        // QuickWeb APIからデータを取得
        const response = await fetch(
          'http://localhost:3003/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?type=card&category_id=d9ac59d2-4356-4b0f-aa00-8713a909962f',
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

        const data: ApiResponse = await response.json()
        
        // APIデータを既存の構造に変換
        const apiActresses: Actress[] = data.data.map((item) => ({
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

        setActresses(apiActresses)
      } catch (error) {
        console.error('Error fetching actresses:', error)
        // エラー時は静的データを使用（既にセット済み）
      } finally {
        setIsLoading(false)
      }
    }

    fetchActresses()
  }, [])
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light tracking-widest">ACTRESS</h1>
          <div className="mt-4 w-20 h-0.5 bg-gray-800 mx-auto" />
        </motion.div>

        {/* Actress Grid */}
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
              {actresses.map((actress, index) => (
              <motion.article
                key={actress.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/actress/${actress.slug}`}>
                  <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <Image
                      src={actress.image}
                      alt={actress.nameJa}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover overlay with actress info */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <p className="text-sm opacity-80">{actress.profile}</p>
                    </motion.div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h2 className="text-xl font-light">{actress.nameJa}</h2>
                    <p className="text-sm text-gray-600 mt-1">{actress.name}</p>
                  </div>
                </Link>
              </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`actress-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${15 + i * 18}%`,
                top: `${20 + i * 15}%`,
                width: 80 + i * 20,
                height: 80 + i * 20,
                background: 'radial-gradient(circle, rgba(135, 206, 235, 0.1) 0%, transparent 70%)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}