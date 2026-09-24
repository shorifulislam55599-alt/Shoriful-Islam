import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, CheckCircle, Youtube } from 'lucide-react';
import { parseVideoUrl } from '../utils/videoHelpers';

export const ShowreelModal: React.FC = () => {
  const { data, language, activeShowreel, setActiveShowreel } = usePortfolio();
  const { profile } = data;
  const isBn = language === 'bn';

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveShowreel(false);
      }
    };
    if (activeShowreel) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeShowreel, setActiveShowreel]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const targetPercent = parseFloat(e.target.value);
    const duration = videoRef.current.duration || 1;
    videoRef.current.currentTime = (targetPercent / 100) * duration;
    setProgress(targetPercent);
  };

  if (!activeShowreel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                {profile.showreelTitle}
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                  4K 60FPS
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'সিনেমাটিক ভিডিও এডিটিং, কালার গ্রেড এবং মোশন গ্রাফিক্সের সংকলন'
                  : 'Compilation of commercial edits, color grading, and dynamic motion'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveShowreel(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        {(() => {
          const videoMeta = parseVideoUrl(profile.showreelUrl);
          if (videoMeta.isYouTube || videoMeta.isVimeo) {
            return (
              <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
                <iframe
                  src={videoMeta.embedUrl}
                  title={profile.showreelTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            );
          }
          return (
            <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src={profile.showreelUrl}
                autoPlay
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Center Play indicator on pause */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Bottom video controls */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/70 to-transparent space-y-2">
                {/* Timeline slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="font-mono text-[11px] text-slate-300">{profile.showreelDuration}</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
                    <span>DaVinci Resolve Color</span>
                    <span>•</span>
                    <span>Sound Mixed (-14 LUFS)</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Footer Info & Quick Tip for replacing with user's own video */}
        <div className="p-4 bg-[#0c111e] border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {isBn
                ? 'টিপস: এই শোরিলটি আপনি "কাস্টমাইজ করুন" বাটনে ক্লিক করে আপনার ইউটিউব বা গুগল ড্রাইভ ভিডিও লিংকে পরিবর্তন করতে পারেন।'
                : 'Tip: You can replace this reel link with your own YouTube/Drive MP4 via "Edit Mode".'}
            </span>
          </div>

          <a
            href="#contact"
            onClick={() => setActiveShowreel(false)}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shrink-0 transition-colors"
          >
            {isBn ? 'এই স্টাইলে ভিডিও বানাতে যোগাযোগ করুন' : 'Request Similar Video'}
          </a>
        </div>
      </div>
    </div>
  );
};
