import Hero from '../components/sections/Hero'
import PositioningStrip from '../components/sections/PositioningStrip'
import SelectedWork from '../components/sections/SelectedWork'
import Philosophy from '../components/sections/Philosophy'
import Capabilities from '../components/sections/Capabilities'
import MyProcess from '../components/sections/MyProcess'
import TrustSignals from '../components/sections/TrustSignals'
import SoftCTA from '../components/sections/SoftCTA'
import Testimonial from '../components/sections/Testimonial'
import Services from '../components/sections/Services'

export default function Home() {
  return (
    <>
      <Hero />

      <div id="floating-contact-trigger">
        <Testimonial />
      </div>

      <Services />
      <PositioningStrip />
      <SelectedWork />
      <Philosophy />
      <Capabilities />
      <MyProcess />
      <TrustSignals />
      <SoftCTA />
    </>
  )
}