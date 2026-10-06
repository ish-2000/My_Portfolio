import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";

import HeroPortrait from "../../assets/images/heroo.svg";
import ProfileImg from "../../assets/images/Me.png";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/#blog" },
];

const PLACEHOLDER_LOGOS = ["logo-a", "logo-b", "logo-c", "logo-d"];

function LogoMark() {
  return (
    <svg
      viewBox="0 0 96 24"
      fill="none"
      aria-hidden="true"
      className="w-20 h-5 block"
    >
      <rect
        x="0"
        y="7"
        width="10"
        height="10"
        rx="1.5"
        fill="white"
        opacity="0.35"
      />
      <rect
        x="14"
        y="5"
        width="7"
        height="14"
        rx="1.5"
        fill="white"
        opacity="0.28"
      />
      <rect
        x="25"
        y="7"
        width="71"
        height="2.5"
        rx="1"
        fill="white"
        opacity="0.22"
      />
      <rect
        x="25"
        y="11"
        width="52"
        height="2.5"
        rx="1"
        fill="white"
        opacity="0.18"
      />
      <rect
        x="25"
        y="15"
        width="62"
        height="2.5"
        rx="1"
        fill="white"
        opacity="0.14"
      />
    </svg>
  );
}

// Module-level flag: resets on hard refresh, persists during SPA navigation
let heroAnimationHasPlayed = false;

