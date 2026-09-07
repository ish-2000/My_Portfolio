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
      ></nav>

      {/* ── Main content grid ── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end min-h-[calc(100vh-140px)]">
          {/* Left — label, headline + body — matches VisionSection pattern */}
          <div className="flex flex-col justify-start lg:self-center">
            {/* Section label + divider — same as VisionSection */}
            <div className="mb-14 flex justify-start w-full items-center gap-5">
              <span className="shrink-0 font-body text-[11px] font-medium uppercase tracking-[0.03em] text-dark-text">
                Our Approach
              </span>
              <span className="h-px flex-1 bg-dark-border" />
            </div>

            <h1
              ref={headlineRef}
              className="max-w-[600px] font-display font-light tracking-tight leading-[1.1] text-[46px]"
              style={{ wordSpacing: "0.12em" }}
            >
              <span className="text-white">
                Products people actually want to use, built with{" "}
              </span>
              <span className="text-[#303030]">
                care and shipped with confidence.
              </span>
            </h1>

            <p
              ref={bodyRef}
              className="mt-12 max-w-[610px] font-body text-sm leading-[1.65] text-dark-text sm:text-[15px] lg:mt-14"
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
    </section>
  );
}
