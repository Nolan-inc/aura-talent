'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'

interface ScheduleItem {
  id: string
  date: string
  time?: string
  title: string
  actor: string
  type: 'tv' | 'movie' | 'event' | 'radio'
  venue?: string
  channel?: string
}

const upcomingSchedule: ScheduleItem[] = []

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

export function ScheduleSection() {
  const [displayCount, setDisplayCount] = useState(4)
  const [showAll, setShowAll] = useState(false)

  const handleShowMore = () => {
    if (displayCount < upcomingSchedule.length) {
      setDisplayCount(Math.min(displayCount + 4, upcomingSchedule.length))
    } else {
      setShowAll(true)
    }
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-4xl"
      >
        <motion.h2 
          className="mb-12 text-center text-3xl font-light tracking-wider"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Schedule
        </motion.h2>

        <ul className="space-y-px">
          {upcomingSchedule.slice(0, displayCount).map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="block border-t border-gray-200 py-6 transition-all duration-300 hover:bg-gray-50 hover:pl-4">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-8 group">
                  <motion.time 
                    className="text-sm text-gray-600 transition-colors group-hover:text-gray-900"
                    whileHover={{ x: 5 }}
                  >
                    {item.date}
                  </motion.time>
                  <motion.span 
                    className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded transition-all group-hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                  >
                    {getTypeLabel(item.type)}
                  </motion.span>
                  <h3 className="flex-1 text-lg transition-all duration-300 group-hover:translate-x-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
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
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          {!showAll ? (
            <motion.button
              onClick={handleShowMore}
              className="inline-block px-8 py-3 text-sm font-light tracking-wider border border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">More</span>
              <motion.span
                className="absolute inset-0 bg-gray-800"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/schedule"
                className="inline-block px-8 py-3 text-sm font-light tracking-wider border border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">View all →</span>
                <motion.span
                  className="absolute inset-0 bg-gray-800"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}