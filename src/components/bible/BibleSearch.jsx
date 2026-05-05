import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { base44 } from '@/api/base44Client';
import { ALL_BOOKS } from './bibleData';

// Detect if query looks like a verse reference: "John 3:16", "Genesis 1", "1 Cor 13:4-7"
function parseVerseRef(query) {
  const match = query.trim().match(/^(\d?\s*[a-zA-Z ]+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
  if (!match) return null;
  const bookName = match[1].trim();
  const chapter = parseInt(match[2]);
  const verseStart = match[3] ? parseInt(match[3]) : null;
  const verseEnd = match[4] ? parseInt(match[4]) : verseStart;
  const found = ALL_BOOKS.find(b =>
    b.name.toLowerCase().startsWith(bookName.toLowerCase()) ||
    b.abbr.toLowerCase() === bookName.toLowerCase()
  );
  return found ? { book: found, chapter, verseStart, verseEnd } : null;
};

export default function BibleSearch({ translation, onNavigate, onClear }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    // Check for direct verse reference
    const ref = parseVerseRef(query);
    if (ref) {
      onNavigate(ref.book, ref.chapter, ref.verseStart);
      return;
    }

    setIsSearching(true);
    setResults(null);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Search the Bible (${translation} translation) for: "${query}".
Return 6-8 highly relevant verses. For each verse, provide the exact ${translation} text and full reference.
If the query is a topic or theme, return the most well-known verses. Be accurate to the ${translation} wording.`,
      response_json_schema: {
        type: "object",
        properties: {
          verses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                reference: { type: "string" },
                text: { type: "string" }
              },
              required: ["reference", "text"]
            }
          }
        }
      }
    });

    setResults(result?.verses || []);
    setIsSearching(false);
  };

  const clear = () => {
    setQuery('');
    setResults(null);
    if (onClear) onClear();
  };

  return (
    <div>
      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8B8B]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={'Search "John 3:16", "love", "faith"...'}
            className="pl-11 pr-10 h-12 bg-white border-2 border-[#E5C07B] rounded-xl font-serif text-sm focus:border-[#4A0404] focus:ring-[#4A0404]/10 shadow-sm"
          />
          {query && (
            <button onClick={clear} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-sage transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="bg-sage hover:bg-sage-dark text-cream rounded-xl px-5 h-11 font-serif text-sm"
        >
          {isSearching ? '...' : 'Search'}
        </Button>
      </div>

      {/* Results */}
      {isSearching && (
        <div className="space-y-3 mt-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-white/50 rounded-xl border border-[#E8E3D3] gentle-pulse" />
          ))}
        </div>
      )}

      {results && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
          <div className="flex items-center justify-between mb-3">
            <p className="font-serif text-xs text-[#8B8B8B]">{results.length} results in {translation}</p>
            <button onClick={clear} className="text-xs text-sage font-serif hover:underline">Clear</button>
          </div>
          <div className="space-y-3">
            {results.map((verse, i) => (
              <div key={i} className="bg-white/50 rounded-xl p-4 border border-[#E8E3D3] hover:border-sage/40 transition-all">
                <p className="font-serif text-[#3D3D3D] leading-relaxed text-sm italic">
                  "{verse.text}"
                </p>
                <p className="mt-2 text-sage text-xs font-medium">— {verse.reference}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}