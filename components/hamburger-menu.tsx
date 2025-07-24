'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, X as XIcon } from 'lucide-react'

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: '/talent', label: 'Talent' },
    { href: '/news', label: 'News' },
      { href: '/fanclub', label: 'Fanclub' },
    { href: '/company-profile', label: 'Company Profile' },
    { href: '/recruit', label: 'Recruit' },
    { href: '/audition', label: 'Audition' },
    { href: '/contact', label: 'Contact' },
  ]


  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        onClick={() => {
          console.log('Hamburger clicked, current state:', isOpen)
          setIsOpen(!isOpen)
        }}
        className="flex flex-col items-center justify-center w-12 h-12 space-y-1.5 focus:outline-none relative z-[100000] bg-black/20 backdrop-blur-sm rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span
          className="block w-7 rounded-full origin-center bg-white shadow-sm"
          style={{ height: '2px' }}
        />
        <span
          className="block w-7 rounded-full origin-center bg-white shadow-sm"
          style={{ height: '2px' }}
        />
        <span
          className="block w-7 rounded-full origin-center bg-white shadow-sm"
          style={{ height: '2px' }}
        />
      </motion.button>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#2eb3bf] z-[100000]"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="fixed top-6 right-6 z-[100001] p-2 text-white hover:text-gray-300 transition-colors"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <XIcon className="w-8 h-8" />
            </motion.button>

            {/* Menu content */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative h-full w-full flex"
            >
              <div className="w-full max-w-md mx-auto flex flex-col">
                {/* Logo */}
                <div className="flex items-center h-[30vh] px-12">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer"
                    >
                      <Image
                        src="/aura_logo.png"
                        alt="AURA"
                        width={200}
                        height={60}
                        className="h-12 w-auto filter brightness-0 invert"
                      />
                    </motion.div>
                  </Link>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto">
                  <ul>
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                        className="border-b border-gray-600/50"
                      >
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-12 py-6 text-white hover:bg-white/5 transition-colors group"
                          >
                            <span className="text-lg font-light">{item.label}</span>
                            <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-12 py-6 text-white hover:bg-white/5 transition-colors group"
                          >
                            <span className="text-lg font-light">{item.label}</span>
                            <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>

          
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}