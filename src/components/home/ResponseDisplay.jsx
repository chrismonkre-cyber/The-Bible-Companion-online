import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Sparkles } from 'lucide-react';

export default function ResponseDisplay({ data, isLoading, topic }) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mt-12 flex flex-col items-center gap-6"
      >
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 rounded-full border-4 border-[#4A0404]/20" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-[#4A0404] border-r-[#E5C07B]/50 animate-spin" />
        </div>
        <div className="text-center">
          <p className="font-display text-xl text-[#4A0404] italic">Peace be with you...</p>
          <p className="mt-2 text-[#6B6B6B] text-sm font-serif">
            Searching Scripture for comfort{topic ? <> in <span className="text-[#4A0404] font-semibold">{topic}</span></> : ''}...
          </p>
        </div>
      </motion.div>
    );
  }

  if (!data) return null;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto mt-8 space-y-6"
    >
      {/* Bible Verses */}
      <motion.div
        variants={item}
        className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5C07B]/40 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#4A0404]/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#4A0404]" />
          </div>
          <h3 className="font-display text-lg text-[#4A0404]">Scripture for You</h3>
        </div>
        <div className="space-y-5">
          {data.verses?.map((verse, index) => (
            <div key={index} className="pl-4 border-l-2 border-[#E5C07B]">
              <p className="font-serif text-[#3C3C3C] leading-relaxed italic">
                "{verse.text}"
              </p>
              <p className="mt-2 text-[#4A0404] text-sm font-semibold font-serif">
                — {verse.reference}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Devotional Reflection */}
      <motion.div
        variants={item}
        className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5C07B]/40 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#4A0404]/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-[#4A0404]" />
          </div>
          <h3 className="font-display text-lg text-[#4A0404]">A Gentle Reflection</h3>
        </div>
        <p className="font-serif text-[#3C3C3C] leading-loose whitespace-pre-line">
          {data.reflection}
        </p>
      </motion.div>

      {/* Encouragement */}
      <motion.div
        variants={item}
        className="bg-[#4A0404] rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#E5C07B]/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#E5C07B]" />
          </div>
          <h3 className="font-display text-lg text-[#E5C07B]">Words of Encouragement</h3>
        </div>
        <p className="font-serif text-[#E5C07B]/90 leading-relaxed text-center text-lg italic">
          "{data.encouragement}"
        </p>
      </motion.div>
    </motion.div>
  );
}