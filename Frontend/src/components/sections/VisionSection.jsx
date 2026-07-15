import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MeImage from "../../assets/images/Me_dark.webp";

gsap.registerPlugin(ScrollTrigger);

const PROFILE = {
  image: MeImage,
  name: "Ishara Udayanga",
  role: "Designer & Developer",
};

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

    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      // gsap.fromTo(
      //   profileRef.current,
      //   {
      //     opacity: 0,
      //     x: -45,
      //     filter: "blur(10px)",
      //   },
      //   {
      //     opacity: 1,
      //     x: 0,
      //     filter: "blur(0px)",
      //     duration: 1,
      //     ease: "power3.out",
      //     scrollTrigger: {
      //       trigger: sectionRef.current,
      //       start: "top 70%",
      //       once: true,
      //     },
      //   },
      // );

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
          gap-16
          px-10 py-24
          lg:grid-cols-[280px_1fr]
          lg:items-center
          lg:gap-20
          lg:py-20
        "
      >
        {/* Left profile area */}
        <div className="w-full lg:translate-x-4 xl:translate-x-8 lg:translate-y-8">
          <div ref={profileRef} className="w-full max-w-[280px]">
            <div
              className="
        group relative aspect-square w-full
        overflow-hidden rounded-[22px]
        border border-white/10
        bg-dark-card
      "
            >
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

            <div className="mt-8">
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

        {/* Right vision content */}
        <div ref={contentRef} className="w-full max-w-[620px]">
          {/* Section label */}
          <div ref={labelRef} className="mb-14 flex w-full items-center gap-5">
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
            className="
              max-w-[600px]
              font-display font-medium
              tracking-tight
              leading-[1.1]
              text-[46px] 
              font-light
            "
            style={{ wordSpacing: "0.12em" }}
          >
            <span className="text-white ">
              I believe that AI should not just automate tasks, but amplify{" "}
            </span>
            <span className="text-[#303030]">
              the creative and strategic potential of every human.
            </span>
          </h2>

          {/* Supporting paragraph */}
          <p
            ref={descriptionRef}
            className="
              mt-12 max-w-[610px]
              font-body text-sm
              leading-[1.65]
              text-dark-text
              sm:text-[15px]
              lg:mt-14
            "
          >
            By merging technical rigor with intuitive design, we build systems
            that don&apos;t just solve problems,they create entirely new
            opportunities for growth.
          </p>
        </div>
      </div>
    </section>
  );
}
