'use client';

import React from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import { useStore } from '@/lib/store';
import { INITIAL_MOVIES } from '@/lib/tmdb';
import { Heart, Compass, Film, Trash2 } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useStore();

  const favoriteMovies = INITIAL_MOVIES.filter((m) => favorites.includes(String(m.id)));

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="h-4 w-4 fill-current" />
            <span>Kutubxona</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight">
            Sevimli Filmlarim
          </h1>
          <p className="text-sm text-kinotext-muted mt-1">
            Siz yoqtirgan va qayta-qayta tomosha qilishni istagan shaxsiy to'plamingiz
          </p>
        </div>

        <div className="text-xs text-kinotext-muted font-medium bg-kinodark-surface/60 px-3 py-1.5 rounded-xl border border-kinodark-border self-start">
          Jami: <span className="font-bold text-white">{favoriteMovies.length}</span> ta film
        </div>
      </div>

      {/* Grid or Empty State */}
      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => toggleFavorite(movie.id)}
                className="w-full mt-2 flex items-center justify-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 py-1.5 text-[11px] font-semibold text-rose-400 hover:bg-rose-500/20 transition"
              >
                <Trash2 className="h-3 w-3" />
                O'chirish
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-12 text-center max-w-md mx-auto">
          <Heart className="h-12 w-12 text-kinotext-muted mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-white">
            Sevimlilar ro'yxati hozircha bo'sh
          </h3>
          <p className="text-xs text-kinotext-muted mt-1 mb-6">
            O'zingizga yoqqan kartinalarni kartochkadagi yurakcha belgisini bosib bu yerga saqlang.
          </p>
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 rounded-xl bg-kinopurple-primary px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-kinopurple-primary/30 hover:brightness-110"
          >
            <Compass className="h-4 w-4" /> Filmlarni kashf etish
          </Link>
        </div>
      )}
    </div>
  );
}
