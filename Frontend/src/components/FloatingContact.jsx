import { useEffect, useState } from 'react'
import { Mail, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const trigger = document.getElementById('floating-contact-trigger')

    const handleScroll = () => {
      if (!trigger) {
        setIsVisible(window.scrollY > window.innerHeight * 0.7)
        return
      }

      const triggerTop = trigger.getBoundingClientRect().top + window.scrollY

      // Appears when the second section comes close to viewport
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
    <div
      className={`
        fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 scale-[0.94] sm:scale-100
        transition-all duration-500 ease-out
        ${isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-8 opacity-0 pointer-events-none'
        }
      `}
    >
      <div className="relative isolate">
        {/* Soft background glow */}
        <div
          className="absolute -inset-4 -z-20 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 55%, transparent 78%)',
          }}
        />

        {/* Main transparent glass pill */}
        <div
          className="relative flex items-center gap-4 overflow-hidden rounded-full px-2 py-2 pl-6"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.13) 48%, rgba(255,255,255,0.06) 100%)',

            backdropFilter: 'blur(58px) saturate(2)',
            WebkitBackdropFilter: 'blur(58px) saturate(2)',

            border: '1px solid #E0DFDB ',


          }}
        >
          {/* Top glass highlight */}
          <div
            className="pointer-events-none absolute left-4 right-4 top-1 h-1/2 rounded-full"
            style={{
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.36), rgba(255,255,255,0.08), transparent)',
            }}
          />

          {/* Text */}
          <div className="relative z-10 min-w-[112px] leading-tight ">
            <div className="font-display text-[14px] font-semibold tracking-[-0.03em] text-black mb-1">
              Speak to me
            </div>
            <div className="font-body text-[12px] font-medium tracking-[-0.02em] text-black/60">
              Email or book a callx
            </div>
          </div>

          {/* Action buttons */}
          <div className="relative z-10 flex items-center gap-2">
            <a
              href="mailto:hello@isharaudayanga.com"
              className="group grid h-10 w-10 place-items-center rounded-full text-white transition duration-300 hover:scale-110 active:scale-95"
              style={{
                background:
                  'linear-gradient(145deg, rgba(0,0,0,0.92), rgba(18,18,18,0.82))',
                border: '1px solid rgba(255,255,255,0.18)',

              }}
              aria-label="Email me"
            >
              <Mail className="h-4 w-4" strokeWidth={1.9} />
            </a>

            <Link
              to="/lets-talk"
              className="group grid h-10 w-10 place-items-center rounded-full text-white transition duration-300 hover:scale-110 active:scale-95"
              style={{
                background:
                  'linear-gradient(145deg, rgba(0,0,0,0.92), rgba(18,18,18,0.82))',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: `
                  0 8px 20px rgba(0,0,0,0.32),
                  inset 0 1px 0 rgba(255,255,255,0.18),
                  inset 0 -1px 0 rgba(0,0,0,0.3)
                `,
              }}
              aria-label="Book a call"
            >
              <Calendar className="h-4 w-4" strokeWidth={1.9} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}