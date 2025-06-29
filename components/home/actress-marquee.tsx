'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Actress {
  id: string
  name: string
  nameJa: string
  slug: string
  marqueeImage: string
}

const actresses: Actress[] = [
  {
    id: '1',
    name: 'Sei Shiraishi',
    nameJa: '白石聖',
    slug: 'sei_shiraishi',
    marqueeImage: '/talent/acprof_fv_SeiShiraishi202505_02.jpg',
  },
  {
    id: '2',
    name: 'Kasumi Arimura',
    nameJa: '有村架純',
    slug: 'kasumi_arimura',
    marqueeImage: '/talent/actress_thumb_202410_arimura-1.jpg',
  },
  {
    id: '3',
    name: 'Eiko Karata',
    nameJa: '唐田えりか',
    slug: 'eiko_karata',
    marqueeImage: '/talent/marquee_img__0007_karata.jpg',
  },
  {
    id: '4',
    name: 'Han Hyo-joo',
    nameJa: 'ハン・ヒョジュ',
    slug: 'han_hyo_joo',
    marqueeImage: '/talent/marquee_img__0010_hyo-joo.jpg',
  },
  {
    id: '5',
    name: 'Michiko Kichise',
    nameJa: '吉瀬美智子',
    slug: 'michiko_kichise',
    marqueeImage: '/talent/marquee_img__0013_kichise.jpg',
  },
  {
    id: '6',
    name: 'Erika Toda',
    nameJa: '戸田恵梨香',
    slug: 'erika_toda',
    marqueeImage: '/talent/marquee_img__0015_toda.jpg',
  },
]

export function ActressMarquee() {
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