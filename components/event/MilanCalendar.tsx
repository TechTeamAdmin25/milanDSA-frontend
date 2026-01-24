"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  X,
  Clock,
  MapPin,
  Calendar as CalendarIcon,
  ChevronRight,
} from "lucide-react";

// --- CONFIGURATION & DATA ---

const MONTH_NAME = "February";
const YEAR = 2026;
const DAYS_IN_MONTH = 28;
const FIRST_DAY_OFFSET = 0; // Feb 1 is Sunday
const HIGHLIGHT_DAYS = [19, 20, 21, 22];
const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Mock Data for the Timeline
const FEST_SCHEDULE: Record<
  number,
  Array<{ time: string; title: string; category: string; location: string }>
> = {
  19: [
    {
      time: "09:00 AM",
      title: "Inauguration Ceremony",
      category: "General",
      location: "Main Auditorium",
    },
    {
      time: "11:00 AM",
      title: "Hack the Stars (Start)",
      category: "Technical",
      location: "Tech Park",
    },
    {
      time: "02:00 PM",
      title: "Street Play: Nukkad",
      category: "Dramatics",
      location: "Java Green",
    },
    {
      time: "06:00 PM",
      title: "Classical Solo Dance",
      category: "Dance",
      location: "Mini Hall 1",
    },
  ],
  20: [
    {
      time: "10:00 AM",
      title: "Shipwreck Debate",
      category: "Literary",
      location: "MBA Seminar Hall",
    },
    {
      time: "01:00 PM",
      title: "Battle of Bands (Eastern)",
      category: "Music",
      location: "Main Stage",
    },
    {
      time: "04:00 PM",
      title: "Fashion Show Prelims",
      category: "Fashion",
      location: "Auditorium",
    },
    {
      time: "08:00 PM",
      title: "DJ Night",
      category: "Pro Show",
      location: "Grounds",
    },
  ],
  21: [
    {
      time: "09:00 AM",
      title: "Valorant Finals",
      category: "Gaming",
      location: "Lab 404",
    },
    {
      time: "12:00 PM",
      title: "Rap Battle",
      category: "Music",
      location: "Food Court",
    },
    {
      time: "05:00 PM",
      title: "Choreonite (Group Dance)",
      category: "Dance",
      location: "Main Stage",
    },
  ],
  22: [
    {
      time: "10:00 AM",
      title: "Mr. & Miss Milan",
      category: "Fashion",
      location: "Main Auditorium",
    },
    {
      time: "03:00 PM",
      title: "Closing Ceremony",
      category: "General",
      location: "Main Auditorium",
    },
    {
      time: "07:00 PM",
      title: "Celebrity Night",
      category: "Pro Show",
      location: "Main Grounds",
    },
  ],
};

// --- SUB-COMPONENT: TIMELINE MODAL ---

function ScheduleModal({
  isOpen,
  onClose,
  day,
}: {
  isOpen: boolean;
  onClose: () => void;
  day: number | null;
}) {
  if (!isOpen || day === null) return null;

  const events = FEST_SCHEDULE[day] || [];
  const hasEvents = events.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#121212] border border-white/10 w-full max-w-lg max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
              {/* Header */}
              <div className="p-6 border-b border-white/10 bg-neutral-900 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-purple-400" />
                    February {day}, {YEAR}
                  </h3>
                  <p className="text-neutral-400 text-sm mt-1">
                    {hasEvents
                      ? `${events.length} events scheduled`
                      : "No events scheduled"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="relative z-10 p-2 bg-white/5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Timeline Body */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#0a0a0a]">
                {!hasEvents ? (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-500 gap-4">
                    <CalendarIcon className="w-12 h-12 opacity-20" />
                    <p>No events found for this date.</p>
                  </div>
                ) : (
                  <div className="space-y-6 relative pl-4">
                    {/* Vertical Line */}
                    <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500/50 via-blue-500/20 to-transparent rounded-full" />

                    {events.map((event, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative flex gap-6 group">
                        {/* Dot */}
                        <div className="absolute left-[5px] top-3 w-3 h-3 rounded-full bg-neutral-900 border-2 border-purple-500 z-10 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(168,85,247,0.5)]" />

                        {/* Content Card */}
                        <div className="flex-1 bg-neutral-900/50 border border-white/5 p-4 rounded-xl hover:bg-neutral-800/80 hover:border-purple-500/30 transition-all duration-300">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {event.time}
                            </span>
                            <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-neutral-400 border border-white/5">
                              {event.category}
                            </span>
                          </div>
                          <h4 className="text-white font-semibold text-lg mb-1 group-hover:text-purple-300 transition-colors">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-1 text-neutral-500 text-xs">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- MAIN COMPONENT: CALENDAR ---

export default function MilanCalendar() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const calendarCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < FIRST_DAY_OFFSET; i++)
      cells.push({ type: "padding", day: null });
    for (let d = 1; d <= DAYS_IN_MONTH; d++)
      cells.push({ type: "day", day: d });
    while (cells.length < 35) cells.push({ type: "padding", day: null });
    return cells;
  }, []);

  return (
    <>
      <div className="w-full max-w-5xl mx-auto p-8 bg-[#0F0F0F] border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Decorative Background Blurs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            {MONTH_NAME}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {YEAR}
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-neutral-500 text-sm font-medium uppercase tracking-widest">
            <span>Official Schedule</span>
            <div className="w-1 h-1 rounded-full bg-neutral-700" />
            <span>SRM IST</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-3 md:gap-4 relative z-10">
          {/* Days Header */}
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] md:text-xs font-bold text-neutral-600 uppercase tracking-widest py-2">
              {day}
            </div>
          ))}

          {/* Days Cells */}
          {calendarCells.map((cell, idx) => {
            if (cell.type === "padding") {
              return (
                <div
                  key={idx}
                  className="aspect-square opacity-0"
                />
              );
            }

            const isHighlight = HIGHLIGHT_DAYS.includes(cell.day as number);

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(cell.day as number)}
                className={clsx(
                  "relative aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group overflow-hidden border",
                  isHighlight
                    ? "bg-gradient-to-br from-purple-900/80 to-blue-900/80 border-purple-500/50 shadow-[0_8px_32px_rgba(88,28,135,0.25)]"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10",
                )}>
                {/* Glow Effect for Highlights */}
                {isHighlight && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}

                {/* Milan Badge */}
                {isHighlight && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
                )}

                {/* Day Number */}
                <span
                  className={clsx(
                    "text-lg md:text-3xl font-bold z-10",
                    isHighlight
                      ? "text-white"
                      : "text-neutral-500 group-hover:text-neutral-300",
                  )}>
                  {cell.day}
                </span>

                {/* Context Text on Hover */}
                {isHighlight && (
                  <span className="absolute bottom-2 md:bottom-4 text-[8px] md:text-[10px] font-medium text-purple-200 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    View Events
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* The Timeline Modal */}
      <ScheduleModal
        isOpen={!!selectedDay}
        day={selectedDay}
        onClose={() => setSelectedDay(null)}
      />
    </>
  );
}
