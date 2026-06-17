import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Tech stack icons ─────────────────────────────────────
import FigmaIcon from "/icons/figma.svg";
import FramerIcon from "/icons/framer.svg";
import WebflowIcon from "/icons/webflow.svg";
import RemixIcon from "/icons/remix.svg";
import BlenderIcon from "/icons/blender.svg";
import TrelloIcon from "/icons/trello.svg";
import OpenAIIcon from "/icons/openai.svg";
import AnthropicIcon from "/icons/anthropic.svg";

// ─── Service icons (lucide-style, inline) ─────────────────
import {
  Code2,
  Palette,
  AppWindow,
  LayoutTemplate,
  Sparkles,
  Box,
  PenTool,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  { name: "Figma", icon: FigmaIcon },
  { name: "Framer", icon: FramerIcon },
  { name: "Webflow", icon: WebflowIcon },
  { name: "Remix", icon: RemixIcon },
  { name: "Blender", icon: BlenderIcon },
  { name: "Trello", icon: TrelloIcon },
  { name: "OpenAI", icon: OpenAIIcon },
  { name: "Anthropic", icon: AnthropicIcon },
];

const SERVICES = [
  { label: "Framer Development", Icon: Code2 },
  { label: "Brand Design", Icon: Palette },
  { label: "Web Apps", Icon: AppWindow },
  { label: "Landing Pages", Icon: LayoutTemplate },
  { label: "Motion Graphics", Icon: Sparkles },
  { label: "3D Design", Icon: Box },
  { label: "UX / UI Consultation", Icon: PenTool },
];

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const techRef = useRef(null);
  const serviceRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
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
      gsap.fromTo(
        techRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        serviceRefs.current,
        { opacity: 0, x: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="w-full bg-surface">
      <div className="max-w-[68rem] mx-auto border-x border-surface-border px-10 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left — heading + tech stack ── */}
          <div ref={headingRef}>
            <h2 className="font-display font-medium tracking-tighter mb-8">
              <span
                className="block text-text-ghost"
                style={{ fontSize: "56px", lineHeight: "56px" }}
              >
                Services that
              </span>
              <span
                className="block text-text-primary"
                style={{ fontSize: "56px", lineHeight: "56px" }}
              >
                supercharge your business.
              </span>
            </h2>

            <div ref={techRef}>
              <p className="font-body text-sm font-semibold text-text-muted mb-4">
                My tech stack
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <div
                    key={tech.name}
                    title={tech.name}
                    className="w-12 h-12 rounded-xl bg-surface border border-surface-border flex items-center justify-center shadow-sm"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right — services list ── */}
          <div className="flex flex-col gap-5 lg:pl-10">
            {SERVICES.map(({ label, Icon }, i) => (
              <div
                key={label}
                ref={(el) => (serviceRefs.current[i] = el)}
                className="group flex items-center gap-4 cursor-default"
              >
                <div className="w-11 h-11 rounded-full bg-dark flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-dark-text" strokeWidth={1.8} />
                </div>
                <span className="font-display font-medium text-xl text-text-primary">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
