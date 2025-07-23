import type { Metadata } from "next"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"
import { BubbleBackground } from "@/components/bubble-background"
import { LoadingAnimation } from "@/components/loading-animation"
import { HamburgerMenu } from "@/components/hamburger-menu"

export const metadata: Metadata = {
  title: "AURA official website",
  description: "AURA official website",
  openGraph: {
    title: "AURA official website",
    description: "",
    url: "https://www.aura.co.jp",
    siteName: "AURA official website",
    images: [
      {
        url: "/aura_logo.png",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="light">
      <head>
        <meta name="color-scheme" content="light only" />
        <link rel="stylesheet" href="https://use.typekit.net/khl1njd.css" />
      </head>
      <body className={`antialiased bg-white text-gray-900`}>
        <LoadingAnimation />
        <CustomCursor />
        <BubbleBackground />
        {/* Hamburger Menu positioned globally */}
        <div className="fixed top-6 right-6 z-[100002]">
          <HamburgerMenu />
        </div>
        <div className="c-app relative" id="app">
          {children}
        </div>
      </body>
    </html>
  )
}
