'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Film, Tv, Radio, ChevronLeft, Instagram, Globe, Mail, X } from 'lucide-react'
import { fetchWithCache } from '@/lib/cache'
import { TikTokIcon } from '@/components/icons/tiktok'

interface SocialLink {
  title: string
  url: string
}

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
  category?: 'actor' | 'idol' | 'artist'
  socialLinks?: SocialLink[]
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
  content: string | null
  excerpt: string | null
  thumbnail: {
    url: string
  }
  metadata?: {
    images?: Array<{
      url: string
    }>
    links?: Array<{
      title: string
      url: string
    }>
  }
  category?: {
    id: string
    name: string
    slug: string
  }
}

interface ApiResponse {
  success: boolean
  data: ApiActor[]
}

const CATEGORY_IDS = {
  actor: 'd9ac59d2-4356-4b0f-aa00-8713a909962f',
  idol: '2afe4b32-4ba2-4ae1-9185-01142930e2b2',
  artist: '9696c6f5-e622-4f83-ae67-e1247a0497e5',
}

// Extract skills from content text
function extractSkills(content: string | null): string[] {
  if (!content) return ['演技'];
  
  const skillsMatch = content.match(/特技[：:]　?(.+)/m);
  if (skillsMatch && skillsMatch[1]) {
    return skillsMatch[1]
      .split(/[、、・・]/)
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
  }
  
  return ['演技'];
}

// Clean content for Biography section - only keep B/W/H/S and birthplace
function cleanBiography(content: string | null): string {
  if (!content) return 'AURA所属のタレント。';
  
  const lines = content.split('\n');
  const cleanedLines: string[] = [];
  
  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;
    
    // Skip birth date line
    if (line.match(/生年月日[：:]/)) continue;
    
    // Skip height/weight line
    if (line.match(/身長.*?体重/)) continue;
    
    // Skip hobbies line
    if (line.match(/趣味[：:]/)) continue;
    
    // Skip skills line
    if (line.match(/特技[：:]/)) continue;
    
    // Keep B/W/H/S line
    if (line.match(/B.*?[\/／].*?W.*?[\/／].*?H.*?[\/／].*?S/)) {
      cleanedLines.push(line.trim());
    }
    // Keep birthplace line
    else if (line.match(/出身地[：:]/)) {
      cleanedLines.push(line.trim());
    }
  }
  
  return cleanedLines.length > 0 ? cleanedLines.join('\n') : 'AURA所属のタレント。';
}

