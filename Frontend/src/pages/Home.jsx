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

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

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

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <Hero />

      <div id="floating-contact-trigger">
        <Testimonial />
      </div>

      <Services />
      <ServiceShowcaseSection />
      <PositioningStrip />
      <SelectedWork />
      <Philosophy />
      <Capabilities />
      <MyProcess />
      <TrustSignals />
      <SoftCTA />
    </>
  );
}
