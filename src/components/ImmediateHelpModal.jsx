import React from 'react';
import { X, Phone, MessageSquare, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const resources = [
  {
    icon: Phone,
    name: '988 Suicide & Crisis Lifeline',
    detail: 'Call or text 988',
    sub: 'USA & Canada · Available 24/7',
  },
  {
    icon: MessageSquare,
    name: 'Crisis Text Line',
    detail: 'Text HOME to 741741',
    sub: 'USA · Free, confidential, 24/7',
  },
  {
    icon: Heart,
    name: '700 Club Prayer Line',
    detail: '1-800-759-0700',
    sub: 'Available 24/7 · Prayer & support',
  },
];

export default function ImmediateHelpModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm bg-[#F9F7F2] rounded-2xl border border-[#E5C07B]/40 shadow-lg z-[101] p-6"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#8B8B8B] hover:text-[#4A0404] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display text-xl text-[#4A0404] mb-1">Immediate Help</h3>
            <p className="font-serif text-sm text-[#6B6B6B] mb-5">
              You are not alone. Reach out — someone cares.
            </p>

            <div className="space-y-3">
              {resources.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.name} className="flex items-start gap-3 p-4 rounded-xl bg-[#4A0404]/5 border border-[#4A0404]/15">
                    <div className="mt-0.5 text-[#4A0404]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm text-[#3C3C3C] leading-snug">{r.name}</p>
                      <p className="font-serif text-base font-medium text-[#4A0404] mt-0.5">{r.detail}</p>
                      <p className="font-serif text-xs text-[#8B8B8B] mt-0.5">{r.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="font-serif text-xs text-center text-[#A0A0A0] mt-5">
              "He heals the brokenhearted and binds up their wounds." — Psalm 147:3
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}