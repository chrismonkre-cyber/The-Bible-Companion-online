import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Wind, ChevronRight, BookOpen } from 'lucide-react';
import DayGrid from '@/components/devotionals/DayGrid';
import PeaceInChaosDay from '@/components/devotionals/PeaceInChaosDay';
import DailyBreadReader from '@/components/devotionals/DailyBreadReader';
import { DAILY_BREAD } from '@/components/devotionals/dailyBreadContent';
import DailyReminderSetup from '@/components/DailyReminderSetup';

const PEACE_IN_CHAOS_DAYS = [
  { day: 1,  theme: "The Anchor of Stillness",       scripture: "Psalm 46:10" },
  { day: 2,  theme: "A Mind Stayed on Him",           scripture: "Isaiah 26:3" },
  { day: 3,  theme: "The Gift of Rest",               scripture: "Matthew 11:28" },
  { day: 4,  theme: "Trusting the Shepherd",          scripture: "Psalm 23:1-3" },
  { day: 5,  theme: "The Peace of His Presence",      scripture: "Exodus 33:14" },
  { day: 6,  theme: "Walking Through the Fire",       scripture: "Isaiah 43:2" },
  { day: 7,  theme: "Casting Every Care",             scripture: "1 Peter 5:7" },
  { day: 8,  theme: "Guarding Your Heart",            scripture: "Philippians 4:6-7" },
  { day: 9,  theme: "Strength for the Weary",         scripture: "Isaiah 40:31" },
  { day: 10, theme: "A Shelter in the Storm",         scripture: "Psalm 91:1-2" },
  { day: 11, theme: "Surrendering the Outcome",       scripture: "Proverbs 3:5-6" },
  { day: 12, theme: "Beauty from Ashes",              scripture: "Isaiah 61:3" },
  { day: 13, theme: "The Power of a Quiet Spirit",    scripture: "1 Peter 3:4" },
  { day: 14, theme: "Finding Joy in the Wait",        scripture: "Romans 12:12" },
  { day: 15, theme: "Sufficient Grace",               scripture: "2 Corinthians 12:9" },
  { day: 16, theme: "The Voice That Calms the Sea",   scripture: "Mark 4:39" },
  { day: 17, theme: "Unshakable Foundation",          scripture: "Matthew 7:24-25" },
  { day: 18, theme: "Renewing Your Mind",             scripture: "Romans 12:2" },
  { day: 19, theme: "Courage in the Dark",            scripture: "Joshua 1:9" },
  { day: 20, theme: "The Bread of Life",              scripture: "John 6:35" },
  { day: 21, theme: "Forgiveness as Peace",           scripture: "Colossians 3:13" },
  { day: 22, theme: "Living Without Fear",            scripture: "Psalm 27:1" },
  { day: 23, theme: "The Compassion of the Father",   scripture: "Lamentations 3:22-23" },
  { day: 24, theme: "Gentleness in Conflict",         scripture: "Proverbs 15:1" },
  { day: 25, theme: "Contentment in All Things",      scripture: "Philippians 4:11-13" },
  { day: 26, theme: "The Light of the World",         scripture: "John 8:12" },
  { day: 27, theme: "Waiting on the Lord",            scripture: "Psalm 27:14" },
  { day: 28, theme: "Peace with Your Past",           scripture: "Philippians 3:13-14" },
  { day: 29, theme: "Hope for Tomorrow",              scripture: "Jeremiah 29:11" },
  { day: 30, theme: "A Peace That Lasts",             scripture: "John 14:27" },
];

const COMPLETED_KEY_DB = 'bc_completed_daily_bread';
const COMPLETED_KEY_PC = 'bc_completed_peace_in_chaos';

