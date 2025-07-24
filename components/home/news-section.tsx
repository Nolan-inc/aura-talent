'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface NewsItem {
  id: string
  date: string
  category: string
  title: string
  link?: string
}




export function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [displayCount, setDisplayCount] = useState(3)
  const [showAll, setShowAll] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Force fresh fetch without cache for debugging
        console.log('Fetching news from API...')
        const response = await fetch(
          'https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?types=article',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'no-store'
          }
        )
        
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`)
        }
        
        const rawData = await response.json()
        console.log('Raw API Response:', rawData)
        
        // Check if data exists directly on response or wrapped in success/data structure
        const newsData = rawData.data || rawData;
        
        if (Array.isArray(newsData) && newsData.length > 0) {
          const mappedNews: NewsItem[] = newsData.slice(0, 10).map((item) => ({
            id: item.id || item._id || String(Math.random()),
            date: item.publishedAt 
              ? new Date(item.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).replace(/\//g, '.')
              : new Date().toLocaleDateString('ja-JP').replace(/\//g, '.'),
            category: item.category?.name || item.type || 'NEWS',
            title: item.title || 'No title',
            link: `/news/${item.id}`,
          }))
          console.log('Mapped news:', mappedNews)
          setNewsItems(mappedNews)
        } else {
          console.log('No valid news data in API response')
          setNewsItems([])
        }
      } catch (error) {
        console.error('Error fetching news:', error)
        // Keep empty array on error
        setNewsItems([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleShowMore = () => {
    if (displayCount < newsItems.length) {
      setDisplayCount(Math.min(displayCount + 3, newsItems.length))
    } else {
      setShowAll(true)
    }
  }

  return (
    <section className="py-20 px-4 bg-white/90 backdrop-blur-sm rounded-3xl mx-4 my-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-4xl"
      >
        <motion.h2 
          className="mb-12 text-center text-3xl font-light tracking-wider"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          News
        </motion.h2>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tiffany-400 mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading news...</p>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">ニュースがありません</p>
          </div>
        ) : (
          <ul className="space-y-px">
            {newsItems.slice(0, displayCount).map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {item.link ? (
                <Link
                  href={item.link}
                  className="block border-t border-gray-200 py-6 transition-all duration-300 hover:bg-tiffany-400/10 hover:pl-4"
                >
                  <NewsItemContent item={item} />
                </Link>
              ) : (
                <div className="block border-t border-gray-200 py-6 transition-all duration-300 hover:bg-tiffany-400/10 hover:pl-4">
                  <NewsItemContent item={item} />
                </div>
              )}
            </motion.li>
          ))}
          </ul>
        )}

        {newsItems.length > 0 && (
          <div className="mt-12 text-center">
            {!showAll ? (
            <motion.button
              onClick={handleShowMore}
              className="inline-block px-8 py-3 text-sm font-light tracking-wider border border-tiffany-400 text-gray-800 hover:bg-tiffany-400 hover:text-white transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">More</span>
              <motion.span
                className="absolute inset-0 bg-tiffany-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/news"
                className="inline-block px-8 py-3 text-sm font-light tracking-wider border border-tiffany-400 text-gray-800 hover:bg-tiffany-400 hover:text-white transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">View all →</span>
                <motion.span
                  className="absolute inset-0 bg-tiffany-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          )}
          </div>
        )}
      </motion.div>
    </section>
  )
}

function NewsItemContent({ item }: { item: NewsItem }) {
  return (
    <div className="flex flex-col gap-2 group">
      <div className="flex items-center gap-3">
        <motion.time 
          className="text-sm text-gray-600 transition-colors group-hover:text-gray-900"
          whileHover={{ x: 5 }}
        >
          {item.date}
        </motion.time>
        <motion.span 
          className="text-xs font-medium text-gray-500 px-2 py-1 bg-tiffany-100 rounded transition-all group-hover:bg-tiffany-200"
          whileHover={{ scale: 1.1 }}
        >
          {item.category}
        </motion.span>
      </div>
      <h3 className="text-lg transition-all duration-300 group-hover:translate-x-2 lg:mt-0">
        {item.title}
      </h3>
    </div>
  )
}