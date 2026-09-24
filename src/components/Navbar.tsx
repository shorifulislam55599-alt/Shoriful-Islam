import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sliders, Send, Menu, X, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    data,
    language,
    setLanguage,
    theme,
    toggleTheme,
    setIsCustomizerOpen,
  } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profile = data.profile;
  const isBn = language === 'bn';

  const navLinks = [
    { name: isBn ? 'হোম' : 'Home', href: '#hero' },
    { name: isBn ? 'কাজের ভিডিও ও প্রজেক্ট' : 'Work & Videos', href: '#work' },
    { name: isBn ? 'স্কিলস' : 'Skills', href: '#skills' },
    { name: isBn ? 'সার্ভিসেস' : 'Services', href: '#services' },
    { name: isBn ? 'অ্যাবাউট মি' : 'About Me', href: '#about' },
    { name: isBn ? 'কন্টাক্ট' : 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo / Name */}
          <a
            id="brand-logo-link"
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-600 p-[2px] shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="MD SHORIFUL ISLAM"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top rounded-[10px]"
                />
              ) : (
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center font-black text-slate-100 tracking-wider text-xs">
                  MSI
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="font-headline font-black text-sm sm:text-base text-slate-100 tracking-wider uppercase group-hover:text-sky-300 transition-colors flex items-center gap-1.5 whitespace-nowrap">
                <span className="truncate">{isBn ? 'এমডি শরীফুল ইসলাম' : 'MD SHORIFUL ISLAM'}</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Available for work" />
              </div>
              <p className="text-[10px] sm:text-[11px] text-sky-400 font-mono tracking-widest uppercase font-semibold hidden sm:block truncate">
                {isBn ? 'ভিডিও এডিটর ও গ্রাফিক ডিজাইনার' : 'VIDEO EDITOR & GRAPHIC DESIGNER'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action buttons & controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Dark / Light Mode Toggle Button */}
            <button
              id="nav-theme-toggle-btn"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700 hover:text-sky-400 hover:border-sky-500/40 transition-all text-xs font-semibold shadow-sm"
              title={theme === 'dark' ? (isBn ? 'লাইট মোড অন করুন' : 'Switch to Light Mode') : (isBn ? 'ডার্ক মোড অন করুন' : 'Switch to Dark Mode')}
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden xl:inline">{isBn ? 'লাইট মোড' : 'Light'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden xl:inline">{isBn ? 'ডার্ক মোড' : 'Dark'}</span>
                </>
              )}
            </button>

            {/* Customizer / Quick Edit trigger */}
            <button
              id="nav-customizer-trigger"
              onClick={() => setIsCustomizerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:text-sky-400 hover:border-sky-500/40 transition-all"
              title={isBn ? 'পোর্টফোলিও কাস্টমাইজ করুন' : 'Customize Portfolio'}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isBn ? 'কাস্টমাইজ করুন' : 'Edit'}</span>
            </button>

            {/* Language switch */}
            <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/60 text-xs">
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-1 rounded font-medium transition-all ${
                  isBn ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                বাং
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded font-medium transition-all ${
                  !isBn ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Hire Me CTA */}
            <a
              id="nav-hire-me-btn"
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isBn ? 'হায়ার করুন' : 'Hire Me'}</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-sky-400 border border-slate-700"
              title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-400" />
              )}
            </button>

            <button
              onClick={() => setLanguage(isBn ? 'en' : 'bn')}
              className="p-2 rounded-lg bg-slate-800/80 text-sky-400 text-xs font-bold border border-slate-700"
            >
              {isBn ? 'EN' : 'বাং'}
            </button>

            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="p-2 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/30"
              title="Edit"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-3 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-sky-400 font-medium text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Theme Toggle & Contact */}
          <button
            onClick={() => {
              toggleTheme();
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>{isBn ? 'লাইট মোডে পরিবর্তন করুন' : 'Switch to Light Mode'}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-sky-400" />
                <span>{isBn ? 'ডার্ক মোডে পরিবর্তন করুন' : 'Switch to Dark Mode'}</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>{isBn ? 'কাজের প্রস্তাব পাঠান' : 'Send Work Inquiry'}</span>
          </a>
        </div>
      )}
    </header>
  );
};
