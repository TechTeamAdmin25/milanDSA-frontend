"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Globe2 } from "lucide-react";

// NEW: Clean Interface matching the new JSON structure
export type EventItem = {
  id: number;
  format: string;
  title: string;
  description: string;
  is_srm_only: boolean;
};

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  events: EventItem[];
}

export default function EventDetailsModal({
  isOpen,
  onClose,
  title,
  description,
  events,
}: EventDetailsModalProps) {
  // Prevent scrolling on body when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-[#121212] border border-white/10 w-full max-w-3xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-start bg-neutral-900/80">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {title}
                  </h2>
                  <p className="text-neutral-400 text-sm mt-1">{description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#121212]">
                {events.length === 0 ? (
                  <p className="text-neutral-500 text-center py-10">
                    No events listed for this category yet.
                  </p>
                ) : (
                  events.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group p-5 rounded-2xl bg-neutral-900/30 border border-white/5 hover:border-purple-500/30 hover:bg-neutral-900/60 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                              {item.title}
                            </h3>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                              {item.format}
                            </span>
                          </div>
                          <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                            {item.description}
                          </p>
                        </div>

                        {/* Eligibility Badge */}
                        <div className="shrink-0">
                          {item.is_srm_only ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>SRM Only</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                              <Globe2 className="w-3.5 h-3.5" />
                              <span>Open to All</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-neutral-900/80 text-center">
                <p className="text-xs text-neutral-500">
                  Select an event to view registration details (Coming Soon)
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
