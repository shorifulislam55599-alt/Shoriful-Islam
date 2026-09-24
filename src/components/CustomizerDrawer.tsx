import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Sliders,
  User,
  Film,
  Plus,
  Download,
  RotateCcw,
  Check,
  Sparkles,
  Save,
  Layers,
  Globe,
  Upload,
  Youtube,
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { parseVideoUrl, getAutoThumbnail } from '../utils/videoHelpers';

export const CustomizerDrawer: React.FC = () => {
  const {
    data,
    language,
    isCustomizerOpen,
    setIsCustomizerOpen,
    updateProfile,
    addProject,
    resetToDefaults,
    exportDataAsJson,
  } = usePortfolio();

  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'profile' | 'showreel' | 'addProject'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local form states
  const [profileForm, setProfileForm] = useState({
    name: data.profile.name,
    nameBn: data.profile.nameBn,
    tagline: data.profile.tagline,
    taglineBn: data.profile.taglineBn,
    avatarUrl: data.profile.avatarUrl || '/assets/profile.jpg',
    bio: data.profile.bio,
    bioBn: data.profile.bioBn,
    email: data.profile.email,
    secondaryEmail: data.profile.secondaryEmail || '',
    phone: data.profile.phone,
    whatsapp: data.profile.whatsapp,
    location: data.profile.location,
    locationBn: data.profile.locationBn,
    experienceYears: data.profile.stats.experienceYears,
    projectsCompleted: data.profile.stats.projectsCompleted,
    viewsGenerated: data.profile.stats.viewsGenerated,
    satisfiedClients: data.profile.stats.satisfiedClients,
  });

  const [showreelForm, setShowreelForm] = useState({
    showreelUrl: data.profile.showreelUrl,
    showreelTitle: data.profile.showreelTitle,
    showreelDuration: data.profile.showreelDuration,
  });

  const [newProject, setNewProject] = useState({
    title: '',
    titleBn: '',
    category: 'video' as Project['category'],
    client: '',
    duration: '',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '',
    isVideo: true,
    beforeImage: '',
    afterImage: '',
    overview: '',
    overviewBn: '',
    software: 'Premiere Pro, DaVinci Resolve',
  });

  if (!isCustomizerOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      nameBn: profileForm.nameBn,
      tagline: profileForm.tagline,
      taglineBn: profileForm.taglineBn,
      avatarUrl: profileForm.avatarUrl,
      bio: profileForm.bio,
      bioBn: profileForm.bioBn,
      email: profileForm.email,
      secondaryEmail: profileForm.secondaryEmail,
      phone: profileForm.phone,
      whatsapp: profileForm.phone, // keep whatsapp synced with phone
      location: profileForm.location,
      locationBn: profileForm.locationBn,
      stats: {
        experienceYears: profileForm.experienceYears,
        projectsCompleted: profileForm.projectsCompleted,
        viewsGenerated: profileForm.viewsGenerated,
        satisfiedClients: profileForm.satisfiedClients,
      },
    });
    triggerSuccess();
  };

  const handleSaveShowreel = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      showreelUrl: showreelForm.showreelUrl,
      showreelTitle: showreelForm.showreelTitle,
      showreelDuration: showreelForm.showreelDuration,
    });
    triggerSuccess();
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;

    const categoryLabels: Record<string, { en: string; bn: string }> = {
      video: { en: 'Video Editing', bn: 'ভিডিও এডিটিং' },
      design: { en: 'Graphic & Visuals', bn: 'গ্রাফিক ডিজাইন' },
      branding: { en: 'Brand Identity', bn: 'ব্র্যান্ড আইডেন্টিটি' },
      motion: { en: 'Motion Graphics', bn: 'মোশন গ্রাফিক্স' },
      thumbnails: { en: 'YouTube Thumbnails', bn: 'ইউটিউব থাম্বনেইল' },
    };

    const project: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      titleBn: newProject.titleBn || newProject.title,
      category: newProject.category,
      categoryLabel: categoryLabels[newProject.category]?.en || 'Creative Work',
      categoryLabelBn: categoryLabels[newProject.category]?.bn || 'ক্রিয়েটিভ কাজ',
      client: newProject.client || 'Client Project',
      duration: newProject.duration || undefined,
      year: newProject.year || '2025',
      featured: true,
      thumbnail: newProject.thumbnail,
      videoUrl: newProject.videoUrl || undefined,
      isVideo: newProject.isVideo || Boolean(newProject.videoUrl),
      beforeImage: newProject.beforeImage || undefined,
      afterImage: newProject.afterImage || undefined,
      overview: newProject.overview || 'Custom project overview and technical execution.',
      overviewBn: newProject.overviewBn || 'কাস্টম প্রজেক্ট বিবরণ ও এক্সিকিউশন।',
      software: newProject.software.split(',').map((s) => s.trim()),
    };

    addProject(project);
    triggerSuccess();
    // Reset form
    setNewProject({
      title: '',
      titleBn: '',
      category: 'video',
      client: '',
      duration: '',
      year: '2025',
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop',
      videoUrl: '',
      isVideo: true,
      beforeImage: '',
      afterImage: '',
      overview: '',
      overviewBn: '',
      software: 'Premiere Pro, DaVinci Resolve',
    });
  };

  const triggerSuccess = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#090d16] border-l border-slate-800 shadow-2xl h-full flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0c111e] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-slate-100">
                {isBn ? 'পোর্টফোলিও কাস্টমাইজেশন মোড' : 'Portfolio Customizer'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {isBn ? 'সরাসরি তথ্য পরিবর্তন করে লাইভ দেখুন' : 'Live edit your portfolio content'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-medium">
                <Check className="w-3.5 h-3.5" />
                {isBn ? 'সংরক্ষিত!' : 'Saved!'}
              </span>
            )}
            <button
              onClick={() => setIsCustomizerOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 px-6 shrink-0 gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'profile'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isBn ? 'প্রোফাইল ও তথ্য' : 'Profile & Bio'}</span>
          </button>

          <button
            onClick={() => setActiveTab('showreel')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'showreel'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>{isBn ? 'শোরিল ভিডিও' : 'Showreel Video'}</span>
          </button>

          <button
            onClick={() => setActiveTab('addProject')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'addProject'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? 'প্রজেক্ট যোগ করুন' : 'Add Project'}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Photo Upload & Preview Card */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
                <label className="block text-slate-300 font-semibold text-xs">
                  {isBn ? 'প্রোফাইল ছবি (আপনার ছবি)' : 'Profile Photo (Your Picture)'}
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/40 shrink-0">
                    <img
                      src={profileForm.avatarUrl || '/assets/profile.jpg'}
                      alt="Profile Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isBn ? 'কম্পিউটার/ফোন থেকে আপলোড' : 'Upload from Device'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const res = ev.target?.result as string;
                              if (res) {
                                setProfileForm({ ...profileForm, avatarUrl: res });
                              }
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setProfileForm({ ...profileForm, avatarUrl: 'https://i.postimg.cc/Qt7H1VzC/Chat-GPT-Image-Sep-22-2026-01-02-05-PM.png' })}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs border border-slate-800"
                      >
                        {isBn ? 'ডিফল্ট ছবি' : 'Reset'}
                      </button>
                    </div>
                    <input
                      type="url"
                      placeholder="বা ছবির সরাসরি লিংক পেস্ট করুন..."
                      value={profileForm.avatarUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'নাম (English)' : 'Name (EN)'}
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'নাম (বাংলা)' : 'Name (BN)'}
                  </label>
                  <input
                    type="text"
                    value={profileForm.nameBn}
                    onChange={(e) => setProfileForm({ ...profileForm, nameBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  {isBn ? 'ট্যাগলাইন / উপাধি' : 'Professional Tagline'}
                </label>
                <input
                  type="text"
                  value={profileForm.taglineBn}
                  onChange={(e) => setProfileForm({ ...profileForm, taglineBn: e.target.value })}
                  placeholder="গ্রাফিক ডিজাইনার ও প্রফেশনাল ভিডিও এডিটর"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500 mb-2"
                />
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  placeholder="Graphic Designer & Professional Video Editor"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  {isBn ? 'বায়ো / সংক্ষিপ্ত বিবরণ (বাংলা)' : 'Bio Summary (BN)'}
                </label>
                <textarea
                  rows={3}
                  value={profileForm.bioBn}
                  onChange={(e) => setProfileForm({ ...profileForm, bioBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'প্রাইমারি ইমেইল (১ম)' : 'Primary Email (1st)'}
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'বিকল্প ইমেইল (২য়)' : 'Alternative Email (2nd)'}
                  </label>
                  <input
                    type="email"
                    value={profileForm.secondaryEmail}
                    onChange={(e) => setProfileForm({ ...profileForm, secondaryEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  {isBn ? 'ফোন ও হোয়াটসঅ্যাপ নম্বর' : 'Phone & WhatsApp Number'}
                </label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value, whatsapp: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Stats row */}
              <div className="pt-2 border-t border-slate-800">
                <span className="block text-slate-400 font-bold mb-2 text-xs uppercase tracking-wider">
                  {isBn ? 'পরিসংখ্যান ও মেট্রিক্স' : 'Key Statistics'}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">
                      {isBn ? 'কাজের অভিজ্ঞতা (যেমন 4+)' : 'Experience (Years)'}
                    </label>
                    <input
                      type="text"
                      value={profileForm.experienceYears}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, experienceYears: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">
                      {isBn ? 'সম্পন্ন প্রজেক্ট (যেমন 350+)' : 'Completed Projects'}
                    </label>
                    <input
                      type="text"
                      value={profileForm.projectsCompleted}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, projectsCompleted: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">
                      {isBn ? 'মোট ভিউজ (যেমন 45M+)' : 'Views Generated'}
                    </label>
                    <input
                      type="text"
                      value={profileForm.viewsGenerated}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, viewsGenerated: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">
                      {isBn ? 'ক্লায়েন্ট স্যাটিসফেকশন' : 'Satisfaction'}
                    </label>
                    <input
                      type="text"
                      value={profileForm.satisfiedClients}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, satisfiedClients: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{isBn ? 'প্রোফাইল আপডেট সংরক্ষণ করুন' : 'Save Profile Changes'}</span>
              </button>
            </form>
          )}

          {activeTab === 'showreel' && (
            <form onSubmit={handleSaveShowreel} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="font-bold text-slate-200 block flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-red-500 fill-current" />
                  {isBn ? 'শোরিল ভিডিও লিংক (YouTube বা MP4):' : 'Showreel Video Link (YouTube or MP4):'}
                </span>
                <p>
                  {isBn
                    ? 'আপনার ইউটিউব চ্যানেলের শোরিল ভিডিওর লিংক (বা যেকোনো MP4 ভিডিও লিংক) এখানে পেস্ট করুন। ক্লায়েন্টরা ক্লিক করলে সরাসরি প্লে হবে।'
                    : 'Paste any YouTube video link or direct MP4 link. It plays in full HD inside the showreel modal.'}
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  {isBn ? 'শোরিল ভিডিওর URL (YouTube অথবা .mp4)' : 'Showreel URL (YouTube or .mp4)'}
                </label>
                <input
                  type="url"
                  required
                  value={showreelForm.showreelUrl}
                  onChange={(e) => setShowreelForm({ ...showreelForm, showreelUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... বা MP4 লিংক"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'শোরিলের টাইটেল' : 'Reel Title'}
                  </label>
                  <input
                    type="text"
                    value={showreelForm.showreelTitle}
                    onChange={(e) =>
                      setShowreelForm({ ...showreelForm, showreelTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'ভিডিও ডিউরেশন' : 'Duration (e.g. 01:45)'}
                  </label>
                  <input
                    type="text"
                    value={showreelForm.showreelDuration}
                    onChange={(e) =>
                      setShowreelForm({ ...showreelForm, showreelDuration: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{isBn ? 'শোরিল সেটিং সেভ করুন' : 'Update Showreel'}</span>
              </button>
            </form>
          )}

          {activeTab === 'addProject' && (
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'প্রজেক্ট নাম (English)' : 'Project Title (EN)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Cyberpunk Tech Ad"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'প্রজেক্ট নাম (বাংলা)' : 'Project Title (BN)'}
                  </label>
                  <input
                    type="text"
                    value={newProject.titleBn}
                    onChange={(e) => setNewProject({ ...newProject, titleBn: e.target.value })}
                    placeholder="সিনেমাটিক টেক কমার্শিয়াল"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        category: e.target.value as Project['category'],
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="video">{isBn ? 'ভিডিও এডিটিং' : 'Video Editing'}</option>
                    <option value="design">{isBn ? 'গ্রাফিক ডিজাইন' : 'Graphic Design'}</option>
                    <option value="branding">{isBn ? 'ব্র্যান্ড আইডেন্টিটি' : 'Brand Identity'}</option>
                    <option value="motion">{isBn ? 'মোশন গ্রাফিক্স' : 'Motion Graphics'}</option>
                    <option value="thumbnails">{isBn ? 'ইউটিউব থাম্বনেইল' : 'YouTube Thumbnails'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    {isBn ? 'ক্লায়েন্ট' : 'Client Name'}
                  </label>
                  <input
                    type="text"
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    placeholder="e.g. AeroWave Tech"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  {isBn ? 'থাম্বনেইল ইমেজ URL' : 'Thumbnail Image URL'} *
                </label>
                <input
                  type="url"
                  required
                  value={newProject.thumbnail}
                  onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs flex items-center justify-between">
                  <span>{isBn ? 'ভিডিও লিংক (YouTube / MP4)' : 'Video URL (YouTube or MP4)'}</span>
                  <span className="text-[10px] text-red-400 flex items-center gap-1 font-normal">
                    <Youtube className="w-3 h-3 fill-current" />
                    {isBn ? 'ইউটিউব লিংক সাপোর্ট করে' : 'YouTube supported'}
                  </span>
                </label>
                <input
                  type="url"
                  value={newProject.videoUrl}
                  onChange={(e) => {
                    const url = e.target.value;
                    const meta = parseVideoUrl(url);
                    setNewProject((prev) => ({
                      ...prev,
                      videoUrl: url,
                      // If it's a YouTube link and user hasn't set custom thumbnail yet or has default, set thumbnail automatically
                      thumbnail: meta.thumbnailUrl || prev.thumbnail,
                    }));
                  }}
                  placeholder="https://www.youtube.com/watch?v=... বা https://youtu.be/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  {isBn
                    ? 'ইউটিউব লিংক পেস্ট করলে ভিডিও থাম্বনেইল স্বয়ংক্রিয়ভাবে ডিটেক্ট হয়ে যাবে।'
                    : 'Pasting a YouTube link automatically pulls the high-res thumbnail.'}
                </p>
              </div>

              {/* Before/After option */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-amber-300 block">
                  {isBn ? 'কালার গ্রেডিং তুলনা (Before / After স্লাইডার)' : 'Before / After Slider Comparison (Optional)'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="url"
                    value={newProject.beforeImage}
                    onChange={(e) => setNewProject({ ...newProject, beforeImage: e.target.value })}
                    placeholder="Before Image URL (Log)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-[11px]"
                  />
                  <input
                    type="url"
                    value={newProject.afterImage}
                    onChange={(e) => setNewProject({ ...newProject, afterImage: e.target.value })}
                    placeholder="After Image URL (Graded)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  {isBn ? 'ব্যবহৃত সফটওয়্যার (কমা দিয়ে আলাদা করুন)' : 'Software Used (comma-separated)'}
                </label>
                <input
                  type="text"
                  value={newProject.software}
                  onChange={(e) => setNewProject({ ...newProject, software: e.target.value })}
                  placeholder="Premiere Pro, DaVinci Resolve, Photoshop"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  {isBn ? 'প্রজেক্ট বিবরণ (বাংলা)' : 'Project Description (BN)'}
                </label>
                <textarea
                  rows={2}
                  value={newProject.overviewBn}
                  onChange={(e) => setNewProject({ ...newProject, overviewBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{isBn ? 'পোর্টফোলিওতে যোগ করুন' : 'Add Project to Showcase'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Bottom Utility Bar (Export & Reset) */}
        <div className="p-4 border-t border-slate-800 bg-[#0c111e] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-medium transition-colors"
            title="Reset to default initial data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isBn ? 'রিসেট' : 'Reset'}</span>
          </button>

          <button
            onClick={exportDataAsJson}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-all"
            title="Download your customized configuration as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isBn ? 'কনফিগ JSON ডাউনলোড' : 'Export JSON'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
