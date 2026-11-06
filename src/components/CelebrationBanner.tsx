/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Flame, Zap, Sparkles, Star } from 'lucide-react';

export type CelebrationTier = 'great' | 'amazing' | 'awesome' | 'perfect' | 'unbelievable';

export interface CelebrationBannerData {
  text: string;
  subtext?: string;
  tier: CelebrationTier;
  combo?: number;
}

interface CelebrationBannerProps {
  data: CelebrationBannerData;
  onDismiss?: () => void;
}

// Visual configurations per celebration tier
const TIER_CONFIG: Record<
  CelebrationTier,
  {
    gradient: string;
    shadow3D: string;
    borderGlow: string;
    sunburstColor: string;
    badgeBg: string;
    badgeText: string;
    accentIcon: 'flame' | 'zap' | 'sparkle' | 'star';
  }
> = {
  great: {
    gradient: 'from-emerald-300 via-teal-200 to-cyan-300',
    shadow3D: '0 2px 0 #0f766e, 0 4px 0 #115e59, 0 6px 0 #134e4a, 0 8px 12px rgba(0,0,0,0.6)',
    borderGlow: 'rgba(20, 184, 166, 0.7)',
    sunburstColor: 'rgba(45, 212, 191, 0.25)',
    badgeBg: 'from-teal-500 to-cyan-600',
    badgeText: 'text-teal-100',
    accentIcon: 'sparkle',
  },
  amazing: {
    gradient: 'from-yellow-200 via-amber-300 to-orange-400',
    shadow3D: '0 2px 0 #b45309, 0 4px 0 #92400e, 0 6px 0 #78350f, 0 8px 14px rgba(0,0,0,0.65)',
    borderGlow: 'rgba(245, 158, 11, 0.8)',
    sunburstColor: 'rgba(251, 191, 36, 0.32)',
    badgeBg: 'from-amber-500 to-orange-600',
    badgeText: 'text-amber-100',
    accentIcon: 'flame',
  },
  awesome: {
    gradient: 'from-pink-300 via-rose-300 to-amber-300',
    shadow3D: '0 2px 0 #be123c, 0 4px 0 #9f1239, 0 6px 0 #881337, 0 8px 14px rgba(0,0,0,0.7)',
    borderGlow: 'rgba(244, 63, 94, 0.85)',
    sunburstColor: 'rgba(244, 63, 94, 0.3)',
    badgeBg: 'from-rose-500 to-pink-600',
    badgeText: 'text-rose-100',
    accentIcon: 'zap',
  },
  perfect: {
    gradient: 'from-cyan-200 via-purple-200 to-pink-300',
    shadow3D: '0 2px 0 #7e22ce, 0 4px 0 #6b21a8, 0 6px 0 #581c87, 0 8px 16px rgba(0,0,0,0.75)',
    borderGlow: 'rgba(168, 85, 247, 0.85)',
    sunburstColor: 'rgba(192, 132, 252, 0.35)',
    badgeBg: 'from-purple-500 via-pink-500 to-cyan-500',
    badgeText: 'text-purple-100',
    accentIcon: 'star',
  },
  unbelievable: {
    gradient: 'from-amber-200 via-yellow-300 to-rose-400',
    shadow3D: '0 2px 0 #e11d48, 0 4px 0 #be123c, 0 6px 0 #9f1239, 0 8px 0 #881337, 0 12px 20px rgba(0,0,0,0.85)',
    borderGlow: 'rgba(251, 191, 36, 0.95)',
    sunburstColor: 'rgba(245, 158, 11, 0.45)',
    badgeBg: 'from-yellow-400 via-rose-500 to-purple-600',
    badgeText: 'text-amber-100',
    accentIcon: 'flame',
  },
};

// Generates 16 sunburst rays in an SVG
const SunburstRays: React.FC<{ color: string }> = ({ color }) => {
  const numRays = 16;
  const rayAngle = 360 / numRays;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
      <svg
        className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] animate-sunburst-spin opacity-80"
        viewBox="0 0 400 400"
      >
        <defs>
          <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="35%" stopColor={color} stopOpacity="0.7" />
            <stop offset="75%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: numRays }).map((_, i) => {
          const angle = i * rayAngle;
          return (
            <path
              key={i}
              d="M 200 200 L 160 0 L 240 0 Z"
              fill="url(#sunburstGrad)"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}
      </svg>
    </div>
  );
};

export const CelebrationBanner: React.FC<CelebrationBannerProps> = ({ data, onDismiss }) => {
  const cfg = TIER_CONFIG[data.tier] || TIER_CONFIG.great;
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, 1550);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-x-0 top-20 sm:top-24 z-50 flex items-center justify-center pointer-events-none select-none"
    >
      <div className="relative flex flex-col items-center justify-center animate-celebration-pop pointer-events-auto cursor-pointer">
        {/* 1. Rotating Sunburst Rays */}
        <SunburstRays color={cfg.sunburstColor} />

        {/* 2. Floating Starburst Sparks & Confetti Stars */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Top-Left Star */}
          <div className="absolute -top-6 -left-6 text-amber-300 animate-twinkle-spark drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]">
            <Star className="w-7 h-7 fill-amber-300 stroke-amber-100" />
          </div>
          {/* Top-Right Star */}
          <div
            className="absolute -top-7 -right-6 text-amber-200 animate-twinkle-spark drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
            style={{ animationDelay: '0.25s' }}
          >
            <Sparkles className="w-8 h-8 fill-amber-200 stroke-white" />
          </div>
          {/* Bottom-Left Spark */}
          <div
            className="absolute -bottom-3 -left-8 text-cyan-300 animate-twinkle-spark drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]"
            style={{ animationDelay: '0.4s' }}
          >
            <Sparkles className="w-6 h-6 fill-cyan-300 stroke-cyan-100" />
          </div>
          {/* Bottom-Right Star */}
          <div
            className="absolute -bottom-4 -right-8 text-yellow-300 animate-twinkle-spark drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]"
            style={{ animationDelay: '0.15s' }}
          >
            <Star className="w-7 h-7 fill-yellow-300 stroke-amber-200" />
          </div>
        </div>

        {/* 3. Core 3D Celebration Text Banner */}
        <div className="relative px-6 py-2 sm:px-8 sm:py-3 flex flex-col items-center justify-center">
          {/* Radial back halo */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-80 animate-starburst-pulse -z-10"
            style={{ backgroundColor: cfg.borderGlow }}
          />

          {/* 3D Extruded Banner Text */}
          <h1
            className={`font-black italic tracking-wider uppercase text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b ${cfg.gradient} transform -rotate-2 select-none`}
            style={{
              textShadow: cfg.shadow3D,
              WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.95)',
              filter: `drop-shadow(0 0 18px ${cfg.borderGlow})`,
            }}
          >
            {data.text}
          </h1>

          {/* 4. Subtitle / Combo Multiplier Capsule Badge */}
          {data.subtext && (
            <div
              className={`mt-2 px-4 py-1 rounded-full bg-gradient-to-r ${cfg.badgeBg} border-2 border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center gap-1.5 transform hover:scale-105 transition-transform`}
            >
              {cfg.accentIcon === 'flame' ? (
                <Flame className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
              ) : cfg.accentIcon === 'zap' ? (
                <Zap className="w-3.5 h-3.5 fill-white text-white animate-bounce" />
              ) : cfg.accentIcon === 'star' ? (
                <Star className="w-3.5 h-3.5 fill-white text-white" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
              )}
              <span className={`text-xs sm:text-sm font-black tracking-wide uppercase ${cfg.badgeText} drop-shadow-sm`}>
                {data.subtext}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
