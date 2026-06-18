import { useEffect, useState } from 'react'
import { Mail, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * BottomBlurCTA
 *
 * Fixed bottom CTA with Launchfolio-style "Speak to me" pill.
 */
export default function BottomBlurCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const trigger = document.getElementById('floating-contact-trigger')

    const handleScroll = () => {
      if (!trigger) {
        setIsVisible(window.scrollY > window.innerHeight * 0.85)
        return
      }

      const triggerTop = trigger.getBoundingClientRect().top + window.scrollY
      const showPoint = triggerTop - window.innerHeight * 0.45
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
      {/* Bottom blur overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 z-40 w-full"
        style={{
          height: '58px',
          backdropFilter: 'blur(5px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(5px) saturate(1.4)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 28%, black 68%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 28%, black 68%, black 100%)',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(250,250,250,0.08) 60%, rgba(250,250,250,0.22) 100%)',
        }}
      />

      {/* Floating CTA pill */}
      <div
        className={`
          fixed bottom-2 left-1/2 z-50 -translate-x-1/2
          transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
          ${isVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-[150px] opacity-0 pointer-events-none'
          }
        `}
      >
        <div
          className="
            flex h-[64px] items-center rounded-full
            py-2 pl-6 pr-2
          "
          style={{
            backdropFilter: 'blur(5px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(5px) saturate(1.4)',
            background: 'rgba(250, 250, 250, 0.22)',
            border: '1px solid #ededed',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
          }}
        >
          {/* Text */}
          <div className="mr-4 min-w-[112px] leading-none">
            <div className="font-display text-[15px] font-semibold leading-[18px] tracking-[-0.03em] text-black">
              Speak to me
            </div>
            <div className="mt-1 font-body text-[12px] font-medium leading-[14px] tracking-[-0.02em] text-black/65">
              Email or book a call
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="mailto:hello@isharaudayanga.com"
              aria-label="Email me"
              className="
                grid h-10 w-10 place-items-center rounded-full
                bg-black text-white
                shadow-[0_6px_16px_rgba(0,0,0,0.28)]
                transition duration-300 hover:scale-105 active:scale-95
              "
            >
              <Mail className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </a>

            <Link
              to="/lets-talk"
              aria-label="Book a call"
              className="
                grid h-10 w-10 place-items-center rounded-full
                border border-[#E1E1E1] bg-white text-black
                shadow-[0_5px_14px_rgba(0,0,0,0.12)]
                transition duration-300 hover:scale-105 active:scale-95
              "
            >
              <Calendar className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}