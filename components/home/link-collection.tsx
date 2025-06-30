'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface LinkItem {
  title: string
  subtitle?: string
  description: string
  href: string
  image?: string
  accent: string
}

const linkItems: LinkItem[] = [
  {
    title: 'AURA PRESS',
    subtitle: '会員制有料公式デジタルファンサイト',
    description: '舞台裏の様子や撮影現場の独占映像、\n特別インタビューなど\n限定コンテンツが満載',
    href: 'https://aurapress.com/',
    accent: 'from-sky-400 to-blue-500'
  },
  {
    title: 'AURA Mail Order',
    subtitle: 'オフィシャルオンラインショップ',
    description: 'オリジナルグッズや出演作品、\n限定特典付きアイテムを\n取り揃えています',
    href: 'https://aura-mailorder.com/',
    accent: 'from-blue-400 to-sky-500'
  }
]

export function LinkCollection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-300 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light tracking-wider mb-4">SPECIAL CONTENTS</h2>
          <div className="w-24 h-0.5 bg-gray-800 mx-auto" />
        </motion.div>

        {/* Links Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {linkItems.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group block"
            >
              <div className="relative h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-gray-300 transition-all duration-500">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-10">
                  {/* Top Section */}
                  <div>
                    {/* Title and Subtitle */}
                    <div className="mb-8">
                      {item.subtitle && (
                        <p className="text-sm text-gray-600 mb-2 tracking-wider">
                          {item.subtitle}
                        </p>
                      )}
                      <h3 className="text-3xl font-light tracking-wider group-hover:text-sky-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Section - CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      詳しく見る
                    </span>
                    <motion.div
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white group-hover:bg-sky-600 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -bottom-20 -right-20 w-40 h-40 bg-sky-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -top-10 -left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-gray-600">
            AURAの特別なコンテンツをお楽しみください
          </p>
        </motion.div>
      </div>
    </section>
  )
}