import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCategory, Project } from '../types/portfolio';
import {
  Briefcase,
  Play,
  Sparkles,
  ArrowUpRight,
  Eye,
  Film,
  Layers,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Palette,
  TrendingUp,
  Cpu,
  ChevronRight,
  Zap,
  Volume2,
  Youtube,
  Plus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { YouTubeAddModal } from './YouTubeAddModal';
import { parseVideoUrl } from '../utils/videoHelpers';

export const WorkSection: React.FC = () => {
  const { data, language, setSelectedProject } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
  const [litCards, setLitCards] = useState<Record<string, boolean>>({
    'proj-yt-nasif-sir': true,
  });
  const [isGlobalLightOn, setIsGlobalLightOn] = useState(false);
  const isBn = language === 'bn';

  // Toggle light on click
  const toggleLight = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLitCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllLights = () => {
    const nextState = !isGlobalLightOn;
    setIsGlobalLightOn(nextState);
    const updated: Record<string, boolean> = {};
    if (nextState) {
      data.projects.forEach((p) => (updated[p.id] = true));
    }
    setLitCards(updated);
  };

  const categories: { id: ProjectCategory; label: string; labelBn: string }[] = [
    { id: 'all', label: 'All Projects', labelBn: 'সকল প্রজেক্ট' },
    { id: 'video', label: 'Video Editing', labelBn: 'ভিডিও এডিটিং' },
    { id: 'design', label: 'Graphic Design', labelBn: 'গ্রাফিক ডিজাইন' },
    { id: 'branding', label: 'Brand Identity', labelBn: 'ব্র্যান্ড আইডেন্টিটি' },
    { id: 'motion', label: 'Motion Graphics', labelBn: 'মোশন গ্রাফিক্স' },
    { id: 'thumbnails', label: 'Thumbnails', labelBn: 'থাম্বনেইল' },
    { id: 'meta', label: 'Meta Marketing', labelBn: 'মেটা মার্কেটিং' },
    { id: 'ai', label: 'AI Visuals', labelBn: 'এআই ক্রিয়েটিভ' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? data.projects
      : data.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-20 sm:py-28 relative bg-[#090d16] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{isBn ? 'আমার কাজ ও প্রজেক্ট' : 'Selected Work & Workflow'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-slate-100 tracking-tight">
              {isBn ? (
                <>
                  আমার নির্বাচিত{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                    ভিডিও ও কাজের শোকেস
                  </span>
                </>
              ) : (
                <>
                  Featured Video &{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                    Creative Portfolio
                  </span>
                </>
              )}
            </h2>

            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              {isBn
                ? 'ভিডিও বা প্রজেক্ট কার্ডে ক্লিক করে বিস্তারিত এবং ফুল ভিডিও প্লে করুন।'
                : 'Click any project card to view details, watch videos, and explore creative deliverables.'}
            </p>
          </motion.div>

          {/* Interactive Controls (Add YouTube Video + Light Master Switch) */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Add YouTube Video Button */}
            <button
              onClick={() => setIsYouTubeModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-500/25 border border-red-500/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Youtube className="w-4 h-4 fill-current text-white" />
              <span>{isBn ? 'ইউটিউব ভিডিও যোগ করুন' : 'Add YouTube Video'}</span>
              <Plus className="w-3.5 h-3.5 ml-0.5" />
            </button>

            {/* Interactive Light Bulb Master Switch */}
            <button
              onClick={toggleAllLights}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-300 border ${
                isGlobalLightOn
                  ? 'bg-sky-400/20 text-sky-300 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
              title={isBn ? 'সব বাতি অন বা অফ করুন' : 'Toggle All Lights'}
            >
              <Lightbulb className={`w-4 h-4 ${isGlobalLightOn ? 'text-sky-400 fill-sky-400 animate-pulse' : ''}`} />
              <span className="hidden sm:inline">
                {isGlobalLightOn ? (isBn ? 'সব বাতি অন' : 'All Lights ON') : (isBn ? 'সব বাতি জ্বালান' : 'Light Up All')}
              </span>
            </button>
          </div>
        </div>

        {/* PROJECTS SHOWCASE */}
        <div>
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold border-sky-400 shadow-md shadow-sky-500/20 scale-105'
                      : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {isBn ? cat.labelBn : cat.label}
                </button>
              );
            })}
          </div>

          {/* Projects Grid with Interactive Light-Up Stroke */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, idx) => {
                  const isLit = Boolean(litCards[project.id]);

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      onClick={() => setSelectedProject(project)}
                      className={`group relative rounded-3xl overflow-hidden bg-slate-900/70 cursor-pointer transition-all duration-300 border ${
                        isLit
                          ? 'border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.45)] ring-2 ring-sky-400/90'
                          : 'border-slate-800/80 hover:border-slate-700 hover:shadow-xl'
                      }`}
                    >
                      {/* Interactive Light Bulb Click Trigger */}
                      <button
                        onClick={(e) => toggleLight(project.id, e)}
                        className={`absolute top-3.5 right-3.5 z-20 p-2 rounded-xl backdrop-blur-md border transition-all duration-300 flex items-center gap-1.5 text-[11px] font-bold ${
                          isLit
                            ? 'bg-sky-400 text-slate-950 border-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.8)]'
                            : 'bg-slate-950/70 text-slate-400 border-slate-700/60 hover:text-sky-400'
                        }`}
                        title={isBn ? 'বাতি অন/অফ করতে ক্লিক করুন' : 'Click to light up'}
                      >
                        <Lightbulb className={`w-3.5 h-3.5 ${isLit ? 'fill-slate-950 text-slate-950' : ''}`} />
                        <span>{isLit ? (isBn ? 'বাতি অন' : 'ON') : (isBn ? 'বাতি' : 'Light')}</span>
                      </button>

                      {/* Thumbnail Container with Gradient Overlay */}
                      <div className="relative aspect-video overflow-hidden bg-slate-950">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Category Badge & YouTube indicator */}
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-sky-300 text-xs font-semibold border border-sky-500/30 backdrop-blur-md">
                            {isBn ? project.categoryLabelBn : project.categoryLabel}
                          </span>
                          {project.videoUrl && parseVideoUrl(project.videoUrl).isYouTube && (
                            <span className="px-2 py-0.5 rounded-lg bg-red-600/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                              <Youtube className="w-3 h-3 fill-current" />
                              <span>YouTube</span>
                            </span>
                          )}
                        </div>

                        {/* Center Action Overlay Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shadow-lg shadow-sky-500/30 transform group-hover:scale-110 transition-transform">
                            {project.isVideo ? (
                              <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Project Info Strip */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-headline font-bold text-base text-slate-100 group-hover:text-sky-300 transition-colors line-clamp-1">
                            {isBn ? project.titleBn : project.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>

                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                          {isBn ? project.overviewBn : project.overview}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-medium">{project.client}</span>
                          <span className="text-sky-400 font-semibold">{project.year}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
        </div>
      </div>

      {/* YouTube Video Quick Add Modal */}
      <YouTubeAddModal
        isOpen={isYouTubeModalOpen}
        onClose={() => setIsYouTubeModalOpen(false)}
      />
    </section>
  );
};
