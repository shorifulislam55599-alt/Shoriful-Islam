import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Youtube,
  Plus,
  Play,
  Film,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Info,
  Clock,
  Trash2,
  Sliders,
  Check,
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { parseVideoUrl, getAutoThumbnail } from '../utils/videoHelpers';

export const YouTubeAddModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { language, addProject, data, deleteProject, setSelectedProject } = usePortfolio();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'add' | 'list'>('add');
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [category, setCategory] = useState<Project['category']>('video');
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('');
  const [overview, setOverview] = useState('');
  const [overviewBn, setOverviewBn] = useState('');
  const [customThumbnail, setCustomThumbnail] = useState('');
  const [software, setSoftware] = useState('Adobe Premiere Pro, After Effects');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Auto-detect YouTube thumbnail when URL changes
  const videoMeta = parseVideoUrl(videoUrl);
  const detectedThumb = videoMeta.thumbnailUrl;
  const effectiveThumb = customThumbnail.trim() || detectedThumb || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const categoryLabels: Record<string, { en: string; bn: string }> = {
      video: { en: 'Video Editing', bn: 'ভিডিও এডিটিং' },
      motion: { en: 'Motion Graphics', bn: 'মোশন গ্রাফিক্স' },
      thumbnails: { en: 'YouTube Thumbnails', bn: 'ইউটিউব থাম্বনেইল' },
      design: { en: 'Graphic & Visuals', bn: 'গ্রাফিক ডিজাইন' },
      branding: { en: 'Brand Identity', bn: 'ব্র্যান্ড আইডেন্টিটি' },
    };

    const newProject: Project = {
      id: `yt-proj-${Date.now()}`,
      title: title.trim(),
      titleBn: titleBn.trim() || title.trim(),
      category,
      categoryLabel: categoryLabels[category]?.en || 'YouTube Video',
      categoryLabelBn: categoryLabels[category]?.bn || 'ইউটিউব ভিডিও',
      client: client.trim() || (isBn ? 'ইউটিউব চ্যানেল / ক্লায়েন্ট' : 'YouTube Channel / Client'),
      duration: duration.trim() || undefined,
      year: new Date().getFullYear().toString(),
      featured: true,
      thumbnail: effectiveThumb,
      videoUrl: videoUrl.trim() || undefined,
      isVideo: true,
      overview: overview.trim() || 'Professional high-retention video edit produced for YouTube audience.',
      overviewBn: overviewBn.trim() || 'ইউটিউব চ্যানেলের জন্য আকর্ষণীয় এডিটিং, সাউন্ড ডিজাইন ও কালার গ্রেড সমৃদ্ধ প্রজেক্ট।',
      software: software.split(',').map((s) => s.trim()).filter(Boolean),
    };

    addProject(newProject);
    setSuccessMsg(isBn ? 'ভিডিও সফলভাবে পোর্টফোলিওতে যুক্ত হয়েছে!' : 'Video successfully added to your portfolio!');

    // Reset fields
    setVideoUrl('');
    setTitle('');
    setTitleBn('');
    setClient('');
    setDuration('');
    setOverview('');
    setOverviewBn('');
    setCustomThumbnail('');

    setTimeout(() => {
      setSuccessMsg('');
      setActiveTab('list');
    }, 1200);
  };

  // Quick preset sample youtube videos for immediate testing if user doesn't have link ready
  const setQuickExample = (exUrl: string, exTitle: string, exTitleBn: string, exDur: string) => {
    setVideoUrl(exUrl);
    setTitle(exTitle);
    setTitleBn(exTitleBn);
    setDuration(exDur);
  };

  const videoProjects = data.projects.filter((p) => p.isVideo || p.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0d121f] border border-sky-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <Youtube className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-headline font-bold text-slate-100 flex items-center gap-2">
                <span>{isBn ? 'ইউটিউব ভিডিও যোগ করুন' : 'Add YouTube Video to Portfolio'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Live Sync
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'আপনার ইউটিউব চ্যানেলের ভিডিওর লিংক পেস্ট করে পোর্টফোলিওতে সরাসরি যোগ করুন'
                  : 'Paste your YouTube video links to showcase your best edits instantly'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-5 gap-3">
          <button
            onClick={() => setActiveTab('add')}
            className={`py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'add'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? 'নতুন ভিডিও অ্যাড করুন' : 'Add New Video'}</span>
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'list'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>
              {isBn ? `বর্তমান ভিডিওসমূহ (${videoProjects.length})` : `Existing Videos (${videoProjects.length})`}
            </span>
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === 'add' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* How it works guidance card */}
              <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/25 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-bold text-sky-300">
                  <Info className="w-4 h-4 text-sky-400" />
                  <span>{isBn ? 'সহজ ৩টি ধাপ:' : 'How to add your YouTube video:'}</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1 leading-relaxed">
                  <li>
                    {isBn
                      ? 'আপনার ইউটিউব চ্যানেলে যান এবং যে ভিডিওটি পোর্টফোলিওতে দেখাতে চান তার লিংক কপি করুন।'
                      : 'Copy the link of any video from your YouTube channel.'}
                  </li>
                  <li>
                    {isBn
                      ? 'নিচের “ইউটিউব ভিডিও লিংক” বক্সে পেস্ট করুন। সাথে সাথে স্বয়ংক্রিয়ভাবে ভিডিওর থাম্বনেইল চলে আসবে।'
                      : 'Paste the link below. The HD thumbnail is extracted automatically.'}
                  </li>
                  <li>
                    {isBn
                      ? 'একটি নাম দিয়ে “পোর্টফোলিওতে ভিডিও যোগ করুন” চাপুন। ক্লায়েন্টরা ক্লিক করলেই ভিডিও প্লে হবে!'
                      : 'Add a title and click "Add Video". It appears instantly on your live portfolio.'}
                  </li>
                </ol>
              </div>

              {/* YouTube URL input */}
              <div>
                <label className="block text-slate-200 font-semibold mb-1 text-xs">
                  {isBn ? 'ইউটিউব ভিডিওর লিংক (URL) *' : 'YouTube Video URL *'}
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... বা https://youtu.be/..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                  <Youtube className="w-4 h-4 text-red-500 absolute left-3 top-3 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {isBn
                    ? 'সাধারণ ইউটিউব ভিডিও, শর্টস (Shorts), কিংবা আনলিস্টেড ক্লায়েন্ট ভিডিওর লিংক সাপোর্ট করে।'
                    : 'Supports regular YouTube videos, YouTube Shorts, or unlisted portfolio links.'}
                </p>
              </div>

              {/* Live Preview Box if valid YouTube URL */}
              {videoMeta.isYouTube && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2">
                  <div className="flex items-center justify-between text-xs text-sky-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {isBn ? 'স্বয়ংক্রিয় থাম্বনেইল সনাক্ত হয়েছে' : 'Thumbnail Auto-Detected'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {videoMeta.videoId}</span>
                  </div>

                  <div className="aspect-video w-full rounded-lg overflow-hidden relative bg-black border border-slate-800 max-h-48 flex items-center justify-center">
                    <img
                      src={effectiveThumb}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Title Fields (English & Bengali) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-semibold mb-1 text-xs">
                    {isBn ? 'ভিডিও টাইটেল (English) *' : 'Video Title (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Cinematic Tech Review Edit"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 font-semibold mb-1 text-xs">
                    {isBn ? 'ভিডিও টাইটেল (বাংলা)' : 'Video Title (Bengali)'}
                  </label>
                  <input
                    type="text"
                    value={titleBn}
                    onChange={(e) => setTitleBn(e.target.value)}
                    placeholder="যেমন: সিনেমাটিক টেক রিভিউ এডিটিং"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Category & Client & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-200 font-semibold mb-1 text-xs">
                    {isBn ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Project['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                  >
                    <option value="video">{isBn ? 'ভিডিও এডিটিং' : 'Video Editing'}</option>
                    <option value="motion">{isBn ? 'মোশন গ্রাফিক্স' : 'Motion Graphics'}</option>
                    <option value="thumbnails">{isBn ? 'ইউটিউব থাম্বনেইল' : 'YouTube Thumbnails'}</option>
                    <option value="design">{isBn ? 'গ্রাফিক ডিজাইন' : 'Graphic Design'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 font-semibold mb-1 text-xs">
                    {isBn ? 'চ্যানেল বা ক্লায়েন্টের নাম' : 'Client / Channel Name'}
                  </label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Shoriful Studio"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 font-semibold mb-1 text-xs">
                    {isBn ? 'ভিডিও দৈর্ঘ্য (যেমন: 04:20)' : 'Duration (e.g. 04:20)'}
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="05:30"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Overview */}
              <div>
                <label className="block text-slate-200 font-semibold mb-1 text-xs">
                  {isBn ? 'কাজের সংক্ষিপ্ত বিবরণ (বাংলা)' : 'Short Summary (Bangla)'}
                </label>
                <textarea
                  rows={2}
                  value={overviewBn}
                  onChange={(e) => setOverviewBn(e.target.value)}
                  placeholder="ভিডিওতে কি কি কাজ করেছেন: যেমন হুক কাট, সাউন্ড এফেক্টস, কালার গ্রেডিং বা অ্যানিমেটেড সাবটাইটেল..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Software used */}
              <div>
                <label className="block text-slate-200 font-semibold mb-1 text-xs">
                  {isBn ? 'ব্যবহৃত সফটওয়্যার' : 'Software Used'}
                </label>
                <input
                  type="text"
                  value={software}
                  onChange={(e) => setSoftware(e.target.value)}
                  placeholder="Adobe Premiere Pro, After Effects, Photoshop"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-sky-500 hover:from-red-500 hover:to-sky-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all cursor-pointer"
              >
                <Youtube className="w-4 h-4 fill-current" />
                <span>{isBn ? 'পোর্টফোলিওতে ভিডিও যোগ করুন' : 'Add Video to Portfolio'}</span>
              </button>
            </form>
          ) : (
            /* Tab 2: Existing Video Projects List with Delete & Preview */
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'আপনার বর্তমান ভিডিও প্রজেক্ট তালিকা। যেকোনো ভিডিও প্রিভিউ করতে পারেন বা অপ্রয়োজনীয় ভিডিও রিমুভ করতে পারেন:'
                  : 'Manage current video showcase items. Click to preview or remove:'}
              </p>

              <div className="space-y-2.5">
                {videoProjects.map((p) => {
                  const pMeta = parseVideoUrl(p.videoUrl);
                  return (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                    >
                      <div
                        onClick={() => {
                          setSelectedProject(p);
                          onClose();
                        }}
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                      >
                        <div className="w-16 h-10 rounded-lg overflow-hidden bg-black shrink-0 relative border border-slate-800">
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-3.5 h-3.5 text-white fill-current" />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-200 truncate">
                              {isBn ? p.titleBn : p.title}
                            </span>
                            {pMeta.isYouTube && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                                YouTube
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {p.client} {p.duration ? `• ${p.duration}` : ''}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {p.videoUrl && (
                          <a
                            href={p.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-sky-400 transition-colors"
                            title="Open link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => deleteProject(p.id)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                          title={isBn ? 'ভিডিও মুছুন' : 'Delete Video'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isBn ? 'সব পরিবর্তন স্বয়ংক্রিয়ভাবে ব্রাউজারে সেভ থাকে' : 'Auto-saved locally'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            {isBn ? 'বন্ধ করুন' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
