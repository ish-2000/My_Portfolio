import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Minimize2, Send, Mic, Phone } from "lucide-react";
import robotAvatar from "../assets/images/Robot-chat-avatar.webp";

const SUGGESTIONS = [
  "What services do you offer?",
  "How can we work together?",
  "What is your availability?",
  "What are your rates / pricing?",
];

function getBotResponse(userText) {
  const text = (userText || "").toLowerCase().trim();

  // 1. What services do you offer?
  if (
    text.includes("service") ||
    text.includes("offer") ||
    text.includes("what do you do") ||
    text.includes("specialize") ||
    text.includes("skill")
  ) {
    return "I specialize in brand design, UI/UX design, and frontend development, crafting digital experiences that bring your entire visual and digital identity to life.";
  }

  // 2. How can we work together?
  if (
    text.includes("work together") ||
    text.includes("collaborat") ||
    text.includes("hire") ||
    text.includes("contact") ||
    text.includes("reach") ||
    text.includes("connect")
  ) {
    return "I'd love to collaborate! We can connect in a few easy ways.you can book an appointment directly click here, message me on WhatsApp, or email me at ishara@ishara.live. Feel free to choose whichever works best for you!";
  }

  // 3. What is your availability?
  if (
    text.includes("availab") ||
    text.includes("timeline") ||
    text.includes("free") ||
    text.includes("when can you start")
  ) {
    return "I am full time available for freelance project. Contact me and let's discuss the timeline!";
  }

  // 4. What are your rates / pricing?
  if (
    text.includes("rate") ||
    text.includes("pricing") ||
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("charge") ||
    text.includes("budget")
  ) {
    return "My pricing depends on the scope of the project since every design and frontend build is unique. I focus heavily on top quality design and final product, but I keep my pricing very friendly and budget conscious compared to standard market rates. Let's chat about your project and we can work out a great deal!";
  }

  // Fallback for custom questions
  return "Thanks for asking! You can explore my services, book a call (click here), or reach me directly at ishara@ishara.live.";
}

function FormattedMessageText({ text, onClose }) {
  if (typeof text !== "string") return text;

  // Split by click here, /lets-talk, WhatsApp, ishara@ishara.live
  const regex = /(click here|\/lets-talk|WhatsApp|ishara@ishara\.live)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part === "click here" || part === "/lets-talk") {
      return (
        <Link
          key={i}
          to="/lets-talk"
          onClick={onClose}
          className="font-medium underline hover:text-[#6D28D9] transition-colors cursor-pointer"
          style={{ color: "#7C3AED" }}
        >
          {part}
        </Link>
      );
    }
    if (part === "WhatsApp") {
      return (
        <a
          key={i}
          href="https://wa.me/94712345678"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:text-[#15803d] transition-colors cursor-pointer"
          style={{ color: "#16a34a" }}
        >
          WhatsApp
        </a>
      );
    }
    if (part === "ishara@ishara.live") {
      return (
        <a
          key={i}
          href="mailto:ishara@ishara.live"
          className="font-medium underline hover:text-[#6D28D9] transition-colors cursor-pointer"
          style={{ color: "#7C3AED" }}
        >
          ishara@ishara.live
        </a>
      );
    }
    return part;
  });
}

