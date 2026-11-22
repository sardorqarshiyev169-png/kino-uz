'use client';

import React from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import { useStore } from '@/lib/store';
import { INITIAL_MOVIES } from '@/lib/tmdb';
import { Bookmark, Compass, Trash2, CheckCircle2 } from 'lucide-react';

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useStore();

  const watchlistMovies = INITIAL_MOVIES.filter((m) => watchlist.includes(String(m.id)));

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-kinopurple-primary text-xs font-bold uppercase tracking-wider mb-1">
            <Bookmark className="h-4 w-4" />
            <span>Kutubxona</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight">
            Tomosha Ro'yxati (Watchlist)
          </h1>
          <p className="text-sm text-kinotext-muted mt-1">
            Keyinroq bo'sh vaqtingizda ko'rish uchun belgilangan filmlar va seriallar
          </p>
        </div>

        <div className="text-xs text-kinotext-muted font-medium bg-kinodark-surface/60 px-3 py-1.5 rounded-xl border border-kinodark-border self-start">
          Rejada: <span className="font-bold text-white">{watchlistMovies.length}</span> ta kartina
        </div>
      </div>

      {/* Grid or Empty State */}
      {watchlistMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {watchlistMovies.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => toggleWatchlist(movie.id)}
                className="w-full mt-2 flex items-center justify-center gap-1 rounded-xl border border-kinodark-border bg-kinodark-surface py-1.5 text-[11px] font-semibold text-kinotext-muted hover:text-white transition"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                Ro'yxatdan chiqarish
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-12 text-center max-w-md mx-auto">
          <Bookmark className="h-12 w-12 text-kinotext-muted mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-white">
            Ro'yxatingizda hozircha hech narsa yo'q
          </h3>
          <p className="text-xs text-kinotext-muted mt-1 mb-6">
            Qiziqarli filmlarni topib, keyinroq ko'rish uchun saqlab qo'ying.
          </p>
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 rounded-xl bg-kinopurple-primary px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-kinopurple-primary/30 hover:brightness-110"
          >
            <Compass className="h-4 w-4" /> Filmlarni tanlash
          </Link>
        </div>
      )}
    </div>
  );
}
