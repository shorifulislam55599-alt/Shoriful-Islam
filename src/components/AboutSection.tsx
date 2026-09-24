import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { User, Award, HeartHandshake, Sparkles, CheckCircle2, Clock, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const { language } = usePortfolio();
  const isBn = language === 'bn';

  const highlights = [
    {
      icon: <Sparkles className="w-5 h-5 text-sky-400" />,
      gradient: 'from-sky-500/20 via-sky-500/5 to-transparent',
      borderGlow: 'hover:border-sky-500/50',
      title: isBn ? 'ক্রিয়েটিভিটি ও রিটেনশন ফোকাসড' : 'Creative & High-Retention',
      description: isBn
        ? 'প্রতিটি সেকেন্ডের গুরুত্ব বুঝে দর্শকদের মনোযোগ ধরে রাখার মতো এডিটিং ও নজরকাড়া ডিজাইন।'
        : 'Deep understanding of audience psychology to maximize viewer retention and engagement.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
      gradient: 'from-teal-500/20 via-teal-500/5 to-transparent',
      borderGlow: 'hover:border-teal-500/50',
      title: isBn ? 'সততা ও পেশাদারিত্ব' : 'Integrity & Professionalism',
      description: isBn
        ? 'কাজের প্রতিটি ধাপে স্বচ্ছতা, আন্তরিকতা এবং ক্লায়েন্টের প্রতি সর্বোচ্চ দায়বদ্ধতা বজায় রাখি।'
        : 'Delivering transparent communication, honest commitment, and genuine care in every creative project.',
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-400" />,
      gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
      borderGlow: 'hover:border-blue-500/50',
      title: isBn ? 'দ্রুত ডেলিভারি ও ক্লিয়ার কমিউনিকেশন' : 'Fast Turnaround & Communication',
      description: isBn
        ? 'প্রজেক্টের ডেডলাইন সময়মতো বজায় রাখা এবং নিয়মিত আপডেটের মাধ্যমে সহজ কাজের পরিবেশ নিশ্চিত করা।'
        : 'Strict adherence to project deadlines with transparent, proactive updates at every stage.',
    },
    {
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
      borderGlow: 'hover:border-cyan-500/50',
      title: isBn ? 'আধুনিক এআই ও মেটা মার্কেটিং' : 'Modern AI & Meta Marketing',
      description: isBn
        ? 'লেটেস্ট এআই টুলস ও মেটা বিজ্ঞাপন কৌশলের মেলবন্ধনে কনটেন্টকে রূপ দিই হাই-কনভার্টিং অ্যাসেটে।'
        : 'Integrating cutting-edge AI acceleration and data-driven Meta marketing to scale brand impact.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative bg-[#090d16] overflow-hidden border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <User className="w-3.5 h-3.5" />
            <span>{isBn ? 'আমার সম্পর্কে' : 'About Me'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-slate-100 tracking-tight leading-tight">
            {isBn ? (
              <>
                আমার পরিচয় ও{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                  কাজের অভিজ্ঞতা
                </span>
              </>
            ) : (
              <>
                About Me &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                  Creative Journey
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {isBn
              ? 'আমি শরীফুল ইসলাম — একজন প্যাশনেট ভিডিও এডিটর, গ্রাফিক ডিজাইনার এবং ডিজিটাল ক্রিয়েটর। প্রতিটি প্রজেক্টে আমার লক্ষ্য থাকে দর্শকমনে গভীর দাগ কাটার মতো আকর্ষণীয় কাজ উপহার দেওয়া।'
              : "I am Shoriful Islam — a dedicated Video Editor, Graphic Designer, and Meta Marketer committed to turning visual ideas into impactful, high-converting digital assets."}
          </p>
        </motion.div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-sm relative shadow-2xl"
          >
            <div className="space-y-5 text-slate-300 leading-relaxed text-sm sm:text-base">
              <div className="flex items-center gap-3 text-sky-400 font-semibold text-lg font-headline">
                <HeartHandshake className="w-6 h-6 shrink-0" />
                <span>{isBn ? 'কাজের দর্শন ও অঙ্গীকার' : 'My Philosophy & Working Principles'}</span>
              </div>

              <p>
                {isBn
                  ? 'বর্তমান সোশ্যাল মিডিয়া ও ডিজিটাল জগতে প্রথম ৩-৫ সেকেন্ডের মধ্যেই দর্শকের নজর কাড়তে হয়। আমি ভিডিওর রিটেনশন, ডায়নামিক কাটিং, কালার হার্মনি এবং ক্রিয়েটিভ গ্রাফিক্সের এমন এক মেলবন্ধন তৈরি করি যা ব্র্যান্ড কিংবা কনটেন্ট ক্রিয়েটরদের লক্ষ্য অর্জনে সরাসরি ভূমিকা রাখে।'
                  : 'In the fast-moving digital world, catching attention in the first few seconds is critical. I craft high-retention video pacing, dynamic sound design, and clean visual graphics that elevate brand trust and audience reach.'}
              </p>

              <p>
                {isBn
                  ? 'প্রতিটি প্রজেক্টে আমি সর্বোচ্চ দায়িত্বশীলতা, স্বচ্ছতা এবং পেশাদারিত্ব বজায় রাখি। ক্লায়েন্টের প্রত্যাশা অনুযায়ী নিখুঁত কোয়ালিটি এবং সময়মতো ডেলিভারি নিশ্চিত করাই আমার কাজের অঙ্গীকার।'
                  : 'I maintain the highest level of responsibility, transparency, and professionalism in every project. Ensuring pristine quality and on-time delivery tailored to client goals is my key commitment.'}
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isBn ? '১০০% ক্লায়েন্ট সন্তুষ্টি ও আনলিমিটেড সাপোর্ট' : '100% Client Satisfaction Guarantee'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{isBn ? 'হাই-কনভার্টিং থাম্বনেইল ও গ্রাফিক্স' : 'High-CTR Thumbnails & Branding'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{isBn ? 'টার্গেটেড মেটা অ্যাড ক্যাম্পেইন' : 'Strategic Meta Ad Campaigns'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{isBn ? 'আধুনিক এআই টুলস ভিত্তিক দ্রুত ডেলিভারি' : 'AI-Accelerated High-Speed Delivery'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics / Values Card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${item.gradient} bg-slate-900/50 border border-slate-800/80 ${item.borderGlow} transition-all duration-300 shadow-md`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 font-headline">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
