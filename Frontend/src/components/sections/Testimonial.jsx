import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProfileImg from "../../assets/images/Me.png";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { filter: "blur(12px)", opacity: 0, y: 30 },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        authorRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-surface border-b border-surface-border">
      <div className="max-w-[68rem] mx-auto border-x border-surface-border px-5 sm:px-8 md:px-10 py-14 sm:py-20 md:py-28">
        <blockquote
          ref={quoteRef}
          className="font-display font-medium text-center max-w-3xl mx-auto text-[clamp(21px,5.8vw,38px)] leading-[1.3] sm:leading-[1.35] md:leading-[50px] tracking-tight"
        >
          {/* Line 1 & 2 — grey, sets up the contrast */}
          <span className="block text-text-ghost mb-1 md:mb-0">
            <span className="inline md:block">&ldquo;Most people hire a designer </span>
            <span className="inline md:block">or a developer.</span>
          </span>
          {/* Line 3 & 4 — black, the punchline lands */}
          <span className="block text-text-primary">
            <span className="inline md:block">I&apos;m what happens when you </span>
            <span className="inline md:block">don&apos;t have to choose.&rdquo;</span>
          </span>
        </blockquote>

        {/* Author */}
        <div
          ref={authorRef}
          className="flex items-center justify-center gap-3 mt-8 sm:mt-10"
        >
          <img
            src={ProfileImg}
            alt="Ishara Udayanga"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
          />
          <div className="text-left">
            <div className="font-display font-semibold text-sm text-text-primary">
              Ishara Udayanga
            </div>
            <div className="font-body text-xs text-text-muted">
              Full-stack Product Designer &amp; Developer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
