'use client'

import { useEffect, useRef } from 'react'

interface WaterRippleProps {
  children: React.ReactNode
}

export function WaterRipple({ children }: WaterRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Canvas setup
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Ripple data
    const ripples: Array<{
      x: number
      y: number
      radius: number
      maxRadius: number
      speed: number
      opacity: number
    }> = []

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i]
        if (!ripple) continue
        
        // Draw ripple
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Update ripple
        ripple.radius += ripple.speed
        ripple.opacity = (1 - ripple.radius / ripple.maxRadius) * 0.5

        // Remove finished ripples
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }
    animate()

    // Mouse interaction
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      
      // Add small ripple on move
      if (Math.random() > 0.5) {
        ripples.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          radius: 0,
          maxRadius: 50,
          speed: 2,
          opacity: 0.5
        })
      }
    }

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      
      // Add larger ripple on click
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 150,
        speed: 4,
        opacity: 0.8
      })
    }

    // Add event listeners
    containerRef.current.addEventListener('pointermove', handlePointerMove)
    containerRef.current.addEventListener('pointerdown', handlePointerDown)

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (containerRef.current) {
        containerRef.current.removeEventListener('pointermove', handlePointerMove)
        containerRef.current.removeEventListener('pointerdown', handlePointerDown)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 10 }}
      />
    </div>
  )
}