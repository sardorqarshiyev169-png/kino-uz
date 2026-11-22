'use client';

import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '@/components/MovieCard';
import { INITIAL_MOVIES, fetchFromTMDB, formatTmdbItem } from '@/lib/tmdb';
import { Tv, Search, Layers, Play, RefreshCw, Loader2, Sparkles } from 'lucide-react';
import { Movie } from '@/lib/types';
import { useStore } from '@/lib/store';

export default function TVSeriesPage() {
  const { openTrailer } = useStore();
  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'popular' | 'trending' | 'topRated'>('all');
  const [selectedSeries, setSelectedSeries] = useState<Movie | null>(null);

  const [tmdbSeries, setTmdbSeries] = useState<Movie[]>([]);
  const [tmdbPage, setTmdbPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Initial load: fetch popular TV series from TMDB
  useEffect(() => {
    async function loadInitialTmdbSeries() {
      setIsInitialLoading(true);
      try {
        const [popData, topData] = await Promise.all([
          fetchFromTMDB('/tv/popular', { page: '1' }),
          fetchFromTMDB('/tv/top_rated', { page: '1' }),
        ]);

        const combinedRaw = [
          ...(popData?.results || []),
          ...(topData?.results || []),
        ];

        const formatted = combinedRaw
          .filter((item) => item.poster_path)
          .map((item) => formatTmdbItem(item, 'tv'));

        setTmdbSeries(formatted);
      } catch (err) {
        console.warn('Failed to fetch TMDB TV series:', err);
      } finally {
        setIsInitialLoading(false);
      }
    }

    loadInitialTmdbSeries();
  }, []);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const nextPage = tmdbPage + 1;
    try {
      const data = await fetchFromTMDB('/tv/popular', { page: String(nextPage) });
      if (data?.results && Array.isArray(data.results)) {
        const formatted = (data.results as any[])
          .filter((item) => item.poster_path)
          .map((item) => formatTmdbItem(item, 'tv'));

        setTmdbSeries((prev) => {
          const seen = new Set(prev.map((m) => String(m.id)));
          const newOnes = formatted.filter((m) => !seen.has(String(m.id)));
          return [...prev, ...newOnes];
        });

        setTmdbPage(nextPage);
      }
    } catch (err) {
      console.warn('Failed to load more TV series:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const allSeries = useMemo(() => {
    const local = INITIAL_MOVIES.filter((m) => m.media_type === 'tv');
    const combined = [...local];
    const seenIds = new Set<string>(local.map((m) => String(m.id)));

    for (const s of tmdbSeries) {
      const sId = String(s.id);
      if (!seenIds.has(sId)) {
        seenIds.add(sId);
        combined.push(s);
      }
    }
    return combined;
  }, [tmdbSeries]);

  const filteredSeries = useMemo(() => {
    return allSeries.filter((series) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        series.title.toLowerCase().includes(q) ||
        (series.uz_overview && series.uz_overview.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (filterTab === 'popular') return series.isPopular || series.vote_average >= 8.0;
      if (filterTab === 'trending') return series.isTrending || (series.vote_count || 0) > 1000;
      if (filterTab === 'topRated') return series.vote_average >= 8.5;
      return true;
    });
  }, [allSeries, search, filterTab]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-kinopurple-primary text-xs font-bold uppercase tracking-wider mb-1">
            <Tv className="h-4 w-4" />
            <span>Seriallar olami • Jonli TMDB Baza</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ommabop Seriallar
          </h1>
          <p className="text-sm text-kinotext-muted mt-1">
            Mavsumlar, epizodlar va unutilmas ko'p qismli jahon shohlari
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-kinodark-border bg-kinodark-card p-1 self-start">
          <button
            onClick={() => setFilterTab('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              filterTab === 'all'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Barchasi ({allSeries.length})
          </button>
          <button
            onClick={() => setFilterTab('trending')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              filterTab === 'trending'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Trenddagilar
          </button>
          <button
            onClick={() => setFilterTab('topRated')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              filterTab === 'topRated'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Top Reyting
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-kinotext-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Serial nomi yoki tavsifi bo'yicha qidirish..."
          className="w-full max-w-md rounded-xl border border-kinodark-border bg-kinodark-card py-2.5 pl-10 pr-4 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none"
        />
      </div>

      {/* TV Series Grid */}
      {filteredSeries.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredSeries.map((series) => (
            <div key={series.id} className="relative group">
              <MovieCard movie={series} />
              {series.seasons && (
                <button
                  onClick={() => setSelectedSeries(series)}
                  className="w-full mt-2 flex items-center justify-center gap-1.5 rounded-xl border border-kinodark-border bg-kinodark-surface py-1.5 text-[11px] font-semibold text-kinopurple-secondary hover:border-kinopurple-primary/50 transition"
                >
                  <Layers className="h-3 w-3" />
                  Mavsumlar & Qismlar ({series.seasons.length})
                </button>
              )}
            </div>
          ))}
        </div>
      ) : isInitialLoading ? (
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <Loader2 className="h-8 w-8 text-kinopurple-primary animate-spin mb-3" />
          <p className="text-xs text-kinotext-muted">Seriallar bazadan yuklanmoqda...</p>
        </div>
      ) : (
        <div className="p-12 text-center text-kinotext-muted text-xs">
          Hech qanday serial topilmadi.
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
              <span>Yangi seriallar yuklanmoqda...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              <span>Yana ko'proq seriallarni yuklash</span>
            </>
          )}
        </button>
      </div>

      {/* Seasons & Episodes Modal / Drawer */}
      {selectedSeries && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setSelectedSeries(null)} />

          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-kinodark-border bg-kinodark-card p-6 shadow-2xl z-10 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between border-b border-kinodark-border/80 pb-4 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-kinopurple-secondary tracking-wider">
                  Mavsumlar va qismlar katalogi
                </span>
                <h3 className="font-heading text-xl font-bold text-white">
                  {selectedSeries.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSeries(null)}
                className="rounded-lg p-1 text-kinotext-muted hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto space-y-6 flex-1 pr-2">
              {selectedSeries.seasons?.map((season) => (
                <div
                  key={season.season_number}
                  className="rounded-xl border border-kinodark-border bg-kinodark-surface/60 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="h-4 w-4 text-kinopurple-primary" />
                      {season.name} ({season.episode_count} ta qism)
                    </h4>
                  </div>
                  {season.overview && (
                    <p className="text-xs text-kinotext-muted mb-4">{season.overview}</p>
                  )}

                  {season.episodes && season.episodes.length > 0 && (
                    <div className="space-y-2">
                      {season.episodes.map((ep) => (
                        <div
                          key={ep.episode_number}
                          className="flex items-center justify-between rounded-lg border border-kinodark-border/50 bg-kinodark-card p-3 text-xs"
                        >
                          <div>
                            <span className="font-bold text-kinopurple-secondary mr-2">
                              {ep.episode_number}-qism:
                            </span>
                            <span className="text-white font-medium">{ep.name}</span>
                            <p className="text-kinotext-muted text-[11px] mt-0.5">{ep.overview}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                            {ep.runtime && (
                              <span className="text-kinotext-muted text-[11px]">
                                {ep.runtime} daq
                              </span>
                            )}
                            <button
                              onClick={() => {
                                if (selectedSeries.trailer_key) {
                                  openTrailer(selectedSeries.trailer_key);
                                }
                              }}
                              className="flex items-center gap-1 rounded-lg bg-kinopurple-primary/20 px-2.5 py-1 text-[11px] font-semibold text-kinopurple-secondary hover:bg-kinopurple-primary/30"
                            >
                              <Play className="h-3 w-3 fill-current" />
                              Tomosha
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
