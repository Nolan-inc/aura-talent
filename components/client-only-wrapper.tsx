'use client'

import dynamic from 'next/dynamic'

export const ClientOnlyCustomCursor = dynamic(
  () => import('./custom-cursor').then(mod => mod.CustomCursor),
  { ssr: false }
)

export const ClientOnlyBubbleBackground = dynamic(
  () => import('./bubble-background').then(mod => mod.BubbleBackground),
  { ssr: false }
)