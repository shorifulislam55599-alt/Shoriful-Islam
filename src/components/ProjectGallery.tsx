import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCategory, Project } from '../types/portfolio';
import { Play, Sparkles, Filter, Plus, ArrowUpRight, Eye, Film, Image as ImageIcon, Sliders } from 'lucide-react';

export const ProjectGallery: React.FC = () => {
  const { data, language, setSelectedProject, setIsCustomizerOpen } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const isBn = language === 'bn';

  const categories: { id: ProjectCategory; label: string; labelBn: string; count: number }[] = [
    {
      id: 'all',
      label: 'All Selected Work',
      labelBn: 'সকল প্রজেক্ট',
      count: data.projects.length,
    },
    {
      id: 'video',
      label: 'Video Editing',
      labelBn: 'ভিডিও এডিটিং',
      count: data.projects.filter((p) => p.category === 'video').length,
    },
    {
      id: 'design',
      label: 'Graphic & Visuals',
      labelBn: 'গ্রাফিক ডিজাইন',
      count: data.projects.filter((p) => p.category === 'design').length,
    },
    {
      id: 'branding',
      label: 'Brand Identity',
      labelBn: 'ব্র্যান্ড আইডেন্টিটি',
      count: data.projects.filter((p) => p.category === 'branding').length,
    },
    {
      id: 'motion',
      label: 'Motion Graphics & VFX',
      labelBn: 'মোশন ও ভিএফএক্স',
      count: data.projects.filter((p) => p.category === 'motion').length,
    },
    {
      id: 'thumbnails',
      label: 'YouTube Thumbnails',
      labelBn: 'ইউটিউব থাম্বনেইল',
      count: data.projects.filter((p) => p.category === 'thumbnails').length,
    },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? data.projects
      : data.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'বাছাইকৃত কাজসমূহ' : 'Featured Showcase'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-100 tracking-tight">
              {isBn ? 'পোর্টফোলিও ও ক্রিয়েটিভ প্রজেক্টস' : 'Portfolio & Selected Works'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-2">
              {isBn
                ? 'ভিডিও এডিটিং, সিনেমাটিক কালার গ্রেড, মোশন গ্রাফিক্স ও ব্র্যান্ড আইডেন্টিটির সমন্বয়।'
                : 'A curated selection of high-retention video cuts, cinematic color grading, and commercial brand designs.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all hover:text-amber-400"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'নতুন প্রজেক্ট যোগ করুন' : 'Add Project'}</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{isBn ? cat.labelBn : cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-slate-950/30 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c101d] border border-slate-800/90 hover:border-amber-500/40 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Thumbnail Media Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Badges on Top */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/20 uppercase tracking-wider">
                    {isBn ? project.categoryLabelBn : project.categoryLabel}
                  </span>

                  {project.duration && (
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono font-medium text-slate-200 border border-white/10 flex items-center gap-1">
                      <Film className="w-3 h-3 text-rose-400" />
                      {project.duration}
                    </span>
                  )}
                </div>

                {/* Center Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    {project.isVideo ? (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    ) : project.beforeImage ? (
                      <Sliders className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Before/After Tag Indicator */}
                {project.beforeImage && (
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <span className="px-2 py-0.5 rounded bg-rose-500/90 text-[10px] font-bold text-white shadow">
                      Before / After
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="font-medium text-slate-300">{project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {isBn ? project.titleBn : project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {isBn ? project.overviewBn : project.overview}
                  </p>
                </div>

                {/* Software tags & footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.software.slice(0, 3).map((soft) => (
                      <span
                        key={soft}
                        className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium"
                      >
                        {soft}
                      </span>
                    ))}
                    {project.software.length > 3 && (
                      <span className="text-[10px] text-slate-500 self-center">
                        +{project.software.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="text-amber-400 group-hover:translate-x-0.5 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