function loadCompleted(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key)) || []); } catch { return new Set(); }
}
function saveCompleted(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export default function Devotionals() {
  const [view, setView] = useState('home');
  const [selectedDay, setSelectedDay] = useState(null);
  const [dailyBreadDay, setDailyBreadDay] = useState(1);
  const [completedDB, setCompletedDB] = useState(() => loadCompleted(COMPLETED_KEY_DB));
  const [completedPC, setCompletedPC] = useState(() => loadCompleted(COMPLETED_KEY_PC));

  const markDBComplete = (day) => {
    setCompletedDB(prev => {
      const next = new Set(prev).add(day);
      saveCompleted(COMPLETED_KEY_DB, next);
      return next;
    });
  };

  const markPCComplete = (day) => {
    setCompletedPC(prev => {
      const next = new Set(prev).add(day.day);
      saveCompleted(COMPLETED_KEY_PC, next);
      return next;
    });
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Daily Bread — grid picker
  if (view === 'daily_bread_grid') {
    return (
      <div className="bg-[#F9F7F2] min-h-screen px-4 py-8 md:py-16 md:pt-24">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setView('home')} className="flex items-center gap-1.5 text-[#4A0404] mb-6 font-serif text-sm hover:underline">← Back</button>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#4A0404] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#E5C07B]" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-[#4A0404]">Daily Bread</h2>
              <p className="font-serif text-sm text-[#6B6B6B]">{completedDB.size} of 31 days completed</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-[#E5C07B]/40 shadow-sm mb-4">
            <p className="font-serif text-xs text-[#6B6B6B] mb-4">Gold = completed · Tap any day to read</p>
            <DayGrid
              totalDays={31}
              completedDays={completedDB}
              onSelectDay={(d) => { setDailyBreadDay(d); setView('daily_bread'); }}
              activeDay={dailyBreadDay}
            />
          </div>
        </div>
      </div>
    );
  }

  // Daily Bread reader
  if (view === 'daily_bread') {
    return (
      <div className="bg-[#F9F7F2] min-h-screen px-4 py-8 md:py-16 md:pt-24">
        <div className="max-w-2xl mx-auto">
          <DailyBreadReader
            day={dailyBreadDay}
            onBack={() => setView('daily_bread_grid')}
            onDayChange={(d) => { markDBComplete(dailyBreadDay); setDailyBreadDay(d); }}
            onMarkComplete={markDBComplete}
            completedDays={completedDB}
          />
        </div>
      </div>
    );
  }

  // Peace in Chaos — grid picker
  if (view === 'peace_in_chaos') {
    return (
      <div className="bg-[#F9F7F2] min-h-screen px-4 py-8 md:py-16 md:pt-24">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setView('home')} className="flex items-center gap-1.5 text-[#4A0404] mb-6 font-serif text-sm hover:underline">← Back</button>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#4A0404] flex items-center justify-center">
              <Wind className="w-6 h-6 text-[#E5C07B]" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-[#4A0404]">Peace in Chaos</h2>
              <p className="font-serif text-sm text-[#6B6B6B]">{completedPC.size} of 30 days completed</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-[#E5C07B]/40 shadow-sm mb-4">
            <p className="font-serif text-xs text-[#6B6B6B] mb-4">Gold = completed · Tap any day to read</p>
            <DayGrid
              totalDays={30}
              completedDays={completedPC}
              onSelectDay={(d) => { setSelectedDay(PEACE_IN_CHAOS_DAYS[d - 1]); setView('day_reader'); }}
              activeDay={selectedDay?.day || null}
            />
          </div>
        </div>
      </div>
    );
  }

  // Peace in Chaos single day reader
  if (view === 'day_reader' && selectedDay) {
    const nextPCDay = PEACE_IN_CHAOS_DAYS.find(d => d.day === selectedDay.day + 1);
    return (
      <div className="bg-[#F9F7F2] min-h-screen px-4 py-8 md:py-16 md:pt-24">
        <div className="max-w-2xl mx-auto">
          <PeaceInChaosDay
            day={selectedDay}
            onBack={() => setView('peace_in_chaos')}
            onComplete={() => markPCComplete(selectedDay)}
            onNext={nextPCDay ? () => { markPCComplete(selectedDay); setSelectedDay(nextPCDay); } : null}
            nextDay={nextPCDay}
          />
        </div>
      </div>
    );
  }

  // Home view
  return (
    <div className="bg-[#F9F7F2] min-h-screen px-4 py-8 md:py-16 md:pt-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-[#4A0404] mb-3">
            <Calendar className="w-5 h-5" />
            <span className="font-serif text-sm text-[#6B6B6B]">{today}</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-[#4A0404] mb-3">Devotionals</h2>
          <p className="font-serif text-[#6B6B6B]">Daily readings and guided devotional series</p>
        </motion.div>

        {/* Peace in Chaos Series Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5">
          <button
            onClick={() => setView('peace_in_chaos')}
            className="w-full bg-white rounded-2xl p-6 md:p-8 border border-[#E5C07B]/40 hover:border-[#4A0404]/40 hover:shadow-md transition-all text-left group shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#4A0404] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Wind className="w-7 h-7 text-[#E5C07B]" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#4A0404] font-serif font-semibold">30-Day Series</span>
                  <h3 className="font-display text-xl text-[#3C3C3C]">Peace in Chaos</h3>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#4A0404] mt-1 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="font-serif text-[#6B6B6B] text-sm leading-relaxed mb-4">
              A 30-day journey into finding God's peace in life's most difficult seasons — anxiety, grief, uncertainty, and everyday overwhelm.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Scripture', 'Reflection', 'Prayer', 'Peace Challenge'].map(tag => (
                <span key={tag} className="text-xs bg-[#4A0404]/8 border border-[#4A0404]/20 text-[#4A0404] px-3 py-1 rounded-full font-serif">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        </motion.div>

        {/* Daily Bread Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <button
            onClick={() => setView('daily_bread_grid')}
            className="w-full bg-white rounded-2xl p-6 md:p-8 border border-[#E5C07B]/40 hover:border-[#4A0404]/40 hover:shadow-md transition-all text-left group shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#4A0404] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="w-7 h-7 text-[#E5C07B]" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#4A0404] font-serif font-semibold">31-Day Series</span>
                  <h3 className="font-display text-xl text-[#3C3C3C]">Daily Bread</h3>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#4A0404] mt-1 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="font-serif text-[#6B6B6B] text-sm leading-relaxed mb-4">
              A 31-day journey through Scripture — one verse, one reflection, and one prayer each day to nourish your soul.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Scripture', 'Reflection', 'Prayer', 'Share'].map(tag => (
                <span key={tag} className="text-xs bg-[#4A0404]/8 border border-[#4A0404]/20 text-[#4A0404] px-3 py-1 rounded-full font-serif">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        </motion.div>

        {/* Daily Reminder Setup */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-5">
          <DailyReminderSetup />
        </motion.div>

        {/* Footer quote */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-12">
          <p className="font-display text-lg text-[#4A0404]/60 italic">"Be still, and know that I am God."</p>
          <p className="mt-2 text-sm text-[#A0A0A0] font-serif">— Psalm 46:10</p>
        </motion.div>
      </div>
    </div>
  );
}