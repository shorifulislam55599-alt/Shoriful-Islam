import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Play, ExternalLink, Sparkles, CheckCircle, Clock, Calendar, Briefcase, Award, Youtube } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { parseVideoUrl } from '../utils/videoHelpers';

export const ProjectDetailModal: React.FC = () => {
  const { selectedProject, setSelectedProject, language } = usePortfolio();
  const isBn = language === 'bn';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, setSelectedProject]);

  if (!selectedProject) return null;

  const project = selectedProject;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {isBn ? project.categoryLabelBn : project.categoryLabel}
              </span>
              {project.metrics && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {project.metrics}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-slate-100">
              {isBn ? project.titleBn : project.title}
            </h2>
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Main Visual / Video / Before-After */}
          <div>
            {project.beforeImage && project.afterImage ? (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isBn ? 'কালার গ্রেডিং ও রিটাচিং তুলনা (Before / After)' : 'Color Grade & Polish Comparison'}</span>
                </div>
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  beforeLabel="RAW / LOG"
                  afterLabel="GRADED"
                />
              </div>
            ) : project.videoUrl ? (
              (() => {
                const videoMeta = parseVideoUrl(project.videoUrl);
                if (videoMeta.isYouTube || videoMeta.isVimeo) {
                  return (
                    <div className="aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl relative">
                      <iframe
                        src={videoMeta.embedUrl}
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                  );
                }
                return (
                  <div className="aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 relative">
                    <video
                      src={project.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                );
              })()
            ) : (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 max-h-[480px]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5">{isBn ? 'ক্লায়েন্ট' : 'Client'}</span>
              <span className="font-semibold text-slate-200">{project.client}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">{isBn ? 'সময়কাল' : 'Year / Duration'}</span>
              <span className="font-semibold text-slate-200">
                {project.year} {project.duration ? `• ${project.duration}` : ''}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 block mb-1">{isBn ? 'ব্যবহৃত সফটওয়্যার' : 'Software Used'}</span>
              <div className="flex flex-wrap gap-1.5">
                {project.software.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-medium text-amber-300 border border-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Overview & Creative Process */}
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-bold text-slate-100 text-base mb-1.5 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>{isBn ? 'প্রজেক্ট বিবরণ' : 'Project Overview'}</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {isBn ? project.overviewBn : project.overview}
              </p>
            </div>

            {project.challenge && (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1">
                <h5 className="font-semibold text-rose-400 text-xs uppercase tracking-wider">
                  {isBn ? 'মূল চ্যালেঞ্জ' : 'The Creative Challenge'}
                </h5>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {isBn ? project.challengeBn || project.challenge : project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1">
                <h5 className="font-semibold text-emerald-400 text-xs uppercase tracking-wider">
                  {isBn ? 'সমাধান ও টেকনিক্যাল এক্সিকিউশন' : 'The Solution & Craft'}
                </h5>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {isBn ? project.solutionBn || project.solution : project.solution}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            {project.videoUrl && parseVideoUrl(project.videoUrl).isYouTube && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold transition-all shadow-sm"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>{isBn ? 'ইউটিউবে সরাসরি দেখুন' : 'Watch on YouTube'}</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            )}
            <p className="text-xs text-slate-400">
              {isBn
                ? 'আপনার প্রজেক্টের জন্যও একই ধরনের গুণগত মান নিশ্চিত করা হবে।'
                : 'Delivering tailored creative execution for your brand or channel.'}
            </p>
          </div>

          <a
            href="#contact"
            onClick={() => setSelectedProject(null)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-md transition-colors"
          >
            {isBn ? 'এই প্রজেক্ট নিয়ে কথা বলুন' : 'Inquire for Similar Project'}
          </a>
        </div>
      </div>
    </div>
  );
};
