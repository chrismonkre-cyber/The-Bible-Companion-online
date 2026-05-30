import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, MessageSquare, Share2, CheckCircle, Feather } from 'lucide-react';
import LogoSeal from '@/components/LogoSeal';

const SHARE_TEXT = "I'm using The Bible Companion by @KingdomMandateMinistry. Fast, ad-free, and built for the Glory of God. Join me at: https://thebiblecompanion.online | Follow on YouTube: https://www.youtube.com/@KingdomMandateMinistry";
const SHARE_URL = "https://thebiblecompanion.online";

export default function Share() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(SHARE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendText = () => {
    window.open(`sms:?body=${encodeURIComponent(SHARE_TEXT)}`, '_self');
  };

  const handleShareVia = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'The Bible Companion', text: SHARE_TEXT, url: SHARE_URL });
    } else {
      await navigator.clipboard.writeText(SHARE_TEXT);
      alert('Message copied to clipboard!');
    }
  };

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
              Share the Light
            </h2>
            <p className="font-serif text-[#B8935A] text-base md:text-lg max-w-xl mx-auto">
              Share The Bible Companion with someone who needs God's Word today.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#F9F7F2] px-4 py-10 md:py-14">
        <div className="max-w-2xl mx-auto">

          {/* Main Share Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="-mt-10 bg-[#4A0404] rounded-3xl p-8 md:p-12 border border-[#E5C07B]/40 shadow-xl mb-10"
          >
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full border border-[#E5C07B]/50 flex items-center justify-center">
                <Feather className="w-5 h-5 text-[#E5C07B]" />
              </div>
            </div>

            <div className="bg-[#3A0303] rounded-2xl p-5 mb-8 border border-[#E5C07B]/20">
              <p className="font-serif text-[#E5C07B] text-sm md:text-base leading-relaxed text-center">
                "{SHARE_TEXT}"
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border-2 border-[#E5C07B] text-[#E5C07B] font-serif font-semibold text-base hover:bg-[#E5C07B]/10 transition-all duration-300"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </button>

              <button
                onClick={handleSendText}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border-2 border-[#E5C07B] text-[#E5C07B] font-serif font-semibold text-base hover:bg-[#E5C07B]/10 transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5" />
                Send Text
              </button>

              <button
                onClick={handleShareVia}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#E5C07B] text-[#4A0404] font-serif font-bold text-base hover:bg-[#C9A55A] transition-all duration-300 shadow-md"
              >
                <Share2 className="w-5 h-5" />
                Share via...
              </button>
            </div>
          </motion.div>

          {/* Install Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 border border-[#E5C07B]/40 shadow-sm mb-10"
          >
            <h3 className="font-display text-xl text-[#4A0404] text-center mb-2">Install to Your Home Screen</h3>
            <p className="font-serif text-[#6B6B6B] text-sm text-center mb-6">Access the app instantly — no App Store needed.</p>
            <ol className="space-y-5">
              {[
                { step: '1', text: 'Tap the Menu or Share arrow in your browser.' },
                { step: '2', text: 'Select "Add to Home Screen" or "Install App".' },
                { step: '3', text: 'Open the Gold Seal from your home screen and enjoy!' },
              ].map(({ step, text }) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#4A0404] text-[#E5C07B] font-bold font-display flex items-center justify-center shrink-0 text-sm">{step}</span>
                  <p className="font-serif text-[#3C3C3C] text-sm leading-relaxed pt-1">{text}</p>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Kingdom Resources */}
          <motion.div
            id="kingdom-resources"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-3xl p-8 border border-[#E5C07B]/40 shadow-sm mb-10"
          >
            <h3 className="font-display text-xl text-[#4A0404] text-center mb-2">More Free Kingdom Resources</h3>
            <p className="font-serif text-[#6B6B6B] text-sm text-center mb-6">More free tools from Kingdom Mandate Ministry — built for the Body of Christ.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Main Ministry Site', url: 'https://kingdommandateministry.com' },
                { label: 'The Bible Companion', url: 'https://thebiblecompanion.online' },
                { label: 'Kingdom Prayer Wall', url: 'https://prayer.kingdommandateministry.com' },
                { label: 'Kingdom Fire Companion', url: 'https://fire.kingdommandateministry.com' },
                { label: 'Kingdom Pathway', url: 'https://pathway.kingdommandateministry.com' },
                { label: 'Kingdom Declarations', url: 'https://declarations.kingdommandateministry.com' },
                { label: 'Kingdom Healing Room', url: 'https://healing.kingdommandateministry.com' },
                { label: 'Kingdom Purpose Finder', url: 'https://purpose.kingdommandateministry.com' },
                { label: 'Kingdom Identity', url: 'https://identity.kingdommandateministry.com' },
                { label: 'Kingdom Gift Finder', url: 'https://gifts.kingdommandateministry.com' },
                { label: 'Kingdom Battle Plan', url: 'https://battle.kingdommandateministry.com' },
                { label: 'Kingdom Grace Vault', url: 'https://grace.kingdommandateministry.com' },
                { label: 'Kingdom Revival Fire', url: 'https://revival.kingdommandateministry.com' },
                { label: 'Kingdom Family Altar', url: 'https://family.kingdommandateministry.com' },
                { label: 'Kingdom Marketplace', url: 'https://marketplace.kingdommandateministry.com' },
                { label: 'Kingdom Freedom', url: 'https://freedom.kingdommandateministry.com' },
                { label: 'YouTube Channel', url: 'https://www.youtube.com/@KingdomMandateMinistry' },
                { label: 'Contact Us', url: 'mailto:kingdommm.chris@gmail.com' },
              ].map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#E5C07B]/40 bg-[#F9F7F2] hover:bg-[#4A0404] hover:text-[#E5C07B] hover:border-[#4A0404] transition-all duration-200 group"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E5C07B] group-hover:bg-[#E5C07B] shrink-0" />
                  <span className="font-serif text-sm text-[#3C3C3C] group-hover:text-[#E5C07B] leading-snug">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Inspirational quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center mt-4 mb-16"
          >
            <p className="font-display text-lg md:text-xl text-[#4A0404]/70 italic">
              "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven."
            </p>
            <p className="mt-2 text-sm text-[#A0A0A0] font-serif">— Matthew 5:16</p>
          </motion.div>

          {/* Footer */}
          <div className="text-center">
            <p className="font-serif text-xs text-[#E5C07B]">© 2026 Kingdom Mandate Ministry | Built by the Grace of God, for the Glory of God</p>
          </div>

        </div>
      </div>
    </div>
  );
}