import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroBanner } from '@/components/home/hero-banner'
import { NewsSection } from '@/components/home/news-section'
import { ActorMarquee } from '@/components/home/actor-marquee'
import { AuditionLink } from '@/components/home/audition-link'
import { LinkCollection } from '@/components/home/link-collection'

export default function Home() {
  return (
    <>
      <Header isHomePage />
      <AuditionLink />
      <main className="relative text-gray-900">
        <HeroBanner />
        <div className="relative">
          <NewsSection />
            </div>
        <ActorMarquee />
        <LinkCollection />
      </main>
      <Footer />
    </>
  )
}