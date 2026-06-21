import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// ─── Value points shown below the intro ───────────────────
const VALUE_POINTS = [
  {
    title: "Strategy first",
    description:
      "Every call starts with understanding your goals — not jumping into pixels.",
  },
  {
    title: "Zero commitment",
    description:
      "A quick 20-minute chat to see if we're the right fit. No strings attached.",
  },
  {
    title: "Clear next steps",
    description:
      "You'll walk away with actionable direction, whether we work together or not.",
  },
];

export default function LetsTalkContent() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const pointsRef = useRef([]);

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* Availability badge */}
      {/* <div
        ref={badgeRef}
        className="inline-flex items-center gap-2 bg-surface border border-surface-border rounded-pill px-4 py-1.5 mb-7 w-fit"
      >
        <span className="w-2 h-2 rounded-full bg-success flex-shrink-0 pulse-dot" />
        <span className="font-display font-semibold text-sm text-text-secondary tracking-tight">
          Available for projects
        </span>
      </div> */}

      {/* Heading */}
      <h1 ref={headingRef} className="mb-5 pt-10">
        <span
          className="block font-display font-medium tracking-tighter"
          style={{ fontSize: "clamp(36px, 5vw, 58px)", lineHeight: "1.02" }}
        >
          Let&apos;s talk about your
        </span>

        <span
          className="block font-display font-medium tracking-tighter"
          style={{ fontSize: "clamp(36px, 5vw, 58px)", lineHeight: "1.12" }}
        >
          next{" "}
          <span className="text-text-ghost ml-1">
            product, website or brand.
          </span>
        </span>
      </h1>

      {/* Intro paragraph */}
      <p
        ref={introRef}
        className="font-body text-base text- text-text-secondary font-display text-lg leading-snug  max-w-lg mb-10"
      >
        Book a short call to discuss your idea, design direction, website,
        mobile app, or brand experience. I&apos;ll help you find the clearest
        next step.
      </p>
    </div>
  );
}
