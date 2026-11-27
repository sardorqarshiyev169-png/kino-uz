'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import { INITIAL_MOVIES, getAllMovies, fetchFromTMDB, formatTmdbItem } from '@/lib/tmdb';
import { Movie } from '@/lib/types';
import { Search, Film, Tv, Flame, User, Sparkles, Loader2 } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'movie' | 'tv' | 'anime' | 'actor'>('all');
  const [tmdbResults, setTmdbResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setTmdbResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        let searchTerm = q;
        const lower = q.toLowerCase();
        if (lower.includes('garri') || lower.includes('garry') || lower.includes('poter')) {
          searchTerm = 'Harry Potter';
        } else if (lower.includes('forsaj')) {
          searchTerm = 'Fast and Furious';
        } else if (lower.includes('qasoskorlar')) {
          searchTerm = 'Avengers';
        } else if (lower.includes('orgimchak') || lower.includes("o'rgimchak")) {
          searchTerm = 'Spider-Man';
        } else if (lower.includes('taxtlar')) {
          searchTerm = 'Game of Thrones';
        } else if (lower.includes('uzuklar')) {
          searchTerm = 'Lord of the Rings';
        }

        const data = await fetchFromTMDB('/search/multi', { query: searchTerm });
        if (data && Array.isArray(data.results)) {
          let items = (data.results as any[])
            .filter((x) => (x.media_type === 'movie' || x.media_type === 'tv') && x.poster_path);

          if (searchTerm === 'Harry Potter') {
            items = items.filter((x) => (x.vote_count || 0) > 100);
            items.sort((a, b) => (a.release_date || a.first_air_date || '').localeCompare(b.release_date || b.first_air_date || ''));
          } else {
            items.sort((a, b) => ((b.vote_count || 0) * 2 + (b.popularity || 0)) - ((a.vote_count || 0) * 2 + (a.popularity || 0)));
          }

          const formatted = items.slice(0, 20).map((item) =>
            formatTmdbItem(item, item.media_type === 'tv' ? 'tv' : 'movie')
          );
          setTmdbResults(formatted);
        }
      } catch (e) {
        console.warn('Search fetch error:', e);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const localMatches = getAllMovies().filter((movie) => {
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

      return matchesTitle || matchesOverview || matchesGenre || matchesActor;
    });

    // Combine local matches and TMDB matches avoiding duplicate IDs
    const combined: Movie[] = [...localMatches];
    const seenIds = new Set<string>(localMatches.map((m) => String(m.id)));

    for (const m of tmdbResults) {
      const sId = String(m.id);
      if (!seenIds.has(sId)) {
        seenIds.add(sId);
        combined.push(m);
      }
    }

    return combined.filter((movie) => {
      if (activeTab === 'movie') return movie.media_type === 'movie';
      if (activeTab === 'tv') return movie.media_type === 'tv';
      if (activeTab === 'anime') return movie.media_type === 'anime';
      if (activeTab === 'actor') {
        return movie.cast && movie.cast.some((c) => c.name.toLowerCase().includes(q));
      }
      return true;
    });
  }, [query, activeTab, tmdbResults]);

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
          {isSearching ? (
            <Loader2 className="absolute left-4 top-3.5 h-5 w-5 text-kinopurple-primary animate-spin" />
          ) : (
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-kinotext-muted" />
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidiruv so'zini kiriting (masalan: Garri Potter, Forsaj, Nolan, Batman, Anime)..."
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
