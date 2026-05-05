import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { shouldShowFallbackPopup, markFallbackShownToday, reminderTimePassed } from '@/utils/notificationScheduler';

const DAILY_VERSES = [
  { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.", ref: "Jeremiah 29:11" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you.", ref: "Joshua 1:9" },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
  { text: "The Lord will fight for you; you need only to be still.", ref: "Exodus 14:14" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
];

export default function DailyVersePopup() {
  const [visible, setVisible] = useState(false);
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    if (!shouldShowFallbackPopup()) return;
    // Show immediately if time has passed, or wait until the reminder time
    const show = () => {
      const idx = new Date().getDate() % DAILY_VERSES.length;
      setVerse(DAILY_VERSES[idx]);
      setVisible(true);
      markFallbackShownToday();
    };

    if (reminderTimePassed()) {
      const timer = setTimeout(show, 1200);
      return () => clearTimeout(timer);
    } else {
      // Poll until the reminder time arrives
      const interval = setInterval(() => {
        if (reminderTimePassed()) {
          clearInterval(interval);
          show();
        }
      }, 30000); // check every 30s
      return () => clearInterval(interval);
    }
  }, []);

  if (!verse) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(74,4,4,0.5)' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            className="bg-[#F9F7F2] rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center border border-[#E5C07B]/40 relative"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 text-[#B0B0B0] hover:text-[#4A0404] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#4A0404] flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-6 h-6 text-[#E5C07B]" />
            </div>

            <p className="font-serif text-xs text-[#B8935A] uppercase tracking-widest mb-4">Your Daily Bread 🕊️</p>

            <blockquote className="font-display text-lg text-[#4A0404] italic leading-relaxed mb-3">
              "{verse.text}"
            </blockquote>
            <p className="font-serif text-sm text-[#6B6B6B]">— {verse.ref}</p>

            <button
              onClick={() => setVisible(false)}
              className="mt-6 w-full bg-[#4A0404] hover:bg-[#5a0505] text-[#E5C07B] rounded-full py-3 font-serif text-sm font-semibold transition-colors"
            >
              Carry this with me today
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}