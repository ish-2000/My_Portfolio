import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Tech stack icons ─────────────────────────────────────
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
import ClaudeIcon from "/icons/claude.svg";
import GeminiIcon from "/icons/googlegemini.svg";

// ─── Service icons ────────────────────────────────────────
import AnacondaIcon from "/icons/anaconda.svg";
import ImmichIcon from "/icons/immich.svg";
import HalIcon from "/icons/hal.svg";
import LogstashIcon from "/icons/logstash.svg";
import FlutterIcon from "/icons/flutter.svg";
import servbayIcon from "/icons/servbay.svg";
import sparkarIcon from "/icons/sparkar.svg";
import cloneIcon from "/icons/clone.svg";

gsap.registerPlugin(ScrollTrigger);

const STEP_DURATION = 4000;

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
  { name: "Claude", icon: ClaudeIcon },
  { name: "Gemini", icon: GeminiIcon },
];

const SERVICES = [
  {
    label: "Web Development",
    icon: sparkarIcon,
    description:
      "Full-stack web applications built with modern frameworks, optimised for performance and scalability.",
  },
  {
    label: "Mobile App Development",
    icon: FlutterIcon,
    description:
      "Developing high-performance mobile applications for iOS and Android platforms using React Native and Flutter.",
  },
  {
    label: "Brand Design",
    icon: HalIcon,
    description:
      "Strategic brand identities that communicate your value and resonate with your target audience.",
  },
  {
    label: "Web Apps",
    icon: cloneIcon,
    description:
      "Complex, data-driven web applications with seamless user experiences and robust backends.",
  },
  {
    label: "Landing Pages",
    icon: servbayIcon,
    description:
      "High-converting landing pages designed to capture attention and drive measurable results.",
  },
  // {
  //   label: "Motion Graphics",
  //   Icon: Clapperboard,
  //   description:
  //     "Polished animations and micro-interactions that bring interfaces to life.",
  // },

  {
    label: "UX / UI Design",
    icon: ImmichIcon,
    description:
      "Creating intuitive, visually appealing interfaces that enhance user experience and drive engagement.",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const iconRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const activeRef = useRef(0);
  const isVisibleRef = useRef(false);

  const goToStep = (index) => {
    if (index === activeRef.current) return;
    activeRef.current = index;
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = null;
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only start auto-advance when section is in view
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        isVisibleRef.current = true;
      },
      onLeaveBack: () => {
        isVisibleRef.current = false;
      },
    });

    const animate = (timestamp) => {
      if (isVisibleRef.current) {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const pct = Math.min(
          (timestamp - startTimeRef.current) / STEP_DURATION,
          1,
        );
        setProgress(pct);

        if (pct >= 1) {
          const next = (activeRef.current + 1) % SERVICES.length;
          goToStep(next);
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      trigger.kill();
    };
  }, []);

  // Heading blur reveal
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { filter: "blur(12px)", opacity: 0, y: 30 },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        iconRefs.current,
        { opacity: 0, x: -40, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: iconRefs.current[0],
            start: "top 90%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="w-full bg-surface">
      <div className="max-w-6xl mx-auto border-x border-surface-border px-10 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── Left — heading + tech stack ── */}
          <div ref={headingRef}>
            <h2 className="font-display font-medium tracking-tighter mb-8">
              <span
                className="block text-text-ghost"
                style={{ fontSize: "58px", lineHeight: "56px" }}
              >
                Services that
              </span>
              <span
                className="block text-text-primary"
                style={{ fontSize: "58px", lineHeight: "56px" }}
              >
                supercharge your business.
              </span>
            </h2>

            <div className="w-full">
              <p className="font-body text-sm font-semibold text-text-muted mb-4">
                My tech stack
              </p>
              <div className="flex flex-wrap gap-3">
                {LOGOS.map((logo, i) => (
                  <div
                    key={logo.name}
                    ref={(el) => (iconRefs.current[i] = el)}
                    title={logo.name}
                    className="w-14 h-14 rounded-xl bg-white border border-surface-border flex items-center justify-center shadow-xs"
                  >
                    <img
                      src={logo.icon}
                      alt={logo.name}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right — animated services list ── */}
          <div className="flex flex-col lg:pl-6">
            {SERVICES.map(({ label, icon, description }, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;

              return (
                <div
                  key={label}
                  className={`flex items-stretch gap-4 cursor-pointer ${i < SERVICES.length - 1 ? "pb-7" : "pb-0"}`}
                  onClick={() => goToStep(i)}
                >
                  {/* Progress track */}
                  <div className="relative w-[3px] flex-shrink-0 self-stretch rounded-full bg-surface-border">
                    <div
                      className="absolute top-0 left-0 w-full rounded-full bg-dark"
                      style={{
                        height: isActive
                          ? `${progress * 100}%`
                          : isPast
                            ? "100%"
                            : "0%",
                        transition: isActive ? "none" : "height 0.4s ease",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    {/* Title row with icon */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isActive ? "bg-dark" : "bg-surface-subtle"}`}
                      >
                        <img
                          src={icon}
                          alt={`${label} icon`}
                          className={`w-5 h-5 object-contain transition-all duration-300 ${
                            isActive
                              ? "brightness-0 invert"
                              : "opacity-60 grayscale"
                          }`}
                        />
                      </div>
                      <span
                        className={`font-display text-xl transition-all duration-300 ${isActive ? "font-semibold text-text-primary" : "font-medium text-text-placeholder"}`}
                      >
                        {label}
                      </span>
                    </div>

                    {/* Description — expands when active */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: isActive ? "120px" : "0px",
                        marginTop: isActive ? "8px" : "0px",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <p className="font-body text-sm text-text-muted leading-relaxed pl-13">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
