import React from 'react';
import { motion } from 'framer-motion';

const emotions = [
  { label: 'Peace', emoji: '🕊️' },
  { label: 'Anxiety', emoji: '😟' },
  { label: 'Stress', emoji: '😩' },
  { label: 'Grief', emoji: '💔' },
  { label: 'Gratitude', emoji: '🙏' },
  { label: 'Lonely', emoji: '🥺' },
  { label: 'Hopeful', emoji: '✨' },
  { label: 'Angry', emoji: '😤' },
  { label: 'Confused', emoji: '🤔' },
  { label: 'Joyful', emoji: '😊' },
];

export default function EmotionSelector({ onSelect, selectedEmotion }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {emotions.map((emotion, index) => (
        <motion.button
          key={emotion.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          onClick={() => onSelect(emotion.label)}
          className={`
            px-4 py-2 rounded-full border transition-all duration-300
            font-serif text-sm md:text-base
            ${selectedEmotion === emotion.label
              ? 'border-[#4A0404] bg-[#4A0404] text-[#E5C07B] shadow-md'
              : 'border-[#D4CFC0] bg-white text-[#3C3C3C] hover:border-[#4A0404]/50 hover:shadow-sm'
            }
          `}
        >
          <span className="mr-1.5">{emotion.emoji}</span>
          {emotion.label}
        </motion.button>
      ))}
    </div>
  );
}