import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    index: "001",
    title: "Product Thinking & Engineering",
    description:
      "I bring a unique mix of hands-on product engineering.building digital products that are practical, well-thought-out, and grounded in real user needs.",
    tagLabel: "Roles & Tools",
    tags: ["Product Engineer", "Web & Digital Systems", "MVP Development"],
  },
  {
    index: "002",
    title: "Research-Driven Discovery",
    description:
      "Using modern product thinking and academic research depth to design solutions that scale and make sense in the complex real world.",
    tagLabel: "Industries",
    tags: ["Education", "Research", "Agritech", "Digital Platforms"],
  },
  {
    index: "003",
    title: "Founder-Led Strategy",
    description:
      "Real startup co-founder experience from idea to execution. Staying focused on one goal.building products that create long-term value.",
    tagLabel: "Expertise",
    tags: ["Product Strategy", "Innovation Consulting", "Market Mapping"],
  },
];

export default function TrustSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contextRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
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
          },
        },
      );

      // Context line — types in from the right
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

      // Cards — rise with stagger, index numbers count-flicker
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRefs.current[0],
            start: "top 85%",
            once: true,
          },
        },
      );

      // Divider lines inside cards grow from left after cards land
      cardRefs.current.forEach((card, i) => {
        const line = card.querySelector(".trust-divider");
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.4 + i * 0.15,
            ease: "power2.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: cardRefs.current[0],
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="trust" ref={sectionRef} className="w-full bg-surface">
      <div className="max-w-6xl mx-auto  px-10 py-28">
        {/* ── Header row: headline left, context right ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
          <div ref={headingRef}>
            {/* <p className="font-body text-sm font-medium tracking-widest uppercase text-text-muted mb-3">
              / Why trust me
            </p> */}
            <h2 className="font-display font-medium tracking-tighter">
              <span
                className="block text-text-ghost"
                style={{ fontSize: "58px", lineHeight: "58px" }}
              >
                Why you can
              </span>
              <span
                className="block text-text-primary"
                style={{ fontSize: "58px", lineHeight: "58px" }}
              >
                trust my work.
              </span>
            </h2>
          </div>

          {/* Context line — engineering-note style, right aligned */}
          <p
            ref={contextRef}
            className="font-body text-xs tracking-widest uppercase text-text-muted text-left lg:text-right leading-loose lg:max-w-xs lg:pt-2"
          >
            Experience across engineering, research, and real startup building
          </p>
        </div>

        {/* ── Blueprint grid — sharp edges, collapsed borders ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-surface-border">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.index}
              ref={(el) => (cardRefs.current[i] = el)}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative border-b border-r border-surface-border p-8 lg:p-10 flex flex-col will-change-transform bg-surface hover:bg-surface-raised transition-colors duration-300"
            >
              {/* Index */}
              <div className="flex items-center justify-between mb-14">
                <span className="font-body text-xs tracking-widest text-text-placeholder group-hover:text-text-primary transition-colors duration-300">
                  {pillar.index}
                </span>
                {/* Corner tick — subtle engineering mark */}
                <motion.span
                  variants={{
                    rest: { opacity: 0, x: -6 },
                    hover: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.25 }}
                  className="font-body text-xs text-text-placeholder"
                  aria-hidden="true"
                >
                  ↗
                </motion.span>
              </div>

              {/* Title */}
              <h3 className="font-display font-semibold text-2xl text-text-primary tracking-tight leading-snug mb-4">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-text-muted leading-relaxed mb-10 flex-1">
                {pillar.description}
              </p>

              {/* Divider — grows in via GSAP */}
              <div className="trust-divider h-px bg-surface-border/80 mb-5" />

              {/* Tags */}
              <div>
                <p className="font-body text-[11px] tracking-widest uppercase text-text-placeholder mb-3">
                  {pillar.tagLabel}
                </p>
                <p className="font-body text-xs tracking-wide uppercase text-text-secondary leading-loose">
                  {pillar.tags.join("  ·  ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
