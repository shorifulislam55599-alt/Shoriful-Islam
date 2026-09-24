import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Film, Palette, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const SkillsSection: React.FC = () => {
  const { language } = usePortfolio();
  const isBn = language === 'bn';

  const coreSkills = [
    {
      id: 'skill-video',
      title: isBn ? 'প্রফেশনাল ভিডিও এডিটিং' : 'Professional Video Editing',
      subtitle: isBn ? 'হাই-রিটেনশন কাটস ও ডায়নামিক পেসিং' : 'High-Retention Cuts & Dynamic Pacing',
      icon: <Film className="w-6 h-6 text-sky-400" />,
      tools: ['Premiere Pro', 'DaVinci Resolve', 'CapCut Pro'],
      highlights: isBn
        ? ['বোরিং পজ দূরীকরণ ও দ্রুত জাম্প-কাট', 'অ্যানিমেটেড সাবটাইটেল ও মোশন টেক্সট', 'লেয়ার্ড সাউন্ড ডিজাইন ও সিনেমাটিক কালার গ্রেড']
        : ['Dead-air trimming & dynamic zooms', 'Animated kinetic captions & subtitles', 'Audio SFX sync & cinematic color grading'],
      accentBorder: 'border-sky-500/30 hover:border-sky-400/80',
      glow: 'hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]',
    },
    {
      id: 'skill-design',
      title: isBn ? 'গ্রাফিক ডিজাইন ও ভিজ্যুয়াল আর্ট' : 'Graphic Design & Visual Arts',
      subtitle: isBn ? 'হাই-সিটিআর থাম্বনেইল ও ব্র্যান্ডিং' : 'High-CTR Thumbnails & Social Visuals',
      icon: <Palette className="w-6 h-6 text-cyan-400" />,
      tools: ['Photoshop', 'Illustrator', 'Canva Pro'],
      highlights: isBn
        ? ['ইউটিউব হাই-ক্লিক থাম্বনেইল ক্রিয়েশন', 'সোশ্যাল মিডিয়া ব্যানার ও পোস্ট ডিজাইন', 'ক্লিন ব্র্যান্ড আইডেন্টিটি ও ভেক্টর গ্রাফিক্স']
        : ['High-CTR YouTube thumbnail crafting', 'Social media ad banners & posters', 'Clean brand identity & typography'],
      accentBorder: 'border-cyan-500/30 hover:border-cyan-400/80',
      glow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]',
    },
    {
      id: 'skill-meta',
      title: isBn ? 'মেটা মার্কেটিং ও অ্যাড স্ট্র্যাটেজি' : 'Meta Marketing & Ad Creatives',
      subtitle: isBn ? 'কনভার্সন-ফোকাসড ফেসবুক ও ইনস্টাগ্রাম অ্যাড' : 'Conversion-Driven Video & Graphic Ads',
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      tools: ['Meta Ads Manager', 'Creative Strategy', 'A/B Testing'],
      highlights: isBn
        ? ['প্রথম ৩-সেকেন্ডের স্ক্রল-স্টপিং হুক', 'ই-কমার্স ও প্রোডাক্ট সেলস অ্যাড ক্রিয়েটিভ', 'ডাটা অ্যানালাইসিস ও ক্রিয়েটিভ অপটিমাইজেশন']
        : ['0-3 second scroll-stopping hooks', 'E-commerce & direct response ad creatives', 'Creative fatigue refresh & A/B testing'],
      accentBorder: 'border-blue-500/30 hover:border-blue-400/80',
      glow: 'hover:shadow-[0_0_25px_rgba(96,165,250,0.15)]',
    },
    {
      id: 'skill-ai',
      title: isBn ? 'এআই টুলস ও স্মার্ট ওয়ার্কফ্লো' : 'AI Tools & Smart Generation',
      subtitle: isBn ? 'জেনারেটিভ আর্ট ও স্পিড প্রোডাকশন' : 'Generative Visuals & Fast Production',
      icon: <Sparkles className="w-6 h-6 text-teal-400" />,
      tools: ['Midjourney', 'ChatGPT Prompting', 'Topaz AI'],
      highlights: isBn
        ? ['অত্যাধুনিক ব্যাকগ্রাউন্ড আর্ট তৈরি', 'ভিডিও ফ্রেম আপস্কেলিং ও নয়েজ রিমুভাল', 'দ্রুত স্ক্রিপ্টিং ও আইডিয়া জেনারেশন']
        : ['Generative visual concepts & backdrops', 'Video/image AI upscaling & enhancement', 'Prompt-driven ideation & script drafting'],
      accentBorder: 'border-teal-500/30 hover:border-teal-400/80',
      glow: 'hover:shadow-[0_0_25px_rgba(45,212,191,0.15)]',
    },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 bg-[#080d1a] relative overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
            <span>{isBn ? 'দক্ষতা ও মূল পারদর্শিতা' : 'Core Capabilities'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-slate-100 tracking-tight">
            {isBn ? (
              <>
                প্রফেশনাল স্কিলস ও{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                  টুলকিট
                </span>
              </>
            ) : (
              <>
                Core Skills &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                  Toolkit
                </span>
              </>
            )}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {isBn
              ? 'অতিরিক্ত অপ্রয়োজনীয় বিষয় বাদ দিয়ে শুধুমাত্র প্রফেশনাল ও কার্যকারী মূল স্কিলগুলো।'
              : 'Focused, high-impact capabilities crafted for maximum content retention and business growth.'}
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreSkills.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`p-6 sm:p-7 rounded-2xl bg-slate-900/60 border ${item.accentBorder} ${item.glow} transition-all duration-300 backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  {item.icon}
                </div>
                {/* Tools inline */}
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {item.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-950/70 border border-slate-800 text-[11px] font-medium text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-headline font-bold text-slate-100 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-sky-400/90 font-medium mb-4">
                {item.subtitle}
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-800/80">
                {item.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
