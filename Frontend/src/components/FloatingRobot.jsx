import { useState, useEffect } from "react";
import robotGif from "../assets/images/Robot-avatar-default.gif";
import RobotChatBox from "./RobotChatBox";

export default function FloatingRobot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Scroll visibility: show after 20% of viewport
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.2);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Chatbox panel ─────────────────────────────────────────── */}
      <RobotChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* ── Floating robot wrapper ─────────────────────────────────── */}
      <div
        id="floating-robot"
        className={`
          fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9998]
          transition-all duration-700 ease-out
          ${
            isVisible
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-20 opacity-0 pointer-events-none"
          }
        `}
      >
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setChatOpen((p) => !p)}
          aria-label={chatOpen ? "Close assistant chat" : "Open assistant chat"}
          aria-expanded={chatOpen}
          aria-controls="robot-chatbox"
          className="relative block focus:outline-none cursor-pointer bg-transparent border-none p-0"
        >
          {/* Ambient glow - constant color, only scales */}
          <div
            className="absolute inset-1 rounded-full pointer-events-none opacity-65 transition-transform duration-300 ease-out"
            style={{
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(56, 189, 248, 0.18) 40%, transparent 60%)",
              filter: "blur(6px)",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />

          {/* Ground shadow */}
          <div
            className="absolute -bottom-1.5 left-1/2 rounded-full pointer-events-none transition-transform duration-300 ease-out"
            style={{
              width: "38px",
              height: "7px",
              background:
                "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.25) 0%, transparent 70%)",
              filter: "blur(3px)",
              opacity: 0.55,
              transform: `translateX(-50%) ${isHovered ? "scale(1.08)" : "scale(1)"}`,
            }}
          />

          {/* Robot GIF */}
          <div
            className="relative w-24 h-24 sm:w-[100px] sm:h-[100px]"
            style={{
              animation: chatOpen
                ? "none"
                : "robotBob 3.2s ease-in-out infinite",
              transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              transform: chatOpen ? "rotate(-8deg) scale(1.08)" : isHovered ? "scale(1.06)" : "scale(1)",
            }}
          >
            <img
              src={robotGif}
              alt="Robot assistant"
              draggable={false}
              className="w-full h-full object-contain select-none"
              style={{
                filter:
                  "drop-shadow(0 3px 10px rgba(0,0,0,0.14)) drop-shadow(0 0 6px rgba(147, 197, 253, 0.25))",
                transition: "transform 0.3s ease-out",
              }}
            />
          </div>

          {/* Chat-open indicator badge */}
          {chatOpen && (
            <span
              className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white"
              style={{ background: "#7C3AED" }}
            />
          )}
        </button>

        <style>{`
          @keyframes robotBob {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50%       { transform: translateY(-10px) rotate(1deg); }
          }
        `}</style>
      </div>
    </>
  );
}

