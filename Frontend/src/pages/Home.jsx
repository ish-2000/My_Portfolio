import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader .jsx";
import Hero from "../components/sections/Hero";
import PositioningStrip from "../components/sections/PositioningStrip";
import SelectedWork from "../components/sections/SelectedWork";
import Philosophy from "../components/sections/Philosophy";
import Capabilities from "../components/sections/Capabilities";
import MyProcess from "../components/sections/MyProcess";
import TrustSignals from "../components/sections/TrustSignals";
import SoftCTA from "../components/sections/SoftCTA";
import Testimonial from "../components/sections/Testimonial";
import Services from "../components/sections/Services";
import ServiceShowcaseSection from "../components/sections/ServiceShowcaseSection";
import Trustsection from "../components/sections/Trustsection";
import BeyondWork from "../components/sections/BeyondWork";

// Module-level flag: resets to false on every hard refresh (JS re-executes),
// but stays true during SPA navigation (module stays in memory).
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
      <PositioningStrip />
      <SelectedWork />
      <Philosophy />
      <Capabilities />
      <TrustSignals />
      <SoftCTA />
    </>
  );
}
