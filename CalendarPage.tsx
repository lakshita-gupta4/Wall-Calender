"use client";

import dynamic from "next/dynamic";
import WallCalendar from "@/components/calendar/WallCalendar";
import { TooltipProvider } from "@/components/ui/tooltip";

const ParticleBackground = dynamic(() => import("@/components/three/ParticleBackground"), {
  ssr: false,
});

export default function CalendarPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      {/* Gradient background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950" />

      {/* Three.js particles */}
      <ParticleBackground />

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <TooltipProvider delay={300}>
        <WallCalendar />
      </TooltipProvider>
    </main>
  );
}
