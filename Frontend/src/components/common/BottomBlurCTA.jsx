import { useEffect, useState } from 'react'
import { Mail, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * BottomBlurCTA
 *
 * A fixed bottom overlay that:
 * 1. Blurs page content that scrolls *behind* it (not the content itself).
 * 2. Uses a CSS mask to fade the blur from transparent (top) to full (bottom).
 * 3. Renders a floating glass CTA pill above the blur zone.
 *
 * The page text is never touched — only what passes behind the overlay gets blurred.
 */
export default function BottomBlurCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const trigger = document.getElementById('floating-contact-trigger')

    const handleScroll = () => {
      if (!trigger) {
        setIsVisible(window.scrollY > window.innerHeight * 0.7)
        return
      }
      const triggerTop = trigger.getBoundingClientRect().top + window.scrollY
      const showPoint = triggerTop - window.innerHeight * 0.65
      setIsVisible(window.scrollY >= showPoint)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <>
      {/* ── Blur overlay ──────────────────────────────────────────────────── */}
      {/*
        This div sits fixed at the bottom of the viewport.
        backdrop-filter blurs whatever is rendered *beneath* it in the stacking order.
        The CSS mask-image fades it from fully transparent at the top to fully
        opaque at the bottom, so the blur appears to "come in" gradually.
        pointer-events-none ensures scrolling / clicking still works normally.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 w-full z-40"
        style={{
          // Tall enough that content gradually scrolls INTO the blur zone.
          // The mask makes the top 30% fully transparent, then fades to full blur.
          height: '55px',
          backdropFilter: 'blur(4px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(4px) saturate(1.6)',
          // Mask: top 30% = transparent (no blur), 30–65% = fade in, 65%→100% = full blur
          maskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 30%, black 65%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 30%, black 65%, black 100%)',
          // Very subtle background tint – keeps it natural, not heavy
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(248,248,248,0.06) 60%, rgba(248,248,248,0.14) 100%)',
        }}
      />

      {/* ── Floating CTA pill ─────────────────────────────────────────────── */}
      <div
        className={`
          fixed z-50 bottom-8 left-1/2 -translate-x-1/2
          transition-all duration-500 ease-out
          ${isVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-10 opacity-0 pointer-events-none'
          }
        `}
      >
        <div className="relative isolate scale-[0.94] sm:scale-100">
          {/* Ambient glow behind the pill */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 60%, transparent 80%)',
            }}
          />

          {/* Glass pill */}
          <div
            className="relative flex items-center gap-4 rounded-full px-2 py-2 pl-6 overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.07) 100%)',
              backdropFilter: 'blur(60px) saturate(2)',
              WebkitBackdropFilter: 'blur(60px) saturate(2)',
              border: '1px solid #E0DFDB',
              boxShadow:
                '0 4px 24px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.4) inset',
            }}
          >
            {/* Top glass sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 right-4 top-1 h-1/2 rounded-full"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.38), rgba(255,255,255,0.10), transparent)',
              }}
            />

            {/* Label */}
            <div className="relative z-10 min-w-[112px] leading-tight">
              <div className="font-display text-[14px] font-semibold tracking-[-0.03em] text-black mb-0.5">
                Speak to me
              </div>
              <div className="font-body text-[12px] font-medium tracking-[-0.02em] text-black/60">
                Email or book a call
              </div>
            </div>

            {/* Icon buttons */}
            <div className="relative z-10 flex items-center gap-2">
              <a
                href="mailto:hello@isharaudayanga.com"
                className="grid h-10 w-10 place-items-center rounded-full text-white
                           transition duration-300 hover:scale-110 active:scale-95"
                style={{
                  background: 'linear-gradient(145deg, rgba(0,0,0,0.92), rgba(18,18,18,0.82))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow:
                    '0 8px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.3)',
                }}
                aria-label="Email me"
              >
                <Mail className="h-4 w-4" strokeWidth={1.9} />
              </a>

              <Link
                to="/lets-talk"
                className="grid h-10 w-10 place-items-center rounded-full text-white
                           transition duration-300 hover:scale-110 active:scale-95"
                style={{
                  background: 'linear-gradient(145deg, rgba(0,0,0,0.92), rgba(18,18,18,0.82))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow:
                    '0 8px 20px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.3)',
                }}
                aria-label="Book a call"
              >
                <Calendar className="h-4 w-4" strokeWidth={1.9} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
