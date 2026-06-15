import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import ProfileImg from '../../assets/images/Me.png'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = ['Work', 'Services', 'Pricing', 'Blog']

const LOGOS = [
  { name: 'Figma',      icon: '/icons/figma.svg' },
  { name: 'React',      icon: '/icons/react.svg' },
  { name: 'Node.js',    icon: '/icons/nodedotjs.svg' },
  { name: 'MongoDB',    icon: '/icons/mongodb.svg' },
  { name: 'Tailwind',   icon: '/icons/tailwindcss.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'Express',    icon: '/icons/express.svg' },
  { name: '9gag',       icon: '/icons/9gag.svg' },
  { name: 'Firebase',   icon: '/icons/firebase.svg' },
  { name: 'GitHub',     icon: '/icons/github.svg' },
]

const PROJECT_IMAGES = [
  {
    src: 'https://i.pinimg.com/736x/d2/d7/e0/d2d7e0a8bbf47c7b096d9bf48dbdcb0b.jpg',
    alt: 'Project 1',
  },
  {
    src: 'https://i.pinimg.com/736x/98/93/b0/9893b082ede71c7e17498398b2a57125.jpg',
    alt: 'Project 2',
  },
  {
    src: 'https://i.pinimg.com/1200x/22/01/fb/2201fbdaf413f2102e2326d3203ca0c6.jpg',
    alt: 'Project 3',
  },
]

const CLIENT_PHOTOS = [
  'https://i.pravatar.cc/150?img=32',
  'https://i.pravatar.cc/150?img=47',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=68',
  'https://i.pravatar.cc/150?img=11',
]

// ── Blur reveal helper ──
// Animates an element from blurred+offset to sharp+position
// This matches the Framer "blur appear" effect exactly
function blurReveal(target, { delay = 0, duration = 0.9, y = 16 } = {}) {
  gsap.fromTo(
    target,
    {
      filter: 'blur(12px)',
      opacity: 0,
      y,
    },
    {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
    }
  )
}

export default function Hero() {
  const sectionRef  = useRef(null)
  const availRef    = useRef(null)
  const headlineRef = useRef(null)
  const sublineRef  = useRef(null)
  const ctaRef      = useRef(null)
  const clientRef   = useRef(null)
  const stripRef    = useRef(null)
  const card1Ref    = useRef(null)
  const card2Ref    = useRef(null)
  const card3Ref    = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {

      // ── ANIMATION SEQUENCE ──
      // 0.0s  CTA button      — appears first, fastest
      // 0.15s Availability pill
      // 0.25s Headline        — main content, dramatic blur
      // 0.55s Subline
      // 0.70s Image cards     — stagger in alongside content
      // 0.85s Happy clients   — after content settles
      // 0.95s Tech strip      — last, quick fade

      // 1. CTA — first and fastest (0.6s)
      blurReveal(ctaRef.current, { delay: 0.0, duration: 0.9, y: 10 })

      // 2. Availability pill
      blurReveal(availRef.current, { delay: 0.15, duration: 0.7, y: 10 })

      // 3. Headline — most dramatic blur, hero moment
      blurReveal(headlineRef.current, { delay: 0.25, duration: 1.1, y: 20 })

      // 4. Subline
      blurReveal(sublineRef.current, { delay: 0.55, duration: 0.9, y: 16 })

      // 5. Image cards — stagger blur reveal
      gsap.fromTo(
        [card1Ref.current, card2Ref.current, card3Ref.current],
        { filter: 'blur(8px)', opacity: 0, y: 40 },
        {
          filter: 'blur(0px)', opacity: 1, y: 0,
          duration: 1.0, stagger: 0.15, delay: 0.3, ease: 'power2.out',
        }
      )

      // 6. Happy clients — after content settles
      blurReveal(clientRef.current, { delay: 0.85, duration: 0.6, y: 8 })

      // 7. Tech stack strip — last, short and snappy
      gsap.fromTo(
        stripRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.95, ease: 'power2.out' }
      )

      // ── 6. Card scroll parallax ──
      ;[
        { ref: card1Ref, y: -20 },
        { ref: card2Ref, y: -40 },
        { ref: card3Ref, y: -60 },
      ].forEach(({ ref, y }) => {
        gsap.to(ref.current, {
          y,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="w-full overflow-hidden bg-surface">
      <div className="max-w-6xl mx-auto border-x border-surface-border min-h-screen bg-surface flex flex-col relative">

        {/* ══════════════════════════════
            NAVBAR
        ══════════════════════════════ */}
        <nav className="flex justify-center px-6 py-7">
          <div className="flex items-center bg-surface border border-black rounded-pill py-2 pr-2 pl-2">

            <div className="flex items-center gap-3 pl-1 pr-16">
              <img
                src={ProfileImg}
                alt="Ishara Udayanga"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="font-display font-semibold text-sm text-text-secondary tracking-tight">
                Ishara Udayanga
              </span>
            </div>

            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="font-body font-semibold text-sm text-text-secondary hover:text-text-muted transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <Link
                to="/lets-talk"
                className="bg-surface border border-surface-border text-text-secondary font-display font-medium text-sm px-5 py-2 rounded-pill hover:bg-surface-offwhite transition-colors"
              >
                Contact
              </Link>
            </div>

          </div>
        </nav>

        {/* ══════════════════════════════
            HERO BODY
        ══════════════════════════════ */}
        <section className="flex-1 flex items-center px-10 pb-10 w-full">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-2">

            {/* ── LEFT ── */}
            <div className="flex flex-col">

              {/* Availability pill */}
              <div
                ref={availRef}
                className="inline-flex items-center gap-2 bg-surface border border-surface-border rounded-pill px-4 py-1.5 mb-7 w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-success flex-shrink-0 pulse-dot" />
                <span className="font-display font-semibold text-sm text-text-secondary tracking-tight">
                  Available for August&apos;25
                </span>
              </div>

              {/* Headline — blur reveal as one block like Framer */}
              <h1 ref={headlineRef} className="mb-5">
                <span
                  className="block font-display font-medium tracking-tighter"
                  style={{ fontSize: '72px', lineHeight: '68px', color: '#828282' }}
                >
                  Design that
                </span>
                <span
                  className="block font-display font-medium tracking-tighter"
                  style={{ fontSize: '72px', lineHeight: '78px', color: '#000000' }}
                >
                  delivers results.
                </span>
              </h1>

              {/* Subline */}
              <p
                ref={sublineRef}
                className="font-display text-lg text-text-body leading-relaxed max-w-md mb-8"
              >
                <strong className="text-text-secondary font-semibold">
                  Strategic design that drives growth, not just looks good.
                </strong>
                {' '}I create everything your brand needs
                to attract customers and turn them into sales.
              </p>

              {/* CTA */}
              <div ref={ctaRef}>
                <Link to="/lets-talk">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-3 bg-dark text-dark-text rounded-pill font-display font-semibold text-sm pr-6 pl-1.5 py-1.5 cursor-pointer shadow-xl shadow-black/20 w-fit"
                  >
                    <img
                      src="https://i.pravatar.cc/150?img=11"
                      alt="Ishara"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    Book a call with me
                  </motion.div>
                </Link>
              </div>

            </div>

            {/* ── RIGHT — stacked image cards ── */}
            <div className="hidden lg:flex relative h-[500px] items-start justify-end">
              <div className="relative w-full h-full">

                <div
                  ref={card1Ref}
                  className="absolute right-4 top-15 w-80 h-56 rotate-6 z-10 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={PROJECT_IMAGES[0].src}
                    alt={PROJECT_IMAGES[0].alt}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                <div
                  ref={card2Ref}
                  className="absolute right-32 top-17 w-80 h-56 -rotate-6 z-20 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={PROJECT_IMAGES[1].src}
                    alt={PROJECT_IMAGES[1].alt}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>

                <div
                  ref={card3Ref}
                  className="absolute right-10 top-25 w-80 h-56 rotate-2 z-30 rounded-xl overflow-hidden shadow-2xl border-4 border-surface"
                >
                  <img
                    src={PROJECT_IMAGES[2].src}
                    alt={PROJECT_IMAGES[2].alt}
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════
            BOTTOM BLUR GLOW
        ══════════════════════════════ */}
        <div
          className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 w-screen h-36 z-10"
          style={{
            background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(0,0,0,0.07) 0%, transparent 70%)',
          }}
        />

        {/* ══════════════════════════════
            FULL-WIDTH BORDER LINE
        ══════════════════════════════ */}
        <div className="relative h-px flex-shrink-0">
          <div className="absolute left-1/2 -translate-x-1/2 w-screen h-px bg-surface-border" />
        </div>

        {/* ══════════════════════════════
            BOTTOM STRIP
        ══════════════════════════════ */}
        <div className="flex items-stretch h-16 bg-surface relative z-20">

          {/* Left — fixed */}
          <div ref={clientRef} className="flex items-center gap-3 py-2 px-8 border-r border-surface-border flex-shrink-0">
            <div className="flex items-center">
              {CLIENT_PHOTOS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Client ${i + 1}`}
                  className={`w-8 h-8 rounded-full border-2 border-surface object-cover flex-shrink-0 ${i !== 0 ? '-ml-2' : ''}`}
                />
              ))}
            </div>
            <div className="hidden sm:block">
              <div className="text-warning text-sm leading-none tracking-widest">★★★★★</div>
              <div className="font-display text-sm text-text-muted mt-0.5">
                <strong className="text-text-secondary font-medium">99+ Happy clients</strong>
              </div>
            </div>
          </div>

          {/* Right — marquee */}
          <div ref={stripRef} className="flex-1 overflow-hidden marquee-container flex items-center">
            <div className="flex items-center w-max h-full animate-marquee">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="flex items-center gap-3 px-6 h-full flex-shrink-0"
                >
                  <div className="w-9 h-9 bg-surface flex items-center justify-center flex-shrink-0">
                    <img
                      src={logo.icon}
                      alt={logo.name}
                      className="w-7 h-7 opacity-70"
                    />
                  </div>
                  <span className="font-display font-semibold text-md text-text-muted tracking-tight whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}