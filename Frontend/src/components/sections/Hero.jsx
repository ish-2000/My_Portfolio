import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

import ProfileImg from "../../assets/images/Me.png";

// ─── Icons ───────────────────────────────────────────────
import FigmaIcon from "/icons/figma.svg";
import ReactIcon from "/icons/react.svg";
import NodeIcon from "/icons/nodedotjs.svg";
import MongoIcon from "/icons/mongodb.svg";
import TailwindIcon from "/icons/tailwindcss.svg";
import TypeScriptIcon from "/icons/typescript.svg";
import ExpressIcon from "/icons/express.svg";
import NineGagIcon from "/icons/9gag.svg";
import FirebaseIcon from "/icons/firebase.svg";
import GitHubIcon from "/icons/github.svg";

// ─── Project images ──────────────────────────────────────
const IMG_1 =
  "https://i.pinimg.com/736x/d2/d7/e0/d2d7e0a8bbf47c7b096d9bf48dbdcb0b.jpg";
const IMG_2 =
  "https://i.pinimg.com/736x/71/e5/04/71e5043347eacf3831f534d214fb916f.jpg";
const IMG_3 =
  "https://i.pinimg.com/1200x/b0/3e/1f/b03e1fee04c9363c4432b83a97206c84.jpg";

// ─── Client photos ───────────────────────────────────────
const CLIENT_1 = "https://i.pravatar.cc/150?img=32";
const CLIENT_2 = "https://i.pravatar.cc/150?img=47";
const CLIENT_3 = "https://i.pravatar.cc/150?img=12";
const CLIENT_4 = "https://i.pravatar.cc/150?img=68";
const CLIENT_5 = "https://i.pravatar.cc/150?img=11";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────

const LOGOS = [
  { name: "Figma", icon: FigmaIcon },
  { name: "React", icon: ReactIcon },
  { name: "Node.js", icon: NodeIcon },
  { name: "MongoDB", icon: MongoIcon },
  { name: "Tailwind", icon: TailwindIcon },
  { name: "TypeScript", icon: TypeScriptIcon },
  { name: "Express", icon: ExpressIcon },
  { name: "9gag", icon: NineGagIcon },
  { name: "Firebase", icon: FirebaseIcon },
  { name: "GitHub", icon: GitHubIcon },
];

const PROJECT_IMAGES = [
  { src: IMG_1, alt: "Project 1" },
  { src: IMG_2, alt: "Project 2" },
  { src: IMG_3, alt: "Project 3" },
];

const CLIENT_PHOTOS = [CLIENT_1, CLIENT_2, CLIENT_3, CLIENT_4, CLIENT_5];

// ─── Animation helper ─────────────────────────────────────
// Blur reveal: matches Framer's built-in "blur appear" effect
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

