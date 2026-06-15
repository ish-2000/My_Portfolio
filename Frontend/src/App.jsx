import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppRouter from './routes/AppRouter'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return <AppRouter />
}
