import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { TOPIC_CONTENT } from './topicContent';

const API_KEY = 'nWBoXJdS48fQxR6SIuBLp';
const BASE_URL = 'https://rest.api.bible/v1';
const KJV_ID = 'de4e12af7f28f599-01'; // verified authorised KJV ID

const LS_PREFIX = 'bc_topic_';

function getTopicCache(name) {
  try {
    const raw = localStorage.getItem(`${LS_PREFIX}${name}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setTopicCache(name, value) {
  try { localStorage.setItem(`${LS_PREFIX}${name}`, JSON.stringify(value)); } catch {}
}

export default function TopicDetail({ topic, onBack }) {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    load();
  }, [topic.name]);

  const load = async () => {
    // Use pre-written content if available
    if (TOPIC_CONTENT[topic.name]) {
      setContent(TOPIC_CONTENT[topic.name]);
      setIsLoading(false);
      setError(false);
      return;
    }
    // Check localStorage cache
    const cached = getTopicCache(topic.name);
    if (cached) {
      setContent(cached);
      setIsLoading(false);
      setError(false);
      return;
    }
    setIsLoading(true);
    setContent(null);
    setError(false);

    const res = await fetch(
      `${BASE_URL}/bibles/${KJV_ID}/search?query=${encodeURIComponent(topic.name)}&limit=10&sort=relevance`,
      { headers: { 'api-key': API_KEY } }
    );

    if (!res.ok) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const json = await res.json();
    const rawVerses = json.data?.verses || [];

    if (!rawVerses.length) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const verses = rawVerses.slice(0, 10).map(v => ({
      reference: v.reference,
      text: (v.content || v.text || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    }));

    const result = {
      introduction: `The theme of ${topic.name} runs throughout the Bible, from the Old Testament to the New. Below you will find ten scriptures that speak directly to this theme. Let these words minister to your heart and draw you closer to God's truth.`,
      verses,
      reflection: `As you meditate on these scriptures, ask the Holy Spirit to bring them alive in your daily life. God's Word is living and active — and His promises concerning ${topic.name} are for you today.`
    };

    setTopicCache(topic.name, result);
    setContent(result);
    setIsLoading(false);
  };

  const Icon = topic.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sage mb-6 font-serif text-sm hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        All Topics
      </button>

      {/* Hero */}
      <div className={`rounded-2xl p-8 mb-8 ${topic.heroBg} border ${topic.heroBorder} text-center`}>
        <div className={`w-16 h-16 rounded-full ${topic.iconBg} flex items-center justify-center mx-auto mb-4`}>
          <Icon className={`w-8 h-8 ${topic.iconColor}`} />
        </div>
        <h3 className="font-display text-3xl text-warm-brown mb-2">{topic.name}</h3>
        <p className="font-serif text-[#6B6B6B] text-sm">{topic.tagline}</p>
      </div>

      {isLoading ? (
        <div className="bg-white/50 rounded-2xl p-6 border border-[#E5C07B]/30">
          <div className="space-y-3">
            {[100, 85, 72, 90, 65, 88, 78, 95, 60, 82].map((w, i) => (
              <div
                key={i}
                className="h-4 rounded-full shimmer-bar"
                style={{ width: `${w}%`, animationDelay: `${i * 0.07}s` }}
              />
            ))}
          </div>
          <p className="text-center text-[#B8935A] text-xs italic font-serif mt-5">
            Gathering Scripture on {topic.name}…
          </p>
        </div>
      ) : error ? (
        <div className="bg-[#4A0404]/5 rounded-2xl p-8 border border-[#4A0404]/20 text-center">
          <p className="font-serif text-[#4A0404] text-base leading-relaxed mb-4">
            Connecting to the Sanctuary... please check your connection.
          </p>
          <button
            onClick={load}
            className="flex items-center gap-2 text-[#E5C07B] font-serif text-sm mx-auto hover:underline"
          >
            <RefreshCw className="w-4 h-4" /> Try again
          </button>
        </div>
      ) : content && (
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-white/60 rounded-2xl p-6 border border-[#E8E3D3]">
            <p className="font-serif text-[#3D3D3D] leading-relaxed whitespace-pre-line">
              {content.introduction}
            </p>
          </div>

          {/* 10 Verses */}
          <div className="bg-white/60 rounded-2xl p-6 border border-[#E8E3D3]">
            <h4 className="font-display text-lg text-warm-brown mb-5">
              10 Scriptures on {topic.name}
            </h4>
            <div className="space-y-5">
              {content.verses?.map((verse, i) => (
                <div key={i} className="flex gap-4">
                  <span className={`shrink-0 w-7 h-7 rounded-full ${topic.iconBg} ${topic.iconColor} flex items-center justify-center text-xs font-bold font-serif`}>
                    {i + 1}
                  </span>
                  <div className="pl-2 border-l-2 border-sage/25 flex-1">
                    <p className="font-serif text-[#3D3D3D] leading-relaxed italic">"{verse.text}"</p>
                    <p className="mt-1 text-sage text-sm font-medium">— {verse.reference}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reflection */}
          <div className={`rounded-2xl p-6 border ${topic.heroBorder} ${topic.heroBg}`}>
            <h4 className="font-display text-lg text-warm-brown mb-4">Living It Out</h4>
            <p className="font-serif text-[#3D3D3D] leading-relaxed whitespace-pre-line">
              {content.reflection}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}