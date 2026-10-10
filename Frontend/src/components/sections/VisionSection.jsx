import { useEffect, useRef, Fragment } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MeImage from "../../assets/images/Me_dark.webp";

gsap.registerPlugin(ScrollTrigger);

const PROFILE = {
  image: MeImage,
  name: "Ishara Udayanga",
  role: "Designer & Developer",
};

const HEADING_LINES = [
  "We believe that AI should",
  "not just automate tasks, but",
  "amplify the creative and",
  "strategic potential of every",
  "human.",
];
const HEADING_TEXT = HEADING_LINES.join(" ");

export default function VisionSection() {
  const sectionRef = useRef(null);
  const profileRef = useRef(null);
  const contentRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".vision-char");
        chars.forEach((char) => {
          char.style.color = "#FFFFFF";
        });
      }
      return undefined;
    }

    const context = gsap.context(() => {
      // ── Section Label entrance ──
      gsap.fromTo(
        labelRef.current,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            once: true,
          },
        },
      );

      // ── Heading entrance (blur reveal) ──
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 45,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            once: true,
          },
        },
      );

      // ── Scroll-synchronized character color reveal (#303030 -> #FFFFFF) ──
      const chars = headingRef.current?.querySelectorAll(".vision-char");
      if (chars && chars.length > 0) {
        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "center 45%",
            scrub: true,
          },
        });

        revealTimeline.fromTo(
          chars,
          { color: "#303030" },
          {
            color: "#FFFFFF",
            duration: 0.3,
            stagger: 0.04,
            ease: "none",
          },
        );
      }

      // ── Supporting description entrance ──
      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            once: true,
          },
        },
      );

      // ── Horizontal divider line entrance ──
      gsap.fromTo(
        ".vision-divider",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1,
          delay: 0.2,
          transformOrigin: "left center",
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-dark text-dark-text"
    >
      <div
        className="
          relative mx-auto grid min-h-screen
          w-full max-w-[68rem]
          grid-cols-1
          gap-12 sm:gap-16
          px-5 sm:px-8 md:px-10 py-16 sm:py-20 lg:py-20
          lg:grid-cols-[280px_1fr]
          lg:items-center
          lg:gap-20
        "
      >
        {/* Profile area — order-2 on mobile (below text), order-1 on desktop (left column) */}
        <div className="order-2 lg:order-1 w-full lg:translate-x-4 xl:translate-x-8 lg:translate-y-8 mt-10 sm:mt-12 lg:mt-0">
          <div ref={profileRef} className="w-full max-w-[420px] mx-auto lg:max-w-[280px] lg:mx-0">
            <div
              className="
                group relative aspect-[4/5] sm:aspect-square w-full
                overflow-hidden rounded-[22px]
                border border-white/10
                bg-dark-card shadow-2xl
              "
            >
              {/* Viewfinder corner bracket accents matching reference screenshot */}
              <div
                className="absolute top-3.5 left-3.5 w-5 h-5 border-t border-l border-white/25 rounded-tl-md pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="absolute top-3.5 right-3.5 w-5 h-5 border-t border-r border-white/25 rounded-tr-md pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-3.5 left-3.5 w-5 h-5 border-b border-l border-white/20 rounded-bl-md pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-3.5 right-3.5 w-5 h-5 border-b border-r border-white/20 rounded-br-md pointer-events-none z-10"
                aria-hidden="true"
              />

              <img
                src={PROFILE.image}
                alt={`${PROFILE.name} portrait`}
                width={600}
                height={600}
                decoding="async"
                className="
                  h-full w-full object-cover
                  transition-transform duration-700
                  ease-out group-hover:scale-[1.025]
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t
                  from-black/25 via-transparent to-white/[0.03]
                "
              />
            </div>

            <div className="mt-6 text-center">
              <p
                className="
                  font-body text-[14px] font-medium
                  uppercase tracking-[0.02em]
                  text-dark-text
                "
              >
                {PROFILE.name}
              </p>

              <p
                className="
                  mt-2 font-body text-xs
                  leading-relaxed text-dark-text-muted
                "
              >
                {PROFILE.role}
              </p>
            </div>
          </div>
        </div>

        {/* Vision content — order-1 on mobile (above image), order-2 on desktop (right column) */}
        <div ref={contentRef} className="order-1 lg:order-2 w-full max-w-[620px]">
          {/* Section label */}
          <div ref={labelRef} className="mb-8 sm:mb-14 flex w-full items-center gap-5">
            <span
              className="
                shrink-0 font-body text-[11px]
                font-medium uppercase tracking-[0.03em]
                text-dark-text
              "
            >
              Our Vision
            </span>

            <div className="vision-divider h-px flex-1 bg-dark-border" />
          </div>

          <h2
            ref={headingRef}
            aria-label={HEADING_TEXT}
            className="
              max-w-[600px]
              font-display font-medium
              tracking-tight
              leading-[1.14] sm:leading-[1.1]
              text-[26px] xs:text-[29px] sm:text-[36px] md:text-[42px] lg:text-[46px]
              font-light
            "
            style={{ wordSpacing: "0.12em" }}
          >
            <span className="sr-only">{HEADING_TEXT}</span>
            <span aria-hidden="true">
              {HEADING_LINES.map((line, lineIndex) => (
                <span key={lineIndex} className="block sm:inline">
                  {line.split(" ").map((word, wordIndex, words) => (
                    <Fragment key={wordIndex}>
                      <span className="inline-block whitespace-nowrap">
                        {word.split("").map((char, charIndex) => (
                          <span
                            key={charIndex}
                            className="vision-char text-[#303030]"
                            style={{ color: "#303030" }}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                      {wordIndex < words.length - 1 ? " " : lineIndex < HEADING_LINES.length - 1 ? " " : ""}
                    </Fragment>
                  ))}
                </span>
              ))}
            </span>
          </h2>

          {/* Supporting paragraph */}
          <p
            ref={descriptionRef}
            className="
              mt-8 sm:mt-12 max-w-[610px]
              font-body text-sm
              leading-[1.65]
              text-dark-text
              sm:text-[15px]
              lg:mt-14
            "
          >
            By merging technical rigor with intuitive design, we build systems
            that don&apos;t just solve problems—they create entirely new
            opportunities for growth.
          </p>
        </div>
      </div>
    </section>
  );
}
