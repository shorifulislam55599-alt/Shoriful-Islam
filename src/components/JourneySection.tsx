import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  Award,
  Layers,
  Video,
  Palette,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Calendar,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const JourneySection: React.FC = () => {
  const { language } = usePortfolio();
  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'skills'>('all');

  const educationMilestones = [
    {
      id: 'hedaya-education',
      title: isBn ? 'হেদায়া (ইন্টার সেকেন্ড ইয়ার)' : 'Hedaya (Inter 2nd Year Equivalent)',
      institution: isBn ? 'ইসলামিক স্টাডিজ ও শাস্ত্রীয় শিক্ষা' : 'Islamic Studies & Classical Curriculum',
      status: isBn ? 'রানিং স্টুডেন্ট (Active / Ongoing)' : 'Active / Running Student',
      statusType: 'running',
      period: isBn ? 'চলমান শিক্ষার্থী (Present)' : 'Present / Ongoing',
      gradient: 'from-sky-500/20 via-sky-500/5 to-transparent',
      borderColor: 'border-sky-500/40 hover:border-sky-500/80',
      badgeColor: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
      icon: <GraduationCap className="w-6 h-6 text-sky-400" />,
      description: isBn
        ? 'ইসলামিক স্টাডিজ ও শাস্ত্রীয় উচ্চতর পর্যায়ে হেদায়া স্তরে অধ্যয়নরত (ইন্টার সেকেন্ড ইয়ার সমমান)। এই ধারাবাহিক শিক্ষা আমাকে কাজের প্রতি গভীর আমানতদারি, সময়ানুবর্তিতা, সততা এবং নিষ্ঠার সাথে যেকোনো দায়িত্ব পালনে উদ্বুদ্ধ করেছে।'
        : 'Currently pursuing classical Islamic Studies at the Hedaya level (equivalent to Higher Secondary / Inter 2nd Year). It instills lifelong principles of discipline, patience, and uncompromising sincerity in every creative project.',
      skillsGained: isBn
        ? ['গভীর মনোযোগ ও একাগ্রতা', 'সততা ও নৈতিক অঙ্গীকার', 'শৃঙ্খলিত কর্মপদ্ধতি', 'ধৈর্য ও সময়ানুবর্তিতা']
        : ['Deep Focus & Research', 'Integrity & Ethics', 'Disciplined Execution', 'Patience & Punctuality'],
    },
    {
      id: 'ongoing-knowledge',
      title: isBn ? 'এডুকেশন অ্যান্ড ইসলামিক স্টাডিজ' : 'Education & Islamic Studies',
      institution: isBn ? 'ইসলামিক শিক্ষা ও সমসাময়িক জ্ঞানচর্চা' : 'Islamic Studies & Continuous Learning',
      status: isBn ? 'রানিং স্টুডেন্ট (Active / Ongoing)' : 'Active / Running Student',
      statusType: 'running',
      period: isBn ? 'চলমান (Present)' : 'Present / Ongoing',
      gradient: 'from-cyan-500/20 via-blue-500/5 to-transparent',
      borderColor: 'border-cyan-500/40 hover:border-cyan-500/80',
      badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
      description: isBn
        ? 'হেদায়া (ইন্টার ২য় বর্ষ) স্তরের সাথে সাথে প্রতিনিয়ত সমসাময়িক জ্ঞান ও ডিজিটাল দক্ষতার মেলবন্ধন তৈরি করছি। জ্ঞানসাধনা আমার সৃষ্টিশীল চিন্তাভাবনা ও রুচিবোধকে সবসময় আধুনিক রাখে।'
        : 'Balancing rigorous classical studies with modern digital craft. Continuous learning enriches perspective, keeping creative and design vision modern, honest, and impactful.',
      skillsGained: isBn
        ? ['ধারাবাহিক জ্ঞান অন্বেষণ', 'বিশ্লেষণমূলক চিন্তাভাবনা', 'সমসাময়িক সচেতনতা', 'সৃজনশীল মানসিকতা']
        : ['Continuous Self-Improvement', 'Analytical Reasoning', 'Modern Adaptability', 'Creative Mindset'],
    },
  ];

  const skillDomains = [
    {
      id: 'graphics',
      title: isBn ? 'গ্রাফিক্স ডিজাইন' : 'Graphic Design & Branding',
      institution: isBn ? 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট' : 'As-Sunnah Skill Development Institute',
      tools: 'Photoshop, Illustrator, Figma',
      gradient: 'from-amber-500/20 via-orange-500/5 to-transparent',
      borderColor: 'border-amber-500/40 hover:border-amber-500/80',
      badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      icon: <Palette className="w-6 h-6 text-amber-400" />,
      description: isBn
        ? 'ব্র্যান্ড আইডেন্টিটি ডিজাইন, হাই-সিটিআর ইউটিউব থাম্বনেইল, সোশ্যাল মিডিয়া ক্যাম্পেইন ব্যানার ও কমার্শিয়াল পোস্টার ডিজাইন যা দর্শককে আকৃষ্ট করে।'
        : 'Creating psychology-driven YouTube thumbnails, brand identities, vector art, and high-impact social media assets.',
      outcomes: isBn
        ? ['হাই-সিটিআর (CTR) থাম্বনেইল', 'ব্র্যান্ড লোগো ও কালার প্যালেট', 'সোশ্যাল মিডিয়া অ্যাড ক্রিয়েটিভ']
        : ['High-CTR Thumbnails', 'Brand Identity Kits', 'Conversion Ad Graphics'],
    },
    {
      id: 'video',
      title: isBn ? 'ভিডিও এডিটিং' : 'High-Retention Video Editing',
      institution: isBn ? 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট' : 'As-Sunnah Skill Development Institute',
      tools: 'Premiere Pro, After Effects, CapCut Pro',
      gradient: 'from-rose-500/20 via-purple-500/5 to-transparent',
      borderColor: 'border-rose-500/40 hover:border-rose-500/80',
      badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      icon: <Video className="w-6 h-6 text-rose-400" />,
      description: isBn
        ? 'ইউটিউব লং-ভিডিও, রিলস, শর্টস ও বিজ্ঞাপনের জন্য ডায়নামিক কাট, সিনেমাটিক কালার গ্রেডিং, সাউন্ড ডিজাইন এবং রিটেনশন অপ্টিমাইজেশন।'
        : 'Mastering hook-driven pacing, sound design, seamless transitions, and color grading for YouTube & viral reels.',
      outcomes: isBn
        ? ['ইউটিউব ও শর্টস/রিলস এডিটিং', 'সিনেমাটিক কালার গ্রেডিং', 'লেয়ার্ড সাউন্ড ডিজাইন (SFX)']
        : ['Long-form & Short-form Pacing', 'Cinematic LUTs & Color Grade', 'Impactful Sound Design'],
    },
    {
      id: 'meta-marketing',
      title: isBn ? 'মেটা মার্কেটিং' : 'Meta Marketing & Targeted Ads',
      institution: isBn ? 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট' : 'As-Sunnah Skill Development Institute',
      tools: 'Meta Business Suite, Ads Manager, Pixel',
      gradient: 'from-cyan-500/20 via-blue-500/5 to-transparent',
      borderColor: 'border-cyan-500/40 hover:border-cyan-500/80',
      badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
      description: isBn
        ? 'ফেসবুক ও ইনস্টাগ্রামের জন্য সঠিক অডিয়েন্স টার্গেটিং, রিটার্গেটিং ফানেল তৈরি, কনভার্সন অ্যাড সেটআপ এবং হাই-আরওএএস (ROAS) ক্যাম্পেইন পরিচালনা।'
        : 'Crafting targeted Facebook & Instagram campaigns, custom audience funnels, and data-driven ad optimizations.',
      outcomes: isBn
        ? ['টার্গেটেড অডিয়েন্স রিসার্চ', 'কনভার্সন ও সেলস ফানেল', 'অ্যাড বাজেট অপ্টিমাইজেশন']
        : ['Precision Audience Targeting', 'Conversion Sales Funnels', 'High ROAS Campaign Scaling'],
    },
    {
      id: 'ai-tools',
      title: isBn ? 'এআই টুলস ও অটোমেশন' : 'AI Tools & Creative Automation',
      institution: isBn ? 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট' : 'As-Sunnah Skill Development Institute',
      tools: 'Midjourney, ChatGPT, Runway, ElevenLabs',
      gradient: 'from-violet-500/20 via-purple-500/5 to-transparent',
      borderColor: 'border-violet-500/40 hover:border-violet-500/80',
      badgeColor: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
      icon: <Cpu className="w-6 h-6 text-violet-400" />,
      description: isBn
        ? 'জেনারেটিভ এআই ব্যবহার করে ইউনিক কনসেপ্ট আর্ট তৈরি, ক্রিয়েটিভ প্রম্পটিং, ভয়েস এনহ্যান্সমেন্ট এবং ভিডিও প্রোডাকশন টাইমলাইন দ্রুততর করা।'
        : 'Leveraging AI engines for rapid visual ideation, prompt engineering, audio enhancement, and automated production speed.',
      outcomes: isBn
        ? ['এআই ইমেজ ও আর্ট জেনারেশন', 'স্মার্ট ওয়ার্কফ্লো অটোমেশন', 'অডিও ও ভিডিও এনহ্যান্সমেন্ট']
        : ['Generative Visual Assets', 'Prompt Engineering', 'AI Voice & Audio Polish'],
    },
  ];

  return (
    <section id="journey" className="py-20 sm:py-28 relative bg-[#070b14] overflow-hidden">
      {/* Ambient gradient backdrops */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/10 via-amber-500/5 to-indigo-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isBn ? 'জার্নি ও লেখাপড়া' : 'My Journey & Education'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-slate-100 tracking-tight leading-tight">
            {isBn ? (
              <>
                দাওরায়ে হাদিস থেকে{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-cyan-400">
                  আধুনিক ক্রিয়েটিভিটির সমন্বয়
                </span>
              </>
            ) : (
              <>
                Academic Heritage &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-cyan-400">
                  Professional Mastery
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {isBn
              ? 'নৈতিক মূল্যবোধে গড়া মজবুত ভিত্তি এবং আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট থেকে পেশাদার দক্ষতা অর্জনের মাধ্যমে নিজেকে গড়ে তুলেছি একজন নিবেদিত ক্রিয়েটর হিসেবে।'
              : 'Combining principled Islamic scholarship with modern creative training from As-Sunnah Skill Development Institute to deliver reliable, high-impact results.'}
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                activeTab === 'all'
                  ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isBn ? 'সম্পূর্ণ জার্নি (All)' : 'All Milestones'}
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                activeTab === 'education'
                  ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isBn ? 'লেখাপড়া ও শিক্ষা (Education)' : 'Academic Studies'}
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                activeTab === 'skills'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isBn ? 'আস-সুন্নাহ ইনস্টিটিউট দক্ষতা (Skills)' : 'As-Sunnah Skills'}
            </button>
          </div>
        </motion.div>

        {/* Institution Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-amber-950/30 border border-emerald-500/30 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0 shadow-inner">
              <Building2 className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-400/10 text-emerald-300 text-xs font-semibold mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>{isBn ? 'পেশাদার দক্ষতা সনদ ও প্রশিক্ষণ' : 'Certified Professional Training'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-headline font-bold text-slate-100">
                {isBn ? 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট' : 'As-Sunnah Skill Development Institute'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {isBn
                  ? 'গ্রাফিক্স ডিজাইন, মেটা মার্কেটিং, ভিডিও এডিটিং এবং এআই টুলসের বাস্তবমুখী প্রশিক্ষণ'
                  : 'Rigorous hands-on training in Graphic Design, Meta Marketing, Video Editing & AI Tools'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isBn ? 'দক্ষতা অর্জন সম্পন্ন' : 'Skill Certified'}</span>
            </span>
          </div>
        </motion.div>

        {/* Dynamic Content Grid with Motion */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'education') && (
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold text-slate-100">
                    {isBn ? 'লেখাপড়া ও একাডেমিক অর্জন' : 'Education & Islamic Studies'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isBn ? 'দাওরায়ে হাদিস ও চলমান শিক্ষা কার্যক্রম' : 'Dawra-e-Hadith and continuous academic pursuit'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educationMilestones.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    whileHover={{ y: -4 }}
                    className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-b ${item.gradient} bg-slate-900/70 border ${item.borderColor} transition-all duration-300 shadow-xl backdrop-blur-sm relative overflow-hidden`}
                  >
                    {/* Top indicator strip */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700/80">
                          {item.icon}
                        </div>
                        <div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${item.badgeColor}`}>
                            {item.status}
                          </span>
                          <h4 className="text-lg font-headline font-bold text-slate-100 mt-1">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mb-3">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.institution}</span>
                      <span>•</span>
                      <span>{item.period}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      {item.description}
                    </p>

                    <div className="pt-4 border-t border-slate-800/80">
                      <div className="text-xs font-semibold text-slate-400 mb-2">
                        {isBn ? 'মূল বৈশিষ্ট্য ও গুণাবলী:' : 'Core Competencies:'}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.skillsGained.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-medium border border-slate-700/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'skills') && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold text-slate-100">
                    {isBn ? 'আস-সুন্নাহ ইনস্টিটিউট থেকে অর্জিত প্রফেশনাল দক্ষতাসমূহ' : 'Skills Mastered at As-Sunnah Institute'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isBn ? 'গ্রাফিক্স ডিজাইন, মেটা মার্কেটিং, ভিডিও এডিটিং ও আধুনিক এআই টুলস' : 'Graphic Design, Meta Marketing, Video Editing & AI Creative Stack'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillDomains.map((domain, idx) => (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className={`p-6 rounded-3xl bg-gradient-to-b ${domain.gradient} bg-slate-900/80 border ${domain.borderColor} transition-all duration-300 shadow-xl backdrop-blur-sm flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700">
                          {domain.icon}
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${domain.badgeColor}`}>
                          {domain.tools.split(',')[0]}
                        </span>
                      </div>

                      <h4 className="text-lg font-headline font-bold text-slate-100">
                        {domain.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {domain.tools}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                        {domain.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800/80">
                      <div className="space-y-1.5">
                        {domain.outcomes.map((out, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{out}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
