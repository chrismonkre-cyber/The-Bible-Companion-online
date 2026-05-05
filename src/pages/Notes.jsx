import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

const STORAGE_KEY = 'bible_companion_notes';

export default function Notes() {
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-[#4A0404]" />
        <h1 className="font-display text-2xl text-[#4A0404] font-semibold">My Notes</h1>
      </div>
      <p className="font-serif text-sm text-[#6B6B6B] mb-4">
        Jot down your thoughts, prayers, and scripture reflections. Everything saves automatically.
      </p>
      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Start writing your reflections here…"
        className="w-full min-h-[400px] resize-none bg-white border-2 border-[#E5C07B] rounded-2xl p-5 font-serif text-[#3C3C3C] placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#E5C07B]/40 text-sm leading-relaxed shadow-sm"
      />
      <p className="mt-2 text-xs text-[#A0A0A0] font-serif text-right">Auto-saved to this device</p>
    </div>
  );
}