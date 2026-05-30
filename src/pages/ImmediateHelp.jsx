import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import LogoSeal from '@/components/LogoSeal';

const API_KEY = 'nWBoXJdS48fQxR6SIuBLp';
const BASE_URL = 'https://rest.api.bible/v1';
const NIV_ID = '78a9f6124f344018-01';

// Pre-defined verse IDs for each emotion (NIV) — pinned for speed & accuracy
const EMOTIONS = [
  {
    label: 'Anxious',
    verseIds: ['PHP.4.6', 'PHP.4.7', 'MAT.6.34', '1PE.5.7', 'PSA.94.19'],
    reflection: 'God invites you to exchange your anxiety for His peace that surpasses all understanding.',
  },
  {
    label: 'Lonely',
    verseIds: ['DEU.31.8', 'PSA.23.4', 'HEB.13.5', 'ISA.41.10', 'MAT.28.20'],
    reflection: 'Even in your loneliest moments, God is already there — walking ahead of you.',
  },
  {
    label: 'Afraid',
    verseIds: ['ISA.41.13', 'PSA.56.3', '2TI.1.7', 'PSA.27.1', 'ISA.43.1'],
    reflection: 'God is holding your hand right now, and His strength is greater than any fear you face.',
  },
  {
    label: 'Overwhelmed',
    verseIds: ['MAT.11.28', 'MAT.11.29', 'PSA.61.2', 'PSA.55.22', 'PHP.4.13'],
    reflection: 'Jesus personally invites you to lay down every burden — He is strong enough to carry it all.',
  },
  {
    label: 'Grieving',
    verseIds: ['PSA.147.3', 'REV.21.4', 'MAT.5.4', 'PSA.34.18', '2CO.1.3'],
    reflection: 'Your grief is seen and known by God, and He is gently at work healing every broken place.',
  },
  {
    label: 'Hopeless',
    verseIds: ['JER.29.11', 'ROM.15.13', 'LAM.3.22', 'LAM.3.23', 'PSA.42.11'],
    reflection: "No matter how dark today feels, God's plans for your life are full of hope and a bright future.",
  },
];

async function fetchVerses(verseIds) {
  const results = await Promise.all(verseIds.map(async (id) => {
    const url = `${BASE_URL}/bibles/${NIV_ID}/verses/${id}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false`;
    const res = await fetch(url, { headers: { 'api-key': API_KEY } });
    if (!res.ok) return null;
    const json = await res.json();
    const raw = json.data?.content || json.data?.text || '';
    return {
      text: raw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
      reference: json.data?.reference || id,
    };
  }));
  return results.filter(Boolean);
}

export default function ImmediateHelp() {
  const [selected, setSelected] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loadingVerses, setLoadingVerses] = useState(false);

  const handleSelect = async (emotion) => {
    if (selected?.label === emotion.label) {
      setSelected(null);
      setVerses([]);
      return;
    }
    setSelected(emotion);
    setVerses([]);
    setLoadingVerses(true);
    const fetched = await fetchVerses(emotion.verseIds);
    setVerses(fetched);
    setLoadingVerses(false);
  };

  return (
    <div>
      {/* Cover Section */}
      <div className="bg-[#4A0404] px-4 pt-10 pb-14 md:pt-20 md:pb-20 md:pt-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex justify-center mb-6">
              <LogoSeal size={80} />
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-[#E5C07B] mb-4 leading-tight">
              Immediate Help
            </h2>
            <p className="font-serif text-[#B8935A] text-base md:text-lg max-w-xl mx-auto">
              How are you feeling right now? Select what speaks to your heart.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-[#F9F7F2] px-4 py-10 md:py-14">
        <div className="max-w-lg mx-auto">

          {/* Emotion Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="-mt-10 bg-white rounded-3xl p-6 md:p-10 border border-[#E5C07B]/40 shadow-lg mb-8"
          >
            <div className="flex flex-col gap-3">
              {EMOTIONS.map((emotion, i) => (
                <motion.button
                  key={emotion.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  onClick={() => handleSelect(emotion)}
                  className={`w-full py-4 px-6 text-center font-display text-lg font-medium transition-all duration-200 ${
                    selected?.label === emotion.label
                      ? 'bg-[#4A0404] text-[#E5C07B] shadow-md'
                      : 'bg-[#E5C07B] text-[#4A0404] hover:bg-[#C9A55A] hover:shadow-md'
                  }`}
                  style={{ borderRadius: '8px' }}
                >
                  {emotion.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Verse Display */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="bg-[#4A0404] rounded-2xl p-6 md:p-8 mb-10 shadow-md"
              >
                {loadingVerses ? (
                  <div className="space-y-3">
                    {[90, 75, 100, 65, 85].map((w, i) => (
                      <div key={i} className="h-3 rounded-full shimmer-bar" style={{ width: `${w}%`, animationDelay: `${i * 0.07}s` }} />
                    ))}
                    <p className="text-center text-[#E5C07B]/60 text-xs italic font-serif mt-3">Loading NIV verses…</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-5">
                      {verses.map((v, i) => (
                        <div key={i} className="border-l-2 border-[#E5C07B]/40 pl-4">
                          <p className="font-display text-sm md:text-base text-[#E5C07B] leading-relaxed italic">"{v.text}"</p>
                          <p className="font-serif text-[#B8935A] text-xs mt-1">— {v.reference} (NIV)</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#E5C07B]/20 pt-4">
                      <p className="font-serif text-[#F9F7F2] text-sm leading-relaxed">{selected.reflection}</p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Crisis Resources */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5C07B]/40 shadow-sm mb-10">
            <h3 className="font-display text-lg text-[#4A0404] mb-1">Need to talk to someone?</h3>
            <p className="font-serif text-sm text-[#6B6B6B] mb-4">You are not alone. Reach out — someone cares.</p>
            <div className="space-y-2 font-serif text-sm text-[#3C3C3C]">
              <p><span className="font-semibold text-[#4A0404]">988 Lifeline:</span> Call or text <span className="font-medium">988</span></p>
              <p><span className="font-semibold text-[#4A0404]">Crisis Text Line:</span> Text <span className="font-medium">HOME to 741741</span></p>
              <p><span className="font-semibold text-[#4A0404]">700 Club Prayer:</span> <span className="font-medium">1-800-759-0700</span></p>
              <div className="border-t border-[#E5C07B]/30 pt-3 mt-3">
                <p><span className="font-semibold text-[#4A0404]">Kingdom Mandate Ministry:</span> <span className="font-medium">813-649-3150</span></p>
                <p className="text-xs text-[#6B6B6B] mt-1">Prayer, support & spiritual guidance</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="font-serif text-xs text-[#E5C07B]">© 2026 Kingdom Mandate Ministry | Built by the Grace of God, for the Glory of God</p>
          </div>

        </div>
      </div>
    </div>
  );
}