function TypingDots() {
  return (
    <div className="flex items-end gap-1 px-4 py-3" style={{ height: 42 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#9CA3AF",
            display: "inline-block",
            animation: "typingDot 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg, visible, onClose }) {
  const isUser = msg.from === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(10px) scale(0.96)",
        transition:
          "opacity 0.35s cubic-bezier(0.34,1.56,0.64,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <div
        className="max-w-[80%] px-4 py-2.5 font-body"
        style={{
          fontSize: 13.5,
          lineHeight: 1.5,
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser
            ? "linear-gradient(135deg,#7C3AED,#6D28D9)"
            : "rgba(243,244,246,1)",
          color: isUser ? "#fff" : "#1f2937",
          boxShadow: isUser
            ? "0 2px 12px rgba(124,58,237,0.25)"
            : "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {isUser ? (
          msg.text
        ) : (
          <FormattedMessageText text={msg.text} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

export default function RobotChatBox({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [visibleIds, setVisibleIds] = useState(new Set());
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const chatboxRef = useRef(null);
  const chatContainerRef = useRef(null);
  const msgEndRef = useRef(null);
  const inputRef = useRef(null);
  const msgCounter = useRef(0);

  useEffect(() => {
    const el = chatboxRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // Allow pure horizontal scroll (e.g. for horizontal suggestion pills)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const container = chatContainerRef.current;
      if (!container) return;

      const { scrollHeight, clientHeight } = container;
      if (scrollHeight > clientHeight) {
        e.preventDefault();
        e.stopPropagation();

        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16;
        else if (e.deltaMode === 2) delta *= clientHeight;

        container.scrollTop += delta;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 420);
      if (!hasGreeted) {
        setHasGreeted(true);
        setTimeout(
          () =>
            addBotMessage(
              "Hey there! \uD83D\uDC4B I'm Ishara's assistant. What can I help you with today?",
            ),
          650,
        );
      }
    }
  }, [isOpen]);

  function addBotMessage(text) {
    const id = ++msgCounter.current;
    setMessages((p) => [...p, { id, from: "bot", text }]);
    setTimeout(() => setVisibleIds((s) => new Set([...s, id])), 40);
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    const id = ++msgCounter.current;
    setMessages((p) => [...p, { id, from: "user", text }]);
    setTimeout(() => setVisibleIds((s) => new Set([...s, id])), 40);
    setInputVal("");
    setIsTyping(true);
    const delay = 900 + Math.random() * 700;
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(getBotResponse(text));
    }, delay);
  }

  return (
    <>
      <style>{`
        @keyframes typingDot {
          0%,60%,100% { transform:translateY(0);    opacity:0.4; }
          30%          { transform:translateY(-5px); opacity:1;   }
        }
        @keyframes chatboxIn {
          0%   { opacity:0; transform:scale(0.82) translateY(28px); }
          65%  { opacity:1; transform:scale(1.025) translateY(-4px); }
          100% { opacity:1; transform:scale(1)     translateY(0);   }
        }
        @keyframes chatboxOut {
          0%   { opacity:1; transform:scale(1)    translateY(0);    }
          100% { opacity:0; transform:scale(0.86) translateY(22px); }
        }
        .chatbox-enter { animation: chatboxIn  0.46s cubic-bezier(0.34,1.56,0.64,1) both; }
        .chatbox-exit  { animation: chatboxOut 0.26s cubic-bezier(0.4,0,1,1) both;         }
        .chat-scroll {
          overflow-y: auto;
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.4) transparent;
        }
        .chat-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.45);
          border-radius: 9999px;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div
        id="robot-chatbox"
        ref={chatboxRef}
        className={`fixed bottom-[116px] right-6 md:right-8 z-[9999] w-[340px] sm:w-[370px] flex flex-col ${isOpen ? "chatbox-enter pointer-events-auto" : "chatbox-exit pointer-events-none"}`}
        style={{
          borderRadius: 24,
          overflow: "hidden",
          overscrollBehavior: "contain",
          background: "#ffffff",
          maxHeight: "calc(100vh - 135px)",
          height:
            messages.length > 0 ? "min(560px, calc(100vh - 135px))" : "auto",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.16), 0 2px 12px rgba(124,58,237,0.08), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
        role="dialog"
        aria-label="Chat with Ishara assistant"
      >
        {/* ── HEADER & HERO (with dotted fading background) ────── */}
        <div className="relative overflow-hidden bg-white flex-shrink-0">
          {/* Subtle dotted background with smooth fade (faded on left/top-left and bottom) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(140, 155, 185, 0.36) 0.8px, transparent 0.8px)",
              backgroundSize: "14px 14px",
              backgroundPosition: "0 0",
              maskImage:
                "radial-gradient(ellipse 130% 105% at 92% 10%, black 25%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.15) 80%, transparent 98%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 130% 105% at 92% 10%, black 25%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.15) 80%, transparent 98%)",
            }}
          />

          {/* TOP CONTROL BAR (minimise / close) */}
          <div className="relative z-10 flex items-center justify-end px-4 pt-3.5 pb-1">
            <div className="flex items-center gap-1">
              <button
                onClick={onClose}
                aria-label="Minimise"
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 transition-all duration-200"
              >
                <Minimize2 size={13} />
              </button>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* HERO — robot + greeting */}
          <div
            className={`relative z-10 px-5 transition-all duration-300 ${
              messages.length > 0 ? "pt-0 pb-2.5" : "pt-1.5 pb-5"
            }`}
          >
            <div className="flex items-end gap-3.5">
              <img
                src={robotAvatar}
                alt="Ishara assistant robot"
                draggable={false}
                className="flex-shrink-0 select-none transition-all duration-300"
                style={{
                  width: messages.length > 0 ? 48 : 70,
                  height: messages.length > 0 ? 48 : 70,
                  objectFit: "contain",
                  filter: "drop-shadow(0 4px 18px rgba(124,58,237,0.2))",
                }}
              />
              <div className="pb-1">
                <p
                  className="font-display font-semibold leading-snug text-gray-900 transition-all duration-300"
                  style={{
                    fontSize: messages.length > 0 ? 15 : 17,
                    lineHeight: 1.35,
                  }}
                >
                  Hey, what can <span style={{ color: "#7C3AED" }}>Ishara</span>{" "}
                  do for you today?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MESSAGES (shown only after chat starts) ───────────── */}
        {messages.length > 0 && (
          <div
            ref={chatContainerRef}
            className="chat-scroll flex-1 px-4 py-3 min-h-0"
            style={{
              overflowY: "auto",
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                visible={visibleIds.has(msg.id)}
                onClose={onClose}
              />
            ))}
            {isTyping && (
              <div className="flex justify-start mb-2">
                <div
                  style={{
                    background: "rgba(243,244,246,1)",
                    borderRadius: "18px 18px 18px 4px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={msgEndRef} />
          </div>
        )}

        {/* SUGGESTIONS */}
        {messages.length === 0 ? (
          <div
            className="px-4 pb-3 flex-shrink-0"
            style={{ borderTop: "1px solid #f3f4f6" }}
          >
            <p
              className="font-body text-gray-400 pt-2.5 mb-1.5"
              style={{ fontSize: 11 }}
            >
              Suggested
            </p>
            <div className="flex flex-col gap-1.5">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left px-3.5 py-2 rounded-xl font-body text-gray-700 transition-all duration-200"
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.4,
                    background: "rgba(243,244,246,1)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ede9ff";
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)";
                    e.currentTarget.style.color = "#5b21b6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(243,244,246,1)";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                    e.currentTarget.style.color = "#374151";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0"
            style={{ borderTop: "1px solid #f3f4f6" }}
          >
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="whitespace-nowrap px-3 py-1 rounded-full font-body text-gray-600 transition-all duration-200 flex-shrink-0 hover:bg-[#ede9ff] hover:text-[#5b21b6]"
                style={{
                  fontSize: 11.5,
                  background: "rgba(243,244,246,1)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* CTA BUTTONS */}
        <div className="px-4 pb-3 flex items-center gap-2 flex-shrink-0">
          <Link
            to="/lets-talk"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-body font-medium transition-all duration-200 hover:opacity-80 active:scale-95"
            style={{
              fontSize: 12.5,
              background: "rgba(243,244,246,1)",
              border: "1px solid rgba(0,0,0,0.07)",
              color: "#374151",
            }}
          >
            <Phone size={12} />
            Book a Call
          </Link>
          <a
            href="mailto:ishara@ishara.live"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-body font-medium transition-all duration-200 hover:opacity-80 active:scale-95"
            style={{
              fontSize: 12.5,
              background: "linear-gradient(135deg,#7C3AED,#6D28D9)",
              color: "#fff",
              boxShadow: "0 2px 10px rgba(124,58,237,0.28)",
            }}
          >
            <Send size={12} />
            Email Me
          </a>
        </div>

        {/* INPUT BAR */}
        <div
          className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
          style={{
            borderTop: "1px solid rgba(0,0,0,0.07)",
            background: "#fafafa",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(inputVal)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent outline-none font-body text-gray-800 placeholder-gray-400 min-w-0"
            style={{ fontSize: 13 }}
            aria-label="Chat input"
          />
          <button
            aria-label="Voice"
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 flex-shrink-0"
          >
            <Mic size={15} />
          </button>
          <button
            onClick={() => sendMessage(inputVal)}
            disabled={!inputVal.trim()}
            aria-label="Send"
            className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-200 active:scale-90"
            style={{
              background: inputVal.trim()
                ? "linear-gradient(135deg,#7C3AED,#6D28D9)"
                : "rgba(229,231,235,1)",
              color: inputVal.trim() ? "#fff" : "#9CA3AF",
              boxShadow: inputVal.trim()
                ? "0 2px 10px rgba(124,58,237,0.28)"
                : "none",
              transform: inputVal.trim() ? "scale(1)" : "scale(0.95)",
            }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
