import Hero from '../components/sections/Hero'
import PositioningStrip from '../components/sections/PositioningStrip'
import SelectedWork from '../components/sections/SelectedWork'
import Philosophy from '../components/sections/Philosophy'
import Capabilities from '../components/sections/Capabilities'
import MyProcess from '../components/sections/MyProcess'
import TrustSignals from '../components/sections/TrustSignals'
import SoftCTA from '../components/sections/SoftCTA'

export default function Home() {
  return (
    <>
      <Hero />
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
