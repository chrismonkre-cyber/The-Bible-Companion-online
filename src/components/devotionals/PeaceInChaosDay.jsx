import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { PEACE_IN_CHAOS_CONTENT } from './peaceInChaosContent';

export default function PeaceInChaosDay({ day, onBack, onComplete, onNext, nextDay }) {
  useEffect(() => {
    if (onComplete) onComplete();
  }, [day.day]);
  const [challengeVisible, setChallengeVisible] = useState(false);
  const content = PEACE_IN_CHAOS_CONTENT[day.day];

  if (!content) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-1.5 text-[#4A0404] mb-5 font-serif text-sm hover:underline">
        <ChevronLeft className="w-4 h-4" />
        All 30 Days
      </button>

      {/* Day badge */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#4A0404] border border-[#4A0404] flex items-center justify-center">
          <span className="text-[#E5C07B] font-display text-sm font-bold">{day.day}</span>
        </div>
        <div>
          <p className="text-xs text-[#6B6B6B] font-serif uppercase tracking-widest">Peace in Chaos · Day {day.day}</p>
          <p className="font-display text-lg text-[#3C3C3C]">{content.title}</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl text-[#4A0404] text-center leading-snug">
          {content.title}
        </h3>

        {/* Central Scripture */}
        <div className="bg-[#4A0404] rounded-2xl p-6 md:p-8 text-center">
          <p className="font-display text-lg md:text-xl text-[#E5C07B] italic leading-relaxed">
            "{content.verseText}"
          </p>
          <p className="mt-3 text-[#B8935A] font-medium text-sm">— {content.scripture}</p>
        </div>

        {/* Reflection */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5C07B]/30 shadow-sm">
          <h4 className="font-display text-lg text-[#4A0404] mb-4">Reflection</h4>
          <p className="font-serif text-[#3C3C3C] leading-loose">{content.reflection}</p>
        </div>

        {/* Prayer */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5C07B]/30 shadow-sm">
          <h4 className="font-display text-lg text-[#4A0404] mb-3">Prayer</h4>
          <p className="font-serif text-[#3C3C3C] leading-relaxed italic">{content.prayer}</p>
        </div>

        {/* Continue to next day */}
        {onNext && nextDay ? (
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#E5C07B] hover:bg-[#C9A55A] text-[#4A0404] font-serif font-semibold text-base transition-all shadow-sm"
          >
            Continue to Day {nextDay.day} <ChevronRight className="w-5 h-5" />
          </button>
        ) : !onNext && (
          <div className="text-center py-4">
            <span className="inline-flex items-center gap-2 text-[#4A0404] font-serif font-semibold text-base">
              <Check className="w-5 h-5 text-[#E5C07B] bg-[#4A0404] rounded-full p-0.5" /> Series Complete!
            </span>
          </div>
        )}

        {/* Peace Challenge Button */}
        <div className="text-center pt-2">
          <Button
            onClick={() => setChallengeVisible(v => !v)}
            className="bg-[#4A0404] hover:bg-[#5a0505] text-[#E5C07B] rounded-full px-8 py-5 font-serif text-base shadow-md"
          >
            <Zap className="w-4 h-4 mr-2" />
            {challengeVisible ? "Hide Challenge" : "Today's Peace Challenge"}
          </Button>
        </div>

        {/* Challenge Card */}
        <AnimatePresence>
          {challengeVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#F9F7F2] rounded-2xl p-6 border border-[#E5C07B]/40"
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-[#4A0404]" />
                <h4 className="font-display text-lg text-[#4A0404]">Your Peace Challenge</h4>
              </div>
              <p className="font-serif text-[#3C3C3C] leading-relaxed">{content.challenge}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}