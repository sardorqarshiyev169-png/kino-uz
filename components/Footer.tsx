'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Film, Shield, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-kinodark-border bg-kinodark-card/60 pt-14 pb-10 text-kinotext-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-xs text-kinotext-muted leading-relaxed">
              O'zbekistonning zamonaviy, aqlli va qulay kino, serial va anime kashfiyot platformasi.
              Yangi tajribalar, sevimli filmlar va sun'iy intellekt tavsiyalari bir joyda.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-kinopurple-primary/30 bg-kinopurple-primary/10 px-3 py-1 text-[11px] font-semibold text-kinopurple-secondary">
              <Sparkles className="h-3 w-3" />
              Discover. Explore. Experience.
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-heading text-sm font-bold text-kinotext-main uppercase tracking-wider mb-4">
              Kino Katalogi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/movies" className="hover:text-kinopurple-secondary transition">
                  Barcha filmlar
                </Link>
              </li>
              <li>
                <Link href="/tv" className="hover:text-kinopurple-secondary transition">
                  Seriallar va mavsumlar
                </Link>
              </li>
              <li>
                <Link href="/anime" className="hover:text-kinopurple-secondary transition">
                  Yapon animelari
                </Link>
              </li>
              <li>
                <Link href="/movies?sort=rating" className="hover:text-kinopurple-secondary transition">
                  Top-100 reytingli durdonalar
                </Link>
              </li>
              <li>
                <Link href="/movies?year=2024" className="hover:text-kinopurple-secondary transition">
                  2024-yil yangi premyeralari
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive AI & Services */}
          <div>
            <h4 className="font-heading text-sm font-bold text-kinotext-main uppercase tracking-wider mb-4">
              Xizmatlar & Imkoniyatlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ai-assistant" className="text-kinopurple-secondary font-medium hover:underline flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  Kino uz AI Maslahatchisi
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="hover:text-kinopurple-secondary transition">
                  Shaxsiy ko'rish ro'yxati
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-kinopurple-secondary transition">
                  Sevimli filmlar arxivi
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-kinopurple-secondary transition">
                  Foydalanuvchi profili
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-kinopurple-secondary transition">
                  Admin boshqaruv tizimi
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal, DMCA & TMDB Attribution */}
          <div>
            <h4 className="font-heading text-sm font-bold text-kinotext-main uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-kinopurple-primary" />
              Qonuniylik & Huquqlar
            </h4>
            <p className="text-[11px] text-kinotext-muted leading-relaxed mb-3">
              Kino uz platformasi mualliflik huquqlariga to'liq rioya qiladi. Barcha treylerlar YouTube orqali, ko'rish havolalari esa rasmiy distribyutorlar (Allplay, ITV, Kinopoisk, Netflix) orqali taqdim etiladi.
            </p>
            <div className="rounded-xl border border-kinodark-border bg-kinodark-surface/60 p-2.5 text-[10px] text-kinotext-muted flex items-center gap-2">
              <Film className="h-4 w-4 text-sky-400 flex-shrink-0" />
              <span>
                Ushbu mahsulot TMDB API xizmatidan foydalanadi, ammo TMDB tomonidan sertifikatlanmagan yoki ma'qullanmagan.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-kinodark-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Kino uz. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-1 text-kinotext-muted">
            O'zbekistonda <Heart className="h-3.5 w-3.5 text-rose-500 fill-current mx-0.5" /> muhabbat bilan yaratildi.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
