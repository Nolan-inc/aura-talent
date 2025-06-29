'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Tv, Film, Radio } from 'lucide-react'

interface ScheduleItem {
  id: string
  date: string
  time?: string
  title: string
  actress: string
  type: 'tv' | 'movie' | 'event' | 'radio'
  venue?: string
  channel?: string
  description?: string
}

const scheduleItems: ScheduleItem[] = [
  {
    id: '1',
    date: '2025.07.10',
    time: '22:00',
    title: '愛の、がっこう。',
    actress: '田中みな実',
    type: 'tv',
    channel: 'フジテレビ',
    description: '新ドラマスタート',
  },
  {
    id: '2',
    date: '2025.07.15',
    title: 'グラスハート',
    actress: '宮﨑優',
    type: 'tv',
    channel: 'Netflix',
    description: 'シリーズ配信開始',
  },
  {
    id: '3',
    date: '2025.07.20',
    time: '13:00',
    title: '映画「夏の約束」舞台挨拶',
    actress: '有村架純',
    type: 'event',
    venue: 'TOHOシネマズ 六本木',
    description: '初日舞台挨拶',
  },
  {
    id: '4',
    date: '2025.07.25',
    time: '21:00',
    title: 'オールナイトニッポン',
    actress: '白石聖',
    type: 'radio',
    channel: 'ニッポン放送',
    description: 'スペシャルゲスト出演',
  },
  {
    id: '5',
    date: '2025.08.01',
    title: '映画「真夏の奇跡」',
    actress: '戸田恵梨香',
    type: 'movie',
    description: '全国ロードショー',
  },
  {
    id: '6',
    date: '2025.08.10',
    time: '14:00',
    title: 'AURA ファンミーティング2025',
    actress: 'AURA所属女優',
    type: 'event',
    venue: '東京国際フォーラム',
    description: '所属女優総出演',
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case 'tv':
      return <Tv className="w-5 h-5" />
    case 'movie':
      return <Film className="w-5 h-5" />
    case 'radio':
      return <Radio className="w-5 h-5" />
    case 'event':
      return <MapPin className="w-5 h-5" />
    default:
      return <Calendar className="w-5 h-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'tv':
      return 'bg-blue-100 text-blue-800'
    case 'movie':
      return 'bg-purple-100 text-purple-800'
    case 'radio':
      return 'bg-green-100 text-green-800'
    case 'event':
      return 'bg-pink-100 text-pink-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function SchedulePage() {
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
          <h1 className="text-5xl font-light tracking-widest">SCHEDULE</h1>
          <div className="mt-4 w-20 h-0.5 bg-gray-800 mx-auto" />
        </motion.div>

        {/* Calendar View */}
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Month Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-between mb-8 pb-4 border-b"
          >
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-2xl font-light">2025年 7月</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Schedule List */}
          <div className="space-y-4">
            {scheduleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex gap-6 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 group-hover:border-blue-200">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center min-w-[100px]">
                    <div className="text-3xl font-light text-gray-800">
                      {item.date.split('.')[2]}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.date.split('.')[1]}月
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                        {getIcon(item.type)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-medium mb-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                          <span className="font-medium">{item.actress}</span>
                          {item.time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {item.time}
                            </span>
                          )}
                          {item.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {item.venue}
                            </span>
                          )}
                          {item.channel && (
                            <span>{item.channel}</span>
                          )}
                        </div>
                        
                        {item.description && (
                          <p className="text-gray-600">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 text-sm font-light tracking-wider border border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300">
              さらに表示
            </button>
          </motion.div>
        </div>

        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`schedule-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${10 + i * 22}%`,
                top: `${15 + i * 20}%`,
                width: 40 + i * 15,
                height: 40 + i * 15,
                background: 'radial-gradient(circle, rgba(135, 206, 235, 0.06) 0%, transparent 70%)',
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, 8, 0],
              }}
              transition={{
                duration: 30 + i * 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 3,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}