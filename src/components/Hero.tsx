import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { data, language } = usePortfolio();
  const { profile } = data;
  const isBn = language === 'bn';

  // Primary image url directly from user's postimg link
  const fallbackPhotoUrl = '/assets/profile_new.png';
  const initialPhotoUrl =
    profile.avatarUrl || 'https://i.postimg.cc/Qt7H1VzC/Chat-GPT-Image-Sep-22-2026-01-02-05-PM.png';
  const [photoSrc, setPhotoSrc] = useState(initialPhotoUrl);

  useEffect(() => {
    if (profile.avatarUrl) {
      setPhotoSrc(profile.avatarUrl);
    }
  }, [profile.avatarUrl]);

  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 md:pt-36 md:pb-20 flex items-center overflow-hidden">
      {/* Ambient background glows - Studio Navy & Cool Cyan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] md:w-[750px] h-[350px] bg-gradient-to-tr from-sky-500/10 via-blue-600/10 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-10 w-80 h-80 bg-blue-600/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Clean, Professional Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Main Big Name with Minimal, High-End Color on ONE SINGLE LINE */}
            <div className="space-y-3">
              <h1 className="font-headline font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-none whitespace-nowrap overflow-visible">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300 dark:from-white dark:via-slate-100 dark:to-slate-300 drop-shadow-sm uppercase inline-block font-black hero-main-name">
                  {isBn ? 'এমডি শরীফুল ইসলাম' : 'MD SHORIFUL ISLAM'}
                </span>
              </h1>

              {/* Minimal Professional Role Title */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5 flex-wrap">
                <span className="font-headline font-bold text-base sm:text-xl lg:text-2xl text-slate-300 uppercase tracking-wide">
                  {isBn ? 'প্রফেশনাল' : 'Professional'}
                </span>
                <span className="font-headline font-bold text-base sm:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-300 uppercase tracking-wide">
                  {isBn ? 'ভিডিও এডিটর ও গ্রাফিক ডিজাইনার' : 'Video Editor & Graphic Designer'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Solid Clean Photo with Professional 4-Side Symmetrical Shapes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              {/* Subtle ambient backlight behind the frame */}
              <div className="absolute inset-4 bg-gradient-to-tr from-sky-500/15 via-blue-600/15 to-cyan-400/10 blur-2xl rounded-3xl -z-10 pointer-events-none" />

              {/* 4-Side Outer Boundary Guide */}
              <div className="absolute -inset-3.5 sm:-inset-4 rounded-[26px] border border-slate-700/50 pointer-events-none -z-10" />

              {/* Left & Right Subtle Studio Accent Shapes */}
              <div className="absolute -left-3.5 sm:-left-4 top-1/2 -translate-y-1/2 w-1.5 h-16 rounded-full bg-gradient-to-b from-sky-400 to-blue-500/50 shadow-sm pointer-events-none" />
              <div className="absolute -right-3.5 sm:-right-4 top-1/2 -translate-y-1/2 w-1.5 h-16 rounded-full bg-gradient-to-b from-sky-400 to-blue-500/50 shadow-sm pointer-events-none" />

              {/* Top & Bottom Subtle Center Accent Shapes */}
              <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-full bg-gradient-to-r from-sky-400 to-blue-500/50 shadow-sm pointer-events-none" />
              <div className="absolute -bottom-3.5 sm:-bottom-4 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-full bg-gradient-to-r from-sky-400 to-blue-500/50 shadow-sm pointer-events-none" />

              {/* 4 Symmetrical Corner Brackets (Cinema / Studio Frame Guide) */}
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-sky-400/70 rounded-tl-lg pointer-events-none" />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 border-sky-400/70 rounded-tr-lg pointer-events-none" />
              <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 border-sky-400/70 rounded-bl-lg pointer-events-none" />
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-sky-400/70 rounded-br-lg pointer-events-none" />

              {/* Main Studio Frame Housing the Photo */}
              <div className="relative p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-slate-800/90 via-slate-900/95 to-slate-950 border border-slate-700/80 shadow-2xl backdrop-blur-md">
                {/* Solid Centered Photo Container */}
                <div className="relative rounded-xl overflow-hidden shadow-inner bg-[#091b36] aspect-square">
                  <img
                    src={photoSrc}
                    onError={() => setPhotoSrc(fallbackPhotoUrl)}
                    alt="Shoriful Islam - Video Editor & Visual Designer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
