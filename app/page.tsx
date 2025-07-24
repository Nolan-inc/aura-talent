import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroBanner } from '@/components/home/hero-banner'
import { NewsSection } from '@/components/home/news-section'
import { ActorMarquee } from '@/components/home/actor-marquee'
import { AuditionLink } from '@/components/home/audition-link'
import { FullPageRipple } from '@/components/home/full-page-ripple'
import { SparkleBackground } from '@/components/sparkle-background'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#4BA3A3] relative">
      <SparkleBackground />
      <div className="relative z-10">
        <Header isHomePage />
        <AuditionLink />
        <FullPageRipple>
          <main className="relative text-white">
            <HeroBanner />
            <div className="relative">
              <NewsSection />
            </div>
            <ActorMarquee />
          </main>
          <Footer />
        </FullPageRipple>
      </div>
    </div>
  )
}