export default function HeroTem({ preloaderDone = true }) {
  const sectionRef = useRef(null);
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const h1Ref = useRef(null);
  const paraRef = useRef(null);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);
  const scrollRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Entrance blur reveal animation matching Hero.jsx
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const textItems = [
      pillRef.current,
      h1Ref.current,
      paraRef.current,
      ctaRef.current,
      trustRef.current,
    ].filter(Boolean);

    const allElements = [
      navRef.current,
      ...textItems,
      scrollRef.current,
    ].filter(Boolean);

    // If already played once, instantly ensure full visibility
    if (heroAnimationHasPlayed) {
      gsap.set(allElements, {
        opacity: 1,
        y: 0,
        filter: "none",
        clearProps: "filter",
      });
      return;
    }

    // Keep hidden while preloader is active to prevent visual flash
    if (!preloaderDone) {
      gsap.set(allElements, {
        opacity: 0,
        y: 18,
        filter: "blur(12px)",
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.25,
        onStart: () => {
          heroAnimationHasPlayed = true;
        },
      });

      // 1. Navigation pill appears
      if (navRef.current) {
        tl.fromTo(
          navRef.current,
          { opacity: 0, y: -12, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power2.out",
            clearProps: "filter",
          },
        );
      }

      // 2. Left text content group enters with blur reveal and smooth stagger
      tl.fromTo(
        textItems,
        {
          opacity: 0,
          y: 20,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "filter",
        },
        "-=0.45",
      );

      // 3. Scroll indicator fades in
      if (scrollRef.current) {
        tl.fromTo(
          scrollRef.current,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [preloaderDone]);

  // Keyboard accessibility: Escape closes mobile drawer
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  function scrollDown() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const next = sectionRef.current?.nextElementSibling;
    const target = next || window.innerHeight * 0.85;

    if (window.lenis && !prefersReducedMotion) {
      window.lenis.scrollTo(target, { duration: 1.2 });
    } else {
      const behavior = prefersReducedMotion ? "auto" : "smooth";
      if (next) {
        next.scrollIntoView({ behavior });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior });
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="hero-tem"
      aria-label="Hero section"
      className="relative w-full min-h-[100svh] bg-[#080807] overflow-hidden flex flex-col"
    >
      {/* Portrait background & ambient gradients */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={HeroPortrait}
          alt=""
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain object-right max-md:h-[380px] max-md:object-cover max-md:object-[72%_top] max-md:top-[10px] max-md:opacity-85 block"
        />
        {/* Left readable gradient — desktop/tablet */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(105deg, rgba(8, 8, 7, 0.94) 0%, rgba(8, 8, 7, 0.82) 30%, rgba(8, 8, 7, 0.55) 52%, rgba(8, 8, 7, 0.12) 68%, transparent 80%)",
          }}
        />
        {/* Mobile gradient — clear at top for portrait, fading to solid dark for text */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 8, 7, 0.1) 0%, rgba(8, 8, 7, 0.25) 25%, rgba(8, 8, 7, 0.85) 48%, #080807 68%, #080807 100%)",
          }}
        />
        {/* Bottom smooth fade into next section */}
        <div
          className="absolute bottom-0 inset-x-0 h-[220px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(8, 8, 7, 0.5) 45%, rgba(8, 8, 7, 0.85) 70%, #080807 100%)",
          }}
        />
      </div>

      {/* Decorative geometry */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute rounded-full border border-white/[0.03] -translate-y-1/2 top-1/2 w-[340px] h-[340px] md:w-[480px] md:h-[480px] max-md:-right-[80px] md:right-[5%]" />
        <div className="absolute rounded-full border border-white/[0.022] -translate-y-1/2 top-1/2 w-[520px] h-[520px] md:w-[700px] md:h-[700px] max-md:-right-[160px] md:-right-[5%]" />
        <div className="hidden md:block absolute rounded-full border border-white/[0.013] -translate-y-1/2 top-1/2 w-[700px] h-[700px] lg:w-[940px] lg:h-[940px] -right-[15%]" />
        <div className="hidden md:flex absolute left-[46%] inset-y-0 gap-[22px]">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.025] to-transparent" />
          <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.025] to-transparent" />
          <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.025] to-transparent" />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 flex-1 flex flex-col justify-between">
        {/* Navigation */}
        <nav
          ref={navRef}
          className="relative z-50 flex items-center justify-center w-full pt-[18px] md:pt-6"
          aria-label="Primary navigation"
        >
          <div className="flex items-center w-full md:w-auto justify-between md:justify-start bg-[#0e0e0e]/72 border border-white/12 rounded-full py-1.5 pl-2 pr-3.5 md:pr-2 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/20 hover:shadow-[0_6px_28px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-200">
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 pl-0.5 pr-0 md:pr-7 lg:pr-12 hover:opacity-90 transition-opacity duration-200"
              aria-label="Home — Ishara Udayanga"
            >
              <img
                src={ProfileImg}
                alt="Ishara Udayanga"
                width="36"
                height="36"
                className="w-9 h-9 rounded-full object-cover border border-white/20 block shrink-0"
              />
              <span className="font-display text-sm font-semibold text-white tracking-tight whitespace-nowrap">
                Ishara Udayanga
              </span>
            </Link>

            {/* Desktop links */}
            <ul
              className="hidden md:flex items-center gap-4.5 lg:gap-7 pr-5 lg:pr-9 list-none m-0 p-0"
              role="list"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label} role="listitem">
                  <a
                    href={href}
                    className="font-display text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-4 rounded"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Action */}
            <div className="hidden md:flex items-center shrink-0">
              <Link
                to="/lets-talk"
                className="font-display text-[13px] lg:text-sm font-medium text-white bg-white/5 border border-white/15 rounded-full px-4.5 lg:px-6 py-2 inline-flex items-center justify-center whitespace-nowrap hover:bg-white/15 hover:border-white/30 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-2"
              >
                Contact
              </Link>
            </div>

            {/* Mobile hamburger button */}
            <button
              type="button"
              className="md:hidden flex flex-col justify-center items-center gap-[5px] p-1.5 ml-auto rounded-md cursor-pointer bg-transparent border-0"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls="ht-mobile-drawer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span
                className={`block w-5 h-[1.5px] bg-white/85 rounded-sm transition-all duration-200 ${
                  isMenuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-white/85 rounded-sm transition-all duration-200 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-white/85 rounded-sm transition-all duration-200 ${
                  isMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile navigation drawer */}
        <div
          id="ht-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`md:hidden absolute top-[76px] inset-x-5 bg-[#0e0e0e]/95 border border-white/12 rounded-2xl p-5 flex flex-col gap-1 z-50 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            isMenuOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-3 opacity-0 pointer-events-none"
          }`}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-display text-base font-medium text-white/85 hover:text-white py-3 px-2 border-b border-white/10 last:border-b-0 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <Link
            to="/lets-talk"
            className="mt-3.5 font-display text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-full py-3 px-5 text-center transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>

        {/* Hero body */}
        <div className="flex-1 flex items-start md:items-center pt-[210px] xs:pt-[240px] sm:pt-[270px] pb-5 md:py-4 lg:py-6">
          <div className="flex flex-col w-full max-w-full md:max-w-[580px] lg:max-w-[700px] xl:max-w-[780px] ml-0 md:ml-5 lg:ml-[75px]">
            {/* Status pill */}
            <div
              ref={pillRef}
              className="inline-flex items-center gap-2 border border-white/12 rounded-full px-3 py-1.5 mb-4 sm:mb-6 w-fit bg-white/[0.03]"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 pulse-dot"
                aria-hidden="true"
              />
              <span className="font-display text-[10px] font-normal text-white/60 tracking-[0.12em] uppercase">
                ENGINEERED FOR EXCELLENCE
              </span>
            </div>

            {/* Main heading — strictly 2 lines on desktop */}
            <h1
              ref={h1Ref}
              className="flex flex-col mb-4 sm:mb-5.5 font-display tracking-[-0.035em] leading-[1.15]"
            >
              <span className="text-[clamp(28px,7.5vw,36px)] sm:text-[38px] md:text-[46px] lg:text-[50px] xl:text-[56px] font-medium text-[#8A8984] whitespace-normal md:whitespace-nowrap">
                Built With Purpose.
              </span>
              <span className="text-[clamp(28px,7.5vw,36px)] sm:text-[38px] md:text-[46px] lg:text-[50px] xl:text-[56px] font-medium text-white whitespace-normal md:whitespace-nowrap">
                Driven by Vision.
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p
              ref={paraRef}
              className="font-body text-[14px] sm:text-[15px] lg:text-[clamp(15px,1.1vw,17px)] leading-[1.55] text-white/45 max-w-full md:max-w-[420px] mb-5 sm:mb-7.5"
            >
              I turn ideas into websites and web apps that look great and work
              smoothly, from the first sketch to the final build.
            </p>

            {/* CTA buttons */}
            <div
              ref={ctaRef}
              className="flex items-center flex-wrap gap-3.5 sm:gap-4 mb-7 sm:mb-10"
            >
              <Link
                to="/lets-talk"
                className="relative inline-flex items-center gap-1.5 font-display text-[13.5px] font-semibold text-[#111] bg-white rounded-full px-5 py-2.5 tracking-[0.01em] whitespace-nowrap hover:bg-[#e8e8e8] hover:-translate-y-0.5 hover:shadow-[0_4px_22px_rgba(255,255,255,0.12)] active:translate-y-0 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 focus-visible:outline-offset-3"
              >
                View my work
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="/lets-talk"
                className="inline-flex items-center gap-1.5 hover:gap-2.5 font-display text-sm font-medium text-white/60 hover:text-white whitespace-nowrap transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-3 rounded-sm"
              >
                Let’s talk
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            {/* Trusted by row */}
            <div ref={trustRef} className="flex flex-col gap-3">
              <p className="font-body text-[10px] font-medium tracking-[0.12em] uppercase text-white/30 m-0">
                TRUSTED BY INNOVATIVE TEAMS
              </p>
              <div
                className="w-full h-px bg-white/10 max-w-full md:max-w-[460px]"
                aria-hidden="true"
              />
              <div
                className="flex items-center gap-4 md:gap-7 flex-wrap"
                role="list"
                aria-label="Partner logos"
              >
                {PLACEHOLDER_LOGOS.map((id) => (
                  <div
                    key={id}
                    role="listitem"
                    className="opacity-55 hover:opacity-80 transition-opacity duration-200"
                  >
                    <LogoMark />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          ref={scrollRef}
          type="button"
          aria-label="Scroll to explore"
          onClick={scrollDown}
          className="flex flex-col items-center gap-1.5 pt-5 pb-7 bg-transparent border-0 cursor-pointer text-white/35 hover:text-white/65 transition-colors duration-200 w-fit self-center font-inherit select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-4 rounded"
        >
          <span className="font-body text-[9px] tracking-[0.14em] uppercase">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown
            size={18}
            aria-hidden="true"
            className="animate-bounce"
          />
        </button>
      </div>
    </section>
  );
}
