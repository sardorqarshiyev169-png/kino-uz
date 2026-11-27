'use client';

import React, { useState, useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner';
import MovieCarousel from '@/components/MovieCarousel';
import AiChatWidget from '@/components/AiChatWidget';
import Link from 'next/link';
import {
  INITIAL_MOVIES,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getRecentMovies,
  getTVSeries,
  getAnimeList,
  fetchFromTMDB,
  formatTmdbItem,
} from '@/lib/tmdb';
import { UZBEK_MOVIES } from '@/lib/uzbek-movies';
import {
  Flame,
  Star,
  Sparkles,
  TrendingUp,
  Clock,
  Tv,
  Film,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const [trending, setTrending] = useState(getTrendingMovies);
  const [popular, setPopular] = useState(getPopularMovies);
  const [topRated, setTopRated] = useState(getTopRatedMovies);
  const [recent, setRecent] = useState(getRecentMovies);
  const [tvSeries, setTvSeries] = useState(getTVSeries);
  const [anime, setAnime] = useState(getAnimeList);
  const [uzbekMovies, setUzbekMovies] = useState(UZBEK_MOVIES);
  const [heroMovies, setHeroMovies] = useState(() =>
    INITIAL_MOVIES.filter((m) => m.isFeatured || m.isTrending)
  );

  // Fetch live weekly trending movies and latest releases from TMDB
  useEffect(() => {
    async function loadLiveWeeklyMovies() {
      try {
        const [trendData, popData, topData, nowData, tvData, animeData] = await Promise.all([
          fetchFromTMDB('/trending/movie/week'),
          fetchFromTMDB('/movie/popular'),
          fetchFromTMDB('/movie/top_rated'),
          fetchFromTMDB('/movie/now_playing'),
          fetchFromTMDB('/tv/popular'),
          fetchFromTMDB('/discover/tv', {
            with_genres: '16',
            with_original_language: 'ja',
            sort_by: 'popularity.desc',
          }),
        ]);

        if (trendData?.results && Array.isArray(trendData.results)) {
          const list = trendData.results
            .filter((x: any) => x.poster_path)
            .slice(0, 16)
            .map((x: any) => formatTmdbItem(x, 'movie'));
          if (list.length > 0) {
            setTrending(list);
            setHeroMovies(list.slice(0, 5));
          }
        }

        if (popData?.results && Array.isArray(popData.results)) {
          const list = popData.results
            .filter((x: any) => x.poster_path)
            .slice(0, 16)
            .map((x: any) => formatTmdbItem(x, 'movie'));
          if (list.length > 0) setPopular(list);
        }

        if (topData?.results && Array.isArray(topData.results)) {
          const list = topData.results
            .filter((x: any) => x.poster_path)
            .slice(0, 16)
            .map((x: any) => formatTmdbItem(x, 'movie'));
          if (list.length > 0) setTopRated(list);
        }

        if (nowData?.results && Array.isArray(nowData.results)) {
          const list = nowData.results
            .filter((x: any) => x.poster_path)
            .slice(0, 16)
            .map((x: any) => formatTmdbItem(x, 'movie'));
          if (list.length > 0) setRecent(list);
        }

        if (tvData?.results && Array.isArray(tvData.results)) {
          const list = tvData.results
            .filter((x: any) => x.poster_path)
            .slice(0, 16)
            .map((x: any) => formatTmdbItem(x, 'tv'));
          if (list.length > 0) setTvSeries(list);
        }

        if (animeData?.results && Array.isArray(animeData.results)) {
          const list = animeData.results
            .filter((x: any) => x.poster_path)
            .slice(0, 16)
            .map((x: any) => formatTmdbItem(x, 'anime'));
          if (list.length > 0) setAnime(list);
        }
      } catch (err) {
        console.warn('Failed to load weekly live movies:', err);
      }
    }

    loadLiveWeeklyMovies();
  }, []);

  // Personalized recommendations (tailored for Uzbek cinephiles)
  const personalized = INITIAL_MOVIES.slice(0, 6);

  return (
    <div className="min-h-screen pb-16">
      {/* 1. Cinematic Hero Banner */}
      <HeroBanner movies={heroMovies} />

      {/* Highlights / Features Banner Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl border border-kinodark-border bg-kinodark-card/90 p-4 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kinopurple-primary/20 text-kinopurple-secondary border border-kinopurple-primary/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                AI Movie Assistant
              </h4>
              <p className="text-[11px] text-kinotext-muted">
                Smart recommendations & natural movie discovery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-kinodark-border/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Star className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                TMDB & IMDb Ratings
              </h4>
              <p className="text-[11px] text-kinotext-muted">
                Verified critic scores & real audience ratings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-kinodark-border/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                Official Streaming
              </h4>
              <p className="text-[11px] text-kinotext-muted">
                Direct player streams & official streaming info
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Trending Movies ("Hozirda trendda") */}
      <MovieCarousel
        title="Trending Movies"
        subtitle="The most popular movies worldwide right now"
        movies={trending}
        viewAllLink="/movies?sort=popularity"
        icon={TrendingUp}
      />

      {/* 2.5. Dedicated Uzbek Cinema & Tarjima Section */}
      <MovieCarousel
        title="🇺🇿 O'zbek Filmlari & Tarjima Kinolar"
        subtitle="Super kelinchak, Shum bola, O'tkan kunlar, Cho'qintirgan ota (1, 2, 3), Forsaj 1 — barchasi 100% o'zbek tilida"
        movies={UZBEK_MOVIES}
        viewAllLink="/uzbek-movies"
        viewAllText="Barchasini ko'rish →"
        icon={Award}
      />

      {/* 3. Popular Movies */}
      <MovieCarousel
        title="Popular Movies"
        subtitle="Fan-favorite blockbusters and timeless cinema"
        movies={popular}
        viewAllLink="/movies?sort=popularity"
        icon={Flame}
      />

      {/* 4. Top Rated Movies */}
      <MovieCarousel
        title="Top Rated Movies"
        subtitle="All-time highest rated cinema masterpieces"
        movies={topRated}
        viewAllLink="/movies?sort=rating"
        icon={Star}
      />

      {/* 5. Recently Released Movies */}
      <MovieCarousel
        title="New Releases (2024)"
        subtitle="The latest movie releases and fresh arrivals"
        movies={recent}
        viewAllLink="/movies?year=2024"
        icon={Clock}
      />

      {/* 6. Popular TV Series */}
      <MovieCarousel
        title="Popular TV Series"
        subtitle="Trending TV series and binge-worthy shows"
        movies={tvSeries}
        viewAllLink="/tv"
        icon={Tv}
      />

      {/* 7. Anime Recommendations */}
      <MovieCarousel
        title="Anime & Animation"
        subtitle="Top-rated anime series and cinematic stories"
        movies={anime}
        viewAllLink="/anime"
        icon={Sparkles}
      />

      {/* 8. Personalized Recommendations */}
      <MovieCarousel
        title="Recommended For You"
        subtitle="Curated picks tailored to your interests"
        movies={personalized}
        viewAllLink="/movies"
        icon={Compass}
      />

      {/* 9. Interactive AI Movie Assistant Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-14">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-kinopurple-primary/20 px-3 py-1 text-xs font-bold text-kinopurple-secondary border border-kinopurple-primary/30 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Smart Movie Discovery
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
              Kino uz AI Assistant
            </h2>
            <p className="text-sm text-kinotext-muted mt-1 max-w-xl">
              Don't know what to watch? Tell the AI what kind of vibe, genre, or mood you want, and discover great movies instantly.
            </p>
          </div>

          <Link
            href="/ai-assistant"
            className="inline-flex items-center gap-2 rounded-xl border border-kinopurple-primary/50 bg-kinopurple-primary/10 px-4 py-2.5 text-xs font-bold text-kinopurple-secondary hover:bg-kinopurple-primary/20 transition self-start"
          >
            Open Fullscreen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <AiChatWidget embedded={true} />
      </section>
    </div>
  );
}
