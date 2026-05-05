import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, BookOpen, Tag, Heart, LifeBuoy, Share2, Youtube, NotebookPen } from 'lucide-react';
import ImmediateHelpModal from './components/ImmediateHelpModal';
import NotesDrawer from './components/NotesDrawer';
import WelcomePopup from './components/WelcomePopup';
import DailyVersePopup from './components/DailyVersePopup';
import { syncScheduleWithSW, getStoredReminder, checkAndFireInAppFallback } from './utils/notificationScheduler';
import PrivacyModal from './components/PrivacyModal';
import LogoSeal from './components/LogoSeal';

const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a207975202b78c9fed1d29/bb84683c8_generated_image.png';

export default function Layout({ children, currentPageName }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    // Sync notification schedule with SW on every app open
    const reminder = getStoredReminder();
    if (reminder.enabled) {
      syncScheduleWithSW(reminder);
      checkAndFireInAppFallback();
    }
  }, []);

  useEffect(() => {
    // Title
    document.title = 'The Bible Companion';

    // Favicon
    document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/png';
    icon.href = LOGO_URL;
    document.head.appendChild(icon);

    // Apple Touch Icon
    document.querySelectorAll("link[rel='apple-touch-icon']").forEach(el => el.remove());
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = LOGO_URL;
    document.head.appendChild(appleIcon);

    // Apple PWA meta tags
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name='${name}']`);
      if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta('theme-color', '#4A0404');
    setMeta('apple-mobile-web-app-capable', 'yes');
    setMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
    setMeta('apple-mobile-web-app-title', 'Companion');
    setMeta('description', 'A lightning-fast sanctuary for your soul — Bible verses, devotionals, and comfort for every emotion.');
    setMeta('og:title', 'The Bible Companion');
    setMeta('og:description', 'A lightning-fast sanctuary for your soul — Bible verses, devotionals, and comfort for every emotion.');
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', 'The Bible Companion');
    setMeta('twitter:description', 'A lightning-fast sanctuary for your soul.');
  }, []);

  const handleShare = async () => {
    const text = `I was just thinking of you and found this verse. I hope it brings you the same peace it gave me today: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." — Lamentations 3:22-23\n\nSent via TheBibleCompanion.online | Watch our daily prayer: https://www.youtube.com/@TheBibleCompanion`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'A verse for you', text });
      } else {
        await navigator.clipboard.writeText(text);
        alert('Link copied to clipboard!');
      }
    } catch (e) {}
  };

  const mobileNavItems = [
    { label: 'Help',   icon: LifeBuoy, page: 'ImmediateHelp', center: false },
    { label: 'Bible',  icon: BookOpen, page: 'Bible',          center: false },
    { label: 'Topics', icon: Tag,      page: 'Topics',         center: false },
    { label: 'Home',   icon: Home,     page: 'Home',           center: true  },
    { label: 'Daily',  icon: Heart,    page: 'Devotionals',    center: false },
    { label: 'Watch',  icon: Youtube,  page: 'Media',          center: false },
    { label: 'Share',  icon: Share2,        page: 'Share',   center: false },
    { label: 'Notes',  icon: NotebookPen,   page: 'Notes',   center: false },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col">

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 py-4 px-6 bg-[#4A0404] shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <Link to={createPageUrl('Home')} className="flex items-center gap-3">
            <LogoSeal size={52} />
            <h1 className="font-display text-xl md:text-2xl text-[#E5C07B] tracking-wide">
              The Bible Companion
            </h1>
          </Link>
        </div>
      </header>

      {/* ── Desktop Sub-Nav (sticky, just below header) ── */}
      <nav className="hidden md:block sticky top-[73px] z-40 bg-[#4A0404]/95 backdrop-blur-sm border-b border-[#E5C07B]/30">
        <div className="max-w-4xl mx-auto flex justify-center items-center gap-2 py-3">
          {[
            { label: 'Immediate Help', icon: LifeBuoy, page: 'ImmediateHelp', center: false },
            { label: 'Bible',          icon: BookOpen, page: 'Bible',          center: false },
            { label: 'Topics',         icon: Tag,      page: 'Topics',         center: false },
            { label: 'Home',           icon: Home,     page: 'Home',           center: true  },
            { label: 'Devotionals',    icon: Heart,    page: 'Devotionals',    center: false },
            { label: 'Media',          icon: Youtube,  page: 'Media',          center: false },
            { label: 'Share App',      icon: Share2,       page: 'Share', center: false },
            { label: 'My Notes',         icon: NotebookPen,  page: 'Notes', center: false },
          ].map((item) => {
            const isActive = currentPageName === item.page;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={createPageUrl(item.page)}
                className={`flex items-center gap-2 px-4 py-3 transition-all duration-300 border-b-2 text-sm font-medium font-serif ${
                  isActive
                    ? 'text-[#E5C07B] border-[#E5C07B] font-semibold'
                    : 'text-[#E5C07B]/70 border-transparent hover:text-[#E5C07B]'
                } ${item.center ? 'text-[#E5C07B]' : ''}`}
              >
                <Icon className={`${item.center ? 'w-5 h-5' : 'w-4 h-4'} ${isActive ? 'stroke-[2.5px]' : ''}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Main Content (flex-grow fills space between header and footer) ── */}
      <main className="flex-1 pb-24 md:pb-0">
        <div className="page-transition">
          {children}
        </div>
      </main>

      {/* ── Desktop Footer ── */}
      <footer className="hidden md:block text-center py-5 border-t border-[#E5C07B]/20 bg-[#4A0404]">
        <p className="font-serif text-sm text-[#E5C07B] font-medium">
          © 2026 Kingdom Mandate Ministry | Built by the Grace of God, for the Glory of God
        </p>
        <div className="mt-1 flex items-center justify-center gap-3">
          <button
            onClick={() => setPrivacyOpen(true)}
            className="font-serif text-xs text-[#E5C07B]/50 hover:text-[#E5C07B] underline underline-offset-2 transition-colors"
          >
            Privacy & Disclaimer
          </button>
          <span className="text-[#E5C07B]/30">·</span>
          <a
            href="https://www.youtube.com/@TheBibleCompanion"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-xs text-[#E5C07B]/50 hover:text-[#E5C07B] underline underline-offset-2 transition-colors"
          >
            Watch on YouTube
          </a>
        </div>
      </footer>

      {/* ── Mobile Bottom Nav (fixed, z-index above scroll content) ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#4A0404] border-t border-[#E5C07B]/30 md:hidden z-50">
        <div className="text-center pt-1 px-2">
          <p className="font-serif text-[9px] text-[#E5C07B] leading-tight">© 2026 Kingdom Mandate Ministry | Built by the Grace of God, for the Glory of God</p>
          <button
            onClick={() => setPrivacyOpen(true)}
            className="font-serif text-[9px] text-[#E5C07B]/50 hover:text-[#E5C07B] underline underline-offset-2 transition-colors"
          >
            Privacy & Disclaimer
          </button>
        </div>
        <div className="flex justify-around items-center py-1 px-1 safe-area-inset-bottom">
          {mobileNavItems.map((item) => {
            const isActive = currentPageName === item.page;
            const Icon = item.icon;
            if (item.center) {
              return (
                <Link
                  key={item.label}
                  to={createPageUrl(item.page)}
                  className={`flex flex-col items-center gap-1 px-2 py-1 transition-all duration-300 border-b-2 ${
                    isActive
                      ? 'text-[#E5C07B] border-[#E5C07B]'
                      : 'text-[#E5C07B]/80 border-transparent hover:text-[#E5C07B]'
                  }`}
                >
                  <Icon className={`w-7 h-7 text-[#E5C07B] ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                  <span className="text-xs font-bold text-[#E5C07B]">{item.label}</span>
                </Link>
              );
            }
            return (
              <Link
                key={item.label}
                to={createPageUrl(item.page)}
                className={`flex flex-col items-center gap-1 px-1 py-2 transition-all duration-300 border-b-2 ${
                  isActive
                    ? 'text-[#E5C07B] border-[#E5C07B]'
                    : 'text-[#E5C07B]/60 border-transparent hover:text-[#E5C07B]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <WelcomePopup />
      <DailyVersePopup />
      <ImmediateHelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />

    </div>
  );
}