import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    // Expose lenis instance globally for smooth programmatic scrolling and anchor jumps
    window.lenis = lenis

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Sync Lenis RAF with GSAP ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)

    // Keep natural lag smoothing so frame drops don't cause sudden visual jumps
    gsap.ticker.lagSmoothing(500, 33)

    return () => {
      window.lenis = null
      lenis.destroy()
      gsap.ticker.remove(updateTicker)
    }
  }, [])
}
