'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { X, Play } from 'lucide-react';

export const TrailerModal: React.FC = () => {
  const { activeTrailerKey, closeTrailer } = useStore();

  if (!activeTrailerKey) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={closeTrailer} />

      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-kinodark-border bg-kinodark-card shadow-2xl shadow-kinopurple-primary/20 z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-kinodark-border px-5 py-3.5 bg-kinodark-surface/60">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-kinopurple-primary/20 text-kinopurple-secondary">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <span className="font-heading font-semibold text-kinotext-main text-sm md:text-base">
              Rasmiy Treyler (Official Trailer)
            </span>
          </div>
          <button
            onClick={closeTrailer}
            className="rounded-lg p-1.5 text-kinotext-muted hover:bg-kinodark-surface hover:text-white transition-colors"
            aria-label="Yopish"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 16:9 Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${activeTrailerKey}?autoplay=1&rel=0&modestbranding=1`}
            title="Movie Trailer"
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
