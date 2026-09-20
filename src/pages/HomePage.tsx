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
import { SectionDivider } from '@/components/Decorative/SectionDivider'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <SectionDivider surface="ivory" />
        <Services />
        <SectionDivider surface="white" />
        <FeaturedService />
        <SectionDivider surface="charcoal" />
        <WhyUs />
        <SectionDivider surface="ivory" />
        <Industries />
        <SectionDivider surface="white" />
        <Team />
        <SectionDivider surface="ivory" />
        <Stats />
        <SectionDivider surface="charcoal" />
        <Experience />
        <SectionDivider surface="white" />
        <Articles />
        <SectionDivider surface="ivory" />
        <CTA />
        <SectionDivider surface="charcoal" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
