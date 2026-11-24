'use client';

import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '@/components/MovieCard';
import { UZBEK_MOVIES, fetchLiveUzbekMoviesFromTMDB } from '@/lib/uzbek-movies';
import { Movie } from '@/lib/types';
import { Search, Film, Star, Award, Sparkles, RefreshCw } from 'lucide-react';

const UZBEK_CATEGORIES = [
  'Barchasi',
  'Oltin Fond',
  'TMDB Yangi Kinolar',
  'Komediya',
  'Tarixiy',
  'Drama',
  'Jangari',
  'Harbiy',
];

export default function UzbekMoviesPage() {
  const [allMovies, setAllMovies] = useState<Movie[]>(UZBEK_MOVIES);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [sortBy, setSortBy] = useState<'rating' | 'year_desc' | 'year_asc' | 'title'>('rating');

  // Load live Uzbek movies from TMDB on client mount
  useEffect(() => {
    let isMounted = true;
    async function loadTmdbUzbek() {
      setIsLoadingLive(true);
      try {
        const liveItems = await fetchLiveUzbekMoviesFromTMDB();
        if (isMounted && liveItems && liveItems.length > 0) {
          // Combine curated gold fond with live TMDB movies
          const combined = [...UZBEK_MOVIES];
          const existingIds = new Set(combined.map((m) => String(m.id)));

          for (const item of liveItems) {
            if (!existingIds.has(String(item.id))) {
              combined.push(item);
              existingIds.add(String(item.id));
            }
          }
          setAllMovies(combined);
        }
      } catch (err) {
        console.warn('Failed to load TMDB Uzbek movies:', err);
      } finally {
        if (isMounted) setIsLoadingLive(false);
      }
    }

    loadTmdbUzbek();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMovies = useMemo(() => {
    return allMovies.filter((movie) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        movie.title.toLowerCase().includes(q) ||
        (movie.original_title && movie.original_title.toLowerCase().includes(q)) ||
        (movie.uz_overview && movie.uz_overview.toLowerCase().includes(q)) ||
        (movie.cast && movie.cast.some((c) => c.name.toLowerCase().includes(q)));

      if (!matchesSearch) return false;

      if (selectedCategory === 'Barchasi') return true;

      if (selectedCategory === 'Oltin Fond') {
        return String(movie.id).startsWith('uz-');
      }

      if (selectedCategory === 'TMDB Yangi Kinolar') {
        return !String(movie.id).startsWith('uz-');
      }

      return movie.genres.some((g) => {
        const name = typeof g === 'string' ? g : g.name;
        return name.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    });
  }, [allMovies, search, selectedCategory]);

  const sortedMovies = useMemo(() => {
    const list = [...filteredMovies];
    if (sortBy === 'rating') {
      list.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === 'year_desc') {
      list.sort((a, b) => b.release_date.localeCompare(a.release_date));
    } else if (sortBy === 'year_asc') {
      list.sort((a, b) => a.release_date.localeCompare(b.release_date));
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [filteredMovies, sortBy]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Uzbek Cinema Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-kinopurple-primary/30 bg-gradient-to-r from-[#171326] via-[#20192F] to-[#120e20] p-6 sm:p-10 mb-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-kinopurple-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-kinopurple-primary/20 px-3.5 py-1 text-xs font-bold text-kinopurple-secondary border border-kinopurple-primary/40 mb-3">
            <span className="text-sm">🇺🇿</span>
            <span>O'zbekiston Milliy Kinosi • Oltin Fond & TMDB Jonli Katalog</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
            O'zbek Filmlari
          </h1>
          <p className="mt-3 text-sm text-kinotext-muted leading-relaxed">
            Shum bola, Mahallada duv-duv gap, Kelinlar qo'zg'oloni, O'tkan kunlar kabi o'lmas klassikalar, Abdullajon, Osmondagi bolalar, Baron va TMDB orqali avtomatik yangilanib boruvchi 350+ dan ortiq milliy o'zbek kinolari katalogi.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-kinotext-muted">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Award className="h-4 w-4 text-amber-400" />
              100% O'zbek tilida
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Film className="h-4 w-4 text-kinopurple-secondary" />
              Oltin fond durdonalari
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              TMDB avtomatik indekslash
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              Rasmiy Full HD Pleyer
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1">
          {UZBEK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                  : 'bg-kinodark-card text-kinotext-muted hover:text-white border border-kinodark-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-kinotext-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="O'zbek kinosini qidirish..."
              className="w-full rounded-xl border border-kinodark-border bg-kinodark-card py-2 pl-9 pr-4 text-xs text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-kinodark-border bg-kinodark-card py-2 px-3 text-xs text-kinotext-main focus:border-kinopurple-primary focus:outline-none"
          >
            <option value="rating">Reyting bo'yicha</option>
            <option value="year_desc">Eng yangilari</option>
            <option value="year_asc">Klassikalar (yillari)</option>
            <option value="title">Nom bo'yicha (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Catalog Status Bar */}
      <div className="flex items-center justify-between text-xs text-kinotext-muted mb-6 px-1">
        <div className="flex items-center gap-2">
          <span>Jami <strong className="text-white font-bold">{sortedMovies.length} ta</strong> o'zbek kinosi ko'rsatilmoqda</span>
          {isLoadingLive && (
            <span className="flex items-center gap-1 text-[11px] text-kinopurple-secondary animate-pulse">
              <RefreshCw className="h-3 w-3 animate-spin" /> TMDB'dan yangilanmoqda...
            </span>
          )}
        </div>
        <span>Har hafta yangi o'zbek filmlari avtomatik qo'shiladi</span>
      </div>

      {/* Movies Grid */}
      {sortedMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {sortedMovies.map((movie) => {
            const isGold = String(movie.id).startsWith('uz-');
            return (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                <div className="absolute top-2 left-2 pointer-events-none">
                  <span className={`rounded-md backdrop-blur-md px-1.5 py-0.5 text-[9px] font-black text-white shadow uppercase tracking-wider ${
                    isGold ? 'bg-amber-500/90' : 'bg-emerald-500/90'
                  }`}>
                    {isGold ? 'Oltin Fond' : 'UZB'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-kinodark-border bg-kinodark-card p-12 text-center">
          <Film className="h-12 w-12 text-kinotext-muted mb-3" />
          <h3 className="font-heading text-lg font-bold text-white">Bunday film topilmadi</h3>
          <p className="text-xs text-kinotext-muted mt-1 max-w-sm">
            "{search}" bo'yicha o'zbek kinosi topilmadi. Qidiruv so'zini o'zgartirib ko'ring.
          </p>
        </div>
      )}
    </div>
  );
}
