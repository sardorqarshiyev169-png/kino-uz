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
  language: 'uz' | 'ru' | 'en';
  setLanguage: (lang: 'uz' | 'ru' | 'en') => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-1',
  username: 'Azizbek',
  email: 'azizbek@kino.uz',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role: 'admin',
  created_at: '2024-01-15T10:00:00Z',
  favorite_genres: ['Ilmiy-fantastika', 'Jangari', 'Anime'],
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    user_id: 'usr-demo-1',
    username: 'Jasur_K',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80',
    movie_id: '157336',
    rating: 10,
    comment: 'Interstellar — kinosan\'atining eng cho\'qqisi! Saundtreki va qora tuynuk tasvirlari shunchaki hayratlanarli darajada mukammal.',
    created_at: '2024-10-12T14:20:00Z',
    status: 'approved',
  },
  {
    id: 'rev-2',
    user_id: 'usr-demo-2',
    username: 'Madina_Art',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80',
    movie_id: '693134',
    rating: 9,
    comment: 'Dyuna 2 filmi har bir kadrida estetik zavq beradi. Timoti va Zendayaning ijrosi juda ishonarli chiqqan.',
    created_at: '2024-11-01T09:15:00Z',
    status: 'approved',
  },
  {
    id: 'rev-3',
    user_id: 'usr-demo-3',
    username: 'Bobur_Cinema',
    avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=128&q=80',
    movie_id: '27205',
    rating: 10,
    comment: 'Inception filmini 3 marta ko\'rdim, har safar yangi qirralarini kashf qilaman. Leonardo DiCaprio roli juda zo\'r.',
    created_at: '2024-11-18T18:40:00Z',
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

  const addReview = (movieId: string | number, rating: number, comment: string) => {
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      user_id: user?.id || 'guest',
      username: user?.username || 'Kino Muxlisi',
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
    totalUsers: 14280,
    activeUsersToday: 1840,
    totalMovies: INITIAL_MOVIES.length + 840,
    totalViews: 248900,
    totalReviews: reviews.length + 3120,
    aiQueriesCount: 8940,
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
