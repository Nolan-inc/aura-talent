'use client'

import { useEffect } from 'react'

export function usePerformance() {
  useEffect(() => {
    // Only run in browser and development
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
      return
    }

    // Log Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          console.log('LCP:', lastEntry.startTime.toFixed(2), 'ms')
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            console.log('FID:', entry.processingStart - entry.startTime, 'ms')
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let cls = 0
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cls += (entry as any).value
            }
          }
          console.log('CLS:', cls.toFixed(3))
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        return () => {
          lcpObserver.disconnect()
          fidObserver.disconnect()
          clsObserver.disconnect()
        }
      } catch (e) {
        console.error('Performance monitoring error:', e)
        return undefined
      }
    }
    
    return undefined
  }, [])
}