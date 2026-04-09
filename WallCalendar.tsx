"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useCalendar } from "@/hooks/useCalendar";
import { useNotes } from "@/hooks/useNotes";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WallCalendar() {
  const cal = useCalendar();
  const monthKey = format(cal.currentMonth, "yyyy-MM");
  const { monthNotes, addNote, deleteNote, updateNote } = useNotes(monthKey);

  const dayNoteCount = (day: Date) => {
    const key = format(day, "yyyy-MM-dd");
    return monthNotes.filter((n) => n.dateKey === key).length;
  };

  const rangeLabel =
    cal.dateRange.start && cal.dateRange.end
      ? `${format(cal.dateRange.start, "MMM d")} – ${format(cal.dateRange.end, "MMM d, yyyy")}`
      : cal.dateRange.start
      ? `From ${format(cal.dateRange.start, "MMM d, yyyy")}`
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative w-full max-w-sm sm:max-w-md md:max-w-lg",
        "bg-white dark:bg-zinc-900",
        "rounded-2xl shadow-2xl overflow-hidden",
        "border border-zinc-100 dark:border-zinc-800",
        // Paper texture feel
        "before:absolute before:inset-0 before:bg-[url('/paper.png')] before:opacity-[0.03] before:pointer-events-none"
      )}
      style={{
        boxShadow:
          "0 25px 60px -10px rgba(0,0,0,0.25), 0 10px 20px -5px rgba(0,0,0,0.1), 4px 4px 0 rgba(0,0,0,0.04)",
      }}
    >
      {/* Header: spiral + hero image + wave */}
      <CalendarHeader
        currentMonth={cal.currentMonth}
        onPrev={cal.goPrevMonth}
        onNext={cal.goNextMonth}
        onToday={cal.goToToday}
      />

      {/* Wave SVG divider */}
      <div className="relative -mt-1 bg-white dark:bg-zinc-900">
        <svg
          viewBox="0 0 400 28"
          className="w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 L0,14 Q50,28 100,14 Q150,0 200,14 Q250,28 300,14 Q350,0 400,14 L400,0 Z"
            fill="#3b82f6"
          />
        </svg>
      </div>

      {/* Range indicator */}
      <AnimatePresence>
        {rangeLabel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between px-4 py-1.5 bg-blue-50 dark:bg-blue-950/30"
          >
            <span className="text-xs text-blue-600 dark:text-blue-300 font-medium">
              📅 {rangeLabel}
            </span>
            <button
              onClick={cal.clearRange}
              className="text-blue-400 hover:text-blue-600 transition-colors"
              aria-label="Clear selection"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar grid */}
      <CalendarGrid
        calendarDays={cal.calendarDays}
        currentMonth={cal.currentMonth}
        isInRange={cal.isInRange}
        isRangeStart={cal.isRangeStart}
        isRangeEnd={cal.isRangeEnd}
        isSameMonth={cal.isSameMonth}
        onDayClick={cal.handleDayClick}
        onDayHover={cal.setHoverDate}
        selecting={cal.selecting}
        dayNoteCount={dayNoteCount}
      />

      {/* Divider */}
      <div className="mx-4 border-t border-dashed border-zinc-200 dark:border-zinc-700" />

      {/* Notes */}
      <NotesSection
        notes={monthNotes}
        dateRange={cal.dateRange}
        monthKey={monthKey}
        onAdd={addNote}
        onDelete={deleteNote}
        onUpdate={updateNote}
      />

      {/* Selecting hint */}
      <AnimatePresence>
        {cal.selecting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-3 py-1.5 rounded-full shadow-lg pointer-events-none"
          >
            Click an end date to complete selection
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
