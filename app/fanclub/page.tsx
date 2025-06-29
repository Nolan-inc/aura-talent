'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Crown, Users, Calendar, Gift, Star, ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface FanclubTier {
  id: string
  name: string
  price: string
  benefits: string[]
  color: string
  icon: React.ReactNode
}

interface SpecialContent {
  id: string
  title: string
  type: 'movie' | 'photo' | 'message'
  actress: string
  thumbnail: string
  date: string
}

const fanclubTiers: FanclubTier[] = [
  {
    id: '1',
    name: 'SILVER',
    price: '¥500/月',
    benefits: [
      '会員限定ニュースレター',
      'デジタル壁紙プレゼント',
      '先行チケット予約権',
      'バースデーメッセージ',
    ],
    color: 'from-gray-300 to-gray-500',
    icon: <Star className="w-8 h-8" />,
  },
  {
    id: '2',
    name: 'GOLD',
    price: '¥1,000/月',
    benefits: [
      'SILVER特典すべて',
      '限定動画コンテンツ',
      'オンラインイベント参加権',
      '限定フォトブック割引',
      'サイン入りブロマイド（年2回）',
    ],
    color: 'from-yellow-400 to-amber-600',
    icon: <Crown className="w-8 h-8" />,
  },
  {
    id: '3',
    name: 'PLATINUM',
    price: '¥3,000/月',
    benefits: [
      'GOLD特典すべて',
      'ファンミーティング優先予約',
      '限定グッズプレゼント',
      'バックステージツアー抽選権',
      '誕生日プレゼント',
      '年末特別イベント招待',
    ],
    color: 'from-sky-400 to-sky-700',
    icon: <Gift className="w-8 h-8" />,
  },
]

const specialContents: SpecialContent[] = [
  {
    id: '1',
    title: '撮影現場の裏側',
    type: 'movie',
    actress: '白石聖',
    thumbnail: '/talent/acprof_fv_SeiShiraishi202505_02.jpg',
    date: '2025.06.25',
  },
  {
    id: '2',
    title: '特別フォトギャラリー',
    type: 'photo',
    actress: '有村架純',
    thumbnail: '/talent/actress_thumb_202410_arimura-1.jpg',
    date: '2025.06.20',
  },
  {
    id: '3',
    title: 'ファンへのメッセージ',
    type: 'message',
    actress: '田中みな実',
    thumbnail: '/aura/top_mv_pc_0002_narumi.jpg',
    date: '2025.06.15',
  },
]

export default function FanclubPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light tracking-widest">FANCLUB</h1>
          <div className="mt-4 w-20 h-0.5 bg-gray-800 mx-auto" />
        </motion.div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="container mx-auto px-4 max-w-6xl mb-20"
        >
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-600" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Users className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-4xl mb-4">AURA OFFICIAL FANCLUB</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  AURA所属タレントをもっと身近に感じられる特別な空間へようこそ。
                  限定コンテンツや特別なイベントで、あなたの推しをもっと応援しませんか？
                </p>
                <button className="px-8 py-3 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                  今すぐ入会する
                </button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Membership Tiers */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            会員プラン
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {fanclubTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-300 group-hover:border-transparent">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-medium">{tier.name}</h3>
                      <div className={`p-3 rounded-full bg-gradient-to-br ${tier.color} text-white`}>
                        {tier.icon}
                      </div>
                    </div>
                    
                    <p className="text-3xl font-light mb-6">{tier.price}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="w-full py-3 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300">
                      このプランに申し込む
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Special Contents */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            限定コンテンツ
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {specialContents.map((content, index) => (
              <motion.article
                key={content.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-4">
                  <Image
                    src={content.thumbnail}
                    alt={content.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-80">{content.actress}</p>
                    <h3 className="text-lg">{content.title}</h3>
                  </div>
                  {content.type === 'movie' && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      動画
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">{content.date}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-800 transition-colors">
              もっと見る
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </section>

        {/* Events */}
        <section className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-12 text-center"
          >
            <Calendar className="w-12 h-12 mx-auto mb-4 text-sky-600" />
            <h2 className="text-3xl mb-4">会員限定イベント</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              ファンミーティング、オンライントークイベント、舞台挨拶優先予約など、
              会員だけの特別なイベントを定期的に開催しています。
            </p>
            <button className="px-8 py-3 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-colors">
              イベントカレンダーを見る
            </button>
          </motion.div>
        </section>

        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`fanclub-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${12 + i * 17}%`,
                top: `${18 + i * 16}%`,
                width: 90 + i * 18,
                height: 90 + i * 18,
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)',
                filter: 'blur(3px)',
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, 12, 0],
              }}
              transition={{
                duration: 28 + i * 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2.5,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}