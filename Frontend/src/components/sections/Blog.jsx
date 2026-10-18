import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import blogCafeImg from "../../assets/images/blog-cafe.jpg";

gsap.registerPlugin(ScrollTrigger);

const BLOG_TAGS = ["TECHNOLOGY", "FUTURE", "CULTURE", "PERSONAL", "NOTES"];

export default function Blog() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Signature blur reveal for main title
      gsap.fromTo(
        headerRef.current,
        { filter: "blur(12px)", opacity: 0, y: 25 },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      // Supporting narrative fade
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      // Cafe photo gentle reveal
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      // Quote & details reveal
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative w-full bg-[#FFFFFF] py-16 sm:py-20 lg:py-28 overflow-hidden select-text"
    >
      <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* ── Architectural Grid Shell ── */}
        <div className="relative w-full">
          {/* Extended architectural crosshair lines (hidden on mobile, visible on desktop) */}
          {/* Top horizontal extension */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -left-12 -right-12 top-0 h-px bg-[#E5E5E5] pointer-events-none"
          />
          {/* Middle horizontal extension */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -left-12 -right-12 top-[200px] h-px bg-[#E5E5E5] pointer-events-none"
          />
          {/* Bottom horizontal extension */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -left-12 -right-12 bottom-0 h-px bg-[#E5E5E5] pointer-events-none"
          />
          {/* Left vertical extension */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-0 -top-10 -bottom-10 w-px bg-[#E5E5E5] pointer-events-none"
          />
          {/* Center vertical divider extension */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-[65.5%] -top-10 -bottom-10 w-px bg-[#E5E5E5] pointer-events-none"
          />
          {/* Right vertical extension */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute right-0 -top-10 -bottom-10 w-px bg-[#E5E5E5] pointer-events-none"
          />

          {/* ── Top Row: Header (Left: Tag + Headline, Right: Narrative) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[65.5%_34.5%] border-t lg:border-t-0 border-[#E5E5E5]">
            {/* Top Left: WRITING / 01 + Main Headline */}
            <div
              ref={headerRef}
              className="pt-8 pb-8 pr-4 sm:pt-10 sm:pb-10 sm:pr-8 lg:pt-12 lg:pb-12 lg:pl-10 lg:pr-12 flex flex-col justify-center"
            >
              <h2 className="font-display tracking-tight text-3xl xs:text-4xl sm:text-[44px] md:text-[50px] lg:text-[52px] leading-[1.08]">
                 <span className="block text-text-ghost text-[26px] xs:text-[28px] sm:text-[34px] md:text-[38px] leading-[1.12]">
                  I write about
                </span>
               <span className="block text-text-primary text-[26px] xs:text-[28px] sm:text-[34px] md:text-[38px] leading-[1.12]">
                  the ideas shaping tomorrow.
                </span>
              </h2>
            </div>

            {/* Top Right: Narrative */}
            <div
              ref={descRef}
              className="border-t lg:border-t-0 border-[#E5E5E5] py-6 sm:py-8 lg:py-12 lg:pl-12 lg:pr-8 flex items-center"
            >
              <p className="font-body text-[14px] sm:text-[15px] text-[#5E5D59] leading-[1.65] max-w-[340px]">
                Beyond building digital products, I write about technology,
                culture, and the ideas changing how we live.
              </p>
            </div>
          </div>

          {/* Mobile horizontal divider */}
          <div className="block lg:hidden h-px bg-[#E5E5E5] w-full" />

          {/* ── Bottom Row: Cafe photo on Left, Quote & Link on Right ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[65.5%_34.5%]">
            {/* Bottom Left: Featured Photo */}
            <div
              ref={imageRef}
              className="py-3 sm:py-4 lg:py-4 lg:pl-5 lg:pr-5 flex items-center justify-center"
            >
              <div className="group relative w-full overflow-hidden bg-[#EBEAE5] shadow-[0_2px_14px_rgba(0,0,0,0.03)]">
                <img
                  src={blogCafeImg}
                  alt="Cafe table with book So Good They Can't Ignore You by Cal Newport, cup of coffee, and brownie"
                  width={1100}
                  height={656}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto aspect-[1.75/1] object-cover transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Bottom Right: Quote, Author, Link, Topics */}
            <div
              ref={contentRef}
              className="border-t lg:border-t-0 border-[#E5E5E5] py-8 sm:py-10 lg:py-8 lg:pl-12 lg:pr-8 flex flex-col justify-between"
            >
              {/* Quote & Author */}
              <div>
                <blockquote className="font-display font-medium text-xl sm:text-2xl lg:text-[34px] text-text-primary tracking-tight leading-[1.18] mb-3 sm:mb-4">
                  <span className="text-text-muted">Writing</span> helps me slow
                  down, question what&apos;s changing, and share the ideas worth
                  thinking about.
                </blockquote>
                <p className="font-body text-sm sm:text-[15px] text-[#8A8882] mt-4 sm:mt-5 font-normal tracking-wide">
                  &mdash;&nbsp;Ishara Udayanga
                </p>
              </div>

              {/* Action Link & Tags */}
              <div className="mt-8 sm:mt-12 lg:mt-14">
                <a
                  href="https://blog.ishara.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline text-sm sm:text-[15px] font-medium text-[#000000] hover:text-black transition-colors w-fit"
                  aria-label="Read my latest writing on blog.ishara.live (opens in a new tab)"
                >
                  <span className="underline decoration-1 underline-offset-4 group-hover:text-black">
                    Read my latest writing
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[#7C3AED] no-underline text-base font-normal inline-block ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>

                {/* Hairline Divider */}
                <div className="h-px bg-[#E5E5E5] w-full my-6 sm:my-7" />

                {/* Topics List */}
                <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#8A8882] uppercase flex flex-wrap items-center gap-x-3 gap-y-2 select-none">
                  {BLOG_TAGS.map((tag, idx) => (
                    <span key={tag} className="flex items-center gap-3">
                      <span>{tag}</span>
                      {idx < BLOG_TAGS.length - 1 && (
                        <span className="text-[#D4D2CD] text-xs font-sans">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
