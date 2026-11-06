/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameMode } from '../types/game';
import { Settings, Smartphone, Image as ImageIcon, Flame, Zap } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HUDProps {
  score: number;
  highScore: number;
  combo: number;
  gameMode: GameMode;
  levelNumber?: number;
  collectedGems?: number;
  targetGems?: number;
  onOpenSettings: () => void;
  onOpenCustomize?: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  score,
  highScore,
  combo,
  gameMode,
  levelNumber,
  collectedGems = 0,
  targetGems = 0,
  onOpenSettings,
  onOpenCustomize,
}) => {
  // Meter pips: 6 segmented slots
  const maxPips = 6;
  const currentPips = Math.min(maxPips, combo);
  const fillPercentage = (currentPips / maxPips) * 100;

  return (
    <header className="w-full max-w-md flex flex-col items-center justify-between z-20 px-4 pt-2.5 pb-1 select-none">
      {/* Top Bar: Crown + High Score on Left, Customizer & Settings on Right */}
      <div className="w-full flex items-center justify-between">
        {/* Top-Left: Crown 👑 + High Score */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-7 drop-shadow-sm flex items-center justify-center">
            <svg className="w-8 h-6" viewBox="0 0 48 36" fill="none">
              <path
                d="M6 30L3 10L15 18L24 6L33 18L45 10L42 30H6Z"
                fill="url(#crown-hud)"
                stroke="#d97706"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="5" r="2.5" fill="#fef08a" />
              <circle cx="3" cy="9" r="2.5" fill="#fef08a" />
              <circle cx="45" cy="9" r="2.5" fill="#fef08a" />
              <defs>
                <linearGradient id="crown-hud" x1="24" y1="6" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fbbf24" />
                  <stop offset="1" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="font-extrabold text-2xl sm:text-3xl text-[#ffcc00] tracking-wide tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {highScore.toLocaleString()}
          </span>
        </div>

        {/* Top-Right: Photo Customizer & Settings Button */}
        <div className="flex items-center gap-2">
          {onOpenCustomize && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenCustomize();
              }}
              className="p-1.5 text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer active:scale-95"
              title="Customize Skins & Upload Photo"
              aria-label="Customize Skins"
            >
              <ImageIcon className="w-6 h-6 stroke-[2.2]" />
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              onOpenSettings();
            }}
            className="relative p-1.5 text-[#a1a4ad] hover:text-white transition-colors cursor-pointer active:scale-95"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-8 h-8 stroke-[2.4]" />

            {/* Red Notification Badge with Phone / Vibration Icon */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-[4px] bg-[#ff263b] border border-white flex items-center justify-center shadow-sm">
              <Smartphone className="w-2.5 h-2.5 text-white stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>

      {/* Main Score Centerpiece matching Screenshot_20261105_203004.jpg */}
      <div className="flex flex-col items-center justify-center mt-1 mb-1">
        <div
          className="text-6xl sm:text-7xl font-extrabold tracking-tight text-[#f1f3f7] tabular-nums"
          style={{
            textShadow: '0 4px 10px rgba(0,0,0,0.5)',
          }}
        >
          {score.toLocaleString()}
        </div>

        {/* Adventure Level / Gem Badge if in Adventure Mode */}
        {gameMode === 'adventure' && targetGems > 0 && (
          <div className="mt-1 px-3 py-0.5 rounded-full bg-[#35373d] border border-[#525660] text-xs font-bold text-amber-300">
            Level {levelNumber} · 💎 {collectedGems}/{targetGems}
          </div>
        )}
      </div>

      {/* Visual 'Combo Meter' that fills up as user clears multiple lines */}
      <div className="w-full max-w-[280px] sm:max-w-xs mt-1 mb-1">
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider mb-1 px-1">
          <div className="flex items-center gap-1">
            <Flame
              className={`w-3.5 h-3.5 ${
                combo > 0 ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-500'
              }`}
            />
            <span className={combo > 0 ? 'text-amber-300' : 'text-slate-400'}>
              Combo Meter
            </span>
          </div>

          {combo > 1 ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs shadow-md animate-bounce">
              <Zap className="w-3 h-3 fill-white" />
              <span>{combo}x Multiplier!</span>
            </span>
          ) : (
            <span className="text-slate-500 font-mono text-[10px]">
              {combo === 1 ? '1x · Keep going!' : 'Ready'}
            </span>
          )}
        </div>

        {/* Meter Bar Container */}
        <div className="relative h-2.5 w-full bg-[#202227] rounded-full overflow-hidden p-0.5 border border-[#3f434d] shadow-inner">
          {/* Animated Fill Bar */}
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              combo >= 5
                ? 'bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.9)] animate-pulse'
                : combo >= 3
                ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]'
                : combo >= 1
                ? 'bg-gradient-to-r from-sky-400 to-amber-400'
                : 'bg-transparent'
            }`}
            style={{ width: `${Math.max(combo > 0 ? 12 : 0, fillPercentage)}%` }}
          />

          {/* Segmented Tick Marks (6 pips) */}
          <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
            {[1, 2, 3, 4, 5].map((pip) => (
              <div
                key={pip}
                className="w-0.5 h-full bg-[#16181d]/80"
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
