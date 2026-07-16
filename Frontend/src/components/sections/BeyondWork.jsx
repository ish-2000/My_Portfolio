import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    index: "001",
    title: "Blog",
    status: "Live",
    statusStyle: "live",
    icon: "https://res.cloudinary.com/dgvdlyxhw/image/upload/f_auto,q_auto,w_800/v1743191578/amari-james-bzdfrbaGztY-unsplash_th1wxr.jpg",
    description:
      "Thoughts on product design, engineering, and building digital experiences that actually work. Written from real projects, not theory.",
    cta: "Read articles",
    href: "#blog",
  },
  {
    index: "002",
    title: "Podcast",
    status: "Coming soon",
    statusStyle: "soon",
    icon: "https://res.cloudinary.com/dgvdlyxhw/image/upload/f_auto,q_auto,w_800/v1783953087/ChatGPT_Image_Jul_13_2026_08_00_43_PM_zlkvn3.png",
    description:
      "Conversations about design, code, and the space in between. Honest talks with people who build things for a living.",
    cta: "Get notified",
    href: "#podcast",
  },
  {
    index: "003",
    title: "Sponsorship & Collaborations",
    status: "Open",
    statusStyle: "live",
    icon: "https://res.cloudinary.com/dgvdlyxhw/image/upload/f_auto,q_auto,w_800/v1783952679/ChatGPT_Image_Jul_13_2026_07_54_09_PM_c96kfc.png",
    description:
      "Partnering with brands and creators who value quality. If you are building something interesting, there is probably a way we can work together.",
    cta: "Start a conversation",
    href: "/lets-talk",
  },
];

export default function BeyondWork() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Heading — blur reveal (signature)
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

      // Cards — rise with stagger
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

      // Divider lines grow after cards land
      cardRefs.current.forEach((card, i) => {
        const line = card.querySelector(".bw-divider");
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
    <section id="beyond" ref={sectionRef} className="w-full bg-dark">
      <div className="max-w-7xl mx-auto border-dark-border px-10 py-28">
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-16">
          {/* <p className="font-body text-sm font-medium tracking-widest uppercase text-dark-text-muted mb-3">
            / Beyond client work
          </p> */}
          <h2 className="font-display font-medium tracking-tighter">
            <span
              className="block text-dark-text-muted"
              style={{ fontSize: "58px", lineHeight: "58px" }}
            >
              More than
            </span>
            <span
              className="block text-white"
              style={{ fontSize: "58px", lineHeight: "58px" }}
            >
              just projects.
            </span>
          </h2>
        </div>

        {/* ── Blueprint grid — dark, sharp edges ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-dark-border">
          {ITEMS.map((item, i) => (
            <motion.a
              key={item.index}
              href={item.href}
              ref={(el) => (cardRefs.current[i] = el)}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative border-b border-r border-dark-border p-4 lg:p-4 flex flex-col will-change-transform bg-dark hover:bg-dark-elevated transition-colors duration-300 no-underline"
            >
              {/* Thumbnail Image Container */}
              <div className="mb-6 w-full aspect-[16/10] overflow-hidden border border-white/[0.08] bg-[#0c0c0c] shadow-2xl relative">
                <img
                  src={item.icon}
                  alt={`${item.title} thumbnail`}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Index + status row */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-body text-xs tracking-widest text-dark-text-muted group-hover:text-dark-text transition-colors duration-300">
                  {item.index}
                </span>

                {/* Status badge */}
                <span
                  className={`inline-flex items-center gap-1.5 font-body text-[10px] tracking-widest uppercase px-2.5 py-1 border ${
                    item.statusStyle === "live"
                      ? "border-dark-border text-dark-text"
                      : "border-dark-border text-dark-text-muted"
                  }`}
                >
                  {item.statusStyle === "live" && (
                    <span className="w-1.5 h-1.5 bg-success pulse-dot flex-shrink-0" />
                  )}
                  {item.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-medium text-2xl text-text-primary tracking-tight leading-snug  text-white mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-dark-text-muted leading-relaxed mb-10 flex-1">
                {item.description}
              </p>

              {/* Divider — grows via GSAP */}
              <div className="bw-divider h-px bg-dark-elevated mb-5" />

              {/* CTA row */}
              <div className="flex items-center justify-between">
                <span className="font-body text-xs tracking-widest uppercase text-dark-text-muted group-hover:text-dark-text transition-colors duration-300">
                  {item.cta}
                </span>
                <motion.span
                  variants={{
                    rest: { opacity: 0.4, x: 0 },
                    hover: { opacity: 1, x: 4 },
                  }}
                  transition={{ duration: 0.25 }}
                  className="text-dark-text"
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
