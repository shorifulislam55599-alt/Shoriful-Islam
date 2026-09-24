import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Check, Clock, ArrowRight, Zap, Film, Palette, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export const ServicesSection: React.FC = () => {
  const { language } = usePortfolio();
  const isBn = language === 'bn';

  const conciseServices = [
    {
      id: 'srv-video',
      title: isBn ? 'হাই-রিটেনশন ভিডিও এডিটিং' : 'High-Retention Video Editing',
      subtitle: isBn ? 'ইউটিউব, রিলস, শর্টস ও কমার্শিয়াল' : 'YouTube, Shorts, Reels & Commercials',
      timeline: isBn ? '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি' : '24 - 48h Turnaround',
      icon: <Film className="w-5 h-5 text-sky-400" />,
      popular: true,
      deliverables: isBn
        ? [
            'প্রথম ৩-সেকেন্ডের স্ট্রং হুক ও ফাস্ট কাটিং',
            'কাইনেটিক ট্রেন্ডিং সাবটাইটেল ও মোশন এলিমেন্টস',
            'সিনেমাটিক কালার গ্রেড ও সাউন্ড এফেক্টস (SFX)',
            '১৬:৯ এবং ৯:১৬ উভয় ফরম্যাটে মাস্টার রেন্ডার',
          ]
        : [
            '0-3s hook retention & dead-air trimming',
            'Kinetic animated captions & motion graphics',
            'Cinematic color grading & layered sound FX',
            'Full 16:9 & 9:16 vertical exports',
          ],
    },
    {
      id: 'srv-graphics',
      title: isBn ? 'হাই-সিটিআর গ্রাফিক ডিজাইন' : 'High-CTR Graphic Design',
      subtitle: isBn ? 'ইউটিউব থাম্বনেইল ও সোশ্যাল পোস্ট' : 'Thumbnails, Posters & Brand Visuals',
      timeline: isBn ? '১২ - ২৪ ঘণ্টার মধ্যে ডেলিভারি' : '12 - 24h Turnaround',
      icon: <Palette className="w-5 h-5 text-cyan-400" />,
      popular: false,
      deliverables: isBn
        ? [
            'ক্লিক-থ্রু রেট (CTR) বাড়ানো কাস্টম থাম্বনেইল',
            'হাই-রেজোলিউশন ফেসবুক ও ইনস্টা পোস্টার',
            'ফটো রিটাচিং, কালার পপ ও এআই আর্ট ব্লেন্ড',
            'সকল সোর্স ফাইল ও আনলিমিটেড মাইনর রিভিশন',
          ]
        : [
            'High-CTR click-focused custom thumbnails',
            'High-res Facebook & Instagram promo posters',
            'Skin retouching, color pop & AI enhancement',
            'Optimized lossless exports & revision support',
          ],
    },
    {
      id: 'srv-meta',
      title: isBn ? 'মেটা বিজ্ঞাপন ও কনভার্সন ক্যাম্পেইন' : 'Meta Ads & Creative Campaigns',
      subtitle: isBn ? 'সেলস ও রিচ বাড়ানোর ভিডিও ও অ্যাড ক্রিয়েটিভ' : 'High-ROAS Facebook & Instagram Ads',
      timeline: isBn ? '২ - ৩ দিনের মধ্যে ডেলিভারি' : '2 - 3 Days Delivery',
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
      popular: false,
      deliverables: isBn
        ? [
            'আস-সুন্নাহ ইনস্টিটিউটের মেটা মার্কেটিং জ্ঞানভিত্তিক স্ট্র্যাটেজি',
            'ইউজিসি ও প্রোডাক্ট সেলস ভিডিও অ্যাড ক্রিয়েটিভ',
            'এ/বি টেস্টিং উপযোগী মাল্টিপল ভ্যারিয়েশন',
            'হাই-কনভার্সন অফার ব্যাজ ও কল-টু-অ্যাকশন',
          ]
        : [
            'Data-backed Meta ad creative methodology',
            'UGC & e-commerce product video ads',
            'Multiple variation sets for A/B testing',
            'High-converting visual offer badges & CTAs',
          ],
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#090d16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>{isBn ? 'প্রফেশনাল সার্ভিসেস' : 'Focused Services'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-slate-100 tracking-tight">
            {isBn ? (
              <>
                সার্ভিস ও{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                  ক্রিয়েটিভ সল্যুশনস
                </span>
              </>
            ) : (
              <>
                Services &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                  Creative Solutions
                </span>
              </>
            )}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {isBn
              ? 'আপনার প্রজেক্টের প্রয়োজনীয়তা অনুযায়ী পরিচ্ছন্ন ও দ্রুত ডেলিভারির সার্ভিস।'
              : 'Direct, high-impact creative services tailored for fast turnaround and top quality.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conciseServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                service.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-sky-950/20 border-2 border-sky-500/60 shadow-xl shadow-sky-500/10'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-sky-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow">
                  {isBn ? 'সবচেয়ে জনপ্রিয়' : 'Most In-Demand'}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                    {service.icon}
                  </div>
                  <span className="flex items-center gap-1 font-medium text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    {service.timeline}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-lg text-slate-100 mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-sky-300/80 mb-4 font-medium">
                  {service.subtitle}
                </p>

                <div className="space-y-2.5 border-t border-slate-800/80 pt-4 mb-6">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  service.popular
                    ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                }`}
              >
                <span>{isBn ? 'অর্ডার বা কথা বলুন' : 'Inquire Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
