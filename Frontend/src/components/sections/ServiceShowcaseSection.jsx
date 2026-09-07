import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Media rules:
  - type: 'video' → mp4/webm, autoplays muted ONLY while in view (best performance)
  - type: 'gif'   → gif mounts ONLY when in view (prevents all gifs decoding at page load)
  Put files in /public/media/
*/
const SERVICES = [
  {
    index: "01",
    title: "Web Development",
    description:
      "Full-stack applications engineered for performance and scale.",
    type: "video",
    src: "https://res.cloudinary.com/dgvdlyxhw/video/upload/v1784127915/sample_rrrzqx.mp4",
  },
  {
    index: "02",
    title: "Brand Design",
    description: "Identities that communicate value and earn trust.",
    type: "video",
    src: "https://res.cloudinary.com/dgvdlyxhw/video/upload/v1784127915/sample_3_v4ovjv.mp4",
  },
  {
    index: "03",
    title: "Mobile Apps",
    description: "Data-driven products with seamless user experiences.",
    type: "video",
    src: "https://res.cloudinary.com/dgvdlyxhw/video/upload/v1784127916/sample_2_pjjuf0.mp4",
  },
  {
    index: "04",
    title: "Landing Pages",
    description: "High-converting pages built to capture and hold attention.",
    type: "video",
    src: "https://res.cloudinary.com/dgvdlyxhw/video/upload/v1784127915/sample_4_uvuaog.mp4",
  },
];

/* ── Media cell: activates only while visible ── */
function MediaCell({ type, src, title }) {
  const holderRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play / pause video with visibility — saves battery + CPU on mobile
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <div
      ref={holderRef}
      className="relative w-full aspect-[4/3] bg-surface-subtle overflow-hidden"
    >
      {type === "video" ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      ) : (
        /* GIF only mounts while visible — never decodes off-screen */
        inView && (
          <img
            src={src}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )
      )}
    </div>
  );
}

// Module-level flag: resets on hard refresh, persists during SPA navigation.
let showcaseAnimationHasPlayed = false;

export default function ServiceShowcaseSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contextRef = useRef(null);
  const cellRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (showcaseAnimationHasPlayed) {
        if (headingRef.current) {
          gsap.set(headingRef.current, {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
          });
        }
        if (contextRef.current) {
          gsap.set(contextRef.current, { opacity: 1, x: 0 });
        }
        gsap.set(cellRefs.current, { opacity: 1, y: 0 });
        return;
      }

      // Heading — signature blur reveal
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
            trigger: headingRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              showcaseAnimationHasPlayed = true;
            },
          },
        },
      );

      // Context line — slides in from the right
      gsap.fromTo(
        contextRef.current,
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // Cells — rise + settle, staggered. Transform/opacity only (mobile-safe)
      gsap.fromTo(
        cellRefs.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cellRefs.current[0],
            start: "top 85%",
            once: true,
            onEnter: () => {
              showcaseAnimationHasPlayed = true;
            },
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="w-full bg-surface border-b border-surface-border"
    >
      <div className="max-w-7xl mx-auto  px-10 pb-28 pt-16 ">
        {/* ── Header row: headline left, context right ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
          <div ref={headingRef}>
            <h2 className="font-display font-medium tracking-tighter">
              <span
                className="block text-text-ghost"
                style={{ fontSize: "58px", lineHeight: "58px" }}
              >
                What I am
              </span>
              <span
                className="block text-text-primary"
                style={{ fontSize: "58px", lineHeight: "58px" }}
              >
                Interested On
              </span>
            </h2>
          </div>

          {/* Context line — engineering-note style, right aligned */}
          <p
            ref={contextRef}
            className="font-body text-xs tracking-widest uppercase text-text-muted text-left lg:text-right leading-loose lg:max-w-xs lg:pt-2"
          >
            Specializing in digital product engineering, interactive websites,
            and brand systems
          </p>
        </div>

        {/* Blueprint grid — sharp edges, collapsed shared borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-surface-border">
          {SERVICES.map((service, i) => (
            <div
              key={service.index}
              ref={(el) => (cellRefs.current[i] = el)}
              className="group border-b border-r border-surface-border will-change-transform"
            >
              {/* Media */}
              <div className="p-5 pb-0">
                <MediaCell
                  type={service.type}
                  src={service.src}
                  title={service.title}
                />
              </div>

              {/* Meta bar */}
              <div className="flex items-start gap-5 p-5">
                <span className="font-display font-medium text-xs text-text-placeholder pt-1 flex-shrink-0">
                  {service.index}
                </span>
                <div>
                  <h3 className="font-display font-medium text-xl text-text-primary tracking-tight leading-snug  mb-1">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
                {/* Arrow — nudges on hover, desktop only */}
                <span
                  aria-hidden="true"
                  className="ml-auto pt-1 hidden md:block text-text-placeholder transition-transform duration-300 group-hover:translate-x-1 group-hover:text-text-primary"
                >
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
