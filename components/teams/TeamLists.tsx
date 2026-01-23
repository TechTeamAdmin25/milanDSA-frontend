"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function TeamLists({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: () => void;
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item}>
          <button
            onClick={() => setOpen(open === item ? null : item)}
            className="flex items-center gap-2 text-left">
            <ChevronRight
              size={14}
              className={`transition ${open === item ? "rotate-90" : ""}`}
            />
            {item}
          </button>

          {open === item && (
            <div className="pl-6 text-gray-600">
              <div
                onClick={onSelect}
                className="cursor-pointer">
                ⤷ Person Name
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
