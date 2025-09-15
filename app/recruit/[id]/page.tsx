'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, MapPin, Users, Mail, Phone, FileText, X } from 'lucide-react'
import { fetchWithCache } from '@/lib/cache'

// HTMLエンティティをクリーンアップする関数
const cleanHtmlContent = (content: string, maxLength: number = 0): string => {
  let cleaned = content
    .replace(/<[^>]*>/g, '') // HTMLタグを削除
    .replace(/&nbsp;/g, ' ') // &nbsp;をスペースに
    .replace(/&amp;/g, '&') // &amp;を&に
    .replace(/&lt;/g, '<') // &lt;を<に
    .replace(/&gt;/g, '>') // &gt;を>に
    .replace(/&quot;/g, '"') // &quot;を"に
    .replace(/&#39;/g, "'") // &#39;を'に
    .replace(/\s+/g, ' ') // 複数の空白を1つに
    .trim()
  
  if (maxLength > 0 && cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength) + '...'
  }
  
  return cleaned
}

interface JobDetail {
  id: string
  title: string
  department: string
  type: string
  location: string
  description: string
  content?: string
  requirements: string[]
  responsibilities: string[]
  qualifications: string[]
  benefits: string[]
  salary?: string
  workingHours?: string
  holidays?: string
  contact?: {
    email: string
    phone?: string
  }
}

interface ApiArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  type: string
  category?: {
    id: string
    name: string
    slug: string
  }
  metadata?: {
    department?: string
    employmentType?: string
    location?: string
    requirements?: string[]
    responsibilities?: string[]
    qualifications?: string[]
    benefits?: string[]
    salary?: string
    workingHours?: string
    holidays?: string
    contactEmail?: string
    contactPhone?: string
  }
}

interface ApiResponse {
  success: boolean
  data: ApiArticle[]
}

