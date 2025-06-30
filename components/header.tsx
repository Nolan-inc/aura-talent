'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { HamburgerMenu } from './hamburger-menu'

interface HeaderProps {
  isHomePage?: boolean
}

export function Header({ isHomePage = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

          {/* Hamburger Menu - Right aligned */}
          <div className="ml-auto">
            <HamburgerMenu />
          </div>
        </div>
      </div>

    </motion.header>
  )
}