// ─── Component ────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef(null);
  const availRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const ctaRef = useRef(null);
  const clientRef = useRef(null);
  const stripRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
      const otherTextItems = [
        availRef.current,
        headlineRef.current,
        sublineRef.current,
      ];

      // Hide content first
      gsap.set([...otherTextItems, ctaRef.current], {
        opacity: 0,
        y: 16,
        filter: "blur(12px)",
      });

      const avatars = clientRef.current.querySelectorAll(".client-avatar");
      const textElement = clientRef.current.querySelector(".client-text");

      // Hide client components first
      gsap.set(textElement, {
        opacity: 0,
        x: -20,
        filter: "blur(6px)",
      });

      gsap.set(avatars, {
        opacity: 0,
        scale: 0.3,
        x: -15,
        filter: "blur(6px)",
      });

      gsap.set(stripRef.current, {
        opacity: 0,
        y: 12,
      });

      // Images start from bottom.
      // No blur. No blue appear. No opacity fade.
      gsap.set(cards, {
        opacity: 1,
        y: "70vh",
        scale: 1,
        filter: "none",
      });

      const tl = gsap.timeline();

      // 1. All 3 images move together as one batch
      tl.to(cards, {
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "filter",
      });

      // 2. CTA button appears first
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.35",
      );

      // Create a label for parallel text and client section entrance
      tl.addLabel("contentStart", "-=0.45");

      // 3. Other text content appears
      tl.to(
        otherTextItems,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power2.out",
          stagger: 0.08,
        },
        "contentStart",
      );

      // 4. Client section & marquee appear in parallel
      tl.to(
        textElement,
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        },
        "contentStart",
      );

      tl.to(
        stripRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "contentStart",
      );

      tl.to(
        avatars,
        {
          opacity: 1,
          scale: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: {
            each: 0.05,
            from: "end",
          },
          ease: "back.out(1.5)",
        },
        "contentStart+=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full overflow-hidden bg-surface">
      <div className="max-w-[68rem] mx-auto border-x border-surface-border min-h-[92vh] bg-surface flex flex-col relative">
        {/* Navbar */}
        <Navbar />

        {/* Hero body */}
        <section className="flex-1 flex items-center px-10 pb-10 w-full">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] items-center gap-0">
            {/* Left — content */}
            <div className="flex flex-col">
              <div
                ref={availRef}
                className="inline-flex items-center gap-2 bg-surface border border-surface-border rounded-pill px-4 py-1.5 mb-7 w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-success flex-shrink-0 pulse-dot" />
                <span className="font-display font-semibold text-sm text-text-secondary tracking-tight">
                  Available for August&apos;25
                </span>
              </div>

              <h1 ref={headlineRef} className="mb-5">
                <span
                  className="block font-display font-medium tracking-tighter"
                  style={{
                    fontSize: "72px",
                    lineHeight: "68px",
                    color: "#828282",
                  }}
                >
                  Design that
                </span>
                <span
                  className="block font-display font-medium tracking-tighter"
                  style={{
                    fontSize: "72px",
                    lineHeight: "78px",
                    color: "#000000",
                  }}
                >
                  delivers results.
                </span>
              </h1>

              <p
                ref={sublineRef}
                className="font-display text-lg text-text-body leading-snug max-w-md mb-8"
              >
                <strong className="text-text-secondary font-semibold">
                  Strategic design that drives growth, not just looks good.
                </strong>{" "}
                I create everything your brand needs to attract customers and
                turn them into sales.
              </p>

              <div ref={ctaRef}>
                <Link to="/lets-talk">
                  <motion.div
                    whileHover={{ scale: 1.0 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-3 bg-dark hover:bg-dark/80 text-white rounded-pill font-display font-semibold text-sm pr-6 pl-1.5 py-1.5 cursor-pointer shadow-xl shadow-black/20 w-fit"
                  >
                    <img
                      src={ProfileImg}
                      alt="Ishara"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    Book a call with me
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Right — stacked project cards */}
            <div className="hidden lg:flex relative h-[500px] items-start justify-end">
              <div className="relative w-full h-full translate-y-[36px]">
                <div
                  ref={card1Ref}
                  className="absolute right-0 top-12 w-[370px] h-[260px] rotate-6 z-10 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={PROJECT_IMAGES[0].src}
                    alt={PROJECT_IMAGES[0].alt}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                <div
                  ref={card2Ref}
                  className="absolute right-28 top-16 w-[370px] h-[260px] -rotate-6 z-20 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={PROJECT_IMAGES[1].src}
                    alt={PROJECT_IMAGES[1].alt}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>

                <div
                  ref={card3Ref}
                  className="absolute right-6 top-28 w-[370px] h-[260px] rotate-2 z-30 rounded-xl overflow-hidden shadow-2xl border-4 border-surface"
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

        {/* Full-width divider */}
        <div className="relative h-px flex-shrink-0">
          <div className="absolute left-1/2 -translate-x-1/2 w-screen h-px bg-surface-border" />
        </div>

        {/* Bottom strip */}
        <div className="flex items-stretch h-24 bg-surface relative z-20">
          {/* Happy clients */}
          <div
            ref={clientRef}
            className="flex items-center gap-3 py-2 px-8 border-r border-surface-border flex-shrink-0"
          >
            <div className="flex items-center">
              {CLIENT_PHOTOS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Client ${i + 1}`}
                  className={`client-avatar w-9 h-9 rounded-full border-2 border-surface object-cover flex-shrink-0 ${i !== 0 ? "-ml-2" : ""}`}
                />
              ))}
            </div>
            <div className="client-text hidden sm:block">
              <div className="text-warning text-sm leading-none tracking-widest">
                ★★★★★
              </div>
              <div className="font-display text-sm text-text-muted mt-0.5">
                <strong className="text-text-secondary font-medium">
                  99+ Happy clients
                </strong>
              </div>
            </div>
          </div>

          {/* Tech stack marquee */}
          <div
            ref={stripRef}
            className="flex-1 overflow-hidden marquee-container flex items-center"
          >
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

        {/* Bottom full-width divider — closes the strip */}
        <div className="relative h-px">
          <div className="absolute left-1/2 -translate-x-1/2 w-screen h-px bg-surface-border" />
        </div>
      </div>
    </div>
  );
}
