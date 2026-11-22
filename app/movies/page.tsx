'use client';

import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '@/components/MovieCard';
import { INITIAL_MOVIES, GENRES, fetchFromTMDB, formatTmdbItem } from '@/lib/tmdb';
import { Movie } from '@/lib/types';
import { Search, Film, Loader2, Sparkles, RefreshCw } from 'lucide-react';

export default function MoviesPage() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'newest' | 'title'>('popularity');

  // Live TMDB catalog state
  const [tmdbMovies, setTmdbMovies] = useState<Movie[]>([]);
  const [tmdbPage, setTmdbPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Initial load: fetch page 1 and page 2 from TMDB popular movies
  useEffect(() => {
    async function loadInitialTmdbMovies() {
      setIsInitialLoading(true);
      try {
        const [page1Data, page2Data] = await Promise.all([
          fetchFromTMDB('/movie/popular', { page: '1' }),
          fetchFromTMDB('/movie/top_rated', { page: '1' }),
        ]);

        const combinedRaw = [
          ...(page1Data?.results || []),
          ...(page2Data?.results || []),
        ];

        const formatted = combinedRaw
          .filter((item) => item.poster_path)
          .map((item) => formatTmdbItem(item, 'movie'));

        setTmdbMovies(formatted);
      } catch (err) {
        console.warn('Failed to fetch initial TMDB movies:', err);
      } finally {
        setIsInitialLoading(false);
      }
    }

    loadInitialTmdbMovies();
  }, []);

  // When a specific genre is selected, optionally fetch targeted discover movies from TMDB
  useEffect(() => {
    if (selectedGenre === 'all') return;

    const matchedGenre = GENRES.find(
      (g) =>
        g.name.toLowerCase() === selectedGenre.toLowerCase() ||
        (g.uzName && g.uzName.toLowerCase() === selectedGenre.toLowerCase())
    );

    if (!matchedGenre) return;

    const genreId = matchedGenre.id;

    async function loadGenreMovies() {
      try {
        const data = await fetchFromTMDB('/discover/movie', {
          with_genres: String(genreId),
          sort_by: 'popularity.desc',
          page: '1',
        });

        if (data?.results && Array.isArray(data.results)) {
          const formatted = (data.results as any[])
            .filter((item) => item.poster_path)
            .map((item) => formatTmdbItem(item, 'movie'));

          setTmdbMovies((prev) => {
            const seen = new Set(prev.map((m) => String(m.id)));
            const newOnes = formatted.filter((m) => !seen.has(String(m.id)));
            return [...prev, ...newOnes];
          });
        }
      } catch (err) {
        console.warn('Failed to load genre movies:', err);
      }
    }

    loadGenreMovies();
  }, [selectedGenre]);

  // Load more movies button handler (fetches next page from TMDB)
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const nextPage = tmdbPage + 1;

    try {
      const data = await fetchFromTMDB('/movie/popular', { page: String(nextPage) });
      if (data?.results && Array.isArray(data.results)) {
        const formatted = (data.results as any[])
          .filter((item) => item.poster_path)
          .map((item) => formatTmdbItem(item, 'movie'));

        setTmdbMovies((prev) => {
          const seen = new Set(prev.map((m) => String(m.id)));
          const newOnes = formatted.filter((m) => !seen.has(String(m.id)));
          return [...prev, ...newOnes];
        });

        setTmdbPage(nextPage);
      }
    } catch (err) {
      console.warn('Failed to load more movies:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Combine initial curated movies + live TMDB movies avoiding duplicates
  const allMovies = useMemo(() => {
    const local = INITIAL_MOVIES.filter((m) => m.media_type === 'movie');
    const combined = [...local];
    const seenIds = new Set<string>(local.map((m) => String(m.id)));

    for (const m of tmdbMovies) {
      const sId = String(m.id);
      if (!seenIds.has(sId)) {
        seenIds.add(sId);
        combined.push(m);
      }
    }

    return combined;
  }, [tmdbMovies]);

  // Filter movies
  const filteredMovies = useMemo(() => {
    return allMovies.filter((movie) => {
      // Search
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        movie.title.toLowerCase().includes(q) ||
        (movie.original_title && movie.original_title.toLowerCase().includes(q)) ||
        (movie.uz_overview && movie.uz_overview.toLowerCase().includes(q));

      // Genre
      const matchesGenre =
        selectedGenre === 'all' ||
        movie.genres.some((g) => {
          const name = typeof g === 'string' ? g : g.name;
          return name.toLowerCase().includes(selectedGenre.toLowerCase());
        });

      // Year
      const year = (movie.release_date || '').substring(0, 4);
      const matchesYear =
        selectedYear === 'all' ||
        (selectedYear === '2024' && year === '2024') ||
        (selectedYear === '2023' && year === '2023') ||
        (selectedYear === '2020s' && parseInt(year) >= 2020) ||
        (selectedYear === '2010s' && parseInt(year) >= 2010 && parseInt(year) < 2020) ||
        (selectedYear === 'classic' && parseInt(year) < 2010);

      // Rating
      const matchesRating = movie.vote_average >= minRating;

      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    });
  }, [allMovies, search, selectedGenre, selectedYear, minRating]);

  // Sort
  const sortedMovies = useMemo(() => {
    const list = [...filteredMovies];
    if (sortBy === 'rating') {
      list.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [filteredMovies, sortBy]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-kinopurple-primary text-xs font-bold uppercase tracking-wider mb-1">
            <Film className="h-4 w-4" />
            <span>Katalog • Jonli TMDB Baza</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight">
            Filmlar Katalogi
          </h1>
          <p className="text-sm text-kinotext-muted mt-1">
            Dunyo kinematografiyasining eng sara durdonalari, haftalik premyeralar va reytingli filmlar
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-kinotext-muted font-medium bg-kinodark-surface/60 px-3.5 py-2 rounded-xl border border-kinodark-border self-start">
          <Sparkles className="h-3.5 w-3.5 text-kinopurple-secondary" />
          <span>Mavjud filmlar: <strong className="text-white font-bold">{sortedMovies.length}</strong> ta</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-4 sm:p-6 mb-8 shadow-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-kinotext-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Film nomi yoki kalit so'z bo'yicha qidirish..."
              className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 pl-10 pr-4 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none"
            />
          </div>

          {/* Year Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 px-3 text-sm text-kinotext-main focus:border-kinopurple-primary focus:outline-none"
            >
              <option value="all">Barcha yillar</option>
              <option value="2024">2024-yil</option>
              <option value="2023">2023-yil</option>
              <option value="2020s">2020-yillar</option>
              <option value="2010s">2010-yillar</option>
              <option value="classic">Klassika (&lt;2010)</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="md:col-span-2">
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 px-3 text-sm text-kinotext-main focus:border-kinopurple-primary focus:outline-none"
            >
              <option value={0}>Barcha reytinglar</option>
              <option value={8.5}>⭐ 8.5+ ball</option>
              <option value={8.0}>⭐ 8.0+ ball</option>
              <option value={7.5}>⭐ 7.5+ ball</option>
              <option value={7.0}>⭐ 7.0+ ball</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 px-3 text-sm text-kinotext-main focus:border-kinopurple-primary focus:outline-none"
            >
              <option value="popularity">Ommabopligi bo'yicha</option>
              <option value="rating">Reytingi bo'yicha (eng yuqori)</option>
              <option value="newest">Chiqarilgan sanasi bo'yicha</option>
              <option value="title">Alifbo bo'yicha (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Genre Pill Buttons */}
        <div className="pt-2 border-t border-kinodark-border/60">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedGenre('all')}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                selectedGenre === 'all'
                  ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                  : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
              }`}
            >
              Barcha janrlar
            </button>
            {GENRES.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGenre(g.uzName || g.name)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                  selectedGenre === (g.uzName || g.name)
                    ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                    : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
                }`}
              >
                {g.uzName || g.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {sortedMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {sortedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : isInitialLoading ? (
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <Loader2 className="h-8 w-8 text-kinopurple-primary animate-spin mb-3" />
          <p className="text-xs text-kinotext-muted">Kinolar bazadan yuklanmoqda...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-kinodark-border bg-kinodark-card p-12 text-center">
          <Film className="h-12 w-12 text-kinotext-muted mb-3" />
          <h3 className="font-heading text-lg font-bold text-white">Hech narsa topilmadi</h3>
          <p className="text-xs text-kinotext-muted mt-1 max-w-sm">
            Tanlangan filtrlarga mos keluvchi filmlar topilmadi. Filtrlarni o'zgartirib qayta urinib ko'ring.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedGenre('all');
              setSelectedYear('all');
              setMinRating(0);
            }}
            className="mt-4 rounded-xl bg-kinopurple-primary px-4 py-2 text-xs font-semibold text-white"
          >
            Filtrlarni tozalash
          </button>
        </div>
      )}

      {/* Infinite Load More Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 rounded-2xl border border-kinopurple-primary/40 bg-kinopurple-primary/10 px-8 py-3.5 text-sm font-bold text-kinopurple-secondary hover:bg-kinopurple-primary/20 hover:scale-105 active:scale-95 transition disabled:opacity-50 shadow-lg shadow-kinopurple-primary/10"
        >
          {isLoadingMore ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Yangi filmlar yuklanmoqda...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              <span>Yana ko'proq kinolarni yuklash</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-kinotext-muted mt-2">
          TMDB jahon kinolar bazasi bilan avtomatik bog'langan — har hafta yangi kinolar qo'shilib boradi
        </p>
      </div>
    </div>
  );
}
