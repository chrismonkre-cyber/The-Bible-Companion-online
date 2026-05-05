import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Check } from 'lucide-react';

const STORAGE_KEY = 'bible_companion_welcomed';
const REMINDER_KEY = 'dailyBreadReminder';

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState('welcome'); // 'welcome' | 'time' | 'done'
  const [time, setTime] = useState('08:00');

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleSetReminder = async () => {
    const { requestPermission, saveAndSchedule } = await import('@/utils/notificationScheduler');
    const result = await requestPermission();
    const reminder = { enabled: result === 'granted', time };
    await saveAndSchedule(reminder);
    setStep('done');
    setTimeout(dismiss, 1500);
  };

  const handleSkip = () => {
    localStorage.setItem(REMINDER_KEY, JSON.stringify({ enabled: false, time: '08:00' }));
    dismiss();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(74,4,4,0.45)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            className="bg-[#F9F7F2] rounded-3xl shadow-2xl max-w-sm w-full p-10 text-center relative border border-[#E5C07B]/40"
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-[#B0B0B0] hover:text-[#4A0404] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo mark */}
            <div className="flex justify-center mb-6">
              <svg width="56" height="56" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="20" stroke="#E5C07B" strokeWidth="1.5" fill="#4A0404"/>
                <defs>
                  <path id="wTopArc" d="M 5,22 A 17,17 0 0,1 39,22" />
                  <path id="wBotArc" d="M 7,26 A 17,17 0 0,0 37,26" />
                </defs>
                <text fontSize="5.5" fill="#E5C07B" fontFamily="serif" letterSpacing="1">
                  <textPath href="#wTopArc" startOffset="10%">THE BIBLE</textPath>
                </text>
                <text fontSize="5.5" fill="#E5C07B" fontFamily="serif" letterSpacing="1">
                  <textPath href="#wBotArc" startOffset="8%">COMPANION</textPath>
                </text>
                <rect x="20.5" y="13" width="3" height="18" rx="0.5" fill="#E5C07B"/>
                <rect x="14" y="18.5" width="16" height="3" rx="0.5" fill="#E5C07B"/>
              </svg>
            </div>

            <AnimatePresence mode="wait">
              {step === 'welcome' && (
                <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="font-display text-2xl text-[#4A0404] mb-4 leading-snug">
                    Welcome to your Sanctuary
                  </h2>
                  <p className="font-serif text-[#6B6B6B] text-base leading-relaxed mb-8">
                    Life is loud, but God is constant.<br />
                    Would you like a daily reminder to find your peace?
                  </p>
                  <button
                    onClick={() => setStep('time')}
                    className="w-full bg-[#4A0404] hover:bg-[#5a0505] text-[#E5C07B] rounded-full px-8 py-3 font-serif text-sm font-semibold transition-all duration-300 shadow-md mb-3 flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4" /> Set My Daily Reminder
                  </button>
                  <button
                    onClick={handleSkip}
                    className="w-full text-[#A0A0A0] hover:text-[#4A0404] font-serif text-sm transition-colors py-2"
                  >
                    Maybe later
                  </button>
                </motion.div>
              )}

              {step === 'time' && (
                <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="w-12 h-12 rounded-full bg-[#4A0404] flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-6 h-6 text-[#E5C07B]" />
                  </div>
                  <h2 className="font-display text-xl text-[#4A0404] mb-2">Choose your time</h2>
                  <p className="font-serif text-[#6B6B6B] text-sm mb-2 italic">
                    "Your Daily Bread is ready. Take a moment for peace. 🕊️"
                  </p>
                  <p className="font-serif text-xs text-[#B8935A] mb-6">This message will arrive at your chosen time every day.</p>
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full bg-white border border-[#E5C07B]/50 rounded-xl px-4 py-3 font-serif text-[#3C3C3C] text-lg text-center focus:outline-none focus:border-[#4A0404] mb-6"
                    style={{ colorScheme: 'light' }}
                  />
                  <button
                    onClick={handleSetReminder}
                    className="w-full bg-[#4A0404] hover:bg-[#5a0505] text-[#E5C07B] rounded-full px-8 py-3 font-serif text-sm font-semibold transition-all shadow-md mb-3"
                  >
                    Confirm Reminder
                  </button>
                  <button onClick={handleSkip} className="w-full text-[#A0A0A0] hover:text-[#4A0404] font-serif text-sm transition-colors py-2">
                    Skip for now
                  </button>
                </motion.div>
              )}

              {step === 'done' && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="w-14 h-14 rounded-full bg-[#4A0404] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-[#E5C07B]" />
                  </div>
                  <h2 className="font-display text-xl text-[#4A0404] mb-2">You're all set! 🕊️</h2>
                  <p className="font-serif text-[#6B6B6B] text-sm">Your daily reminder is saved. See you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}