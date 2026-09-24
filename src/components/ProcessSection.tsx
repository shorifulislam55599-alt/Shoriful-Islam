import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MessageSquare, Lightbulb, Sliders, Volume2, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const { language } = usePortfolio();
  const isBn = language === 'bn';

  const steps = [
    {
      num: '01',
      title: 'Concept & Creative Brief',
      titleBn: 'আইডিয়া ও প্রজেক্ট ব্রিফিং',
      desc: 'Understanding target audience, platform requirements (16:9 vs 9:16), brand tone, and core messaging.',
      descBn: 'টার্গেট অডিয়েন্স, ভিডিও বা ডিজাইনের মূল বার্তা এবং প্ল্যাটফর্মের রিকোয়ারমেন্ট বুঝে নেওয়া।',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      num: '02',
      title: 'Storyboarding & Asset Prep',
      titleBn: 'স্টোরিবোর্ড ও ফুটেজ অর্গানাইজেশন',
      desc: 'Selecting top takes, organizing multi-camera timelines, sync checks, and drafting visual pacing blueprints.',
      descBn: 'সেরা ফুটেজ সিলেক্ট করা, টাইমলাইন অর্গানাইজ করা এবং গল্প বলার রূপরেখা তৈরি করা।',
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      num: '03',
      title: 'Editing & Motion Polish',
      titleBn: 'ডাইনামিক এডিটিং ও মোশন গ্রাফিক্স',
      desc: 'Cutting for viewer retention, pacing rhythm, motion graphics, kinetic titles, and eye-catching transitions.',
      descBn: 'দর্শক ধরে রাখার মতো দ্রুত ও আকর্ষণীয় কাট, মোশন গ্রাফিক্স এবং দৃষ্টিনন্দন টাইপোগ্রাফি যোগ করা।',
      icon: <Sliders className="w-5 h-5" />,
    },
    {
      num: '04',
      title: 'Color Grading & Sound Design',
      titleBn: 'কালার গ্রেডিং ও সাউন্ড ডিজাইন',
      desc: 'DaVinci Resolve Log-to-Rec709 color grade, skin-tone isolation, multi-layer SFX, and clean -14 LUFS audio balance.',
      descBn: 'ড্যাভিঞ্চি রিজলভে সিনেমাটিক কালার গ্রেড, সাউন্ড এফেক্টস লেয়ারিং ও ক্লিয়ার ভয়েস ব্যালেন্স।',
      icon: <Volume2 className="w-5 h-5" />,
    },
    {
      num: '05',
      title: 'Review & Final Delivery',
      titleBn: 'ফিডব্যাক রিভিশন ও ডেলিভারি',
      desc: 'Timestamped client review via Frame.io, fast revision turnarounds, and master 4K + vertical exports.',
      descBn: 'ক্লায়েন্টের ফিডব্যাক অনুযায়ী রিভিশন এবং ফুল কোয়ালিটি ৪কে ও মোবাইল ভার্সন ডেলিভারি।',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>{isBn ? 'কাজের ধারাবাহিক প্রক্রিয়া' : 'Production Workflow'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-100 tracking-tight">
            {isBn ? 'আইডিয়া থেকে মাস্টারপিস যেভাবে তৈরি হয়' : 'From Raw Concept to Final Master'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            {isBn
              ? 'একটি সুনির্দিষ্ট ও পেশাদার উৎপাদন পদ্ধতি যা প্রতিটি প্রজেক্টকে সময়মতো ও সর্বোচ্চ কোয়ালিটিতে সম্পন্ন করে।'
              : 'A battle-tested production pipeline ensuring on-time delivery and uncompromising visual standards.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#0b0f19] border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-bold text-2xl text-slate-700 group-hover:text-amber-500/80 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700 group-hover:border-amber-500/40 group-hover:scale-105 transition-all">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-slate-100 mb-2">
                  {isBn ? step.titleBn : step.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {isBn ? step.descBn : step.desc}
                </p>
              </div>

              {/* Progress arrow on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-700">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