export default function ActorDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [actor, setActor] = useState<ActorDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showContactModal, setShowContactModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchActorDetail = async () => {
      try {
        const decodedSlug = decodeURIComponent(slug).toLowerCase().replace(/ /g, '_')
        
        // Try to fetch from all categories
        let actorData: ApiActor | undefined;
        let foundCategory: 'actor' | 'idol' | 'artist' | undefined;
        
        // Fetch all categories in parallel
        const categoryPromises = Object.entries(CATEGORY_IDS).map(async ([category, categoryId]) => {
          try {
            const apiData = await fetchWithCache<ApiResponse>(
              `talent-detail-${category}-${decodedSlug}`,
              async () => {
                const response = await fetch(
                  `https://admin.cldv.jp/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?types=card&category_ids=${categoryId}`
                )
                
                if (!response.ok) {
                  throw new Error('Failed to fetch')
                }
                
                return response.json()
              },
              600 // Cache for 10 minutes
            )
            
            if (apiData?.data) {
              const found = apiData.data.find(
                item => item.slug.toLowerCase().replace(/ /g, '_') === decodedSlug
              )
              if (found) {
                actorData = found
                foundCategory = category as 'actor' | 'idol' | 'artist'
                return true
              }
            }
          } catch (error) {
            console.error(`Error fetching ${category} data:`, error)
          }
          return false
        })
        
        await Promise.all(categoryPromises)
        
        if (actorData) {
            setActor({
              id: actorData.id,
              name: actorData.slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              nameJa: actorData.title,
              slug: actorData.slug.toLowerCase().replace(/ /g, '_'),
              profileImage: actorData.metadata?.images?.[0]?.url || actorData.thumbnail.url,
              biography: cleanBiography(actorData.content || actorData.excerpt),
              skills: extractSkills(actorData.content),
              works: [],
              category: foundCategory || (actorData.category?.slug as 'actor' | 'idol' | 'artist'),
              socialLinks: actorData.metadata?.links || []
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    
    // FormSubmitに送信
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    // タレント名を追加
    formData.append('_subject', `【タレントお問い合わせ】${actor?.nameJa || 'タレント'} - ${formData.get('name')}`)
    
    try {
      const response = await fetch('https://formsubmit.co/m.hokazono@japanmusic.jp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        alert('お問い合わせを受け付けました。担当者より折り返しご連絡いたします。')
        setShowContactModal(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        alert('送信に失敗しました。もう一度お試しください。')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('送信中にエラーが発生しました。')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white/80">Loading...</p>
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
            <p className="text-white/80">タレントが見つかりませんでした</p>
            <Link href="/talent" className="mt-4 inline-block text-white hover:text-white/80 transition-colors">
              タレント一覧に戻る
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
      <main className="relative min-h-screen pt-32 pb-20 text-white">
        {/* Decorative background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            className="absolute rounded-full"
            style={{
              left: '10%',
              top: '20%',
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              right: '15%',
              bottom: '30%',
              width: 250,
              height: 250,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
              filter: 'blur(35px)',
            }}
            animate={{
              y: [0, 40, 0],
              x: [0, -25, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          />
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-4 mb-8">
          <Link 
            href="/talent"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">タレント一覧に戻る</span>
          </Link>
        </div>

        {/* Profile Section */}
        <section className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className={`relative ${actor.category === 'idol' ? 'aspect-[16/9]' : 'aspect-[3/4]'} rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group`}>
                  <Image
                    src={actor.profileImage}
                    alt={actor.nameJa}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Decorative glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-tiffany-400/20 to-tiffany-600/20 rounded-2xl blur-xl opacity-50 -z-10" />
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                <h1 className="text-4xl font-light mb-2 text-white">{actor.nameJa}</h1>
                <p className="text-lg text-white/70 mb-8">{actor.name}</p>


                {/* Biography */}
                {actor.biography && (
                  <div className="mb-8">
                    <h2 className="text-xl font-light mb-4 text-white">Biography</h2>
                    <p className="text-white/80 leading-relaxed whitespace-pre-line bg-white/10 backdrop-blur-sm rounded-lg p-4">{actor.biography}</p>
                  </div>
                )}

                {/* Skills */}
                {actor.skills && actor.skills.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-light mb-4 text-white">特技</h2>
                    <div className="flex flex-wrap gap-2">
                      {actor.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/30 hover:bg-white/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {actor.socialLinks && actor.socialLinks.length > 0 && (
                  <div>
                    <h2 className="text-xl font-light mb-4 text-white">Links</h2>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {actor.socialLinks.map((link, index) => {
                        const getSocialIcon = (title: string) => {
                          switch (title.toLowerCase()) {
                            case 'instagram':
                              return <Instagram className="w-5 h-5" />
                            case 'tiktok':
                              return <TikTokIcon className="w-5 h-5" />
                            default:
                              return <Globe className="w-5 h-5" />
                          }
                        }

                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300 group border border-white/30 hover:scale-105 transform"
                            title={link.title}
                          >
                            <span className="text-white group-hover:text-white/90 transition-colors">
                              {getSocialIcon(link.title)}
                            </span>
                            <span className="text-sm text-white group-hover:text-white/90">
                              {link.title}
                            </span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Contact Button */}
                <motion.button
                  onClick={() => setShowContactModal(true)}
                  className="mt-8 w-full px-6 py-3 bg-white text-[#2eb3bf] hover:bg-white/90 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5" />
                  このタレントにお問い合わせ
                </motion.button>
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
                <h2 className="text-2xl sm:text-3xl font-light text-center mb-8 sm:mb-12 text-white">Works</h2>
                <div className="space-y-2">
                  {actor.works.map((work) => (
                    <div
                      key={work.id}
                      className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6 p-4 hover:bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-300 border border-transparent hover:border-white/20"
                    >
                      <span className="text-sm text-white/60 w-full sm:w-16">{work.year}</span>
                      {work.type === 'movie' && <Film className="w-5 h-5 text-white/60" />}
                      {work.type === 'tv' && <Tv className="w-5 h-5 text-white/60" />}
                      {work.type === 'radio' && <Radio className="w-5 h-5 text-white/60" />}
                      <h3 className="flex-1 text-lg text-white">{work.title}</h3>
                      {work.role && (
                        <span className="text-sm text-white/70">{work.role}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </section>

        {/* Contact Modal */}
        <AnimatePresence>
          {showContactModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-md bg-[#2eb3bf] rounded-2xl shadow-2xl p-8 border border-white/20"
              >
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-2xl font-light mb-2 text-white">お問い合わせ</h3>
                <p className="text-white/80 text-sm mb-6">{actor?.nameJa}へのお仕事のご依頼</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="talent" value={actor?.nameJa || 'タレント'} />
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                      お名前 <span className="text-red-300">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors text-white placeholder-white/50 backdrop-blur-sm"
                      placeholder="山田太郎"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                      メールアドレス <span className="text-red-300">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors text-white placeholder-white/50 backdrop-blur-sm"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors text-white placeholder-white/50 backdrop-blur-sm"
                      placeholder="090-1234-5678"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                      お問い合わせ内容 <span className="text-red-300">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors text-white placeholder-white/50 backdrop-blur-sm resize-none"
                      placeholder="お仕事の内容、ご依頼の詳細をご記入ください"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                      isSubmitting 
                        ? 'bg-white/50 text-[#2eb3bf]/50 cursor-not-allowed' 
                        : 'bg-white text-[#2eb3bf] hover:bg-white/90'
                    }`}
                  >
                    {isSubmitting ? '送信中...' : '送信する'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}