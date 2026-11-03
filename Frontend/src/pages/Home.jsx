import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader .jsx";

// ── NEW hero (Hero_tem.jsx) ─── use this one
import HeroTem from "../components/sections/Hero_tem";

// ── ORIGINAL hero (Hero.jsx) ─── kept intact, not deleted
// import Hero from "../components/sections/Hero";

import Philosophy from "../components/sections/Philosophy";
import MyProcess from "../components/sections/MyProcess";
import Blog from "../components/sections/Blog";
import Testimonial from "../components/sections/Testimonial";
import Services from "../components/sections/Services";
import ServiceShowcaseSection from "../components/sections/ServiceShowcaseSection";
import Trustsection from "../components/sections/Trustsection";
import BeyondWork from "../components/sections/BeyondWork";
import VisionSection from "../components/sections/VisionSection";
import Darkhero from "../components/sections/Darkhero";
import usePageSEO from "../hooks/usePageSEO";

let preloaderHasPlayed = false;

export default function Home() {
  usePageSEO({
    title: "Ishara Udayanga | Full Stack Developer & Designer",
    description:
      "Explore the portfolio of Ishara Udayanga, a full-stack developer and product designer based in Sri Lanka. Discover web applications, UI/UX design and projects.",
    canonical: "https://ishara.live/",
    ogTitle: "Ishara Udayanga | Full Stack Developer & Designer",
    ogDescription:
      "Explore the portfolio of Ishara Udayanga, a full-stack developer and product designer based in Sri Lanka. Discover web applications, UI/UX design and projects.",
    ogUrl: "https://ishara.live/",
    ogImage: "https://ishara.live/og-image.png",
    twitterTitle: "Ishara Udayanga | Full Stack Developer & Designer",
    twitterDescription:
      "Explore my full-stack development, design and digital product projects.",
    twitterImage: "https://ishara.live/og-image.png",
  });
  const [showPreloader, setShowPreloader] = useState(!preloaderHasPlayed);

  // Prevent scroll during loading
  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = "hidden";
      window.lenis?.stop();
    } else {
      document.body.style.overflow = "";
      window.lenis?.start();
      const timer = setTimeout(() => {
        window.lenis?.resize();
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    preloaderHasPlayed = true; // persists for the lifetime of this JS module
    setShowPreloader(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* ── NEW cinematic dark hero ── */}
      <HeroTem preloaderDone={!showPreloader} />

      {/* ── Original hero — commented out, not deleted ──
      <Hero preloaderDone={!showPreloader} />
      */}

      <div id="floating-contact-trigger">
        <Testimonial />
      </div>

      <Services />
      <ServiceShowcaseSection />
      <Trustsection />
      <MyProcess />
      <Blog />
      <BeyondWork />
      <VisionSection />
      {/* <Darkhero /> */}
      {/* <Philosophy /> */}
    </>
  );
}
