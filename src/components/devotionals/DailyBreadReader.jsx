import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import { DAILY_BREAD } from './dailyBreadContent';

export default function DailyBreadReader({ day, onBack, onDayChange, onMarkComplete, completedDays = new Set() }) {
  // Auto-mark as complete when a day is opened
  useEffect(() => {
    if (onMarkComplete) onMarkComplete(day);
  }, [day]);
  const entry = DAILY_BREAD.find(d => d.day === day);
  if (!entry) return null;

  const hasPrev = day > 1;
  const hasNext = day < DAILY_BREAD.length;

  const handleShare = async () => {
    const text = `I was just thinking of you and found this verse. I hope it brings you the same peace it gave me today: "${entry.verseText}" — ${entry.verse}\n\nSent via TheBibleCompanion.online | Watch our daily prayer: https://www.youtube.com/@TheBibleCompanion`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'A verse for you', text });
      } else {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
      }
    } catch (e) {}
  };

  return (
    <motion.div key={day} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Top nav */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[#4A0404] font-serif text-sm hover:underline">
          <ChevronLeft className="w-4 h-4" /> All Days
        </button>
        <span className="font-serif text-xs text-[#6B6B6B]">Day {day} of {DAILY_BREAD.length}</span>
      </div>

      {/* Day badge & theme */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#4A0404] flex items-center justify-center shrink-0">
          <span className="text-[#E5C07B] font-display text-sm font-bold">{day}</span>
        </div>
        <div>
          <p className="text-xs text-[#6B6B6B] font-serif uppercase tracking-widest">Daily Bread · Day {day}</p>
          <p className="font-display text-lg text-[#3C3C3C]">{entry.theme}</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Verse card */}
        <div className="bg-[#4A0404] rounded-2xl p-6 md:p-8 text-center">
          <p className="font-display text-lg md:text-xl text-[#E5C07B] italic leading-relaxed">"{entry.verseText}"</p>
          <p className="mt-3 text-[#B8935A] font-medium text-sm">— {entry.verse}</p>
        </div>

        {/* Reflection */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5C07B]/30 shadow-sm">
          <h4 className="font-display text-lg text-[#4A0404] mb-4">Reflection</h4>
          <p className="font-serif text-[#3C3C3C] leading-loose">{entry.reflection}</p>
        </div>

        {/* Prayer */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5C07B]/30 shadow-sm">
          <h4 className="font-display text-lg text-[#4A0404] mb-3">Prayer</h4>
          <p className="font-serif text-[#3C3C3C] leading-relaxed italic">{entry.prayer}</p>
        </div>

        {/* Share */}
        <div className="text-center pt-1">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#4A0404]/40 text-[#4A0404] font-serif text-sm hover:bg-[#4A0404]/5 transition-all"
          >
            <Share2 className="w-4 h-4" /> Share This Verse
          </button>
        </div>

        {/* Continue to next day */}
        {hasNext && (
          <button
            onClick={() => onDayChange(day + 1)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#E5C07B] hover:bg-[#C9A55A] text-[#4A0404] font-serif font-semibold text-base transition-all shadow-sm"
          >
            Continue to Day {day + 1} <ChevronRight className="w-5 h-5" />
          </button>
        )}
        {!hasNext && (
          <div className="text-center py-4">
            <span className="inline-flex items-center gap-2 text-[#4A0404] font-serif font-semibold text-base">
              <Check className="w-5 h-5 text-[#E5C07B] bg-[#4A0404] rounded-full p-0.5" /> Series Complete!
            </span>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => hasPrev && onDayChange(day - 1)}
            disabled={!hasPrev}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#4A0404]/30 text-[#4A0404] font-serif text-sm disabled:opacity-30 hover:bg-[#4A0404]/5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button onClick={onBack} className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#4A0404]/30 text-[#4A0404] font-serif text-sm hover:bg-[#4A0404]/5 transition-all">
            All Days
          </button>
        </div>
      </div>
    </motion.div>
  );
}