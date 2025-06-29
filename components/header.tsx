'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  isHomePage?: boolean
}

export function Header({ isHomePage = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500',
        isHomePage && !isScrolled
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-md shadow-sm',
        isScrolled && 'py-2',
        !isScrolled && 'py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between">
          {/* Burger Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label="Menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/aura_logo.png"
                alt="AURA"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Social Links */}
          <ul className="hidden items-center gap-4 lg:flex">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile/Desktop Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white"
          >
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            {/* Menu Logo */}
            <Link
              href="/"
              className="mb-12 inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/aura_logo.png"
                alt="AURA"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>

            {/* Menu Items */}
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-light tracking-wide hover:opacity-70 transition-opacity"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-2xl font-light tracking-wide hover:opacity-70 transition-opacity"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Social Links */}
            <ul className="mt-12 flex justify-center gap-6 lg:hidden">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>
      )}
    </AnimatePresence>
    </motion.header>
  )
}