'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Users, Heart, TrendingUp, Award } from 'lucide-react'
import { useEffect, useState } from 'react'

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
    [key: string]: any
  }
}

interface ApiResponse {
  success: boolean
  data: ApiArticle[]
}

interface JobPosition {
  id: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string[]
  isFromApi?: boolean
}

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

const staticJobPositions: JobPosition[] = []

const benefits: Benefit[] = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'キャリア成長',
    description: '業界最前線での経験を通じて、プロフェッショナルとして成長できます。',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'チームワーク',
    description: '才能豊かな仲間と共に、最高のエンターテインメントを創造します。',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: '充実の福利厚生',
    description: '社会保険完備、有給休暇、研修制度など、働きやすい環境を整備。',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: '実力主義',
    description: '年齢や性別に関係なく、実力と成果を正当に評価する環境です。',
  },
]

export default function RecruitPage() {
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([])

  useEffect(() => {
    const fetchRecruitData = async () => {
      try {
        const response = await fetch(
          'https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?types=article'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch recruit data')
        }

        const data: ApiResponse = await response.json()
        
        if (data.success && data.data) {
          // type=articleかつcategory.slug=recruitの記事を抽出
          const recruitArticles = data.data.filter(
            item => item.type === 'article' && 
            item.category?.slug === 'recruit'
          )

          if (recruitArticles.length > 0) {
            const apiJobs: JobPosition[] = recruitArticles.map(article => ({
              id: article.id,
              title: article.title,
              department: article.metadata?.department || 'マネジメント部',
              type: article.metadata?.employmentType || '正社員',
              location: article.metadata?.location || '東京',
              description: article.excerpt || article.content || '詳細は募集要項をご確認ください。',
              requirements: article.metadata?.requirements || [
                '詳細は募集要項をご確認ください',
              ],
              isFromApi: true,
            }))

            // APIからのデータを設定
            setJobPositions(apiJobs)
          }
        }
      } catch (error) {
        console.error('Error fetching recruit data:', error)
        // エラー時は空の配列のまま
      }
    }

    fetchRecruitData()
  }, [])

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
          <h1 className="text-5xl font-light tracking-widest">RECRUIT</h1>
          <div className="mt-4 w-20 h-0.5 bg-white mx-auto" />
        </motion.div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl mb-6">共に、新しい感動を創ろう</h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              AURAは、日本のエンターテインメントの未来を共に創造する
              情熱的な仲間を求めています。
            </p>
            <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-[#2eb3bf] transition-all duration-300 rounded-full">
              エントリーする
            </button>
          </motion.div>
        </section>

        {/* Why AURA */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-4"
          >
            なぜAURAで働くのか
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-white/70 mb-12 max-w-2xl mx-auto"
          >
            業界をリードする環境で、あなたの才能を最大限に発揮してください
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl mb-3">{benefit.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            募集職種
          </motion.h2>

          <div className="space-y-6">
            {jobPositions.map((position, index) => (
              <motion.article
                key={position.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${position.isFromApi ? 'bg-white/10 backdrop-blur-sm border-2 border-white/30' : 'bg-white/5 backdrop-blur-sm border border-white/20'} rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl mb-2 text-white group-hover:text-white/90 transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className={`px-3 py-1 ${position.isFromApi ? 'bg-white/20' : 'bg-white/10'} text-white rounded-full`}>
                        {position.department}
                      </span>
                      <span className={`px-3 py-1 ${position.isFromApi ? 'bg-white/20' : 'bg-white/10'} text-white rounded-full`}>
                        {position.type}
                      </span>
                      <span className={`px-3 py-1 ${position.isFromApi ? 'bg-white/20' : 'bg-white/10'} text-white rounded-full`}>
                        {position.location}
                      </span>
                      {position.isFromApi && (
                        <span className="px-3 py-1 bg-white text-[#2eb3bf] rounded-full text-xs font-medium">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 px-6 py-2 border border-white text-white hover:bg-white hover:text-[#2eb3bf] transition-all duration-300 rounded-full">
                    詳細を見る
                  </button>
                </div>
                
                <p className="text-white/80 mb-4 leading-relaxed">{position.description}</p>
                
                <div>
                  <h4 className="font-medium mb-2 text-white">応募資格：</h4>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    {position.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Employee Voice */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            社員の声
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: '田中 花子',
                department: 'マネジメント部',
                message: 'AURAでの仕事は毎日が刺激的です。タレントの成長を間近で見守り、共に成功を分かち合える喜びは、他では味わえない経験です。'
              },
              {
                name: '山田 太郎',
                department: '制作部',
                message: 'クリエイティブな環境で、自分のアイデアを形にできる。チームワークも素晴らしく、毎日の仕事にやりがいを感じています。'
              },
              {
                name: '鈴木 美咲',
                department: 'マーケティング部',
                message: '最新のデジタルマーケティングに挑戦できる環境。データを活用した戦略立案から実行まで、幅広い経験を積めています。'
              }
            ].map((employee, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mr-4" />
                  <div>
                    <h4 className="font-medium text-white">{employee.name}</h4>
                    <p className="text-sm text-white/70">{employee.department}</p>
                  </div>
                </div>
                <p className="text-white/80 italic leading-relaxed">
                  "{employee.message}"
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20"
          >
            <h2 className="text-3xl text-center mb-8 text-white">選考プロセス</h2>
            
            <div className="space-y-4">
              {['書類選考', '一次面接', '二次面接', '最終面接', '内定'].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="w-10 h-10 bg-white text-[#2eb3bf] rounded-full flex items-center justify-center font-medium mr-4">
                    {index + 1}
                  </div>
                  <span className="text-lg text-white">{step}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-white text-[#2eb3bf] hover:bg-white/90 transition-all duration-300 rounded-full font-medium">
                応募フォームへ
              </button>
            </div>
          </motion.div>
        </section>

        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`recruit-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${8 + i * 19}%`,
                top: `${12 + i * 17}%`,
                width: 75 + i * 25,
                height: 75 + i * 25,
                background: 'radial-gradient(circle, rgba(75, 163, 163, 0.1) 0%, transparent 70%)',
                filter: 'blur(3px)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
              }}
              transition={{
                duration: 26 + i * 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2.2,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}