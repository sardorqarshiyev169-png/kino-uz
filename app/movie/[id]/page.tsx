'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMovieById, INITIAL_MOVIES, fetchFromTMDB, formatTmdbItem } from '@/lib/tmdb';
import { KNOWN_UZBEK_VIDEO_KEYS } from '@/lib/uzbek-movies';
import { useStore } from '@/lib/store';
import WhereToWatch from '@/components/WhereToWatch';
import MovieCarousel from '@/components/MovieCarousel';
import { Movie } from '@/lib/types';
import {
  Play,
  Film,
  Star,
  Calendar,
  Clock,
  Heart,
  Bookmark,
  ArrowLeft,
  Users,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Server,
  CheckCircle2,
  Tv,
} from 'lucide-react';

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = params.id as string;

  const [movie, setMovie] = useState<Movie | null>(() => getMovieById(movieId) || null);
  const [isPlayingOnline, setIsPlayingOnline] = useState(false);
  const [selectedServer, setSelectedServer] = useState<'server1' | 'server2' | 'server3'>('server1');
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const {
    openTrailer,
    toggleFavorite,
    isFavorite,
    toggleWatchlist,
    isWatchlist,
    reviews,
    addReview,
    recordView,
  } = useStore();

  const [userRating, setUserRating] = useState(10);
  const [commentText, setCommentText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // If movie not in local dataset, fetch live from TMDB API
  useEffect(() => {
    let current = getMovieById(movieId);
    if (current) {
      setMovie(current);
      recordView(current);
      return;
    }

    async function loadTmdbMovie() {
      try {
        let data = await fetchFromTMDB(`/movie/${movieId}`);
        let isTv = false;
        if (!data || !data.id) {
          data = await fetchFromTMDB(`/tv/${movieId}`);
          if (data && data.id) {
            isTv = true;
          }
        }
        if (data && data.id) {
          const formatted = formatTmdbItem(data, isTv ? 'tv' : 'movie');
          if (
            data.original_language === 'uz' ||
            (Array.isArray(data.origin_country) && data.origin_country.includes('UZ'))
          ) {
            formatted.isUzbek = true;
          }
          setMovie(formatted);
          recordView(formatted);
        } else {
          setMovie(INITIAL_MOVIES[0]);
        }
      } catch (err) {
        setMovie(INITIAL_MOVIES[0]);
      }
    }
    loadTmdbMovie();
  }, [movieId]);

  if (!movie) {
    return (
      <div className="min-h-screen py-24 text-center text-xs text-kinotext-muted">
        Film ma'lumotlari yuklanmoqda...
      </div>
    );
  }

  const isFav = isFavorite(movie.id);
  const isSaved = isWatchlist(movie.id);

  // Similar movies
  const similarMovies = INITIAL_MOVIES.filter(
    (m) => String(m.id) !== String(movie.id)
  );

  const movieReviews = reviews.filter((r) => String(r.movie_id) === String(movie.id));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addReview(movie.id, userRating, commentText);
    setCommentText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const isTvShow = movie.media_type === 'tv' || movie.media_type === 'anime';

  // Real full movie stream URLs: National Uzbek cinema uses verified Full HD feeds; Foreign & Tarjima movies use high-speed multiembed cinema servers
  const getVideoSrc = () => {
    // 1. Direct Uzbek embed URL (e.g. Mover.uz with 100% full Uzbek dubbing)
    if (movie.embed_url) {
      if (selectedServer === 'server1') {
        return movie.embed_url;
      }
      if (selectedServer === 'server2') {
        return `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`;
      }
      return `https://embed.su/embed/movie/${movie.id}`;
    }

    const isNationalUzbek = Boolean(movie.isUzbek && !movie.isTarjima);
    const nationalKey = isNationalUzbek ? (movie.trailer_key || KNOWN_UZBEK_VIDEO_KEYS[String(movie.id)]) : undefined;

    // National Uzbek movies (Super Kelinchak, Shum bola, O'tkan kunlar, etc.)
    if (nationalKey) {
      if (selectedServer === 'server1') {
        return `https://www.youtube-nocookie.com/embed/${nationalKey}?autoplay=1&rel=0`;
      }
      if (selectedServer === 'server2') {
        return `https://www.youtube.com/embed/${nationalKey}?autoplay=1`;
      }
      return `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`;
    }

    // Foreign & Tarjima Movies (Titanik, Forsaj, Garri Potter, Avatar, Interstellar, etc.)
    // Full 2-3 hour movies stream from dedicated cinema servers:
    if (selectedServer === 'server1') {
      return isTvShow
        ? `https://multiembed.mov/?video_id=${movie.id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`
        : `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`;
    }
    if (selectedServer === 'server2') {
      return isTvShow
        ? `https://embed.su/embed/tv/${movie.id}/${selectedSeason}/${selectedEpisode}`
        : `https://embed.su/embed/movie/${movie.id}`;
    }
    return isTvShow
      ? `https://vidlink.pro/tv/${movie.id}/${selectedSeason}/${selectedEpisode}`
      : `https://vidlink.pro/movie/${movie.id}`;
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Top Backdrop Banner with Atmosphere */}
      <div className="relative w-full h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden select-none">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="h-full w-full object-cover object-center filter brightness-[0.7] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0912] via-[#0B0912]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0912] via-[#0B0912]/80 to-transparent w-full md:w-2/3" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-xl border border-kinodark-border bg-kinodark-card/80 px-3.5 py-2 text-xs font-semibold text-kinotext-main hover:bg-kinodark-surface backdrop-blur-md transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Orqaga
          </button>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-40 md:-mt-52 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Left: Poster & Action Buttons */}
          <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
            <div className="overflow-hidden rounded-2xl border-2 border-kinodark-border bg-kinodark-card shadow-2xl shadow-kinopurple-primary/20">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>

            {/* Actions */}
            <div className="mt-4 space-y-2.5">
              {/* Online Cinema Full Movie Player Trigger */}
              <button
                onClick={() => {
                  setIsPlayingOnline(true);
                  setSelectedServer('server1');
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] py-3.5 text-sm font-bold text-white shadow-lg shadow-kinopurple-primary/30 hover:brightness-110 transition"
              >
                <Play className="h-4 w-4 fill-current" />
                Kinoni Ko'rish ({movie.embed_url ? "O'zbek tilida" : "To'liq Film HD"})
              </button>

              {movie.external_watch_url && (
                <a
                  href={movie.external_watch_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 py-2.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition"
                >
                  <ExternalLink className="h-4 w-4 text-sky-400" />
                  Mover.uz'da ochish (O'zbek tilida)
                </a>
              )}

              {movie.trailer_key && (
                <button
                  onClick={() => openTrailer(movie.trailer_key!)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-kinodark-border bg-kinodark-surface/80 py-2.5 text-xs font-semibold text-kinotext-main hover:bg-kinodark-surface transition"
                >
                  <Film className="h-4 w-4 text-kinopurple-secondary" />
                  Treylerni ko'rish (YouTube)
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition ${
                    isFav
                      ? 'border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-500/30'
                      : 'border-kinodark-border bg-kinodark-card text-kinotext-muted hover:text-rose-400'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                  {isFav ? 'Sevimlilarda' : 'Sevimlilar'}
                </button>

                <button
                  onClick={() => toggleWatchlist(movie.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition ${
                    isSaved
                      ? 'border-kinopurple-primary bg-kinopurple-primary text-white shadow-glow-purple'
                      : 'border-kinodark-border bg-kinodark-card text-kinotext-muted hover:text-white'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Ro\'yxatda' : 'Keyin ko\'rish'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Detailed Information */}
          <div className="flex-1 space-y-6">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 font-bold text-amber-400 border border-amber-500/30">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count?.toLocaleString()} baho)
                </span>

                <span className="flex items-center gap-1 rounded-full bg-kinodark-card px-3 py-1 text-kinotext-main border border-kinodark-border">
                  <Calendar className="h-3.5 w-3.5 text-kinopurple-secondary" />
                  {movie.release_date}
                </span>

                {movie.runtime && (
                  <span className="flex items-center gap-1 rounded-full bg-kinodark-card px-3 py-1 text-kinotext-main border border-kinodark-border">
                    <Clock className="h-3.5 w-3.5 text-kinopurple-secondary" />
                    {movie.runtime} daqiqa
                  </span>
                )}

                <span className="rounded-full bg-kinopurple-primary/20 px-3 py-1 text-[11px] font-bold text-kinopurple-secondary border border-kinopurple-primary/40 uppercase tracking-wider">
                  {movie.media_type}
                </span>
              </div>

              {/* Title & Original Title */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {movie.title}
              </h1>
              {movie.original_title && movie.original_title !== movie.title && (
                <p className="text-sm text-kinotext-muted italic mt-1">
                  Asl nomi: {movie.original_title}
                </p>
              )}

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-sm font-medium text-kinopurple-secondary mt-2">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g, idx) => {
                const name = typeof g === 'string' ? g : g.name;
                return (
                  <span
                    key={idx}
                    className="rounded-xl border border-kinodark-border bg-kinodark-surface px-3 py-1 text-xs font-semibold text-kinotext-muted"
                  >
                    {name}
                  </span>
                );
              })}
            </div>

            {/* Full Movie Online Cinema Player */}
            {isPlayingOnline && (
              <div className="rounded-3xl border border-kinopurple-primary bg-kinodark-card overflow-hidden shadow-2xl shadow-kinopurple-primary/40 p-3 sm:p-5 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-kinodark-border pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-kinopurple-primary text-white shadow-glow-purple">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {movie.title} — To'liq film
                      </h4>
                      <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> {movie.embed_url ? "O'zbek tilida to'liq film (Mover HD)" : "To'liq film pleyeri (Full HD)"}
                      </p>
                    </div>
                  </div>

                  {/* Server & Season Buttons */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
                    {isTvShow && (
                      <div className="flex items-center gap-1.5 bg-kinodark-surface p-1 rounded-xl border border-kinodark-border mr-1">
                        <select
                          value={selectedSeason}
                          onChange={(e) => setSelectedSeason(Number(e.target.value))}
                          className="bg-kinodark-card text-white text-xs font-semibold rounded-lg px-2 py-1 border border-kinodark-border focus:outline-none focus:border-kinopurple-primary"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                            <option key={s} value={s}>
                              {s}-Mavsum
                            </option>
                          ))}
                        </select>
                        <select
                          value={selectedEpisode}
                          onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                          className="bg-kinodark-card text-white text-xs font-semibold rounded-lg px-2 py-1 border border-kinodark-border focus:outline-none focus:border-kinopurple-primary"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((ep) => (
                            <option key={ep} value={ep}>
                              {ep}-Qism
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedServer('server1')}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                        selectedServer === 'server1'
                          ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                          : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
                      }`}
                    >
                      {movie.embed_url ? "🇺🇿 O'zbek tilida (Mover)" : 'Asosiy HD'}
                    </button>
                    {!movie.embed_url && (
                      <>
                        <button
                          onClick={() => setSelectedServer('server2')}
                          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                            selectedServer === 'server2'
                              ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                              : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
                          }`}
                        >
                          Zaxira 1
                        </button>
                        <button
                          onClick={() => setSelectedServer('server3')}
                          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                            selectedServer === 'server3'
                              ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                              : 'bg-kinodark-surface text-kinotext-muted hover:text-white'
                          }`}
                        >
                          Zaxira 2
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setIsPlayingOnline(false)}
                      className="rounded-xl bg-kinodark-surface border border-kinodark-border px-2.5 py-1.5 text-xs font-semibold text-kinotext-muted hover:text-white ml-1"
                    >
                      ✕ Yopish
                    </button>
                  </div>
                </div>

                {/* Real Movie Video Frame */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-kinodark-border">
                  <iframe
                    key={`${selectedServer}-${selectedSeason}-${selectedEpisode}`}
                    src={getVideoSrc()}
                    title={movie.title}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-kinotext-muted px-1">
                  <span>Film davomiyligi: {movie.runtime || 120} daqiqa</span>
                  <span>Agar bitta server sekin ishlasa, yuqoridagi 2-Server yoki 3-Serverni bosing.</span>
                </div>

                {movie.isTarjima && !movie.embed_url && (
                  <div className="mt-2 text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
                    <span>💡 Tarjima filmlarda audio yo'lakchasini sozlash uchun pleyer ichidagi sozlamalar (Audio/Settings) bo'limidan foydalaning yoki pastdagi AsilMedia / Mover.uz platformalaridan tomosha qiling.</span>
                  </div>
                )}
              </div>
            )}

            {/* Overview / Storyline */}
            <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6 space-y-3">
              <h3 className="font-heading text-base font-bold text-white">Syujet (Mazmuni)</h3>
              <p className="text-sm text-kinotext-main leading-relaxed">
                {movie.uz_overview || movie.overview}
              </p>
            </div>

            {/* Cast & Crew Section */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6">
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-kinopurple-primary" />
                  Bosh rollarda (Aktyorlar)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {movie.cast.map((actor) => (
                    <div
                      key={actor.id}
                      className="flex items-center gap-3 rounded-xl border border-kinodark-border/60 bg-kinodark-surface/60 p-2.5"
                    >
                      <img
                        src={actor.profile_path || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80'}
                        alt={actor.name}
                        className="h-12 w-12 rounded-full object-cover flex-shrink-0 ring-1 ring-kinopurple-primary/40"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{actor.name}</div>
                        <div className="text-[11px] text-kinotext-muted truncate">
                          {actor.character}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Where to Watch Section */}
            <WhereToWatch providers={movie.where_to_watch} movieTitle={movie.title} />

            {/* Reviews Section */}
            <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6">
              <div className="flex items-center justify-between border-b border-kinodark-border/60 pb-4 mb-6">
                <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-kinopurple-primary" />
                  Tomoshabinlar fikrlari ({movieReviews.length})
                </h3>
              </div>

              {/* Review Input Form */}
              <form onSubmit={handleReviewSubmit} className="mb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-kinotext-muted">Baholang:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className={`text-sm transition ${
                          star <= userRating ? 'text-amber-400' : 'text-kinodark-border'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-amber-400">
                      {userRating} / 10
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Film haqidagi fikringizni yozing..."
                    className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface p-3 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  {reviewSubmitted && (
                    <span className="text-xs font-semibold text-emerald-400">
                      Rahmat! Fikringiz qabul qilindi.
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto rounded-xl bg-kinopurple-primary px-5 py-2 text-xs font-bold text-white shadow-md shadow-kinopurple-primary/30 hover:brightness-110 transition"
                  >
                    Fikr qoldirish
                  </button>
                </div>
              </form>

              {/* Review List */}
              <div className="space-y-4">
                {movieReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-xl border border-kinodark-border/50 bg-kinodark-surface/40 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80'}
                          alt={rev.username}
                          className="h-8 w-8 rounded-full object-cover ring-1 ring-kinodark-border"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{rev.username}</div>
                          <div className="text-[10px] text-kinotext-muted">
                            {new Date(rev.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-400">
                        <Star className="h-3 w-3 fill-current" />
                        {rev.rating} / 10
                      </span>
                    </div>
                    <p className="text-xs text-kinotext-main leading-relaxed pl-10">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Carousel */}
      <div className="mt-16">
        <MovieCarousel
          title="O'xshash filmlar"
          subtitle="Ushbu kartina muxlislari uchun maxsus tavsiyalar"
          movies={similarMovies}
        />
      </div>
    </div>
  );
}
