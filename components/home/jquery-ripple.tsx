'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

interface JQueryRippleProps {
  children: React.ReactNode
  imageUrl: string
}

declare global {
  interface Window {
    $: any
    jQuery: any
  }
}

export function JQueryRipple({ children, imageUrl }: JQueryRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    const initializeRipples = () => {
      if (!window.$ || !containerRef.current || isInitialized.current) return

      const $ = window.$
      const $container = $(containerRef.current)

      // jQuery.ripplesが利用可能か確認
      if (typeof $container.ripples === 'function') {
        try {
          $container.ripples({
            resolution: 256, // 解像度を下げてパフォーマンス向上
            dropRadius: 30,
            perturbance: 0.04, // 揺らぎを弱めて安定性向上
            interactive: true
          })
          isInitialized.current = true
        } catch (error) {
          console.error('Failed to initialize ripples:', error)
        }
      }
    }

    // DOMが準備できたら初期化
    if (document.readyState === 'complete') {
      initializeRipples()
    } else {
      window.addEventListener('load', initializeRipples)
    }

    return () => {
      if (window.$ && containerRef.current && isInitialized.current) {
        try {
          const $container = window.$(containerRef.current)
          if (typeof $container.ripples === 'function') {
            $container.ripples('destroy')
          }
        } catch (error) {
          console.error('Failed to destroy ripples:', error)
        }
      }
      window.removeEventListener('load', initializeRipples)
    }
  }, [])

  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/jquery.ripples.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.$ && containerRef.current && !isInitialized.current) {
            const $ = window.$
            const $container = $(containerRef.current)
            if (typeof $container.ripples === 'function') {
              try {
                $container.ripples({
                  resolution: 256, // 解像度を下げてパフォーマンス向上
                  dropRadius: 30,
                  perturbance: 0.04, // 揺らぎを弱めて安定性向上
                  interactive: true
                })
                isInitialized.current = true
              } catch (error) {
                console.error('Failed to initialize ripples on load:', error)
              }
            }
          }
        }}
      />
      <div 
        ref={containerRef} 
        className="relative w-full h-full overflow-hidden"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {children}
      </div>
    </>
  )
}