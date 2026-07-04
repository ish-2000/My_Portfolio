import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

// ─── Social icons from Simple Icons ───────────────────────
import XIcon from "/icons/x.svg";
import InstaIcon from "/icons/instagram.svg";
import DribbbleIcon from "/icons/dribbble.svg";
import BehanceIcon from "/icons/behance.svg";
import LinkedInIcon from "/icons/linkedin.svg";

// ─── Rotating headlines ───────────────────────────────────
const HEADLINES = [
  "incredible work together.",
  "your next big product.",
  "something people love.",
  "experiences that convert.",
  "brands that stand out.",
];

const MENU_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
];

const LEGAL_LINKS = [
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const SOCIALS = [
  { icon: XIcon, label: "X", href: "https://x.com", count: "1,214" },
  { icon: InstaIcon, label: "Instagram", href: "https://instagram.com" },
  { icon: DribbbleIcon, label: "Dribbble", href: "https://dribbble.com" },
  { icon: BehanceIcon, label: "Behance", href: "https://behance.net" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // Animate out
      gsap.to(textRef.current, {
        opacity: 0,
        y: -20,
        filter: "blur(8px)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex((prev) => (prev + 1) % HEADLINES.length);
          // Reset position below
          gsap.set(textRef.current, { y: 20, filter: "blur(8px)" });
          // Animate in
          gsap.to(textRef.current, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <footer id="footer" className="w-full bg-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-10 pt-20 pb-0">
        {/* ── Headline with rotating text ── */}
        <div className="mb-16">
          <h2 className="font-display font-medium tracking-tighter">
            <span
              className="block text-dark-text"
              style={{ fontSize: "64px", lineHeight: "66px" }}
            >
              Lets design
            </span>
            <span
              ref={textRef}
              className="block text-text-muted"
              style={{ fontSize: "64px", lineHeight: "66px" }}
            >
              {HEADLINES[activeIndex]}
            </span>
          </h2>
        </div>

        {/* ── Contact row: Email / Call / Social ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <div>
            <p className="font-body text-sm text-text-muted mb-2">Email</p>
            <a
              href="mailto:hello@isharaudayanga.com"
              className="font-display font-medium text-lg text-dark-text hover:text-text-muted transition-colors"
            >
              hello@isharaudayanga.com
            </a>
          </div>

          {/* Call */}
          <div>
            <p className="font-body text-sm text-text-muted mb-2">Call Me</p>
            <Link
              to="/lets-talk"
              className="font-display font-medium text-lg text-dark-text hover:text-text-muted transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Social */}
          <div>
            <p className="font-body text-sm text-text-muted mb-2">Social</p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon, label, href, count }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 px-3 py-2 rounded-pill border-2 border-dark-border hover:border-text-muted transition-colors"
                  aria-label={label}
                >
                  <img
                    src={icon}
                    alt={label}
                    className="w-4 h-4 brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  {count && (
                    <span className="font-body text-xs text-dark-text-muted group-hover:text-dark-text transition-colors">
                      {count}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-dark-border" />

        {/* ── Bottom row: Menu / Legal / Copyright ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {/* Menu */}
          <div>
            <p className="font-body text-sm text-text-muted mb-3">Menu</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {MENU_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-display font-medium text-sm text-dark-text hover:text-text-muted transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="font-body text-sm text-text-muted mb-3">Legal</p>
            <div className="flex flex-col gap-2">
              {LEGAL_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="font-display font-medium text-sm text-dark-text hover:text-text-muted transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="flex items-end justify-start md:justify-end">
            <p className="font-body text-sm text-text-muted">
              © {new Date().getFullYear()} Ishara Udayanga
            </p>
          </div>
        </div>

        {/* ── Large watermark name ── */}
        <div className="relative overflow-hidden h-32 md:h-48">
          <span
            className="flex font-display font-medium text-dark-text uppercase tracking-tighter select-none justify-center"
            style={{ fontSize: "clamp(120px, 18vw, 280px)", lineHeight: "1" }}
          >
            ISHARA
          </span>
        </div>
      </div>
    </footer>
  );
}
