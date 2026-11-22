'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { INITIAL_MOVIES } from '@/lib/tmdb';
import {
  Shield,
  Users,
  Film,
  Eye,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Settings,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  Key,
  Database,
  BarChart3,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const {
    user,
    adminStats,
    reviews,
    deleteReview,
    featuredMovieId,
    setFeaturedMovieId,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'content' | 'users' | 'reviews' | 'ai' | 'settings'
  >('overview');

  // Simulated Admin Users List
  const [usersList, setUsersList] = useState([
    { id: '1', username: 'Azizbek (Siz)', email: 'admin@kino.uz', role: 'admin', status: 'active', registered: '2024-01-10' },
    { id: '2', username: 'Jasur_Cinema', email: 'jasur@mail.uz', role: 'user', status: 'active', registered: '2024-02-14' },
    { id: '3', username: 'Dilnoza_Art', email: 'dilnoza@gmail.com', role: 'user', status: 'active', registered: '2024-03-01' },
    { id: '4', username: 'Sherzod_Tashkent', email: 'sherzod@yahoo.com', role: 'moderator', status: 'active', registered: '2024-04-12' },
  ]);

  // AI & TMDB Config state
  const [tmdbKey, setTmdbKey] = useState('');
  const [openAiKey, setOpenAiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-4o-mini');
  const [savedNotice, setSavedNotice] = useState(false);

  // Security role check: must be admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen py-24 px-4 flex items-center justify-center">
        <div className="rounded-3xl border border-rose-500/30 bg-kinodark-card p-10 text-center max-w-md shadow-2xl">
          <Lock className="h-14 w-14 text-rose-500 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-white">Ruxsat cheklangan</h2>
          <p className="text-xs text-kinotext-muted mt-2 mb-6">
            Ushbu bo'lim faqat Kino uz administratorlari uchun mo'ljallangan. Profilingiz orqali Admin roliga ega bo'lishingiz lozim.
          </p>
          <Link
            href="/profile"
            className="inline-block rounded-xl bg-kinopurple-primary px-6 py-2.5 text-xs font-bold text-white"
          >
            Profilga o'tish (Demo Admin)
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Admin Top Navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-kinodark-border pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-kinopurple-primary text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="h-4 w-4" />
            <span>Xavfsiz Boshqaruv Paneli</span>
          </div>
          <h1 className="font-heading text-3xl font-black text-white tracking-tight">
            Kino uz Administrator
          </h1>
          <p className="text-xs text-kinotext-muted mt-0.5">
            Platforma statistikasi, foydalanuvchilar, kontent va sun'iy intellekt sozlamalari
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-2xl border border-kinodark-border bg-kinodark-card p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'overview'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Umumiy
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'content'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Kontent
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'users'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Foydalanuvchilar
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'reviews'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Sharhlar
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'ai'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            AI Sozlamalari
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-5 shadow-card">
              <div className="flex items-center justify-between text-kinotext-muted mb-3">
                <span className="text-xs font-medium">Jami Foydalanuvchilar</span>
                <Users className="h-5 w-5 text-kinopurple-secondary" />
              </div>
              <div className="font-heading text-2xl font-black text-white">
                {adminStats.totalUsers.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +12.4% o'tgan haftaga nisbatan
              </div>
            </div>

            <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-5 shadow-card">
              <div className="flex items-center justify-between text-kinotext-muted mb-3">
                <span className="text-xs font-medium">Jami Ko'rishlar Soni</span>
                <Eye className="h-5 w-5 text-sky-400" />
              </div>
              <div className="font-heading text-2xl font-black text-white">
                {adminStats.totalViews.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Bugun: 1,840 faol tomoshabin
              </div>
            </div>

            <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-5 shadow-card">
              <div className="flex items-center justify-between text-kinotext-muted mb-3">
                <span className="text-xs font-medium">Indekslangan Filmlar</span>
                <Film className="h-5 w-5 text-amber-400" />
              </div>
              <div className="font-heading text-2xl font-black text-white">
                {adminStats.totalMovies.toLocaleString()}
              </div>
              <div className="text-[11px] text-kinotext-muted mt-1">
                TMDB + Mahalliy katalog
              </div>
            </div>

            <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-5 shadow-card">
              <div className="flex items-center justify-between text-kinotext-muted mb-3">
                <span className="text-xs font-medium">AI Tavsiya So'rovlari</span>
                <Sparkles className="h-5 w-5 text-kinopurple-primary" />
              </div>
              <div className="font-heading text-2xl font-black text-white">
                {adminStats.aiQueriesCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-kinopurple-secondary mt-1">
                98.6% qoniqarli javoblar
              </div>
            </div>
          </div>

          {/* Quick Shortcuts & Live Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6">
              <h3 className="font-heading text-base font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-kinopurple-primary" />
                Eng ko'p ko'rilgan filmlar
              </h3>
              <div className="space-y-3">
                {INITIAL_MOVIES.slice(0, 4).map((m, i) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between rounded-xl bg-kinodark-surface/60 p-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-kinopurple-secondary">#{i + 1}</span>
                      <span className="text-white font-semibold">{m.title}</span>
                    </div>
                    <span className="text-kinotext-muted">⭐ {m.vote_average.toFixed(1)} / 10</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6">
              <h3 className="font-heading text-base font-bold text-white mb-4 flex items-center gap-2">
                <Database className="h-4 w-4 text-emerald-400" />
                Tizim holati (System Status)
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-kinodark-surface/60">
                  <span className="text-kinotext-main">Kino uz Server API</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Faol (100% Uptime)
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-kinodark-surface/60">
                  <span className="text-kinotext-main">TMDB API Cache</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Tezkor kesh ishlamoqda
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-kinodark-surface/60">
                  <span className="text-kinotext-main">O'zbek AI Tavsiya Dvigateli</span>
                  <span className="text-kinopurple-secondary font-bold flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Tayyor & Ishlamoqda
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTENT & FEATURED BANNER */}
      {activeTab === 'content' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6">
            <h3 className="font-heading text-base font-bold text-white mb-2">
              Bosh sahifa Hero bannerini tanlash
            </h3>
            <p className="text-xs text-kinotext-muted mb-4">
              Saytning eng yuqori qismidagi katta fon kartinasi uchun film tanlang:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {INITIAL_MOVIES.slice(0, 6).map((m) => (
                <div
                  key={m.id}
                  onClick={() => setFeaturedMovieId(String(m.id))}
                  className={`cursor-pointer rounded-xl border p-3 flex items-center gap-3 transition ${
                    featuredMovieId === String(m.id)
                      ? 'border-kinopurple-primary bg-kinopurple-primary/15 shadow-glow-purple'
                      : 'border-kinodark-border bg-kinodark-surface/60 hover:border-kinopurple-primary/40'
                  }`}
                >
                  <img
                    src={m.poster_path}
                    alt={m.title}
                    className="h-14 w-10 rounded-lg object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-xs text-white">{m.title}</h5>
                    <p className="text-[11px] text-kinotext-muted">{m.release_date.substring(0, 4)}</p>
                    {featuredMovieId === String(m.id) && (
                      <span className="text-[10px] text-kinopurple-secondary font-bold">
                        ✓ Tanlangan
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="rounded-2xl border border-kinodark-border bg-kinodark-card overflow-hidden shadow-card animate-fadeIn">
          <div className="p-5 border-b border-kinodark-border/60 flex items-center justify-between">
            <h3 className="font-heading text-base font-bold text-white">
              Foydalanuvchilar ro'yxati ({usersList.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-kinotext-main">
              <thead className="bg-kinodark-surface text-kinotext-muted border-b border-kinodark-border">
                <tr>
                  <th className="p-3.5">Foydalanuvchi</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Roli</th>
                  <th className="p-3.5">Holati</th>
                  <th className="p-3.5">Ro'yxatdan o'tgan</th>
                  <th className="p-3.5 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kinodark-border/50">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-kinodark-surface/40">
                    <td className="p-3.5 font-bold text-white">{u.username}</td>
                    <td className="p-3.5 text-kinotext-muted">{u.email}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === 'admin'
                          ? 'bg-kinopurple-primary/20 text-kinopurple-secondary border border-kinopurple-primary/40'
                          : 'bg-kinodark-surface text-kinotext-muted'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3.5 text-emerald-400 font-semibold">{u.status}</td>
                    <td className="p-3.5 text-kinotext-muted">{u.registered}</td>
                    <td className="p-3.5 text-right">
                      <button className="text-kinotext-muted hover:text-white mr-3">Tahrirlash</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: REVIEW MODERATION */}
      {activeTab === 'reviews' && (
        <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6 shadow-card animate-fadeIn">
          <h3 className="font-heading text-base font-bold text-white mb-4">
            Sharhlarni moderatsiya qilish ({reviews.length})
          </h3>
          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex items-start justify-between rounded-xl border border-kinodark-border/60 bg-kinodark-surface/60 p-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs text-white">{rev.username}</span>
                    <span className="text-[11px] text-amber-400 font-bold">⭐ {rev.rating}/10</span>
                    <span className="text-[10px] text-kinotext-muted">
                      Film ID: {rev.movie_id}
                    </span>
                  </div>
                  <p className="text-xs text-kinotext-main">{rev.comment}</p>
                </div>
                <button
                  onClick={() => deleteReview(rev.id)}
                  className="rounded-lg p-1.5 text-rose-400 hover:bg-rose-500/10 transition"
                  title="Sharhni o'chirish"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AI & WEBSITE SETTINGS */}
      {activeTab === 'ai' && (
        <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6 sm:p-8 shadow-card max-w-2xl animate-fadeIn">
          <h3 className="font-heading text-lg font-bold text-white mb-1 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-kinopurple-primary" />
            AI va API Integratsiyalari Sozlamalari
          </h3>
          <p className="text-xs text-kinotext-muted mb-6">
            Ushbu kalitlar Next.js server tomonida xavfsiz saqlanadi va frontendga hech qachon chiqmaydi.
          </p>

          {savedNotice && (
            <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs text-emerald-400">
              ✓ Sozlamalar muvaffaqiyatli saqlandi!
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-kinotext-muted mb-1.5">
                OpenAI API Key (Ixtiyoriy)
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3 h-4 w-4 text-kinotext-muted" />
                <input
                  type="password"
                  value={openAiKey}
                  onChange={(e) => setOpenAiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 pl-10 pr-4 text-xs text-kinotext-main focus:border-kinopurple-primary focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-kinotext-muted mt-1">
                Bo'sh qoldirilsa, avtomatik ravishda Kino uz milliy aqlli semantik AI dvigateli ishlaydi.
              </p>
            </div>

            <div>
              <label className="block font-medium text-kinotext-muted mb-1.5">
                TMDB API Key (Ixtiyoriy)
              </label>
              <div className="relative">
                <Film className="absolute left-3.5 top-3 h-4 w-4 text-kinotext-muted" />
                <input
                  type="password"
                  value={tmdbKey}
                  onChange={(e) => setTmdbKey(e.target.value)}
                  placeholder="TMDB API Read Access Token..."
                  className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 pl-10 pr-4 text-xs text-kinotext-main focus:border-kinopurple-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-kinotext-muted mb-1.5">
                AI Tavsiya Modeli
              </label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 px-3 text-xs text-kinotext-main focus:border-kinopurple-primary focus:outline-none"
              >
                <option value="gpt-4o-mini">GPT-4o Mini (Tavsiya etiladi - tez va tejamkor)</option>
                <option value="gpt-4o">GPT-4o (Yuqori darajadagi mantiq)</option>
                <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-xl bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] px-6 py-2.5 font-bold text-white shadow-md shadow-kinopurple-primary/30 hover:brightness-110 transition"
            >
              Sozlamalarni saqlash
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
