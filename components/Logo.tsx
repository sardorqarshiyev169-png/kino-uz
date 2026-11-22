'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  withLink?: boolean;
  className?: string;
}

export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-kinopurple-primary to-[#6D28D9] p-[2px] shadow-glow-purple transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-kinodark-bg">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3/4 w-3/4"
        >
          {/* Film strip border */}
          <rect
            x="4"
            y="6"
            width="32"
            height="28"
            rx="5"
            stroke="#A78BFA"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Film strip perforations */}
          <rect x="7" y="9" width="3" height="4" rx="1" fill="#8B5CF6" />
          <rect x="7" y="18" width="3" height="4" rx="1" fill="#8B5CF6" />
          <rect x="7" y="27" width="3" height="4" rx="1" fill="#8B5CF6" />
          <rect x="30" y="9" width="3" height="4" rx="1" fill="#8B5CF6" />
          <rect x="30" y="18" width="3" height="4" rx="1" fill="#8B5CF6" />
          <rect x="30" y="27" width="3" height="4" rx="1" fill="#8B5CF6" />

          {/* Glowing Play Button in center */}
          <path
            d="M17 14L27 20L17 26V14Z"
            fill="url(#playGradient)"
            filter="drop-shadow(0px 2px 6px rgba(139, 92, 246, 0.8))"
          />
          <defs>
            <linearGradient
              id="playGradient"
              x1="17"
              y1="14"
              x2="27"
              y2="26"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F5F3FF" />
              <stop offset="1" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  withLink = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 28,
    md: 38,
    lg: 48,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight ${className}`}>
      <LogoIcon size={iconSizes[size]} />
      {variant === 'full' && (
        <span className={`font-heading select-none ${textSizes[size]}`}>
          <span className="text-white drop-shadow-sm font-black">Kino</span>
          <span className="ml-1 text-kinopurple-primary drop-shadow-[0_0_12px_rgba(139,92,246,0.6)] font-black">
            uz
          </span>
        </span>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="inline-flex items-center group">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
