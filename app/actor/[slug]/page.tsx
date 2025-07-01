'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Film, Tv, Radio, ChevronLeft } from 'lucide-react'
import { fetchWithCache } from '@/lib/cache'

interface ActorDetail {
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
interface ApiActor {
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
  data: ApiActor[]
}

// Extract skills from content text
function extractSkills(content: string | null): string[] {
  if (!content) return ['演技'];
  
  const skillsMatch = content.match(/特技[：:]　?(.+)/m);
  if (skillsMatch) {
    return skillsMatch[1]
      .split(/[、、・・]/)
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
  }
  
  return ['演技'];
}

// Extract birth date from content
function extractBirthDate(content: string | null): string | undefined {
  if (!content) return undefined;
  
  const birthMatch = content.match(/生年月日[：:]　?([0-9０-９]+[年/][0-9０-９]+[月/][0-9０-９]+)/m);
  if (birthMatch) {
    return birthMatch[1];
  }
  
  return undefined;
}

// Extract height from content
function extractHeight(content: string | null): string | undefined {
  if (!content) return undefined;
  
  const heightMatch = content.match(/身長.*?[：:]　?([0-9０-９]+)/m);
  if (heightMatch) {
    return heightMatch[1] + 'cm';
  }
  
  return undefined;
}

// Extract blood type from content
function extractBloodType(content: string | null): string | undefined {
  if (!content) return undefined;
  
  const bloodMatch = content.match(/血液型[：:]　?([ABOＡＢＯ][BＢ]?)/m);
  if (bloodMatch) {
    return bloodMatch[1];
  }
  
  // Also check for B/W/H pattern
  const bwhMatch = content.match(/B.*?[:：]　?([ABO]+)/m);
  if (bwhMatch) {
    return bwhMatch[1];
  }
  
  return undefined;
}

export default function ActorDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [actor, setActor] = useState<ActorDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActorDetail = async () => {
      try {
        const decodedSlug = decodeURIComponent(slug).toLowerCase().replace(/ /g, '_')
        
        // Try to fetch from API with cache
        const apiData = await fetchWithCache<ApiResponse>(
          `actor-detail-${decodedSlug}`,
          async () => {
            const response = await fetch(
              'https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?type=card&category_id=d9ac59d2-4356-4b0f-aa00-8713a909962f'
            )
            
            if (!response.ok) {
              throw new Error('Failed to fetch')
            }
            
            return response.json()
          },
          600 // Cache for 10 minutes
        )
        
        if (apiData) {
          const actorData = apiData.data.find(
            item => item.slug.toLowerCase().replace(/ /g, '_') === decodedSlug
          )
          
          if (actorData) {
            setActor({
              id: actorData.id,
              name: actorData.slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              nameJa: actorData.title,
              slug: actorData.slug.toLowerCase().replace(/ /g, '_'),
              profileImage: actorData.metadata?.images?.[0]?.url || actorData.thumbnail.url,
              biography: actorData.content || actorData.excerpt || 'AURA所属のタレント。',
              birthDate: extractBirthDate(actorData.content),
              height: extractHeight(actorData.content),
              bloodType: extractBloodType(actorData.content),
              skills: extractSkills(actorData.content),
              works: []
            })
          } else {
            // Create mock data if actor not found
            setActor({
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
        console.error('Error fetching actor detail:', error)
        // Fallback to mock data
        const decodedSlug = decodeURIComponent(slug).toLowerCase().replace(/ /g, '_')
        setActor({
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

    fetchActorDetail()
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

  if (!actor) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">俳優が見つかりませんでした</p>
            <Link href="/actor" className="mt-4 inline-block text-blue-600 hover:underline">
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
      <main className="relative min-h-screen pt-32 pb-20 text-gray-900">
        {/* Back Button */}
        <div className="container mx-auto px-4 mb-8">
          <Link 
            href="/actor"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">俳優一覧に戻る</span>
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
                    src={actor.profileImage}
                    alt={actor.nameJa}
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
                <h1 className="text-4xl font-light mb-2">{actor.nameJa}</h1>
                <p className="text-lg text-gray-600 mb-8">{actor.name}</p>


                {/* Biography */}
                {actor.biography && (
                  <div className="mb-8">
                    <h2 className="text-xl font-light mb-4">Biography</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{actor.biography}</p>
                  </div>
                )}

                {/* Skills */}
                {actor.skills && actor.skills.length > 0 && (
                  <div>
                    <h2 className="text-xl font-light mb-4">特技</h2>
                    <div className="flex flex-wrap gap-2">
                      {actor.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-sky-100 rounded-full text-sm"
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
            {actor.works && actor.works.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-20"
              >
                <h2 className="text-3xl font-light text-center mb-12">Works</h2>
                <div className="space-y-2">
                  {actor.works.map((work) => (
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