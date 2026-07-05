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
      <div className="max-w-[68rem]  mx-auto border-x border-surface-border px-10 py-28">
        <blockquote
          ref={quoteRef}
          className="font-display font-medium text-center max-w-3xl mx-auto"
          style={{ fontSize: "38px", lineHeight: "50px" }}
        >
          {/* Line 1 — grey, sets up the contrast */}
          <span className="block text-text-ghost">
            &ldquo;Most people hire a designer
          </span>
          {/* Line 2 — grey continues */}
          <span className="block text-text-ghost mb-1">or a developer.</span>
          {/* Line 3 — black, the punchline lands */}
          <span className="block text-text-primary">
            I&apos;m what happens when you
          </span>
          <span className="block text-text-primary">
            don&apos;t have to choose.&rdquo;
          </span>
        </blockquote>

        {/* Author */}
        <div
          ref={authorRef}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <img
            src={ProfileImg}
            alt="Ishara Udayanga"
            className="w-12 h-12 rounded-full object-cover"
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
