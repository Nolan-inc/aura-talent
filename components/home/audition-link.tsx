'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function AuditionLink() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2 transform"
    >
      <Link
        href="/audition"
        className="block bg-gray-900 text-white py-4 px-2 writing-mode-vertical hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm tracking-wider relative -left-1 font-gesta">AUDITION</span>
      </Link>
    </motion.div>
  )
}