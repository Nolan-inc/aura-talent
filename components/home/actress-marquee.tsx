'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Actress {
  id: string
  name: string
  nameJa: string
  slug: string
  marqueeImage: string
}

interface ApiActress {
  id: string
  title: string
  slug: string
  thumbnail: {
    url: string
    alt: string
  }
}

interface ApiResponse {
  success: boolean
  data: ApiActress[]
}

export function ActressMarquee() {
  const [actresses, setActresses] = useState<Actress[]>([])

  useEffect(() => {
    const fetchActresses = async () => {
      try {
        const response = await fetch(
          'http://localhost:3003/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?type=card&category_id=d9ac59d2-4356-4b0f-aa00-8713a909962f'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data: ApiResponse = await response.json()
        
        const mappedActresses: Actress[] = data.data.map((item) => ({
          id: item.id,
          name: item.slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // slugを英語名として使用
          nameJa: item.title,
          slug: item.slug,
          marqueeImage: item.thumbnail.url
        }))

        setActresses(mappedActresses)
      } catch (error) {
        console.error('Error fetching actresses:', error)
        // エラー時は空配列
        setActresses([])
      }
    }

    fetchActresses()
  }, [])
  return (
    <section className="py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="mb-12 text-center text-3xl font-light tracking-wider"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Actress
        </motion.h2>

        {/* Desktop Marquee */}
        <div className="hidden lg:block">
          <MarqueeRow actresses={actresses} />
        </div>

        {/* Mobile Marquee */}
        <div className="lg:hidden">
          <MarqueeRow actresses={actresses.slice(0, 4)} />
          <MarqueeRow actresses={actresses.slice(4)} reverse />
        </div>

        <div className="mt-12 text-center lg:text-right lg:pr-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/actress"
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
        </div>
      </motion.div>
    </section>
  )
}

function MarqueeRow({ actresses, reverse = false }: { actresses: Actress[], reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden py-4">
      <motion.div
        animate={{
          x: reverse ? [0, -100 * actresses.length] : [-100 * actresses.length, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
        className="flex"
      >
        {[...actresses, ...actresses].map((actress, index) => (
          <motion.div
            key={`${actress.id}-${index}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-shrink-0 px-4"
          >
            <Link
              href={`/actress/${actress.slug}`}
              className="block hover:opacity-90 transition-opacity relative group"
            >
              <img
                src={actress.marqueeImage}
                alt={actress.nameJa}
                className="h-64 w-auto object-contain"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
              >
                <p className="text-white text-lg font-light">{actress.nameJa}</p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}