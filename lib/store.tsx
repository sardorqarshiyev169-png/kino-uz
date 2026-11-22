'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, Review, UserProfile, AdminStats } from './types';
import { INITIAL_MOVIES } from './tmdb';

interface StoreContextType {
  user: UserProfile | null;
  login: (email: string, username?: string, role?: 'user' | 'admin') => void;
  logout: () => void;
  favorites: string[];
  toggleFavorite: (movieId: string | number) => void;
  isFavorite: (movieId: string | number) => boolean;
  watchlist: string[];
  toggleWatchlist: (movieId: string | number) => void;
  isWatchlist: (movieId: string | number) => boolean;
  viewingHistory: { movieId: string; title: string; poster_path: string; viewed_at: string }[];
  recordView: (movie: Movie) => void;
  reviews: Review[];
  addReview: (movieId: string | number, rating: number, comment: string) => void;
  deleteReview: (reviewId: string) => void;
  activeTrailerKey: string | null;
  openTrailer: (key: string) => void;
  closeTrailer: () => void;
  featuredMovieId: string;
  setFeaturedMovieId: (id: string) => void;
  adminStats: AdminStats;
  recordAiQuery: () => void;
  language: 'uz' | 'ru' | 'en';
  setLanguage: (lang: 'uz' | 'ru' | 'en') => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-owner',
  username: 'Sardor Qarshiyev (Asoschi)',
  email: 'sardorqarshiyev169@gmail.com',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role: 'admin',
  created_at: '2024-11-23T00:00:00Z',
  favorite_genres: ['Ilmiy-fantastika', 'Jangari', 'Tarixiy'],
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    user_id: 'usr-owner',
    username: 'Sardor Qarshiyev (Asoschi)',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
    movie_id: '157336',
    rating: 10,
    comment: 'Kino uz platformasining birinchi rasmiy sharhi. Sayt muvaffaqiyatli ishga tushirildi!',
    created_at: '2024-11-23T02:00:00Z',
    status: 'approved',
  },
];

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [favorites, setFavorites] = useState<string[]>(['157336', '693134', '1429']);
  const [watchlist, setWatchlist] = useState<string[]>(['872585', '94605']);
  const [viewingHistory, setViewingHistory] = useState<
    { movieId: string; title: string; poster_path: string; viewed_at: string }[]
  >([
    {
      movieId: '157336',
      title: 'Interstellar',
      poster_path: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      viewed_at: 'Bugun, 18:30',
    },
    {
      movieId: '693134',
      title: 'Dune: Part Two',
      poster_path: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      viewed_at: 'Kecha, 21:00',
    },
  ]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeTrailerKey, setActiveTrailerKey] = useState<string | null>(null);
  const [featuredMovieId, setFeaturedMovieId] = useState<string>('157336');
  const [language, setLanguage] = useState<'uz' | 'ru' | 'en'>('uz');
  const [realViewsCount, setRealViewsCount] = useState<number>(18);
  const [realAiQueriesCount, setRealAiQueriesCount] = useState<number>(6);

  // Load persistent store on browser mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('kinouz_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedFavs = localStorage.getItem('kinouz_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedWatch = localStorage.getItem('kinouz_watchlist');
      if (savedWatch) setWatchlist(JSON.parse(savedWatch));

      const savedReviews = localStorage.getItem('kinouz_reviews');
      if (savedReviews) setReviews(JSON.parse(savedReviews));

      const savedHistory = localStorage.getItem('kinouz_history');
      if (savedHistory) setViewingHistory(JSON.parse(savedHistory));

      const savedViews = localStorage.getItem('kinouz_real_views_count');
      if (savedViews) setRealViewsCount(Number(savedViews));

      const savedAiQueries = localStorage.getItem('kinouz_real_ai_queries_count');
      if (savedAiQueries) setRealAiQueriesCount(Number(savedAiQueries));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const login = (email: string, username?: string, role: 'user' | 'admin' = 'user') => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      username: username || email.split('@')[0],
      email,
      avatar_url:
        role === 'admin'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      role,
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
    try {
      localStorage.setItem('kinouz_user', JSON.stringify(newUser));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('kinouz_user');
    } catch {}
  };

  const toggleFavorite = (movieId: string | number) => {
    const sId = String(movieId);
    setFavorites((prev) => {
      const next = prev.includes(sId) ? prev.filter((id) => id !== sId) : [...prev, sId];
      try {
        localStorage.setItem('kinouz_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isFavorite = (movieId: string | number) => {
    return favorites.includes(String(movieId));
  };

  const toggleWatchlist = (movieId: string | number) => {
    const sId = String(movieId);
    setWatchlist((prev) => {
      const next = prev.includes(sId) ? prev.filter((id) => id !== sId) : [...prev, sId];
      try {
        localStorage.setItem('kinouz_watchlist', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isWatchlist = (movieId: string | number) => {
    return watchlist.includes(String(movieId));
  };

  const recordView = (movie: Movie) => {
    const sId = String(movie.id);
    setRealViewsCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('kinouz_real_views_count', String(next));
      } catch {}
      return next;
    });

    setViewingHistory((prev) => {
      const filtered = prev.filter((item) => item.movieId !== sId);
      const updated = [
        {
          movieId: sId,
          title: movie.title,
          poster_path: movie.poster_path,
          viewed_at: 'Hozirgina',
        },
        ...filtered,
      ].slice(0, 15);
      try {
        localStorage.setItem('kinouz_history', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const recordAiQuery = () => {
    setRealAiQueriesCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('kinouz_real_ai_queries_count', String(next));
      } catch {}
      return next;
    });
  };

  const addReview = (movieId: string | number, rating: number, comment: string) => {
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      user_id: user?.id || 'usr-owner',
      username: user?.username || 'Sardor Qarshiyev',
      avatar_url: user?.avatar_url,
      movie_id: movieId,
      rating,
      comment,
      created_at: new Date().toISOString(),
      status: 'approved',
    };
    setReviews((prev) => {
      const next = [newRev, ...prev];
      try {
        localStorage.setItem('kinouz_reviews', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => {
      const next = prev.filter((r) => r.id !== reviewId);
      try {
        localStorage.setItem('kinouz_reviews', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const openTrailer = (key: string) => setActiveTrailerKey(key);
  const closeTrailer = () => setActiveTrailerKey(null);

  const adminStats: AdminStats = {
    totalUsers: 1,
    activeUsersToday: 1,
    totalMovies: INITIAL_MOVIES.length,
    totalViews: realViewsCount,
    totalReviews: reviews.length,
    aiQueriesCount: realAiQueriesCount,
    trendingCount: INITIAL_MOVIES.filter((m) => m.isTrending).length,
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        login,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        watchlist,
        toggleWatchlist,
        isWatchlist,
        viewingHistory,
        recordView,
        recordAiQuery,
        reviews,
        addReview,
        deleteReview,
        activeTrailerKey,
        openTrailer,
        closeTrailer,
        featuredMovieId,
        setFeaturedMovieId,
        adminStats,
        language,
        setLanguage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
