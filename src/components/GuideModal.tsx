import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, BookOpen, Film, Image as ImageIcon, Sparkles, CheckCircle2, ArrowRight, Code, Download, ExternalLink } from 'lucide-react';

export const GuideModal: React.FC = () => {
  const { isGuideOpen, setIsGuideOpen, language, setIsCustomizerOpen } = usePortfolio();
  const isBn = language === 'bn';

  if (!isGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-slate-100">
                {isBn ? 'পোর্টফোলিও সেটআপ ও কাস্টমাইজেশন গাইড' : 'Portfolio Setup & Customization Guide'}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'আপনার জন্য তৈরি ফান্ডামেন্টাল স্ট্রাকচার এবং সাজানোর পূর্ণাঙ্গ ডিরেকশন'
                  : 'Fundamental structure blueprint and practical directions for your portfolio'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsGuideOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 text-sm text-slate-300">
          {/* Welcome Message in Bengali */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-indigo-500/10 border border-amber-500/30">
            <h3 className="font-bold text-amber-300 text-base mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{isBn ? 'স্বাগতম শরীফুল ইসলাম!' : 'Welcome!'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {isBn
                ? 'আপনার গ্রাফিক ডিজাইন ও প্রফেশনাল ভিডিও এডিটিং ক্যারিয়ারের জন্য এই পোর্টফোলিওটি একটি আধুনিক এবং ক্লায়েন্ট-আকর্ষক ফাউন্ডেশন হিসেবে তৈরি করা হয়েছে। নিচে আপনার জন্য প্রাথমিক ডিরেকশন ও সহজ কাস্টমাইজেশন নিয়ম তুলে ধরা হলো:'
                : 'This portfolio has been built as a high-converting foundation for your Graphic Design & Professional Video Editing career. Here are key directions to customize it with your own work.'}
            </p>
          </div>

          {/* 4 Fundamental Directions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1: Live Customizer */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-mono">1</span>
                <span>{isBn ? 'সরাসরি এডিট ও কাস্টমাইজ করুন' : 'Live In-App Edit Mode'}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn
                  ? 'উপরে ডানে "কাস্টমাইজ করুন" (বা Edit Mode) বাটনে ক্লিক করে আপনি সরাসরি আপনার নাম, বায়ো, ইমেইল, ফোন, ইউটিউব লিংক ও নতুন প্রজেক্ট অ্যাড করতে পারবেন। এটি সাথে সাথে ব্রাউজারে প্রিভিউ হবে।'
                  : 'Click the "Edit Mode" button to instantly customize your profile, bio, email, social links, and add or remove projects without touching code.'}
              </p>
            </div>

            {/* Step 2: Adding Real Videos */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-xs font-mono">2</span>
                <span>{isBn ? 'ইউটিউব ভিডিও ও শোরিল যুক্ত করার নিয়ম' : 'Adding YouTube Videos & Reel'}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn
                  ? 'আপনার ইউটিউব চ্যানেলের যেকোনো ভিডিওর লিংক (watch?v= বা youtu.be/ লিংক) কপি করে “ইউটিউব ভিডিও যোগ করুন” বাটনে পেস্ট করুন। সাথে সাথে থাম্বনেইল চলে আসবে এবং ক্লায়েন্টরা ক্লিক করলেই ভিডিও প্লে হবে।'
                  : 'Simply copy any YouTube URL (watch, shorts, or unlisted) and paste it into the "Add YouTube Video" modal. It auto-extracts the thumbnail and plays seamlessly.'}
              </p>
            </div>

            {/* Step 3: Color Grade Before/After */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-mono">3</span>
                <span>{isBn ? 'কালার গ্রেডিং Before / After ফিচার' : 'Interactive Before/After Slider'}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn
                  ? 'ড্যাভিঞ্চি রিজলভ বা প্রিমিয়ার প্রোতে কালার গ্রেডিং করার পর ক্যামেরা Log ফুটেজ এবং ফাইনাল গ্রেডেড ফ্রেম স্ক্রিনশট নিয়ে Before/After ফিল্ডে বসান। ক্লায়েন্টরা স্লাইডার টেনে আপনার কাজ দেখে মুগ্ধ হবে!'
                  : 'Upload your Raw Log frame as "Before Image" and Final Graded frame as "After Image" to trigger the interactive comparison slider!'}
              </p>
            </div>

            {/* Step 4: Permanent Code File Customization */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-mono">4</span>
                <span>{isBn ? 'স্থায়ী কোড ফাইল পরিবর্তন' : 'Permanent Code Data File'}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn
                  ? 'কোডের ভিতরে `src/data/defaultPortfolio.ts` ফাইলে সব ডেটা সুশৃঙ্খলভাবে সাজানো আছে। আপনি চাইলে সেই ফাইলটি ওপেন করে যেকোনো সময় সরাসরি পরিবর্তন করতে পারেন।'
                  : 'All permanent data is cleanly organized in `src/data/defaultPortfolio.ts`. You can edit this file directly anytime.'}
              </p>
            </div>
          </div>

          {/* Professional Advice for Video Editors & Designers */}
          <div className="border-t border-slate-800 pt-5 space-y-3">
            <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {isBn ? 'আন্তর্জাতিক ক্লায়েন্ট পাওয়ার ৩টি গোল্ডেন টিপস' : '3 Golden Tips to Win High-Paying Clients'}
              </span>
            </h4>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p>
                  <strong>{isBn ? '১. শোরিল ছোট ও দ্রুত রাখুন (৬০-৯০ সেকেন্ড):' : '1. Fast Showreel (60-90s):'}</strong>{' '}
                  {isBn
                    ? 'ভিডিওর প্রথম ৫ সেকেন্ডে সবচেয়ে আকর্ষণীয় ও সেরা কাজগুলো রাখুন। ক্লায়েন্টরা দীর্ঘ ভিডিও দেখার সময় পান না।'
                    : 'Put your best 3 shots in the first 5 seconds. Sound sync and pacing matter most.'}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p>
                  <strong>{isBn ? '২. ফলাফল (Results) উল্লেখ করুন:' : '2. Show Results & Metrics:'}</strong>{' '}
                  {isBn
                    ? 'শুধু "ভিডিও এডিট করেছি" না লিখে কত ভিউ হয়েছে, ক্লিক-থ্রু রেট (CTR) কতটা বেড়েছে তা লিখুন (যেমন: "+4.5M Views", "18% CTR")।'
                    : 'Mention retention stats, views generated, and CTR improvements (e.g. +1.4M views, 62% watch time).'}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p>
                  <strong>{isBn ? '৩. মাল্টি-ডিসিপ্লিনারি সুবিধার সুযোগ নিন:' : '3. Leverage Multi-Disciplinary Skills:'}</strong>{' '}
                  {isBn
                    ? 'আপনি একই সাথে ভিডিও এডিটর ও গ্রাফিক ডিজাইনার—এটি ক্লায়েন্টদের জন্য বিরাট প্লাস পয়েন্ট! কারণ আপনি ভিডিওর সাথে সাথে থাম্বনেইল ও ব্র্যান্ডিং নিজেই তৈরি করে দিতে পারেন।'
                    : 'Being able to both edit video and design thumbnails/brand assets is a huge competitive edge.'}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <p>
                  <strong>{isBn ? '৪. বেসিক জানলেও আত্মবিশ্বাসের সাথে প্রেজেন্ট করুন:' : '4. Present Core Skills with Confidence:'}</strong>{' '}
                  {isBn
                    ? 'ক্লায়েন্টরা মূলত চান পরিষ্কার জাম্প কাট, ভালো অডিও, সাবটাইটেল এবং সুন্দর থাম্বনেইল। বেসিক কাজগুলো দ্রুত ও নির্ভুলভাবে ডেলিভারি দেওয়া এবং শেখার তীব্র আগ্রহ দেখালেই নিয়মিত আন্তর্জাতিক ক্লায়েন্ট পাওয়া যায়।'
                    : 'Clients primarily need clean cuts, crisp audio, trending captions, and high-CTR thumbnails. Delivering fundamentals fast and reliably wins loyal clients.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-900/95 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-400">
            {isBn ? 'এখনই নিজের তথ্য দিয়ে সাজিয়ে নিতে চান?' : 'Ready to customize your profile info?'}
          </p>

          <button
            onClick={() => {
              setIsGuideOpen(false);
              setIsCustomizerOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <span>{isBn ? 'কাস্টমাইজেশন প্যানেল খুলুন' : 'Open Customizer Drawer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
