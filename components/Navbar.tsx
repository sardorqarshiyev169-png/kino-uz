'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import Logo from './Logo';
import AuthModal from './AuthModal';
import {
  Search,
  Heart,
  Bookmark,
  Sparkles,
  Menu,
  X,
  User,
  Shield,
  Film,
  Tv,
  Flame,
  Star,
} from 'lucide-react';
import { INITIAL_MOVIES, getAllMovies } from '@/lib/tmdb';
import { Movie } from '@/lib/types';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, favorites, watchlist } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Live autocomplete search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase().trim();
    const results = getAllMovies().filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.original_title && m.original_title.toLowerCase().includes(q)) ||
        m.genres.some((g) => {
          const name = typeof g === 'string' ? g : g.name;
          return name.toLowerCase().includes(q);
        })
    ).slice(0, 5);
    setSearchResults(results);
  }, [searchQuery]);

  // Click outside listener for search autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/movies', label: 'Movies', icon: Film },
    { href: '/tv', label: 'TV Shows', icon: Tv },
    { href: '/anime', label: 'Anime', icon: Flame },
    { href: '/uzbek-movies', label: "O'zbek kino", badge: 'UZ' },
    {
      href: '/ai-assistant',
      label: 'AI Assistant',
      icon: Sparkles,
      highlight: true,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Left: Brand Logo & Navigation Links */}
          <div className="flex items-center gap-8">
            <Logo size="md" />

            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition duration-200 ${
                      isActive
                        ? 'bg-kinopurple-primary/15 text-kinopurple-secondary shadow-sm shadow-kinopurple-primary/20'
                        : link.highlight
                        ? 'text-kinopurple-secondary hover:bg-kinopurple-primary/10'
                        : 'text-kinotext-muted hover:text-white hover:bg-kinodark-surface'
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-4 w-4 ${
                          link.highlight
                            ? 'text-kinopurple-primary animate-pulse'
                            : isActive
                            ? 'text-kinopurple-secondary'
                            : 'text-kinotext-muted'
                        }`}
                      />
                    )}
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                    {link.highlight && (
                      <span className="ml-1 rounded-full bg-kinopurple-primary px-1.5 py-0.2 text-[10px] font-bold text-white uppercase tracking-wider">
                        AI
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center/Right: Search Bar with Autocomplete Dropdown */}
          <div className="relative flex-1 max-w-md mx-4 hidden sm:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-kinotext-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search movies, TV shows, actors..."
                  className="w-full rounded-full border border-kinodark-border bg-kinodark-card/90 py-2 pl-10 pr-4 text-xs lg:text-sm text-kinotext-main placeholder-kinotext-muted/60 transition focus:border-kinopurple-primary focus:bg-kinodark-surface focus:outline-none focus:ring-1 focus:ring-kinopurple-primary shadow-inner"
                />
              </div>
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-kinodark-border bg-kinodark-card shadow-2xl z-50 animate-fadeIn">
                <div className="p-2 border-b border-kinodark-border/50 text-[11px] font-semibold text-kinotext-muted uppercase tracking-wider px-3">
                  Quick Results
                </div>
                <div className="divide-y divide-kinodark-border/40">
                  {searchResults.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2.5 hover:bg-kinodark-surface/80 transition"
                    >
                      <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="h-12 w-8 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-kinotext-main truncate">
                          {movie.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-kinotext-muted">
                          <span>{movie.release_date.substring(0, 4)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-amber-400">
                            <Star className="h-3 w-3 fill-current" />
                            {movie.vote_average.toFixed(1)}
                          </span>
                          <span>•</span>
                          <span className="capitalize">{movie.media_type}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="block p-2.5 text-center text-xs font-semibold text-kinopurple-secondary hover:bg-kinopurple-primary/10 transition"
                >
                  View all results →
                </Link>
              </div>
            )}
          </div>

          {/* Right: Shortcuts (Watchlist, Favorites, Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Watchlist icon */}
            <Link
              href="/watchlist"
              className="relative rounded-xl p-2 text-kinotext-muted hover:bg-kinodark-surface hover:text-white transition"
              title="Watchlist"
            >
              <Bookmark className="h-5 w-5" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-kinopurple-primary text-[10px] font-bold text-white shadow-sm">
                  {watchlist.length}
                </span>
              )}
            </Link>

            {/* Favorites icon */}
            <Link
              href="/favorites"
              className="relative rounded-xl p-2 text-kinotext-muted hover:bg-kinodark-surface hover:text-white transition"
              title="Favorites"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Profile / Login dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-kinodark-border p-1 hover:border-kinopurple-primary/50 transition focus:outline-none"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    className="h-7 w-7 rounded-full object-cover ring-1 ring-kinopurple-primary/50"
                  />
                  <span className="hidden lg:inline text-xs font-semibold text-kinotext-main pr-2">
                    {user.username}
                  </span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-kinodark-border bg-kinodark-card p-2 shadow-2xl z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-kinodark-border/50">
                      <p className="text-xs font-bold text-kinotext-main truncate">{user.username}</p>
                      <p className="text-[11px] text-kinotext-muted truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-kinotext-main hover:bg-kinodark-surface transition mt-1"
                    >
                      <User className="h-4 w-4 text-kinopurple-secondary" />
                      Profile
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-kinopurple-secondary bg-kinopurple-primary/10 hover:bg-kinopurple-primary/20 transition mt-1"
                      >
                        <Shield className="h-4 w-4 text-kinopurple-primary" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition mt-1 text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="rounded-full bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-kinopurple-primary/30 hover:brightness-110 transition"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-xl p-2 text-kinotext-muted hover:bg-kinodark-surface hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-kinodark-border bg-kinodark-card/95 px-4 pt-3 pb-6 backdrop-blur-xl animate-fadeIn">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-kinotext-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, TV shows, actors..."
                  className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2 pl-10 pr-4 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none"
                />
              </div>
            </form>

            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium ${
                      isActive
                        ? 'bg-kinopurple-primary/15 text-kinopurple-secondary'
                        : 'text-kinotext-main hover:bg-kinodark-surface'
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4 text-kinopurple-secondary" />}
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-auto rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-kinopurple-primary/15 px-4 py-2.5 text-sm font-semibold text-kinopurple-secondary mt-2"
                >
                  <Shield className="h-4 w-4 text-kinopurple-primary" />
                  <span>Admin Panel</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
