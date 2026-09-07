import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader .jsx";
import Hero from "../components/sections/Hero";
import Philosophy from "../components/sections/Philosophy";
import MyProcess from "../components/sections/MyProcess";
import Testimonial from "../components/sections/Testimonial";
import Services from "../components/sections/Services";
import ServiceShowcaseSection from "../components/sections/ServiceShowcaseSection";
import Trustsection from "../components/sections/Trustsection";
import BeyondWork from "../components/sections/BeyondWork";
import VisionSection from "../components/sections/VisionSection";
import Darkhero from "../components/sections/Darkhero";

let preloaderHasPlayed = false;

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(!preloaderHasPlayed);

  // Prevent scroll during loading
  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
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

      <Hero preloaderDone={!showPreloader} />

      <div id="floating-contact-trigger">
        <Testimonial />
      </div>

      <Services />
      <ServiceShowcaseSection />
      <Trustsection />
      <MyProcess />
      <BeyondWork />
      <VisionSection />
      <Darkhero />
      <Philosophy />
    </>
  );
}
