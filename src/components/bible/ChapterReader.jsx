import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import TranslationSelector from './TranslationSelector';
import { TRANSLATIONS } from './bibleData';

const API_KEY = 'nWBoXJdS48fQxR6SIuBLp';
const BASE_URL = 'https://rest.api.bible/v1';

// Build id map from authorised TRANSLATIONS list
const BIBLE_IDS = Object.fromEntries(TRANSLATIONS.map(t => [t.code, t.id]));
const DEFAULT_TRANSLATION = 'KJV';
const FALLBACK_ID = 'de4e12af7f28f599-01'; // KJV — always works

// USFM 3-letter book codes — must match api.bible exactly
const BOOK_ID_MAP = {
  'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM',
  'Deuteronomy': 'DEU', 'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT',
  '1 Samuel': '1SA', '2 Samuel': '2SA',
  '1 Kings': '1KI', '2 Kings': '2KI',
  '1 Chronicles': '1CH', '2 Chronicles': '2CH',
  'Ezra': 'EZR', 'Nehemiah': 'NEH', 'Esther': 'EST',
  'Job': 'JOB', 'Psalms': 'PSA', 'Psalm': 'PSA', 'Proverbs': 'PRO',
  'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG', 'Song of Songs': 'SNG',
  'Isaiah': 'ISA', 'Jeremiah': 'JER', 'Lamentations': 'LAM',
  'Ezekiel': 'EZK', 'Daniel': 'DAN', 'Hosea': 'HOS', 'Joel': 'JOL',
  'Amos': 'AMO', 'Obadiah': 'OBA', 'Jonah': 'JON', 'Micah': 'MIC',
  'Nahum': 'NAM', 'Habakkuk': 'HAB', 'Zephaniah': 'ZEP', 'Haggai': 'HAG',
  'Zechariah': 'ZEC', 'Malachi': 'MAL',
  'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN',
  'Acts': 'ACT', 'Romans': 'ROM',
  '1 Corinthians': '1CO', '2 Corinthians': '2CO',
  'Galatians': 'GAL', 'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL',
  '1 Thessalonians': '1TH', '2 Thessalonians': '2TH',
  '1 Timothy': '1TI', '2 Timothy': '2TI',
  'Titus': 'TIT', 'Philemon': 'PHM', 'Hebrews': 'HEB',
  'James': 'JAS', '1 Peter': '1PE', '2 Peter': '2PE',
  '1 John': '1JN', '2 John': '2JN', '3 John': '3JN',
  'Jude': 'JUD', 'Revelation': 'REV',
};

// Persistent cache
const chapterCache = {};
function getCached(key) {
  if (chapterCache[key]) return chapterCache[key];
  try {
    const raw = localStorage.getItem(`bc_ch_${key}`);
    if (raw) { chapterCache[key] = JSON.parse(raw); return chapterCache[key]; }
  } catch {}
  return null;
}
function setCached(key, value) {
  chapterCache[key] = value;
  try { localStorage.setItem(`bc_ch_${key}`, JSON.stringify(value)); } catch {}
}

