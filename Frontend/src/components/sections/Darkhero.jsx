import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import PortraitImg from "../../assets/images/portrait-dark.jpg";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = ["Work", "About", "Contact"];

// ── Blur reveal helper — same pattern used across the site ──
function blurReveal(target, { delay = 0, duration = 0.9, y = 16 } = {}) {
  gsap.fromTo(
    target,
    { filter: "blur(12px)", opacity: 0, y },
    {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
    },
  );
}

export default function DarkHero() {
  const sectionRef = useRef(null);
  const navRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      blurReveal(navRef.current, { delay: 0.0, duration: 0.7, y: 10 });
      blurReveal(headlineRef.current, { delay: 0.15, duration: 1.1, y: 24 });
      blurReveal(bodyRef.current, { delay: 0.45, duration: 0.8, y: 16 });

      gsap.fromTo(
        portraitRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1.1, delay: 0.3, ease: "power2.out" },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#0a0908" }}
    >
      {/* ── Navbar — restored: name + links ── */}
      <nav
        ref={navRef}
        className="flex items-center justify-between px-8 md:px-16 py-8 relative z-20"
      >
        <span className="font-display font-medium text-sm text-white tracking-tight">
          Ishara Udayanga
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="font-body text-sm text-white hover:text-dark-text-muted transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Main content grid ── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end min-h-[calc(100vh-140px)] pb-16">
          {/* Left — headline + body */}
          <div className="flex flex-col justify-center">
            <h1
              ref={headlineRef}
              className="font-display font-bold tracking-tighter mb-8"
            >
              <span
                className="block text-white"
                style={{
                  fontSize: "clamp(40px, 5.5vw, 68px)",
                  lineHeight: "1.05",
                }}
              >
                Products people
              </span>
              <span
                className="block text-dark-text-muted"
                style={{
                  fontSize: "clamp(40px, 5.5vw, 68px)",
                  lineHeight: "1.05",
                }}
              >
                actually want to use.
              </span>
            </h1>

            <p
              ref={bodyRef}
              className="font-body text-white/80 leading-relaxed max-w-lg"
              style={{ fontSize: "clamp(17px, 1.6vw, 20px)" }}
            >
              I work across the full stack — from first sketch to shipped code —
              helping founders and teams turn rough ideas into interfaces that
              feel considered, fast, and genuinely useful.
            </p>
          </div>

          {/* Right — portrait, blended into black via mask gradient */}
          <div className="relative h-full flex items-end justify-center lg:justify-end">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 65% 40%, rgba(20,20,20,0.6) 0%, transparent 70%)",
              }}
            />
            <div
              ref={portraitRef}
              className="relative w-full max-w-md aspect-[4/5] lg:max-w-lg"
            >
              <img
                src={PortraitImg}
                alt="Ishara Udayanga"
                className="w-full h-full object-cover object-top"
                style={{
                  maskImage: `
                    linear-gradient(to top, black 60%, transparent 100%),
                    linear-gradient(to left, black 75%, transparent 100%),
                    linear-gradient(to right, black 88%, transparent 100%)
                  `,
                  maskComposite: "intersect",
                  WebkitMaskImage: `
                    linear-gradient(to top, black 60%, transparent 100%),
                    linear-gradient(to left, black 75%, transparent 100%),
                    linear-gradient(to right, black 88%, transparent 100%)
                  `,
                  WebkitMaskComposite: "source-in",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom-left links ── */}
      <div className="absolute bottom-8 left-8 md:left-16 z-20 flex items-center gap-6">
        <Link
          to="/lets-talk"
          className="font-body text-sm text-white hover:text-dark-text-muted transition-colors underline underline-offset-4"
        >
          Book a call
        </Link>
        <a
          href="https://x.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-white hover:text-dark-text-muted transition-colors underline underline-offset-4"
        >
          X / Twitter
        </a>
      </div>
    </section>
  );
}
