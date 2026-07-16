import { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

// ─── Configuration ────────────────────────────────────────
// Available dates: map of "YYYY-MM-DD" → array of time slots.
// Replace this function with real API data later.
// For now, generates demo slots for the current + next 2 months.
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

  for (let monthOffset = 0; monthOffset < 3; monthOffset++) {
    const year = today.getFullYear();
    const month = today.getMonth() + monthOffset;
    const d = new Date(year, month, 1);
    const actualYear = d.getFullYear();
    const actualMonth = d.getMonth();
    const daysInMonth = new Date(actualYear, actualMonth + 1, 0).getDate();

    // Scatter available days — every Mon, Wed, Fri that isn't in the past
    let count = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(actualYear, actualMonth, day);
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
        if (date > today && count < 3) {
          const key = `${actualYear}-${String(actualMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          slots[key] = slotOptions[(day + monthOffset) % slotOptions.length];
          count++;
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

// ─── Helpers ──────────────────────────────────────────────
function toDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// ─── Component ────────────────────────────────────────────
export default function AvailabilityCalendar() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isReserved, setIsReserved] = useState(false);

  const cardRef = useRef(null);
  const calRef = useRef(null);

  // Calendar grid data
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const cells = [];

    // Leading blanks
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return cells;
  }, [viewYear, viewMonth]);

  // Slots for the selected date
  const slotsForDate = selectedDate ? AVAILABLE_SLOTS[selectedDate] || [] : [];

  // Navigate months
  const goToPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
    setSelectedDate(null);
    setSelectedSlot(null);
    setIsReserved(false);
  };

  const goToNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
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

    // For now, open a mailto link with pre-filled details
    const dateLabel = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const subject = encodeURIComponent("Meeting Request — Let's Talk");
    const body = encodeURIComponent(
      `Hi Ishara,\n\nI'd like to book a call on ${dateLabel} at ${selectedSlot}.\n\nLooking forward to connecting!\n\nBest regards`,
    );

    window.open(
      `mailto:isharaudayanga1000@gmail.com?subject=${subject}&body=${body}`,
      "_self",
    );
    setIsReserved(true);
  };

  // Check if a day is today
  const isToday = (day) => {
    return (
      day === now.getDate() &&
      viewMonth === now.getMonth() &&
      viewYear === now.getFullYear()
    );
  };

  // Check if a day is in the past
  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return d < today;
  };

  return (
    <div
      ref={cardRef}
      className="bg-white border border-dark/20 rounded-lg overflow-hidden max-w-[400px] w-full mx-auto lg:ml-auto lg:mr-0"
    >
      {/* Calendar */}
      <div ref={calRef} className="px-5 py-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPrev}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-subtle transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-text-muted" strokeWidth={2} />
          </button>

          <span className="font-display text-lg font-semibold text-text-primary">
            {MONTH_NAMES[viewMonth]}{" "}
            <span className="text-text-placeholder font-medium">
              {viewYear}
            </span>
          </span>

          <button
            onClick={goToNext}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-subtle transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-text-muted" strokeWidth={2} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-x-1.5 mb-1">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="text-center font-body text-sm font-semibold text-text-muted py-1.5"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1.5">
          {calendarDays.map((day, idx) => {
            if (day === null) {
              return <div key={`blank-${idx}`} />;
            }

            const key = toDateKey(viewYear, viewMonth, day);
            const hasSlots = !!AVAILABLE_SLOTS[key];
            const isSelected = selectedDate === key;
            const dayIsToday = isToday(day);
            const dayIsPast = isPast(day);

            return (
              <button
                key={key}
                onClick={() => handleDateClick(day)}
                disabled={!hasSlots || dayIsPast}
                className={`
                  relative w-full aspect-square flex items-center justify-center rounded-sm
                  font-body text-sm transition-all duration-200
                  ${
                    isSelected
                      ? "bg-[#334155] text-white font-semibold"
                      : hasSlots && !dayIsPast
                        ? "bg-[#e5e7eb] text-text-primary font-medium hover:bg-surface-border cursor-pointer"
                        : "text-text-muted cursor-default"
                  }
                  ${dayIsToday && !isSelected ? "ring-1 ring-dark" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots panel — shown when a date is selected */}
      {selectedDate && (
        <div className="px-5 pb-4 border-t border-surface-border pt-3.5">
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
            <div className="flex flex-wrap gap-2 mb-4">
              {slotsForDate.map((slot) => (
                <button
                  key={slot}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setIsReserved(false);
                  }}
                  className={`
                    px-3.5 py-2 rounded-lg font-body text-sm transition-all duration-200
                    ${
                      selectedSlot === slot
                        ? "bg-[#334155] text-white font-semibold"
                        : "bg-[#e5e7eb] text-text-secondary font-medium hover:bg-surface-border"
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="font-body text-sm text-text-placeholder mb-4">
              No slots available for this date.
            </p>
          )}

          {/* Reserve button */}
          <button
            onClick={handleReserve}
            disabled={!selectedSlot}
            className={`
              w-full py-3 rounded-xl font-display text-sm font-semibold transition-all duration-300
              ${
                selectedSlot
                  ? "bg-dark text-white hover:opacity-90 cursor-pointer shadow-raised"
                  : "bg-surface-subtle text-text-placeholder cursor-not-allowed"
              }
            `}
          >
            {isReserved ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Email opened — check your inbox
              </span>
            ) : (
              "Reserve Slot"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
