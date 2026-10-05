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

const PREDEFINED_QA = {
  "what services do you offer?":
    "I specialize in brand design, UI/UX design, and frontend development, crafting digital experiences that bring your entire visual and digital identity to life.",

  "how can we work together?":
    `I'd love to collaborate! We can connect in a few easy ways. You can book an appointment directly <a href="/lets-talk" class="underline text-indigo-500 font-medium">click here</a>, message me on <a href="[https://wa.me/94711370769](https://wa.me/94711370769)" target="_blank" rel="noopener noreferrer" class="underline text-green-500 font-medium">WhatsApp</a>, or email me at <a href="mailto:ishara@ishara.live" class="underline text-indigo-500 font-medium">ishara@ishara.live</a>. Feel free to choose whichever works best for you!`,

  "what is your availability?":
    "I am full time available for freelance project. Contact me and let's discuss the timeline!",

  "what are your rates / pricing?":
    "My pricing depends on the scope of the project since every design and frontend build is unique. I focus heavily on top quality design and final product, but I keep my pricing very friendly and budget conscious compared to standard market rates. Let's chat about your project and we can work out a great deal!",
};

export { PREDEFINED_QA };

function findPredefinedMatch(rawText) {
  if (!rawText) return null;
  const normalized = rawText.trim().toLowerCase();

  // 1. Direct match with key in PREDEFINED_QA
  if (PREDEFINED_QA[normalized]) {
    return PREDEFINED_QA[normalized];
  }

  // 2. Normalized match (punctuation, spacing around slashes, whitespace)
  const clean = (s) =>
    s
      .replace(/[?!.]+/g, "")
      .replace(/\s*\/\s*/g, " / ")
      .replace(/\s+/g, " ")
      .trim();

  const cleanedInput = clean(normalized);
  for (const [key, answer] of Object.entries(PREDEFINED_QA)) {
    if (clean(key) === cleanedInput) {
      return answer;
    }
  }

  return null;
}

export { findPredefinedMatch };

