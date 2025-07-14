'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

interface ScheduleItem {
  id: string
  date: string
  time?: string
  title: string
  actor: string
  type: 'tv' | 'movie' | 'event' | 'radio'
  venue?: string
  channel?: string
  description?: string
}

const scheduleItems: ScheduleItem[] = []

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'tv':
      return 'TV'
    case 'movie':
      return 'MOVIE'
    case 'event':
      return 'EVENT'
    case 'radio':
      return 'RADIO'
    default:
      return type.toUpperCase()
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
      <main className="relative min-h-screen pt-32 pb-20 text-gray-900">
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

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container mx-auto px-4 max-w-4xl mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-2 text-sm border transition-all duration-300 ${
                selectedType === 'all'
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'border-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setSelectedType('tv')}
              className={`px-6 py-2 text-sm border transition-all duration-300 ${
                selectedType === 'tv'
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'border-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              TV
            </button>
            <button
              onClick={() => setSelectedType('movie')}
              className={`px-6 py-2 text-sm border transition-all duration-300 ${
                selectedType === 'movie'
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'border-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              MOVIE
            </button>
            <button
              onClick={() => setSelectedType('event')}
              className={`px-6 py-2 text-sm border transition-all duration-300 ${
                selectedType === 'event'
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'border-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              EVENT
            </button>
            <button
              onClick={() => setSelectedType('radio')}
              className={`px-6 py-2 text-sm border transition-all duration-300 ${
                selectedType === 'radio'
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'border-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              RADIO
            </button>
          </div>
        </motion.div>

        {/* Schedule List */}
        <div className="container mx-auto px-4 max-w-4xl">

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
                <div className="flex flex-col lg:flex-row gap-6 p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                  {/* Date and Category */}
                  <div className="flex-shrink-0 lg:w-48">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                        {getTypeLabel(item.type)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                        <h2 className="text-xl mb-3 group-hover:text-tiffany-600 transition-colors">
                          {item.title}
                        </h2>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="font-medium">{item.actor}</span>
                          {item.time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.time}
                            </span>
                          )}
                          {item.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.venue}
                            </span>
                          )}
                          {item.channel && (
                            <span>{item.channel}</span>
                          )}
                        </div>
                        
                        {item.description && (
                          <p className="text-gray-600 mt-3 leading-relaxed">{item.description}</p>
                        )}
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
              もっと見る
            </button>
          </motion.div>
        </div>

        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`schedule-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 25}%`,
                width: 60 + i * 20,
                height: 60 + i * 20,
                background: 'radial-gradient(circle, rgba(10, 186, 181, 0.08) 0%, transparent 70%)',
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 20 + i * 5,
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