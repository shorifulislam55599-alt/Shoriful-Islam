import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Film,
  Palette,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Video,
  Image,
  Zap,
  Clock,
  RotateCcw,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

export const RoleSpecialization: React.FC = () => {
  const { data, language } = usePortfolio();
  const [activeRole, setActiveRole] = useState<'video' | 'design' | 'learning'>('video');
  const isBn = language === 'bn';

  const roleAnalysis = data.roleAnalysis;
  if (!roleAnalysis) return null;

  const { videoEditor, graphicDesigner, learningJourney } = roleAnalysis;

  return (
    <section id="roles" className="py-20 sm:py-28 relative bg-[#070b14] border-t border-b border-slate-800/80">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? 'আমার মূল ভূমিকা ও বিশেষত্ব' : 'Role Breakdown & Capabilities'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-100 tracking-tight">
            {isBn ? 'ভিডিও এডিটর ও ডিজাইনার হিসেবে আমার সার্ভিস' : 'Video Editor & Graphic Designer In Depth'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            {isBn
              ? 'বেসিক সব রিকোয়ারমেন্ট নিখুঁতভাবে ডেলিভারি করার পাশাপাশি প্রতিদিন নতুন আধুনিক টেকনিক দিয়ে ক্লায়েন্টের কাজকে আরও আকর্ষণীয় করে তুলি।'
              : 'Mastering the core client deliverables across both disciplines with an eager, fast-learning growth mindset.'}
          </p>
        </div>

        {/* Big Switcher Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveRole('video')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeRole === 'video'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>{isBn ? 'ভিডিও এডিটর হিসেবে' : 'As Video Editor'}</span>
            </button>

            <button
              onClick={() => setActiveRole('design')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeRole === 'design'
                  ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>{isBn ? 'গ্রাফিক ডিজাইনার হিসেবে' : 'As Graphic Designer'}</span>
            </button>

            <button
              onClick={() => setActiveRole('learning')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeRole === 'learning'
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{isBn ? 'আরও যা শিখছি' : 'Learning & Upskilling'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Video Editor Deep Dive */}
        {activeRole === 'video' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Banner overview */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900/80 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {isBn ? 'ভিডিও এডিটিং স্পেশালাইজেশন' : 'Video Editing Focus'}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-100">
                  {isBn ? videoEditor.taglineBn : videoEditor.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isBn ? videoEditor.summaryBn : videoEditor.summary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <a
                  href="#contact"
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition-all shadow-md"
                >
                  {isBn ? 'ভিডিও এডিটের জন্য নক দিন' : 'Hire for Video Editing'}
                </a>
              </div>
            </div>

            {/* 4 Core Video Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videoEditor.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c101d] border border-slate-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-bold text-base sm:text-lg text-slate-100">
                        {isBn ? cap.titleBn : cap.title}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        {cap.tools.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-amber-300 border border-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
                      {isBn ? cap.descriptionBn : cap.description}
                    </p>

                    <div className="space-y-2 border-t border-slate-800/80 pt-3">
                      <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                        {isBn ? 'যা যা করে থাকি:' : 'Key Actions:'}
                      </span>
                      {(isBn ? cap.pointsBn : cap.points).map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                    <span className="text-[11px] text-slate-400 font-medium self-center mr-1">
                      {isBn ? 'ডেলিভারেবল:' : 'Deliverables:'}
                    </span>
                    {(isBn ? cap.sampleDeliverablesBn : cap.sampleDeliverables).map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-[10px] font-medium border border-amber-500/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Why hire as video editor */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h4 className="font-bold text-slate-200 text-sm mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{isBn ? 'ভিডিও এডিটর হিসেবে আমার কাজের নিশ্চয়তা:' : 'Why Work With Me on Video Projects:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(isBn ? videoEditor.strengthsBn : videoEditor.strengths).map((str, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Graphic Designer Deep Dive */}
        {activeRole === 'design' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Banner overview */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-500/10 via-slate-900/80 to-slate-900 border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  {isBn ? 'গ্রাফিক ডিজাইন স্পেশালাইজেশন' : 'Graphic Design Focus'}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-100">
                  {isBn ? graphicDesigner.taglineBn : graphicDesigner.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isBn ? graphicDesigner.summaryBn : graphicDesigner.summary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <a
                  href="#contact"
                  className="px-5 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs text-center transition-all shadow-md"
                >
                  {isBn ? 'গ্রাফিক ডিজাইনের জন্য নক দিন' : 'Hire for Graphic Design'}
                </a>
              </div>
            </div>

            {/* 4 Core Graphic Design Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {graphicDesigner.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c101d] border border-slate-800/90 hover:border-rose-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-bold text-base sm:text-lg text-slate-100">
                        {isBn ? cap.titleBn : cap.title}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        {cap.tools.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-rose-300 border border-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
                      {isBn ? cap.descriptionBn : cap.description}
                    </p>

                    <div className="space-y-2 border-t border-slate-800/80 pt-3">
                      <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                        {isBn ? 'যা যা করে থাকি:' : 'Key Actions:'}
                      </span>
                      {(isBn ? cap.pointsBn : cap.points).map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                    <span className="text-[11px] text-slate-400 font-medium self-center mr-1">
                      {isBn ? 'ডেলিভারেবল:' : 'Deliverables:'}
                    </span>
                    {(isBn ? cap.sampleDeliverablesBn : cap.sampleDeliverables).map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 text-[10px] font-medium border border-rose-500/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Why hire as graphic designer */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h4 className="font-bold text-slate-200 text-sm mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-rose-400" />
                <span>{isBn ? 'গ্রাফিক ডিজাইনার হিসেবে আমার কাজের সুবিধা:' : 'Why Work With Me on Design Projects:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(isBn ? graphicDesigner.strengthsBn : graphicDesigner.strengths).map((str, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Learning Journey & Upskilling */}
        {activeRole === 'learning' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Banner overview */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-slate-900/80 to-slate-900 border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>{isBn ? 'গ্রোথ ও লার্নিং রোডম্যাপ' : 'Continuous Upskilling Focus'}</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-100">
                {isBn ? learningJourney.titleBn : learningJourney.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {isBn ? learningJourney.descriptionBn : learningJourney.description}
              </p>
            </div>

            {/* In-progress skills cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningJourney.inProgressSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c101d] border border-slate-800/90 hover:border-indigo-500/40 transition-all space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-slate-100">
                        {isBn ? skill.nameBn : skill.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {isBn ? skill.focusBn : skill.focus}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
                      {isBn ? 'শিখছি' : 'In Progress'}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>{isBn ? 'দক্ষতার মাত্রা ও প্র্যাকটিস' : 'Mastery Progress'}</span>
                      <span className="text-indigo-400 font-bold">{skill.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Client benefit callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/30 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                <strong className="text-slate-100 block mb-0.5">
                  {isBn ? 'ক্লায়েন্ট হিসেবে আপনার জন্য কী সুবিধা?' : 'What this means for you as a client:'}
                </strong>
                {isBn
                  ? 'আমি নতুন টেকনোলজি ও ট্রেন্ড নিয়ে নিয়মিত চর্চা করায় আপনার ভিডিও বা ডিজাইনে সবসময় সর্বাধুনিক স্টাইল ও ফ্রেশ ক্রিয়েটিভিটি বজায় থাকবে।'
                  : 'You get a passionate creator who stays on top of modern video trends, eager to test new ideas and deliver top-tier attention-grabbing assets.'}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
