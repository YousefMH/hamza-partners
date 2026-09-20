import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import { FeaturedService } from '@/components/FeaturedService'
import { WhyUs } from '@/components/WhyUs'
import { Industries } from '@/components/Industries'
import { Team } from '@/components/Team'
import { Stats } from '@/components/Stats'
import { Experience } from '@/components/Experience'
import { Articles } from '@/components/Articles'
import { CTA } from '@/components/CTA'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <FeaturedService />
        <WhyUs />
        <Industries />
        <Team />
        <Stats />
        <Experience />
        <Articles />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
