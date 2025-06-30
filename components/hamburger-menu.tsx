'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, X as XIcon } from 'lucide-react'

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: '/actress', label: 'Actress' },
    { href: '/news', label: 'News' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/fanclub', label: 'Fanclub' },
    { href: '/company-profile', label: 'Company Profile' },
    { href: '/recruit', label: 'Recruit' },
    { href: '/audition', label: 'Audition' },
    { href: 'https://aura-mailorder.com/', label: 'Mail Order', external: true },
  ]

  const socialLinks = [
    { href: 'https://twitter.com/FLaMme_ject/', icon: 'X', label: 'X (Twitter)' },
    { href: 'https://www.instagram.com/flamme_official_film/', icon: 'Instagram', label: 'Instagram' },
    { href: 'https://www.youtube.com/user/FLaMmeject', icon: 'YouTube', label: 'YouTube' },
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
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center w-12 h-12 space-y-1.5 focus:outline-none relative z-[9998]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span
          className="block w-7 rounded-full origin-center"
          style={{ backgroundColor: '#4A5F7A', height: '0.75px' }}
        />
        <span
          className="block w-7 rounded-full origin-center"
          style={{ backgroundColor: '#4A5F7A', height: '0.75px' }}
        />
        <span
          className="block w-7 rounded-full origin-center"
          style={{ backgroundColor: '#4A5F7A', height: '0.75px' }}
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
            className="fixed inset-0 bg-[#4A5F7A] z-[9999]"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="fixed top-6 right-6 z-[10001] p-2 text-white hover:text-gray-300 transition-colors"
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
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Image
                      src="/aura_logo.png"
                      alt="AURA"
                      width={200}
                      height={60}
                      className="h-12 w-auto filter brightness-0 invert"
                    />
                  </motion.div>
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

                {/* Social Links */}
                <div className="h-[15vh] flex items-center justify-start px-12 space-x-8">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="text-white/60 hover:text-white transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon === 'X' && (
                        <XIcon className="w-6 h-6" />
                      )}
                      {social.icon === 'Instagram' && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                        </svg>
                      )}
                      {social.icon === 'YouTube' && (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}