'use client';

import React, { useState, useMemo } from 'react';
import MovieCard from '@/components/MovieCard';
import { INITIAL_MOVIES } from '@/lib/tmdb';
import { Sparkles, Search, Star, Flame, Compass } from 'lucide-react';

const ANIME_CATEGORIES = [
  'Barchasi',
  'Shonen',
  'Studio Ghibli',
  'Fantastika',
  'Jangari',
  'Melodrama',
];

export default function AnimePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  const animeList = useMemo(() => {
    return INITIAL_MOVIES.filter((m) => m.media_type === 'anime');
  }, []);

  const filteredAnime = useMemo(() => {
    return animeList.filter((anime) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        anime.title.toLowerCase().includes(q) ||
        (anime.original_title && anime.original_title.toLowerCase().includes(q)) ||
        (anime.uz_overview && anime.uz_overview.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedCategory === 'Barchasi') return true;
      if (selectedCategory === 'Studio Ghibli') return anime.title.includes('Spirited Away');
      return anime.genres.some((g) => {
        const name = typeof g === 'string' ? g : g.name;
        return name.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    });
  }, [animeList, search, selectedCategory]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Anime Banner Header */}
      <div className="relative overflow-hidden rounded-3xl border border-kinodark-border bg-gradient-to-r from-purple-900/40 via-kinodark-card to-kinodark-card p-6 sm:p-10 mb-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-kinopurple-primary/20 px-3 py-1 text-xs font-bold text-kinopurple-secondary border border-kinopurple-primary/30 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Yapon animatsiyasi portali
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Anime Olami
          </h1>
          <p className="text-sm text-kinotext-muted mt-2 leading-relaxed">
            Titanlar Hujumi, Iblis Qotillari, Hayao Miyazaki shoh asarlari va 2024-yilning eng yangi xit animelari.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
          {ANIME_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                  : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-kinotext-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Anime qidirish..."
            className="w-full rounded-xl border border-kinodark-border bg-kinodark-card py-2 pl-10 pr-4 text-xs text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Anime Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {filteredAnime.map((anime) => (
          <MovieCard key={anime.id} movie={anime} />
        ))}
      </div>
    </div>
  );
}
