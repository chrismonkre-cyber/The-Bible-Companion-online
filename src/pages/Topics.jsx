import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Sun, Users, Flame, Leaf, Star, Clock, BookOpen, Droplets } from 'lucide-react';
import TopicDetail from '@/components/topics/TopicDetail';

const topics = [
  { name: 'Peace',       icon: Leaf,     tagline: 'Stillness in the storm, rest for the weary soul' },
  { name: 'Healing',     icon: Droplets, tagline: 'Restoration of body, mind, and spirit' },
  { name: 'Strength',    icon: Shield,   tagline: 'Courage and power drawn from God alone' },
  { name: 'Love',        icon: Heart,    tagline: 'The greatest commandment, perfectly modeled' },
  { name: 'Faith',       icon: Flame,    tagline: 'Believing in what is unseen, trusting in what is promised' },
  { name: 'Hope',        icon: Sun,      tagline: 'An anchor for the soul, certain and steadfast' },
  { name: 'Forgiveness', icon: Star,     tagline: 'Freedom through releasing what you cannot hold' },
  { name: 'Wisdom',      icon: BookOpen, tagline: 'Divine insight for earthly decisions' },
  { name: 'Patience',    icon: Clock,    tagline: "The quiet trust that waits on God's timing" },
  { name: 'Family',      icon: Users,    tagline: "God's gift of belonging and covenant love" },
];

// Featured topics shown as large hero cards
const FEATURED = ['Peace', 'Healing', 'Strength'];

export default function Topics() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (selectedTopic) {
    return (
      <div className="bg-[#F9F7F2] px-4 py-8 md:py-16 md:pt-24 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <TopicDetail topic={selectedTopic} onBack={() => setSelectedTopic(null)} />
        </div>
      </div>
    );
  }

  const featuredTopics = topics.filter(t => FEATURED.includes(t.name));
  const otherTopics = topics.filter(t => !FEATURED.includes(t.name));

  return (
    <div className="bg-[#F9F7F2] min-h-screen px-4 py-8 md:py-16 md:pt-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-[#4A0404] mb-3">Explore by Topic</h2>
          <p className="font-serif text-[#6B6B6B]">Discover what Scripture says about life's most important themes</p>
        </motion.div>

        {/* Featured Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
          <p className="text-xs uppercase tracking-widest text-[#B8935A] font-serif mb-4">Featured Topics</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {featuredTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.button
                  key={topic.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  onClick={() => setSelectedTopic(topic)}
                  className="flex flex-col items-center gap-3 p-8 bg-white rounded-2xl border border-[#E5C07B]/40 hover:border-[#4A0404]/40 hover:shadow-md transition-all group text-center shadow-sm"
                >
                  <div className="w-14 h-14 rounded-full bg-[#4A0404] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-[#E5C07B]" />
                  </div>
                  <div>
                    <p className="font-display text-xl text-[#3C3C3C]">{topic.name}</p>
                    <p className="text-xs font-serif text-[#6B6B6B] mt-1 leading-snug">{topic.tagline}</p>
                  </div>
                  <span className="text-xs font-serif text-[#4A0404] border border-[#4A0404]/20 px-3 py-1 rounded-full">
                    10 verses + reflection →
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* All Other Topics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-xs uppercase tracking-widest text-[#B8935A] font-serif mb-4">More Topics</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.button
                  key={topic.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => setSelectedTopic(topic)}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E5C07B]/30 hover:border-[#4A0404]/40 hover:shadow-sm transition-all group text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-[#4A0404]/8 border border-[#4A0404]/15 flex items-center justify-center shrink-0 group-hover:bg-[#4A0404] group-hover:border-[#4A0404] transition-all">
                    <Icon className="w-5 h-5 text-[#4A0404] group-hover:text-[#E5C07B] transition-colors" />
                  </div>
                  <div>
                    <p className="font-display text-base text-[#3C3C3C]">{topic.name}</p>
                    <p className="text-xs text-[#8B8B8B] font-serif">10 verses</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-16 mb-4">
          <p className="font-serif text-xs text-[#B8935A]">© 2026 Kingdom Mandate Ministry | Built by the Grace of God, for the Glory of God</p>
        </div>
      </div>
    </div>
  );
}