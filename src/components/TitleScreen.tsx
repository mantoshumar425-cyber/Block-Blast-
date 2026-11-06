/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { GameMode } from '../types/game';
import { sounds } from '../utils/audio';
import { Settings, TrendingUp } from 'lucide-react';

interface TitleScreenProps {
  onStart: (mode: GameMode) => void;
  onOpenSettings: () => void;
  onOpenMoreGames: () => void;
  onSelectPromoGame: (gameName: string) => void;
  onOpenStats?: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStart,
  onOpenSettings,
  onOpenMoreGames,
  onSelectPromoGame,
  onOpenStats,
}) => {
  // Listen for Enter / Space keys to quickly start Classic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        sounds.playClick();
        onStart('classic');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between items-center py-6 px-4 select-none bg-gradient-to-b from-[#0165ea] via-[#005fe0] to-[#004bbd]">
      {/* Top Header: Stats Button on left, Settings on right */}
      <header className="w-full max-w-md flex items-center justify-between z-20 pt-2 px-2">
        {onOpenStats ? (
          <button
            onClick={() => {
              sounds.playClick();
              onOpenStats();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-white text-xs font-black shadow-md border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
            title="30-Day Score Progress & Consistency"
            aria-label="View Stats"
          >
            <TrendingUp className="w-4 h-4 stroke-[2.8] text-cyan-300" />
            <span className="tracking-wide">Stats</span>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={() => {
            sounds.playClick();
            onOpenSettings();
          }}
          className="p-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          title="Settings"
          aria-label="Settings"
        >
          <Settings className="w-8 h-8 stroke-[2.5] text-blue-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
        </button>
      </header>

      {/* Centerpiece: Logo and 3 Juicy Chunky Buttons */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm z-10 -mt-6">
        {/* 3D BLOCK BLAST ADVENTURE MASTER Logo Lockup */}
        <div className="relative flex flex-col items-center mb-8 drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
          {/* Letters Row */}
          <div className="relative flex items-end justify-center select-none font-black text-6xl sm:text-7xl tracking-tight">
            {/* B - Orange */}
            <span
              className="inline-block transform -rotate-3 text-[#ff8800]"
              style={{
                WebkitTextStroke: '3px #ffffff',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 0 #b34700, 0 10px 14px rgba(0,0,0,0.4)',
              }}
            >
              B
            </span>

            {/* L - Sky Blue */}
            <span
              className="inline-block transform rotate-2 text-[#00b0ff] -ml-1"
              style={{
                WebkitTextStroke: '3px #ffffff',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 0 #006ab3, 0 10px 14px rgba(0,0,0,0.4)',
              }}
            >
              L
            </span>

            {/* O - Red with Crown */}
            <div className="relative inline-block -mx-1">
              {/* Gold Crown */}
              <div className="absolute -top-6 sm:-top-7 left-1/2 transform -translate-x-1/2 -rotate-12 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] z-20">
                <svg className="w-10 h-8 sm:w-12 sm:h-9" viewBox="0 0 48 36" fill="none">
                  <path
                    d="M6 30L3 10L15 18L24 6L33 18L45 10L42 30H6Z"
                    fill="url(#crown-gold-title)"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="24" cy="5" r="2.5" fill="#ffe082" stroke="#fff" strokeWidth="1" />
                  <circle cx="3" cy="9" r="2.5" fill="#ffe082" stroke="#fff" strokeWidth="1" />
                  <circle cx="45" cy="9" r="2.5" fill="#ffe082" stroke="#fff" strokeWidth="1" />
                  <defs>
                    <linearGradient id="crown-gold-title" x1="24" y1="6" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffd54f" />
                      <stop offset="1" stopColor="#ff8f00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <span
                className="inline-block text-[#ff2e43]"
                style={{
                  WebkitTextStroke: '3px #ffffff',
                  paintOrder: 'stroke fill',
                  textShadow: '0 6px 0 #990012, 0 10px 14px rgba(0,0,0,0.4)',
                }}
              >
                O
              </span>
            </div>

            {/* C - Yellow */}
            <span
              className="inline-block transform -rotate-2 text-[#ffcc00] -ml-1"
              style={{
                WebkitTextStroke: '3px #ffffff',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 0 #b38600, 0 10px 14px rgba(0,0,0,0.4)',
              }}
            >
              C
            </span>

            {/* K - Purple */}
            <span
              className="inline-block transform rotate-3 text-[#b845ff] -ml-1"
              style={{
                WebkitTextStroke: '3px #ffffff',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 0 #6900b3, 0 10px 14px rgba(0,0,0,0.4)',
              }}
            >
              K
            </span>
          </div>

          {/* BLAST */}
          <div
            className="text-5xl sm:text-6xl font-black italic tracking-wide text-[#2ad8ff] -mt-2 sm:-mt-3"
            style={{
              WebkitTextStroke: '2.5px #ffffff',
              paintOrder: 'stroke fill',
              textShadow: '0 5px 0 #005f99, 0 8px 16px rgba(0,0,0,0.4)',
            }}
          >
            BLAST
          </div>

          {/* ADVENTURE MASTER */}
          <div
            className="text-[13px] sm:text-sm font-extrabold tracking-[0.25em] text-[#38e1ff] uppercase mt-0.5"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.4)',
            }}
          >
            ADVENTURE MASTER
          </div>
        </div>

        {/* 3 Main Glossy Action Buttons matching Screenshot */}
        <div className="flex flex-col gap-4 w-full px-2">
          {/* 1. Adventure Button - Orange */}
          <button
            onClick={() => {
              sounds.playClick();
              onStart('adventure');
            }}
            className="group relative w-full h-15 sm:h-16 rounded-2xl bg-gradient-to-b from-[#ffa11a] via-[#f78b05] to-[#e67300] border-t-2 border-l border-white/60 border-b-4 border-r border-[#994700] shadow-[0_6px_0_#994700,0_10px_20px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_#994700] hover:brightness-105 transition-all flex items-center justify-start px-6 gap-5 cursor-pointer"
          >
            {/* Clock Icon Circle */}
            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center shrink-0 drop-shadow-sm">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>

            {/* Label */}
            <span
              className="text-2xl sm:text-3xl font-black italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            >
              Adventure
            </span>
          </button>

          {/* 2. Classic Button - Mint/Emerald Green */}
          <button
            onClick={() => {
              sounds.playClick();
              onStart('classic');
            }}
            className="group relative w-full h-15 sm:h-16 rounded-2xl bg-gradient-to-b from-[#00d87a] via-[#00bd68] to-[#009e53] border-t-2 border-l border-white/60 border-b-4 border-r border-[#006634] shadow-[0_6px_0_#006634,0_10px_20px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_#006634] hover:brightness-105 transition-all flex items-center justify-start px-6 gap-5 cursor-pointer"
          >
            {/* Infinity Icon Circle */}
            <div className="w-10 h-10 flex items-center justify-center shrink-0 drop-shadow-sm">
              <svg className="w-8 h-8 text-white stroke-[3.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
              </svg>
            </div>

            {/* Label */}
            <span
              className="text-2xl sm:text-3xl font-black italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            >
              Classic
            </span>
          </button>

          {/* 3. More Games Button - Sky Blue */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenMoreGames();
            }}
            className="group relative w-full h-15 sm:h-16 rounded-2xl bg-gradient-to-b from-[#18a2fb] via-[#088de0] to-[#0076be] border-t-2 border-l border-white/60 border-b-4 border-r border-[#005285] shadow-[0_6px_0_#005285,0_10px_20px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_#005285] hover:brightness-105 transition-all flex items-center justify-start px-6 gap-5 cursor-pointer"
          >
            {/* Gamepad Icon */}
            <div className="w-10 h-10 flex items-center justify-center shrink-0 drop-shadow-sm">
              <svg className="w-8 h-8 text-white fill-white" viewBox="0 0 24 24">
                <path d="M6 7.5a4.5 4.5 0 0 0-4.5 4.5v3a4.5 4.5 0 0 0 7.64 3.22l2.36-2.36h5l2.36 2.36A4.5 4.5 0 0 0 22.5 15v-3A4.5 4.5 0 0 0 18 7.5H6zm0 3h1.5v1.5H9v1.5H7.5V15H6v-1.5H4.5V12H6v-1.5zm11 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm2 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </div>

            {/* Label */}
            <span
              className="text-2xl sm:text-3xl font-black italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            >
              More Games
            </span>

            {/* Red Notification Badge "5" */}
            <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[#ff263b] border-2 border-white flex items-center justify-center text-white font-black text-xs shadow-md">
              5
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Promo Icons: GOGO! Blast & Rotate Rings */}
      <footer className="w-full max-w-sm flex items-center justify-center gap-10 pb-2 z-10">
        {/* Promo 1: GOGO! Blast (Maze) */}
        <button
          onClick={() => {
            sounds.playClick();
            onSelectPromoGame('GOGO! Blast');
          }}
          className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-16 h-16 rounded-full bg-white p-1 border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
            {/* Maze Graphic with Red solver line */}
            <svg className="w-full h-full" viewBox="0 0 60 60" fill="none">
              <rect width="60" height="60" rx="30" fill="#ffffff" />
              {/* Black maze lines */}
              <path
                d="M10 10H50V50H10V10ZM16 16V44H22V22H38V44H44V16H16ZM28 28V38H32V28H28Z"
                fill="#111827"
              />
              {/* Red path */}
              <path
                d="M12 48V32H19V38H25V18H35V38H41V24H48"
                stroke="#ff1744"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mt-1 px-3 py-0.5 rounded-full bg-[#1888e8] border border-white/50 text-[11px] font-bold text-white shadow-sm">
            GOGO! Blast
          </div>
        </button>

        {/* Promo 2: Rotate Rings */}
        <button
          onClick={() => {
            sounds.playClick();
            onSelectPromoGame('Rotate Rings');
          }}
          className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-16 h-16 rounded-full bg-[#ffd54f] p-1 border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
            {/* Interlocking Rings Graphic */}
            <svg className="w-full h-full" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="28" fill="#ffecb3" />
              {/* Green ring */}
              <circle cx="23" cy="23" r="11" stroke="#00c853" strokeWidth="4.5" fill="none" />
              {/* Red ring */}
              <circle cx="37" cy="25" r="11" stroke="#ff1744" strokeWidth="4.5" fill="none" />
              {/* Blue ring */}
              <circle cx="24" cy="37" r="11" stroke="#2979ff" strokeWidth="4.5" fill="none" />
              {/* Yellow ring */}
              <circle cx="37" cy="37" r="11" stroke="#ffd600" strokeWidth="4.5" fill="none" />
            </svg>
          </div>
          <div className="mt-1 px-3 py-0.5 rounded-full bg-[#1888e8] border border-white/50 text-[11px] font-bold text-white shadow-sm">
            Rotate Rings
          </div>
        </button>
      </footer>
    </div>
  );
};
