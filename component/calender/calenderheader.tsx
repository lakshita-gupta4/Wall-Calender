"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const MONTH_IMAGES: Record<number, string> = {
  0: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80", // Jan - snow
  1: "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=800&q=80", // Feb - cozy
  2: "https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=800&q=80", // Mar - spring
  3: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80", // Apr - flowers
  4: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80", // May
  5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // Jun - beach
  6: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80", // Jul - summer
  7: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80", // Aug
  8: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", // Sep - autumn
  9: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80", // Oct
  10: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=800&q=80", // Nov
  11: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80", // Dec - winter
};

interface Props {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({ currentMonth, onPrev, onNext, onToday }: Props) {
  const monthIndex = currentMonth.getMonth();
  const imageUrl = MONTH_IMAGES[monthIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl">
      {/* Spiral binding */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center gap-[14px] pt-1">
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-5 rounded-full border-2 border-zinc-400 bg-zinc-200 dark:border-zinc-500 dark:bg-zinc-600"
            style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)" }}
          />
        ))}
      </div>

      {/* Hero image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={monthIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative h-52 sm:h-64 md:h-72 w-full"
        >
          <img
            src={imageUrl}
            alt={format(currentMonth, "MMMM")}
            className="w-full h-full object-cover"
          />
          {/* Blue wave overlay bottom-left */}
          <div className="absolute bottom-0 left-0 w-1/3 h-16 bg-blue-500 clip-wave-left" />
          {/* Blue wave overlay bottom-right with month/year */}
          <div className="absolute bottom-0 right-0 w-2/5 bg-blue-500 flex flex-col items-end justify-end px-5 pb-3 pt-6 clip-wave-right">
            <span className="text-white/80 text-sm font-light tracking-widest">
              {format(currentMonth, "yyyy")}
            </span>
            <span className="text-white text-2xl sm:text-3xl font-black tracking-wider uppercase leading-tight">
              {format(currentMonth, "MMMM")}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <div className="absolute top-8 right-3 z-30 flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToday}
          className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
          aria-label="Go to today"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
