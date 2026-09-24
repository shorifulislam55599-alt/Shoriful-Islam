import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types/portfolio';
import {
  Film,
  Palette,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Eye,
  Pause,
  ArrowUpRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ShowcaseCategory = 'all' | 'video' | 'design' | 'meta';

export const ShowcaseCarousel: React.FC = () => {
  const { data, language, setSelectedProject, setActiveShowreel } = usePortfolio();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<ShowcaseCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter projects relevant to the primary 3 disciplines: Video, Design, Meta Marketing
  const showcaseProjects = data.projects.filter((p) => {
    if (activeTab === 'all') {
      return p.category === 'video' || p.category === 'design' || p.category === 'meta' || p.category === 'thumbnails';
    }
    if (activeTab === 'video') return p.category === 'video';
    if (activeTab === 'design') return p.category === 'design' || p.category === 'thumbnails';
    if (activeTab === 'meta') return p.category === 'meta';
    return true;
  });

  const totalSlides = showcaseProjects.length;

  // Keep index within bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // Auto-slide effect ("একটার পর একটা এরকম ভাবে আসবে")
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, totalSlides]);

  const handleNext = () => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentProject: Project | undefined = showcaseProjects[currentIndex];

  const getCategoryIcon = (cat: string) => {
    if (cat === 'video') return <Film className="w-4 h-4 text-sky-400" />;
    if (cat === 'meta') return <TrendingUp className="w-4 h-4 text-cyan-400" />;
    return <Palette className="w-4 h-4 text-blue-400" />;
  };

  return (
    <section
      id="showcase"
      aria-label={isBn ? 'ভিডিও এডিটিং, গ্রাফিক ডিজাইন ও মেটা মার্কেটিং শোকেস' : 'Video Editing, Graphic Design & Meta Marketing Showcase'}
      className="py-16 sm:py-24 bg-[#080d1a] relative overflow-hidden border-b border-slate-800/80"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Studio Light Atmosphere */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>{isBn ? 'সবার শীর্ষে প্রিমিয়াম শোকেস' : 'Featured Disciplines Showcase'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-slate-100 tracking-tight">
              {isBn ? (
                <>
                  ভিডিও এডিটিং, গ্রাফিক ডিজাইন ও{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                    মেটা মার্কেটিং
                  </span>
                </>
              ) : (
                <>
                  Video Editing, Graphic Design &{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                    Meta Marketing
                  </span>
                </>
              )}
            </h2>

            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              {isBn
                ? 'মোবাইল ও এসইও ফ্রেন্ডলি ক্যারাউজেল — একটার পর একটা স্বয়ংক্রিয়ভাবে স্লাইড হতে থাকবে।'
                : 'High-retention video cuts, high-CTR visuals, and data-backed Meta ad campaigns in an auto-sliding responsive showcase.'}
            </p>
          </div>

          {/* Category Tabs & Autoplay toggle */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isBn ? 'সব' : 'All'}
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'video'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isBn ? 'ভিডিও এডিটিং' : 'Video'}
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'design'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isBn ? 'গ্রাফিক ডিজাইন' : 'Design'}
              </button>
              <button
                onClick={() => setActiveTab('meta')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'meta'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isBn ? 'মেটা মার্কেটিং' : 'Meta Ads'}
              </button>
            </div>

            {/* Play/Pause Auto-slide button */}
            <button
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={isAutoPlaying ? 'Pause slide rotation' : 'Resume slide rotation'}
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-sky-400 transition-colors"
              title={isAutoPlaying ? (isBn ? 'অটো-স্লাইড পজ করুন' : 'Pause Auto-slide') : (isBn ? 'অটো-স্লাইড চালু করুন' : 'Resume Auto-slide')}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* The Carousel Slider Container */}
        {totalSlides > 0 && currentProject ? (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.article
                key={currentProject.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 rounded-3xl p-4 sm:p-8 border border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden relative"
              >
                {/* Visual Media Column (Interactive Video / Graphic Preview) */}
                <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-800">
                  <img
                    src={currentProject.thumbnail}
                    alt={isBn ? currentProject.titleBn : currentProject.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Play / View Overlay Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProject(currentProject)}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 flex items-center justify-center shadow-xl shadow-sky-500/30 transition-transform transform hover:scale-110 active:scale-95"
                      aria-label={`Open project preview for ${currentProject.title}`}
                    >
                      {currentProject.isVideo ? (
                        <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                      ) : (
                        <Eye className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {/* Quick Discipline Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-semibold text-slate-200">
                    {getCategoryIcon(currentProject.category)}
                    <span>{isBn ? currentProject.categoryLabelBn : currentProject.categoryLabel}</span>
                  </div>

                  {/* Impact Metric Strip */}
                  {currentProject.metrics && (
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800">
                      <span className="text-slate-400">{isBn ? 'রেজাল্ট ও পারফরম্যান্স:' : 'Performance Impact:'}</span>
                      <span className="font-bold text-sky-400">{currentProject.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Information Column */}
                <div className="lg:col-span-5 space-y-4 text-left">
                  {/* Category / Client / Year Metadata without pills */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-sky-400">{currentProject.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentProject.year}</span>
                    {currentProject.duration && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-slate-300">{currentProject.duration}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-headline font-bold text-slate-100 leading-tight">
                    {isBn ? currentProject.titleBn : currentProject.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {isBn ? currentProject.overviewBn : currentProject.overview}
                  </p>

                  {/* Challenge & Solution snippets */}
                  {(currentProject.challenge || currentProject.solution) && (
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs">
                      {currentProject.challenge && (
                        <div className="text-slate-400">
                          <span className="font-semibold text-slate-200">{isBn ? 'চ্যালেঞ্জ: ' : 'Objective: '}</span>
                          {isBn ? currentProject.challengeBn : currentProject.challenge}
                        </div>
                      )}
                      {currentProject.solution && (
                        <div className="text-slate-400">
                          <span className="font-semibold text-sky-400">{isBn ? 'সমাধান: ' : 'Solution: '}</span>
                          {isBn ? currentProject.solutionBn : currentProject.solution}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Software used */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                    <span className="text-slate-500 font-medium">{isBn ? 'ব্যবহৃত টুলস:' : 'Tools:'}</span>
                    {currentProject.software.map((tool, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-800/60 text-slate-300">
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(currentProject)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-sky-500/20 transition-transform active:scale-95"
                    >
                      <span>{isBn ? 'বিস্তারিত ও ফুল প্রিভিউ দেখুন' : 'Inspect Full Project'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <a
                      href="#work"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700/60 transition-colors"
                    >
                      <span>{isBn ? 'সকল প্রজেক্ট দেখুন' : 'View All Works'}</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Carousel Navigation Arrows & Indicators */}
            <div className="flex items-center justify-between mt-6 px-2">
              {/* Slide Counter */}
              <div className="text-xs font-mono text-slate-400">
                <span className="text-sky-400 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="mx-1 text-slate-600">/</span>
                <span>{String(totalSlides).padStart(2, '0')}</span>
              </div>

              {/* Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {showcaseProjects.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === currentIndex ? 'w-6 bg-sky-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500/50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500/50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
