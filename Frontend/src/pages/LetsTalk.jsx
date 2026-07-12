import { useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import ProfileImg from "../assets/images/Me.png";
import WhatsAppQR from "../components/lets-talk/WhatsAppQR";

function toDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// Dummy fully booked dates: 2 days and 5 days from today
const today = new Date();
const fullyBookedDate1 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 2,
);
const fullyBookedDate2 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 5,
);

const FULLY_BOOKED_KEYS = new Set([
  toDateKey(
    fullyBookedDate1.getFullYear(),
    fullyBookedDate1.getMonth(),
    fullyBookedDate1.getDate(),
  ),
  toDateKey(
    fullyBookedDate2.getFullYear(),
    fullyBookedDate2.getMonth(),
    fullyBookedDate2.getDate(),
  ),
]);

// ─── Calendar helpers ────────────────────────────────────────
function generateAvailableSlots() {
  const slots = {};
  const slotOptions = [
    ["10:00 AM", "11:30 AM", "2:00 PM"],
    ["9:00 AM", "1:00 PM", "3:30 PM"],
    ["10:00 AM", "11:00 AM", "4:00 PM"],
    ["9:30 AM", "2:00 PM"],
    ["10:00 AM", "12:00 PM", "3:00 PM"],
    ["11:00 AM", "1:00 PM", "4:30 PM"],
    ["9:00 AM", "10:30 AM"],
    ["2:00 PM", "3:30 PM", "5:00 PM"],
  ];
  const today = new Date();
  const startToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  for (let monthOffset = 0; monthOffset < 3; monthOffset++) {
    const year = today.getFullYear();
    const month = today.getMonth() + monthOffset;
    const d = new Date(year, month, 1);
    const actualYear = d.getFullYear();
    const actualMonth = d.getMonth();
    const daysInMonth = new Date(actualYear, actualMonth + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(actualYear, actualMonth, day);
      const dow = date.getDay();

      // Allow any weekday (Mon-Fri) that is not in the past
      if (dow !== 0 && dow !== 6 && date >= startToday) {
        const key = toDateKey(actualYear, actualMonth, day);
        if (!FULLY_BOOKED_KEYS.has(key)) {
          slots[key] = slotOptions[(day + monthOffset) % slotOptions.length];
        }
      }
    }
  }
  return slots;
}

const AVAILABLE_SLOTS = generateAvailableSlots();
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// ─── Duration options ────────────────────────────────────────
const DURATIONS = [
  { label: "15m", value: 15 },
  { label: "30m", value: 30 },
  { label: "45m", value: 45 },
  { label: "1h", value: 60 },
];

