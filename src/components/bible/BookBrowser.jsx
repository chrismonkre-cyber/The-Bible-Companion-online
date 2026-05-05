import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen } from 'lucide-react';
import { ALL_BOOKS, OLD_TESTAMENT_SECTIONS, NEW_TESTAMENT_SECTIONS } from './bibleData';

export default function BookBrowser({ onSelectBook }) {
  const [activeTab, setActiveTab] = useState('Old Testament');

  const sections = activeTab === 'Old Testament' ? OLD_TESTAMENT_SECTIONS : NEW_TESTAMENT_SECTIONS;
  const booksInTab = ALL_BOOKS.filter(b => b.category === activeTab);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {/* OT / NT Tab */}
      <div className="flex rounded-xl overflow-hidden border border-[#4A0404]/30 mb-8 w-fit mx-auto">
        {['Old Testament', 'New Testament'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 font-serif text-sm transition-all ${
              activeTab === tab
                ? 'bg-[#4A0404] text-[#E5C07B]'
                : 'bg-white text-[#4A0404] hover:bg-[#4A0404]/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sections */}
      {sections.map(section => {
        const sectionBooks = booksInTab.filter(b => b.section === section);
        if (!sectionBooks.length) return null;
        return (
          <div key={section} className="mb-7">
            <h4 className="font-serif text-xs uppercase tracking-widest text-[#8B8B8B] mb-3 px-1">
              {section}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sectionBooks.map(book => (
                <button
                  key={book.name}
                  onClick={() => onSelectBook(book)}
                  className="flex items-center justify-between p-3 bg-white/40 rounded-xl border border-[#EDE8D0] hover:border-sage/50 hover:bg-white/60 transition-all group text-left"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <BookOpen className="w-3.5 h-3.5 text-sage shrink-0" />
                    <span className="font-serif text-[#3D3D3D] text-sm truncate">{book.name}</span>
                  </div>
                  <span className="text-xs text-[#A0A0A0] shrink-0 ml-1">{book.chapters}ch</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}