/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameMode } from '../types/game';
import { Settings, Smartphone } from 'lucide-react';
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
}) => {
  return (
    <header className="w-full max-w-md flex flex-col items-center justify-between z-20 px-4 pt-3 pb-1 select-none">
      {/* Top Bar: Crown + High Score on Left, Settings on Right */}
      <div className="w-full flex items-center justify-between">
        {/* Top-Left: Crown 👑 + High Score */}
        <div className="flex items-center gap-2">
          {/* Authentic Gold Crown SVG */}
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

          {/* High Score in Bold Yellow Font */}
          <span className="font-extrabold text-2xl sm:text-3xl text-[#ffcc00] tracking-wide tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {highScore.toLocaleString()}
          </span>
        </div>

        {/* Top-Right: Grey Gear + Red Vibration Badge */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenSettings();
          }}
          className="relative p-1.5 text-[#9e9fa6] hover:text-white transition-colors cursor-pointer active:scale-95"
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

      {/* Main Score Centerpiece matching Screenshot_20261105_203004.jpg */}
      <div className="flex flex-col items-center justify-center mt-2 mb-1">
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

        {/* Combo Multiplier indicator */}
        {combo > 1 && (
          <div className="mt-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/50 text-amber-300 text-xs font-black animate-bounce tracking-wide">
            COMBO x{combo}
          </div>
        )}
      </div>
    </header>
  );
};
