'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface NewsItem {
  id: string
  date: string
  category: string
  title: string
  link?: string
}

// Mock news data
const newsItems: NewsItem[] = [
  {
    id: '1',
    date: '2025.06.27',
    category: 'MEDIA',
    title: '白石聖 Amazon Originalドラマ「私の夫と結婚して」配信開始',
  },
  {
    id: '2',
    date: '2025.06.25',
    category: 'EVENT',
    title: '宮﨑優 Netflixシリーズ「グラスハート」完成披露試写会',
  },
  {
    id: '3',
    date: '2025.06.20',
    category: 'MEDIA',
    title: '田中みな実 「愛の、がっこう。」制作発表',
  },
  {
    id: '4',
    date: '2025.06.15',
    category: 'NEWS',
    title: '鳴海唯 NHK連続テレビ小説「あんぱん」クランクイン',
  },
  {
    id: '5',
    date: '2025.06.10',
    category: 'EVENT',
    title: '有村架純 映画舞台挨拶登壇',
  },
]

export function NewsSection() {
  const [displayCount, setDisplayCount] = useState(3)
  const [showAll, setShowAll] = useState(false)

  const handleShowMore = () => {
    if (displayCount < newsItems.length) {
      setDisplayCount(Math.min(displayCount + 3, newsItems.length))
    } else {
      setShowAll(true)
    }
  }

  return (
    <section className="py-20 px-4">
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
                  className="block border-t border-gray-200 py-6 transition-all duration-300 hover:bg-gray-50 hover:pl-4"
                >
                  <NewsItemContent item={item} />
                </Link>
              ) : (
                <div className="block border-t border-gray-200 py-6 transition-all duration-300 hover:pl-4">
                  <NewsItemContent item={item} />
                </div>
              )}
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          {!showAll ? (
            <motion.button
              onClick={handleShowMore}
              className="inline-block px-8 py-3 text-sm font-light tracking-wider border border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">More</span>
              <motion.span
                className="absolute inset-0 bg-gray-800"
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
                className="inline-block px-8 py-3 text-sm font-light tracking-wider border border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">View all →</span>
                <motion.span
                  className="absolute inset-0 bg-gray-800"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

function NewsItemContent({ item }: { item: NewsItem }) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-8 group">
      <motion.time 
        className="text-sm text-gray-600 transition-colors group-hover:text-gray-900"
        whileHover={{ x: 5 }}
      >
        {item.date}
      </motion.time>
      <motion.span 
        className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded transition-all group-hover:bg-gray-200"
        whileHover={{ scale: 1.1 }}
      >
        {item.category}
      </motion.span>
      <h3 className="flex-1 text-lg transition-all duration-300 group-hover:translate-x-2">
        {item.title}
      </h3>
    </div>
  )
}