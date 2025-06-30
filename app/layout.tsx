import type { Metadata } from "next"
import { Shippori_Mincho } from "next/font/google"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"
import { BubbleBackground } from "@/components/bubble-background"
import { LoadingAnimation } from "@/components/loading-animation"
import { HamburgerMenu } from "@/components/hamburger-menu"

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

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
    <html lang="ja">
      <body className={`${shipporiMincho.variable} antialiased`}>
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
