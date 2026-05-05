import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BookBrowser from '@/components/bible/BookBrowser';
import ChapterGrid from '@/components/bible/ChapterGrid';
import ChapterReader from '@/components/bible/ChapterReader';
import BibleSearch from '@/components/bible/BibleSearch';
import TranslationSelector from '@/components/bible/TranslationSelector';

// view: 'books' | 'chapters' | 'reader'
export default function Bible() {
  const [translation, setTranslation] = useState('NIV');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [highlightVerse, setHighlightVerse] = useState(null);
  const [view, setView] = useState('books'); // 'books' | 'chapters' | 'reader'

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setView('chapters');
  };

  const handleSelectChapter = (chapter) => {
    setSelectedChapter(chapter);
    setView('reader');
  };

  const handleTranslationChange = (newTranslation) => {
    // Stay on current chapter, just reload in new translation
    setTranslation(newTranslation);
  };

  const handleNavigateChapter = (chapter) => {
    setSelectedChapter(chapter);
  };

  const handleNavigateFromSearch = (book, chapter, verse) => {
    setSelectedBook(book);
    setSelectedChapter(chapter);
    setHighlightVerse(verse || null);
    setView('reader');
  };

  return (
    <div className="bg-[#F9F7F2] px-4 py-8 md:py-16 md:pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl text-[#4A0404] mb-2">
            Holy Scripture
          </h2>
          <p className="font-serif text-[#6B6B6B] text-sm">
            66 books · All Translations · Search any verse or topic
          </p>
        </motion.div>

        {/* Search + Translation (always visible) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 md:p-6 border border-[#E5C07B]/40 mb-8 shadow-sm"
        >
          {/* Translation bar shown only when NOT in reader (reader has its own) */}
          {view !== 'reader' && (
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif text-sm text-[#8B8B8B]">Translation:</span>
              <TranslationSelector translation={translation} onSelect={handleTranslationChange} />
            </div>
          )}
          <BibleSearch
            translation={translation}
            onNavigate={handleNavigateFromSearch}
            onClear={() => {}}
          />
        </motion.div>

        {/* Main Content */}
        <div>
          {view === 'books' && (
            <BookBrowser onSelectBook={handleSelectBook} />
          )}

          {view === 'chapters' && selectedBook && (
            <ChapterGrid
              book={selectedBook}
              selectedChapter={selectedChapter}
              onSelectChapter={handleSelectChapter}
              onBack={() => {
                setSelectedBook(null);
                setView('books');
              }}
            />
          )}

          {view === 'reader' && selectedBook && selectedChapter && (
            <ChapterReader
              book={selectedBook}
              chapter={selectedChapter}
              translation={translation}
              onTranslationChange={handleTranslationChange}
              onBack={() => setView('chapters')}
              onNavigateChapter={handleNavigateChapter}
              highlightVerse={highlightVerse}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 mb-4">
          <p className="font-serif text-xs text-[#B8935A]">© 2026 Kingdom Mandate Ministry | Built by the Grace of God, for the Glory of God</p>
        </div>

      </div>
    </div>
  );
}