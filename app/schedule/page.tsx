'use client'

import { useState } from 'react'
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
    date: '2025.07.05',
    time: '21:00',
    title: 'Moonlight Echoes',
    actress: 'Yuki Tanaka',
    type: 'tv',
    channel: 'NHK Premium',
    description: '新感覚ドラマシリーズ 第1話',
  },
  {
    id: '2',
    date: '2025.07.10',
    time: '22:00',
    title: 'The Velvet Hour',
    actress: 'Mika Sato',
    type: 'tv',
    channel: 'Netflix',
    description: 'オリジナルシリーズ配信開始',
  },
  {
    id: '3',
    date: '2025.07.15',
    time: '13:00',
    title: 'Summer Dreams プレミア上映会',
    actress: 'Rina Hayashi',
    type: 'event',
    venue: '六本木ヒルズ アリーナ',
    description: 'レッドカーペット＆舞台挨拶',
  },
  {
    id: '4',
    date: '2025.07.18',
    title: 'AURA Showcase 2025',
    actress: 'All AURA Talents',
    type: 'event',
    venue: 'Zepp DiverCity Tokyo',
    time: '18:00',
    description: '所属タレント総出演スペシャルイベント',
  },
  {
    id: '5',
    date: '2025.07.22',
    time: '24:00',
    title: 'Midnight Sessions',
    actress: 'Kana Yamamoto',
    type: 'radio',
    channel: 'J-WAVE',
    description: 'ゲストDJ出演',
  },
  {
    id: '6',
    date: '2025.07.28',
    title: 'Azure Sky',
    actress: 'Mai Suzuki',
    type: 'movie',
    description: '全国ロードショー',
  },
  {
    id: '7',
    date: '2025.08.03',
    time: '14:00',
    title: 'AURA FAN MEETING 2025',
    actress: 'AURA Talents',
    type: 'event',
    venue: '東京国際フォーラム ホールA',
    description: 'ファン感謝祭',
  },
  {
    id: '8',
    date: '2025.08.08',
    time: '20:00',
    title: 'Crystal Memories',
    actress: 'Yui Nakamura',
    type: 'tv',
    channel: 'TBS',
    description: 'スペシャルドラマ',
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
      return 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 shadow-blue-200/50'
    case 'movie':
      return 'bg-gradient-to-br from-sky-100 to-sky-200 text-sky-800 shadow-sky-200/50'
    case 'radio':
      return 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 shadow-green-200/50'
    case 'event':
      return 'bg-gradient-to-br from-pink-100 to-pink-200 text-pink-800 shadow-pink-200/50'
    default:
      return 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 shadow-gray-200/50'
  }
}

export default function SchedulePage() {
  const [selectedType, setSelectedType] = useState<string>('all')
  
  const filteredItems = selectedType === 'all' 
    ? scheduleItems 
    : scheduleItems.filter(item => item.type === selectedType)

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
          <h1 className="text-5xl font-light tracking-widest bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">SCHEDULE</h1>
          <p className="mt-4 text-gray-600 font-light">最新の出演情報をお届けします</p>
          <div className="mt-6 w-20 h-0.5 bg-gradient-to-r from-blue-400 to-sky-400 mx-auto" />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="container mx-auto px-4 max-w-5xl mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                selectedType === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg shadow-blue-300/50'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setSelectedType('tv')}
              className={`px-6 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                selectedType === 'tv'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg shadow-blue-300/50'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Tv className="inline w-4 h-4 mr-2" />
              TV番組
            </button>
            <button
              onClick={() => setSelectedType('movie')}
              className={`px-6 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                selectedType === 'movie'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg shadow-blue-300/50'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Film className="inline w-4 h-4 mr-2" />
              映画
            </button>
            <button
              onClick={() => setSelectedType('event')}
              className={`px-6 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                selectedType === 'event'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg shadow-blue-300/50'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <MapPin className="inline w-4 h-4 mr-2" />
              イベント
            </button>
            <button
              onClick={() => setSelectedType('radio')}
              className={`px-6 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                selectedType === 'radio'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg shadow-blue-300/50'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Radio className="inline w-4 h-4 mr-2" />
              ラジオ
            </button>
          </div>
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
            <h2 className="text-2xl font-light">2025年 7月 - 8月</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Schedule List */}
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex gap-6 p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 group-hover:border-blue-300/50 group-hover:-translate-y-1">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center min-w-[120px]">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 shadow-inner">
                      <div className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-sky-600 bg-clip-text text-transparent">
                        {item.date.split('.')[2]}
                      </div>
                      <div className="text-sm text-gray-600 font-medium mt-1">
                        {item.date.split('.')[1]}月
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {['日', '月', '火', '水', '木', '金', '土'][new Date(item.date.replace(/\./g, '-')).getDay()]}曜日
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full shadow-lg ${getTypeColor(item.type)}`}>
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
            <button className="px-10 py-4 text-sm font-light tracking-wider bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-300/50 hover:scale-105 transition-all duration-300">
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