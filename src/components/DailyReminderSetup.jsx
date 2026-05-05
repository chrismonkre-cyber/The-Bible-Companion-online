import React, { useState, useEffect } from 'react';
import { Bell, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { requestPermission, saveAndSchedule, getStoredReminder } from '@/utils/notificationScheduler';

export default function DailyReminderSetup({ onClose }) {
  const [reminder, setReminder] = useState(getStoredReminder);
  const [permission, setPermission] = useState(() => 'Notification' in window ? Notification.permission : 'unsupported');
  const [saved, setSaved] = useState(false);

  const handleToggle = async () => {
    if (!reminder.enabled) {
      const result = await requestPermission();
      setPermission(result);
      if (result !== 'granted') return;
      const updated = { ...reminder, enabled: true };
      setReminder(updated);
      await saveAndSchedule(updated);
    } else {
      const updated = { ...reminder, enabled: false };
      setReminder(updated);
      await saveAndSchedule(updated);
    }
  };

  const handleTimeChange = (e) => {
    const updated = { ...reminder, time: e.target.value };
    setReminder(updated);
  };

  const handleSave = async () => {
    await saveAndSchedule(reminder);
    setSaved(true);
    setTimeout(() => { setSaved(false); if (onClose) onClose(); }, 1200);
  };

  const notifBlocked = permission === 'denied';

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E5C07B]/40 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#4A0404] flex items-center justify-center">
          <Bell className="w-5 h-5 text-[#E5C07B]" />
        </div>
        <div>
          <h3 className="font-display text-lg text-[#3C3C3C]">Daily Reminder</h3>
          <p className="font-serif text-xs text-[#6B6B6B]">Get a nudge to read today's verse</p>
        </div>
        {/* Toggle */}
        <button
          onClick={handleToggle}
          disabled={notifBlocked}
          className={`ml-auto w-12 h-6 rounded-full transition-colors duration-300 relative ${
            reminder.enabled ? 'bg-[#4A0404]' : 'bg-[#D0C8B8]'
          } disabled:opacity-40`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
              reminder.enabled ? 'left-7' : 'left-1'
            }`}
          />
        </button>
      </div>

      {notifBlocked && (
        <p className="text-xs text-rose-500 font-serif bg-rose-50 rounded-lg px-3 py-2">
          Notifications are blocked by your browser. Please enable them in your browser settings.
        </p>
      )}

      {/* Preview message */}
      <div className="bg-[#4A0404]/5 border border-[#4A0404]/15 rounded-xl px-4 py-3">
        <p className="font-serif text-sm text-[#4A0404] italic">
          "Your Daily Bread is ready. Take a moment for peace. 🕊️"
        </p>
      </div>

      {/* Time picker */}
      <AnimatePresence>
        {reminder.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <label className="block font-serif text-sm text-[#6B6B6B] mb-2">Remind me daily at:</label>
            <input
              type="time"
              value={reminder.time}
              onChange={handleTimeChange}
              className="w-full bg-[#F9F7F2] border border-[#E5C07B]/50 rounded-xl px-4 py-3 font-serif text-[#3C3C3C] text-lg focus:outline-none focus:border-[#4A0404] focus:ring-2 focus:ring-[#4A0404]/10"
              style={{ colorScheme: 'light' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={notifBlocked}
        className="w-full bg-[#4A0404] hover:bg-[#5a0505] text-[#E5C07B] font-semibold rounded-xl py-3 font-serif text-sm transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
      >
        <AnimatePresence mode="wait">
          {saved ? (
            <motion.span key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Saved!
            </motion.span>
          ) : (
            <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Save Reminder
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}