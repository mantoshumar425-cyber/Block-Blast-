/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BoardTheme } from '../types/game';

export interface ThemeParticle {
  id: number;
  left: number; // percentage 0-100
  top: number; // percentage 0-100
  size: number; // px 3-8
  delay: number; // seconds
  duration: number; // seconds
  opacity: number;
}

export interface ThemeConfig {
  id: BoardTheme;
  name: string;
  tagline: string;
  accentColor: string;
  previewGradient: string;
  boardBg: string;
  boardBorder: string;
  boardShadow: string;
  cellEmptyBg: string;
  cellEmptyBorder: string;
  cellDotColor: string;
  highlightGlow: string;
  ringGlow: string;
  particleClass: string;
  particleColor: string;
  ambientGrad: string;
}

export const BOARD_THEMES: Record<BoardTheme, ThemeConfig> = {
  classic_slate: {
    id: 'classic_slate',
    name: 'Default Skin',
    tagline: 'Authentic Slate & Charcoal',
    accentColor: '#fbbf24',
    previewGradient: 'from-slate-600 via-neutral-700 to-zinc-900',
    boardBg: 'bg-[#33353c]',
    boardBorder: 'border-[#292a30]',
    boardShadow: 'shadow-[0_12px_36px_rgba(0,0,0,0.45)]',
    cellEmptyBg: 'bg-[#3b3d44]',
    cellEmptyBorder: 'border-[#2c2d33]',
    cellDotColor: 'bg-transparent',
    highlightGlow: 'ring-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.45)]',
    ringGlow: 'ring-amber-400',
    particleClass: 'animate-float-starlight',
    particleColor: 'rgba(255, 255, 255, 0.4)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 80%)',
  },
  sky_blue: {
    id: 'sky_blue',
    name: 'Oceanic Blue',
    tagline: 'Deep sky blue & teal aura',
    accentColor: '#0ea5e9',
    previewGradient: 'from-sky-500 via-teal-600 to-cyan-950',
    boardBg: 'bg-[#031d2e]/95',
    boardBorder: 'border-cyan-800/80',
    boardShadow: 'shadow-[0_14px_45px_rgba(14,165,233,0.35)]',
    cellEmptyBg: 'bg-[#05293d]',
    cellEmptyBorder: 'border-[#0a3f5c]/80',
    cellDotColor: 'bg-cyan-400/35',
    highlightGlow: 'ring-cyan-300 shadow-[0_0_26px_rgba(14,165,233,0.6)]',
    ringGlow: 'ring-cyan-400',
    particleClass: 'animate-float-starlight',
    particleColor: 'rgba(56, 189, 248, 0.9)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.18) 0%, rgba(20, 184, 166, 0.12) 50%, transparent 75%)',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    tagline: 'Deep obsidian & sapphire starlight',
    accentColor: '#38bdf8',
    previewGradient: 'from-blue-600 via-indigo-700 to-slate-900',
    boardBg: 'bg-[#0b101c]/95',
    boardBorder: 'border-slate-800/90',
    boardShadow: 'shadow-[0_14px_45px_rgba(2,132,199,0.22)]',
    cellEmptyBg: 'bg-[#121927]',
    cellEmptyBorder: 'border-[#1b263b]/70',
    cellDotColor: 'bg-cyan-500/25',
    highlightGlow: 'ring-cyan-400/80 shadow-[0_0_24px_rgba(6,182,212,0.4)]',
    ringGlow: 'ring-cyan-400',
    particleClass: 'animate-float-starlight',
    particleColor: 'rgba(56, 189, 248, 0.75)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
  },
  neon: {
    id: 'neon',
    name: 'Neon Cyber',
    tagline: 'Dynamic combo streak neon plasma aura',
    accentColor: '#e879f9',
    previewGradient: 'from-fuchsia-600 via-purple-700 to-cyan-500',
    boardBg: 'bg-[#0f071a]/95',
    boardBorder: 'border-fuchsia-500/80',
    boardShadow: 'shadow-[0_14px_45px_rgba(217,70,239,0.4)]',
    cellEmptyBg: 'bg-[#1a0e2e]',
    cellEmptyBorder: 'border-[#381a5e]',
    cellDotColor: 'bg-fuchsia-400/50',
    highlightGlow: 'ring-cyan-300 shadow-[0_0_28px_rgba(6,182,212,0.8)]',
    ringGlow: 'ring-fuchsia-400',
    particleClass: 'animate-float-neon',
    particleColor: 'rgba(232, 121, 249, 0.85)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(217, 70, 239, 0.18) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 75%)',
  },
  wood: {
    id: 'wood',
    name: 'Wooden Forest',
    tagline: 'Warm oak timber & jungle leaves',
    accentColor: '#f59e0b',
    previewGradient: 'from-amber-700 via-stone-800 to-emerald-950',
    boardBg: 'bg-[#21160d]/95',
    boardBorder: 'border-[#543820]',
    boardShadow: 'shadow-[0_14px_40px_rgba(40,24,10,0.6)]',
    cellEmptyBg: 'bg-[#2b1c11]',
    cellEmptyBorder: 'border-[#3f2a1b]',
    cellDotColor: 'bg-amber-600/30',
    highlightGlow: 'ring-amber-400/80 shadow-[0_0_24px_rgba(245,158,11,0.5)]',
    ringGlow: 'ring-amber-400',
    particleClass: 'animate-float-ember',
    particleColor: 'rgba(245, 158, 11, 0.7)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
  },
  cheese: {
    id: 'cheese',
    name: 'Cheese & Dice',
    tagline: 'Chunky gouda cubes & lucky dice',
    accentColor: '#fbbf24',
    previewGradient: 'from-amber-400 via-yellow-500 to-orange-600',
    boardBg: 'bg-[#2d2208]/95',
    boardBorder: 'border-[#855e0c]',
    boardShadow: 'shadow-[0_14px_40px_rgba(251,191,36,0.25)]',
    cellEmptyBg: 'bg-[#3d2f0d]',
    cellEmptyBorder: 'border-[#5c4613]',
    cellDotColor: 'bg-amber-300/40',
    highlightGlow: 'ring-yellow-300 shadow-[0_0_24px_rgba(253,224,71,0.6)]',
    ringGlow: 'ring-yellow-400',
    particleClass: 'animate-float-ember',
    particleColor: 'rgba(251, 191, 36, 0.85)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
  },
  watermelon: {
    id: 'watermelon',
    name: 'Watermelon Summer',
    tagline: 'Fresh ruby melon with emerald rind',
    accentColor: '#f43f5e',
    previewGradient: 'from-rose-500 via-red-600 to-emerald-800',
    boardBg: 'bg-[#21090f]/95',
    boardBorder: 'border-[#591626]',
    boardShadow: 'shadow-[0_14px_40px_rgba(244,63,94,0.3)]',
    cellEmptyBg: 'bg-[#2f1019]',
    cellEmptyBorder: 'border-[#4a1c28]',
    cellDotColor: 'bg-rose-400/40',
    highlightGlow: 'ring-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.6)]',
    ringGlow: 'ring-rose-400',
    particleClass: 'animate-float-neon',
    particleColor: 'rgba(244, 63, 94, 0.8)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.12) 0%, transparent 70%)',
  },
  photo_custom: {
    id: 'photo_custom',
    name: 'Custom Photo Skin',
    tagline: 'Your custom image tiled across puzzle blocks',
    accentColor: '#38bdf8',
    previewGradient: 'from-sky-400 via-indigo-500 to-purple-600',
    boardBg: 'bg-[#182030]/95',
    boardBorder: 'border-sky-500/60',
    boardShadow: 'shadow-[0_14px_45px_rgba(56,189,248,0.3)]',
    cellEmptyBg: 'bg-[#111827]',
    cellEmptyBorder: 'border-[#1f2937]',
    cellDotColor: 'bg-sky-400/20',
    highlightGlow: 'ring-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.6)]',
    ringGlow: 'ring-sky-400',
    particleClass: 'animate-float-starlight',
    particleColor: 'rgba(56, 189, 248, 0.7)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
  },
  solar: {
    id: 'solar',
    name: 'Solar Amber',
    tagline: 'Molten bronze & floating embers',
    accentColor: '#fbbf24',
    previewGradient: 'from-amber-500 via-orange-600 to-stone-900',
    boardBg: 'bg-[#160c07]/95',
    boardBorder: 'border-amber-950/80',
    boardShadow: 'shadow-[0_14px_45px_rgba(245,158,11,0.28)]',
    cellEmptyBg: 'bg-[#24130a]',
    cellEmptyBorder: 'border-[#422110]/80',
    cellDotColor: 'bg-amber-500/35',
    highlightGlow: 'ring-amber-400/80 shadow-[0_0_24px_rgba(245,158,11,0.5)]',
    ringGlow: 'ring-amber-400',
    particleClass: 'animate-float-ember',
    particleColor: 'rgba(245, 158, 11, 0.85)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.14) 0%, transparent 70%)',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Grove',
    tagline: 'Deep jade & bioluminescent fireflies',
    accentColor: '#34d399',
    previewGradient: 'from-emerald-500 via-teal-700 to-zinc-950',
    boardBg: 'bg-[#06140d]/95',
    boardBorder: 'border-emerald-950/80',
    boardShadow: 'shadow-[0_14px_45px_rgba(16,185,129,0.28)]',
    cellEmptyBg: 'bg-[#0c2417]',
    cellEmptyBorder: 'border-[#17462c]/80',
    cellDotColor: 'bg-emerald-500/35',
    highlightGlow: 'ring-emerald-400/80 shadow-[0_0_24px_rgba(16,185,129,0.5)]',
    ringGlow: 'ring-emerald-400',
    particleClass: 'animate-float-firefly',
    particleColor: 'rgba(52, 211, 153, 0.85)',
    ambientGrad: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.14) 0%, transparent 70%)',
  },
};

