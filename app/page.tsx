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
                AI Kino Maslahatchisi
              </h4>
              <p className="text-[11px] text-kinotext-muted">
                O'zbek tilida tabiiy muloqot va aqlli tavsiyalar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-kinodark-border/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Star className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                TMDB & IMDb Reytinglari
              </h4>
              <p className="text-[11px] text-kinotext-muted">
                Haqiqiy tomoshabinlar va tanqidchilar bahosi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-kinodark-border/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                Qonuniy Tomosha
              </h4>
              <p className="text-[11px] text-kinotext-muted">
                Allplay, ITV, Kinopoisk va Netflix havolalari
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Trending Movies ("Hozirda trendda") */}
      <MovieCarousel
        title="Trenddagi filmlar"
        subtitle="Hozirda butun dunyo tomosha qilayotgan eng ommabop filmlar"
        movies={trending}
        viewAllLink="/movies?sort=popularity"
        icon={TrendingUp}
      />

      {/* 2.5. Dedicated Uzbek Cinema Section */}
      <MovieCarousel
        title="🇺🇿 O'zbek Filmlari (Oltin Fond & Premyeralar)"
        subtitle="Shum bola, Mahallada duv-duv gap, Kelinlar qo'zg'oloni, Abdullajon, Osmondagi bolalar va boshqalar"
        movies={UZBEK_MOVIES}
        viewAllLink="/uzbek-movies"
        icon={Award}
      />

      {/* 3. Popular Movies ("Mashhur filmlar") */}
      <MovieCarousel
        title="Mashhur filmlar"
        subtitle="Tomoshabinlar mehrini qozongan sevimli kartinalar"
        movies={popular}
        viewAllLink="/movies?sort=popularity"
        icon={Flame}
      />

      {/* 4. Top Rated Movies ("Eng yuqori reytingli durdonalar") */}
      <MovieCarousel
        title="Eng yuqori reytingli filmlar"
        subtitle="Kinematografiya tarixidagi eng nufuzli shoh asarlar"
        movies={topRated}
        viewAllLink="/movies?sort=rating"
        icon={Star}
      />

      {/* 5. Recently Released Movies ("Yangi premyerlar") */}
      <MovieCarousel
        title="Yangi premyerlar (2024)"
        subtitle="Eng so'nggi chiqqan kino yangiliklari"
        movies={recent}
        viewAllLink="/movies?year=2024"
        icon={Clock}
      />

      {/* 6. Popular TV Series ("Ommabop seriallar") */}
      <MovieCarousel
        title="Ommabop seriallar"
        subtitle="Bir nafasda ko'riladigan ko'p qismli durdonalar"
        movies={tvSeries}
        viewAllLink="/tv"
        icon={Tv}
      />

      {/* 7. Anime Recommendations ("Anime olami") */}
      <MovieCarousel
        title="Yapon Anime olami"
        subtitle="Titanlar jangi, Demon Slayer va Miyazaki ertaklari"
        movies={anime}
        viewAllLink="/anime"
        icon={Sparkles}
      />

      {/* 8. Personalized Recommendations ("Siz uchun tavsiyalar") */}
      <MovieCarousel
        title="Siz uchun shaxsiy tavsiyalar"
        subtitle="Qiziqishlaringiz va didingizga asoslangan kino saralari"
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
              Aqlli tavsiya tizimi
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
              Kino uz AI Maslahatchisi
            </h2>
            <p className="text-sm text-kinotext-muted mt-1 max-w-xl">
              Nima ko'rishni bilmayapsizmi? Shunchaki istagingizni o'zbek tilida yozing va sun'iy intellekt sizga eng mos filmlarni topib beradi.
            </p>
          </div>

          <Link
            href="/ai-assistant"
            className="inline-flex items-center gap-2 rounded-xl border border-kinopurple-primary/50 bg-kinopurple-primary/10 px-4 py-2.5 text-xs font-bold text-kinopurple-secondary hover:bg-kinopurple-primary/20 transition self-start"
          >
            To'liq ekranda ochish <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <AiChatWidget embedded={true} />
      </section>
    </div>
  );
}
