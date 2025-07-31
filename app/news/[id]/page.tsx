import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NewsDetailClient from './news-detail-client'

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

async function getNewsDetail(id: string): Promise<NewsDetail | null> {
  try {
    const response = await fetch(
      `https://admin.cldv.jp/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?type=article`,
      { 
        cache: 'no-store',
        next: { revalidate: 60 }
      }
    )
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    const newsData = data.data || []
    
    const newsItem = newsData.find((item: NewsDetail) => item.id === id)
    return newsItem || null
  } catch (error) {
    console.error('Error fetching news detail:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const news = await getNewsDetail(id)
  
  if (!news) {
    return {
      title: 'News Not Found',
    }
  }
  
  return {
    title: news.title,
    description: news.excerpt,
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const news = await getNewsDetail(id)
  
  if (!news) {
    notFound()
  }
  
  return <NewsDetailClient news={news} />
}