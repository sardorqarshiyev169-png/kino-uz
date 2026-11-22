'use client';

import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '@/components/MovieCard';
import { INITIAL_MOVIES, fetchFromTMDB, formatTmdbItem } from '@/lib/tmdb';
import { Sparkles, Search, Star, Flame, Compass, RefreshCw, Loader2 } from 'lucide-react';
import { Movie } from '@/lib/types';

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

  const [tmdbAnime, setTmdbAnime] = useState<Movie[]>([]);
  const [tmdbPage, setTmdbPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Fetch live anime from TMDB
  useEffect(() => {
    async function loadInitialTmdbAnime() {
      setIsInitialLoading(true);
      try {
        const data = await fetchFromTMDB('/discover/tv', {
          with_genres: '16',
          with_original_language: 'ja',
          sort_by: 'popularity.desc',
          page: '1',
        });

        if (data?.results && Array.isArray(data.results)) {
          const formatted = (data.results as any[])
            .filter((item) => item.poster_path)
            .map((item) => formatTmdbItem(item, 'anime'));
          setTmdbAnime(formatted);
        }
      } catch (err) {
        console.warn('Failed to load anime from TMDB:', err);
      } finally {
        setIsInitialLoading(false);
      }
    }

    loadInitialTmdbAnime();
  }, []);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const nextPage = tmdbPage + 1;
    try {
      const data = await fetchFromTMDB('/discover/tv', {
        with_genres: '16',
        with_original_language: 'ja',
        sort_by: 'popularity.desc',
        page: String(nextPage),
      });

      if (data?.results && Array.isArray(data.results)) {
        const formatted = (data.results as any[])
          .filter((item) => item.poster_path)
          .map((item) => formatTmdbItem(item, 'anime'));

        setTmdbAnime((prev) => {
          const seen = new Set(prev.map((m) => String(m.id)));
          const newOnes = formatted.filter((m) => !seen.has(String(m.id)));
          return [...prev, ...newOnes];
        });

        setTmdbPage(nextPage);
      }
    } catch (err) {
      console.warn('Failed to load more anime:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const allAnime = useMemo(() => {
    const local = INITIAL_MOVIES.filter((m) => m.media_type === 'anime');
    const combined = [...local];
    const seenIds = new Set<string>(local.map((m) => String(m.id)));

    for (const a of tmdbAnime) {
      const sId = String(a.id);
      if (!seenIds.has(sId)) {
        seenIds.add(sId);
        combined.push(a);
      }
    }
    return combined;
  }, [tmdbAnime]);

  const filteredAnime = useMemo(() => {
    return allAnime.filter((anime) => {
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
  }, [allAnime, search, selectedCategory]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Anime Banner Header */}
      <div className="relative overflow-hidden rounded-3xl border border-kinodark-border bg-gradient-to-r from-purple-900/40 via-kinodark-card to-kinodark-card p-6 sm:p-10 mb-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-kinopurple-primary/20 px-3 py-1 text-xs font-bold text-kinopurple-secondary border border-kinopurple-primary/30 mb-3">
            <Flame className="h-3.5 w-3.5" />
            <span>Yapon Animatsiyasi • Jonli TMDB</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
            Anime Olamiga Sayohat
          </h1>
          <p className="mt-3 text-sm text-kinotext-muted leading-relaxed">
            Klassik shonen durdonalari, Hayao Miyazaki afsonalari va yangi premyeralarni o'zbek tilidagi tavsiflar bilan tomosha qiling.
          </p>
        </div>
      </div>

      {/* Filter Categories and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto p-1">
          {ANIME_CATEGORIES.map((cat) => (
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

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-kinotext-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Anime qidirish..."
            className="w-full rounded-xl border border-kinodark-border bg-kinodark-card py-2 pl-9 pr-4 text-xs text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Anime Grid */}
      {filteredAnime.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredAnime.map((anime) => (
            <MovieCard key={anime.id} movie={anime} />
          ))}
        </div>
      ) : isInitialLoading ? (
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <Loader2 className="h-8 w-8 text-kinopurple-primary animate-spin mb-3" />
          <p className="text-xs text-kinotext-muted">Animelar bazadan yuklanmoqda...</p>
        </div>
      ) : (
        <div className="p-12 text-center text-kinotext-muted text-xs">
          Hech qanday anime topilmadi.
        </div>
      )}

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 rounded-2xl border border-kinopurple-primary/40 bg-kinopurple-primary/10 px-8 py-3.5 text-sm font-bold text-kinopurple-secondary hover:bg-kinopurple-primary/20 transition disabled:opacity-50"
        >
          {isLoadingMore ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Yangi animelar yuklanmoqda...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              <span>Yana ko'proq animelarni yuklash</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
