'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const handleWindowMouseLeave = () => setIsVisible(false)
    const handleWindowMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseleave', handleWindowMouseLeave)
    document.addEventListener('mouseenter', handleWindowMouseEnter)

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"]'
      )
      
      hoverElements.forEach((element) => {
        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    addHoverListeners()

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseleave', handleWindowMouseLeave)
      document.removeEventListener('mouseenter', handleWindowMouseEnter)
      observer.disconnect()
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[99999] hidden lg:block"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 500,
        mass: 0.5,
      }}
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className={`h-6 w-6 rounded-full border-2 transition-colors duration-200 ${
          isHovering
            ? 'border-gray-600 bg-black/10'
            : 'border-gray-800 bg-transparent'
        }`}
      />
    </motion.div>
  )
}