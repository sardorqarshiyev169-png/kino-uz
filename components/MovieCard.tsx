'use client';

import React from 'react';
import Link from 'next/link';
import { Movie } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Star, Play, Heart, Bookmark } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { openTrailer, toggleFavorite, isFavorite, toggleWatchlist, isWatchlist } = useStore();

  const isFav = isFavorite(movie.id);
  const isSaved = isWatchlist(movie.id);

  const primaryGenre =
    movie.genres && movie.genres.length > 0
      ? typeof movie.genres[0] === 'string'
        ? movie.genres[0]
        : movie.genres[0].name
      : '';

  return (
    <div className="group relative flex flex-col rounded-2xl border border-kinodark-border bg-kinodark-card overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-kinopurple-primary/60 hover:shadow-glow-purple">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-kinodark-surface">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Rating */}
          <span className="flex items-center gap-1 rounded-full bg-kinodark-bg/85 px-2.5 py-0.5 text-xs font-bold text-amber-400 backdrop-blur-md border border-amber-400/20">
            <Star className="h-3 w-3 fill-current" />
            {movie.vote_average.toFixed(1)}
          </span>

          {/* Type Badge */}
          <span className="rounded-full bg-kinopurple-primary/80 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
            {movie.media_type === 'tv'
              ? 'TV'
              : movie.media_type === 'anime'
              ? 'Anime'
              : 'Film'}
          </span>
        </div>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4">
          {/* Quick Play Trailer */}
          {movie.trailer_key && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openTrailer(movie.trailer_key!);
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-kinopurple-primary to-[#7C3AED] text-white shadow-lg shadow-kinopurple-primary/50 transition-transform duration-200 hover:scale-110"
              title="Treylerni ko'rish"
            >
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </button>
          )}

          {/* Quick Favorite & Watchlist buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(movie.id);
              }}
              className={`rounded-full p-2.5 backdrop-blur-md border transition ${
                isFav
                  ? 'bg-rose-500 border-rose-400 text-white shadow-md shadow-rose-500/40'
                  : 'bg-kinodark-surface/80 border-kinodark-border text-kinotext-muted hover:text-rose-400'
              }`}
              title="Sevimlilarga qo'shish"
            >
              <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWatchlist(movie.id);
              }}
              className={`rounded-full p-2.5 backdrop-blur-md border transition ${
                isSaved
                  ? 'bg-kinopurple-primary border-kinopurple-secondary text-white shadow-glow-purple'
                  : 'bg-kinodark-surface/80 border-kinodark-border text-kinotext-muted hover:text-white'
              }`}
              title="Tomosha ro'yxatiga qo'shish"
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          <Link
            href={`/movie/${movie.id}`}
            className="text-[11px] font-semibold text-kinopurple-secondary hover:underline mt-1"
          >
            Batafsil ma'lumot →
          </Link>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <Link href={`/movie/${movie.id}`} className="flex flex-1 flex-col p-3.5">
        <h3 className="font-heading text-sm font-bold text-kinotext-main line-clamp-1 group-hover:text-kinopurple-secondary transition">
          {movie.title}
        </h3>
        <div className="mt-1.5 flex items-center justify-between text-xs text-kinotext-muted">
          <span>{movie.release_date?.substring(0, 4)}</span>
          {primaryGenre && (
            <span className="rounded bg-kinodark-surface px-1.5 py-0.5 text-[11px] text-kinotext-muted/80">
              {primaryGenre}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
