import { useState, useEffect, useLayoutEffect, useRef } from "react";
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
  {
    label: "UX / UI Design",
    icon: ImmichIcon,
    description:
      "Creating intuitive, visually appealing interfaces that enhance user experience and drive engagement.",
  },
];

// Module-level flag: resets on hard refresh, persists during SPA navigation.
let servicesAnimationHasPlayed = false;

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const techStackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const activeRef = useRef(0);
  const isVisibleRef = useRef(false);

  // ── Description height measurement (for smooth, jump-free transitions) ──
  const descRefs = useRef([]);
  const [descHeights, setDescHeights] = useState([]);

  useLayoutEffect(() => {
    const measure = () =>
      setDescHeights(descRefs.current.map((el) => (el ? el.scrollHeight : 0)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxDescHeight = descHeights.length ? Math.max(...descHeights) : 0;

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
      if (servicesAnimationHasPlayed) {
        gsap.set(headingRef.current, { filter: "blur(0px)", opacity: 1, y: 0 });
        if (techStackRef.current)
          gsap.set(techStackRef.current, { opacity: 1, y: 0 });
        return;
      }

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
            onEnter: () => {
              servicesAnimationHasPlayed = true;
            },
          },
        },
      );
      if (techStackRef.current) {
        gsap.fromTo(
          techStackRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: techStackRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full bg-surface border-b border-surface-border"
    >
      <div className="max-w-[68rem] mx-auto border-x border-surface-border px-5 sm:px-8 md:px-10 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
          {/* ── Left column: heading + tech stack grouped on desktop, unrolled on mobile via contents ── */}
          <div className="contents lg:block">
            {/* ── Heading ── */}
            <h2
              ref={headingRef}
              className="order-1 lg:order-none font-display font-medium tracking-tighter mb-0 lg:mb-8"
            >
              <span className="block text-text-ghost text-[28px] sm:text-[34px] md:text-[38px] leading-[1.12]">
                Services that
              </span>
              <span className="block text-text-primary text-[28px] sm:text-[34px] md:text-[38px] leading-[1.12]">
                supercharge your business.
              </span>
            </h2>

            {/* ── Tech stack — order-3 on mobile (below animated services list), directly under heading on desktop ── */}
            <div
              ref={techStackRef}
              className="order-3 lg:order-none w-full"
            >
              <p className="font-body text-sm font-semibold text-text-muted mb-4">
                My tech stack
              </p>

              {/* Horizontal infinite scroll loop */}
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-1">
                <div className="flex w-max animate-marquee">
                  {[...LOGOS, ...LOGOS].map((logo, i) => (
                    <div
                      key={`${logo.name}-${i}`}
                      className="mr-3 flex-shrink-0"
                    >
                      <div
                        title={logo.name}
                        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-surface-border shadow-xs"
                      >
                        <img
                          src={logo.icon}
                          alt={logo.name}
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right — animated services list — order-2 on mobile ── */}
          <div className="order-2 lg:order-none flex flex-col lg:pl-6">
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
                      ref={(el) => (descRefs.current[i] = el)}
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        height: isActive ? `${descHeights[i] ?? 0}px` : "0px",
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

            {/* ── Invisible spacer — keeps total column height constant ── */}
            <div
              aria-hidden
              className="transition-all duration-500 ease-in-out"
              style={{
                height: `${Math.max(
                  0,
                  maxDescHeight - (descHeights[activeIndex] ?? 0),
                )}px`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
