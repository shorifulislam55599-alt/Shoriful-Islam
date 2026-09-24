import React, { useState, useRef } from 'react';
import { Sliders } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW / LOG',
  afterLabel = 'GRADED / POLISHED',
  aspectRatio = 'aspect-video',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-700/60 shadow-lg bg-black`}
    >
      {/* After Image (Full background) */}
      <img
        src={afterImage}
        alt="After color grade and polish"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before raw log footage"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
        />
      </div>

      {/* Divider Bar */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)] pointer-events-none z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Knob */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl border-2 border-white pointer-events-none">
          <Sliders className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none">
        <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-slate-200 border border-white/10 uppercase tracking-wider">
          {beforeLabel}
        </span>
      </div>

      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <span className="px-2.5 py-1 rounded bg-amber-500/90 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-slate-950 uppercase tracking-wider">
          {afterLabel}
        </span>
      </div>

      {/* Helper caption */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-slate-300 font-sans">
          ↔ স্লাইডার টেনে পার্থক্য দেখুন
        </span>
      </div>
    </div>
  );
};
