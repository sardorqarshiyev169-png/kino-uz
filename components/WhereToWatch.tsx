'use client';

import React from 'react';
import { StreamingProvider } from '@/lib/types';
import { ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WhereToWatchProps {
  providers?: StreamingProvider[];
  movieTitle: string;
}

export const WhereToWatch: React.FC<WhereToWatchProps> = ({
  providers = [],
  movieTitle,
}) => {
  if (!providers || providers.length === 0) return null;

  return (
    <div className="rounded-2xl border border-kinodark-border bg-kinodark-card p-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-kinodark-border/60 pb-4 mb-5">
        <div>
          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            Qayerda rasmiy tomosha qilish mumkin?
          </h3>
          <p className="text-xs text-kinotext-muted mt-0.5">
            "{movieTitle}" filmini litsenziyalangan va yuqori sifatli rasmiy platformalarda ko'ring
          </p>
        </div>

        <span className="inline-flex items-center gap-1 self-start sm:self-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[11px] font-semibold text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Qonuniy litsenziya
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {providers.map((provider) => (
          <a
            key={provider.id}
            href={provider.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-kinodark-border bg-kinodark-surface/60 p-3.5 transition-all duration-200 hover:border-kinopurple-primary/60 hover:bg-kinodark-surface hover:shadow-glow-purple"
          >
            <div className="flex items-center gap-3">
              <img
                src={provider.logo_path}
                alt={provider.name}
                className="h-10 w-10 rounded-lg object-cover ring-1 ring-kinodark-border group-hover:ring-kinopurple-primary/50"
              />
              <div>
                <div className="font-heading text-sm font-bold text-kinotext-main group-hover:text-kinopurple-secondary transition">
                  {provider.name}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-kinotext-muted">
                  <span>{provider.quality || 'Full HD'}</span>
                  {provider.country === 'uz' && (
                    <span className="rounded bg-kinopurple-primary/20 px-1 py-0.2 text-[10px] font-bold text-kinopurple-secondary">
                      UZ Tas-IX
                    </span>
                  )}
                </div>
              </div>
            </div>

            <ExternalLink className="h-4 w-4 text-kinotext-muted group-hover:text-white transition" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default WhereToWatch;
