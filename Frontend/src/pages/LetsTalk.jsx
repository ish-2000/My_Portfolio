import LetsTalkContent from "../components/lets-talk/LetsTalkContent";
import AvailabilityCalendar from "../components/lets-talk/AvailabilityCalendar";
import Navbar from "../components/layout/Navbar";

export default function LetsTalk() {
  return (
    <div className="w-full bg-surface">
      <div className="max-w-6xl mx-auto border-x border-surface-border min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start px-6 sm:px-10 py-6 sm:py-5">
          {/* Left — hero content */}
          <div>
            <LetsTalkContent />
          </div>

          {/* Right — calendar card */}
          <div className="lg:sticky lg:top-24">
            <AvailabilityCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