// Dynamic combo styles helper for Neon Cyber theme
export function getNeonComboConfig(combo: number) {
  if (combo <= 0) {
    return {
      borderColor: '#a855f7',
      boardShadow: '0 0 25px rgba(168, 85, 247, 0.45)',
      cellGlow: 'rgba(168, 85, 247, 0.35)',
      pulseSpeed: '3s',
      streakLabel: 'NEON 1X',
    };
  }
  if (combo <= 2) {
    return {
      borderColor: '#06b6d4',
      boardShadow: '0 0 35px rgba(6, 182, 212, 0.75)',
      cellGlow: 'rgba(6, 182, 212, 0.65)',
      pulseSpeed: '2s',
      streakLabel: `NEON STREAK x${combo}`,
    };
  }
  if (combo <= 4) {
    return {
      borderColor: '#ec4899',
      boardShadow: '0 0 45px rgba(236, 72, 153, 0.9)',
      cellGlow: 'rgba(236, 72, 153, 0.8)',
      pulseSpeed: '1.2s',
      streakLabel: `OVERDRIVE x${combo} 🔥`,
    };
  }
  return {
    borderColor: '#f43f5e',
    boardShadow: '0 0 60px rgba(244, 63, 94, 1.0), 0 0 30px rgba(234, 179, 8, 0.8)',
    cellGlow: 'rgba(244, 63, 94, 0.95)',
    pulseSpeed: '0.7s',
    streakLabel: `HYPERCYBER x${combo} ⚡⚡`,
  };
}

