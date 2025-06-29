import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroBanner } from '@/components/home/hero-banner'
import { NewsSection } from '@/components/home/news-section'
import { ActressMarquee } from '@/components/home/actress-marquee'
import { AuditionLink } from '@/components/home/audition-link'
import { LinkCollection } from '@/components/home/link-collection'

export default function Home() {
  return (
    <>
      <Header isHomePage />
      <AuditionLink />
      <main className="relative">
        <HeroBanner />
        <div className="relative bg-white">
          <NewsSection />
          {/* Schedule Section - Placeholder */}
          <section className="py-20 px-4 bg-gray-50">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="mb-12 text-3xl font-light tracking-wider">Schedule</h2>
              <p className="text-gray-600">Schedule content coming soon...</p>
            </div>
          </section>
        </div>
        <ActressMarquee />
        <LinkCollection />
      </main>
      <Footer />
    </>
  )
}