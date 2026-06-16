import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'Kora',
    category: 'Consulting Site',
    src: 'https://i.pinimg.com/736x/d2/d7/e0/d2d7e0a8bbf47c7b096d9bf48dbdcb0b.jpg',
  },
  {
    title: 'KYMA',
    category: 'SaaS Platform',
    src: 'https://i.pinimg.com/736x/98/93/b0/9893b082ede71c7e17498398b2a57125.jpg',
  },
  {
    title: 'Mugen',
    category: 'Brand & Web',
    src: 'https://i.pinimg.com/1200x/22/01/fb/2201fbdaf413f2102e2326d3203ca0c6.jpg',
  },
  {
    title: 'Axiom',
    category: 'Mobile App',
    src: 'https://i.pinimg.com/736x/d2/d7/e0/d2d7e0a8bbf47c7b096d9bf48dbdcb0b.jpg',
  },
]

export default function MyProjects() {
  const sectionRef = useRef(null)
  const gridRef     = useRef(null)
  const headingRef  = useRef(null)
  const slotRefs    = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {

      // Heading blur reveal on scroll enter
      gsap.fromTo(
        headingRef.current,
        { filter: 'blur(12px)', opacity: 0, y: 30 },
        {
          filter: 'blur(0px)', opacity: 1, y: 0,
          duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )

      // Grid cards rise + unblur in a stagger as the grid enters
      gsap.fromTo(
        slotRefs.current,
        { filter: 'blur(10px)', opacity: 0, y: 60, scale: 0.95 },
        {
          filter: 'blur(0px)', opacity: 1, y: 0, scale: 1,
          duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full bg-surface"
    >
      <div className="max-w-6xl mx-auto border-x border-surface-border px-10 py-24">

        {/* Section heading */}
        <div ref={headingRef} className="mb-14">
          <p className="font-body text-sm font-medium tracking-widest uppercase text-text-muted mb-3">
            / Selected Work
          </p>
          <h2 className="font-display font-medium tracking-tighter text-text-primary" style={{ fontSize: '56px', lineHeight: '56px' }}>
            Latest projects
          </h2>
        </div>

        {/* 2x2 grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => (slotRefs.current[i] = el)}
              className="group relative rounded-2xl overflow-hidden border border-surface-border cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="flex items-center gap-2 text-white font-display font-semibold text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View project
                    <span className="text-lg">→</span>
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between px-5 py-4 bg-surface">
                <span className="font-display font-semibold text-base text-text-primary">
                  {project.title}
                </span>
                <span className="font-body text-xs tracking-widest uppercase text-text-muted">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}