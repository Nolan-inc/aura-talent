'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = [
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
    <motion.footer 
      className="relative bg-gray-100 pt-16 pb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors shadow-lg"
        aria-label="Back to top"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200 }}
        viewport={{ once: true }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

      <div className="container mx-auto px-4 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link href="/" className="inline-block mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/aura_logo.png"
                alt="AURA"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </motion.div>
          </Link>
        </motion.div>

        {/* Footer Links */}
        <motion.ul 
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {footerLinks.map((link, index) => (
            <motion.li 
              key={link.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
            >
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              )}
            </motion.li>
          ))}
        </motion.ul>

        {/* Social Links */}
        <motion.ul 
          className="flex justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((social, index) => (
            <motion.li 
              key={social.label}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors inline-block"
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Copyright */}
        <motion.p 
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
        >
          ©Aura Talent ALL RIGHTS RESERVED.
        </motion.p>
      </div>
    </motion.footer>
  )
}