// ─── Component ───────────────────────────────────────────────
export default function LetsTalk() {
  const now = new Date();

  // ── Duration state ─────────────────────────────────────────
  const [selectedDuration, setSelectedDuration] = useState(30);

  // ── Calendar state ─────────────────────────────────────────
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isReserved, setIsReserved] = useState(false);

  // ── Timezone ───────────────────────────────────────────────
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // ── Calendar grid data ─────────────────────────────────────
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [viewYear, viewMonth]);

  const slotsForDate = selectedDate ? AVAILABLE_SLOTS[selectedDate] || [] : [];

  // ── Month navigation ───────────────────────────────────────
  const goToPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
    setSelectedDate(null);
    setSelectedSlot(null);
    setIsReserved(false);
  };

  const goToNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
    setSelectedDate(null);
    setSelectedSlot(null);
    setIsReserved(false);
  };

  const handleDateClick = (day) => {
    const key = toDateKey(viewYear, viewMonth, day);
    if (!AVAILABLE_SLOTS[key]) return;
    setSelectedDate(key);
    setSelectedSlot(null);
    setIsReserved(false);
  };

  const handleReserve = () => {
    if (!selectedSlot || !selectedDate) return;
    const dateLabel = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const subject = encodeURIComponent("Meeting Request — Let's Talk");
    const body = encodeURIComponent(
      `Hi Ishara,\n\nI'd like to book a ${selectedDuration < 60 ? selectedDuration + " min" : "1 hour"} call on ${dateLabel} at ${selectedSlot}.\n\nLooking forward to connecting!\n\nBest regards`,
    );
    window.open(
      `mailto:hello@isharaudayanga.com?subject=${subject}&body=${body}`,
      "_self",
    );
    setIsReserved(true);
  };

  const isToday = (day) =>
    day === now.getDate() &&
    viewMonth === now.getMonth() &&
    viewYear === now.getFullYear();

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return d < today;
  };

  const isWeekend = (day) => {
    const dow = new Date(viewYear, viewMonth, day).getDay();
    return dow === 0 || dow === 6;
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="w-full bg-surface">
      <div className="max-w-6xl mx-auto border-x border-surface-border min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page body */}
        <div className="flex-1 px-6 sm:px-10 py-16">
          {/* ── PART 1 — Headline ─────────────────────────────── */}
          {/* <h1 className="font-display font-medium tracking-tighter mb-12">
            <span
              className="block text-text-primary"
              style={{ fontSize: "48px", lineHeight: "50px" }}
            >
              Let&apos;s talk about your
            </span>
            <span
              className="block text-text-ghost"
              style={{ fontSize: "48px", lineHeight: "54px" }}
            >
              next product, website
            </span>
            <span
              className="block text-text-ghost"
              style={{ fontSize: "48px", lineHeight: "54px" }}
            >
              or brand.
            </span>
          </h1> */}

          {/* ── PART 2 — Booking card ──────────────────────────── */}
          <div className="border border-surface-border rounded-2xl overflow-hidden bg-surface">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
              {/* ── LEFT — info panel ──────────────────────────── */}
              <div className="border-b lg:border-b-0 lg:border-r border-surface-border px-8 py-8 flex flex-col">
                {/* Profile photo */}
                <img
                  src={ProfileImg}
                  alt="Ishara Udayanga"
                  className="w-14 h-14 rounded-full object-cover mb-4 flex-shrink-0"
                />

                {/* Name */}
                <p className="font-body text-sm text-text-muted mb-1">
                  Ishara Udayanga
                </p>

                {/* Meeting title */}
                <h2 className="font-display font-semibold text-2xl text-text-primary mb-3">
                  Project Discussion
                </h2>

                {/* Description */}
                <p className="font-body text-sm text-text-muted leading-relaxed mb-6">
                  Got a project in mind? Let's talk about it. We'll talk through
                  your idea, what you need, and how I can help.no commitments,
                  no pressure. Just a little chat 😊
                </p>

                {/* Duration selector */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    {/* Clock icon */}
                    <svg
                      className="w-4 h-4 text-text-muted flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span className="font-body text-sm text-text-muted">
                      Duration
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {DURATIONS.map(({ label, value }) => (
                      <button
                        key={value}
                        onClick={() => setSelectedDuration(value)}
                        className={`
                          font-body text-sm px-4 py-2 rounded-full border
                          transition-all duration-200 cursor-pointer
                          ${
                            selectedDuration === value
                              ? "bg-dark text-dark-text border-dark font-medium"
                              : "bg-surface text-text-muted border-surface-border hover:border-dark hover:text-text-primary"
                          }
                        `}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Platform */}
                <div className="flex items-center gap-2 mb-3">
                  {/* Video icon */}
                  <svg
                    className="w-4 h-4 text-text-muted flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="font-body text-sm text-text-muted">
                    Google Meet
                  </span>
                </div>

                {/* Timezone */}
                <div className="flex items-center gap-2 mb-6">
                  {/* Globe icon */}
                  <svg
                    className="w-4 h-4 text-text-muted flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                  <span className="font-body text-sm text-text-muted truncate">
                    {timezone}
                  </span>
                </div>

                {/* Available slots panel */}
                {selectedDate && (
                  <div className="mb-6 pt-5 border-t border-surface-border">
                    <p className="font-body text-xs font-semibold text-text-muted mb-3">
                      Available slots for{" "}
                      <span className="text-text-primary">
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </p>

                    {slotsForDate.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {slotsForDate.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => {
                              setSelectedSlot(slot);
                              setIsReserved(false);
                            }}
                            className={`
                              px-3.5 py-2 rounded-full font-body text-sm transition-all duration-200 cursor-pointer
                              ${
                                selectedSlot === slot
                                  ? "bg-dark text-dark-text font-semibold"
                                  : "bg-surface-subtle text-text-secondary font-medium hover:bg-surface-border"
                              }
                            `}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="font-body text-sm text-text-muted">
                        No slots available for this date.
                      </p>
                    )}
                  </div>
                )}

                {/* Reserve button */}
                <button
                  onClick={handleReserve}
                  disabled={!selectedDate || !selectedSlot}
                  className={`
                    w-full py-3 rounded-full font-display text-sm font-semibold
                    transition-all duration-300
                    ${
                      selectedSlot && selectedDate
                        ? "bg-dark text-dark-text hover:opacity-90 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                        : "bg-surface-subtle text-text-muted cursor-not-allowed"
                    }
                  `}
                >
                  {isReserved ? (
                    <span className="inline-flex items-center gap-2 justify-center w-full">
                      Check inbox
                    </span>
                  ) : (
                    "Reserve a Slot Free"
                  )}
                </button>
              </div>

              {/* ── RIGHT — calendar ───────────────────────────── */}
              <div className="px-8 py-8">
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-5 text-xl">
                  <button
                    onClick={goToPrev}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-subtle transition-colors cursor-pointer"
                    aria-label="Previous month"
                  >
                    <svg
                      className="w-4 h-4 text-text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <span className="font-display text-base font-semibold text-text-primary">
                    {MONTH_NAMES[viewMonth]}{" "}
                    <span className="text-text-muted font-medium ml-1">
                      {viewYear}
                    </span>
                  </span>

                  <button
                    onClick={goToNext}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-subtle transition-colors cursor-pointer"
                    aria-label="Next month"
                  >
                    <svg
                      className="w-4 h-4 text-text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Day-name headers */}
                <div className="grid grid-cols-7 gap-x-1 mb-1">
                  {DAY_NAMES.map((d) => (
                    <div
                      key={d}
                      className="text-center font-body text-xs font-semibold text-text-muted py-1.5"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, idx) => {
                    if (day === null) return <div key={`blank-${idx}`} />;

                    const key = toDateKey(viewYear, viewMonth, day);
                    const hasSlots = !!AVAILABLE_SLOTS[key];
                    const isSelected = selectedDate === key;
                    const dayIsToday = isToday(day);
                    const dayIsPast = isPast(day);
                    const dayIsWknd = isWeekend(day);
                    const isFullyBooked =
                      !dayIsPast && !dayIsWknd && FULLY_BOOKED_KEYS.has(key);
                    const disabled =
                      !hasSlots || dayIsPast || dayIsWknd || isFullyBooked;

                    return (
                      <button
                        key={key}
                        onClick={() => handleDateClick(day)}
                        disabled={disabled}
                        className={`
                          relative w-full aspect-square flex items-center justify-center
                          font-body text-sm transition-all duration-200
                          ${
                            isSelected
                              ? "bg-dark text-dark-text rounded-lg font-semibold"
                              : isFullyBooked
                                ? "bg-surface-subtle text-text-muted rounded-lg cursor-not-allowed"
                                : hasSlots && !dayIsPast && !dayIsWknd
                                  ? "bg-surface text-text-primary font-medium hover:bg-surface-subtle rounded-lg cursor-pointer"
                                  : "text-text-muted cursor-default"
                          }
                          ${
                            dayIsToday && !isSelected
                              ? "border border-surface-border rounded-lg"
                              : ""
                          }
                        `}
                      >
                        {day}
                        {/* Accent dot under today's date */}
                        {dayIsToday && !isSelected && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-text-muted" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── PART 3 — Subline ──────────────────────────────── */}
          <p className="font-body text-sm text-text-muted leading-relaxed max-w-lg mt-8">
            Book a short call to discuss your idea, design direction, website,
            mobile app, or brand experience. I&apos;ll help you find the
            clearest next step.
          </p>
        </div>
      </div>

      {/* Floating WhatsApp QR Code Widget */}
      <WhatsAppQR />
    </div>
  );
}
