import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Play } from 'lucide-react';
import LogoSeal from '@/components/LogoSeal';

export default function Media() {
  return (
    <div>
      {/* Cover */}
      <div className="bg-[#4A0404] px-4 pt-10 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex justify-center mb-6">
              <LogoSeal size={80} />
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-[#E5C07B] mb-4 leading-tight">
              Kingdom Media
            </h2>
            <p className="font-serif text-[#B8935A] text-base md:text-lg max-w-xl mx-auto">
              Video teachings, worship, and the Word — now live on YouTube.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#F9F7F2] px-4 py-10 md:py-14">
        <div className="max-w-2xl mx-auto">

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="-mt-10 bg-[#4A0404] rounded-3xl p-10 md:p-14 border border-[#E5C07B]/40 shadow-xl mb-10 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-[#E5C07B]/60 flex items-center justify-center">
                <Youtube className="w-8 h-8 text-[#E5C07B]" />
              </div>
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-[#E5C07B] mb-4">
              Kingdom Mandate Media
            </h3>

            <p className="font-serif text-[#B8935A] text-base md:text-lg leading-relaxed mb-8">
              Now live on YouTube. Watch teachings, worship, and the Word.
            </p>

            <div className="bg-[#3A0303] rounded-2xl p-5 border border-[#E5C07B]/20 mb-8">
              <p className="font-serif text-[#E5C07B] text-sm md:text-base leading-relaxed italic">
                "Built by the Grace of God."
              </p>
            </div>

            <a
              href="https://www.youtube.com/@KingdomMandateMinistry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#E5C07B] text-[#4A0404] font-serif font-bold text-base hover:bg-[#C9A55A] transition-all duration-300 shadow-md"
            >
              <Play className="w-5 h-5" />
              Watch on YouTube
            </a>
          </motion.div>

          {/* Inspirational quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center mt-4 mb-16"
          >
            <p className="font-display text-lg md:text-xl text-[#4A0404]/70 italic">
              "Let everything that has breath praise the Lord."
            </p>
            <p className="mt-2 text-sm text-[#A0A0A0] font-serif">— Psalm 150:6</p>
          </motion.div>

          {/* Footer */}
          <div className="text-center">
            <a
              href="https://www.youtube.com/@KingdomMandateMinistry"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-xs text-[#B8935A] hover:text-[#E5C07B] underline underline-offset-2 transition-colors"
            >
              Follow us @KingdomMandateMinistry on YouTube
            </a>
            <p className="font-serif text-xs text-[#B8935A] mt-1">© 2026 Kingdom Mandate Ministry | Built by the Grace of God, for the Glory of God</p>
          </div>
        </div>
      </div>
    </div>
  );
}