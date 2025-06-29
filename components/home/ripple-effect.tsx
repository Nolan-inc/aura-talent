'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface RippleEffectProps {
  imageUrl: string
  className?: string
}

export function RippleEffect({ imageUrl, className = '' }: RippleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      containerRef.current.style.setProperty('--mouse-x', `${x}%`)
      containerRef.current.style.setProperty('--mouse-y', `${y}%`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`ripple-container ${className}`}
      style={{
        '--image-url': `url(${imageUrl})`,
      } as React.CSSProperties}
    >
      <div className="ripple-layer ripple-base" />
      <div className="ripple-layer ripple-wave-1" />
      <div className="ripple-layer ripple-wave-2" />
      <div className="ripple-layer ripple-wave-3" />
    </div>
  )
}