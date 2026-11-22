'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const { login } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Iltimos, emailingizni kiriting');
      return;
    }
    login(email, username || email.split('@')[0], 'user');
    onClose();
  };

  const handleDemoLogin = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      login('admin@kino.uz', 'Admin (Azizbek)', 'admin');
    } else {
      login('muxlis@kino.uz', 'Kinochi Muxlis', 'user');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-kinodark-border bg-kinodark-card p-6 md:p-8 shadow-2xl shadow-kinopurple-primary/20 z-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-kinotext-muted hover:bg-kinodark-surface hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <Logo size="md" className="justify-center mb-2" />
          <h3 className="font-heading text-xl font-bold text-kinotext-main">
            {mode === 'login' ? 'Hisobingizga kiring' : 'Ro\'yxatdan o\'ting'}
          </h3>
          <p className="text-sm text-kinotext-muted mt-1">
            Sevimlilarni saqlang, fikr bildiring va shaxsiy AI tavsiyalardan foydalaning.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-kinotext-muted mb-1.5">
                Foydalanuvchi nomi
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-kinotext-muted" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ismingiz yoki taxallusingiz"
                  className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 pl-10 pr-4 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none focus:ring-1 focus:ring-kinopurple-primary"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-kinotext-muted mb-1.5">
              Elektron pochta (Email)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-kinotext-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="misol@gmail.com"
                required
                className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 pl-10 pr-4 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none focus:ring-1 focus:ring-kinopurple-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-kinotext-muted mb-1.5">
              Parol
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-kinotext-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kamida 6 ta belgi"
                required
                className="w-full rounded-xl border border-kinodark-border bg-kinodark-surface py-2.5 pl-10 pr-4 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none focus:ring-1 focus:ring-kinopurple-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] py-3 text-sm font-semibold text-white shadow-lg shadow-kinopurple-primary/30 hover:brightness-110 transition duration-200"
          >
            {mode === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
          </button>
        </form>

        <div className="mt-6 border-t border-kinodark-border pt-5">
          <p className="text-center text-xs text-kinotext-muted mb-3">
            Tezkor sinov (Demo hisoblar):
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-kinodark-border bg-kinodark-surface py-2 text-xs font-medium text-kinotext-main hover:border-kinopurple-primary/50 transition"
            >
              <User className="h-3.5 w-3.5 text-kinopurple-secondary" />
              Foydalanuvchi
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-kinopurple-primary/40 bg-kinopurple-primary/10 py-2 text-xs font-medium text-kinopurple-secondary hover:bg-kinopurple-primary/20 transition"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-kinopurple-primary" />
              Admin paneli
            </button>
          </div>
        </div>

        <div className="mt-5 text-center text-xs text-kinotext-muted">
          {mode === 'login' ? (
            <>
              Hisobingiz yo'qmi?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-kinopurple-secondary hover:underline font-semibold"
              >
                Ro'yxatdan o'ting
              </button>
            </>
          ) : (
            <>
              Hisobingiz bormi?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-kinopurple-secondary hover:underline font-semibold"
              >
                Kirish
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
