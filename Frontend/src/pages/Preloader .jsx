import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Words Preloader — cycles through words with a curved-path
// reveal, then slides away to unveil the site.
//
// Usage:
//   const [showPreloader, setShowPreloader] = useState(true);
//   useEffect(() => {
//     const timer = setTimeout(() => setShowPreloader(false), 2500);
//     return () => clearTimeout(timer);
//   }, []);
//
//   <AnimatePresence mode="wait">
//     {showPreloader && <Preloader onComplete={() => {}} />}
//   </AnimatePresence>
// ─────────────────────────────────────────────────────────────

const WORDS = ["Hello", "Namaste", "Bonjour", "Hola", "Ciao"];

// Short pause after the dark bg is on-screen before word 1 appears.
const START_DELAY = 450;

// Word 1: slow, calm fade-in AND a longer hold before switching.
// Words 2+: original quick fade & cycle.
const FIRST_WORD_ENTER = 1.1; // seconds — how long word 1 takes to fade in
const FIRST_WORD_HOLD = 1000; // ms — how long word 1 stays before cycling
const REST_WORD_ENTER = 0.3;
const REST_WORD_HOLD = 260;

const curveTransition = {
  duration: 0.7,
  ease: [0.76, 0, 0.24, 1], // easeInOutExpo-ish
};

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [wordsStarted, setWordsStarted] = useState(false);
  const [dimensionSet, setDimensionSet] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Track viewport size for the curved SVG mask
  useEffect(() => {
    const setDims = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setDimensionSet(true);
    };
    setDims();
    window.addEventListener("resize", setDims);
    return () => window.removeEventListener("resize", setDims);
  }, []);

  // Once the dark bg/curtain is on-screen, wait a beat before showing word 1.
  useEffect(() => {
    if (!dimensionSet) return;
    const timer = setTimeout(() => setWordsStarted(true), START_DELAY);
    return () => clearTimeout(timer);
  }, [dimensionSet]);

  // Cycle through words (only after the initial pause finishes).
  useEffect(() => {
    if (!wordsStarted) return;

    if (index >= WORDS.length - 1) {
      // small delay so the last word is visible before the curtain lifts
      const finishTimer = setTimeout(() => {
        onComplete?.();
      }, 600);
      return () => clearTimeout(finishTimer);
    }

    const hold = index === 0 ? FIRST_WORD_HOLD : REST_WORD_HOLD;
    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, hold);
    return () => clearTimeout(timer);
  }, [index, wordsStarted, onComplete]);

  // Curved SVG paths for the "reveal" curtain effect
  const initialPath = dimensionSet
    ? `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width / 2} ${dimensions.height + 300} 0 ${dimensions.height} L0 0`
    : "";

  const targetPath = dimensionSet
    ? `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width / 2} ${dimensions.height} 0 ${dimensions.height} L0 0`
    : "";

  const curve = {
    initial: { d: initialPath },
    exit: { d: targetPath, transition: curveTransition },
  };

  const slideUp = {
    initial: { top: 0 },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#121212" }}
    >
      {dimensionSet && (
        <>
          <AnimatePresence mode="wait">
            {wordsStarted && (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: index === 0 ? FIRST_WORD_ENTER : REST_WORD_ENTER,
                  },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="absolute z-10 text-white font-medium tracking-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                {WORDS[index]}
              </motion.p>
            )}
          </AnimatePresence>

          <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)]">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="#121212"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
