'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface NewsDetail {
  id: string
  type: string
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string | null
  category: {
    id: string
    name: string
    slug: string
  }
  categoryId: string
  publishedAt: string
  url: string
  externalLink: string | null
}

export default function NewsDetailClient({ news }: { news: NewsDetail }) {
  const formattedDate = new Date(news.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/news"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            ← Back to News
          </Link>
          
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-xs font-medium text-gray-600 bg-tiffany-100 rounded-full mb-4">
              {news.category.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-light mb-4">{news.title}</h1>
            <time className="text-gray-600">{formattedDate}</time>
          </div>
          
          {news.thumbnail && (
            <div className="mb-8">
              <img 
                src={news.thumbnail} 
                alt={news.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            {news.content ? (
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            ) : (
              <p className="text-gray-600 text-lg leading-relaxed">{news.excerpt}</p>
            )}
          </div>
          
          {news.externalLink && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <a
                href={news.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-tiffany-600 hover:text-tiffany-700 transition-colors"
              >
                外部リンクで詳細を見る →
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}