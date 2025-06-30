import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroBanner } from '@/components/home/hero-banner'
import { NewsSection } from '@/components/home/news-section'
import { ActressMarquee } from '@/components/home/actress-marquee'
import { AuditionLink } from '@/components/home/audition-link'
import { LinkCollection } from '@/components/home/link-collection'
import { ScheduleSection } from '@/components/home/schedule-section'

export default function Home() {
  return (
    <>
      <Header isHomePage />
      <AuditionLink />
      <main className="relative">
        <HeroBanner />
        <div className="relative bg-white">
          <NewsSection />
          <ScheduleSection />
        </div>
        <ActressMarquee />
        <LinkCollection />
      </main>
      <Footer />
    </>
  )
}