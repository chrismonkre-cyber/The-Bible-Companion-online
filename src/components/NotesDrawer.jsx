import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';

const STORAGE_KEY = 'bible_companion_notes';

export default function NotesDrawer({ isOpen, onClose }) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setNotes(saved);
  }, []);

  const handleChange = (e) => {
    setNotes(e.target.value);
    localStorage.setItem(STORAGE_KEY, e.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[100]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-[#F9F7F2] rounded-t-3xl shadow-2xl max-h-[75vh] flex flex-col"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-[#E5C07B]/50" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#E5C07B]/30">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#4A0404]" />
                <h2 className="font-display text-lg text-[#4A0404] font-semibold">My Notes</h2>
              </div>
              <button onClick={onClose} className="text-[#6B6B6B] hover:text-[#4A0404] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Textarea */}
            <div className="flex-1 overflow-auto p-5">
              <textarea
                value={notes}
                onChange={handleChange}
                placeholder="Jot down your thoughts, prayers, and reflections here…"
                className="w-full h-full min-h-[250px] resize-none bg-white border-2 border-[#E5C07B] rounded-xl p-4 font-serif text-[#3C3C3C] placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#E5C07B]/40 text-sm leading-relaxed"
              />
              <p className="mt-2 text-xs text-[#A0A0A0] font-serif text-right">Auto-saved</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}