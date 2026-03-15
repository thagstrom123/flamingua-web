import Hero from './sections/Hero'
import PainPoints from './sections/PainPoints'
import Features from './sections/Features'
import HowItWorks from './sections/HowItWorks'
import Pricing from './sections/Pricing'
import FounderStory from './sections/FounderStory'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'

export default function App() {
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
