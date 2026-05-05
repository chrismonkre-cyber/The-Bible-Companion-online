import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { TRANSLATIONS } from './bibleData';

export default function TranslationSelector({ translation, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = TRANSLATIONS.find(t => t.code === translation);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-white/60 border border-[#D4CFC0] rounded-xl hover:border-sage transition-all font-serif text-[#3D3D3D]"
      >
        <span className="font-medium text-sage">{translation}</span>
        <span className="text-xs text-[#8B8B8B] hidden sm:inline">— {current?.name}</span>
        <ChevronDown className={`w-4 h-4 text-[#8B8B8B] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#E8E3D3] rounded-2xl shadow-lg z-50 overflow-hidden">
          <div className="p-2">
            <p className="text-xs text-[#8B8B8B] px-3 py-2 font-serif">Select a Translation</p>
            {TRANSLATIONS.map((t) => (
              <button
                key={t.code}
                onClick={() => { onSelect(t.code); setOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-sage/10 transition-all group"
              >
                <div className="text-left">
                  <span className="font-medium text-[#3D3D3D] font-serif">{t.code}</span>
                  <span className="ml-2 text-xs text-[#8B8B8B]">{t.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#A0A0A0]">{t.year}</span>
                  {translation === t.code && <Check className="w-4 h-4 text-sage" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}