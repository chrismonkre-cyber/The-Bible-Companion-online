import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function ChapterGrid({ book, selectedChapter, onSelectChapter, onBack }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sage mb-5 font-serif text-sm hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        All Books
      </button>
      <h3 className="font-display text-xl text-warm-brown mb-1">{book.name}</h3>
      <p className="font-serif text-xs text-[#8B8B8B] mb-5">{book.chapters} chapters</p>

      <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => (
          <button
            key={ch}
            onClick={() => onSelectChapter(ch)}
            className={`aspect-square flex items-center justify-center rounded-lg border font-serif text-sm transition-all
              ${selectedChapter === ch
                ? 'bg-sage text-cream border-sage shadow'
                : 'bg-white/50 border-[#E8E3D3] text-[#3D3D3D] hover:border-sage hover:bg-sage/10'
              }`}
          >
            {ch}
          </button>
        ))}
      </div>
    </motion.div>
  );
}