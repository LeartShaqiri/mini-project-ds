import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Services } from '../components/sections/Services'
import { Portfolio } from '../components/sections/Portfolio'
import { Stats } from '../components/sections/Stats'
import { Testimonials } from '../components/sections/Testimonials'
import { Pricing } from '../components/sections/Pricing'
import { FAQSection } from '../components/sections/FAQ'
import { Contact } from '../components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Stats />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <FAQSection />
      <Contact />
      <Footer />
    </main>
  )
}
