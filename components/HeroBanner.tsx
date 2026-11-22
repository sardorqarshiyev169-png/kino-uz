'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Movie } from '@/lib/types';
import { useStore } from '@/lib/store';
import {
  Play,
  Film,
  Star,
  Calendar,
  Clock,
  Bookmark,
  Heart,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

interface HeroBannerProps {
  movies: Movie[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ movies }) => {
  const { openTrailer, toggleFavorite, isFavorite, toggleWatchlist, isWatchlist } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    if (!movies || movies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];
  const isFav = isFavorite(currentMovie.id);
  const isSaved = isWatchlist(currentMovie.id);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[680px] lg:h-[760px] overflow-hidden select-none">
      {/* Background Backdrop Image with Gradient Overlays */}
      <div className="absolute inset-0">
        <img
          src={currentMovie.backdrop_path}
          alt={currentMovie.title}
          className="h-full w-full object-cover object-center filter brightness-[0.78] transition-all duration-700 ease-in-out scale-105"
        />
        {/* Purple and Dark Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0912] via-[#0B0912]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0912] via-[#0B0912]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-purple-radial pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          {/* Badges: Rating, Year, Media Type, Tagline */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-amber-400 border border-amber-500/30">
              <Star className="h-3.5 w-3.5 fill-current" />
              {currentMovie.vote_average.toFixed(1)} / 10
            </span>

            <span className="flex items-center gap-1 rounded-full bg-kinodark-surface/80 px-3 py-1 text-kinotext-main border border-kinodark-border">
              <Calendar className="h-3.5 w-3.5 text-kinopurple-secondary" />
              {currentMovie.release_date.substring(0, 4)}
            </span>

            {currentMovie.runtime && (
              <span className="flex items-center gap-1 rounded-full bg-kinodark-surface/80 px-3 py-1 text-kinotext-main border border-kinodark-border">
                <Clock className="h-3.5 w-3.5 text-kinopurple-secondary" />
                {currentMovie.runtime} daqiqa
              </span>
            )}

            <span className="rounded-full bg-kinopurple-primary/20 px-3 py-1 text-kinopurple-secondary border border-kinopurple-primary/40 uppercase tracking-wider text-[11px]">
              {currentMovie.media_type === 'tv'
                ? 'Serial'
                : currentMovie.media_type === 'anime'
                ? 'Anime'
                : 'Kino film'}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md leading-tight">
            {currentMovie.title}
          </h1>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 text-xs">
            {currentMovie.genres.slice(0, 4).map((g, idx) => {
              const genreName = typeof g === 'string' ? g : g.name;
              return (
                <span
                  key={idx}
                  className="rounded-lg bg-kinodark-surface/60 px-2.5 py-1 text-kinotext-muted border border-kinodark-border/60"
                >
                  {genreName}
                </span>
              );
            })}
          </div>

          {/* Overview in Uzbek */}
          <p className="line-clamp-3 text-sm sm:text-base text-kinotext-muted leading-relaxed drop-shadow">
            {currentMovie.uz_overview || currentMovie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {/* Watch / Explore Button */}
            <Link
              href={`/movie/${currentMovie.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-kinopurple-primary/30 hover:brightness-110 transition duration-200"
            >
              <Play className="h-4 w-4 fill-current" />
              Tomosha qilish
            </Link>

            {/* Watch Trailer Button */}
            {currentMovie.trailer_key && (
              <button
                onClick={() => openTrailer(currentMovie.trailer_key!)}
                className="inline-flex items-center gap-2 rounded-xl border border-kinodark-border bg-kinodark-surface/80 px-5 py-3 text-sm font-semibold text-kinotext-main hover:bg-kinodark-surface hover:border-kinopurple-primary/50 transition duration-200 backdrop-blur-sm"
              >
                <Film className="h-4 w-4 text-kinopurple-secondary" />
                Treylerni ko'rish
              </button>
            )}

            {/* Bookmark button */}
            <button
              onClick={() => toggleWatchlist(currentMovie.id)}
              className={`rounded-xl border p-3 transition ${
                isSaved
                  ? 'border-kinopurple-primary bg-kinopurple-primary text-white shadow-glow-purple'
                  : 'border-kinodark-border bg-kinodark-surface/80 text-kinotext-muted hover:text-white'
              }`}
              title="Tomosha ro'yxatiga qo'shish"
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(currentMovie.id)}
              className={`rounded-xl border p-3 transition ${
                isFav
                  ? 'border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-500/30'
                  : 'border-kinodark-border bg-kinodark-surface/80 text-kinotext-muted hover:text-rose-400'
              }`}
              title="Sevimlilarga qo'shish"
            >
              <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Chevron Controls & Dots */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="rounded-full border border-kinodark-border bg-kinodark-card/70 p-2 text-kinotext-muted hover:bg-kinodark-surface hover:text-white backdrop-blur-md transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1.5">
          {movies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 bg-kinopurple-primary shadow-glow-purple'
                  : 'w-2 bg-kinodark-border hover:bg-kinotext-muted'
              }`}
              aria-label={`Slayd ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="rounded-full border border-kinodark-border bg-kinodark-card/70 p-2 text-kinotext-muted hover:bg-kinodark-surface hover:text-white backdrop-blur-md transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
