'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Process } from '@/components/sections/Process'
import { DemoSection } from '@/components/sections/DemoSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTASection } from '@/components/sections/CTASection'
import { Contact } from '@/components/sections/Contact'
import { MouseGlow } from '@/components/effects/MouseGlow'
import { ParticlesBackground } from '@/components/effects/ParticlesBackground'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

export default function App() {
  return (
    <>
      <ParticlesBackground />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <DemoSection />
        <Testimonials />
        <CTASection />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
