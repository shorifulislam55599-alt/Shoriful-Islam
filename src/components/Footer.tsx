import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Heart, Film, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, language, setIsGuideOpen, setIsCustomizerOpen } = usePortfolio();
  const { profile } = data;
  const isBn = language === 'bn';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-600 p-[2px]">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center font-bold text-slate-100 text-xs">
                MSI
              </div>
            </div>
            <div>
              <div className="font-headline font-black text-slate-200 uppercase tracking-wider text-sm sm:text-base">
                {isBn ? 'এমডি শরীফুল ইসলাম' : 'MD SHORIFUL ISLAM'}
              </div>
              <p className="text-xs text-slate-400">
                {isBn ? 'গ্রাফিক ডিজাইনার ও প্রফেশনাল ভিডিও এডিটর' : 'Graphic Designer & Video Editor'}
              </p>
            </div>
          </div>

          {/* Quick utility links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-sky-400 transition-colors"
            >
              {isBn ? 'সেটআপ ডিরেকশন' : 'Setup Guidelines'}
            </button>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="hover:text-sky-400 transition-colors"
            >
              {isBn ? 'কাস্টমাইজেশন প্যানেল' : 'Customizer Mode'}
            </button>
            <a href="#work" className="hover:text-sky-400 transition-colors">
              {isBn ? 'প্রজেক্ট পোর্টফোলিও' : 'Portfolio'}
            </a>
            <a href="#contact" className="hover:text-sky-400 transition-colors">
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-sky-400 flex items-center justify-center border border-slate-800 transition-all hover:scale-105"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Crafted for high visual impact & narrative storytelling</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
