import { useEffect } from 'react'
import Hero from './sections/Hero'
import PainPoints from './sections/PainPoints'
import Features from './sections/Features'
import HowItWorks from './sections/HowItWorks'
import Pricing from './sections/Pricing'
import FounderStory from './sections/FounderStory'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'

export default function App() {
  // Capture source parameter and store it for tracking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const src = params.get('src')

    if (src) {
      // Store the source in localStorage for later use when clicking store buttons
      localStorage.setItem('flamingua_source', src)

      // Clean up URL (optional - removes ?src=reddit from address bar)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  return (
    <>
      <Hero />
      <PainPoints />
      <Features />
      <HowItWorks />
      <Pricing />
      <FounderStory />
      {/* <StarterPack /> */}
      <FAQ />
      <Footer />
    </>
  )
}
