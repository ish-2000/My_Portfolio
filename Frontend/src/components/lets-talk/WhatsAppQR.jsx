import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import whatsappQrImg from "../../assets/images/whatsapp-qr.png";

// ─── WhatsApp QR Code component (Compact Floating Edition) ───────────────────
// Props:
//   phone    → your number in international format, no + or spaces
//             example: "94712345678"
//   message  → optional pre-filled message when they open chat

export default function WhatsAppQR({
  phone = "94712345678",
  message = "Hi Ishara, I came from your portfolio and would like to discuss a project.",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  if (!isVisible) return null;

  return (
    <>
      {/* ── COMPACT FLOATING CARD ── */}
      <div
        className={`fixed right-0 top-[20%] z-50 w-[128px] bg-white border border-r-0 border-surface-border rounded-l-2xl pt-4 pb-4 pl-4 pr-2 flex flex-col items-start transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCollapsed ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Collapse Button (Chevron pointing right on the right edge, pushed to the top) */}
        <button
          onClick={() => setIsCollapsed(true)}
          className="absolute right-2 top-[18px] text-[#1a73e8] hover:text-[#0b57d0] transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Collapse WhatsApp QR"
        >
          <ChevronRight className="w-5 h-5 " />
        </button>

        {/* Column with QR and label */}
        <div className="flex flex-col items-center w-[80px]">
          {/* QR Code and link */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-[90px] h-[90px] overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
          >
            <img
              src={whatsappQrImg}
              alt="WhatsApp QR"
              className="w-full h-full object-contain block"
            />
          </a>

          {/* Text Caption */}
          <p className="text-[12px] font-body text-sm text-text-muted mt-2.5 text-center leading-snug">
            Scan to chat
            <br />
            on WhatsApp
          </p>
        </div>
      </div>

      {/* ── EXPAND HANDLE TRIGGER (Only visible when collapsed) ── */}
      <button
        onClick={() => setIsCollapsed(false)}
        className={`fixed right-0 top-[30%] z-50 w-10 h-12 bg-white hover:bg-surface-subtle text-[#1a73e8] rounded-l-xl shadow-float flex items-center justify-center transition-all duration-500 border border-r-0 border-surface-border cursor-pointer hover:scale-105 active:scale-95 ${
          isCollapsed
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
        aria-label="Expand WhatsApp QR"
      >
        <div className="flex items-center justify-center gap-0.5">
          <ChevronLeft className="w-3.5 h-3.5 text-[#1a73e8] stroke-[2.5]" />
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
            <path d="M12.004 2C6.48 2 2.002 6.478 2.002 12c0 1.763.46 3.417 1.272 4.86L2 22l5.307-1.255A9.957 9.957 0 0 0 12.004 22c5.52 0 9.998-4.478 9.998-10S17.524 2 12.004 2zM12 20.302c-1.62 0-3.11-.452-4.39-1.234l-.316-.186-3.256.772.788-3.143-.207-.323A8.261 8.261 0 0 1 3.257 12c0-4.57 3.73-8.302 8.3-8.302 4.57 0 8.3 3.73 8.3 8.302 0 4.572-3.73 8.302-8.3 8.302zm4.586-6.103c-.22-.11-.29-.164-1.29-.66-.188-.09-.324-.136-.466.075-.142.21-.55.696-.675.836-.124.14-.248.156-.468.047-.22-.11-.93-.342-1.772-1.092-.656-.584-1.1-1.306-1.228-1.527-.128-.222-.014-.342.096-.452.1-.1.22-.256.33-.385.11-.128.146-.22.22-.366.074-.147.037-.275-.018-.385-.056-.11-.466-1.123-.638-1.54-.168-.4-.352-.347-.482-.353-.124-.006-.266-.008-.41-.008s-.377.054-.574.272c-.198.218-.753.736-.753 1.795s.77 2.08 1.078 2.493c.308.413 1.517 2.316 3.675 3.25.513.222.915.355 1.228.455.517.164.988.14 1.36.084.417-.06 1.29-.527 1.472-1.034.184-.507.184-.942.13-1.034-.055-.09-.2-.143-.42-.253z" />
          </svg>
        </div>
      </button>
    </>
  );
}
