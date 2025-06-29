'use client'

import { motion } from 'framer-motion'

interface LinkItem {
  title: string
  subtitle?: string
  description: string
  href: string
  gradient: string
}

const linkItems: LinkItem[] = [
  {
    title: 'AURA PRESS',
    subtitle: '会員制有料公式デジタルファンサイト',
    description: '舞台あいさつやCM撮影現場の様子がご覧いただける\nJOURNALやGALLERYなど\nほかでは見られないオリジナルコンテンツが満載です！',
    href: 'https://aurapress.com/',
    gradient: 'from-purple-500/10 to-pink-500/10'
  },
  {
    title: 'AURA Mail Order',
    description: 'AURA所属女優のオリジナルグッズ、\n出演作品のDVD&Blu-rayなど販売中！\nAURA公式オンラインショップならではの特典も満載！',
    href: 'https://aura-mailorder.com/',
    gradient: 'from-blue-500/10 to-green-500/10'
  }
]

export function LinkCollection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto grid gap-8 lg:grid-cols-2 max-w-6xl">
        {linkItems.map((item, index) => (
          <motion.article 
            key={item.title}
            className="bg-gray-50 p-12 text-center relative overflow-hidden group"
            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <h3 className="mb-4 text-2xl font-light relative z-10">
              {item.subtitle && (
                <motion.small 
                  className="block text-sm mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {item.subtitle}
                </motion.small>
              )}
              <motion.span 
                className="tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                {item.title}
              </motion.span>
            </h3>
            <motion.p 
              className="mb-8 text-sm leading-relaxed relative z-10 whitespace-pre-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              {item.description}
            </motion.p>
            <motion.a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-sm font-light tracking-wider border border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 relative z-10 overflow-hidden group/btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">More →</span>
              <motion.span
                className="absolute inset-0 bg-gray-800"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}