'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import { INITIAL_MOVIES } from '@/lib/tmdb';
import { Search, Film, Tv, Flame, User, Sparkles } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'movie' | 'tv' | 'anime' | 'actor'>('all');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return INITIAL_MOVIES.filter((movie) => {
      const matchesTitle =
        movie.title.toLowerCase().includes(q) ||
        (movie.original_title && movie.original_title.toLowerCase().includes(q));

      const matchesOverview =
        movie.overview.toLowerCase().includes(q) ||
        (movie.uz_overview && movie.uz_overview.toLowerCase().includes(q));

      const matchesGenre = movie.genres.some((g) => {
        const name = typeof g === 'string' ? g : g.name;
        return name.toLowerCase().includes(q);
      });

      const matchesActor =
        movie.cast && movie.cast.some((c) => c.name.toLowerCase().includes(q));

      const matchesSearch = matchesTitle || matchesOverview || matchesGenre || matchesActor;

      if (!matchesSearch) return false;

      if (activeTab === 'movie') return movie.media_type === 'movie';
      if (activeTab === 'tv') return movie.media_type === 'tv';
      if (activeTab === 'anime') return movie.media_type === 'anime';
      if (activeTab === 'actor') return matchesActor;

      return true;
    });
  }, [query, activeTab]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          Universal Qidiruv
        </h1>
        <p className="text-sm text-kinotext-muted">
          Film nomi, serial, anime, bosh qahramon yoki aktyor bo'yicha qidiring
        </p>

        {/* Big Search Input */}
        <div className="relative mt-6 max-w-2xl">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-kinotext-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidiruv so'zini kiriting (masalan: Nolan, Interstellar, Batman, Anime)..."
            className="w-full rounded-2xl border border-kinodark-border bg-kinodark-card py-3.5 pl-12 pr-4 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none focus:ring-1 focus:ring-kinopurple-primary shadow-xl"
            autoFocus
          />
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'all'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setActiveTab('movie')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'movie'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
            }`}
          >
            <Film className="h-3.5 w-3.5" /> Filmlar
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'tv'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
            }`}
          >
            <Tv className="h-3.5 w-3.5" /> Seriallar
          </button>
          <button
            onClick={() => setActiveTab('anime')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'anime'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
            }`}
          >
            <Flame className="h-3.5 w-3.5" /> Anime
          </button>
          <button
            onClick={() => setActiveTab('actor')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'actor'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
            }`}
          >
            <User className="h-3.5 w-3.5" /> Aktyorlar bo'yicha
          </button>
        </div>
      </div>

      {/* Results or Empty States */}
      {query ? (
        searchResults.length > 0 ? (
          <div>
            <div className="mb-4 text-xs font-semibold text-kinotext-muted">
              "{query}" so'rovi bo'yicha <span className="text-white">{searchResults.length}</span> ta natija:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-12 text-center max-w-lg mx-auto">
            <Search className="h-10 w-10 text-kinotext-muted mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-white">Natijalar topilmadi</h3>
            <p className="text-xs text-kinotext-muted mt-1">
              "{query}" bo'yicha hech qanday film yoki serial topilmadi. Boshqa so'z yoki aktyor nomini yozib ko'ring.
            </p>
          </div>
        )
      ) : (
        <div className="rounded-2xl border border-kinodark-border bg-kinodark-card/60 p-8 text-center max-w-md mx-auto">
          <Sparkles className="h-8 w-8 text-kinopurple-secondary mx-auto mb-3" />
          <h3 className="font-heading text-base font-bold text-white">Qidirishni boshlang</h3>
          <p className="text-xs text-kinotext-muted mt-1 mb-4">
            Tezkor takliflar:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Interstellar', 'Dune', 'DiCaprio', 'Oppenheimer', 'Attack on Titan'].map((t) => (
              <button
                key={t}
                onClick={() => setQuery(t)}
                className="rounded-lg bg-kinodark-surface px-3 py-1 text-xs text-kinotext-muted hover:text-kinopurple-secondary hover:border-kinopurple-primary/40 border border-kinodark-border"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-kinotext-muted">Qidiruv yuklanmoqda...</div>}>
      <SearchContent />
    </Suspense>
  );
}