function FormattedMessageText({ text, onClose }) {
  if (typeof text !== "string") return text;

  // 1. Split by HTML anchor tags: <a ...href="...">...</a>
  const htmlRegex = /(<a\s+[^>]*href=["'][^"']+["'][^>]*>.*?<\/a>)/gi;
  const parts = text.split(htmlRegex);

  return parts.map((part, i) => {
    if (part.startsWith("<a")) {
      const hrefMatch = part.match(/href=["']([^"']+)["']/i);
      const textMatch = part.match(/>([^<]+)</);
      let href = hrefMatch ? hrefMatch[1] : "#";
      const label = textMatch ? textMatch[1] : part;

      // Clean any markdown link syntax inside href (e.g. "[https://wa.me/...](...)")
      const urlMatch = href.match(/https?:\/\/[^\s"'\]\)]+/);
      if (urlMatch) {
        href = urlMatch[0];
      }

      if (href === "/lets-talk" || href.startsWith("/")) {
        return (
          <Link
            key={i}
            to={href}
            onClick={() => {
              if (onClose) onClose();
            }}
            className="font-medium underline hover:text-[#6D28D9] transition-colors cursor-pointer"
            style={{ color: "#7C3AED" }}
          >
            {label}
          </Link>
        );
      }
      if (href.startsWith("mailto:")) {
        return (
          <a
            key={i}
            href={href}
            className="font-medium underline hover:text-[#6D28D9] transition-colors cursor-pointer"
            style={{ color: "#7C3AED" }}
          >
            {label}
          </a>
        );
      }
      if (href.includes("wa.me")) {
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline hover:text-[#15803d] transition-colors cursor-pointer"
            style={{ color: "#16a34a" }}
          >
            {label}
          </a>
        );
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:text-[#6D28D9] transition-colors cursor-pointer"
          style={{ color: "#7C3AED" }}
        >
          {label}
        </a>
      );
    }

    // 2. Parse plain text segments for bold (**...**) or raw keywords
    const subRegex =
      /(\*\*.*?\*\*|click here|\/lets-talk|WhatsApp|ishara@ishara\.live)/g;
    const subParts = part.split(subRegex);

    return subParts.map((sub, j) => {
      const key = `${i}-${j}`;
      if (sub.startsWith("**") && sub.endsWith("**")) {
        const boldText = sub.slice(2, -2);
        if (boldText === "ishara@ishara.live") {
          return (
            <a
              key={key}
              href="mailto:ishara@ishara.live"
              className="font-semibold underline hover:text-[#6D28D9] transition-colors cursor-pointer"
              style={{ color: "#7C3AED" }}
            >
              {boldText}
            </a>
          );
        }
        return (
          <strong key={key} className="font-semibold">
            {boldText}
          </strong>
        );
      }
      if (sub === "click here" || sub === "/lets-talk") {
        return (
          <Link
            key={key}
            to="/lets-talk"
            onClick={onClose}
            className="font-medium underline hover:text-[#6D28D9] transition-colors cursor-pointer"
            style={{ color: "#7C3AED" }}
          >
            {sub}
          </Link>
        );
      }
      if (sub === "WhatsApp") {
        return (
          <a
            key={key}
            href="https://wa.me/94711370769"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline hover:text-[#15803d] transition-colors cursor-pointer"
            style={{ color: "#16a34a" }}
          >
            WhatsApp
          </a>
        );
      }
      if (sub === "ishara@ishara.live") {
        return (
          <a
            key={key}
            href="mailto:ishara@ishara.live"
            className="font-medium underline hover:text-[#6D28D9] transition-colors cursor-pointer"
            style={{ color: "#7C3AED" }}
          >
            ishara@ishara.live
          </a>
        );
      }
      return sub;
    });
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
  const isUser = msg.from === "user" || msg.sender === "user";
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
          whiteSpace: "pre-wrap",
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
  const processedMsgIdsRef = useRef(new Set());
  const safetyTimeoutRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // ── 1. Dynamic Script Injection fallback ──────────────────────────
  useEffect(() => {
    const INJECT_URL = "https://cdn.botpress.cloud/webchat/v5.0/inject.js";
    const CONFIG_URL =
      "https://files.bpcontent.cloud/2026/09/28/13/20260928135641-K770R6LA.js";

    function loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.body.appendChild(s);
      });
    }

    if (!window.botpress) {
      loadScript(INJECT_URL)
        .then(() => loadScript(CONFIG_URL))
        .catch((err) => console.error("Error loading Botpress scripts:", err));
    }
  }, []);

  // ── 2. Event Listeners & Client Hookup ────────────────────────────
  useEffect(() => {
    // Intercept incoming AI text message via "botpress:message" CustomEvent
    const handleBotpressMessage = (event) => {
      if (event.detail && event.detail.type === "text") {
        const botText = event.detail.payload?.text || event.detail.text;
        if (botText) {
          if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
            safetyTimeoutRef.current = null;
          }
          appendMessageToThread({
            id: event.detail.id || Date.now(),
            sender: "bot",
            text: botText,
          });
          setIsTyping(false); // Stop typing indicator if present
        }
      }
    };

    window.addEventListener("botpress:message", handleBotpressMessage);

    // Bridge Botpress v5 SDK events to window "botpress:message" dispatcher
    let unsubscribeMessage = null;
    let unsubscribeTyping = null;
    let pollInterval = null;

    const ensureBotpressSendMessageWrapped = () => {
      if (
        window.botpress &&
        !window.botpress.__isWrapped &&
        typeof window.botpress.sendMessage === "function"
      ) {
        const orig = window.botpress;
        const wrapper = Object.create(orig);
        wrapper.__isWrapped = true;
        Object.defineProperty(wrapper, "sendMessage", {
          value: function (arg, ...rest) {
            const text =
              arg && typeof arg === "object"
                ? arg.text || arg.payload?.text || ""
                : arg;
            return orig.sendMessage(text, ...rest);
          },
          writable: true,
          configurable: true,
        });
        window.botpress = wrapper;
      }
    };

    const attachSDKListeners = () => {
      if (!window.botpress || typeof window.botpress.on !== "function")
        return false;

      ensureBotpressSendMessageWrapped();

      // Ensure Botpress conversation and SSE stream are opened in background
      if (typeof window.botpress.open === "function") {
        window.botpress.open();
      }

      // Also open when webchat finishes initializing
      window.botpress.on("webchat:initialized", () => {
        if (typeof window.botpress.open === "function") {
          window.botpress.open();
        }
      });

      // Listen for message events from Botpress Cloud
      unsubscribeMessage = window.botpress.on("message", (msg) => {
        if (!msg) return;

        // Skip user's own sent messages
        const currentUserId = window.botpress?.user?.id;
        const authorId = msg.authorId || msg.userId;
        if (currentUserId && authorId === currentUserId) return;

        // Prevent duplicate processing
        if (msg.id && processedMsgIdsRef.current.has(msg.id)) return;
        if (msg.id) processedMsgIdsRef.current.add(msg.id);

        // In Botpress Cloud v5, AI responses arrive in msg.block.text
        const text =
          msg.block?.text ||
          msg.block?.payload?.text ||
          msg.payload?.text ||
          msg.text ||
          (typeof msg.block === "string" ? msg.block : "");
        if (!text) return;

        // Dispatch CustomEvent as specified in mission breakdown
        window.dispatchEvent(
          new CustomEvent("botpress:message", {
            detail: {
              id: msg.id,
              type: "text",
              payload: { text },
              text,
            },
          }),
        );
      });

      // Listen for typing indicator events if emitted by Botpress
      if (typeof window.botpress.on === "function") {
        unsubscribeTyping = window.botpress.on("isTyping", (data) => {
          if (data && typeof data.isTyping === "boolean") {
            setIsTyping(data.isTyping);
          }
        });
      }

      return true;
    };

    if (!attachSDKListeners()) {
      pollInterval = setInterval(() => {
        if (attachSDKListeners()) {
          clearInterval(pollInterval);
        }
      }, 250);
    }

    return () => {
      window.removeEventListener("botpress:message", handleBotpressMessage);
      if (typeof unsubscribeMessage === "function") unsubscribeMessage();
      if (typeof unsubscribeTyping === "function") unsubscribeTyping();
      if (pollInterval) clearInterval(pollInterval);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

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
      if (window.botpress && typeof window.botpress.open === "function") {
        window.botpress.open();
      }
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

  function appendMessageToThread({ id, sender, text }) {
    if (!text) return;
    const msgId = id || ++msgCounter.current;
    setMessages((p) => [
      ...p,
      { id: msgId, from: sender || "bot", sender: sender || "bot", text },
    ]);
    setTimeout(() => setVisibleIds((s) => new Set([...s, msgId])), 40);
  }

  function addBotMessage(text) {
    appendMessageToThread({
      id: ++msgCounter.current,
      sender: "bot",
      text,
    });
  }

  // ── 3. Handle User Input Submission ───────────────────────────────
  function sendMessage(text) {
    // Guard against empty strings or whitespace
    if (!text || !text.trim()) return;
    const userMessageText = text.trim();
    const id = ++msgCounter.current;

    // Append the user message immediately into the existing UI thread
    setMessages((p) => [
      ...p,
      { id, from: "user", sender: "user", text: userMessageText },
    ]);
    setTimeout(() => setVisibleIds((s) => new Set([...s, id])), 40);

    // Clear the input field
    setInputVal("");

    // Exact-Match Fast Path check (0ms latency, zero Botpress token usage)
    const fastPathResponse = findPredefinedMatch(userMessageText);
    if (fastPathResponse) {
      setIsTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        addBotMessage(fastPathResponse);
      }, 2000);
      return; // Do NOT forward this message to Botpress
    }

    // ── Dynamic Inquiries: Route through Botpress Cloud AI ───────────
    setIsTyping(true);

    // Safety fallback timer if Botpress server takes unusually long
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    safetyTimeoutRef.current = setTimeout(() => {
      setIsTyping((currentlyTyping) => {
        if (currentlyTyping) {
          addBotMessage(
            "Thanks for reaching out! You can book a call directly <a href=\"/lets-talk\" class=\"underline text-indigo-500 font-medium\">click here</a> or email me at <a href=\"mailto:ishara@ishara.live\" class=\"underline text-indigo-500 font-medium\">ishara@ishara.live</a>."
          );
          return false;
        }
        return false;
      });
    }, 25000);

    // Ensure window.botpress.sendMessage is wrapped to support { type: "text", text } object as well as string
    if (
      window.botpress &&
      !window.botpress.__isWrapped &&
      typeof window.botpress.sendMessage === "function"
    ) {
      const orig = window.botpress;
      const wrapper = Object.create(orig);
      wrapper.__isWrapped = true;
      Object.defineProperty(wrapper, "sendMessage", {
        value: function (arg, ...rest) {
          const text =
            arg && typeof arg === "object"
              ? arg.text || arg.payload?.text || ""
              : arg;
          return orig.sendMessage(text, ...rest);
        },
        writable: true,
        configurable: true,
      });
      window.botpress = wrapper;
    }

    // Trigger Botpress client dispatch
    const trySend = () => {
      if (
        window.botpress &&
        typeof window.botpress.sendMessage === "function" &&
        window.botpress.conversationId
      ) {
        try {
          window.botpress.sendMessage({ type: "text", text: userMessageText });
          return true;
        } catch (err) {
          console.error("Botpress sendMessage error:", err);
        }
      }
      return false;
    };

    if (window.botpress && typeof window.botpress.open === "function") {
      window.botpress.open();
    }

    if (!trySend()) {
      // If window.botpress is initializing its conversation, poll until ready
      let attempts = 0;
      const sendInterval = setInterval(() => {
        attempts++;
        if (trySend()) {
          clearInterval(sendInterval);
        } else if (attempts >= 40) {
          clearInterval(sendInterval);
          setTimeout(() => {
            if (safetyTimeoutRef.current)
              clearTimeout(safetyTimeoutRef.current);
            setIsTyping(false);
            addBotMessage(
              "Thanks for reaching out! You can book a call directly <a href=\"/lets-talk\" class=\"underline text-indigo-500 font-medium\">click here</a> or email me at <a href=\"mailto:ishara@ishara.live\" class=\"underline text-indigo-500 font-medium\">ishara@ishara.live</a>."
            );
          }, 800);
        }
      }, 250);
    }
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
        #bp-web-widget-container,
        .bpw-widget-btn,
        .bpw-floating-button,
        #fab-root,
        #webchat-root,
        #message-preview-root,
        .bpFabWrapper,
        .bpFab,
        .bpWebchat,
        .bpMessagePreview,
        .bpUnreadMessage,
        iframe[id^="bp-"],
        div[id^="bp-"] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
          opacity: 0 !important;
        }
      `}</style>

      <div
        id="robot-chatbox"
        ref={chatboxRef}
        data-lenis-prevent
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
            onClick={(e) => {
              if (window.CALENDLY_URL) {
                e.preventDefault();
                window.open(window.CALENDLY_URL, "_blank");
              }
              onClose();
            }}
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
            onClick={() => {
              window.location.href = "mailto:ishara@ishara.live";
            }}
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
