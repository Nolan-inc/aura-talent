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
  actor: string
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
    color: 'from-tiffany-400 to-tiffany-700',
    icon: <Gift className="w-8 h-8" />,
  },
]

const specialContents: SpecialContent[] = [

]

export default function FanclubPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20 text-gray-900">
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
            <div className="absolute inset-0 bg-gradient-to-r from-tiffany-600 to-tiffany-500" />
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
                background: 'radial-gradient(circle, rgba(10, 186, 181, 0.05) 0%, transparent 70%)',
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