'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Film, Tv, Radio, ChevronLeft } from 'lucide-react'

interface ActressDetail {
  id: string
  name: string
  nameJa: string
  slug: string
  profileImage: string
  birthDate?: string
  bloodType?: string
  height?: string
  biography?: string
  skills?: string[]
  works?: Work[]
}

interface Work {
  id: string
  year: string
  title: string
  role?: string
  type: 'movie' | 'tv' | 'radio' | 'stage'
}

// APIレスポンスの型定義
interface ApiActress {
  id: string
  title: string
  slug: string
  thumbnail: {
    url: string
  }
  metadata?: {
    images?: Array<{
      url: string
    }>
  }
}

interface ApiResponse {
  success: boolean
  data: ApiActress[]
}

export default function ActressDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [actress, setActress] = useState<ActressDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActressDetail = async () => {
      try {
        const decodedSlug = decodeURIComponent(slug).toLowerCase().replace(/ /g, '_')
        
        // Try to fetch from API
        const response = await fetch(
          'https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?type=card&category_id=d9ac59d2-4356-4b0f-aa00-8713a909962f'
        )
        
        if (response.ok) {
          const apiData: ApiResponse = await response.json()
          const actressData = apiData.data.find(
            item => item.slug.toLowerCase().replace(/ /g, '_') === decodedSlug
          )
          
          if (actressData) {
            setActress({
              id: actressData.id,
              name: actressData.slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              nameJa: actressData.title,
              slug: actressData.slug.toLowerCase().replace(/ /g, '_'),
              profileImage: actressData.metadata?.images?.[0]?.url || actressData.thumbnail.url,
              biography: 'AURA所属のタレント。',
              skills: ['演技'],
              works: []
            })
          } else {
            // Create mock data if actress not found
            setActress({
              id: '999',
              name: decodeURIComponent(slug).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              nameJa: 'タレント名',
              slug: decodedSlug,
              profileImage: '/aura/aura1001.jpg',
              biography: 'AURA所属のタレント。',
              skills: ['演技'],
              works: []
            })
          }
        }
      } catch (error) {
        console.error('Error fetching actress detail:', error)
        // Fallback to mock data
        const decodedSlug = decodeURIComponent(slug).toLowerCase().replace(/ /g, '_')
        setActress({
          id: '999',
          name: decodeURIComponent(slug).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          nameJa: 'タレント名',
          slug: decodedSlug,
          profileImage: '/aura/aura1001.jpg',
          biography: 'AURA所属のタレント。',
          skills: ['演技'],
          works: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchActressDetail()
  }, [slug])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!actress) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">女優が見つかりませんでした</p>
            <Link href="/actress" className="mt-4 inline-block text-blue-600 hover:underline">
              女優一覧に戻る
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 mb-8">
          <Link 
            href="/actress"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">女優一覧に戻る</span>
          </Link>
        </div>

        {/* Profile Section */}
        <section className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={actress.profileImage}
                    alt={actress.nameJa}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                <h1 className="text-4xl font-light mb-2">{actress.nameJa}</h1>
                <p className="text-lg text-gray-600 mb-8">{actress.name}</p>

                {/* Basic Info */}
                <div className="space-y-4 mb-8">
                  {actress.birthDate && (
                    <div className="flex items-center gap-4">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">生年月日: {actress.birthDate}</span>
                    </div>
                  )}
                  {actress.bloodType && (
                    <div className="flex gap-4">
                      <span className="text-gray-400 w-5">🩸</span>
                      <span className="text-gray-600">血液型: {actress.bloodType}型</span>
                    </div>
                  )}
                  {actress.height && (
                    <div className="flex gap-4">
                      <span className="text-gray-400 w-5">📏</span>
                      <span className="text-gray-600">身長: {actress.height}</span>
                    </div>
                  )}
                </div>

                {/* Biography */}
                {actress.biography && (
                  <div className="mb-8">
                    <h2 className="text-xl font-light mb-4">Biography</h2>
                    <p className="text-gray-600 leading-relaxed">{actress.biography}</p>
                  </div>
                )}

                {/* Skills */}
                {actress.skills && actress.skills.length > 0 && (
                  <div>
                    <h2 className="text-xl font-light mb-4">特技</h2>
                    <div className="flex flex-wrap gap-2">
                      {actress.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gray-100 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Works Section */}
            {actress.works && actress.works.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-20"
              >
                <h2 className="text-3xl font-light text-center mb-12">Works</h2>
                <div className="space-y-2">
                  {actress.works.map((work) => (
                    <div
                      key={work.id}
                      className="flex items-center gap-6 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-sm text-gray-500 w-16">{work.year}</span>
                      {work.type === 'movie' && <Film className="w-5 h-5 text-gray-400" />}
                      {work.type === 'tv' && <Tv className="w-5 h-5 text-gray-400" />}
                      {work.type === 'radio' && <Radio className="w-5 h-5 text-gray-400" />}
                      <h3 className="flex-1 text-lg">{work.title}</h3>
                      {work.role && (
                        <span className="text-sm text-gray-600">{work.role}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}