// 12 deterministic floating particle positions inside GameBoard
export const STATIC_THEME_PARTICLES: ThemeParticle[] = [
  { id: 1, left: 12, top: 22, size: 4, delay: 0, duration: 4.5, opacity: 0.6 },
  { id: 2, left: 82, top: 18, size: 5, delay: 0.8, duration: 5.2, opacity: 0.75 },
  { id: 3, left: 34, top: 76, size: 3, delay: 1.5, duration: 4.8, opacity: 0.5 },
  { id: 4, left: 68, top: 84, size: 6, delay: 2.1, duration: 6.0, opacity: 0.7 },
  { id: 5, left: 20, top: 52, size: 3.5, delay: 0.4, duration: 5.0, opacity: 0.65 },
  { id: 6, left: 88, top: 58, size: 4.5, delay: 1.8, duration: 4.2, opacity: 0.6 },
  { id: 7, left: 50, top: 30, size: 5, delay: 2.7, duration: 5.5, opacity: 0.8 },
  { id: 8, left: 45, top: 90, size: 4, delay: 1.1, duration: 4.9, opacity: 0.55 },
  { id: 9, left: 74, top: 38, size: 3, delay: 0.6, duration: 5.7, opacity: 0.65 },
  { id: 10, left: 28, top: 12, size: 4, delay: 2.3, duration: 4.4, opacity: 0.7 },
  { id: 11, left: 60, top: 65, size: 3.5, delay: 1.9, duration: 5.3, opacity: 0.6 },
  { id: 12, left: 15, top: 88, size: 5, delay: 3.0, duration: 6.2, opacity: 0.75 },
];

export function getSavedTheme(): BoardTheme {
  if (typeof window === 'undefined') return 'classic_slate';
  try {
    const saved = localStorage.getItem('blockblast_board_theme') as BoardTheme;
    if (saved && BOARD_THEMES[saved]) {
      return saved;
    }
  } catch {
    // fallback
  }
  return 'classic_slate';
}

export function saveTheme(theme: BoardTheme): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('blockblast_board_theme', theme);
    } catch {
      // fallback
    }
  }
}
