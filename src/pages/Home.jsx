import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RefreshCw, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from '@/api/base44Client';
import EmotionSelector from '@/components/home/EmotionSelector';

import ResponseDisplay from '@/components/home/ResponseDisplay';
import { findCachedResponse } from '@/components/home/cachedVerses';
import LogoSeal from '@/components/LogoSeal';

export default function Home() {
  const [feeling, setFeeling] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // Show banner only if not already installed as PWA
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
    if (!isInstalled) {
      setShowInstallBanner(true);
    }

    // Hide banner if user installs the PWA
    const handler = (e) => {
      if (e.matches) setShowInstallBanner(false);
    };
    const mq = window.matchMedia('(display-mode: standalone)');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setFeeling(emotion);
  };

  const handleSubmit = async () => {
    if (!feeling.trim()) return;
    setIsLoading(true);
    setResponse(null);

    const cached = findCachedResponse(feeling);
    if (cached) {
      setResponse(cached);
      setIsLoading(false);
      return;
    }

    const emotionTopicMap = {
      'Hopeful': 'Hope',
      'Lonely': 'Loneliness',
      'Joyful': 'Joy',
      'Angry': 'Anger',
      'Confused': 'Guidance',
      'Grief': 'Grief and Loss',
      'Anxiety': 'Anxiety',
      'Stress': 'Stress',
      'Peace': 'Peace',
      'Gratitude': 'Gratitude',
    };
    const topic = emotionTopicMap[feeling] || feeling;
    setCurrentTopic(topic);

    const prompt = `You are a compassionate Bible companion. A person is feeling: "${topic}"

Please provide comfort and guidance with:
1. 3-5 relevant Bible verses (NIV) that speak to this emotion/situation (include the full verse text and reference)
2. A gentle devotional reflection (2-3 paragraphs) that connects these verses to their current feelings
3. A short, uplifting encouragement (1-2 sentences)

Be warm, empathetic, and pastoral in tone. Focus on God's love, presence, and promises.`;

    // For Hope, seed with Romans 15:13 as a guaranteed anchor verse
    const hopeHint = topic === 'Hope'
      ? '\n\nIMPORTANT: Always include Romans 15:13 as one of the verses: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit."'
      : '';

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: prompt + hopeHint,
      response_json_schema: {
        type: "object",
        properties: {
          verses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                reference: { type: "string" }
              }
            }
          },
          reflection: { type: "string" },
          encouragement: { type: "string" }
        }
      }
    });

    setResponse(result);
    setIsLoading(false);
  };

  const handleReset = () => {
    setFeeling('');
    setSelectedEmotion('');
    setResponse(null);
    setCurrentTopic('');
  };

  return (
    <div>
      {/* ── Install Banner ── */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-[#E5C07B] px-4 py-2.5 flex items-center justify-between gap-3"
          >
            <p className="font-serif text-[#4A0404] text-sm font-semibold text-center flex-1">
              📲 Install The Bible Companion to your Home Screen
            </p>
            <button onClick={() => setShowInstallBanner(false)} className="text-[#4A0404]/60 hover:text-[#4A0404] shrink-0">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── COVER SECTION — Burgundy & Gold ── */}
      <div className="bg-[#4A0404] px-4 pt-10 pb-14 md:pt-20 md:pb-20 md:pt-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Logo mark */}
            <div className="flex justify-center mb-6">
              <LogoSeal size={80} />
            </div>

            <h2 className="font-display text-3xl md:text-5xl text-[#E5C07B] mb-4 leading-tight">
              How are you feeling today?
            </h2>
            <p className="font-serif text-[#B8935A] text-base md:text-lg max-w-xl mx-auto">
              Share what's on your heart, and let Scripture bring you comfort and peace.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── CONTENT SECTION — Warm Cream ── */}
      <div className="bg-[#F9F7F2] px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">

          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="-mt-10 bg-white rounded-3xl p-6 md:p-10 border border-[#E5C07B]/40 shadow-lg mb-10"
          >
            {/* Emotion Buttons */}
            <div className="mb-6">
              <p className="text-sm text-[#6B6B6B] text-center mb-4 font-serif">
                Select an emotion or describe your feelings below
              </p>
              <EmotionSelector
                onSelect={handleEmotionSelect}
                selectedEmotion={selectedEmotion}
              />
            </div>

            {/* Text Input */}
            <div className="space-y-4">
              <Textarea
                value={feeling}
                onChange={(e) => {
                  setFeeling(e.target.value);
                  setSelectedEmotion('');
                }}
                placeholder="Or share more about what you're going through..."
                className="min-h-[100px] bg-[#F9F7F2] border-[#E5C07B]/50 rounded-xl resize-none font-serif text-[#3C3C3C] placeholder:text-[#A0A0A0] focus:border-[#4A0404] focus:ring-[#4A0404]/10"
              />

              <div className="flex justify-center gap-3">
                {response && (
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-[#4A0404]/30 text-[#4A0404] hover:bg-[#4A0404]/5 rounded-full px-6"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={!feeling.trim() || isLoading}
                  className="bg-[#4A0404] hover:bg-[#5a0505] text-[#E5C07B] font-semibold rounded-full px-8 py-5 font-serif text-base shadow-md transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#E5C07B]/30 border-t-[#E5C07B] rounded-full animate-spin mr-2" />
                      Finding comfort...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Find Scripture
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Response Display */}
          <ResponseDisplay data={response} isLoading={isLoading} topic={currentTopic} />



          {!response && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 text-center"
            >
              <p className="font-display text-lg md:text-xl text-[#4A0404]/70 italic">
                "Come to me, all you who are weary and burdened, and I will give you rest."
              </p>
              <p className="mt-2 text-sm text-[#A0A0A0] font-serif">— Matthew 11:28</p>
            </motion.div>
          )}

          {/* Ministry copyright */}
          <div className="mt-16 text-center">
            <p className="font-serif text-xs text-[#E5C07B]">© 2026 Kingdom Mandate Ministry | Built by the Grace of God, for the Glory of God</p>
          </div>
        </div>
      </div>
    </div>
  );
}