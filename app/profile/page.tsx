'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import {
  User,
  Mail,
  Shield,
  Heart,
  Bookmark,
  History,
  LogOut,
  Camera,
  Star,
  Settings,
  Sparkles,
} from 'lucide-react';
import AuthModal from '@/components/AuthModal';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
];

export default function ProfilePage() {
  const { user, logout, favorites, watchlist, viewingHistory } = useStore();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeAvatar, setActiveAvatar] = useState(user?.avatar_url || AVATAR_OPTIONS[0]);

  if (!user) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="rounded-3xl border border-kinodark-border bg-kinodark-card p-10 text-center max-w-md shadow-2xl">
          <User className="h-16 w-16 text-kinopurple-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-white">Profilga kirish</h2>
          <p className="text-xs text-kinotext-muted mt-2 mb-6">
            Shaxsiy kabinet, saqlangan filmlar va ko'rishlar tarixini ochish uchun profilingizga kiring.
          </p>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="w-full rounded-xl bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] py-3 text-xs font-bold text-white shadow-lg shadow-kinopurple-primary/30"
          >
            Kirish yoki Ro'yxatdan o'tish
          </button>
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Profile Card Header */}
      <div className="relative overflow-hidden rounded-3xl border border-kinodark-border bg-gradient-to-br from-kinodark-surface to-kinodark-card p-6 sm:p-10 mb-10 shadow-card">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar */}
          <div className="relative">
            <img
              src={activeAvatar}
              alt={user.username}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover ring-2 ring-kinopurple-primary shadow-glow-purple"
            />
            {user.role === 'admin' && (
              <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-kinopurple-primary text-white shadow-md">
                <Shield className="h-4 w-4" />
              </span>
            )}
          </div>

          {/* Info */}
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {user.username}
              </h1>
              {user.role === 'admin' && (
                <span className="self-center sm:self-auto rounded-full bg-kinopurple-primary/20 border border-kinopurple-primary/40 px-3 py-0.5 text-[11px] font-bold text-kinopurple-secondary">
                  Administrator
                </span>
              )}
            </div>

            <p className="text-xs text-kinotext-muted flex items-center justify-center sm:justify-start gap-1.5 mb-3">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </p>

            {/* Quick Stats Pills */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <Link
                href="/favorites"
                className="flex items-center gap-2 rounded-xl bg-kinodark-card px-3.5 py-1.5 border border-kinodark-border text-xs text-kinotext-main hover:border-rose-500/50 transition"
              >
                <Heart className="h-3.5 w-3.5 text-rose-500" />
                <span>{favorites.length} ta Sevimli</span>
              </Link>

              <Link
                href="/watchlist"
                className="flex items-center gap-2 rounded-xl bg-kinodark-card px-3.5 py-1.5 border border-kinodark-border text-xs text-kinotext-main hover:border-kinopurple-primary/50 transition"
              >
                <Bookmark className="h-3.5 w-3.5 text-kinopurple-secondary" />
                <span>{watchlist.length} ta Rejada</span>
              </Link>

              <div className="flex items-center gap-2 rounded-xl bg-kinodark-card px-3.5 py-1.5 border border-kinodark-border text-xs text-kinotext-muted">
                <History className="h-3.5 w-3.5 text-amber-400" />
                <span>{viewingHistory.length} ta Ko'rilgan</span>
              </div>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition self-center sm:self-start"
          >
            <LogOut className="h-4 w-4" />
            Chiqish
          </button>
        </div>

        {/* Change Avatar Picker */}
        <div className="mt-8 pt-6 border-t border-kinodark-border/60">
          <p className="text-xs font-semibold text-kinotext-muted mb-3 flex items-center gap-1.5">
            <Camera className="h-3.5 w-3.5" /> Profil rasmini tanlang:
          </p>
          <div className="flex items-center gap-3">
            {AVATAR_OPTIONS.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveAvatar(img)}
                className={`relative rounded-xl overflow-hidden ring-2 transition ${
                  activeAvatar === img ? 'ring-kinopurple-primary scale-105' : 'ring-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Avatar" className="h-10 w-10 object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Viewing History Section */}
      <div className="rounded-3xl border border-kinodark-border bg-kinodark-card p-6 sm:p-8 shadow-card">
        <div className="flex items-center justify-between border-b border-kinodark-border/60 pb-4 mb-6">
          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <History className="h-5 w-5 text-kinopurple-primary" />
            So'nggi ko'rishlar tarixi
          </h3>
          <span className="text-xs text-kinotext-muted">
            Platformada ochilgan oxirgi kartinalar
          </span>
        </div>

        {viewingHistory.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {viewingHistory.map((item, idx) => (
              <Link
                key={idx}
                href={`/movie/${item.movieId}`}
                className="group flex flex-col rounded-xl border border-kinodark-border/60 bg-kinodark-surface/40 overflow-hidden hover:border-kinopurple-primary/60 transition"
              >
                <div className="aspect-[2/3] w-full overflow-hidden bg-kinodark-surface">
                  <img
                    src={item.poster_path}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="p-2.5">
                  <h4 className="font-heading text-xs font-bold text-white truncate group-hover:text-kinopurple-secondary transition">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-kinotext-muted mt-0.5">{item.viewed_at}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-kinotext-muted text-center py-8">
            Ko'rishlar tarixi hali mavjud emas. Filmlarni ochib tomosha qiling!
          </p>
        )}
      </div>
    </div>
  );
}
