"use client";

import { motion } from "framer-motion";
import { format, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface Props {
  calendarDays: Date[];
  currentMonth: Date;
  isInRange: (d: Date) => boolean;
  isRangeStart: (d: Date) => boolean;
  isRangeEnd: (d: Date) => boolean;
  isSameMonth: (d: Date) => boolean;
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date | null) => void;
  selecting: boolean;
  dayNoteCount?: (d: Date) => number;
}

export default function CalendarGrid({
  calendarDays,
  currentMonth,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isSameMonth,
  onDayClick,
  onDayHover,
  selecting,
  dayNoteCount,
}: Props) {
  return (
    <div className="px-4 pb-4">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className={cn(
              "text-center text-[10px] font-bold tracking-widest py-1",
              d === "SAT" || d === "SUN" ? "text-blue-500" : "text-zinc-400 dark:text-zinc-500"
            )}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, idx) => {
          const inRange = isInRange(day);
          const isStart = isRangeStart(day);
          const isEnd = isRangeEnd(day);
          const sameMonth = isSameMonth(day);
          const today = isToday(day);
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          const noteCount = dayNoteCount?.(day) ?? 0;

          const dayButton = (
            <motion.button
              whileHover={{ scale: sameMonth ? 1.15 : 1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => sameMonth && onDayClick(day)}
              onMouseEnter={() => selecting && onDayHover(day)}
              onMouseLeave={() => selecting && onDayHover(null)}
              className={cn(
                "relative flex flex-col items-center justify-center h-9 w-full text-sm font-medium transition-colors duration-150 select-none",
                !sameMonth && "opacity-25 cursor-default",
                sameMonth && "cursor-pointer",
                inRange && !isStart && !isEnd && "bg-blue-100 dark:bg-blue-900/40",
                isStart && "bg-blue-500 text-white rounded-l-full",
                isEnd && "bg-blue-500 text-white rounded-r-full",
                isStart && isEnd && "rounded-full",
                today && !isStart && !isEnd && "ring-2 ring-blue-400 ring-offset-1 rounded-full",
                isWeekend && !isStart && !isEnd && sameMonth && "text-blue-500",
                !inRange && !isStart && !isEnd && sameMonth && !isWeekend && "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full"
              )}
              aria-label={format(day, "PPP")}
              aria-pressed={isStart || isEnd}
            >
              <span className="leading-none">{format(day, "d")}</span>
              {noteCount > 0 && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
              )}
            </motion.button>
          );

          return noteCount > 0 ? (
            <Tooltip key={idx}>
              <TooltipTrigger render={dayButton} />
              <TooltipContent side="top" className="text-xs">
                {noteCount} note{noteCount > 1 ? "s" : ""}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div key={idx}>{dayButton}</div>
          );
        })}
      </div>
    </div>
  );
}
