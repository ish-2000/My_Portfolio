import useLenis from '../../hooks/useLenis'
import Navbar from './Navbar'
import Footer from './Footer'
import BottomBlurCTA from '../common/BottomBlurCTA'

export default function WebLayout({ children }) {
  useLenis()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <BottomBlurCTA />
    </div>
  )
}