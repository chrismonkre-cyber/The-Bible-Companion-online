import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(93, 78, 55, 0.35)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            className="bg-[#F9F7F2] rounded-3xl shadow-2xl max-w-md w-full p-10 relative border border-[#E8E3D3]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#A0A0A0] hover:text-[#5D4E37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#8A9A5B]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#8A9A5B]" />
              </div>
              <h2 className="font-display text-xl text-[#5D4E37]">Privacy & Disclaimer</h2>
            </div>

            <div className="space-y-4 font-serif text-[#3D3D3D] leading-relaxed text-sm">
              <div className="pl-4 border-l-2 border-[#8A9A5B]/40">
                <p className="font-medium text-[#5D4E37] mb-1">Your Privacy</p>
                <p>Your feelings are private. We do not save your data or track your searches. Everything you share here stays between you and this moment.</p>
              </div>
              <div className="pl-4 border-l-2 border-[#C4A962]/40">
                <p className="font-medium text-[#5D4E37] mb-1">Scripture Disclaimer</p>
                <p>Scripture text is provided by AI and is intended for reflection and comfort. Please consult a physical Bible for verified accuracy.</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full bg-[#8A9A5B] hover:bg-[#6B7A45] text-[#F9F7F2] rounded-full py-3 font-serif text-sm transition-all duration-300"
            >
              I understand
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}