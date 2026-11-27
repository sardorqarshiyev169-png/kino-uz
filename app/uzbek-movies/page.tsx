'use client';

import React, { useState, useMemo } from 'react';
import MovieCard from '@/components/MovieCard';
import { UZBEK_MOVIES } from '@/lib/uzbek-movies';
import { Search, Film, Star, Award, Sparkles, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  'Barchasi',
  "O'zbek Milliy Kinolari",
  "Tarjima Kinolar (O'zbek tilida)",
  'Komediya',
  'Jangari',
  'Drama',
  'Melodrama',
  'Klassika',
  'Kriminal',
  'Sarguzasht',
];

export default function UzbekMoviesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [sortBy, setSortBy] = useState<'rating' | 'year_desc' | 'year_asc' | 'title'>('rating');

  const filteredMovies = useMemo(() => {
    return UZBEK_MOVIES.filter((movie) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        movie.title.toLowerCase().includes(q) ||
        (movie.original_title && movie.original_title.toLowerCase().includes(q)) ||
        (movie.uz_overview && movie.uz_overview.toLowerCase().includes(q)) ||
        (movie.cast && movie.cast.some((c) => c.name.toLowerCase().includes(q)));

      if (!matchesSearch) return false;

      if (selectedCategory === 'Barchasi') return true;

      if (selectedCategory === "O'zbek Milliy Kinolari") {
        return !movie.isTarjima;
      }

      if (selectedCategory === "Tarjima Kinolar (O'zbek tilida)") {
        return Boolean(movie.isTarjima);
      }

      return movie.genres.some((g) => {
        const name = typeof g === 'string' ? g : g.name;
        return name.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    });
  }, [search, selectedCategory]);

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
      {/* Uzbek Cinema & Tarjima Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-kinopurple-primary/30 bg-gradient-to-r from-[#171326] via-[#20192F] to-[#120e20] p-6 sm:p-10 mb-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-kinopurple-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-kinopurple-primary/20 px-3.5 py-1 text-xs font-bold text-kinopurple-secondary border border-kinopurple-primary/40 mb-3">
            <span className="text-sm">🇺🇿</span>
            <span>O'zbekiston Milliy Kinosi & Tarjima Filmlar (O'zbek tilida)</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
            O'zbek Filmlari & Tarjima Kinolar
          </h1>
          <p className="mt-3 text-sm text-kinotext-muted leading-relaxed">
            Super kelinchak, Shum bola, Mahallada duv-duv gap, O'tkan kunlar kabi milliy kino durdonalari hamda Cho'qintirgan ota (1, 2, 3-qismlar) va Forsaj 1 kabi o'zbek tiliga mahorat bilan tarjima qilingan jahon shoh asarlari — barchasi faqat haqiqiy o'zbek tilidagi pleyerda to'liq Full HD formatda.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-kinotext-muted">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Award className="h-4 w-4 text-amber-400" />
              100% O'zbek tilida
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Film className="h-4 w-4 text-kinopurple-secondary" />
              Milliy oltin fond & Zamonaviy kinolar
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Sparkles className="h-4 w-4 text-sky-400" />
              Mashhur tarjima kinolar
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Saytning o'zida to'liq ochiladi
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1">
          {CATEGORIES.map((cat) => (
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
              placeholder="Film nomini qidirish..."
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
        <div>
          Jami <strong className="text-white font-bold">{sortedMovies.length} ta</strong> sara film ko'rsatilmoqda (Har birida to'liq pleyer mavjud)
        </div>
        <div className="hidden sm:block text-emerald-400 font-medium">
          ✓ Barcha kinolar tekshirilgan va saytda to'liq ochiladi
        </div>
      </div>

      {/* Movies Grid */}
      {sortedMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {sortedMovies.map((movie) => {
            const isTarjima = Boolean(movie.isTarjima);
            return (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                <div className="absolute top-2 left-2 pointer-events-none">
                  <span
                    className={`rounded-md backdrop-blur-md px-1.5 py-0.5 text-[9px] font-black text-white shadow uppercase tracking-wider ${
                      isTarjima ? 'bg-sky-500/90' : 'bg-amber-500/90'
                    }`}
                  >
                    {isTarjima ? 'TARJIMA' : 'MILLIY'}
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
            "{search}" bo'yicha film topilmadi. Qidiruv so'zini o'zgartirib ko'ring.
          </p>
        </div>
      )}
    </div>
  );
}
