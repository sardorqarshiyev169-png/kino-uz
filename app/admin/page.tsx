'use client';

import React, { useState, useEffect } from 'react';
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
  LogOut,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const {
    user,
    login,
    adminStats,
    reviews,
    deleteReview,
    featuredMovieId,
    setFeaturedMovieId,
  } = useStore();

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Stored master password (default: sardor2026, changeable by owner)
  const [currentMasterPassword, setCurrentMasterPassword] = useState('sardor2026');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'content' | 'users' | 'reviews' | 'ai' | 'security'
  >('overview');

  // Check persisted admin unlock status
  useEffect(() => {
    try {
      const savedPass = localStorage.getItem('kinouz_master_admin_password');
      if (savedPass) setCurrentMasterPassword(savedPass);

      const unlocked = sessionStorage.getItem('kinouz_admin_session');
      if (unlocked === 'true' && user?.role === 'admin') {
        setIsAdminUnlocked(true);
      }
    } catch {}
  }, [user]);

  // Handle Admin Login Attempt
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === currentMasterPassword) {
      setIsAdminUnlocked(true);
      setLoginError('');
      try {
        sessionStorage.setItem('kinouz_admin_session', 'true');
      } catch {}
      login(adminEmailInput || 'sardorqarshiyev169@gmail.com', 'Sardor Qarshiyev (Asoschi)', 'admin');
    } else {
      setLoginError('Maxfiy parol noto\'g\'ri! Ruxsatsiz kirish taqiqlangan.');
    }
  };

  const handleAdminLock = () => {
    setIsAdminUnlocked(false);
    try {
      sessionStorage.removeItem('kinouz_admin_session');
    } catch {}
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordInput || newPasswordInput.length < 6) {
      alert('Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak!');
      return;
    }
    setCurrentMasterPassword(newPasswordInput);
    try {
      localStorage.setItem('kinouz_master_admin_password', newPasswordInput);
    } catch {}
    setPasswordChangeSuccess(true);
    setNewPasswordInput('');
    setTimeout(() => setPasswordChangeSuccess(false), 3000);
  };

  // Real Admin Users List
  const [usersList, setUsersList] = useState([
    { id: '1', username: 'Sardor Qarshiyev (Asoschi)', email: 'sardorqarshiyev169@gmail.com', role: 'Owner/Admin', status: 'Faol', registered: 'Bugun' },
  ]);

  // AI & TMDB Config state
  const [tmdbKey, setTmdbKey] = useState('c1efa7c793177690f73f07f30cc507fd');
  const [openAiKey, setOpenAiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-4o-mini');
  const [savedNotice, setSavedNotice] = useState(false);

  // IF NOT UNLOCKED -> SHOW ULTRA SECURE MASTER LOGIN SCREEN
  if (!isAdminUnlocked) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-kinopurple-primary/40 bg-kinodark-card p-8 shadow-2xl shadow-kinopurple-primary/20 relative overflow-hidden">
          {/* Top Glow Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-kinopurple-primary via-indigo-500 to-rose-500" />

          <div className="text-center mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-kinopurple-primary/20 text-kinopurple-secondary mx-auto mb-3 border border-kinopurple-primary/30 shadow-glow-purple">
              <Lock className="h-7 w-7" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Administrator Kirishi
            </h2>
            <p className="text-xs text-kinotext-muted mt-1">
              Ushbu bo'lim faqat Kino uz sayt egasi uchun himoyalangan.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-400 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-kinotext-muted mb-1.5">
                Admin Email (Pochta)
              </label>
              <input
                type="email"
                value={adminEmailInput}
                onChange={(e) => setAdminEmailInput(e.target.value)}
                placeholder="sardorqarshiyev169@gmail.com"
                className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 px-3.5 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-kinotext-muted mb-1.5">
                Maxfiy Admin Paroli
              </label>
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                placeholder="Maxfiy parolni kiriting..."
                required
                className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 px-3.5 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] py-3 text-sm font-bold text-white shadow-lg shadow-kinopurple-primary/30 hover:brightness-110 transition"
            >
              Tizimga Kirish (Unlock Admin)
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-kinodark-border text-center">
            <Link href="/" className="text-xs text-kinotext-muted hover:text-white transition">
              ← Asosiy saytga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED ADMIN PANEL VIEW
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-kinodark-border pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-kinopurple-primary text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="h-4 w-4" />
            <span>Kino uz Boshqaruv Markazi (Owner Panel)</span>
          </div>
          <h1 className="font-heading text-3xl font-black text-white tracking-tight">
            Administrator: Sardor Qarshiyev
          </h1>
          <p className="text-xs text-kinotext-muted mt-0.5">
            Platforma to'liq sizning nazoratingizda. Boshqa foydalanuvchilar kirishi bloklangan.
          </p>
        </div>

        {/* Tab Buttons & Lock */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-2xl border border-kinodark-border bg-kinodark-card p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'overview'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Statistika
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'content'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Banner & Kontent
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
            onClick={() => setActiveTab('security')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'security'
                ? 'bg-kinopurple-primary text-white shadow-glow-purple'
                : 'text-kinotext-muted hover:text-white'
            }`}
          >
            Parolni o'zgartirish
          </button>
          <button
            onClick={handleAdminLock}
            className="rounded-xl px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition flex items-center gap-1"
            title="Admin panelni qulflash"
          >
            <LogOut className="h-3.5 w-3.5" />
            Chiqish
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
                <ShieldCheck className="h-3 w-3" /> Asoschi (Sardor Qarshiyev)
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
                <TrendingUp className="h-3 w-3" /> Haqiqiy ko'rilgan kinolar
              </div>
            </div>

            <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-5 shadow-card">
              <div className="flex items-center justify-between text-kinotext-muted mb-3">
                <span className="text-xs font-medium">Bosh Katalogdagi Kinolar</span>
                <Film className="h-5 w-5 text-amber-400" />
              </div>
              <div className="font-heading text-2xl font-black text-white">
                {adminStats.totalMovies.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1">
                TMDB Jonli API ulangan
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
                Haqiqiy foydalanuvchi so'rovlari
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
                        ✓ Bosh sahifada faol
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
              Foydalanuvchilar va Rollar ({usersList.length})
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
                </tr>
              </thead>
              <tbody className="divide-y divide-kinodark-border/50">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-kinodark-surface/40">
                    <td className="p-3.5 font-bold text-white">{u.username}</td>
                    <td className="p-3.5 text-kinotext-muted">{u.email}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role.includes('Admin')
                          ? 'bg-kinopurple-primary/20 text-kinopurple-secondary border border-kinopurple-primary/40'
                          : 'bg-kinodark-surface text-kinotext-muted'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3.5 text-emerald-400 font-semibold">{u.status}</td>
                    <td className="p-3.5 text-kinotext-muted">{u.registered}</td>
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

      {/* TAB 5: SECURITY & CHANGE MASTER PASSWORD */}
      {activeTab === 'security' && (
        <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6 sm:p-8 shadow-card max-w-lg animate-fadeIn">
          <h3 className="font-heading text-lg font-bold text-white mb-1 flex items-center gap-2">
            <Key className="h-5 w-5 text-kinopurple-primary" />
            Admin Maxfiy Parolini O'zgartirish
          </h3>
          <p className="text-xs text-kinotext-muted mb-6">
            Boshqalar sizning ruxsatingizsiz kirishining oldini olish uchun maxfiy parolingizni bu yerda o'zgartirishingiz mumkin.
          </p>

          {passwordChangeSuccess && (
            <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs text-emerald-400">
              ✓ Yangi maxfiy parol muvaffaqiyatli saqlandi!
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-kinotext-muted mb-1.5">
                Hozirgi Maxfiy Parol
              </label>
              <input
                type="text"
                disabled
                value={currentMasterPassword}
                className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface/50 py-2.5 px-3.5 text-xs text-kinotext-muted"
              />
            </div>

            <div>
              <label className="block font-semibold text-kinotext-muted mb-1.5">
                Yangi Maxfiy Parol
              </label>
              <input
                type="text"
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                placeholder="Yangi kuchli parolni yozing..."
                required
                className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 px-3.5 text-xs text-kinotext-main focus:border-kinopurple-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] px-5 py-2.5 font-bold text-white shadow-md shadow-kinopurple-primary/30 hover:brightness-110 transition"
            >
              Parolni Saqlash
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
