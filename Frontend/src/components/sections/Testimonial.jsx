import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AuthorImg from "../../assets/images/Me.png";

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
    <section ref={sectionRef} className="w-full bg-surface">
      <div className="max-w-[68rem] mx-auto border-x border-surface-border px-10 py-28">
        {/* Quote */}
        <blockquote
          ref={quoteRef}
          className="font-display text-text-primary font-medium text-center text-text-ghost max-w-3xl mx-auto"
          style={{ fontSize: "28px", lineHeight: "38px" }}
        >
          &ldquo;Working with Ishara felt like having a seasoned design partner{" "}
          <span className="text-text-primary font-semibold">
            who truly understood our vision for KYMA
          </span>{" "}
          and brought it to life in ways we hadn&apos;t even imagined.&rdquo;
        </blockquote>

        {/* Author */}
        <div
          ref={authorRef}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <img
            src={AuthorImg}
            alt="Thomas Weber"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-left">
            <div className="font-display font-semibold text-sm text-text-primary">
              Thomas Weber
            </div>
            <div className="font-body font-semibold text-xs text-text-muted">
              Co-founder of KYMA
            </div>
          </div>
        </div>
      </div>
      {/* Bottom full-width divider — closes the strip */}
      <div className="relative h-px">
        <div className="absolute left-1/2 -translate-x-1/2 w-screen h-px bg-surface-border" />
      </div>
    </section>
  );
}
