import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Star, Quote, Award } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { data, language } = usePortfolio();
  const { testimonials } = data;
  const isBn = language === 'bn';

  return (
    <section id="testimonials" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{isBn ? 'ক্লায়েন্ট রিভিউ ও ফিডব্যাক' : 'Client Endorsements'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-100 tracking-tight">
            {isBn ? 'ক্লায়েন্টরা আমার কাজ সম্পর্কে যা বলছেন' : 'Words from Clients & Creators'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            {isBn
              ? 'আন্তর্জাতিক ও দেশীয় ক্লায়েন্টদের সাথে সফল কাজের প্রমাণ এবং তাদের বাস্তব অনুভূতি।'
              : 'Real outcomes and relationships built with YouTube creators, marketing agencies, and global brands.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c101d] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {t.projectTag}
                  </span>
                </div>

                {/* Quote content */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-6">
                  &ldquo;{isBn ? t.contentBn : t.content}&rdquo;
                </p>
              </div>

              {/* Client avatar & info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
