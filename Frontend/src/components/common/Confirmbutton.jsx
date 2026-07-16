import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

/*
  Drop-in replacement for your Confirm Discussion button.
  Props mirror the state you already have in the form.

  <ConfirmButton
    onClick={handleSubmit}
    selectedDate={selectedDate}
    email={email}
    isLoading={isLoading}
    isReserved={isReserved}
  />
*/
export default function ConfirmButton({
  onClick,
  selectedDate,
  email,
  isLoading,
  isReserved,
}) {
  const isReady = selectedDate && email.trim() && !isLoading && !isReserved;

  return (
    <button
      onClick={onClick}
      disabled={!selectedDate || !email.trim() || isLoading || isReserved}
      className={`
        relative w-full py-3 rounded-full font-display text-sm font-semibold
        overflow-hidden transition-colors duration-300
        ${
          isReserved
            ? "bg-green-600 text-white cursor-default"
            : isReady
              ? "bg-dark text-dark-text hover:opacity-90 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              : "bg-surface-subtle text-text-muted cursor-not-allowed"
        }
      `}
    >
      {/* ── Flying paper plane — plays once on success ── */}
      <AnimatePresence>
        {isReserved && (
          <motion.span
            key="plane"
            initial={{ x: "-140%", y: 6, opacity: 0, rotate: -12 }}
            animate={{
              x: ["-140%", "0%", "160%"],
              y: [6, -4, -14],
              opacity: [0, 1, 1, 0],
              rotate: [-12, -4, 8],
            }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-y-1/2 z-10"
          >
            <Send className="w-4 h-4 text-white -rotate-45" strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>

      {/* ── Label — swaps with a soft crossfade ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isReserved ? "sent" : isLoading ? "loading" : "idle"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-0 inline-flex items-center justify-center gap-2"
        >
          {isReserved ? (
            <>
              <span>Request Sent</span>
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.9,
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
              >
                ✓
              </motion.span>
            </>
          ) : isLoading ? (
            "Sending…"
          ) : (
            "Confirm Discussion"
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
