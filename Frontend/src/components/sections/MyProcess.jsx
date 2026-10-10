import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    index: "/01",
    title: "Creative Discovery",
    description:
      "Every project starts with understanding your goals, your audience, and where your product fits in the market. Through focused conversations and research, we build a foundation that keeps every decision grounded in purpose.",
  },
  {
    index: "/02",
    title: "Design Blueprint",
    description:
      "Insights become structure. I map user flows, wireframe key screens, and shape a visual direction that fits your brand. You see and approve the blueprint before a single line of code is written — no surprises later.",
  },
  {
    index: "/03",
    title: "Precision Build",
    description:
      "This is where being a designer who codes pays off. The design is engineered exactly as intended — pixel-accurate, fast, and built on clean, scalable code. Nothing gets lost in translation between design and development.",
  },
  {
    index: "/04",
    title: "Test & Refine",
    description:
      "Before launch, I test the product across screen sizes and browsers, check key user journeys, and review accessibility and performance. Your feedback helps me fix issues and refine the details, so the final result looks right and works smoothly.",
  },
  {
    index: "/05",
    title: "Launch & Evolve",
    description:
      "We ship, then we listen. I handle deployment, monitor real usage, and refine based on how people actually interact with the product. A launch is the starting line — not the finish.",
  },
];

export default function MyProcess() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const headingRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // ── Left heading — blur reveal on section enter ──
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

      // ── Pin the heading ──
      // Heading starts at the top of the section and scrolls naturally.
      // When its vertical centre reaches the viewport centre → it pins.
      // Releases when the section bottom exits the viewport.

      // ── Each step — rise-in on enter ──
      stepRefs.current.forEach((step) => {
        if (!step) return;

        gsap.fromTo(
          step,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 80%", once: true },
          },
        );

        const line = step.querySelector(".process-divider");
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              delay: 0.3,
              ease: "power2.inOut",
              transformOrigin: "left center",
              scrollTrigger: { trigger: step, start: "top 80%", once: true },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="w-full bg-surface overflow-visible"
    >
      <div className="max-w-6xl mx-auto border-surface-border px-4 sm:px-6 md:px-10 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 items-stretch">
          {/* ── Left — heading starts at top, GSAP pins at viewport centre on desktop ── */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center pt-10 sm:pt-14 pb-0 lg:py-0">
            <div ref={headingRef}>
              <h2 className="font-display font-medium tracking-tighter">
                <span className="block text-text-ghost text-[26px] xs:text-[28px] sm:text-[34px] md:text-[38px] leading-[1.12]">
                  From ideas to
                </span>
                <span className="block text-text-primary text-[26px] xs:text-[28px] sm:text-[34px] md:text-[38px] leading-[1.12]">
                  products that work.
                </span>
              </h2>
            </div>
          </div>

          {/* ── Right — scrolling steps ── */}
          <div className="flex flex-col py-0 lg:py-32">
            {STEPS.map((step, i) => (
              <div
                key={step.index}
                ref={(el) => (stepRefs.current[i] = el)}
                className="will-change-transform"
              >
                <div className="py-7 sm:py-10 lg:py-14">
                  <div className="flex items-start gap-2 mb-5">
                    <h3 className="font-display font-medium text-2xl text-text-primary tracking-tight leading-snug  mb-1 leading-snug ">
                      {step.title}
                    </h3>
                    <span className="font-body text-xs text-text-placeholder pt-1">
                      {step.index}
                    </span>
                  </div>

                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="process-divider h-px bg-surface-border origin-left" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
