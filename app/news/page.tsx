'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import { useState, useEffect } from 'react'
import { fetchWithCache } from '@/lib/cache'

interface NewsItem {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
  image?: string
  link?: string
}

// APIレスポンスの型定義
interface ApiNewsItem {
  id: string
  type: string
  title: string
  excerpt: string
  publishedAt: string
  url: string
  category?: {
    id: string
    name: string
    slug: string
  }
}

interface ApiResponse {
  success: boolean
  data: ApiNewsItem[]
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>([])
  const [categories, setCategories] = useState<string[]>(['ALL'])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await fetchWithCache<ApiResponse>(
          'news-list',
          async () => {
            const response = await fetch(
              'https://admin.cldv.jp/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?types=article'
            )

            if (!response.ok) {
              throw new Error('Failed to fetch')
            }

            return response.json()
          },
          300 // Cache for 5 minutes
        )

        if (data.success) {
          const mappedNews: NewsItem[] = data.data
            .filter((item) => {
              // Recruitカテゴリを除外
              const categoryName = item.category?.name?.toLowerCase() || '';
              return categoryName !== 'recruit';
            })
            .map((item) => ({
              id: item.id,
              date: new Date(item.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).replace(/\//g, '.'), // YYYY.MM.DD形式に変換
              category: item.category?.name || item.type.toUpperCase(), // categoryからnameを取得、なければtypeを大文字に変換
              title: item.title,
              excerpt: item.excerpt,
              link: `/news/${item.id}`,
              // imageはAPIレスポンスにない場合が多いのでundefined
            }))

          setNewsItems(mappedNews)
          
          // Extract unique categories from articles (excluding recruit)
          const uniqueCategories = new Set<string>()
          data.data.forEach(item => {
            if (item.type === 'article' && item.category?.name) {
              const categoryName = item.category.name.toLowerCase();
              if (categoryName !== 'recruit') {
                uniqueCategories.add(item.category.name)
              }
            }
          })
          
          // Set categories with 'ALL' first, then sorted categories
          const sortedCategories = Array.from(uniqueCategories).sort()
          setCategories(['ALL', ...sortedCategories])
        }
      } catch (error) {
        console.error('Error fetching news:', error)
        // エラー時は空配列
        setNewsItems([])
      }
    }

    fetchNews()
  }, [])

  // Filter items based on selected category
  useEffect(() => {
    if (selectedCategory === 'ALL') {
      setFilteredItems(newsItems)
    } else {
      setFilteredItems(newsItems.filter(item => 
        item.category === selectedCategory
      ))
    }
  }, [selectedCategory, newsItems])
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
          <h1 className="text-5xl font-light tracking-widest">NEWS</h1>
          <div className="mt-4 w-20 h-0.5 bg-white mx-auto" />
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
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm border rounded-md transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white/20 text-white border-white backdrop-blur-sm'
                    : 'border-white/50 text-white hover:bg-white/10 hover:border-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* News List */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex flex-col lg:flex-row gap-6 p-6 border-b border-white/20 hover:bg-white/5 transition-colors duration-300">
                  {item.image && (
                    <div className="lg:w-48 h-32 lg:h-32 relative overflow-hidden bg-tiffany-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-white/70">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {item.category}
                      </span>
                    </div>
                    
                    <h2 className="text-xl mb-2 text-white group-hover:text-white/90 transition-colors">
                      {item.title}
                    </h2>
                    
                    <p className="text-white/80 leading-relaxed">
                      {item.excerpt}
                    </p>
                    
                    {item.link && (
                      <Link
                        href={item.link}
                        className="inline-block mt-4 text-sm text-white hover:text-white/80 transition-colors"
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
            <button className="px-8 py-3 text-sm font-light tracking-wider border border-white text-white hover:bg-white hover:text-[#2eb3bf] transition-all duration-300">
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
                background: 'radial-gradient(circle, rgba(10, 186, 181, 0.08) 0%, transparent 70%)',
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