// Extract verse text — prioritise data.content (HTML), fall back to data.text
function extractText(verseObj) {
  const raw = verseObj.content || verseObj.text || '';
  return raw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

async function fetchChapter(bibleId, chapterId) {
  const url = `${BASE_URL}/bibles/${bibleId}/chapters/${chapterId}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`;
  const res = await fetch(url, { headers: { 'api-key': API_KEY } });
  if (!res.ok) {
    const detail = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(`HTTP ${res.status}: ${detail}`);
  }
  const json = await res.json();

  // /chapters/{id} returns full chapter as a single content block — parse verses from it
  // Try verses sub-array first (some Bible IDs)
  if (json.data?.verses?.length) {
    return json.data.verses.map(v => ({
      number: parseInt(v.id?.split('.').pop() || v.number, 10),
      text: extractText(v),
    }));
  }

  // Fallback: fetch via /verses endpoint
  const versesUrl = `${BASE_URL}/bibles/${bibleId}/chapters/${chapterId}/verses?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`;
  const vRes = await fetch(versesUrl, { headers: { 'api-key': API_KEY } });
  if (!vRes.ok) throw new Error(`HTTP ${vRes.status}`);
  const vJson = await vRes.json();
  const rawVerses = vJson.data || [];
  if (!rawVerses.length) throw new Error('No verses in response');

  // For each verse summary, fetch full text
  const verses = await Promise.all(rawVerses.map(async (v) => {
    const vDetailUrl = `${BASE_URL}/bibles/${bibleId}/verses/${v.id}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false`;
    const vd = await fetch(vDetailUrl, { headers: { 'api-key': API_KEY } });
    if (!vd.ok) return { number: parseInt(v.id.split('.').pop(), 10), text: extractText(v) };
    const vdJson = await vd.json();
    return {
      number: parseInt(v.id.split('.').pop(), 10),
      text: extractText(vdJson.data || v),
    };
  }));
  return verses;
}

export default function ChapterReader({ book, chapter, translation, onTranslationChange, onBack, onNavigateChapter, highlightVerse }) {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeTranslation, setActiveTranslation] = useState(translation || DEFAULT_TRANSLATION);

  useEffect(() => { setActiveTranslation(translation || DEFAULT_TRANSLATION); }, [translation]);
  useEffect(() => { loadChapter(); }, [book.name, chapter, activeTranslation]);

  useEffect(() => {
    if (highlightVerse && content?.verses) {
      setTimeout(() => {
        const el = document.getElementById(`verse-${highlightVerse}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [content, highlightVerse]);

  const loadChapter = async () => {
    const cacheKey = `${activeTranslation}:${book.name}:${chapter}`;
    const cached = getCached(cacheKey);
    if (cached) { setContent(cached); setIsLoading(false); setErrorMsg(null); return; }

    setIsLoading(true);
    setContent(null);
    setErrorMsg(null);

    const bookCode = BOOK_ID_MAP[book.name] || book.abbr?.toUpperCase();
    const chapterId = `${bookCode}.${chapter}`;
    const primaryId = BIBLE_IDS[activeTranslation] || FALLBACK_ID;

    let verses = null;
    try {
      verses = await fetchChapter(primaryId, chapterId);
    } catch {
      // Silent auto-fallback to KJV
      if (primaryId !== FALLBACK_ID) {
        try {
          verses = await fetchChapter(FALLBACK_ID, chapterId);
        } catch (fallbackErr) {
          setErrorMsg(`Could not load ${book.name} ${chapter}. ${fallbackErr.message}`);
          setIsLoading(false);
          return;
        }
      } else {
        setErrorMsg(`Could not load ${book.name} ${chapter}. Please check your connection.`);
        setIsLoading(false);
        return;
      }
    }

    const result = { verses };
    setCached(cacheKey, result);
    setContent(result);
    setIsLoading(false);
  };

  const prevChapter = chapter > 1 ? chapter - 1 : null;
  const nextChapter = chapter < book.chapters ? chapter + 1 : null;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[#E5C07B] font-serif text-sm hover:underline">
          <ChevronLeft className="w-4 h-4" />{book.name}
        </button>
        <TranslationSelector
          translation={activeTranslation}
          onSelect={(t) => { setActiveTranslation(t); onTranslationChange?.(t); }}
        />
      </div>

      {/* Chapter heading */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => prevChapter && onNavigateChapter(prevChapter)}
          disabled={!prevChapter}
          className="p-2 rounded-lg border border-[#D4CFC0] hover:border-[#E5C07B] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-[#E5C07B]" />
        </button>
        <div className="text-center">
          <h3 className="font-display text-xl text-[#3C3C3C]">{book.name}</h3>
          <p className="font-serif text-sm text-[#E5C07B]">Chapter {chapter}</p>
          <p className="font-serif text-xs text-[#8B8B8B]">{activeTranslation}</p>
        </div>
        <button
          onClick={() => nextChapter && onNavigateChapter(nextChapter)}
          disabled={!nextChapter}
          className="p-2 rounded-lg border border-[#D4CFC0] hover:border-[#E5C07B] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4 text-[#E5C07B]" />
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="bg-white/50 rounded-2xl p-6 md:p-10 border border-[#E5C07B]/30">
          <div className="space-y-3">
            {[92, 78, 100, 65, 88, 72, 95, 60, 84, 70].map((w, i) => (
              <div key={i} className="h-4 rounded-full shimmer-bar" style={{ width: `${w}%`, animationDelay: `${i * 0.07}s` }} />
            ))}
          </div>
          <p className="text-center text-[#B8935A] text-xs italic font-serif mt-6">
            Loading {book.name} {chapter}…
          </p>
        </div>
      ) : errorMsg ? (
        <div className="bg-[#4A0404]/5 rounded-2xl p-8 border border-[#4A0404]/30">
          <p className="font-serif text-[#4A0404] text-base leading-relaxed mb-3">
            Unable to load this passage. Please check your connection and try again.
          </p>
          <pre className="text-xs text-[#4A0404]/70 bg-[#4A0404]/5 rounded-lg p-3 overflow-auto whitespace-pre-wrap break-all border border-[#4A0404]/10 mb-4">
            {errorMsg}
          </pre>
          <button onClick={loadChapter} className="flex items-center gap-2 text-[#E5C07B] font-serif text-sm hover:underline">
            <RefreshCw className="w-4 h-4" /> Try again
          </button>
        </div>
      ) : content?.verses?.length ? (
        <div className="bg-white/50 rounded-2xl p-6 md:p-10 border border-[#E8E3D3]">
          <p className="font-serif text-[#3D3D3D] leading-[2] text-base md:text-lg">
            {content.verses.map((v) => (
              <span key={v.number} id={`verse-${v.number}`} className={highlightVerse === v.number ? 'bg-[#E5C07B]/20 rounded px-0.5' : ''}>
                <sup className="text-[#E5C07B] text-[10px] font-medium mr-0.5 select-none">{v.number}</sup>
                {v.text}{' '}
              </span>
            ))}
          </p>
        </div>
      ) : null}

      {/* Bottom navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => prevChapter && onNavigateChapter(prevChapter)}
          disabled={!prevChapter}
          className="flex items-center gap-2 text-[#E5C07B] font-serif text-sm hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />Chapter {prevChapter}
        </button>
        <button
          onClick={() => nextChapter && onNavigateChapter(nextChapter)}
          disabled={!nextChapter}
          className="flex items-center gap-2 text-[#E5C07B] font-serif text-sm hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Chapter {nextChapter}<ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}