import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Words Preloader — cycles through words on a dark background,
// then reveals the page with an expanding white circle from
// the center of the screen.
//
// Usage:
//   const [showPreloader, setShowPreloader] = useState(true);
//
//   <AnimatePresence mode="wait">
//     {showPreloader && (
//       <Preloader onComplete={() => setShowPreloader(false)} />
//     )}
//   </AnimatePresence>
// ─────────────────────────────────────────────────────────────

const WORDS = ["Hello", "Namaste", "Bonjour", "Hola", "Ciao"];

// Short pause after the dark bg is on-screen before word 1 appears.
const START_DELAY = 450;

// Word 1: slow, calm fade-in AND a longer hold before switching.
// Words 2+: original quick fade & cycle.
const FIRST_WORD_ENTER = 1.1;
const FIRST_WORD_HOLD = 1000;
const REST_WORD_ENTER = 0.3;
const REST_WORD_HOLD = 260;

// Ending — last word gracefully fades, then white circle expands.
const LAST_WORD_HOLD = 700; // ms last word sits before fading
const LAST_WORD_EXIT = 0.5; // seconds last word takes to fade out
const CIRCLE_DURATION = 0.85; // seconds for the circle to expand fully

// The moment (as a fraction of CIRCLE_DURATION) at which we unmount.
// Firing slightly before 1.0 means we swap to the portfolio the instant
// the circle covers the screen — no lingering white flash.
const UNMOUNT_AT = 0.9;

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [wordsStarted, setWordsStarted] = useState(false);
  const [wordDone, setWordDone] = useState(false);
  const [circleActive, setCircleActive] = useState(false);
  const [dimensionSet, setDimensionSet] = useState(false);

  useEffect(() => {
    setDimensionSet(true);
  }, []);

  // Once ready, wait a beat before showing word 1.
  useEffect(() => {
    if (!dimensionSet) return;
    const timer = setTimeout(() => setWordsStarted(true), START_DELAY);
    return () => clearTimeout(timer);
  }, [dimensionSet]);

  // Cycle through words. Last word triggers its own fade-out sequence.
  useEffect(() => {
    if (!wordsStarted) return;

    const isLast = index === WORDS.length - 1;
    if (isLast) {
      const timer = setTimeout(() => setWordDone(true), LAST_WORD_HOLD);
      return () => clearTimeout(timer);
    }

    const hold = index === 0 ? FIRST_WORD_HOLD : REST_WORD_HOLD;
    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, hold);
    return () => clearTimeout(timer);
  }, [index, wordsStarted]);

  // Once the last word has faded out, start the circle expansion.
  useEffect(() => {
    if (!wordDone) return;
    const timer = setTimeout(
      () => setCircleActive(true),
      LAST_WORD_EXIT * 1000,
    );
    return () => clearTimeout(timer);
  }, [wordDone]);

  // Unmount slightly before the circle fully completes so the switch
  // to the portfolio happens the instant the screen is covered.
  useEffect(() => {
    if (!circleActive) return;
    const timer = setTimeout(
      () => {
        onComplete?.();
      },
      CIRCLE_DURATION * UNMOUNT_AT * 1000,
    );
    return () => clearTimeout(timer);
  }, [circleActive, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      // No exit fade — unmount is instant so we don't sit on a white screen.
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#121212" }}
    >
      {dimensionSet && (
        <>
          {/* Cycling words */}
          <AnimatePresence mode="wait">
            {wordsStarted && !wordDone && (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: index === 0 ? FIRST_WORD_ENTER : REST_WORD_ENTER,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: index === WORDS.length - 1 ? LAST_WORD_EXIT : 0.2,
                    ease: "easeInOut",
                  },
                }}
                className="absolute z-10 text-white font-medium tracking-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                {WORDS[index]}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Expanding white circle — grows from a point in the center. */}
          <motion.div
            initial={{ scale: 0 }}
            animate={circleActive ? { scale: 1 } : { scale: 0 }}
            transition={{
              duration: CIRCLE_DURATION,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: "200vmax",
              height: "200vmax",
              transformOrigin: "center center",
            }}
          />
        </>
      )}
    </motion.div>
  );
}
