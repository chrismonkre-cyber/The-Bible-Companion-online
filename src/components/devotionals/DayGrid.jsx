import React from 'react';
import { Check } from 'lucide-react';

/**
 * Reusable day-number grid for devotional series.
 * @param {number} totalDays
 * @param {Set<number>} completedDays - set of completed day numbers
 * @param {function} onSelectDay
 * @param {number|null} activeDay - currently open day (highlighted differently)
 */
export default function DayGrid({ totalDays, completedDays = new Set(), onSelectDay, activeDay = null }) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
        const done = completedDays.has(day);
        const active = activeDay === day;
        return (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={`
              aspect-square rounded-xl flex items-center justify-center text-sm font-serif font-semibold
              transition-all duration-200 relative
              ${done
                ? 'bg-[#E5C07B] text-[#4A0404] border-2 border-[#C9A55A] shadow-sm'
                : active
                  ? 'bg-[#4A0404] text-[#E5C07B] border-2 border-[#4A0404]'
                  : 'bg-white text-[#3C3C3C] border border-[#E5C07B]/40 hover:border-[#4A0404]/40 hover:bg-[#4A0404]/5'
              }
            `}
          >
            {done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : day}
          </button>
        );
      })}
    </div>
  );
}