export default function JobDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [job, setJob] = useState<JobDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showEntryModal, setShowEntryModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const data = await fetchWithCache<ApiResponse>(
          `recruit-detail-${id}`,
          async () => {
            const response = await fetch(
              'https://admin.cldv.jp/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?types=article'
            )
            
            if (!response.ok) {
              throw new Error('Failed to fetch')
            }
            
            return response.json()
          },
          600 // Cache for 10 minutes
        )
        
        if (data.success && data.data) {
          const recruitArticles = data.data.filter(
            item => item.type === 'article' && 
            item.category?.slug === 'recruit'
          )
          
          const jobArticle = recruitArticles.find(article => article.id === id)
          
          if (jobArticle) {
            setJob({
              id: jobArticle.id,
              title: jobArticle.title,
              department: jobArticle.metadata?.department || 'マネジメント部',
              type: jobArticle.metadata?.employmentType || '正社員',
              location: jobArticle.metadata?.location || '東京都港区',
              description: cleanHtmlContent(jobArticle.excerpt || '詳細は募集要項をご確認ください。', 200),
              content: jobArticle.content || '',
              requirements: jobArticle.metadata?.requirements || [
                '詳細は募集要項をご確認ください',
              ],
              responsibilities: jobArticle.metadata?.responsibilities || [
                'タレントマネジメント業務',
                'イベント企画・運営',
                'クライアント対応',
              ],
              qualifications: jobArticle.metadata?.qualifications || [
                '大学卒業以上',
                '社会人経験2年以上',
                'コミュニケーション能力の高い方',
              ],
              benefits: jobArticle.metadata?.benefits || [
                '社会保険完備',
                '交通費支給',
                '有給休暇制度',
                '研修制度あり',
              ],
              salary: jobArticle.metadata?.salary || '経験・能力に応じて決定',
              workingHours: jobArticle.metadata?.workingHours || '10:00〜19:00（休憩1時間）',
              holidays: jobArticle.metadata?.holidays || '土日祝日、年末年始、夏季休暇',
              contact: {
                email: jobArticle.metadata?.contactEmail || 'recruit@aura-talent.com',
                phone: jobArticle.metadata?.contactPhone,
              },
            })
          } else {
            // Fallback data if job not found
            setJob({
              id: id,
              title: '募集職種',
              department: 'マネジメント部',
              type: '正社員',
              location: '東京都港区',
              description: '詳細は募集要項をご確認ください。',
              requirements: ['詳細は募集要項をご確認ください'],
              responsibilities: [
                'タレントマネジメント業務',
                'イベント企画・運営',
                'クライアント対応',
              ],
              qualifications: [
                '大学卒業以上',
                '社会人経験2年以上',
                'コミュニケーション能力の高い方',
              ],
              benefits: [
                '社会保険完備',
                '交通費支給',
                '有給休暇制度',
                '研修制度あり',
              ],
              salary: '経験・能力に応じて決定',
              workingHours: '10:00〜19:00（休憩1時間）',
              holidays: '土日祝日、年末年始、夏季休暇',
              contact: {
                email: 'recruit@aura-talent.com',
              },
            })
          }
        }
      } catch (error) {
        console.error('Error fetching job detail:', error)
        // Fallback data on error
        setJob({
          id: id,
          title: '募集職種',
          department: 'マネジメント部',
          type: '正社員',
          location: '東京都港区',
          description: '詳細は募集要項をご確認ください。',
          requirements: ['詳細は募集要項をご確認ください'],
          responsibilities: [
            'タレントマネジメント業務',
            'イベント企画・運営',
            'クライアント対応',
          ],
          qualifications: [
            '大学卒業以上',
            '社会人経験2年以上',
            'コミュニケーション能力の高い方',
          ],
          benefits: [
            '社会保険完備',
            '交通費支給',
            '有給休暇制度',
            '研修制度あり',
          ],
          salary: '経験・能力に応じて決定',
          workingHours: '10:00〜19:00（休憩1時間）',
          holidays: '土日祝日、年末年始、夏季休暇',
          contact: {
            email: 'recruit@aura-talent.com',
          },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetail()
  }, [id])

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
    
    // 職種名を追加
    formData.append('_subject', `【採用応募】${job?.title || '募集職種'} - ${formData.get('name')}`)
    
    try {
      const response = await fetch('https://formsubmit.co/recruit@rise-liver.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        alert('エントリーを受け付けました。担当者より折り返しご連絡いたします。')
        setShowEntryModal(false)
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

  if (!job) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/80">募集要項が見つかりませんでした</p>
            <Link href="/recruit" className="mt-4 inline-block text-white hover:underline">
              募集一覧に戻る
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
        {/* Back Button */}
        <div className="container mx-auto px-4 mb-8">
          <Link 
            href="/recruit"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">募集一覧に戻る</span>
          </Link>
        </div>

        {/* Job Header */}
        <section className="container mx-auto px-4 max-w-6xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl lg:text-4xl font-light mb-4">{job.title}</h1>
                <p className="text-white/80 text-lg leading-relaxed">
                  {job.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <h3 className="text-xl font-medium mb-4">応募する</h3>
                  <p className="text-white/80 text-sm mb-6">
                    ご質問やご応募については、下記よりお気軽にお問い合わせください。
                  </p>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${job.contact?.email}`}
                      className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{job.contact?.email}</span>
                    </a>
                    {job.contact?.phone && (
                      <a
                        href={`tel:${job.contact.phone}`}
                        className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{job.contact.phone}</span>
                      </a>
                    )}
                  </div>
                  <button 
                    onClick={() => setShowEntryModal(true)}
                    className="w-full mt-6 px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-medium transition-colors"
                  >
                    エントリーする
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Job Details */}
        <section className="container mx-auto px-4 max-w-4xl">
          {/* Job Content */}
          {job.content && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <h2 className="text-2xl font-light mb-6">詳細</h2>
              <div 
                className="text-white/80 leading-relaxed prose prose-invert max-w-none
                  prose-p:mb-4 prose-headings:text-white prose-headings:font-light
                  prose-strong:text-white prose-strong:font-medium
                  prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-4
                  prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-4
                  prose-li:mb-2"
                dangerouslySetInnerHTML={{ __html: job.content }}
              />
            </motion.div>
          )}
        </section>

        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`job-detail-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 80 + Math.random() * 40,
                height: 80 + Math.random() * 40,
                background: `radial-gradient(circle, rgba(255, 255, 255, ${0.05 + Math.random() * 0.03}) 0%, transparent 70%)`,
                filter: 'blur(3px)',
              }}
              animate={{
                y: [0, -30 + Math.random() * 60, 0],
                x: [0, -20 + Math.random() * 40, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 3,
              }}
            />
          ))}
        </div>

        {/* Entry Modal */}
        <AnimatePresence>
          {showEntryModal && (
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
                  onClick={() => setShowEntryModal(false)}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-2xl font-light mb-2 text-white">エントリーフォーム</h3>
                <p className="text-white/80 text-sm mb-6">{job?.title}への応募</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="position" value={job?.title || '募集職種'} />
                  
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
                      メッセージ・自己PR
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors text-white placeholder-white/50 backdrop-blur-sm resize-none"
                      placeholder="志望動機や自己PRをご記入ください"
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
                    {isSubmitting ? '送信中...' : 'エントリーする'}
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