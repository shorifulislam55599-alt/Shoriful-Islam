import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Youtube,
  Linkedin,
  Instagram,
  Facebook,
  Copy,
  Check,
} from 'lucide-react';

// Authentic WhatsApp SVG Icon with high brand recognition
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const { data, language } = usePortfolio();
  const { profile } = data;
  const isBn = language === 'bn';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Video Editing',
    budget: '$300 - $800',
    timeline: 'Within 1-2 weeks',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const primaryEmail = profile.email || 'shorifulislamint@gmail.com';
  const secondaryEmail = profile.secondaryEmail || 'shorifulislam55599@gmail.com';
  const phoneNumber = profile.phone || '01813531986';
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const waLink = cleanPhone.startsWith('88')
    ? `https://wa.me/${cleanPhone}`
    : `https://wa.me/88${cleanPhone.replace(/^0+/, '')}`;

  const primaryMailto = `mailto:${primaryEmail}?subject=${encodeURIComponent(
    isBn ? 'প্রজেক্ট ইনকোয়ারি ও কাজের প্রস্তাব' : 'Project Inquiry - Video Editing & Graphic Design'
  )}&body=${encodeURIComponent(
    isBn
      ? 'প্রিয় শরীফুল ইসলাম,\n\nআমি আপনার পোর্টফোলিও দেখে যোগাযোগ করছি। আমার প্রজেক্ট নিয়ে আপনার সাথে আলোচনা করতে চাই:\n\n- প্রজেক্টের ধরন:\n- সময়সীমা:\n\nধন্যবাদ,'
      : 'Hi Shoriful Islam,\n\nI came across your portfolio and would like to discuss an upcoming project:\n\n- Project Type:\n- Estimated Timeline:\n\nBest regards,'
  )}`;

  const secondaryMailto = `mailto:${secondaryEmail}?subject=${encodeURIComponent(
    isBn ? 'প্রজেক্ট ইনকোয়ারি ও কাজের প্রস্তাব (বিকল্প)' : 'Project Inquiry (Alternative) - Video & Design'
  )}&body=${encodeURIComponent(
    isBn
      ? 'প্রিয় শরীফুল ইসলাম,\n\nআমি আপনার পোর্টফোলিও দেখে যোগাযোগ করছি:\n\n'
      : 'Hi Shoriful Islam,\n\nReaching out regarding your video editing and graphic design services:\n\n'
  )}`;

  const triggerEmailComposer = (mailtoUrl: string) => {
    window.location.href = mailtoUrl;
  };

  const copyToClipboard = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Direct mailto trigger to primary email
    const subject = encodeURIComponent(`Project Inquiry: ${formData.serviceType} from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.serviceType}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\n\nProject Details:\n${formData.message}`
    );
    window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#080c16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct info & socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>{isBn ? 'যোগাযোগ ও কাজ শুরু' : 'Let’s Collaborate'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-slate-100 tracking-tight">
              {isBn ? 'আপনার পরবর্তী প্রজেক্ট নিয়ে কথা বলুন' : 'Ready to Elevate Your Visual Content?'}
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {isBn
                ? 'একটি নতুন ভিডিও এডিট, ইউটিউব সিরিজ কিংবা সম্পূর্ণ ব্র্যান্ড আইডেন্টিটির কাজ হোক—আমি আপনার লক্ষ্য অর্জনে সাহায্য করতে প্রস্তুত।'
                : 'Whether you need cinematic video editing, high-CTR YouTube packaging, or a fresh brand identity system, let’s bring your vision to life.'}
            </p>

            {/* Creator profile card */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-sky-500/30 shrink-0">
                <img
                  src={profile.avatarUrl || '/assets/profile.jpg'}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span>{isBn ? profile.nameBn || profile.name : profile.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs text-sky-400 font-medium">
                  Professional Video Editor & Graphic Designer
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-1">
              {/* WhatsApp & Phone Card (Highlighted with WhatsApp Icon & Call) */}
              <motion.div
                whileHover={{ scale: 1.018, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-slate-900/80 border border-emerald-500/40 hover:border-emerald-400/80 transition-all shadow-lg group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform shadow-inner shrink-0">
                      <WhatsAppIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-emerald-400 font-mono font-semibold uppercase tracking-wider">
                          {isBn ? 'হোয়াটসঅ্যাপ ও ফোন' : 'WhatsApp & Phone'}
                        </span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {isBn ? 'সক্রিয়' : 'Active'}
                        </span>
                      </div>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors font-mono tracking-wide block mt-0.5"
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all shadow-md shadow-emerald-500/20"
                      title={isBn ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Chat on WhatsApp'}
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isBn ? 'চ্যাট' : 'Chat'}</span>
                    </a>
                    <a
                      href={`tel:${phoneNumber}`}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700 transition-colors"
                      title={isBn ? 'সরাসরি কল করুন' : 'Call Directly'}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => copyToClipboard(phoneNumber, 'phone')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-sky-400 border border-slate-700 transition-colors"
                      title={isBn ? 'নম্বর কপি করুন' : 'Copy Number'}
                    >
                      {copiedKey === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* 1st Email: Primary Email (shorifulislamint@gmail.com) with bouncy tap & instant mail composer trigger */}
              <motion.a
                href={primaryMailto}
                whileHover={{ scale: 1.018, y: -2 }}
                whileTap={{ scale: 0.94, y: 2 }}
                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                onClick={(e) => {
                  // Direct trigger ensures webview, mobile & desktop all launch the default email client immediately
                  triggerEmailComposer(primaryMailto);
                }}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/60 hover:shadow-lg hover:shadow-sky-500/10 transition-colors group flex items-center justify-between gap-3 cursor-pointer select-none active:bg-slate-800/90"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center border border-sky-500/30 group-hover:scale-105 group-hover:bg-sky-500/25 transition-transform shadow-inner shrink-0">
                    <Mail className="w-5 h-5 text-sky-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] text-sky-400 font-mono font-semibold">
                        {isBn ? 'ইমেইল (প্রাইমারি)' : 'Primary Email'}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        1st
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-100 group-hover:text-sky-300 transition-colors block truncate font-mono">
                      {primaryEmail}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-sky-400/80 transition-colors flex items-center gap-1 mt-0.5">
                      <Send className="w-2.5 h-2.5" />
                      {isBn ? 'চাপ দিলেই মেইল অ্যাপ ওপেন হবে' : 'Tap to open mail composer'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => triggerEmailComposer(primaryMailto)}
                    className="px-2.5 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-bold text-xs flex items-center gap-1 transition-all border border-sky-500/30 hover:shadow-md hover:shadow-sky-500/20"
                    title={isBn ? 'সরাসরি মেইল পাঠান' : 'Compose Email'}
                  >
                    <Send className="w-3 h-3" />
                    <span className="hidden sm:inline">{isBn ? 'মেইল পাঠান' : 'Send'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => copyToClipboard(primaryEmail, 'email1', e)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-sky-400 border border-slate-700 transition-colors"
                    title={isBn ? 'ইমেইল কপি করুন' : 'Copy Email Address'}
                  >
                    {copiedKey === 'email1' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </motion.a>

              {/* 2nd Email: Secondary Email (shorifulislam55599@gmail.com) with bouncy tap & instant mail composer trigger */}
              <motion.a
                href={secondaryMailto}
                whileHover={{ scale: 1.018, y: -2 }}
                whileTap={{ scale: 0.94, y: 2 }}
                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                onClick={(e) => {
                  triggerEmailComposer(secondaryMailto);
                }}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-colors group flex items-center justify-between gap-3 cursor-pointer select-none active:bg-slate-800/90"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30 group-hover:scale-105 group-hover:bg-cyan-500/25 transition-transform shadow-inner shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] text-cyan-400 font-mono font-semibold">
                        {isBn ? 'বিকল্প ইমেইল (Alternative)' : 'Alternative Email'}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        2nd
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors block truncate font-mono">
                      {secondaryEmail}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-cyan-400/80 transition-colors flex items-center gap-1 mt-0.5">
                      <Send className="w-2.5 h-2.5" />
                      {isBn ? 'চাপ দিলেই মেইল অ্যাপ ওপেন হবে' : 'Tap to open mail composer'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => triggerEmailComposer(secondaryMailto)}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs flex items-center gap-1 transition-all border border-cyan-500/30 hover:shadow-md hover:shadow-cyan-500/20"
                    title={isBn ? 'সরাসরি মেইল পাঠান' : 'Compose Email'}
                  >
                    <Send className="w-3 h-3" />
                    <span className="hidden sm:inline">{isBn ? 'মেইল পাঠান' : 'Send'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => copyToClipboard(secondaryEmail, 'email2', e)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 border border-slate-700 transition-colors"
                    title={isBn ? 'ইমেইল কপি করুন' : 'Copy Email Address'}
                  >
                    {copiedKey === 'email2' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </motion.a>

              {/* Location Card (Unchanged) */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">
                    {isBn ? 'বর্তমান ঠিকানা ও কাজের ধরন' : 'Location & Work Setup'}
                  </span>
                  <span className="text-sm font-semibold text-slate-200">
                    {isBn ? profile.locationBn : profile.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 block mb-3 font-semibold uppercase tracking-wider">
                {isBn ? 'সোশ্যাল চ্যানেল ও পোর্টফোলিও লিংক:' : 'Online Profiles:'}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={profile.socials.behance}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 flex items-center justify-center border border-slate-700 transition-colors"
                  title="Behance"
                >
                  <span className="font-bold text-xs">Bē</span>
                </a>
                <a
                  href={profile.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-red-400 flex items-center justify-center border border-slate-700 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-blue-400 flex items-center justify-center border border-slate-700 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-pink-400 flex items-center justify-center border border-slate-700 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-gradient-to-b from-slate-900/95 to-[#0b101c] p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
            <h3 className="font-display font-bold text-xl text-slate-100 mb-1">
              {isBn ? 'কাজের ইনকোয়ারি ফর্ম' : 'Send a Project Inquiry'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              {isBn
                ? 'ফর্মটি পূরণ করলে সরাসরি আমার ইমেইলে বার্তা পৌঁছে যাবে।'
                : 'Fill in the details below to receive a custom proposal and quote within 24 hours.'}
            </p>

            {submitted ? (
              <div className="p-8 text-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-slate-100 text-base">
                  {isBn ? 'ইনকোয়ারি তৈরি হয়েছে!' : 'Inquiry Ready!'}
                </h4>
                <p className="text-xs text-slate-300">
                  {isBn
                    ? 'আপনার ইমেইল ক্লায়েন্টে মেসেজটি ওপেন হয়েছে। Send বাটনে ক্লিক করে পাঠিয়ে দিন।'
                    : 'Your default email client has opened with your project specifications. Click send to finalize!'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-amber-400 underline font-semibold mt-2"
                >
                  {isBn ? 'আরেকটি মেসেজ পাঠান' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      {isBn ? 'আপনার নাম' : 'Your Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isBn ? 'যেমন: রাহাত হোসেন' : 'e.g. Alex Morgan'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      {isBn ? 'ইমেইল অ্যাড্রেস' : 'Your Email'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      {isBn ? 'কাজের ধরন' : 'Service Needed'}
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="Video Editing (YouTube / Long-form)">
                        {isBn ? 'ভিডিও এডিটিং (ইউটিউব / লং-ফর্ম)' : 'Video Editing (YouTube)'}
                      </option>
                      <option value="Commercial Ads & Shorts (9:16)">
                        {isBn ? 'কমার্শিয়াল বিজ্ঞাপন ও রিলস (৯:১৬)' : 'Commercial Ads & Reels'}
                      </option>
                      <option value="Brand Identity & Graphic Design">
                        {isBn ? 'ব্র্যান্ড আইডেন্টিটি ও গ্রাফিক্স' : 'Brand Identity & Graphics'}
                      </option>
                      <option value="Motion Graphics & Logo Animation">
                        {isBn ? 'মোশন গ্রাফিক্স ও লোগো অ্যানিমেশন' : 'Motion Graphics & VFX'}
                      </option>
                      <option value="High-CTR YouTube Thumbnails">
                        {isBn ? 'হাই-সিটিআর থাম্বনেইল প্যাক' : 'High-CTR Thumbnails'}
                      </option>
                      <option value="Full Retainer / Long-term Partnership">
                        {isBn ? 'লং-টার্ম মান্থলি রিটেইনার' : 'Monthly Retainer / Partner'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      {isBn ? 'আনুমানিক বাজেট' : 'Estimated Budget'}
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
                    >
                      <option value="Under $300">&lt; $300 USD</option>
                      <option value="$300 - $800">$300 - $800 USD</option>
                      <option value="$800 - $2,000">$800 - $2,000 USD</option>
                      <option value="$2,000+">$2,000+ USD (Agency / Scale)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    {isBn ? 'প্রজেক্টের বিস্তারিত' : 'Project Details & Goals'} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isBn
                        ? 'আপনার ফুটেজের বিবরণ, রেফারেন্স ভিডিও লিংক কিংবা ডিজাইনের প্রয়োজনীয়তা লিখুন...'
                        : 'Describe your vision, reference links, deadline, and raw footage details...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isBn ? 'প্রজেক্ট ইনকোয়ারি পাঠান' : 'Send Project Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
