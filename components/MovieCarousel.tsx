'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Movie } from '@/lib/types';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
  icon?: LucideIcon;
  subtitle?: string;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  movies,
  viewAllLink,
  icon: Icon,
  subtitle,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative my-8 sm:my-12">
      {/* Section Header */}
      <div className="mb-4 flex items-end justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-kinopurple-primary" />}
            <h2 className="font-heading text-xl sm:text-2xl font-black text-white tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && <p className="text-xs text-kinotext-muted mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="hidden sm:inline-flex text-xs font-semibold text-kinopurple-secondary hover:text-white transition mr-3"
            >
              Barchasini ko'rish →
            </Link>
          )}

          <button
            onClick={() => scroll('left')}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-kinodark-border bg-kinodark-surface text-kinotext-muted hover:border-kinopurple-primary/50 hover:text-white transition"
            aria-label="Oldingi filmlar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-kinodark-border bg-kinodark-surface text-kinotext-muted hover:border-kinopurple-primary/50 hover:text-white transition"
            aria-label="Keyingi filmlar"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Row */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 pt-1 no-scrollbar scroll-smooth"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-[160px] sm:w-[190px] md:w-[220px] flex-shrink-0"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieCarousel;
