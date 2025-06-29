'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'

interface NewsItem {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
  image?: string
  link?: string
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    date: '2025.06.27',
    category: 'MEDIA',
    title: '白石聖 Amazon Originalドラマ「私の夫と結婚して」配信開始',
    excerpt: 'Amazon Prime Videoにて、白石聖主演のオリジナルドラマが世界独占配信されます。',
    image: '/talent/acprof_fv_SeiShiraishi202505_02.jpg',
  },
  {
    id: '2',
    date: '2025.06.25',
    category: 'EVENT',
    title: '宮﨑優 Netflixシリーズ「グラスハート」完成披露試写会',
    excerpt: '7月配信予定のNetflixシリーズ「グラスハート」の完成披露試写会が開催されました。',
  },
  {
    id: '3',
    date: '2025.06.20',
    category: 'MEDIA',
    title: '田中みな実 「愛の、がっこう。」制作発表',
    excerpt: 'フジテレビ系新ドラマ「愛の、がっこう。」の制作発表会見が行われました。',
  },
  {
    id: '4',
    date: '2025.06.15',
    category: 'NEWS',
    title: '鳴海唯 NHK連続テレビ小説「あんぱん」クランクイン',
    excerpt: 'NHK連続テレビ小説「あんぱん」の撮影が本格的にスタートしました。',
  },
  {
    id: '5',
    date: '2025.06.10',
    category: 'EVENT',
    title: '有村架純 映画舞台挨拶登壇',
    excerpt: '最新主演映画の初日舞台挨拶に登壇し、作品への思いを語りました。',
    image: '/talent/actress_thumb_202410_arimura-1.jpg',
  },
  {
    id: '6',
    date: '2025.06.05',
    category: 'AWARD',
    title: 'AURA所属女優 各種映画賞を受賞',
    excerpt: '今年度の各種映画賞において、AURA所属の女優陣が多数の賞を受賞しました。',
  },
  {
    id: '7',
    date: '2025.05.30',
    category: 'MEDIA',
    title: '戸田恵梨香 新作映画撮影開始',
    excerpt: '戸田恵梨香が主演を務める新作映画の撮影が開始されました。',
    image: '/talent/marquee_img__0015_toda.jpg',
  },
  {
    id: '8',
    date: '2025.05.25',
    category: 'EVENT',
    title: 'AURA ファンミーティング2025 開催決定',
    excerpt: '所属女優が一堂に会するファンミーティングの開催が決定しました。',
  },
]

const categories = ['ALL', 'MEDIA', 'EVENT', 'NEWS', 'AWARD']

export default function NewsPage() {
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
          <h1 className="text-5xl font-light tracking-widest">NEWS</h1>
          <div className="mt-4 w-20 h-0.5 bg-gray-800 mx-auto" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container mx-auto px-4 max-w-4xl mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 text-sm border border-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* News List */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex flex-col lg:flex-row gap-6 p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                  {item.image && (
                    <div className="lg:w-48 h-32 lg:h-32 relative overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {item.category}
                      </span>
                    </div>
                    
                    <h2 className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h2>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {item.excerpt}
                    </p>
                    
                    {item.link && (
                      <Link
                        href={item.link}
                        className="inline-block mt-4 text-sm text-blue-600 hover:underline"
                      >
                        続きを読む →
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button className="px-8 py-3 text-sm font-light tracking-wider border border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300">
              もっと見る
            </button>
          </motion.div>
        </div>

        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`news-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 25}%`,
                width: 60 + i * 20,
                height: 60 + i * 20,
                background: 'radial-gradient(circle, rgba(135, 206, 235, 0.08) 0%, transparent 70%)',
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 3,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}